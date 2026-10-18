// Haber kapakları: görsel, haberin kendi künyesinden çizilir (dışarıdan fotoğraf alınmaz).
// Kimlik v2 (BRAND.md §10): kâğıt zemin, sağ üst köşeden taşan büyük yeşil daire (j noktasının büyümüşü), sol üstte
// kategori (yeşil, büyük harf), başlık 700, sol altta levha + "jen dume". Kapak tek dillidir: yalnız sayfanın dili
// (sahibin kararı: iki dilli kapak kalabalıktı).
// 1200×675 (16:9) SVG döner; /kapak/[lang]/[id].png uç noktası bunu sharp ile PNG'ye çevirir.
// Yazılar yazı tipinden doğrudan vektör yola çevrilir (src/lib/kimlik.ts); derleme makinesinde yazı tipi gerekmez.
import { SITE, getCategory, type Locale } from '../lib/site.ts';
import type { NewsEntry } from '../lib/news.ts';
import { KIMLIK, genislik, logo, metin, type MetinAyar } from '../lib/kimlik.ts';

export const KAPAK_G = 1200;
export const KAPAK_Y = 675;
const G = KAPAK_G;
const Y = KAPAK_Y;
const KENAR = 80;
const DAIRE = { cx: 1130, cy: 40, r: 230 };
const YAZI_G = 880; // başlık alanı: daireden uzak
const UST = 170; // kategori satırının altı
const ALT = 510; // başlığın inebileceği en alt (logo satırının üstünde pay)

/** Kelimeleri verilen genişliğe sığacak satırlara böler; fazlası "…" ile kısalır. */
function satirlar(s: string, maks: number, ayar: MetinAyar, maksSatir: number) {
  const out: string[] = [];
  let satir = '';
  for (const kelime of s.split(/\s+/).filter(Boolean)) {
    const aday = satir ? `${satir} ${kelime}` : kelime;
    if (satir && genislik(aday, ayar) > maks) {
      out.push(satir);
      satir = kelime;
    } else satir = aday;
  }
  if (satir) out.push(satir);
  if (out.length > maksSatir) {
    out.length = maksSatir;
    out[maksSatir - 1] = out[maksSatir - 1].replace(/\s*\S*$/, '') + ' …';
  }
  return out;
}

interface Kapak {
  baslik: string;
  category: string;
  breaking?: boolean;
}

export function kapakSvg(post: NewsEntry, lang: Locale) {
  const d = post.data;
  return kapak({ baslik: d.title, category: d.category, breaking: d.breaking }, lang);
}

/**
 * Bölümün ortak kapağı: kendi kapağı bütçe dışında kalan eski haberlerin paylaşım görseli (bkz. src/lib/kapak.mjs).
 * Başlık yerine bölümün açıklaması durur.
 */
export function bolumKapakSvg(slug: string, lang: Locale) {
  return kapak({ baslik: getCategory(slug, lang).description, category: slug }, lang);
}

function kapak(d: Kapak, lang: Locale) {
  const kat = getCategory(d.category, lang);
  const yerel = SITE.localeTag[lang];

  // Kategori yeşil, büyük harf; önemli gelişme mürekkep dolgulu etiket.
  const katMetin = kat.shortTitle.toLocaleUpperCase(yerel);
  const katAyar: MetinAyar = { wght: 600, boyut: 28, renk: KIMLIK.yesilYazi, aralik: 0.1 };
  let ust = metin(katMetin, KENAR, 120, katAyar);
  if (d.breaking) {
    const etiket = SITE.ui[lang].breakingBadge.toLocaleUpperCase(yerel);
    const eAyar: MetinAyar = { wght: 600, boyut: 22, renk: KIMLIK.kagit, aralik: 0.08 };
    const x = KENAR + genislik(katMetin, katAyar) + 24;
    const en = genislik(etiket, eAyar) + 24;
    if (x + en <= YAZI_G + KENAR) ust += `<rect x="${x.toFixed(1)}" y="95" width="${en.toFixed(1)}" height="34" fill="${KIMLIK.murekkep}"/>` + metin(etiket, x + 12, 120, eAyar);
  }

  // Başlık 80'den 48'e küçülerek sığar.
  const bolge = ALT - UST;
  let boyut = 80;
  let ayar: MetinAyar = { wght: 700, boyut, renk: KIMLIK.murekkep, aralik: -0.02 };
  let s: string[] = [];
  const blokYuk = (n: number, b: number) => (n - 1) * b * 1.08 + b * 0.72;
  for (; ; boyut -= 4) {
    ayar = { ...ayar, boyut };
    s = satirlar(d.baslik, YAZI_G, ayar, 99);
    if (blokYuk(s.length, boyut) <= bolge) break;
    if (boyut <= 48) {
      const n = Math.max(1, Math.floor((bolge - boyut * 0.72) / (boyut * 1.08)) + 1);
      s = satirlar(d.baslik, YAZI_G, ayar, n);
      break;
    }
  }
  const ilk = UST + boyut * 0.72;
  const baslik = s.map((l, i) => metin(l, KENAR, ilk + i * boyut * 1.08, ayar)).join('');

  const marka = logo(KENAR, Y - 62, 56).svg;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${G}" height="${Y}" viewBox="0 0 ${G} ${Y}">` +
    `<rect width="${G}" height="${Y}" fill="${KIMLIK.kagit}"/><circle cx="${DAIRE.cx}" cy="${DAIRE.cy}" r="${DAIRE.r}" fill="${KIMLIK.yesil}"/>` +
    `${ust}${baslik}${marka}</svg>`
  );
}

/** Çizilen kapağın ekran okuyucu metni. */
export function kapakAlt(post: NewsEntry, lang: Locale) {
  return `${getCategory(post.data.category, lang).title}: ${post.data.title}`;
}

// Yayıncı logosu (JSON-LD publisher.logo): 600×60 yatay PNG; levha + "jen dume" (BRAND.md §6), saydam zemin.
export const LOGO_G = 600;
export const LOGO_Y = 60;

export function logoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${LOGO_G}" height="${LOGO_Y}" viewBox="0 0 ${LOGO_G} ${LOGO_Y}">${logo(0, 56, 52).svg}</svg>`;
}
