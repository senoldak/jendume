// Yeni yayımlanan indekslenebilir haberleri (ve günlük bültenleri) Telegram'a gönderir.
// Kullanım: node scripts/bot/telegram.mjs
// Ortam değişkenleri: TELEGRAM_BOT_TOKEN; TELEGRAM_CHAT_ID (TR); isteğe bağlı TELEGRAM_CHAT_ID_EN (EN).
// Anahtar yoksa ya da bir dilin sohbeti yoksa o kısım sessizce atlanır; betik hata ile çıkmaz.
// Gönderilenler scripts/bot/telegram-durum.json'da tutulur; aynı haber iki kez gitmez.
// İlk çalıştırmada (durum dosyası yokken) mevcut haberler yalnız kaydedilir, gönderilmez.
import path from 'node:path';
import { readFile, writeFile, readdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dizinlenir } from '../../src/lib/kalite.mjs';
import { haberYolu } from '../../src/lib/yollar.mjs';

const HER = path.dirname(fileURLToPath(import.meta.url));
const ROT = path.resolve(HER, '../..');
const DURUM = path.join(HER, 'telegram-durum.json');
const SITE = 'https://jendume.com';
const DILLER = ['tr', 'en'];
/** Bu süreden eski yayımlanmış haberler gönderilmez (kaçırılan bir çalıştırma yüzünden eski haber çıkmasın). */
const PENCERE_MS = 48 * 3_600_000;
/** Bir çalıştırmada en fazla gönderim. */
const AZAMI = 12;
/** Telegram grup sınırı için iki gönderim arası. */
const ARA_MS = 3_000;
const METIN_AZAMI = 4_096;
/** Durum dosyasında bu süreden eski kayıtlar silinir (bunlardan biri yeniden aday olamaz). */
const KAYIT_SAKLA_MS = 3 * 86_400_000;

export function frontmatter(md) {
  return md.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
}

/** Basit ön bilgi alanı okuyucu: çift tırnaklı (JSON uyumlu), tek tırnaklı ya da düz değer. */
export function alan(fm, ad) {
  const satir = fm.split(/\r?\n/).find((s) => s.startsWith(`${ad}:`));
  if (satir === undefined) return undefined;
  const v = satir.slice(ad.length + 1).trim();
  if (v.startsWith('"')) {
    try {
      return JSON.parse(v);
    } catch {
      return v.replace(/^"|"$/g, '');
    }
  }
  if (v.startsWith("'")) return v.slice(1, -1).replace(/''/g, "'");
  return v;
}

/** İndekslenebilir (dizinlenir), taslak olmayan yayımlanmış haberler; eskiden yeniye. */
export async function adaylar(rot = ROT) {
  const liste = [];
  for (const dil of DILLER) {
    const dizin = path.join(rot, 'src/content/haberler', dil);
    let dosyalar;
    try {
      dosyalar = await readdir(dizin);
    } catch {
      continue;
    }
    for (const dosya of dosyalar) {
      if (!dosya.endsWith('.md')) continue;
      const md = await readFile(path.join(dizin, dosya), 'utf8');
      const fm = frontmatter(md);
      if (alan(fm, 'draft') === 'true') continue;
      if (!dizinlenir(md)) continue;
      const tarih = new Date(alan(fm, 'date') ?? '');
      if (Number.isNaN(tarih.valueOf())) continue;
      liste.push({
        dil,
        slug: dosya.replace(/\.md$/, ''),
        baslik: alan(fm, 'title') ?? '',
        ozet: alan(fm, 'description') ?? '',
        kategori: alan(fm, 'category') ?? '',
        tarih,
      });
    }
  }
  return liste.sort((a, b) => a.tarih - b.tarih);
}

/** Telegram bağlantısı: utm_source=telegram&utm_medium=social&utm_campaign=<haber|bulten>. */
export function baglanti(aday) {
  const kampanya = aday.kategori === 'gunluk-bulten' ? 'bulten' : 'haber';
  const u = new URL(`${SITE}${haberYolu(aday.dil, aday.slug)}`);
  u.search = new URLSearchParams({ utm_source: 'telegram', utm_medium: 'social', utm_campaign: kampanya }).toString();
  return u.toString();
}

/** Mesaj: başlık, özet ve bağlantı. Kaynak adı ya da kaynak bağlantısı yoktur. */
export function paylasimMetni(aday) {
  const link = baglanti(aday);
  const parcalar = [aday.baslik];
  const sonParca = link;
  const govde = aday.ozet ?? '';
  // Başlık ve bağlantı sabittir; özet kalan yere sığacak kadar kırpılır (Telegram sınırı 4096).
  const yer = METIN_AZAMI - aday.baslik.length - link.length - 8;
  const ozet = govde.length > yer ? `${govde.slice(0, Math.max(0, yer - 1)).trimEnd()}…` : govde;
  if (ozet) parcalar.push(ozet);
  parcalar.push(sonParca);
  return parcalar.join('\n\n');
}

async function varMi(dosya) {
  try {
    await access(dosya);
    return true;
  } catch {
    return false;
  }
}

async function gonderTek(fetchFn, token, sohbetId, metin) {
  const yanit = await fetchFn(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: sohbetId, text: metin }),
    signal: AbortSignal.timeout(30_000),
  });
  const veri = await yanit.json().catch(() => ({ ok: false }));
  return { ok: veri.ok === true, durum: yanit.status };
}

/** Bir çalıştırma. Dışa açık parametreler testler içindir. */
export async function calistir({
  env = process.env,
  rot = ROT,
  durumDosyasi = DURUM,
  fetchFn = fetch,
  bekle = (ms) => new Promise((r) => setTimeout(r, ms)),
  simdi = new Date(),
} = {}) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const sohbet = { tr: env.TELEGRAM_CHAT_ID, en: env.TELEGRAM_CHAT_ID_EN };
  if (!token || (!sohbet.tr && !sohbet.en)) {
    console.log('Telegram: anahtar yok, atlandı');
    return { gonderilen: 0, atlandi: true };
  }
  const ilkCalisma = !(await varMi(durumDosyasi));
  const durum = ilkCalisma ? { paylasilan: {} } : JSON.parse(await readFile(durumDosyasi, 'utf8'));
  durum.paylasilan ??= {};

  let gonderilen = 0;
  for (const aday of await adaylar(rot)) {
    const anahtar = `${aday.dil}:${aday.slug}`;
    if (durum.paylasilan[anahtar]) continue;
    // İlk çalıştırma ya da pencere dışındaki haber: yalnız kaydedilir, gönderilmez.
    if (ilkCalisma || simdi - aday.tarih > PENCERE_MS) {
      durum.paylasilan[anahtar] = simdi.toISOString();
      continue;
    }
    const hedef = sohbet[aday.dil];
    if (!hedef) continue;
    if (gonderilen >= AZAMI) break;
    if (gonderilen > 0) await bekle(ARA_MS);
    try {
      const sonuc = await gonderTek(fetchFn, token, hedef, paylasimMetni(aday));
      if (sonuc.ok) {
        durum.paylasilan[anahtar] = simdi.toISOString();
        gonderilen++;
        console.log(`Telegram: gönderildi (${aday.dil}) ${aday.slug}`);
      } else {
        console.warn(`Telegram: gönderilemedi (${aday.dil}, Telegram yanıtı ${sonuc.durum}); sonraki çalıştırmada yeniden denenir`);
      }
    } catch (e) {
      console.warn(`Telegram: gönderilemedi (${aday.dil}, ${e?.name ?? 'hata'}); sonraki çalıştırmada yeniden denenir`);
    }
  }

  // Eski kayıtlar silinir; bunlar artık aday olamaz (bkz. PENCERE_MS).
  const sinir = simdi.valueOf() - KAYIT_SAKLA_MS;
  for (const [k, v] of Object.entries(durum.paylasilan)) {
    if (Date.parse(v) < sinir) delete durum.paylasilan[k];
  }
  await writeFile(durumDosyasi, `${JSON.stringify(durum, null, 2)}\n`, 'utf8');
  console.log(`Telegram: ${gonderilen} haber gönderildi${ilkCalisma ? ' (ilk çalıştırma: yalnız kaydedildi)' : ''}`);
  return { gonderilen, atlandi: false };
}

const esas = process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (esas) {
  try {
    await calistir();
  } catch (e) {
    // Telegram hatası iş akışını bozmaz.
    console.warn(`Telegram: atlandı (${e?.name ?? 'hata'})`);
  }
}
