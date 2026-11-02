import { AJANLAR } from '../lib/ajanlar.mjs';

// Yayın odası sahnesi (src/components/sayfalar/YayinOdasi.astro). Veri: #yayin-odasi-veri JSON'u (gerçek kayıtlar).
// Okura görünen bütün metinler sayfanın diline göre (tr/en). Figür adları, rolleri ve görünümü src/lib/ajanlar.mjs'ten gelir;
// Kerem ve Aylin (sistem ekibi) yalnız sahnede vardır.
function basla() {
const veri = JSON.parse(document.getElementById('yayin-odasi-veri')?.textContent ?? '{}');
const dil = veri.dil === 'en' ? 'en' : 'tr';
const diger = dil === 'tr' ? 'en' : 'tr';
const t = (tr, en) => (dil === 'en' ? en : tr);
const S = 34, O = { x: 760, y: 160 };
const iso = (x, y, z = 0) => [O.x + (x - y) * S * 0.866, O.y + (x + y) * S * 0.5 - z * S];
const pts = (a) => a.map((p) => p.join(',')).join(' ');
const svg = document.getElementById('rom'), NS = 'http://www.w3.org/2000/svg';
const el = (tag, at = {}, parent = svg) => { const e = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(at)) e.setAttribute(k, v); parent.appendChild(e); return e; };
const INK = '#16191c', PAPER = '#f4f5f2', GREEN = '#00924a', GREENT = '#00783d', GREY = '#5a5d63', LINE = '#c9ccc4', LG = '#d3ecdd';
const SANS = '"Instrument Sans", system-ui, sans-serif';
const TAHTA = ['#dfe1da', '#c4c7be', '#adb1a6'];
function kutu(x, y, w, d, h, [ust, sol, sag], g = svg, z0 = 0, cizgi = 1.5) {
  const A = iso(x, y + d, z0), B = iso(x + w, y + d, z0), C = iso(x + w, y, z0);
  const At = iso(x, y + d, z0 + h), Bt = iso(x + w, y + d, z0 + h), Ct = iso(x + w, y, z0 + h), Dt = iso(x, y, z0 + h);
  el('polygon', { points: pts([A, B, Bt, At]), fill: sol, stroke: INK, 'stroke-width': cizgi }, g);
  el('polygon', { points: pts([B, C, Ct, Bt]), fill: sag, stroke: INK, 'stroke-width': cizgi }, g);
  el('polygon', { points: pts([Dt, Ct, Bt, At]), fill: ust, stroke: INK, 'stroke-width': cizgi }, g);
}
const ting = [];
const legg = (dybde, tegn) => ting.push([dybde, tegn]);

// ---------- Kat ----------
const W = 36, D = 24, VH = 3.4;
const zemin = el('g'), verden = el('g'), gangere = el('g'), skilt = el('g'), bobler = el('g');
const ROM = [
  { navn: t('DOĞRULAMA', 'FACT CHECK'), x0: 15, x1: 19.5 }, { navn: t('DİL', 'LANGUAGE'), x0: 19.5, x1: 24 },
  { navn: t('HUKUK', 'LEGAL'), x0: 24, x1: 28.5 }, { navn: t('GRAFİK', 'GRAPHICS'), x0: 28.5, x1: 33 },
];
const iRom = (x, y) => (x >= 15 && x < 33 && y < 5) || (x < 5.5 && y < 5) || (x >= 15 && x < 24 && y >= 15) || (x >= 26 && x < 35 && y >= 16);
for (let x = 0; x < W; x++) for (let y = 0; y < D; y++) {
  const h = iRom(x + 0.5, y + 0.5);
  el('polygon', { points: pts([iso(x, y), iso(x + 1, y), iso(x + 1, y + 1), iso(x, y + 1)]), fill: h ? ((x + y) % 2 ? '#d3ecdd' : '#c7e5d4') : (x + y) % 2 ? '#eef0ea' : '#e5e8e0', stroke: h ? '#b9d8c6' : '#dcdfd6' }, zemin);
}
el('polygon', { points: pts([iso(0, 0), iso(W, 0), iso(W, 0, VH), iso(0, 0, VH)]), fill: '#e8ebe4', stroke: INK, 'stroke-width': 2 }, zemin);
el('polygon', { points: pts([iso(0, 0), iso(0, D), iso(0, D, VH), iso(0, 0, VH)]), fill: '#d9ddd4', stroke: INK, 'stroke-width': 2 }, zemin);
function vindu(a, b, venstre = false) {
  const p = (t, z) => (venstre ? iso(0, t, z) : iso(t, 0, z));
  el('polygon', { points: pts([p(a, 1.3), p(b, 1.3), p(b, 2.8), p(a, 2.8)]), fill: '#2d3135', stroke: INK, 'stroke-width': 2 }, zemin);
  el('polygon', { points: pts([p(a, 1.3), p(a + (b - a) * 0.4, 2.3), p(a + (b - a) * 0.7, 1.85), p(b, 2.15), p(b, 1.3)]), fill: '#4a4f54' }, zemin);
}
vindu(17, 21); vindu(26, 30); vindu(9.6, 12.8, true); vindu(17.2, 20.6, true);
el('polygon', { points: pts([iso(0, 21.2), iso(0, 22.8), iso(0, 22.8, 2.2), iso(0, 21.2, 2.2)]), fill: GREY, stroke: INK, 'stroke-width': 2 }, zemin);
// Duvara düz yerleşen 2B çizim (arka duvar: skewY 30, sol duvar: skewY -30)
function paVegg(t, z, venstre = false) { const [px, py] = venstre ? iso(0, t, z) : iso(t, 0, z); return el('g', { transform: `translate(${px},${py}) skewY(${venstre ? -30 : 30})` }, zemin); }
function veggskilt(tekst, t, z, venstre = false) {
  const g = paVegg(t, z, venstre);
  el('rect', { x: 0, y: -16, width: tekst.length * 10 + 16, height: 24, fill: PAPER, stroke: INK, 'stroke-width': 2 }, g);
  el('text', { x: 8, y: 1, class: 'px', 'font-size': 10, fill: GREENT }, g).textContent = tekst;
}
// jendume levhası: koyu levha, beyaz J, sağ üstte yeşil kare; yanında "jen dume" (j'nin noktası yeşil)
function logo(t, z) {
  const g = el('g', { transform: 'scale(0.8)' }, paVegg(t, z));
  el('rect', { x: 0, y: 0, width: 214, height: 66, fill: PAPER, stroke: INK, 'stroke-width': 3 }, g);
  el('rect', { x: 5, y: 5, width: 56, height: 56, fill: INK }, g);
  el('text', { x: 28, y: 50, 'text-anchor': 'middle', 'font-family': SANS, 'font-weight': 600, 'font-size': 46, fill: '#fff', 'shape-rendering': 'geometricPrecision' }, g).textContent = 'J';
  el('rect', { x: 39, y: 13, width: 11, height: 11, fill: GREEN }, g);
  const tx = el('text', { x: 72, y: 46, 'font-family': SANS, 'font-weight': 600, 'font-size': 38, 'letter-spacing': -1, fill: INK, 'shape-rendering': 'geometricPrecision' }, g);
  tx.textContent = 'ȷen dume';
  el('circle', { cx: 79, cy: 24, r: 4.5, fill: GREEN }, g);
}
function slogan(t, z, venstre = false) {
  const g = paVegg(t, z, venstre);
  el('rect', { x: 0, y: 0, width: 122, height: 44, fill: PAPER, stroke: INK, 'stroke-width': 2 }, g);
  el('rect', { x: 8, y: 9, width: 8, height: 8, fill: GREEN }, g);
  el('text', { x: 22, y: 17, 'font-family': SANS, 'font-weight': 700, 'font-size': 12, fill: INK }, g).textContent = 'kelimelerin ötesinde';
  el('text', { x: 22, y: 34, 'font-family': SANS, 'font-weight': 400, 'font-size': 12, fill: GREY }, g).textContent = 'Beyond Words';
}
logo(8.6, 3.15); slogan(13.0, 3.1, true);
// Duvar saatleri: İstanbul ve UTC, gerçek saat
function klokke(t, z, by, sone) {
  const g = paVegg(t, z);
  el('rect', { x: 0, y: 0, width: 74, height: 40, fill: INK, stroke: INK, 'stroke-width': 2 }, g);
  const tid = el('text', { x: 37, y: 22, 'text-anchor': 'middle', class: 'px', 'font-size': 12, fill: '#4fd18b' }, g);
  el('text', { x: 37, y: 35, 'text-anchor': 'middle', class: 'px', 'font-size': 6, fill: PAPER }, g).textContent = by;
  const oppdater = () => { tid.textContent = new Intl.DateTimeFormat(dil === 'en' ? 'en-GB' : 'tr-TR', { timeZone: sone, hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()); };
  oppdater(); setInterval(oppdater, 10000);
}
klokke(1.0, 3.32, t('İSTANBUL', 'ISTANBUL'), 'Europe/Istanbul'); klokke(3.6, 3.32, 'UTC', 'UTC');
veggskilt(t('HABER MASASI', 'NEWS DESK'), 4.4, 2.6, true);
veggskilt(t('YAZI İŞLERİ', 'LONG READS'), 22.5, 3.2);
function gulvskilt(tekst, x, y) { const [px, py] = iso(x, y); el('text', { x: px, y: py, 'text-anchor': 'middle', class: 'px', 'font-size': 8, fill: '#7d8077' }, zemin).textContent = tekst; }

// Ara duvarlar
const VEGG = ['#eceee8', '#d6d9d0', '#c4c8bd'];
function veggX(y, x0, x1, dor = []) {
  for (let x = x0; x < x1 - 1e-6; x += 0.5) { const xe = Math.min(x1, x + 0.5); if (dor.some(([a, b]) => x >= a - 1e-6 && xe <= b + 1e-6)) continue; legg(xe + y + 0.12, () => kutu(x, y, xe - x, 0.12, 1.4, VEGG, verden, 0, 1)); }
}
function veggY(x, y0, y1, dor = []) {
  for (let y = y0; y < y1 - 1e-6; y += 0.5) { const ye = Math.min(y1, y + 0.5); if (dor.some(([a, b]) => y >= a - 1e-6 && ye <= b + 1e-6)) continue; legg(x + 0.12 + ye, () => kutu(x, y, 0.12, ye - y, 1.4, VEGG, verden, 0, 1)); }
}
for (const r of ROM) { veggY(r.x0, 0, 5); veggX(5, r.x0, r.x1, [[r.x0 + 2.5, r.x0 + 3.5]]); gulvskilt(r.navn, r.x0 + 2.2, 4.7); }
veggY(33, 0, 5);
// Sunucu odası
veggX(5, 0, 5.5, [[3.5, 4.5]]); veggY(5.5, 0, 5); gulvskilt(t('SUNUCU ODASI', 'SERVER ROOM'), 2.6, 4.7);
for (const [x, y] of [[0.5, 0.6], [1.7, 0.6], [2.9, 0.6], [0.5, 2.6], [1.7, 2.6]]) legg(x + 0.9 + y + 0.8, () => {
  kutu(x, y, 0.9, 0.8, 2.0, ['#2d3135', '#16191c', '#24282c'], verden);
  for (let i = 0; i < 6; i++) for (let k = 0; k < 3; k++) { const [px, py] = iso(x + 0.15 + k * 0.28, y + 0.8, 0.3 + i * 0.28); el('rect', { class: 'led', style: `animation-delay:${(Math.random() * 1.1).toFixed(2)}s`, x: px - 2, y: py - 3, width: 4, height: 3, fill: ['#00924a', '#00924a', '#c9ccc4', '#f4f5f2'][(i + k) % 4] }, verden); }
});
// Yazar odası ve toplantı odası
veggX(15, 15, 24, [[18.5, 19.5]]); veggY(15, 15, 24); veggY(24, 15, 24); gulvskilt(t('YAZAR ODASI', 'WRITERS ROOM'), 19.5, 23.6);
veggX(16, 26, 35, [[29.5, 30.5]]); veggY(26, 16, 24); veggY(35, 16, 24); gulvskilt(t('TOPLANTI ODASI', 'MEETING ROOM'), 30.5, 23.6);

// ---------- Mobilya ----------
function plante(x, y) { legg(x + y + 0.6, () => { kutu(x, y, 0.5, 0.5, 0.45, ['#c4c7be', '#adb1a6', '#9a9e93'], verden); const [px, py] = iso(x + 0.25, y + 0.25, 0.45); for (const [dx, dy, r] of [[0, -16, 11], [-8, -9, 9], [8, -9, 9], [0, -26, 7]]) el('circle', { cx: px + dx, cy: py + dy, r, fill: GREEN, stroke: INK, 'stroke-width': 1.2 }, verden); }); }
function hylle(x, y, w) { legg(x + w + y + 0.4, () => { kutu(x, y, w, 0.4, 1.8, ['#dfe1da', '#c4c7be', '#adb1a6'], verden); for (let i = 0; i < 3; i++) for (let k = 0; k < w * 4; k++) { const [px, py] = iso(x + 0.1 + k * 0.25, y + 0.4, 0.3 + i * 0.55); el('rect', { x: px - 2, y: py - 12, width: 5, height: 12, fill: [GREEN, GREY, LINE, GREENT, INK][(k + i * 2) % 5], stroke: INK, 'stroke-width': 0.8 }, verden); } }); }
hylle(6.2, 0.1, 3); hylle(15.4, 15.2, 2.5); hylle(33.4, 0.2, 2.2);
for (const [x, y] of [[0.4, 6.0], [13.8, 9.5], [14.3, 23.3], [35.2, 6.0], [35.3, 15.2], [24.6, 23.3], [5.9, 5.6], [25.1, 9.8]]) plante(x, y);
// Su sebili + kahve (mola köşesi)
const MOLA = [12.2, 3.0];
legg(11.6 + 1.0 + 0.6, () => { kutu(11.0, 0.6, 0.6, 0.6, 1.0, ['#fdfdfb', '#e6e6e0', '#dcded8'], verden); kutu(11.1, 0.7, 0.4, 0.4, 0.6, ['#e8f4ec', '#d3ecdd', '#bfe0cd'], verden, 1.0); });
legg(13.2 + 1.0 + 0.6, () => { kutu(12.4, 0.6, 1.0, 0.8, 0.9, ['#5a5d63', '#3d4247', '#2d3135'], verden); kutu(12.6, 0.75, 0.45, 0.4, 0.45, ['#00924a', '#00783d', '#006a37'], verden, 0.9); });
// Toplantı masası
legg(33 + 21, () => kutu(28, 18.5, 5, 2, 0.5, TAHTA, verden));
for (const x of [28.4, 29.6, 30.8, 32.0]) for (const y of [17.9, 20.6]) legg(x + y + 0.5, () => kutu(x, y, 0.5, 0.45, 0.3, ['#2d3135', INK, INK], verden));
// Çöp kutusu
const KURV = [10.3, 22.1];
legg(10.8 + 22.3, () => kutu(10.0, 21.8, 0.5, 0.5, 0.5, ['#5a5d63', '#3d4247', '#2d3135'], verden));

// ---------- Piksel insan ----------
const P = 3;
function sprite(u, ki, gang) {
  const Wd = 14, H = 28, g = Array.from({ length: H }, () => Array(Wd).fill(null));
  const set = (r, c, v) => { if (r >= 0 && r < H && c >= 0 && c < Wd) g[r][c] = v; };
  const fill = (r0, r1, c0, c1, v) => { for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) set(r, c, v); };
  const o = 2;
  if (gang === 1) { fill(o + 19, o + 24, 2, 5, 'P'); fill(o + 19, o + 23, 8, 11, 'P'); fill(o + 25, o + 25, 1, 5, 'B'); fill(o + 24, o + 24, 8, 12, 'B'); }
  else if (gang === 2) { fill(o + 19, o + 23, 2, 5, 'P'); fill(o + 19, o + 24, 8, 11, 'P'); fill(o + 24, o + 24, 1, 5, 'B'); fill(o + 25, o + 25, 8, 12, 'B'); }
  else { fill(o + 19, o + 24, 3, 6, 'P'); fill(o + 19, o + 24, 7, 10, 'P'); fill(o + 25, o + 25, 2, 6, 'B'); fill(o + 25, o + 25, 7, 11, 'B'); }
  fill(o + 10, o + 18, 2, 11, 'T');
  const arm = gang ? (gang === 1 ? [1, -1] : [-1, 1]) : [0, 0];
  fill(o + 11 + arm[0], o + 17 + arm[0], 0, 1, 'T'); fill(o + 11 + arm[1], o + 17 + arm[1], 12, 13, 'T');
  fill(o + 18 + arm[0], o + 18 + arm[0], 0, 1, 'S'); fill(o + 18 + arm[1], o + 18 + arm[1], 12, 13, 'S');
  fill(o + 11, o + 17, 2, 2, 't'); fill(o + 11, o + 17, 11, 11, 't');
  if (u.ceket) { fill(o + 10, o + 18, 2, 4, 'J'); fill(o + 10, o + 18, 9, 11, 'J'); fill(o + 11 + arm[0], o + 17 + arm[0], 0, 1, 'J'); fill(o + 11 + arm[1], o + 17 + arm[1], 12, 13, 'J'); }
  fill(o + 10, o + 10, 5, 8, 'C');
  fill(o + 9, o + 9, 5, 8, 'S');
  fill(o + 3, o + 7, 2, 11, 'S'); fill(o + 8, o + 8, 3, 10, 'S'); fill(o + 2, o + 2, 3, 10, 'S');
  set(o + 5, 4, 'E'); set(o + 5, 9, 'E'); set(o + 4, 4, 'b'); set(o + 4, 9, 'b');
  set(o + 7, 6, 'M'); set(o + 7, 7, 'M');
  const sac = u.sac;
  if (sac !== 'kel') { fill(o + 0, o + 0, 4, 9, 'H'); fill(o + 1, o + 2, 2, 11, 'H'); set(o + 3, 2, 'H'); set(o + 3, 11, 'H'); }
  else { set(o + 3, 2, 'H'); set(o + 4, 2, 'H'); set(o + 3, 11, 'H'); set(o + 4, 11, 'H'); }
  if (sac === 'uzun') { fill(o + 1, o + 13, 1, 1, 'H'); fill(o + 1, o + 13, 12, 12, 'H'); fill(o + 3, o + 12, 2, 2, 'H'); fill(o + 3, o + 12, 11, 11, 'H'); }
  if (sac === 'topuz') { fill(o - 2, o - 1, 5, 8, 'H'); set(o + 3, 3, 'H'); set(o + 3, 10, 'H'); }
  if (sac === 'kivircik') { fill(o - 1, o - 1, 3, 10, 'H'); fill(o + 0, o + 4, 1, 1, 'H'); fill(o + 0, o + 4, 12, 12, 'H'); fill(o + 0, o + 0, 2, 11, 'H'); set(o + 3, 3, 'H'); set(o + 3, 10, 'H'); }
  if (sac === 'kakul') fill(o + 3, o + 3, 3, 7, 'H');
  if (sac === 'atkuyrugu') fill(o + 3, o + 9, 12, 13, 'H');
  if (u.sakal) { fill(o + 6, o + 8, 2, 2, 'H'); fill(o + 6, o + 8, 11, 11, 'H'); fill(o + 8, o + 8, 3, 10, 'H'); fill(o + 9, o + 9, 4, 9, 'H'); set(o + 7, 5, 'H'); set(o + 7, 8, 'H'); }
  if (u.gozluk) { fill(o + 5, o + 5, 3, 5, 'G'); fill(o + 5, o + 5, 8, 10, 'G'); set(o + 5, 6, 'G'); set(o + 5, 7, 'G'); set(o + 5, 4, 'E'); set(o + 5, 9, 'E'); }
  // Ajanlar (insan değil): yeşil askı ve yeşil kimlik kartı
  if (ki) { for (let i = 0; i < 4; i++) { set(o + 10 + i, 5 + (i >> 1), 'L'); set(o + 10 + i, 8 - (i >> 1), 'L'); } fill(o + 14, o + 16, 5, 8, 'K'); set(o + 15, 6, 'k'); set(o + 15, 7, 'k'); }
  return g;
}
function tegnFigur(u, ki, gang, parent) {
  const renk = { H: u.sacRenk, S: u.ten, E: INK, b: INK, M: '#9e4b3f', T: u.ust, t: u.ustGolge ?? u.ust, J: u.ceket ?? u.ust,
    C: u.yaka ?? '#fdfdfb', P: u.alt ?? '#2d3135', B: INK, G: INK, L: GREEN, K: '#fdfdfb', k: GREEN };
  const grid = sprite(u, ki, gang), H = grid.length, Wd = grid[0].length;
  const f = el('g', {}, parent);
  const dolu = (r, c) => r >= 0 && r < H && c >= 0 && c < Wd && grid[r][c];
  for (let r = -1; r <= H; r++) for (let c = -1; c <= Wd; c++)
    if (!dolu(r, c) && (dolu(r - 1, c) || dolu(r + 1, c) || dolu(r, c - 1) || dolu(r, c + 1))) el('rect', { x: c * P, y: r * P, width: P, height: P, fill: INK }, f);
  for (let r = 0; r < H; r++) for (let c = 0; c < Wd; c++) if (grid[r][c]) el('rect', { x: c * P, y: r * P, width: P, height: P, fill: renk[grid[r][c]] }, f);
  const blunk = el('g', { class: 'blunk', style: `animation-delay:${(Math.random() * 4).toFixed(2)}s` }, f);
  for (const c of [4, 9]) el('rect', { x: c * P, y: 7 * P, width: P, height: P, fill: u.ten }, blunk);
  return f;
}
const SW = 14 * P, SH = 28 * P;

// ---------- Ekip ----------
const HALL = 6.6;
const aapen = (x, y) => ({ x, y, ut: [[x + 0.75, y + 1.35], [x + 2.25, y + 1.35], [x + 2.25, HALL]] });
const rom = (r) => { const x = r.x0 + 0.8; return { x, y: 1.8, ut: [[x + 0.75, 3.15], [r.x0 + 3, 3.15], [r.x0 + 3, HALL]] }; };
const DORF = 19.0; // yazar odası kapısı
const forf = (x, y) => ({ x, y, ut: [[x + 0.75, y + 1.35], [DORF, y + 1.35], [DORF, 14.4], [DORF, HALL]] });
const JOB = {
  ada: ["Haber akışlarını tarar ve yeni haberleri bulur.", "Scans news feeds and finds new stories."],
  kaan: ["Her haberin değerini 100 üzerinden puanlar. 70 altındaki haber yazılmaz.", "Scores each story out of 100. Stories below 70 are not written."],
  elif: ["Haberi kaynaklardan Türkçe ve İngilizce yazar.", "Writes the story in Turkish and English from the sources."],
  selin: ["Rakamları, ölçekleri, tarihleri ve adları kaynakla karşılaştırır. Yayın kurallarını uygular.", "Checks figures, scales, dates and names against the sources. Applies the publishing rules."],
  mert: ["Düzeltme turlarını yürütür.", "Runs the correction rounds."],
  arda: ["Haberin kapağını çizer.", "Draws the cover of the story."],
  lale: ["Haberi yayımlar.", "Publishes the story."],
  konu: ["Uzun yazı için konuyu ve bakış açısını seçer.", "Chooses the topic and angle for a long read."],
  arastirma: ["Resmî kaynaklardan rakam ve belge toplar. Her rakam için kanıt saklar.", "Gathers figures and documents from official sources. Keeps evidence for every figure."],
  yazim: ["Araştırmaya dayanarak ilk taslağı yazar.", "Writes the first draft from the research."],
  dogrulama: ["Her rakamı ve her alıntıyı kaynakla karşılaştırır.", "Checks every figure and quote against the sources."],
  grafik: ["Yazının grafiklerini çizer.", "Draws the charts for the piece."],
  redaksiyon: ["Metni sıkılaştırır. Başlıkları ve ara başlıkları düzenler.", "Tightens the text. Edits headlines and subheadings."],
  dil: ["Yapay zekâ kokan cümleleri bulur ve geri gönderir.", "Finds sentences that sound like AI and sends them back."],
  hukuk: ["Yayından önce hukuki riske bakar.", "Looks at legal risk before publication."],
  kapak: ["Yazının kapağını çizer.", "Draws the cover for the piece."],
  yayin: ["Her şeyi toplar ve yazıyı yayına hazırlar.", "Pulls everything together and prepares the piece for publication."],
  senol: ["Kendi yazılarını kendisi yazar. Yapay zekâ yalnızca çeviri ve dil düzeltmesi yapar.", "Writes the pieces under this name. AI only translates and edits the language."],
  cem: ["Şenol Dak’ın yazılarını öteki dile çevirir. İçerik Şenol Dak’a aittir.", "Translates Şenol Dak’s pieces into the other language. The content is Şenol Dak’s."],
  mina: ["Şenol Dak’ın yazılarının dilini düzeltir. İçeriğe dokunmaz.", "Corrects the language of Şenol Dak’s pieces. Does not touch the content."],
  kerem: ["Sunucuları ve otomatik adımları çalışır tutar.", "Keeps the servers and automated steps running."],
  aylin: ["Kotaları ve maliyeti izler.", "Watches quotas and costs."],
};
const REP = {
  ada: [["Akışlar taranıyor …", "Yeni bir haber!", "Üç yeni haber."], ["Scanning the feeds …", "A new story!", "Three new stories."]],
  kaan: [["Puanlıyorum …", "Değeri düşük. Çöpe.", "Bunu yazmıştık."], ["Scoring it …", "Low value. Bin.", "We already have this."]],
  elif: [["Giriş cümlesini yazıyorum …", "Başlık oturdu!"], ["Writing the lead …", "The headline works!"]],
  selin: [["Rakam kaynakla aynı.", "Tarihi kontrol ediyorum …"], ["The figure matches the source.", "Checking the date …"]],
  mert: [["Düzeltme turu başladı.", "Bir daha okuyorum …", "Zzz …"], ["Correction round started.", "Reading it once more …", "Zzz …"]],
  arda: [["Kapağı çiziyorum …", "Yeşil nokta biraz büyüsün."], ["Drawing the cover …", "Make the green dot bigger."]],
  lale: [["Yayımlandı!"], ["Published!"]],
  dogrulama: [["Bu rakamın kaynağı eksik!", "Rakamlar tutuyor."], ["This figure has no source!", "The figures hold up."]],
  dil: [["Bu cümle yapay zekâ gibi!", "Şimdi daha iyi."], ["That sounds like AI!", "Better now."]],
  hukuk: [["Hukuki risk var mı? Yok.", "Bu cümle çıkmalı."], ["Legal risk? None.", "That sentence has to go."]],
  grafik: [["Grafiği çiziyorum …", "Eksen sıfırdan başlamalı."], ["Drawing the chart …", "The axis must start at zero."]],
  konu: [["Günün konusu seçildi.", "Okur kim?"], ["Topic chosen for today.", "Who is the reader?"]],
  arastirma: [["Resmî kaynaklardan rakam çekiyorum …", "Kaynak kaydedildi."], ["Pulling official figures …", "Source saved."]],
  yazim: [["İlk taslak hazır!", "Yazıyorum …"], ["First draft is ready!", "Writing …"]],
  redaksiyon: [["Metni sıkılaştırıyorum.", "Başlık kısalsın!"], ["Tightening the text.", "Shorter headline!"]],
  kapak: [["Kapak çiziliyor …", "Yeşil daire köşeden taşsın."], ["Drawing the cover …", "The green circle should spill from the corner."]],
  yayin: [["Yayına hazır.", "Şenol Dak’a gönderiyorum."], ["Ready to publish.", "Sending it to Şenol Dak."]],
  senol: [["Yeni yazı yolda!", "Kahve ister misiniz?", "İyi iş!"], ["A new piece is on its way!", "Anyone for coffee?", "Good work!"]],
  cem: [["Çeviriyorum …", "Bunun karşılığı ne?"], ["Translating …", "What is the word for this?"]],
  mina: [["Virgül düzeltildi.", "Dil düzeltmesi bitti."], ["Comma fixed.", "Language editing done."]],
  kerem: [["Bütün sistemler ayakta.", "Kabloyu kim çekti?"], ["All systems up.", "Who pulled the cable?"]],
  aylin: [["Kota iyi görünüyor.", "Yeniden başlatıyorum …"], ["Quota looks fine.", "Restarting …"]],
};
// id: sahnedeki iç ad; ajan: src/lib/ajanlar.mjs'teki anahtar (ad, rol ve görünüm oradan).
const kisi = (id, ajan, yer, ekstra = {}) => {
  const a = AJANLAR[ajan];
  return { id, navn: a.ad, rolle: a.rol[dil], en: a.rol[diger], menneske: !a.yz, u: a.u, ...yer, jobb: t(...JOB[id]), rep: [...REP[id][dil === 'en' ? 1 : 0]], ...ekstra };
};
// Haber masası (7 ajan)
const HABER = [
  kisi('ada', 'ada', aapen(1.5, 19)), kisi('kaan', 'kaan', aapen(6.0, 19)), kisi('elif', 'elif', aapen(1.5, 14)),
  kisi('selin', 'selin', aapen(6.0, 14)), kisi('mert', 'mert', aapen(10.5, 14)), kisi('arda', 'arda', aapen(1.5, 9)), kisi('lale', 'lale', aapen(6.0, 9)),
];
// Yazı işleri zinciri (10 rol)
const YAZI = [
  kisi('dogrulama', 'nil', rom(ROM[0])), kisi('dil', 'bora', rom(ROM[1])), kisi('hukuk', 'ipek', rom(ROM[2])), kisi('grafik', 'umut', rom(ROM[3])),
  kisi('konu', 'deniz', aapen(16, 8.5)), kisi('arastirma', 'ece', aapen(20.5, 8.5)), kisi('yazim', 'can', aapen(25, 8.5)),
  kisi('redaksiyon', 'defne', aapen(29.5, 8.5)), kisi('kapak', 'tuna', aapen(25, 12.5)), kisi('yayin', 'su', aapen(29.5, 12.5)),
];
// Yazar odası: Şenol yazar; yapay zekâ yalnız çevirir ve dil düzeltmesi yapar
const SENOL = kisi('senol', 'senol', forf(16.2, 18.5), { bred: 2.2 });
const FORF = [kisi('cem', 'cem', forf(20.8, 18.5)), kisi('mina', 'mina', forf(20.8, 21.6))];
// Sistem ekibi: sunucuları ve kotaları izleyen otomatik adımların karşılığı (ajanlar.mjs'te yok)
const IT = [
  { id: 'kerem', navn: 'Kerem', rolle: t('Sunucu', 'Servers'), en: t('Servers', 'Sunucu'), menneske: false, ...aapen(6.6, 2.4), u: { sac: 'kisa', sacRenk: '#b5482a', ten: '#f2cfb0', ust: '#3d4247', ustGolge: '#2d3135', sakal: true }, jobb: t(...JOB.kerem), rep: [...REP.kerem[dil === 'en' ? 1 : 0]] },
  { id: 'aylin', navn: 'Aylin', rolle: t('Kota ve maliyet', 'Quotas and costs'), en: t('Quotas and costs', 'Kota ve maliyet'), menneske: false, ...aapen(9.4, 2.4), u: { sac: 'kivircik', sacRenk: '#16191c', ten: '#a8714e', ust: '#00924a', ustGolge: '#00783d', gozluk: true }, jobb: t(...JOB.aylin), rep: [...REP.aylin[dil === 'en' ? 1 : 0]] },
];
const ALLE = [...HABER, ...YAZI, SENOL, ...FORF, ...IT];
const by = Object.fromEntries(ALLE.map((a) => [a.id, a]));

// ---------- Gerçek veri (#yayin-odasi-veri; sayfa sunucu tarafında hesaplar) ----------
const R = veri;
const tall = (n) => new Intl.NumberFormat(dil === 'en' ? 'en-GB' : 'tr-TR').format(n);
const kort35 = (x) => (x.length > 38 ? x.slice(0, 36).replace(/\s+\S*$/, '') + ' …' : x);
const haftaToplam = R.haftaToplam ?? 0;
// Olgu iddia eden satırlar gerçek veriden; haber yoksa nötr.
if ((R.sonHaberler ?? []).length) by.lale.rep = [t('Yayımlandı!', 'Published!'), t(`Son 7 günde ${tall(haftaToplam)} haber yayımlandı.`, `${tall(haftaToplam)} stories published in the last 7 days.`)];
const haftaKart = {
  lale: () => ((R.sonHaberler ?? []).length ? t(`Son 7 günde ${tall(haftaToplam)} haber yayımlandı.`, `${tall(haftaToplam)} stories were published in the last 7 days.`) : null),
};

// ---------- İstasyonlar ----------
function stasjon(a) {
  const bred = a.bred ?? 1.5;
  legg(a.x + bred + a.y + 0.9, () => {
    const g = el('g', {}, verden);
    kutu(a.x + 0.45, a.y - 0.75, 0.6, 0.5, 0.35, ['#2d3135', INK, INK], g);
    kutu(a.x + 0.45, a.y - 0.8, 0.6, 0.12, 1.1, ['#3d4247', '#2d3135', '#2d3135'], g, 0.35);
    const [px, py] = iso(a.x + 0.75, a.y - 0.25);
    a.sitter = el('g', { transform: `translate(${px - SW / 2},${py - SH})` }, g);
    tegnFigur(a.u, !a.menneske, 0, el('g', { class: 'sitter', style: `animation-delay:${(Math.random() * 2.4).toFixed(2)}s` }, a.sitter));
    kutu(a.x, a.y, bred, 0.9, 0.55, a.menneske ? ['#8b8f86', '#6d7168', '#575b53'] : TAHTA, g);
    kutu(a.x + 1.0, a.y + 0.15, 0.12, 0.6, 0.45, ['#16191c', '#3d4247', '#2d3135'], g, 0.55);
    kutu(a.x + 0.2, a.y + 0.4, 0.4, 0.3, 0.03, ['#fdfdfb', '#e6e6e0', '#dcded8'], g, 0.55);
    if (a.menneske) { kutu(a.x + 1.5, a.y + 0.4, 0.3, 0.18, 0.04, [GREEN, INK, INK], g, 0.55); a.telefon = iso(a.x + 1.65, a.y + 0.5, 0.65); kutu(a.x + 1.4, a.y + 0.05, 0.2, 0.2, 0.2, ['#fdfdfb', '#e6e6e0', '#dcded8'], g, 0.55); }
    const navn = a.menneske ? a.navn : `${a.navn} ${t('(YZ)', '(AI)')}`;
    const hx = px, hy = py - SH - 6;
    const tg = el('g', { class: 'tag', tabindex: 0, role: 'button', 'aria-label': `${navn}, ${a.rolle}` }, skilt);
    const w = Math.max(navn.length * 7.5, a.rolle.length * 6.5) + 12;
    el('rect', { x: hx - w / 2, y: hy - 28, width: w, height: 26, fill: a.menneske ? '#fff' : PAPER, stroke: INK, 'stroke-width': a.menneske ? 3 : 2 }, tg);
    el('text', { x: hx, y: hy - 17, 'text-anchor': 'middle', class: 'px', 'font-size': 7.5, fill: a.menneske ? INK : GREENT }, tg).textContent = navn;
    el('text', { x: hx, y: hy - 6, 'text-anchor': 'middle', class: 'px', 'font-size': 6.5, fill: GREY }, tg).textContent = a.rolle;
    a.hode = [hx, hy - 30];
    tg.addEventListener('click', () => visKort(a));
    tg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); visKort(a); } });
  });
}
ALLE.forEach(stasjon);
ting.sort((p, q) => p[0] - q[0]).forEach(([, tegn]) => tegn());
svg.appendChild(gangere); svg.appendChild(skilt); svg.appendChild(bobler);

const kort = document.getElementById('kort');
function visKort(a) {
  kort.innerHTML = `<h2>${a.menneske ? a.navn : a.navn + ' ' + t('(YZ)', '(AI)')}</h2><p><strong>${a.rolle}</strong> <span class="en" lang="${diger}">${a.en}</span> · ${a.menneske ? t('insan', 'human') : t('otomatik adım, insan değil', 'automated step, not a person')}</p><p>${a.jobb}</p>${haftaKart[a.id]?.() ? `<p><strong>${haftaKart[a.id]()}</strong></p>` : ''}`;
  if (a.rep[0]) snakk(a, a.rep[0]);
}

// ---------- Konuşma ----------
function snakk(a, tekst, ms = 2200) {
  const [hx, hy] = a.gaar ? a.gaar.hode() : a.hode;
  const g = el('g', {}, bobler);
  const w = tekst.length * 6.6 + 14;
  const bx = Math.min(1810 - w, Math.max(5, hx - 10)), by_ = hy - 26;
  el('rect', { x: bx, y: by_, width: w, height: 20, fill: PAPER, stroke: INK, 'stroke-width': 1.5 }, g);
  el('polygon', { points: `${hx - 4},${by_ + 20} ${hx + 6},${by_ + 20} ${hx - 2},${by_ + 28}`, fill: PAPER, stroke: INK, 'stroke-width': 1.5 }, g);
  el('text', { x: bx + 7, y: by_ + 13.5, class: 'px', 'font-size': 6.5, fill: INK }, g).textContent = tekst;
  setTimeout(() => g.remove(), ms);
}
const rolig = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!rolig) setInterval(() => {
  const k = ALLE.filter((a) => a.rep.length && !a.gaar);
  const a = k[Math.floor(Math.random() * k.length)];
  snakk(a, a.rep[Math.floor(Math.random() * a.rep.length)]);
}, 1300);

// ---------- Yürüme ----------
const vent = (ms) => new Promise((r) => setTimeout(r, ms));
async function gaaRute(a, rute, last, fart = 1, slukker = false) {
  a.sitter.setAttribute('visibility', 'hidden');
  const g = el('g', {}, gangere);
  const ramme = [0, 1, 2].map((k) => { const f = tegnFigur(a.u, !a.menneske, k, g); f.setAttribute('visibility', 'hidden'); return f; });
  if (slukker) { el('rect', { x: SW - 2, y: 15 * P, width: 10, height: 22, fill: GREEN, stroke: INK, 'stroke-width': 1.5 }, g); el('rect', { x: SW + 1, y: 15 * P - 5, width: 4, height: 5, fill: INK }, g); }
  if (last) el('rect', { x: SW - 4, y: 18 * P, width: 12, height: 15, fill: '#fdfdfb', stroke: INK, 'stroke-width': 1.5 }, g);
  let pos = rute[0];
  a.gaar = { hode: () => { const [px, py] = iso(...pos); return [px, py - SH - 4]; } };
  for (let i = 1; i < rute.length; i++) {
    const fra = rute[i - 1], til = rute[i];
    const varighet = Math.hypot(til[0] - fra[0], til[1] - fra[1]) * 300 * fart + 1;
    const t0 = performance.now();
    await new Promise((ferdig) => {
      function steg(now) {
        const s = Math.min(1, (now - t0) / varighet);
        pos = [fra[0] + (til[0] - fra[0]) * s, fra[1] + (til[1] - fra[1]) * s];
        const [px, py] = iso(...pos);
        g.setAttribute('transform', `translate(${px - SW / 2},${py - SH})`);
        const k = 1 + (Math.floor(now / 140) % 2);
        ramme.forEach((f, j) => f.setAttribute('visibility', j === k ? 'visible' : 'hidden'));
        if (s < 1) requestAnimationFrame(steg); else ferdig();
      }
      requestAnimationFrame(steg);
    });
  }
  ramme.forEach((f, j) => f.setAttribute('visibility', j === 0 ? 'visible' : 'hidden'));
  return () => { g.remove(); a.gaar = null; a.sitter.setAttribute('visibility', 'visible'); };
}
const rute = (fra, til) => [...fra.ut, ...[...til.ut].reverse()];
async function ledig(...a) { while (a.some((x) => x.opptatt)) await vent(250); a.forEach((x) => (x.opptatt = true)); }
const fri = (...a) => a.forEach((x) => (x.opptatt = false));
async function lever(fra, til, tekst, svar) {
  await ledig(fra, til);
  const r = rute(fra, til);
  let ferdig = await gaaRute(fra, r, true);
  snakk(fra, tekst, 1600); await vent(900);
  if (svar) snakk(til, svar, 1600);
  await vent(900);
  ferdig();
  ferdig = await gaaRute(fra, [...r].reverse(), false);
  ferdig();
  fri(fra, til);
}

// Yazı işleri zinciri: 10 rol sırayla; son adımda Su yazıyı Şenol Dak'a onaya götürür. Tur sayıları kaydedilmediği için geri gönderme gösterilmez.
const KJEDE = ['konu', 'arastirma', 'yazim', 'dogrulama', 'grafik', 'redaksiyon', 'dil', 'hukuk', 'kapak', 'yayin'];
const REPLIKK = {
  konu: [t('Yeni bir konu var!', 'There is a new topic!'), t('Rakamları toplarım.', 'I will gather the figures.')],
  arastirma: [t('Kaynaklar burada.', 'Here are the sources.'), t('Sağ olun!', 'Thanks!')],
  yazim: [t('Taslak hazır!', 'The draft is ready!'), t('Her rakamı kontrol ederim.', 'I will check every figure.')],
  dogrulama: [t('Rakamlar tutuyor.', 'The figures hold up.'), t('Grafiği çiziyorum.', 'Drawing the chart.')],
  grafik: [t('Grafik hazır.', 'The chart is ready.'), t('Metni sıkılaştırıyorum.', 'Tightening the text.')],
  redaksiyon: [t('Metin sıkılaştı.', 'The text is tighter.'), t('Dile bakıyorum …', 'Checking the language …')],
  dil: [t('Dil temiz.', 'The language is clean.'), t('Hukuki riske bakıyorum …', 'Checking legal risk …')],
  hukuk: [t('Hukuki risk yok.', 'No legal risk.'), t('Kapağı çiziyorum.', 'Drawing the cover.')],
  kapak: [t('Kapak hazır.', 'The cover is ready.'), t('Yayına hazırlıyorum.', 'Preparing it for publication.')],
};
async function kjede() {
  const k = R.sonZincir;
  while (true) {
    for (let i = 0; i < KJEDE.length - 1; i++) {
      const fra = KJEDE[i], til = KJEDE[i + 1];
      const [tekst, svar] = REPLIKK[fra];
      await lever(by[fra], by[til], tekst, svar);
    }
    await ledig(by.yayin, by.senol);
    const r = rute(by.yayin, by.senol);
    let ferdig = await gaaRute(by.yayin, r, true);
    snakk(by.yayin, t('Yeni yazı onaya hazır!', 'A new piece is ready for approval!'), 1600);
    await vent(500); ring(); await vent(1600);
    snakk(by.senol, t('Onaylandı!', 'Approved!'), 1800); await vent(1300);
    ferdig();
    ferdig = await gaaRute(by.yayin, [...r].reverse(), false); ferdig();
    fri(by.yayin, by.senol);
    if (k) snakk(by.yayin, t(`Yayımlandı: ${kort35(k.baslik)}`, `Published: ${kort35(k.baslik)}`), 2400);
    await vent(2500);
  }
}
function ring() {
  const [px, py] = by.senol.telefon;
  const g = el('g', {}, bobler);
  for (let i = 0; i < 3; i++) el('circle', { cx: px, cy: py, r: 6 + i * 6, fill: 'none', stroke: GREEN, 'stroke-width': 2, opacity: 0.8 - i * 0.25 }, g);
  setTimeout(() => g.remove(), 1500);
}
// Yazar odası: Şenol yazar, Cem çevirir, Mina dili düzeltir
async function forfatter() {
  while (true) {
    await vent(4000);
    await lever(by.senol, by.cem, t('Yeni yazı. Lütfen çevirin!', 'A new piece. Please translate!'), t('Çeviriyorum …', 'Translating …'));
    await vent(2500);
    await lever(by.cem, by.mina, t('Çevrildi.', 'Translated.'), t('Dile bakıyorum …', 'Checking the language …'));
    await vent(2500);
    await lever(by.mina, by.senol, t('Bitti. İçerik sizin.', 'Done. The content is yours.'), t('Sağ olun!', 'Thanks!'));
    await vent(6000);
  }
}
// Mola: su sebili ve kahve
const PRAT = t(['Bir fincan daha …', 'Bugün hava nasıl?', 'Beş dakika mola!', 'Su iyidir.', 'Son kahveyi kim aldı?', 'Hafta sonu yakın!'], ['One more cup …', 'Have you seen the weather?', 'Five minute break!', 'Water is good for you.', 'Who took the last coffee?', 'Weekend soon!']);
async function pauser() {
  while (true) {
    await vent(3500 + Math.random() * 3000);
    const kand = [...HABER, ...YAZI, ...FORF].filter((a) => !a.opptatt && a.id !== 'ada' && a.id !== 'kaan');
    if (!kand.length) continue;
    const a = kand[Math.floor(Math.random() * kand.length)];
    a.opptatt = true;
    const dx = Math.random() * 1.6, dy = Math.random() * 1.6;
    const r = [...a.ut, [MOLA[0] + dx, HALL], [MOLA[0] + dx, MOLA[1] + dy]];
    let ferdig = await gaaRute(a, r, false);
    snakk(a, PRAT[Math.floor(Math.random() * PRAT.length)], 2000);
    await vent(2600);
    ferdig();
    ferdig = await gaaRute(a, [...r].reverse(), false); ferdig();
    a.opptatt = false;
  }
}

// Haber masası: kâğıt masadan masaya uçar
function flyPapir(fra, til, ms, kast = false) {
  return new Promise((ferdig) => {
    const g = el('g', {}, gangere);
    el('rect', { x: -6, y: -8, width: 12, height: 15, fill: '#fdfdfb', stroke: INK, 'stroke-width': 1.5 }, g);
    for (let i = 0; i < 3; i++) el('rect', { x: -3, y: -4 + i * 4, width: i === 2 ? 4 : 7, height: 1.5, fill: GREY }, g);
    const t0 = performance.now();
    function steg(now) {
      const s = Math.min(1, (now - t0) / ms);
      const [px, py] = iso(fra[0] + (til[0] - fra[0]) * s, fra[1] + (til[1] - fra[1]) * s, 0.9 + Math.sin(s * Math.PI) * 1.3);
      g.setAttribute('transform', `translate(${px},${py}) rotate(${kast ? s * 540 : 0})`);
      if (s < 1) requestAnimationFrame(steg); else { g.remove(); ferdig(); }
    }
    requestAnimationFrame(steg);
  });
}
const bord = (a) => [a.x + 0.4, a.y + 0.5];
// Elenme gerekçeleri: kodlar src/lib/yayin-odasi.mjs ELENME_METNI ile aynı. Ağırlık botun son 7 kayıtlı gününden; kayıt yoksa eşit olasılık (temsilî).
const GRUNNER = {
  'dusuk-haber-degeri': { sat: t('Değeri düşük. Çöpe.', 'Low value. Bin.'), ev: 'kaan' },
  'kapsam-disi': { sat: t('Yapay zekâyla ilgisi yok. Çöpe.', 'Not about AI. Bin.'), ev: 'kaan' },
  'daha-once-yazildi': { sat: t('Bunu yazmıştık.', 'We already have this.'), ev: 'kaan' },
  'kaynak-yetersiz': { sat: t('Kaynak metni yetersiz.', 'Too little source text.'), ev: 'kaan' },
  bayat: { sat: t('Eskimiş haber.', 'Too old.'), ev: 'kaan' },
  'kaynak-cikarildi': { sat: t('Kaynak listeden çıktı.', 'Source left the list.'), ev: 'kaan' },
  'kisa-es-yok': { sat: t('Kısa, eşi yok.', 'Short, no companion.'), ev: 'kaan' },
  diger: { sat: t('Başka bir sebep.', 'Another reason.'), ev: 'kaan' },
  yazilamadi: { sat: t('Yazamadım. Olmadı.', 'Could not write it.'), ev: 'elif' },
  'denetimde-durdu': { sat: t('Denetimden geçmedi. Durun!', 'Failed the check. Stop!'), ev: 'selin' },
  standart: { sat: t('Kurallara takıldı. Dışarı!', 'Broke the rules. Out!'), ev: 'selin' },
};
function trekkGrunn() {
  const l = (R.elenme ?? []).filter((e) => GRUNNER[e.kod] && e.sayi > 0);
  if (!l.length) { const k = Object.keys(GRUNNER); return k[Math.floor(Math.random() * k.length)]; }
  let r = Math.random() * l.reduce((x, e) => x + e.sayi, 0);
  for (const e of l) if ((r -= e.sayi) < 0) return e.kod;
  return l[0].kod;
}
const kurvAndel = R.degerlendirilen > 0 ? Math.min(0.95, Math.max(0.05, (R.elenenToplam ?? 0) / R.degerlendirilen)) : 0.5;
let sakNr = 0;
async function nyhetsflyt() {
  while (true) {
    await flyPapir([0.2, 22.0], bord(by.ada), 900);
    snakk(by.ada, t('Yeni haber!', 'New story!'), 1000);
    await flyPapir(bord(by.ada), bord(by.kaan), 900);
    if (Math.random() < kurvAndel) {
      const g = GRUNNER[trekkGrunn()];
      if (g.ev === 'kaan') { snakk(by.kaan, g.sat, 1400); await flyPapir(bord(by.kaan), KURV, 700, true); continue; }
      snakk(by.kaan, t('İçeri!', 'In!'), 1000);
      await flyPapir(bord(by.kaan), bord(by.elif), 950); await vent(350);
      if (g.ev === 'elif') { snakk(by.elif, g.sat, 1400); await flyPapir(bord(by.elif), KURV, 900, true); continue; }
      await flyPapir(bord(by.elif), bord(by.selin), 950);
      snakk(by.selin, g.sat, 1400); await flyPapir(bord(by.selin), KURV, 900, true); continue;
    }
    const liste = R.sonHaberler ?? [];
    const sak = liste[sakNr++ % Math.max(1, liste.length)];
    snakk(by.kaan, t('İçeri!', 'In!'), 1300);
    for (const [a, b] of [['kaan', 'elif'], ['elif', 'selin'], ['selin', 'mert'], ['mert', 'arda'], ['arda', 'lale']]) { await flyPapir(bord(by[a]), bord(by[b]), 950); await vent(350); }
    snakk(by.lale, sak ? t(`Yayımlandı: ${kort35(sak.baslik)}`, `Published: ${kort35(sak.baslik)}`) : t('Yayımlandı!', 'Published!'), 2200);
    await vent(900);
  }
}

// ---------- Kaos ----------
const pynt = el('g'); svg.insertBefore(pynt, gangere);
const effekt = el('g'); svg.insertBefore(effekt, skilt);
let kaosPaagar = false;
const tilfeldig = (liste) => liste[Math.floor(Math.random() * liste.length)];
const ropere = () => ALLE.filter((a) => !a.gaar && !a.menneske);
function rop(n, tekster) { for (let i = 0; i < n; i++) setTimeout(() => snakk(tilfeldig(ropere()), tilfeldig(tekster), 1500), i * 350); }
async function hent(...folk) { for (const a of folk) while (a.opptatt) await vent(200); folk.forEach((a) => (a.opptatt = true)); }
// Sunucu odasına koşu
const SERVERDOR = [4.0, 5.6];
const tilServer = (a, stå) => [...a.ut, [SERVERDOR[0], HALL], SERVERDOR, [SERVERDOR[0], 4.25], stå];

function rom_flamme() {
  const g = el('g', {}, effekt);
  let t0 = performance.now(), aktiv = true, styrke = 1;
  const [bx, by_] = iso(2.15, 3.0, 2.0);
  function steg(now) {
    if (!aktiv) return g.remove();
    g.innerHTML = '';
    const t = (now - t0) / 1000;
    if (styrke > 0) for (let i = 0; i < 6; i++) {
      const h = (10 + 8 * Math.abs(Math.sin(t * 9 + i))) * styrke;
      el('polygon', { points: `${bx - 14 + i * 5},${by_} ${bx - 11 + i * 5},${by_ - h} ${bx - 8 + i * 5},${by_}`, fill: i % 2 ? GREY : INK }, g);
    }
    for (let i = 0; i < 7; i++) {
      const s = ((t * 0.6 + i / 7) % 1);
      el('circle', { cx: bx + Math.sin(i * 2 + t) * 10 - 4, cy: by_ - 18 - s * 90, r: 5 + s * 12, fill: '#9a9e93', opacity: (1 - s) * 0.6 * Math.max(0.3, styrke) }, g);
    }
    requestAnimationFrame(steg);
  }
  requestAnimationFrame(steg);
  return { demp: (v) => (styrke = v), stopp: () => (aktiv = false) };
}
function alarmlys() {
  const [px, py] = iso(5.5, 2.5, 2.6);
  const g = el('g', {}, effekt);
  const lys = el('circle', { cx: px, cy: py, r: 9, fill: INK, stroke: INK, 'stroke-width': 2 }, g);
  const glod = el('rect', { x: 0, y: 0, width: 1820, height: 1200, fill: INK, opacity: 0 }, g);
  let på = true;
  const id = setInterval(() => { på = !på; lys.setAttribute('fill', på ? GREEN : '#fdfdfb'); glod.setAttribute('opacity', på ? 0.07 : 0); }, 300);
  return () => { clearInterval(id); g.remove(); };
}
function sprut(fra, til) {
  const g = el('g', {}, effekt);
  const t0 = performance.now();
  const id = setInterval(() => {
    const s = ((performance.now() - t0) / 400) % 1;
    const [ax, ay] = iso(...fra, 0.9), [bx, by_] = iso(...til, 1.9);
    el('circle', { cx: ax + (bx - ax) * s, cy: ay + (by_ - ay) * s, r: 4 + s * 6, fill: LG, stroke: INK, 'stroke-width': 1, opacity: 0.9 }, g);
    if (g.childNodes.length > 30) g.firstChild.remove();
  }, 60);
  return () => { clearInterval(id); g.remove(); };
}
async function serverbrann() {
  const flamme = rom_flamme(), alarm = alarmlys();
  snakk(by.kerem, t('ALARM! Sunucu odası yanıyor!', 'ALARM! The server room is on fire!'), 1800);
  rop(5, t(['Yanıyor!', 'Ne oldu?!', 'Haberlerim kayıtlı mı?', 'Sistem ekibini çağırın!', 'Panik yok!'], ['Fire!', 'What happened?!', 'Are my stories saved?', 'Call the systems team!', 'Do not panic!']));
  await hent(by.kerem, by.aylin);
  const r1 = tilServer(by.kerem, [2.2, 4.25]), r2 = tilServer(by.aylin, [3.4, 4.25]);
  const [f1, f2] = await Promise.all([gaaRute(by.kerem, r1, false, 0.45, true), gaaRute(by.aylin, r2, false, 0.45)]);
  snakk(by.kerem, t('Söndürüyorum!', 'Putting it out!'), 1400);
  const stopp = sprut([2.2, 4.25], [2.15, 3.0]);
  for (const v of [0.7, 0.4, 0.15, 0]) { flamme.demp(v); await vent(700); }
  stopp();
  snakk(by.kerem, t('Söndü!', 'It is out!'), 1400); await vent(900);
  snakk(by.aylin, t('Kabloyu çekiyorum …', 'Pulling the cable …'), 1400); await vent(1300);
  snakk(by.aylin, t('Yeniden başlatıyorum …', 'Restarting …'), 1400); await vent(1500);
  flamme.stopp(); alarm();
  snakk(by.aylin, t('Her şey yine ayakta!', 'Everything is up again!'), 1600);
  rop(3, t(['Oh!', 'Sağ olun!', 'Kahramanlar!'], ['Phew!', 'Thank you!', 'Heroes!']));
  await vent(1200);
  f1(); f2();
  const [g1, g2] = await Promise.all([gaaRute(by.kerem, [...r1].reverse(), false), gaaRute(by.aylin, [...r2].reverse(), false)]);
  g1(); g2(); fri(by.kerem, by.aylin);
}
async function strombrudd() {
  const mork = el('rect', { x: 0, y: 0, width: 1820, height: 1200, fill: INK, opacity: 0.6 }, effekt);
  rop(5, t(['Elektrik kesildi!', 'Işığı kim kapattı?', 'Hiçbir şey görmüyorum!', 'Kaydettiniz mi?'], ['Power cut!', 'Who turned off the light?', 'I cannot see a thing!', 'Did you save?']));
  await hent(by.aylin);
  const r = tilServer(by.aylin, [3.4, 4.25]);
  const f = await gaaRute(by.aylin, r, false, 0.5);
  snakk(by.aylin, t('Jeneratörü çalıştırıyorum …', 'Starting the generator …'), 1500); await vent(1500);
  for (const o of [0.2, 0.6, 0.1, 0.5, 0]) { mork.setAttribute('opacity', o); await vent(180); }
  mork.remove();
  snakk(by.aylin, t('Işık geri geldi!', 'The light is back!'), 1600);
  rop(2, t(['Sonunda!', 'Yaşasın!'], ['Finally!', 'Hooray!']));
  await vent(900); f();
  (await gaaRute(by.aylin, [...r].reverse(), false))(); fri(by.aylin);
}
async function ekstra() {
  const g = el('g', {}, effekt);
  const [px, py] = iso(18, 0, 3.9);
  const r = el('rect', { x: px - 170, y: py - 26, width: 340, height: 40, fill: GREEN, stroke: INK, 'stroke-width': 3 }, g);
  el('text', { x: px, y: py, 'text-anchor': 'middle', class: 'px', 'font-size': 14, fill: '#fff' }, g).textContent = t('SON DAKİKA', 'BREAKING');
  const id = setInterval(() => r.setAttribute('fill', r.getAttribute('fill') === GREEN ? INK : GREEN), 350);
  snakk(by.ada, t('Büyük haber!!', 'Big story!!'), 1500); await vent(500);
  snakk(by.kaan, t('Puan çok yüksek!', 'The score is very high!'), 1500);
  rop(5, t(['!!', 'Herkes yerine!', 'Baskıyı durdurun!', 'Ne oluyor?'], ['!!', 'All hands!', 'Stop the presses!', 'What is going on?']));
  for (const [a, b] of [['ada', 'kaan'], ['kaan', 'elif'], ['elif', 'selin'], ['selin', 'mert'], ['mert', 'arda'], ['arda', 'lale']]) await flyPapir(bord(by[a]), bord(by[b]), 380);
  snakk(by.lale, t('Rekor sürede yayımlandı!', 'Published in record time!'), 1800);
  await vent(1800); clearInterval(id); g.remove();
}
async function kaffekrise() {
  const [px, py] = iso(12.9, 1.0, 1.9);
  const tom = el('g', {}, effekt);
  el('rect', { x: px - 18, y: py - 12, width: 36, height: 16, fill: INK, stroke: INK, 'stroke-width': 2 }, tom);
  el('text', { x: px, y: py, 'text-anchor': 'middle', class: 'px', 'font-size': 8, fill: '#fff' }, tom).textContent = t('BOŞ', 'EMPTY');
  const folk = [...HABER, ...YAZI].filter((a) => !a.opptatt).sort(() => Math.random() - 0.5).slice(0, 4);
  await hent(...folk);
  const turer = await Promise.all(folk.map((a, i) => gaaRute(a, [...a.ut, [MOLA[0] + i * 0.5, HALL], [MOLA[0] + i * 0.5, MOLA[1] + (i % 2) * 0.9]], false, 0.6)));
  folk.forEach((a, i) => setTimeout(() => snakk(a, tilfeldig(t(['Kahve bitmiş!!', 'Olamaz, olamaz!', 'Sonuncuyu kim içti?', 'Kahvesiz yapamam.'], ['The coffee is gone!!', 'No, no, no!', 'Who drank the last cup?', 'I cannot work without coffee.'])), 1600), i * 300));
  await vent(1200);
  await hent(by.kerem);
  const r = [...by.kerem.ut, [MOLA[0] + 2.2, HALL], [MOLA[0] + 2.2, 2.2]];
  const f = await gaaRute(by.kerem, r, false, 0.6);
  snakk(by.kerem, t('Hallediyorum …', 'On it …'), 1300); await vent(1500);
  tom.remove(); snakk(by.kerem, t('Kahve yine var!', 'Coffee again!'), 1500);
  folk.forEach((a, i) => setTimeout(() => snakk(a, t('Sağ olun!!', 'Thanks!!'), 1200), 300 + i * 250));
  await vent(1600); f(); turer.forEach((t) => t());
  await Promise.all([...folk.map(async (a, i) => (await gaaRute(a, [...[...a.ut, [MOLA[0] + i * 0.5, HALL], [MOLA[0] + i * 0.5, MOLA[1] + (i % 2) * 0.9]]].reverse(), false))()), (async () => (await gaaRute(by.kerem, [...r].reverse(), false))())()]);
  fri(...folk, by.kerem);
}
const KAOS = { serverbrann, strombrudd, ekstra, kaffekrise };
async function kaos(navn) { if (kaosPaagar) return; kaosPaagar = true; try { await KAOS[navn](); } finally { kaosPaagar = false; } }

// ---------- Mevsim ve bayram süsleri (yalnız yeşil, mürekkep, gri, beyaz) ----------
let flaggermus = null, sno = null;
function vimpel(farger, z = 3.25) {
  for (let t = 0.4; t < 35.5; t += 0.75) { const f = farger[Math.round(t / 0.75) % farger.length]; el('polygon', { points: pts([iso(t, 0.02, z), iso(t + 0.6, 0.02, z), iso(t + 0.3, 0.02, z - 0.4)]), fill: f, stroke: INK, 'stroke-width': 1 }, pynt); }
  for (let t = 0.4; t < 23.5; t += 0.75) { const f = farger[Math.round(t / 0.75) % farger.length]; el('polygon', { points: pts([iso(0.02, t, z), iso(0.02, t + 0.6, z), iso(0.02, t + 0.3, z - 0.4)]), fill: f, stroke: INK, 'stroke-width': 1 }, pynt); }
}
function paBord(fn) { for (const a of ALLE) { const [px, py] = iso(a.x + 0.25, a.y + 0.75, 0.55); fn(px, py, a); } }
function kabak(x, y) {
  const [px, py] = iso(x, y);
  el('ellipse', { cx: px, cy: py - 8, rx: 12, ry: 9, fill: LG, stroke: INK, 'stroke-width': 1.5 }, pynt);
  el('rect', { x: px - 2, y: py - 21, width: 4, height: 5, fill: GREEN, stroke: INK, 'stroke-width': 1 }, pynt);
  el('polygon', { points: `${px - 7},${py - 10} ${px - 3},${py - 10} ${px - 5},${py - 14}`, fill: INK }, pynt);
  el('polygon', { points: `${px + 3},${py - 10} ${px + 7},${py - 10} ${px + 5},${py - 14}`, fill: INK }, pynt);
  el('rect', { x: px - 5, y: py - 6, width: 10, height: 2, fill: INK }, pynt);
}
function agac(x, y) {
  const [px, py] = iso(x, y);
  el('rect', { x: px - 4, y: py - 10, width: 8, height: 10, fill: '#6d7168', stroke: INK }, pynt);
  for (let i = 0; i < 4; i++) { const w = 40 - i * 9, top = py - 10 - i * 18; el('polygon', { points: `${px - w / 2},${top} ${px + w / 2},${top} ${px},${top - 26}`, fill: GREENT, stroke: INK, 'stroke-width': 1.5 }, pynt); }
  for (let i = 0; i < 14; i++) el('circle', { class: 'led', cx: px + Math.sin(i * 2.3) * (18 - (i % 4) * 4), cy: py - 18 - i * 5, r: 2.5, fill: ['#fdfdfb', LG, '#c9ccc4'][i % 3] }, pynt);
  el('rect', { x: px - 4, y: py - 98, width: 8, height: 8, fill: '#fdfdfb', stroke: INK }, pynt);
}
function fener(t) {
  const [px, py] = iso(t, 0.02, 3.0);
  el('line', { x1: px, y1: py - 12, x2: px, y2: py, stroke: INK, 'stroke-width': 1.5 }, pynt);
  el('rect', { x: px - 6, y: py, width: 12, height: 16, fill: LG, stroke: INK, 'stroke-width': 2 }, pynt);
  el('circle', { class: 'led', cx: px, cy: py + 8, r: 3, fill: GREEN }, pynt);
}
function yildiz(px, py, r) {
  const p = []; for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r, a = -Math.PI / 2 + (i * Math.PI) / 5; p.push([px + rr * Math.cos(a), py + rr * Math.sin(a)]); }
  el('polygon', { points: pts(p), fill: GREEN, stroke: INK, 'stroke-width': 1 }, pynt);
}
function fly(antall, tegn, fart) {
  const g = el('g', {}, pynt); let aktiv = true;
  const t0 = performance.now();
  function steg(now) { if (!aktiv) return g.remove(); g.innerHTML = ''; const t = (now - t0) / 1000; for (let i = 0; i < antall; i++) tegn(g, t, i); requestAnimationFrame(steg); }
  requestAnimationFrame(steg);
  return () => (aktiv = false);
}
const TEMAER = {
  ingen: { navn: 'Normal gün', prat: [] },
  halloween: { navn: 'Cadılar Bayramı', prat: t(['Şeker mi, hile mi?', 'Bu!', 'Balkabağımı kim aldı?'], ['Trick or treat!', 'Boo!', 'Who took my pumpkin?']), tegn() {
    vimpel([INK, GREEN]);
    for (const [x, y] of [[3.6, 11.2], [8.4, 16.4], [13.5, 7.2], [23.2, 11], [33.6, 13.8], [18.5, 23.3], [11.2, 20.4]]) kabak(x, y);
    const [cx, cy] = iso(0, 0, 3.4); for (let i = 0; i < 6; i++) el('line', { x1: cx, y1: cy, x2: cx + Math.cos(i * 0.3 + 0.2) * 60, y2: cy + Math.sin(i * 0.3 + 0.2) * 60, stroke: GREY, 'stroke-width': 1 }, pynt);
    flaggermus = fly(5, (g, t, i) => { const x = 200 + ((t * 60 + i * 300) % 1400), y = 120 + Math.sin(t * 3 + i) * 30 + i * 18, v = Math.sin(t * 14 + i) * 6;
      el('polygon', { points: `${x - 12},${y - v} ${x},${y + 4} ${x + 12},${y - v} ${x + 4},${y} ${x},${y - 3} ${x - 4},${y}`, fill: INK }, g); });
  } },
  jul: { navn: 'Yılbaşı', prat: t(['Yeni yılınız kutlu olsun!', 'Mandalinaları kim bitirdi?', 'Tatil yakın!'], ['Happy New Year!', 'Who finished the tangerines?', 'Holidays soon!']), tegn() {
    vimpel([GREENT, '#fdfdfb', INK]);
    agac(13.6, 7.6); agac(34.6, 15.8); agac(24.8, 23.4);
    sno = fly(60, (g, t, i) => { const x = (i * 97) % 1820, y = ((t * 40 + i * 53) % 1200); el('circle', { cx: x + Math.sin(t + i) * 8, cy: y, r: 2 + (i % 3), fill: '#fff', stroke: LINE, 'stroke-width': 0.5, opacity: 0.95 }, g); });
  } },
  bayram: { navn: 'Bayram', prat: t(['Bayramınız kutlu olsun!', 'Bayram şekeri var!', 'Hayırlı bayramlar!'], ['Happy Eid!', 'There are sweets!', 'Eid mubarak!']), tegn() {
    for (let t = 1; t < 35; t += 2.2) fener(t);
    paBord((px, py) => { el('ellipse', { cx: px, cy: py - 4, rx: 7, ry: 4, fill: '#fdfdfb', stroke: INK }, pynt); for (let i = 0; i < 3; i++) el('circle', { cx: px - 3 + i * 3, cy: py - 6, r: 1.8, fill: [GREEN, LG, GREY][i] }, pynt); });
  } },
  esperanto: { navn: 'Esperanto Günü', prat: t(['Jen dume!', 'Ĝoja festo!', 'Kelimelerin ötesinde.'], ['Jen dume!', 'Ĝoja festo!', 'Beyond words.']), tegn() {
    vimpel([GREEN, '#fdfdfb']);
    paBord((px, py) => { el('line', { x1: px, y1: py, x2: px, y2: py - 22, stroke: INK, 'stroke-width': 1.5 }, pynt); yildiz(px + 1, py - 26, 6); });
  } },
};
let aktivtTema = 'ingen';
function settTema(navn) {
  pynt.innerHTML = ''; if (flaggermus) flaggermus(); if (sno) sno(); flaggermus = sno = null;
  aktivtTema = navn; TEMAER[navn].tegn?.();
  if (TEMAER[navn].prat.length) setTimeout(() => rop(4, TEMAER[navn].prat), 600);
}
// Takvime göre: Bayram, Umm al-Qura takviminden (Diyanet bir gün sapabilir)
function temaForDato(d = new Date()) {
  const m = d.getMonth() + 1, g = d.getDate();
  const islam = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { month: 'numeric', day: 'numeric' }).formatToParts(d);
  const im = +islam.find((p) => p.type === 'month').value, ig = +islam.find((p) => p.type === 'day').value;
  if ((im === 10 && ig <= 3) || (im === 12 && ig >= 10 && ig <= 13)) return 'bayram';
  if ((m === 10 && g === 31) || (m === 11 && g === 1)) return 'halloween';
  if (m === 12 && g === 15) return 'esperanto';
  if ((m === 12 && g >= 20) || (m === 1 && g <= 1)) return 'jul';
  return 'ingen';
}
// Temalı konuşmalar arada bir
setInterval(() => { const p = TEMAER[aktivtTema].prat; if (p.length && !rolig) snakk(tilfeldig(ropere()), tilfeldig(p), 1800); }, 4200);
settTema(temaForDato());

// Düğmeler (yalnız örnekte)
document.querySelectorAll('[data-yo-kaos]').forEach((b) => b.addEventListener('click', () => kaos(b.dataset.yoKaos)));
document.querySelectorAll('[data-yo-tema]').forEach((b) => b.addEventListener('click', () => settTema(b.dataset.yoTema)));
if (!rolig) (async () => { while (true) { await vent(30000 + Math.random() * 25000); await kaos(tilfeldig(Object.keys(KAOS))); } })();

// ---------- Kaptan J: Şenol'un kahraman hali (koyu yeşil pelerin, göğüste yeşil kareli J levhası) ----------
function tegnHelt(parent) {
  const g = el('g', {}, parent);
  const kappe = el('polygon', { points: `${4},${30} ${SW - 4},${30} ${SW + 14},${SH - 2} ${-14},${SH - 2}`, fill: GREENT, stroke: INK, 'stroke-width': 2 }, g);
  tegnFigur(by.senol.u, false, 0, g);
  el('rect', { x: SW / 2 - 10, y: 17 * P - 10, width: 20, height: 20, fill: INK, stroke: '#fff', 'stroke-width': 1.5 }, g);
  el('rect', { x: SW / 2 + 3, y: 17 * P - 8, width: 5, height: 5, fill: GREEN }, g);
  el('text', { x: SW / 2 - 2, y: 17 * P + 7, 'text-anchor': 'middle', 'font-family': SANS, 'font-weight': 700, 'font-size': 16, fill: '#fff' }, g).textContent = 'J';
  return { g, kappe };
}
async function kaptein() {
  const a = by.senol;
  await hent(a);
  snakk(a, t('Bu iş … KAPTAN J’ye düşer!', 'This job calls for … CAPTAIN J!'), 1800);
  await vent(1400);
  a.sitter.setAttribute('visibility', 'hidden');
  const [sx, sy] = iso(a.x + 0.75, a.y - 0.25);
  const lag2 = el('g', {}, bobler);
  const glimt = el('g', {}, lag2);
  for (let i = 0; i < 10; i++) el('rect', { x: sx - 2 + Math.cos(i) * 34, y: sy - SH / 2 + Math.sin(i) * 44, width: 5, height: 5, fill: i % 2 ? GREEN : '#fff', stroke: INK, 'stroke-width': 0.8 }, glimt);
  const { g, kappe } = tegnHelt(lag2);
  g.setAttribute('transform', `translate(${sx - SW / 2},${sy - SH})`);
  rop(4, t(['Ha?!', 'Bu … Şenol mu?', 'Uçuyor!', 'Kaptan J!'], ['What?!', 'Is that … Şenol?', 'He is flying!', 'Captain J!']));
  await vent(900); glimt.remove();
  const t0 = performance.now(), varighet = 2200;
  const spor = el('g', {}, lag2);
  await new Promise((ferdig) => {
    function steg(now) {
      const s = Math.min(1, (now - t0) / varighet), e = s * s;
      const x = sx - SW / 2 + e * 900, y = sy - SH - e * 1500;
      g.setAttribute('transform', `translate(${x},${y}) rotate(${-25 * Math.min(1, s * 3)} ${SW / 2} ${SH / 2})`);
      kappe.setAttribute('points', `4,30 ${SW - 4},30 ${SW + 22 + Math.sin(now / 60) * 6},${SH + 10} ${-22 + Math.sin(now / 70) * 6},${SH + 14}`);
      if (Math.random() < 0.5) { const l = el('rect', { x: x + SW / 2 - 30, y: y + SH, width: 3, height: 26, fill: GREEN, opacity: 0.7 }, spor); setTimeout(() => l.remove(), 400); }
      if (s < 1) requestAnimationFrame(steg); else ferdig();
    }
    requestAnimationFrame(steg);
  });
  rop(4, t(['Nereye gitti?!', 'Sayfadan çıkıp uçtu!', 'Şimdi kim onaylayacak?'], ['Where did he go?!', 'He flew off the page!', 'Who approves now?']));
  await vent(3500);
  const t1 = performance.now();
  await new Promise((ferdig) => {
    function steg(now) {
      const s = Math.min(1, (now - t1) / 1800), e = 1 - (1 - s) * (1 - s);
      const x = sx - SW / 2 - 700 * (1 - e), y = sy - SH - 1200 * (1 - e);
      g.setAttribute('transform', `translate(${x},${y}) rotate(${20 * (1 - e)} ${SW / 2} ${SH / 2})`);
      if (s < 1) requestAnimationFrame(steg); else ferdig();
    }
    requestAnimationFrame(steg);
  });
  snakk(a, t('İş çözüldü.', 'Case closed.'), 1800);
  await vent(1200);
  lag2.remove(); a.sitter.setAttribute('visibility', 'visible');
  rop(3, t(['Kahraman!', 'Vay.', 'İşinizin başına, arkadaşlar.'], ['Hero!', 'Wow.', 'Back to work, everyone.']));
  fri(a);
}
KAOS.kaptein = kaptein;

if (!rolig) { kjede(); nyhetsflyt(); forfatter(); pauser(); }
}
if (document.getElementById('rom')) basla();
