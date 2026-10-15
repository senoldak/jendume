// Haber kapakları: görsel, haberin kendi künyesinden çizilir (kifobu ve tidsrost'taki gibi dışarıdan fotoğraf alınmaz).
// Kapak bir yön levhasıdır: siyah levha, bölüm kodu, iki dilli bölüm adı, büyük başlık ve altta sarı kapı bandı.
// 1200×675 (16:9) SVG döner; /kapak/[lang]/[id].png uç noktası bunu sharp ile PNG'ye çevirir.
// Yazılar yazı tipinden doğrudan vektör yola çevrilir; böylece derleme makinesinde yazı tipi kurulu olması gerekmez.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { create, type Font } from 'fontkitten';
import { SITE, getCategory, formatDate, otherLocale, type Locale } from '../lib/site';
import type { NewsEntry } from '../lib/news';

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

/** Arrow.astro'daki levha oku (24 birimlik kutu), sağı gösterir. */
function ok(x: number, y: number, boyut: number, renk: string) {
  return `<path transform="translate(${x} ${y}) scale(${boyut / 24})" d="M2 10.2h12.6L9.9 5.5 12.4 3 21.4 12l-9 9-2.5-2.5 4.7-4.7H2z" fill="${renk}"/>`;
}

export function kapakSvg(post: NewsEntry, lang: Locale) {
  const d = post.data;
  const diger = otherLocale(lang);
  const kat = getCategory(d.category, lang);
  const katDiger = getCategory(d.category, diger);

  // Üst satır: marka solda, slogan sağda (okuma dili kalın, öteki dil ince).
  const marka = metin(SITE.displayName, KENAR, 98, { yuz: 'kalin', boyut: 54, renk: R.signText, aralik: 1.6 });
  const slogan =
    metin(SITE.tagline[lang], G - KENAR, 76, { yuz: 'yari', boyut: 26, renk: R.signText, hiza: 'end' }) +
    metin(SITE.tagline[diger], G - KENAR, 108, { yuz: 'ince', boyut: 23, renk: R.signMuted, hiza: 'end' });
  const ustCizgi = `<rect x="${KENAR}" y="140" width="${G - KENAR * 2}" height="2" fill="${R.sign2}"/>`;

  // Bölüm satırı: sarı kod karesi + iki dilli bölüm adı (+ önemli gelişme etiketi).
  const kare = 50;
  const kY = 176;
  const kod =
    `<rect x="${KENAR}" y="${kY}" width="${kare}" height="${kare}" fill="${R.signal}"/>` +
    metin(String(kat.code), KENAR + kare / 2 - genislik(String(kat.code), { yuz: 'kalin', boyut: 36, renk: '' }) / 2, kY + 38, { yuz: 'kalin', boyut: 36, renk: R.sign });
  const adAyar: MetinAyar = { yuz: 'yari', boyut: 32, renk: R.signText };
  const xAd = KENAR + kare + 18;
  const tabanAd = kY + 37;
  let bolum = metin(kat.title, xAd, tabanAd, adAyar);
  let xSon = xAd + genislik(kat.title, adAyar) + 16;
  const digerAyar: MetinAyar = { yuz: 'ince', boyut: 27, renk: R.signMuted };
  if (kat.title !== katDiger.title) {
    bolum += metin(katDiger.title, xSon, tabanAd, digerAyar);
    xSon += genislik(katDiger.title, digerAyar) + 20;
  }
  if (d.breaking) {
    const etiket = SITE.ui[lang].breakingBadge.toLocaleUpperCase(SITE.localeTag[lang]);
    const eAyar: MetinAyar = { yuz: 'yari', boyut: 21, renk: R.signText, aralik: 1.2 };
    const en = genislik(etiket, eAyar) + 24;
    if (xSon + en <= G - KENAR) {
      bolum += `<rect x="${xSon.toFixed(1)}" y="${kY + 8}" width="${en.toFixed(1)}" height="34" fill="${R.alert}"/>` + metin(etiket, xSon + 12, kY + 32, eAyar);
    }
  }

  // Başlık: kod satırı ile sarı bant arasında dikeyde ortalanır; uzunsa küçülür.
  const enMaks = G - KENAR * 2;
  let boyut = 72;
  let ayar: MetinAyar = { yuz: 'kalin', boyut, renk: R.signText };
  let s = satirlar(d.title, enMaks, ayar, 4);
  if (s.length > 3) {
    boyut = 60;
    ayar = { ...ayar, boyut };
    s = satirlar(d.title, enMaks, ayar, 4);
  }
  const ust = 250;
  const alt = 548;
  const satirAra = boyut * 1.08;
  const blok = (s.length - 1) * satirAra + boyut * 0.7;
  const ilk = ust + (alt - ust - blok) / 2 + boyut * 0.7;
  const baslik = s.map((l, i) => metin(l, KENAR, Math.round(ilk + i * satirAra), ayar)).join('');

  // Kapı bandı: tam genişlik sarı; solda coğrafya · tarih, sağda ok ve adres.
  const bY = 575;
  const bantAyar: MetinAyar = { yuz: 'yari', boyut: 30, renk: R.sign };
  const kunyeMetin = [d.bolge, formatDate(d.date, lang)].filter(Boolean).join(' · ');
  const kunye = metin(satirlar(kunyeMetin, enMaks - 300, bantAyar, 1)[0], KENAR, bY + 61, bantAyar);
  const adres = 'jendume.com';
  const adresAyar: MetinAyar = { yuz: 'kalin', boyut: 30, renk: R.sign };
  const xAdres = G - KENAR - genislik(adres, adresAyar);
  const bant =
    `<rect y="${bY}" width="${G}" height="${Y - bY}" fill="${R.signal}"/>` +
    `<rect y="${bY}" width="${G}" height="4" fill="${R.sign}"/>` +
    kunye +
    ok(xAdres - 46, bY + 30, 36, R.sign) +
    metin(adres, xAdres, bY + 61, adresAyar);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${G}" height="${Y}" viewBox="0 0 ${G} ${Y}"><rect width="${G}" height="${Y}" fill="${R.sign}"/>${marka}${slogan}${ustCizgi}${kod}${bolum}${baslik}${bant}</svg>`;
}

/** Çizilen kapağın ekran okuyucu metni. */
export function kapakAlt(post: NewsEntry, lang: Locale) {
  return `${getCategory(post.data.category, lang).title}: ${post.data.title}`;
}

export const kapakUrl = (post: NewsEntry, lang: Locale) => `/kapak/${lang}/${post.id}.png`;
