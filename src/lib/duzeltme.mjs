// Yazı düzeltme notu: alan doluysa makalede gösterilecek etiket, metin ve
// düzeltme ilkesi bağlantısı (yazının dilinde). Şemadaki kuralın aynısı: 10 karakterden kısa not yok sayılır.
export const DUZELTME_EN_AZ = 10;

// Bağlantı = editorialUrl(dil) (src/lib/site.ts) + ilke sayfasındaki düzeltme bölümünün kimliği
// (EditorialContent.astro: #duzeltmeler / #corrections). site.ts bir .ts modülü olduğundan bu düz .mjs
// ondan içe aktarmaz; ilke sayfasının adresi değişirse burası da değişir.
const DILLER = {
  tr: { etiket: 'Düzeltme:', baglanti: '/tr/yayin-ilkeleri/#duzeltmeler' },
  en: { etiket: 'Correction:', baglanti: '/en/editorial-standards/#corrections' },
};

export function duzeltmeNotu(veri, dil) {
  const metin = typeof veri?.duzeltme === 'string' ? veri.duzeltme : '';
  if (metin.length < DUZELTME_EN_AZ) return null;
  const { etiket, baglanti } = DILLER[dil] ?? DILLER.tr;
  return { etiket, metin, baglanti };
}
