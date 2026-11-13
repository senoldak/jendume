// Telegram Günün Özeti, 20:45 işi (mecmua-saat başlatır, .github/workflows/gunun-ozeti.yml): o günün (İstanbul)
// yayımlanmış Türkçe haberlerinden Gemini ile tek paragraf yazar, kodla denetler (rakam/özel ad kaynakta mı, dil
// kapısı), geçmezse ilk üç başlıktan yedek paragraf kurar ve src/data/gunun-ozeti/<tarih>.json yazar. Gün sayfası
// (/tr/gunun-ozeti/<tarih>/) ve kapağı derlemede bu dosyadan üretilir; Telegram'a mecmua-saat kuyruğu gönderir.
// Kullanım: node scripts/bot/gunun-ozeti-is.mjs            (yazar; GITHUB_OUTPUT'a yazildi=1|0, bildir=1|0)
//           node scripts/bot/gunun-ozeti-is.mjs --bildir   (gün sayfasını kuyruğa bildirir)
import path from 'node:path';
import { readFile, writeFile, readdir, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { onyuzMaddesiYayinda } from '../../src/lib/yayinda.mjs';
import { gemini } from './lib.mjs';
import { dilSorunlariTr, kesinSorunlar } from './dil-tr.mjs';
import { acilDurdurma } from './kapi.mjs';
import {
  OZET_SEMASI, istanbulGunu, ozetBildir, ozetIstemi, paragrafDenetle, paragrafKisalt, yedekParagraf,
} from './gunun-ozeti.mjs';

const SITE = 'jendume';
const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const sayfaUrl = (tarih) => `https://jendume.com/tr/gunun-ozeti/${tarih}/`;
const varMi = (p) => access(p).then(() => true, () => false);

function onBilgi(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const d = {};
  for (const satir of m[1].split(/\r?\n/)) {
    const i = satir.indexOf(':');
    if (i < 1 || /^\s/.test(satir)) continue;
    let v = satir.slice(i + 1).trim();
    if (v.startsWith('"') && v.endsWith('"')) {
      try {
        v = JSON.parse(v);
      } catch {
        v = v.slice(1, -1);
      }
    }
    d[satir.slice(0, i).trim()] = v;
  }
  return d;
}

/** O günün (İstanbul) yayımlanmış Türkçe haberleri; bültenler hariç; yayın sırasıyla. */
export async function gunHaberleri({ simdi, kok = KOK }) {
  const gun = istanbulGunu(simdi);
  const dizin = path.join(kok, 'src/content/haberler/tr');
  const liste = [];
  for (const ad of await readdir(dizin)) {
    if (!ad.endsWith('.md')) continue;
    const metin = await readFile(path.join(dizin, ad), 'utf8');
    if (!onyuzMaddesiYayinda(metin, simdi.getTime())) continue;
    const d = onBilgi(metin);
    if (!d || d.category === 'gunluk-bulten') continue;
    const tarih = new Date(d.date);
    if (Number.isNaN(tarih.valueOf()) || tarih > simdi || istanbulGunu(tarih) !== gun) continue;
    liste.push({ id: ad.replace(/\.md$/, ''), baslik: d.title, ozet: d.description ?? '', tarih });
  }
  return liste.sort((a, b) => a.tarih - b.tarih);
}

/** Paragrafı yazar; haber yoksa ya da o günün dosyası zaten varsa null. */
export async function ozetYaz({ simdi = new Date(), kok = KOK, geminiFn = gemini, log = console.log } = {}) {
  const tarih = istanbulGunu(simdi);
  const dosya = path.join(kok, 'src/data/gunun-ozeti', `${tarih}.json`);
  if (await varMi(dosya)) {
    log(`${tarih} özeti zaten var, yazılmadı.`);
    return null;
  }
  const haberler = await gunHaberleri({ simdi, kok });
  if (!haberler.length) {
    log(`${tarih}: yayımlanmış haber yok, özet yazılmadı.`);
    return null;
  }
  let sonuc = null;
  try {
    const { sistem, istem } = ozetIstemi({ site: SITE, haberler });
    const y = await geminiFn({ prompt: istem, sistem, schema: OZET_SEMASI });
    if (y?.paragraf) {
      const paragraf = paragrafKisalt(String(y.paragraf).replace(/\s+/g, ' ').trim());
      const denetim = paragrafDenetle({ paragraf, kimlikler: y.kimlikler, haberler });
      const dil = kesinSorunlar(dilSorunlariTr(paragraf));
      if (denetim.gecerli && !dil.length) sonuc = { paragraf, kimlikler: y.kimlikler, yazan: 'gemini' };
      else log(`Paragraf denetimden geçmedi, yedek kullanılıyor: ${[...denetim.sorunlar, ...dil.map((s) => s.kod)].join(', ')}`);
    } else log('Gemini paragraf vermedi, yedek kullanılıyor.');
  } catch (e) {
    log(`Gemini hatası, yedek kullanılıyor: ${e.message}`);
  }
  sonuc ??= { ...yedekParagraf(haberler), yazan: 'yedek' };
  await mkdir(path.dirname(dosya), { recursive: true });
  const kayit = { tarih, paragraf: sonuc.paragraf, kimlikler: sonuc.kimlikler, yazan: sonuc.yazan, olusturma: simdi.toISOString() };
  await writeFile(dosya, `${JSON.stringify(kayit, null, 2)}\n`, 'utf8');
  log(`Yazıldı: ${path.relative(kok, dosya)} (${haberler.length} haber, ${sonuc.yazan})`);
  return { tarih, yazan: sonuc.yazan };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const env = process.env;
  if (process.argv.includes('--bildir')) {
    const simdi = new Date();
    const ok = await ozetBildir({ url: env.MOTOR_URL, anahtar: env.MOTOR_ANAHTARI, site: SITE, sayfaUrl: sayfaUrl(istanbulGunu(simdi)), simdi });
    console.log(ok ? 'Gün sayfası kuyruğa bildirildi.' : 'Bildirim yapılamadı (MOTOR_URL/MOTOR_ANAHTARI ya da ağ).');
    if (!ok) process.exitCode = 1;
  } else {
    const durdu = await acilDurdurma({ env });
    const r = durdu ? null : await ozetYaz();
    const bildir = !durdu && (await varMi(path.join(KOK, 'src/data/gunun-ozeti', `${istanbulGunu(new Date())}.json`)));
    if (env.GITHUB_OUTPUT) await writeFile(env.GITHUB_OUTPUT, `yazildi=${r ? 1 : 0}\nbildir=${bildir ? 1 : 0}\n`, { flag: 'a' });
  }
}
