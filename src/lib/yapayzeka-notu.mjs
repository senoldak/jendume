// Standartlar Faz 0: haber sayfasının sonundaki tek satırlık yapay zekâ notu ve "Hata bildir" bağlantısı.
// Bot haberleri (bülten ve derleme dahil) bot notunu, yazı işleri yazıları (yazı türü açıklayıcı ya da referans)
// çeviri/dil düzeltmesi notunu alır. Yazı işleri zincirinin yazısı (uretim: yazi-isleri; yerleştirme yazar) her
// kuraldan önce zincir notunu alır. Not yalnız görünür metindir; yapısal veriye (JSON-LD) girmez.
import { aciklayiciMi } from './yazi-turu.mjs';

export const HATA_ADRESI = 'contact@jendume.com';
export const ZINCIR_URETIMI = 'yazi-isleri';

const METINLER = {
  tr: {
    bot: 'Bu haber yapay zekâ ile otomatik yazıldı ve otomatik denetimden geçti.',
    sahip: 'Yazım ve dil düzeltmesinde yapay zekâ araçları kullanıldı. Bütün rakamlar resmî kaynaklardan alındı ve kontrol edildi.',
    zincir:
      'Bu yazı yapay zekâ araçlarıyla yazıldı. Rakamlar ve alıntılar resmî kaynaklarla karşılaştırıldı; yazı yayından önce editör tarafından okunup onaylandı.',
    baglanti: 'Hata bildir →',
    konu: 'Hata bildirimi',
  },
  en: {
    bot: 'This story was written automatically with AI and checked automatically.',
    sahip: 'AI tools were used for translation and language editing. All figures are taken from official sources and checked.',
    zincir:
      'This article was written with AI tools. Figures and quotes were checked against official sources, and an editor read and approved it before publication.',
    baglanti: 'Report an error →',
    konu: 'Error report',
  },
};

function notTuru(veri) {
  if (veri?.uretim === ZINCIR_URETIMI) return 'zincir';
  return aciklayiciMi(veri) ? 'sahip' : 'bot';
}

/** { metin, baglanti, mailto } — baslik: haber başlığı, adres: haberin tam adresi. */
export function yapayZekaNotu({ veri, dil, baslik, adres }) {
  const m = METINLER[dil] ?? METINLER.tr;
  const konu = encodeURIComponent(`${m.konu}: ${baslik}`);
  const govde = encodeURIComponent(adres);
  return {
    metin: m[notTuru(veri)],
    baglanti: m.baglanti,
    mailto: `mailto:${HATA_ADRESI}?subject=${konu}&body=${govde}`,
  };
}
