// Sayfa yolları: Türkçe sayfalar Türkçe, İngilizce sayfalar İngilizce yol parçaları kullanır (Ekim 2026).
//   TR  /tr/haber/<id>/   /tr/kategori/<bolum>/   /tr/hakkimizda/   /tr/konu/<konu>/   /tr/sozluk/<terim>/
//   EN  /en/news/<id>/    /en/category/<section>/ /en/about/        /en/topic/<topic>/ /en/glossary/<term>/
// Haber kimlikleri (slug) iki dilde aynıdır ve değişmez; yalnız yol öneki dile göre değişir. Eski İngilizce yollar
// (/en/haber/…, /en/kategori/…, /en/hakkimizda/) public/_redirects ile 301 yönlenir.
// Ortak yardımcı: src/lib/news.ts (sayfalar), src/layouts/Base.astro (dil değiştirici) ve astro.config.mjs (site haritası).

import { TERIMLER } from '../data/sozluk/index.mjs';

/** @typedef {'tr' | 'en'} Dil */

export const YOL = {
  tr: { haber: 'haber', kategori: 'kategori', hakkimizda: 'hakkimizda', konu: 'konu', sozluk: 'sozluk', gizlilik: 'gizlilik', seffaflik: 'seffaflik', arama: 'arama', yayinIlkeleri: 'yayin-ilkeleri' },
  en: { haber: 'news', kategori: 'category', hakkimizda: 'about', konu: 'topic', sozluk: 'glossary', gizlilik: 'privacy', seffaflik: 'transparency', arama: 'search', yayinIlkeleri: 'editorial-standards' },
};

/** Bölüm kimliği (içerikteki `category`) → İngilizce yol parçası. Türkçe yolda kimliğin kendisi kullanılır. */
export const KATEGORI_EN = {
  dunya: 'world',
  'yapay-zeka': 'ai',
  teknoloji: 'technology',
  bilim: 'science',
  ekonomi: 'economy',
  perspektif: 'perspective',
  'gunluk-bulten': 'bulletins',
};

/** @param {Dil} dil @param {string} kimlik bölüm kimliği (ör. "yapay-zeka") */
export const kategoriParcasi = (dil, kimlik) => (dil === 'en' ? KATEGORI_EN[kimlik] ?? kimlik : kimlik);

/** Yol parçasından bölüm kimliği (ör. EN "ai" → "yapay-zeka"); bilinmiyorsa undefined. */
export function kategoriKimligi(dil, parca) {
  if (dil === 'tr') return parca in KATEGORI_EN ? parca : undefined;
  return Object.keys(KATEGORI_EN).find((k) => KATEGORI_EN[k] === parca);
}

/** @param {Dil} dil @param {string} id */
export const haberYolu = (dil, id) => `/${dil}/${YOL[dil].haber}/${id}/`;
/** @param {Dil} dil @param {string} kimlik */
export const kategoriYolu = (dil, kimlik) => `/${dil}/${YOL[dil].kategori}/${kategoriParcasi(dil, kimlik)}/`;
/** @param {Dil} dil */
export const aramaYolu = (dil) => `/${dil}/${YOL[dil].arama}/`;
/** Arama dizini (JSON): /tr/arama.json, /en/search.json @param {Dil} dil */
export const aramaDiziniYolu = (dil) => `/${dil}/${YOL[dil].arama}.json`;
/** @param {Dil} dil */
export const seffaflikYolu = (dil) => `/${dil}/${YOL[dil].seffaflik}/`;
/** @param {Dil} dil */
export const hakkimizdaYolu = (dil) => `/${dil}/${YOL[dil].hakkimizda}/`;

/**
 * Bir dildeki yolun öteki dildeki karşılığı (sayfanın var olup olmadığına bakmaz).
 * Bilinmeyen yollarda yalnız dil öneki değişir. Konu slug'ları iki dilde aynıdır; sözlük terimleri dile göre değişir.
 * @param {string} yol ör. "/en/category/ai/2/"
 * @param {Dil} hedef
 */
export function karsiYol(yol, hedef) {
  const m = /^\/(tr|en)(\/.*)?$/.exec(yol);
  if (!m) return yol;
  const kaynak = /** @type {Dil} */ (m[1]);
  const parcalar = (m[2] ?? '/').split('/');
  // parcalar: ['', bolum, ...]
  const tur = Object.keys(YOL[kaynak]).find((k) => YOL[kaynak][k] === parcalar[1]);
  if (tur) {
    parcalar[1] = YOL[hedef][tur];
    if (parcalar[2]) {
      if (tur === 'kategori') {
        const kimlik = kategoriKimligi(kaynak, parcalar[2]);
        if (kimlik) parcalar[2] = kategoriParcasi(hedef, kimlik);
      } else if (tur === 'sozluk') {
        const terim = TERIMLER.find((t) => t[kaynak].slug === parcalar[2]);
        if (terim) parcalar[2] = terim[hedef].slug;
      }
    }
  }
  return `/${hedef}${parcalar.join('/')}`;
}

/** @param {Dil} dil @param {string} slug */
export const konuYolu = (dil, slug) => `/${dil}/${YOL[dil].konu}/${slug}/`;
/** @param {Dil} dil */
export const konuDiziniYolu = (dil) => `/${dil}/${YOL[dil].konu}/`;
/** @param {Dil} dil @param {string} id terim kimliği (src/data/sozluk) */
export function terimYolu(dil, id) {
  const terim = TERIMLER.find((t) => t.id === id);
  return `/${dil}/${YOL[dil].sozluk}/${terim ? terim[dil].slug : id}/`;
}
/** @param {Dil} dil */
export const sozlukYolu = (dil) => `/${dil}/${YOL[dil].sozluk}/`;

/** @param {Dil} dil */
export const gizlilikYolu = (dil) => `/${dil}/${YOL[dil].gizlilik}/`;
