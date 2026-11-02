// Derleme sonu denetimi (astro.config.mjs → grafDenetimi): (1) hiçbir sayfada /grafik/…/graf-N.svg resmi kalmamalı;
// (2) grafiği olan her sayfa stil ve etkileşim betiğini (/graf.css, /graf.js) yüklemeli ve her kart ipucu verisini
// (data-graf-punkter) taşımalı. Biri eksikse grafik ya resim kalır ya sessizce statik çizilir; bu sessiz bir bozulma
// olduğu için derleme durdurulur.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const KART = /<figure class="g-kort[^"]*" data-graf[\s>]/g;
const RESIM = /<img\b[^>]*\bsrc="\/grafik\/[^"]+\/graf-\d+\.svg"/g;
const BETIK = '<script src="/graf.js" defer></script>';
const STIL = '<link rel="stylesheet" href="/graf.css">';
const ISARET = 'data-graf-punkter';

/**
 * Tek sayfanın eksikleri.
 * @param {string} html @returns {string[]}
 */
export function sayfaEksikleri(html) {
  const eksik = [];
  const resim = (html.match(RESIM) ?? []).length;
  if (resim) eksik.push(`${resim} grafik resim olarak kalmış (kart üretilmemiş)`);
  const kart = (html.match(KART) ?? []).length;
  if (!kart) return eksik;
  const nokta = html.split(`<script type="application/json" ${ISARET}>`).length - 1;
  if (nokta < kart) eksik.push(`${kart - nokta}/${kart} grafikte ipucu verisi yok`);
  if (!html.includes(BETIK)) eksik.push('etkileşim betiği (/graf.js) yüklenmiyor');
  if (!html.includes(STIL)) eksik.push('grafik stili (/graf.css) yüklenmiyor');
  return eksik;
}

/** @param {string} kok dist klasörü @returns {Promise<{ sayfa: number, grafik: number, hatalar: string[] }>} */
export async function grafDenetle(kok) {
  const hatalar = [];
  // Betik dosyası derlenmiş çıktıda var mı ve etkileşim kodunu içeriyor mu?
  const betik = await readFile(path.join(kok, 'graf.js'), 'utf8').catch(() => '');
  if (!betik.includes(ISARET)) hatalar.push('graf.js: dist içinde yok ya da etkileşim kodu eksik');
  const stil = await readFile(path.join(kok, 'graf.css'), 'utf8').catch(() => '');
  if (!stil.includes('.g-kort')) hatalar.push('graf.css: dist içinde yok ya da boş');

  let sayfa = 0;
  let grafik = 0;
  for (const f of await readdir(kok, { recursive: true })) {
    if (!f.endsWith('.html')) continue;
    const html = await readFile(path.join(kok, f), 'utf8');
    const n = (html.match(KART) ?? []).length;
    if (n) {
      sayfa++;
      grafik += n;
    }
    for (const e of sayfaEksikleri(html)) hatalar.push(`${f.split(path.sep).join('/')}: ${e}`);
  }
  return { sayfa, grafik, hatalar };
}
