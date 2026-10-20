// Yazı düzeltme notu: alan doluysa makalede gösterilecek etiket, metin ve
// düzeltme ilkesi bağlantısı (yazının dilinde). Şemadaki kuralın aynısı: 10 karakterden kısa not yok sayılır.
export const DUZELTME_EN_AZ = 10;

// Bağlantılar: Düzeltme Politikası ve Düzeltmeler (kayıt) sayfaları (src/lib/yollar.mjs).
import { duzeltmePolitikasiYolu, duzeltmelerYolu } from './yollar.mjs';

const DILLER = {
  tr: { etiket: 'Düzeltme:', baglanti: duzeltmePolitikasiYolu('tr'), kayit: duzeltmelerYolu('tr') },
  en: { etiket: 'Correction:', baglanti: duzeltmePolitikasiYolu('en'), kayit: duzeltmelerYolu('en') },
};

export function duzeltmeNotu(veri, dil) {
  const metin = typeof veri?.duzeltme === 'string' ? veri.duzeltme : '';
  if (metin.length < DUZELTME_EN_AZ) return null;
  const { etiket, baglanti, kayit } = DILLER[dil] ?? DILLER.tr;
  return { etiket, metin, baglanti, kayit };
}
