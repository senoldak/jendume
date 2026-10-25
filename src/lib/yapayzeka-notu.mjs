// Standartlar Faz 0: haber sayfasının sonundaki yapay zekâ notu ve "Hata bildir" bağlantısı.
// Bot haberleri (bülten ve derleme dahil) tek satırlık bot notunu alır. Sahibin imzalı yazısı (kisiYazariMi: analiz,
// açıklayıcı, referans) "Bu yazı nasıl hazırlandı" / "How this article was made" satırlarını alır; uretim yazi-isleri
// olsa da. TR sayfada çeviri satırı yok; EN sayfa Türkçeden çeviri olduğunu söyler. Zincir notu yalnız sahibin
// olmayan yazi-isleri yazıları için kalır. Not yalnız görünür metindir; yapısal veriye (JSON-LD) girmez.
import { analizMi, kisiYazariMi } from './yazi-turu.mjs';

export const HATA_ADRESI = 'contact@jendume.com';
export const ZINCIR_URETIMI = 'yazi-isleri';

const METINLER = {
  tr: {
    bot: 'Bu haber yapay zekâ ile otomatik yazıldı ve otomatik denetimden geçti.',
    sahip:
      'Yazıyı yazar kendisi yazdı; yapay zekâ araçları yalnız imla ve dil düzeltmesinde kullanıldı. Bütün rakamlar resmî kaynaklardan alındı ve yazar ile program tarafından kontrol edildi.',
    nasilBaslik: 'Bu yazı nasıl hazırlandı',
    nasil: [
      {
        etiket: 'Yazar',
        metin:
          'Yazıyı JEN DUME yayıncısı ve editörü Şenol Dak yazdı. Konu, veri ve bakış açısı seçimi ile bütün hesaplamalar yazara aittir.',
      },
      {
        etiket: 'Dil ve yapay zekâ',
        metin:
          'Yapay zekâ araçları yalnız imla ve dil düzeltmesinde kullanıldı; içerik, bakış açısı ya da rakamlar için kullanılmadı ve hiçbir zaman kaynak olarak kullanılmaz.',
      },
      {
        etiket: 'Rakamlar ve kaynaklar',
        metin:
          'Bütün rakamlar resmî kaynaklardan alındı; kaynaklar “Kaynaklar” bölümünde listelenir. Rakamlar yayından önce hem yazar hem program tarafından kaynaklarla karşılaştırıldı.',
      },
    ],
    yontem: { etiket: 'Yöntem', metin: 'Hesaplamalar “Nasıl hesapladık” bölümünde açıklanır.' },
    ilke: {
      etiket: 'İlkeler',
      metin: 'Yazı, yayın ilkelerimize göre hazırlandı.',
      baglanti: { parca: 'yayın ilkelerimize', adres: '/tr/yayin-ilkeleri/' },
    },
    yzSayfasi: 'Yapay zekâyı nasıl kullanıyoruz →',
    zincir:
      'Bu yazı yapay zekâ araçlarıyla yazıldı. Rakamlar ve alıntılar resmî kaynaklarla karşılaştırıldı; yazı yayından önce editör tarafından okunup onaylandı.',
    baglanti: 'Hata bildir →',
    konu: 'Hata bildirimi',
  },
  en: {
    bot: 'This story was written automatically with AI and checked automatically.',
    sahip:
      'Written in Turkish by the author; AI tools were used only for translation into English and language editing. All figures come from official sources and were checked by the author and automatically.',
    nasilBaslik: 'How this article was made',
    nasil: [
      {
        etiket: 'Author',
        metin:
          'Written by Şenol Dak, publisher and editor of JEN DUME. The choice of topic, data and angle, and all calculations, are the author’s own.',
      },
      {
        etiket: 'Language and AI',
        metin:
          'The article was written in Turkish and translated into English with AI tools, which were also used for language editing. AI was not used for content, angle or figures, and is never used as a source.',
      },
      {
        etiket: 'Figures and sources',
        metin:
          'All figures come from official sources, listed under “Sources”. Before publication they were checked against the sources both by the author and automatically.',
      },
    ],
    yontem: { etiket: 'Method', metin: 'The calculations are explained under “How we calculated”.' },
    ilke: {
      etiket: 'Principles',
      metin: 'The article follows our editorial standards.',
      baglanti: { parca: 'editorial standards', adres: '/en/editorial-standards/' },
    },
    yzSayfasi: 'How we use AI →',
    zincir:
      'This article was written with AI tools. Figures and quotes were checked against official sources, and an editor read and approved it before publication.',
    baglanti: 'Report an error →',
    konu: 'Error report',
  },
};

/** 'sahip' (imzalı yazı, zincirden gelse de) | 'zincir' (sahibin olmayan yazi-isleri yazısı) | 'bot'. */
export function notTuru(veri) {
  if (kisiYazariMi(veri)) return 'sahip';
  return veri?.uretim === ZINCIR_URETIMI ? 'zincir' : 'bot';
}

/**
 * { metin, baglanti, mailto, satirlar, baslik, yzSayfasi } — baslik: haber başlığı, adres: haberin tam adresi.
 * satirlar yalnız sahibin yazısında dolu ("Bu yazı nasıl hazırlandı"; analizde yöntem satırı da), ötekilerde null.
 */
export function yapayZekaNotu({ veri, dil, baslik, adres }) {
  const m = METINLER[dil] ?? METINLER.tr;
  const konu = encodeURIComponent(`${m.konu}: ${baslik}`);
  const govde = encodeURIComponent(adres);
  const tur = notTuru(veri);
  return {
    metin: m[tur],
    baglanti: m.baglanti,
    mailto: `mailto:${HATA_ADRESI}?subject=${konu}&body=${govde}`,
    satirlar: tur === 'sahip' ? [...m.nasil, ...(analizMi(veri) ? [m.yontem] : []), m.ilke] : null,
    baslik: m.nasilBaslik,
    yzSayfasi: m.yzSayfasi,
  };
}
