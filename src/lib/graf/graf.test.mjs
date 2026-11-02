import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { bi, setDil, tall } from './felles.mjs';
import { csvAv, grafHtml } from './html.mjs';
import { tegnGraf } from './index.mjs';
import { VARLIKLAR, grafForParagraf } from './kart.mjs';
import { sayfaEksikleri } from './etkilesim-denetim.mjs';
import { validerGraf } from './sema.mjs';

const VERI = fileURLToPath(new URL('../../data/grafik/', import.meta.url));
const tumu = [];
for (const y of readdirSync(VERI)) for (const g of readdirSync(`${VERI}${y}`)) tumu.push({ ad: `${y}/${g}`, yazi: y, graf: g.replace('.json', ''), d: JSON.parse(readFileSync(`${VERI}${y}/${g}`, 'utf8')) });

test('sayı biçimi dile göre: tr 1.849,7 ve %4,85, en 1,849.7 ve 4.85%; eksi U+2212', () => {
  setDil('tr');
  assert.equal(tall(1849.7, 1), '1.849,7');
  assert.equal(bi(4.85, 2, '%'), '%4,85');
  assert.equal(bi(-26.3, 1, '%'), '%−26,3');
  assert.equal(bi(1.44, 2, 'milyar ton'), '1,44 milyar ton');
  setDil('en');
  assert.equal(tall(1849.7, 1), '1,849.7');
  assert.equal(bi(4.85, 2, '%'), '4.85%');
  assert.equal(bi(-26.3, 1, '%'), '−26.3%');
  setDil('tr');
});

test('160 grafiğin hepsi şemaya uyar ve iki dilde çizilir; her değer çıktıda alt metindeki yazımla görünür', () => {
  assert.equal(tumu.length, 160);
  for (const { ad, d } of tumu) {
    assert.deepEqual(validerGraf(d), [], ad);
    const html = grafHtml(d, { id: 'g1', bildetekst: 'Açıklama. Kaynak: X.', dosya: 'x' });
    assert.ok(!/NaN|undefined|Infinity/.test(html), `${ad}: NaN/undefined`);
    setDil(d.dil);
    for (const s of d.serier) for (const p of s.punkter) {
      for (const y of [p.y, p.y2, p.mal]) if (Number.isFinite(y)) assert.ok(html.includes(bi(y, s.desimaler ?? d.desimaler, s.enhet ?? d.enhet).replace(/&/g, '&amp;')), `${ad} ${s.navn}/${p.x}: değer çıktıda yok`);
    }
    // Norveççe kalıntı ve satır içi stil (CSP) olmamalı.
    assert.ok(!/Vis tallene|Kilde|Siste|Forskjell|Andre|Resten|prosent/.test(html), `${ad}: Norveççe sözcük`);
    assert.ok(!/ style="/.test(html), `${ad}: satır içi stil`);
  }
});

test('okura giden etiketler sayfanın diline göre', () => {
  const tr = tumu.find((t) => t.d.dil === 'tr').d;
  const en = tumu.find((t) => t.d.dil === 'en').d;
  const h1 = grafHtml(tr, { bildetekst: 'A.' });
  assert.match(h1, />Grafik<\/button><button[^>]*>Tablo</);
  assert.match(h1, />Veriyi indir \(CSV\)</);
  const h2 = grafHtml(en, { bildetekst: 'A.' });
  assert.match(h2, />Chart<\/button><button[^>]*>Table</);
  assert.match(h2, />Download data \(CSV\)</);
  const k = grafHtml(tr);
  assert.match(k, /Kaynak: /);
  assert.match(grafHtml(en), /Source: /);
});

test('CSV: sayılar ham, ondalık nokta; eşik satırı dahil', () => {
  const { d } = tumu.find((t) => t.yazi === 'dijital-on-yil-hedef-mesafesi' && t.graf === 'graf-4');
  const csv = csvAv(d);
  assert.ok(csv.startsWith('﻿etiket,Bulut\r\n'));
  assert.match(csv, /Küçük,49\.3\r\n/);
  assert.match(csv, /Eşik,75\r\n/);
});

test('her biçim çizim sonucunda ipucu noktası ve tablo verir', () => {
  const gorulen = new Set();
  for (const { ad, d } of tumu) {
    setDil(d.dil);
    const t = tegnGraf(d);
    assert.ok(t.punkter.length > 0, ad);
    assert.ok(t.tabell.rader.length > 0, ad);
    assert.ok(t.svg.startsWith('<svg'), ad);
    gorulen.add(d.form);
  }
  assert.equal(gorulen.size, 11);
});

// ---- Markdown eklentisi ----------------------------------------------------------------------------------------

const par = (src, italik = 'Kapsam. Kaynak: World Bank.') => ({
  type: 'element',
  tagName: 'p',
  children: [
    { type: 'element', tagName: 'img', properties: { src, alt: 'x' }, children: [] },
    { type: 'text', value: '\n' },
    { type: 'element', tagName: 'em', children: [{ type: 'text', value: italik }] },
  ],
});

test('eklenti: JSON varsa kart, italik satır aynen altta; ilk kart stil ve betiği taşır', () => {
  const durum = { ilk: true };
  const h = grafForParagraf(par('/grafik/arge-harcamasi-siralamasi/graf-1.svg'), durum);
  assert.ok(h.startsWith(VARLIKLAR));
  assert.match(h, /<figure class="g-kort" data-graf/);
  assert.match(h, /<p class="g-bildetekst"><em>Kapsam\. Kaynak: World Bank\.<\/em><\/p>/);
  const h2 = grafForParagraf(par('/grafik/arge-harcamasi-siralamasi/graf-2.svg'), durum);
  assert.ok(!h2.includes('graf.css'));
});

test('eklenti: JSON olmayan resim ve başka paragraflar olduğu gibi kalır', () => {
  assert.equal(grafForParagraf(par('/grafik/yok-boyle-yazi/graf-1.svg')), null);
  assert.equal(grafForParagraf(par('/kapak/x.png')), null);
  assert.equal(grafForParagraf({ type: 'element', tagName: 'p', children: [{ type: 'text', value: 'düz metin' }] }), null);
});

// ---- Derleme sonu denetimi -------------------------------------------------------------------------------------

const KART = '<figure class="g-kort" data-graf tabindex="0"></figure><script type="application/json" data-graf-punkter>{}</script>';

test('denetim: tam sayfa temiz, eksikler yakalanır', () => {
  assert.deepEqual(sayfaEksikleri(`${VARLIKLAR}${KART}`), []);
  assert.deepEqual(sayfaEksikleri('<p>grafiksiz</p>'), []);
  assert.match(sayfaEksikleri(KART.replace(/<script type="application\/json" data-graf-punkter>\{\}<\/script>/, '') + VARLIKLAR)[0], /ipucu verisi yok/);
  assert.ok(sayfaEksikleri(KART).some((e) => /graf\.js/.test(e)));
  assert.ok(sayfaEksikleri(KART).some((e) => /graf\.css/.test(e)));
});

test('denetim: kalan grafik resmi derlemeyi durdurur', () => {
  const hatalar = sayfaEksikleri('<p><img src="/grafik/arge-harcamasi-siralamasi/graf-1.svg" alt="x"></p>');
  assert.equal(hatalar.length, 1);
  assert.match(hatalar[0], /resim olarak kalmış/);
  assert.deepEqual(sayfaEksikleri('<img src="/kapak/tr/x.webp">'), []);
});

test('GRAF_KART=0 iken kart eklentisi kapalı', async () => {
  const { satteriGraf } = await import('./kart.mjs');
  const eski = process.env.GRAF_KART;
  process.env.GRAF_KART = '0';
  try {
    assert.equal(satteriGraf()({ fileURL: new URL('file:///x/src/content/haberler/tr/a.md') }), null);
  } finally {
    if (eski === undefined) delete process.env.GRAF_KART;
    else process.env.GRAF_KART = eski;
  }
});
