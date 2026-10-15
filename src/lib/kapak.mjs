// Kapak görseli seçimi: hangi haber kendi çizilmiş kapağını (1200×675) alır, hangisi bölüm kapağını?
// Ortak yardımcı: src/lib/news.ts (sayfalar, RSS, JSON-LD), src/pages/kapak/… (PNG üretimi) ve astro.config.mjs (site haritası).
//
// Dosya bütçesi: Cloudflare Workers statik dosya sınırı sürüm başına 20.000 dosyadır. Haber başına dil başına
// 1 HTML + 1 kapak PNG düşer (iki dilli haber ≈ 4 dosya). Kapaklar silinmez; her dilde en yeni KAPAK_BUTCE haber
// kendi kapağını alır, daha eskiler bölümün ortak kapağını (/kapak/{lang}/bolum/{slug}.png, 1200×675) kullanır.
// Böylece kapaklar en fazla 2 × KAPAK_BUTCE = 6.000 dosya tutar; kalan ~14.000 dosya sayfalara kalır
// (≈ 7.000 iki dilli haber). Sınıra yaklaşıldığında "Yayınla" iş akışı 15.000 dosyada uyarır; o zaman bu sayı
// düşürülebilir (eski haberler yine 1200 px'lik bölüm kapağıyla kalır, hiçbir sayfa görselsiz kalmaz).
// Seçim yalnız içerikten (tarih, kimlik) çıkar; aynı içerik her derlemede aynı kapakları üretir.

/** Dil başına kendi kapağını alan en yeni haber sayısı. */
export const KAPAK_BUTCE = 3000;

/**
 * En yeni `butce` haberin kimlikleri (tarihe göre, eşitlikte kimliğe göre sıralı; deterministik).
 * @param {{ id: string, date: Date | string | number }[]} haberler
 * @param {number} [butce]
 * @returns {Set<string>}
 */
export function kapakliKimlikler(haberler, butce = KAPAK_BUTCE) {
  return new Set(
    [...haberler]
      .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf() || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
      .slice(0, Math.max(0, butce))
      .map((h) => h.id),
  );
}

/** @param {string} lang @param {string} id */
export const haberKapakYolu = (lang, id) => `/kapak/${lang}/${id}.png`;

/** @param {string} lang @param {string} slug */
export const bolumKapakYolu = (lang, slug) => `/kapak/${lang}/bolum/${slug}.png`;
