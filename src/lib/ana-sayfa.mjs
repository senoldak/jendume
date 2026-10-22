// Ana sayfa yükü: manşet ve "Son haberler" kutusu dışında en fazla ESKI_SINIRI haber daha listelenir.
// Gerisine bölüm arşivleri (sayfalı), site haritası, arama ve RSS ile ulaşılır; ana sayfa 400 KB'a şişmesin.
export const ESKI_SINIRI = 30;
const SON_HABER_SAYISI = 4;

/** @template T @param {T[]} kalan manşet çıkarılmış, yeniden eskiye sıralı haberler @returns {T[]} */
export function anaSayfaEskileri(kalan) {
  return kalan.slice(SON_HABER_SAYISI, SON_HABER_SAYISI + ESKI_SINIRI);
}
