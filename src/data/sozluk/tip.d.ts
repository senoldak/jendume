export interface TerimDil {
  /** URL parçası (ASCII, küçük harf, tire). */
  slug: string;
  /** Görünen ad (cümle düzeni). */
  ad: string;
  kisaltma?: string;
  /** Tek cümlelik tanım (≤ 155 karakter); meta açıklama ve dizin satırı. */
  ozet: string;
  /** Düz metin paragraflar; toplam 100–250 kelime. */
  tanim: string[];
  /** Haber metninde büyük/küçük harf duyarsız, sözcük başında aranan önekler. */
  esles: string[];
  /** Büyük/küçük harf duyarlı, tam sözcük kısaltmalar. */
  kisaltmaEsles: string[];
}

export interface Terim {
  id: string;
  /** İlgili terim kimlikleri. */
  ilgili: string[];
  /** Haber metinlerinde ilk geçişe otomatik bağlantı verilsin mi? */
  bagla: boolean;
  tr: TerimDil;
  en: TerimDil;
}
