// Kapak görseli seçimi: hangi haber kendi çizilmiş kapağını (1200×675) alır, hangisi bölüm kapağını?
// Ortak yardımcı: src/lib/news.ts (sayfalar, RSS, JSON-LD), src/pages/kapak/… (PNG üretimi) ve astro.config.mjs (site haritası).
//
// Dosya bütçesi: Cloudflare Workers statik dosya sınırı sürüm başına 20.000 dosyadır. Haber başına dil başına
// 1 HTML + 1 kapak PNG düşer (iki dilli haber ≈ 4 dosya). Kapaklar silinmez; her dilde en yeni KAPAK_BUTCE haber
// kendi kapağını alır, daha eskiler bölümün ortak kapağını (/kapak/{lang}/bolum/{slug}.png, 1200×675) kullanır.
// Böylece kapaklar en fazla 2 × KAPAK_BUTCE = 1.000 dosya tutar; kalan ~19.000 dosya sayfalara kalır
// (≈ 9.500 iki dilli haber). 22 Ekim'de 3.000'den 500'e indi (ücretsiz plan C2): eski haberler 1200 px'lik bölüm
// kapağıyla kalır, hiçbir sayfa görselsiz kalmaz. "Yayınla" iş akışı 15.000 dosyada uyarır.
// Seçim yalnız içerikten (tarih, kimlik) çıkar; aynı içerik her derlemede aynı kapakları üretir.

/** Dil başına kendi kapağını alan en yeni haber sayısı. */
export const KAPAK_BUTCE = 500;

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
