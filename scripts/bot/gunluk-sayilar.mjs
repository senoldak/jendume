// Yayın odası sayfası: botun gerçek günlük sayıları (src/data/yayin-odasi/gunluk.json). Her tur sonunda o turun sayıları
// İstanbul gününe eklenir. Dosyada yalnız sayılar ve sabit kodlar durur: başlık, kaynak adı, adres ya da serbest gerekçe
// metni yazılmaz (gizli kaynak listesi kuralı; gerekçe metni kaynak adı taşıyabilir). tidsrost scripts/nyheter/dagstall.mjs'in eşi.
// Sayım birimi: bulunan/degerlendirilen/elenen kaynak öğesidir (bir haber birkaç kaynak öğesinden yazılabilir); yazilan
// benzersiz haber (slug) sayısıdır.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export const SAKLA_GUN = 400;

// Ret gerekçesi (uyarlayici.mjs) → kod. Sıra önemlidir: ilk eşleşen kazanır. Yeni bir gerekçe eklenirse buraya ve
// src/lib/yayin-odasi.mjs ELENME_METNI'ne kod ekle; yoksa 'diger' sayılır.
const KODLAR = [
  [/^düşük haber değeri/, 'dusuk-haber-degeri'],
  [/^kapsam dışı/, 'kapsam-disi'],
  [/^zaten yazıldı/, 'daha-once-yazildi'],
  [/^(kaynak metni çok kısa|metin okunamadı)/, 'kaynak-yetersiz'],
  [/^bayat/, 'bayat'],
  [/^kaynak listeden çıkarıldı/, 'kaynak-cikarildi'],
  [/^\d+ denemede yazılamadı/, 'yazilamadi'],
  [/^kısa, eş bulunamadı/, 'kisa-es-yok'],
  [/^\[(TR|EN)\]/, 'denetimde-durdu'],
];

/** Ret gerekçesinin kodları: standart reddi kural başına 'standart:<kural>', öteki tek kod; bilinmeyen 'diger'. */
export function elenmeKodlari(gerekce) {
  const g = String(gerekce ?? '').trim();
  const s = /^standart:kirmizi:([a-z0-9,-]+)/.exec(g);
  if (s) return s[1].split(',').filter(Boolean).map((k) => `standart:${k}`);
  return [KODLAR.find(([re]) => re.test(g))?.[1] ?? 'diger'];
}

/** Bir turun sayıları. sonuclar: uyarlayıcının sonuçları. */
export function turSayilari({ bulunan = 0, sonuclar = [] }) {
  const elenen = {};
  for (const s of sonuclar) if (s.durum === 'elendi') for (const k of elenmeKodlari(s.gerekce)) elenen[k] = (elenen[k] ?? 0) + 1;
  return {
    tur: 1,
    bulunan,
    degerlendirilen: sonuclar.filter((s) => s.durum === 'yazildi' || s.durum === 'elendi').length,
    elenen,
    yazilan: new Set(sonuclar.filter((s) => s.durum === 'yazildi' && s.slug).map((s) => s.slug)).size,
    havuza: sonuclar.filter((s) => s.durum === 'bekliyor' && s.havuzda).length,
  };
}

/** İstanbul takvim günü (YYYY-MM-DD). */
export const istanbulGunu = (t) => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Istanbul' }).format(t);

/** İki sayı nesnesini toplar (iç içe elenen dahil). */
function topla(a = {}, b = {}) {
  const c = { ...a };
  for (const [k, v] of Object.entries(b)) c[k] = typeof v === 'object' && v !== null ? topla(c[k], v) : (c[k] ?? 0) + v;
  return c;
}

/** Dosyaya bu turun sayılarını ekler; SAKLA_GUN'den eski günler düşer. */
export function gunEkle(veri, gun, sayilar, guncellendi) {
  const gunler = { ...(veri?.gunler ?? {}), [gun]: topla(veri?.gunler?.[gun], sayilar) };
  const sirali = Object.keys(gunler).sort().slice(-SAKLA_GUN);
  return { guncellendi, gunler: Object.fromEntries(sirali.map((d) => [d, gunler[d]])) };
}

/** Uyarlayıcıyı sarar: aday sayısını ve isle sonuçlarını (hata ile gelen kısmi sonuçlar dahil) toplar. */
export function sayan(uyarlayici) {
  let bulunan = 0;
  const sonuclar = [];
  return {
    uyarlayici: {
      ...uyarlayici,
      adaylar: async (...a) => {
        const liste = await uyarlayici.adaylar(...a);
        bulunan += liste.length;
        return liste;
      },
      isle: async (...a) => {
        try {
          const r = await uyarlayici.isle(...a);
          sonuclar.push(...(r ?? []));
          return r;
        } catch (e) {
          sonuclar.push(...(e?.sonuclar ?? []));
          throw e;
        }
      },
    },
    sayilar: () => turSayilari({ bulunan, sonuclar }),
  };
}

/** Turun sayılarını dosyaya yazar. Hata turu düşürmez: çağıran yakalar ve loglar. */
export async function gunlukYaz(dosya, sayilar, simdi = new Date()) {
  let veri = {};
  try {
    veri = JSON.parse(await readFile(dosya, 'utf8'));
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  await mkdir(path.dirname(dosya), { recursive: true });
  await writeFile(dosya, `${JSON.stringify(gunEkle(veri, istanbulGunu(simdi), sayilar, simdi.toISOString()), null, 1)}\n`, 'utf8');
}
