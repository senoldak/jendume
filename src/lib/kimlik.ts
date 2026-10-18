// Kimlik v2 (BRAND.md) ortak parçaları: renkler, yazı tipi, levha işareti ve "jen dume" logotipi.
// Hepsi derleme anında Instrument Sans'ın glif yollarından çizilir; site, kapaklar ve marka dosyaları aynı kaynağı kullanır.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { create, type Font } from 'fontkitten';

export const KIMLIK = {
  kagit: '#f4f5f2',
  murekkep: '#16181d',
  yesil: '#00924a', // Esperanto yeşili: tek marka rengi
  yesilYazi: '#00783d', // küçük yeşil yazı (kâğıtta 4,5:1 üstü)
  gri: '#5a5d63',
  cizgi: '#c9ccc4',
  beyaz: '#ffffff',
} as const;

let ana: Font | null = null;
const kesimler = new Map<number, Font>();
/** Instrument Sans (genişlik 100'e sabit), istenen ağırlıkta. Derleme ve betikler proje kökünden çalışır. */
export function font(wght: number): Font {
  let f = kesimler.get(wght);
  if (!f) {
    ana ??= create(readFileSync(path.join(process.cwd(), 'src/kapak/fontlar/InstrumentSans.ttf'))) as Font;
    f = ana.getVariation({ wght }) as Font;
    kesimler.set(wght, f);
  }
  return f;
}

export interface MetinAyar {
  wght: number;
  boyut: number;
  renk: string;
  hiza?: 'start' | 'end';
  aralik?: number; // harf aralığı, em
}

export function genislik(s: string, { wght, boyut, aralik = 0 }: MetinAyar) {
  const f = font(wght);
  const gl = f.glyphsForString(s);
  return gl.reduce((t, g) => t + g.advanceWidth, 0) * (boyut / f.unitsPerEm) + aralik * boyut * Math.max(0, gl.length - 1);
}

/** Metni glif yollarıyla çizer; (x, y) taban çizgisidir. */
export function metin(s: string, x: number, y: number, ayar: MetinAyar) {
  const f = font(ayar.wght);
  const olcek = ayar.boyut / f.unitsPerEm;
  const ara = (ayar.aralik ?? 0) * ayar.boyut;
  let cx = ayar.hiza === 'end' ? x - genislik(s, ayar) : x;
  let yollar = '';
  for (const g of f.glyphsForString(s)) {
    const d = g.path.toSVG();
    if (d) yollar += `<path transform="translate(${cx.toFixed(2)} ${y.toFixed(2)}) scale(${olcek} ${-olcek})" d="${d}"/>`;
    cx += g.advanceWidth * olcek + ara;
  }
  return `<g fill="${ayar.renk}">${yollar}</g>`;
}

/**
 * Levha işareti (BRAND.md §5), 1000 birimlik kare: koyu levha, beyaz büyük J (Instrument Sans 600), sağ üstte yeşil kare.
 * Eski işaretin geometrisi: kare x 656–844, y 156–344; J'nin sağ kenarı 595, yüksekliği 575, alt kenarı 810.
 */
export function levhaIc() {
  const f = font(600);
  const [g] = f.glyphsForString('J');
  const bb = g.bbox;
  const o = 575 / (bb.maxY - bb.minY);
  const tx = 595 - bb.maxX * o;
  const ty = 810 + bb.minY * o;
  return (
    `<rect width="1000" height="1000" fill="${KIMLIK.murekkep}"/>` +
    `<path transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${o.toFixed(5)} ${(-o).toFixed(5)})" d="${g.path.toSVG()}" fill="${KIMLIK.beyaz}"/>` +
    `<rect x="656" y="156" width="188" height="188" fill="${KIMLIK.yesil}"/>`
  );
}

/** Levha, verilen boyda bağımsız SVG; `ekler` <svg> etiketine eklenir (x, y, class…). */
export function levhaSvg(boyut: number, ekler = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${boyut}" height="${boyut}" viewBox="0 0 1000 1000"${ekler ? ` ${ekler}` : ''}>${levhaIc()}</svg>`;
}

/**
 * "jen dume" logotipi (BRAND.md §6): küçük harf, Instrument Sans 600, sıkı aralık; j'nin noktası yeşil.
 * Nokta yazı tipinin kendi noktasıdır: tam "j" yeşil, üstüne noktasız "ȷ" yazı renginde çizilir.
 * (x, y) taban çizgisi; genişliği de döner.
 */
export function logotip(x: number, y: number, boyut: number, renk: string = KIMLIK.murekkep, nokta: string = KIMLIK.yesil) {
  const ayar: MetinAyar = { wght: 600, boyut, renk, aralik: -0.03 };
  const f = font(600);
  const olcek = boyut / f.unitsPerEm;
  const [j] = f.glyphsForString('j');
  const jYesil = `<path transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${olcek} ${-olcek})" d="${j.path.toSVG()}" fill="${nokta}"/>`;
  const svg = jYesil + metin('ȷen dume', x, y, ayar);
  return { svg, genislik: genislik('ȷen dume', ayar) };
}

/** Levha + logotip yan yana; (x, alt) levhanın sol alt köşesi. */
export function logo(x: number, alt: number, levhaBoyu: number, renk: string = KIMLIK.murekkep) {
  const boy = levhaBoyu * 0.62;
  const bosluk = levhaBoyu * 0.28;
  const l = levhaSvg(levhaBoyu, `x="${x.toFixed(1)}" y="${(alt - levhaBoyu).toFixed(1)}"`);
  const taban = alt - levhaBoyu / 2 + boy * 0.52 * 0.5;
  const t = logotip(x + levhaBoyu + bosluk, taban, boy, renk);
  return { svg: l + t.svg, genislik: levhaBoyu + bosluk + t.genislik };
}
