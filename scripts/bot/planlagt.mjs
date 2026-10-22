// Planlı yazılar: tarihi son 3 günde gelmiş ama canlı sitede henüz olmayan (404) yazı var mı?
// Varsa GITHUB_OUTPUT'a "yayin=1" yazar; bot.yml bunu görünce yayinla.yml'yi başlatır, derlemede yazı görünür.
// Tarih kuralı tek yerde: src/lib/yayinda.mjs (news.ts ve site haritası ile ortak); adresler src/lib/yollar.mjs'ten.
// İki dilli haberde her dil kendi dosyasının tarihiyle yayına girer; yalnız vakti gelmiş dillerin adresi denetlenir.
// Kullanım: node scripts/bot/planlagt.mjs   (SITE ortam değişkeniyle başka adres denetlenebilir)
import { readdir, readFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { onyuzMaddesiYayinda, onyuzMaddesiTarihi } from '../../src/lib/yayinda.mjs';
import { haberYolu } from '../../src/lib/yollar.mjs';

const GUN_MS = 86400e3;
const DILLER = ['tr', 'en'];
const DIZIN = fileURLToPath(new URL('../../src/content/haberler/', import.meta.url));

/** Yayında olan ve tarihi (simdi − pencereGun gün, simdi] aralığına düşen yazıların kimlikleri (tekrarsız). */
export function vadesiGelenler({ yazilar, simdi = Date.now(), pencereGun = 3 }) {
  const sonuc = [];
  for (const { kimlik, metin } of yazilar) {
    if (!onyuzMaddesiYayinda(metin, simdi)) continue;
    if (!(onyuzMaddesiTarihi(metin) > simdi - pencereGun * GUN_MS)) continue;
    if (!sonuc.includes(kimlik)) sonuc.push(kimlik);
  }
  return sonuc;
}

/** Adreslerinden biri 404 dönen yazıların kimlikleri. Yalnız 404 eksik sayılır; ağ hatası iş akışını düşürür. */
export async function eksikOlanlar({ kimlikler, adres, getir }) {
  const eksik = [];
  for (const kimlik of kimlikler) {
    for (const url of adres(kimlik)) {
      if ((await getir(url)).status === 404) {
        eksik.push(kimlik);
        break;
      }
    }
  }
  return eksik;
}

/** Bir haberin yayındaki dillerdeki adresleri (TR /tr/haber/<slug>/, EN /en/news/<slug>/). metinler: { tr?, en? } ham .md */
export function haberAdresleri({ site, kimlik, metinler, simdi = Date.now() }) {
  return DILLER.filter((dil) => metinler?.[dil] && onyuzMaddesiYayinda(metinler[dil], simdi)).map(
    (dil) => `${site}${haberYolu(dil, kimlik)}`,
  );
}

// Kimlik astro.config.mjs ile aynı: dosya adı (.md'siz); iki dilde aynıdır.
async function metinleriOku() {
  /** @type {Map<string, Partial<Record<'tr' | 'en', string>>>} */
  const haberler = new Map();
  for (const dil of DILLER) {
    let dosyalar;
    try {
      dosyalar = await readdir(path.join(DIZIN, dil));
    } catch {
      continue;
    }
    for (const dosya of dosyalar) {
      if (!dosya.endsWith('.md')) continue;
      const kimlik = dosya.replace(/\.md$/, '');
      const kayit = haberler.get(kimlik) ?? {};
      kayit[dil] = await readFile(path.join(DIZIN, dil, dosya), 'utf8');
      haberler.set(kimlik, kayit);
    }
  }
  return haberler;
}

async function ana() {
  const site = (process.env.SITE || 'https://jendume.com').replace(/\/+$/, '');
  const simdi = Date.now();
  const haberler = await metinleriOku();
  const yazilar = [...haberler].flatMap(([kimlik, metinler]) =>
    DILLER.filter((dil) => metinler[dil]).map((dil) => ({ kimlik, metin: metinler[dil] })),
  );
  const kimlikler = vadesiGelenler({ yazilar, simdi });
  const eksik = await eksikOlanlar({
    kimlikler,
    adres: (kimlik) => haberAdresleri({ site, kimlik, metinler: haberler.get(kimlik), simdi }),
    getir: (url) => fetch(url, { method: 'HEAD', headers: { 'cache-control': 'no-cache' }, signal: AbortSignal.timeout(15000) }),
  });
  console.log(
    eksik.length
      ? `Vadesi gelip yayında olmayan planlı yazı: ${eksik.join(', ')}`
      : `Bekleyen planlı yazı yok (son 3 günde vadesi gelen: ${kimlikler.length}).`,
  );
  if (eksik.length && process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, 'yayin=1\n');
}

// Testler modülü içe aktarır; ana iş yalnız doğrudan çalıştırılınca yapılır.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await ana();
