// Grafik setinin ortak saf yardımcıları: ölçek, eksen değerleri, dile göre sayı biçimi, SVG yolları.
// Dil: çizimden önce setDil('tr'|'en') ile seçilir (haber dosyasının dili); sayı biçimi ve okura giden metinler ona uyar.

const yuvarla = (n) => Math.round(n * 1e10) / 1e10;

let DIL = 'tr';
const YEREL = { tr: 'tr-TR', en: 'en-US' };
/** @param {string} d 'tr' | 'en' (başkası tr sayılır) */
export function setDil(d) {
  DIL = d === 'en' ? 'en' : 'tr';
}
export const dilAl = () => DIL;
/** Okura giden metin: T('Türkçe', 'English'). */
export const T = (tr, en) => (DIL === 'en' ? en : tr);

/** [min, max] aralığını kapsayan, 1/2/2,5/5 × 10ⁿ adımlı yaklaşık n+1 eksen değeri. Düz seride değerin etrafında açılır. */
export function fineTikker(min, max, n = 4) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) throw new Error(`fineTikker: sonlu olmayan aralık (${min}, ${max})`);
  if (!(max > min)) {
    const a = Math.abs(min) || 1;
    return fineTikker(min - a / 2, max + a / 2, n);
  }
  const ham = (max - min) / n;
  const us = 10 ** Math.floor(Math.log10(ham));
  const adim = [1, 2, 2.5, 5, 10].map((k) => k * us).find((s) => s >= ham - 1e-12);
  const bas = Math.floor(yuvarla(min / adim)) * adim;
  const son = Math.ceil(yuvarla(max / adim)) * adim;
  const ut = [];
  for (let v = bas; v <= son + adim / 2; v += adim) ut.push(yuvarla(v));
  return ut;
}

/** Eksen etiketleri için ondalık sayısı: adımı tam gösterecek kadar (en çok 2). */
export function tikkDesimaler(tikker) {
  const steg = tikker.length > 1 ? Math.abs(tikker[1] - tikker[0]) : Math.abs(tikker[0]);
  if (!steg) return 0;
  for (let d = 0; d <= 2; d++) if (Math.abs(Math.round(steg * 10 ** d) - steg * 10 ** d) < 1e-9) return d;
  return 2;
}

/** Doğrusal ölçek: [d0, d1] → [r0, r1]. Düz aralıkta ortaya düşer. */
export function skala(d0, d1, r0, r1) {
  if (d1 === d0) return () => (r0 + r1) / 2;
  return (v) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
}

const bicim = new Map();
/** Dile göre sayı: tr 1.849,7 / en 1,849.7; eksi işareti U+2212 (haber metnindeki yazım). */
export function tall(v, desimaler = 1) {
  const k = `${DIL}:${desimaler}`;
  if (!bicim.has(k)) bicim.set(k, new Intl.NumberFormat(YEREL[DIL], { minimumFractionDigits: desimaler, maximumFractionDigits: desimaler }));
  return bicim.get(k).format(v).replace(/-/g, '−');
}

/**
 * Birimli değer: enh '%' ise tr %4,85 / en 4.85%; başka birim sayının ardına boşlukla (1,44 milyar ton); '' yalnız sayı.
 * Haber metnindeki yazımın aynısı (alt metin ile birebir; scripts/grafik/alt-metinden.mjs bunu sınar).
 */
export function bi(v, desimaler, enh) {
  const t = tall(v, desimaler);
  if (!enh) return t;
  if (enh === '%') return DIL === 'en' ? `${t}%` : `%${t}`;
  return `${t} ${enh}`;
}

/** Çubuk ucu gibi dar yerlerde: yüzde işaretiyle, öteki birimler olmadan. */
export function kisaBi(v, desimaler, enh) {
  return enh === '%' ? bi(v, desimaler, enh) : tall(v, desimaler);
}

/** Uzun adı `maks` karaktere indirir (sonuna …). */
export function kortNavn(s, maks) {
  return s.length > maks ? `${s.slice(0, maks - 1)}…` : s;
}

/** XML/HTML kaçışı. */
export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Büyük harf, dile göre (tr: i → İ). */
export const buyuk = (s) => String(s).toLocaleUpperCase(YEREL[DIL]);

const n = (v) => yuvarla(Math.round(v * 100) / 100);

/** Noktalardan M/L yolu; y null olan noktada çizgi kesilir. */
export function sti(punkter) {
  let ut = '';
  let acik = false;
  for (const p of punkter) {
    if (p.y === null || p.y === undefined) { acik = false; continue; }
    ut += `${acik ? 'L' : 'M'}${n(p.x)} ${n(p.y)}`;
    acik = true;
  }
  return ut;
}

/** Basamaklı yol: önce yatay, sonra dikey. */
export function trappSti(punkter) {
  const g = punkter.filter((p) => p.y !== null && p.y !== undefined);
  if (!g.length) return '';
  return g.reduce((d, p, i) => (i ? `${d}H${n(p.x)}V${n(p.y)}` : `M${n(p.x)} ${n(p.y)}`), '');
}

/** Birim: sema'daki enhet olduğu gibi ('%', 'milyar ton', ''). */
export const kortEnhet = (enhet) => String(enhet ?? '').trim();

/** Eksende en çok `antall` etiket: baş, son ve aradakiler eşit aralıkla. */
export function etikettIndekser(lengde, antall = 4) {
  const k = Math.min(antall, lengde);
  if (k <= 1) return [0];
  return [...new Set(Array.from({ length: k }, (_, i) => Math.round((i / (k - 1)) * (lengde - 1))))];
}

/** SVG metni (kaçışlı). */
export function tekst(x, y, innhold, attr = '') {
  return `<text x="${n(x)}" y="${n(y)}"${attr ? ` ${attr}` : ''}>${esc(innhold)}</text>`;
}

/** Öznitelik için iki ondalığa yuvarlar. */
export const r2 = (v) => Math.round(v * 100) / 100;

/** Değer null/undefined mı? */
export const tom = (v) => v === null || v === undefined;

/** Sol y ekseni: yatay ızgara çizgileri ve değer etiketleri (g-akse). */
export function yAkse(tikker, y, V, sag) {
  const des = tikkDesimaler(tikker);
  return `<g class="g-akse">${tikker.map((t) => `<line x1="${V}" x2="${sag}" y1="${r2(y(t))}" y2="${r2(y(t))}"${t === 0 ? ' class="g-null"' : ''}/>${tekst(V - 6, y(t) + 4, tall(t, des), 'text-anchor="end"')}`).join('')}</g>`;
}

/** SVG kabuğu. */
export function svgKabuk(bredde, H, beskrivelse, innhold) {
  return `<svg viewBox="0 0 ${bredde} ${H}" class="g-svg" role="img" aria-label="${esc(beskrivelse)}">${innhold}</svg>`;
}
