// Standartlar Faz 0: haber sayfasının sonundaki tek satırlık yapay zekâ notu ve "Hata bildir" bağlantısı.
// Bot haberleri (bülten ve derleme dahil) bot notunu, yazı işleri yazıları (yazı türü açıklayıcı ya da referans)
// çeviri/dil düzeltmesi notunu alır. Not yalnız görünür metindir; yapısal veriye (JSON-LD) girmez.
import { aciklayiciMi } from './yazi-turu.mjs';

export const HATA_ADRESI = 'contact@jendume.com';

const METINLER = {
  tr: {
    bot: 'Bu haber yapay zekâ ile otomatik yazıldı ve otomatik denetimden geçti.',
    sahip: 'Yazım ve dil düzeltmesinde yapay zekâ araçları kullanıldı. Bütün rakamlar resmî kaynaklardan alındı ve kontrol edildi.',
    baglanti: 'Hata bildir →',
    konu: 'Hata bildirimi',
  },
  en: {
    bot: 'This story was written automatically with AI and checked automatically.',
    sahip: 'AI tools were used for translation and language editing. All figures are taken from official sources and checked.',
    baglanti: 'Report an error →',
    konu: 'Error report',
  },
};

/** { metin, baglanti, mailto } — baslik: haber başlığı, adres: haberin tam adresi. */
export function yapayZekaNotu({ veri, dil, baslik, adres }) {
  const m = METINLER[dil] ?? METINLER.tr;
  const konu = encodeURIComponent(`${m.konu}: ${baslik}`);
  const govde = encodeURIComponent(adres);
  return {
    metin: aciklayiciMi(veri) ? m.sahip : m.bot,
    baglanti: m.baglanti,
    mailto: `mailto:${HATA_ADRESI}?subject=${konu}&body=${govde}`,
  };
}
