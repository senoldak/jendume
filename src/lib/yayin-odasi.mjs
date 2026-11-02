// Yayın odası sayfasının verisi: yalnız gerçek kayıtlardan. gunluk: botun günlük sayıları (src/data/yayin-odasi/gunluk.json,
// scripts/bot/gunluk-sayilar.mjs yazar; gün İstanbul'a göre). haberler: o dilin yayımlanmış haberleri. Sayfa hiçbir sayıyı
// tahmin etmez: kayıt yoksa alan boş kalır. Zincirin tur kaydı jendume'de tutulmaz; o yüzden zincir kartında sayı yoktur.

// Ret kodu → okura giden metin. 'standart:<kural>' kodları tek başlıkta toplanır.
export const ELENME_METNI = {
  'dusuk-haber-degeri': { tr: 'Düşük haber değeri', en: 'Low news value' },
  'kapsam-disi': { tr: 'Konu dışı', en: 'Off topic' },
  'daha-once-yazildi': { tr: 'Daha önce yazıldı', en: 'Already covered' },
  'kaynak-yetersiz': { tr: 'Kaynak metni yetersiz', en: 'Too little source material' },
  bayat: { tr: 'Eskimiş haber', en: 'Too old' },
  'kaynak-cikarildi': { tr: 'Kaynak listeden çıkarıldı', en: 'Source removed from list' },
  yazilamadi: { tr: 'Yazılamadı', en: 'Could not be written' },
  'kisa-es-yok': { tr: 'Kısa, eşi bulunamadı', en: 'Too short, no companion story' },
  'denetimde-durdu': { tr: 'Denetimde durdu', en: 'Stopped in checking' },
  standart: { tr: 'Yayın kurallarına takıldı', en: 'Stopped by publishing rules' },
  diger: { tr: 'Başka sebep', en: 'Other reason' },
};

/** Ham ret kodunu gösterim koduna çevirir; bilinmeyen 'diger' olur. */
export const elenmeKodu = (k) => (String(k).startsWith('standart:') ? 'standart' : ELENME_METNI[k] ? k : 'diger');

const SAYILAR = ['bulunan', 'degerlendirilen', 'yazilan', 'havuza'];

/** Günlerin toplamı; elenen kodları gösterim koduna katlanır. */
export function topla(gunler) {
  const s = Object.fromEntries(SAYILAR.map((k) => [k, 0]));
  s.elenen = {};
  for (const g of gunler) {
    for (const k of SAYILAR) s[k] += Number(g?.[k] ?? 0);
    for (const [k, n] of Object.entries(g?.elenen ?? {})) {
      const kod = elenmeKodu(k);
      s.elenen[kod] = (s.elenen[kod] ?? 0) + Number(n);
    }
  }
  s.elenenToplam = Object.values(s.elenen).reduce((a, b) => a + b, 0);
  return s;
}

/** İstanbul takvim günü (YYYY-AA-GG). */
export const istanbulGunu = (t) => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Istanbul' }).format(t);

/**
 * @param {{ haberler: Array<{ baslik: string, url: string, tarih: Date, uretim?: string }>,
 *   gunluk?: { guncellendi?: string, gunler?: Record<string, object> }, dil: 'tr' | 'en', simdi?: Date }} p
 * haberler: yayımlanmış (taslak olmayan) haberler; tarihi gelmemiş olanlar burada da elenir.
 */
export function yayinOdasiVerisi({ haberler, gunluk, dil, simdi = new Date() }) {
  const bugun = istanbulGunu(simdi);
  const sirali = haberler.filter((h) => h.tarih <= simdi).sort((a, b) => b.tarih - a.tarih);

  // Son 7 gün (bugün dahil), içerikten.
  const gunAnahtarlari = Array.from({ length: 7 }, (_, i) => istanbulGunu(new Date(simdi.getTime() - (6 - i) * 86400000)));
  const sayac = Object.fromEntries(gunAnahtarlari.map((g) => [g, 0]));
  for (const h of sirali) {
    const g = istanbulGunu(h.tarih);
    if (g in sayac) sayac[g]++;
  }
  const hafta = gunAnahtarlari.map((gun) => ({ gun, yayimlanan: sayac[gun] }));

  // Botun kayıtları: bugünden ilerisi sayılmaz; son kayıtlı gün ve son 7 kayıtlı gün.
  const kayitli = Object.keys(gunluk?.gunler ?? {}).filter((d) => d <= bugun).sort();
  const sonGun = kayitli.at(-1);
  const son7 = kayitli.slice(-7);
  const liste = (s) => Object.entries(s.elenen)
    .map(([kod, sayi]) => ({ kod, metin: ELENME_METNI[kod][dil], sayi }))
    .sort((a, b) => b.sayi - a.sayi || a.kod.localeCompare(b.kod));
  const gunTop = sonGun ? topla([gunluk.gunler[sonGun]]) : null;
  const haftaTop = son7.length ? topla(son7.map((d) => gunluk.gunler[d])) : null;

  const zincir = sirali.find((h) => h.uretim === 'yazi-isleri');
  return {
    dil,
    guncellendi: gunluk?.guncellendi ?? null,
    sonHaberler: sirali.slice(0, 8).map((h) => ({ baslik: h.baslik, url: h.url })),
    hafta,
    haftaToplam: hafta.reduce((a, g) => a + g.yayimlanan, 0),
    gun: gunTop ? { gun: sonGun, bugun: sonGun === bugun, ...gunTop, elenenListe: liste(gunTop) } : null,
    kayitHafta: haftaTop ? { dahil: son7.length, ...haftaTop, elenenListe: liste(haftaTop) } : null,
    sonZincir: zincir ? { baslik: zincir.baslik, url: zincir.url, tarih: zincir.tarih.toISOString() } : null,
  };
}
