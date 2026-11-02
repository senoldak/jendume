// Halter: her kategori iki değer (y ve y2; adları valg.gruppenavn), aralarında çizgi; valg.sorter ise y2'ye göre büyükten
// küçüğe. Noktada `mal` varsa kesik işaret (adı valg.malnavn).
import { bi, esc, kortEnhet, kortNavn, r2, skala, T, tekst, tom } from '../felles.mjs';

const RAD = 26;

/** @param {import('../sema.mjs').GrafData} d @returns {import('../sema.mjs').Tegning} */
export function tegn(d) {
  const bredde = 400, M = 150;
  const des = d.desimaler ?? 1;
  const enh = kortEnhet(d.enhet);
  // İki yüzdenin farkı yüzde değil, yüzde puanıdır.
  const fark = (v) => (enh === '%' ? `${bi(v, des, '')} ${T('yüzde puanı', 'percentage points')}` : bi(v, des, enh));
  const [gA, gB] = d.valg.gruppenavn;
  const rader = d.serier[0].punkter.filter((p) => !tom(p.y));
  if (d.valg?.sorter) rader.sort((a, b) => b.y2 - a.y2);
  const harMal = rader.some((p) => Number.isFinite(p.mal));
  const malnavn = d.valg?.malnavn ?? T('Hedef', 'Target');
  const alle = rader.flatMap((p) => [p.y, p.y2, ...(Number.isFinite(p.mal) ? [p.mal] : [])]);
  const lo = Math.min(...alle), hi = Math.max(...alle);
  const x = skala(lo - (hi - lo) * 0.05, hi, M, bredde - 12);
  const H = rader.length * RAD + 28;
  const deler = [
    `<circle cx="${M + 5}" cy="9" r="5" class="g-f-kontur"/>`, tekst(M + 14, 13, gA, 'class="g-t-blekk"'),
    `<circle cx="${M + 95}" cy="9" r="5" class="g-f-su"/>`, tekst(M + 104, 13, gB, 'class="g-t-blekk"'),
  ];
  const punkter = rader.map((p, i) => {
    const yy = 28 + i * RAD + RAD / 2;
    deler.push(`<g data-i="${i}"><rect x="0" y="${yy - RAD / 2}" width="${bredde}" height="${RAD}" class="g-luft"/>`);
    deler.push(tekst(M - 10, yy + 4, kortNavn(String(p.x), 22), 'text-anchor="end" class="g-t-blekk"'));
    deler.push(`<line x1="${r2(x(p.y))}" x2="${r2(x(p.y2))}" y1="${yy}" y2="${yy}" class="g-manual"/>`);
    if (Number.isFinite(p.mal)) deler.push(`<line class="g-mal-tikk" x1="${r2(x(p.mal))}" x2="${r2(x(p.mal))}" y1="${yy - 11}" y2="${yy + 11}"/>`);
    deler.push(`<circle cx="${r2(x(p.y))}" cy="${yy}" r="6" class="g-f-kontur"/><circle cx="${r2(x(p.y2))}" cy="${yy}" r="6" class="g-f-su"/></g>`);
    const malLinje = Number.isFinite(p.mal) ? `\n${malnavn}: ${bi(p.mal, des, enh)}` : '';
    return { x: (x(p.y) + x(p.y2)) / 2, y: yy - 8, tekst: `${p.x}\n${gA}: ${bi(p.y, des, enh)}\n${gB}: ${bi(p.y2, des, enh)}${malLinje}\n${T('Fark', 'Difference')} ${fark(Math.abs(p.y2 - p.y))}` };
  });
  const beskrivelse = `${d.tittel}. ${gA} / ${gB}: ${rader.length}.`;
  return {
    svg: `<svg viewBox="0 0 ${bredde} ${H}" class="g-svg" role="img" aria-label="${esc(beskrivelse)}">${deler.join('')}</svg>`,
    bredde, hoyde: H, modus: 'element', punkter,
    tabell: { kolonner: ['', gA, gB, ...(harMal ? [malnavn] : [])], rader: rader.map((p) => [String(p.x), bi(p.y, des, enh), bi(p.y2, des, enh), ...(harMal ? [Number.isFinite(p.mal) ? bi(p.mal, des, enh) : '–'] : [])]) },
    beskrivelse,
  };
}
