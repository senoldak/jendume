// Haber kapakları: görsel, haberin kendi künyesinden çizilir (kifobu ve tidsrost'taki gibi dışarıdan fotoğraf alınmaz).
// Kapak sarı bir levhadır: üstte siyah bant (bölüm kodu, bölüm adı, ok), ortada büyük başlık, altta marka.
// 1200×675 (16:9) SVG döner; /kapak/[lang]/[id].png uç noktası bunu sharp ile PNG'ye çevirir.
// Yazılar yazı tipinden doğrudan vektör yola çevrilir; böylece derleme makinesinde yazı tipi kurulu olması gerekmez.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { create, type Font } from 'fontkitten';
import { SITE, getCategory, type Locale } from '../lib/site.ts';
import type { NewsEntry } from '../lib/news.ts';

export const KAPAK_G = 1200;
export const KAPAK_Y = 675;
const G = KAPAK_G;
const Y = KAPAK_Y;
const KENAR = 64;

// Yön levhası paleti (global.css ile aynı).
const R = {
  sign: '#16181d',
  sign2: '#262a32',
  signText: '#ffffff',
  signMuted: '#a7adb7',
  signal: '#ffc72c',
  signalInk: '#4a3a00',
  alert: '#c8102e',
};

type Yuz = 'kalin' | 'yari' | 'ince';
const DOSYA: Record<Yuz, string> = {
  kalin: 'Signika-Bold.ttf',
  yari: 'Signika-SemiBold.ttf',
  ince: 'Signika-Light.ttf',
};

const fontlar = new Map<Yuz, Font>();
function font(yuz: Yuz): Font {
  let f = fontlar.get(yuz);
  if (!f) {
    // Derleme proje kökünden çalışır; paketlenmiş dosyanın yeri değiştiği için import.meta.url kullanılmaz.
    f = create(readFileSync(path.join(process.cwd(), 'src/kapak/fontlar', DOSYA[yuz]))) as Font;
    fontlar.set(yuz, f);
  }
  return f;
}

interface MetinAyar {
  yuz: Yuz;
  boyut: number;
  renk: string;
  hiza?: 'start' | 'end';
  aralik?: number; // harf aralığı, piksel
}

function genislik(s: string, { yuz, boyut, aralik = 0 }: MetinAyar) {
  const f = font(yuz);
  const glifler = f.glyphsForString(s);
  const olcek = boyut / f.unitsPerEm;
  return glifler.reduce((t, g) => t + g.advanceWidth * olcek, 0) + aralik * Math.max(0, glifler.length - 1);
}

/** Metni yazı tipinin glif yollarıyla çizer; (x, y) taban çizgisidir. */
function metin(s: string, x: number, y: number, ayar: MetinAyar) {
  const f = font(ayar.yuz);
  const olcek = ayar.boyut / f.unitsPerEm;
  const aralik = ayar.aralik ?? 0;
  let cx = ayar.hiza === 'end' ? x - genislik(s, ayar) : x;
  let yollar = '';
  for (const g of f.glyphsForString(s)) {
    const d = g.path.toSVG();
    if (d) yollar += `<path transform="translate(${cx.toFixed(1)} ${y}) scale(${olcek} ${-olcek})" d="${d}"/>`;
    cx += g.advanceWidth * olcek + aralik;
  }
  return `<g fill="${ayar.renk}">${yollar}</g>`;
}

/** Kelimeleri verilen genişliğe sığacak satırlara böler. */
function satirlar(s: string, maks: number, ayar: MetinAyar, maksSatir: number) {
  const out: string[] = [];
  let satir = '';
  for (const kelime of s.split(/\s+/)) {
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

/** Levhanın içeriği: haber kapağında haberin başlığı, bölüm kapağında bölümün açıklaması. */
interface Levha {
  title: string;
  category: string;
  breaking?: boolean;
}

export function kapakSvg(post: NewsEntry, lang: Locale) {
  const d = post.data;
  return levhaSvg({ title: d.title, category: d.category, breaking: d.breaking }, lang);
}

/**
 * Bölümün ortak kapağı: kendi kapağı bütçe dışında kalan eski haberlerin paylaşım görseli (bkz. src/lib/kapak.mjs).
 * Başlık yerine bölümün açıklaması durur.
 */
export function bolumKapakSvg(slug: string, lang: Locale) {
  const kat = getCategory(slug, lang);
  return levhaSvg({ title: kat.description, category: slug }, lang);
}

// Sarı levha: sarı zemin, üstte siyah bant (kod karesi, bölüm adı, ok), ortada dev başlık, altta marka.
const BANT = 120;
const ALT = 96;

function levhaSvg(d: Levha, lang: Locale) {
  const kat = getCategory(d.category, lang);
  const yerel = SITE.localeTag[lang];

  // Üst bant.
  const kare = 64;
  const kY = (BANT - kare) / 2;
  const kodAyar: MetinAyar = { yuz: 'kalin', boyut: 46, renk: R.sign };
  const kodMetin = String(kat.code);
  const capKod = 46 * 0.7;
  const kod =
    `<rect x="${KENAR}" y="${kY}" width="${kare}" height="${kare}" fill="${R.signal}"/>` +
    metin(kodMetin, KENAR + kare / 2 - genislik(kodMetin, kodAyar) / 2, Math.round(BANT / 2 + capKod / 2), kodAyar);
  const adAyar: MetinAyar = { yuz: 'yari', boyut: 40, renk: R.signText };
  const xAd = KENAR + kare + 24;
  let bolum = metin(kat.title, xAd, Math.round(BANT / 2 + 40 * 0.35), adAyar);
  const xSon = xAd + genislik(kat.title, adAyar) + 28;
  const okX = G - KENAR - 70;
  const ok = `<path d="M${okX} ${BANT / 2}h52m-22-24 24 24-24 24" stroke="${R.signal}" stroke-width="10" fill="none"/>`;
  if (d.breaking) {
    const etiket = SITE.ui[lang].breakingBadge.toLocaleUpperCase(yerel);
    const eAyar: MetinAyar = { yuz: 'kalin', boyut: 24, renk: R.signText, aralik: 1.2 };
    const en = genislik(etiket, eAyar) + 24;
    const yuk = 24 + 16; // yazı boyu + dikeyde 8'er piksel boşluk, bant içinde ortalı
    if (xSon + en <= okX - 24) {
      bolum +=
        `<rect x="${xSon.toFixed(1)}" y="${BANT / 2 - yuk / 2}" width="${en.toFixed(1)}" height="${yuk}" fill="${R.alert}"/>` +
        metin(etiket, xSon + 12, Math.round(BANT / 2 + 24 * 0.35), eAyar);
    }
  }

  // Başlık: 96 pikselden 52'ye 4'er küçülerek bölgeye sığar; bölge üst bant ile marka alanı arasıdır.
  const enMaks = G - KENAR * 2;
  const bolge = Y - ALT - BANT - 56;
  let boyut = 96;
  let ayar: MetinAyar = { yuz: 'kalin', boyut, renk: R.sign };
  let s: string[] = [];
  const blokYuk = (n: number, b: number) => (n - 1) * b * 1.06 + b * 0.7;
  for (; ; boyut -= 4) {
    ayar = { ...ayar, boyut };
    s = satirlar(d.title, enMaks, ayar, 99);
    if (blokYuk(s.length, boyut) <= bolge) break;
    if (boyut <= 52) {
      const n = Math.max(1, Math.floor((bolge - boyut * 0.7) / (boyut * 1.06)) + 1);
      s = satirlar(d.title, enMaks, ayar, n);
      break;
    }
  }
  const satirAra = boyut * 1.06;
  const blok = blokYuk(s.length, boyut);
  const ilk = BANT + (Y - ALT - BANT - blok) / 2 + boyut * 0.7;
  const baslik = s.map((l, i) => metin(l, KENAR, Math.round(ilk + i * satirAra), ayar)).join('');

  const marka = metin(SITE.displayName, KENAR, Y - 48 + 14, { yuz: 'kalin', boyut: 40, renk: R.sign, aralik: 2 });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${G}" height="${Y}" viewBox="0 0 ${G} ${Y}"><rect width="${G}" height="${Y}" fill="${R.signal}"/><rect width="${G}" height="${BANT}" fill="${R.sign}"/>${kod}${bolum}${ok}${baslik}${marka}</svg>`;
}

/** Çizilen kapağın ekran okuyucu metni. */
export function kapakAlt(post: NewsEntry, lang: Locale) {
  return `${getCategory(post.data.category, lang).title}: ${post.data.title}`;
}


// Yayıncı logosu (JSON-LD publisher.logo): 600×60 yatay PNG. Yalnız mevcut marka varlıklarından türetilir:
// brand/jendume-logo.svg'deki işaret (siyah kare, sarı kare, beyaz J) ve sitedeki yazı markası (Signika Bold, "JEN DUME").
export const LOGO_G = 600;
export const LOGO_Y = 60;

export function logoSvg() {
  const s = LOGO_Y / 128; // işaret 128 birimlik kutuda çizilmiş
  const isaret =
    `<g transform="scale(${s})"><rect width="128" height="128" fill="${R.sign}"/>` +
    `<rect x="84" y="20" width="24" height="24" fill="${R.signal}"/>` +
    `<path d="M58 30H76V78C76 95 65 104 48 104C37 104 29 98 26 89L40 83C42 88 45 90 49 90C56 90 58 86 58 77V30Z" fill="${R.signText}"/></g>`;
  const yazi = metin(SITE.displayName, LOGO_Y + 16, 46, { yuz: 'kalin', boyut: 44, renk: R.sign, aralik: 1.4 });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${LOGO_G}" height="${LOGO_Y}" viewBox="0 0 ${LOGO_G} ${LOGO_Y}">${isaret}${yazi}</svg>`;
}
