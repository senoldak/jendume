// Yazı türü: düz haber, açıklayıcı yazı, referans yazısı ya da analiz (yazı işleri zinciri; Analiz bölümü). Şema
// (src/content.config.ts) bu diziyi kullanır; değerler tek yerde durur.
// Görünümde analizin karşılığı var (etiket, Analiz bölümü, AnalysisNewsArticle); öteki türlerin henüz yok.
export const YAZI_TURLERI = Object.freeze(['haber', 'aciklayici', 'referans', 'analiz']);
export const VARSAYILAN_YAZI_TURU = 'haber';

export function aciklayiciMi(veri) {
  const tur = veri?.yaziTuru;
  return tur === 'aciklayici' || tur === 'referans';
}

// Analiz yazısı: aciklayiciMi'den ayrıdır (analiz açıklayıcı sayılmaz).
export function analizMi(veri) {
  return veri?.yaziTuru === 'analiz';
}

// Yazarı kişi (Şenol Dak) olarak gösterilecek yazı: analiz ve açıklayıcı/referans (sahibinin kararı, 24 Ekim 2026).
// Bot haberleri, bültenler ve derlemeler site adıyla çıkar. Sitede köşe yazısı türü yok; olursa buraya eklenir.
export function kisiYazariMi(veri) {
  return analizMi(veri) || aciklayiciMi(veri);
}
