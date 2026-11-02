// Kareli ızgara: 100 kare; her kategori kendi renginde, kare sayıları en büyük kalan yöntemiyle yuvarlanır (toplam ≤ 100).
// Tek nokta: yuvarlanmış yüzde kadar dolu kare.
import { bi, esc, kortEnhet, r2, T } from '../felles.mjs';
import { farge } from './flerserie.mjs';

const NOKKEL = ['g-n-su', 'g-n-kontur', 'g-n-gul', 'g-n-rod', 'g-n-su2', 'g-n-bar'];

function fordel(verdier) {
  const sum = verdier.reduce((a, v) => a + v, 0);
  // Toplam 99–101 arasındaysa (yuvarlama) 100 karenin hepsi dağıtılır.
  const total = sum >= 99 && sum <= 101 ? 100 : Math.min(100, Math.round(sum));
  const ham = verdier.map((v) => (sum ? (v / sum) * total : 0));
  const hel = ham.map(Math.floor);
  let rest = total - hel.reduce((a, v) => a + v, 0);
  ham.map((v, i) => ({ i, r: v - hel[i] })).sort((a, b) => b.r - a.r).forEach(({ i }) => { if (rest > 0) { hel[i]++; rest--; } });
  return hel;
}

/** @param {import('../sema.mjs').GrafData} d @returns {import('../sema.mjs').Tegning} */
export function tegn(d) {
  const bredde = 400, H = 222, k = 18, g = 4;
  const des = d.desimaler ?? 1;
  const enh = kortEnhet(d.enhet) || '%';
  const s = d.serier[0];
  const fler = s.punkter.length > 1;
  const kat = fler ? s.punkter.filter((p) => Number.isFinite(p.y) && p.y > 0) : [];
  const antall = fler ? fordel(kat.map((p) => p.y)) : [Math.max(0, Math.min(100, Math.round(s.punkter[0].y)))];
  const x0 = (bredde - (10 * k + 9 * g)) / 2;
  const deler = [];
  const punkter = [];
  let kategori = 0, brukt = 0;
  for (let i = 0; i < 100; i++) {
    while (kategori < antall.length && brukt >= antall[kategori]) { kategori++; brukt = 0; }
    const fylt = kategori < antall.length;
    const x = x0 + (i % 10) * (k + g), y = 2 + Math.floor(i / 10) * (k + g);
    const klasse = !fylt ? 'g-f-bar' : fler ? farge(kategori) : 'g-f-su';
    deler.push(`<rect data-i="${i}" x="${r2(x)}" y="${y}" width="${k}" height="${k}" class="${klasse}"/>`);
    let metin;
    if (fler) metin = fylt ? `${kat[kategori].x}\n${bi(kat[kategori].y, des, enh)}` : T('Kalan', 'Remainder');
    else metin = fylt ? `${s.navn}\n${bi(s.punkter[0].y, des, enh)} (${s.punkter[0].x})` : `${T('Kalan', 'Remainder')}\n${bi(100 - s.punkter[0].y, des, enh)}`;
    punkter.push({ x: x + k / 2, y, tekst: metin });
    if (fylt) brukt++;
  }
  const beskrivelse = fler
    ? `${d.tittel}. ${kat.map((p) => `${p.x} ${bi(p.y, des, enh)}`).join(', ')}. ${T('Bir kare yüzde birdir', 'One square is one percent')}.`
    : `${d.tittel}. ${s.navn}: ${bi(s.punkter[0].y, des, enh)} (${s.punkter[0].x}).`;
  return {
    svg: `<svg viewBox="0 0 ${bredde} ${H}" class="g-svg" role="img" aria-label="${esc(beskrivelse)}">${deler.join('')}</svg>`,
    bredde, hoyde: H, modus: 'element', punkter,
    nokkel: fler ? kat.map((p, i) => ({ navn: String(p.x), klasse: NOKKEL[Math.min(i, NOKKEL.length - 1)] })) : undefined,
    tabell: { kolonner: ['', s.navn], rader: s.punkter.map((p) => [String(p.x), Number.isFinite(p.y) ? bi(p.y, des, enh) : '–']) },
    beskrivelse,
  };
}
