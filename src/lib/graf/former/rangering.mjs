// Yatay çubuk satırları: ad, çubuk, değer. Sıra valg.sorter ile (varsayılan metindeki sıra); valg.fremhev (yeşil) ve
// valg.toplam (mürekkep: OECD, dünya, toplam gibi bileşik satırlar) vurgulanır, ötekiler gri; vurgu yoksa hepsi yeşil.
// Merknad 'mal' (eşik) dikey kesik çizgi olur.
import { bi, esc, kisaBi, kortEnhet, kortNavn, r2, skala, tall, tekst, tom } from '../felles.mjs';

const RAD = 24;

/** @param {import('../sema.mjs').GrafData} d @param {{ bred?: boolean }} [o] @returns {import('../sema.mjs').Tegning} */
export function tegn(d, o = {}) {
  const bredde = o.bred ? 900 : 400;
  const des = d.desimaler ?? 1;
  const enh = kortEnhet(d.enhet);
  const s = d.serier[0];
  const fremhev = (d.valg?.fremhev ?? []).map(String);
  const toplam = (d.valg?.toplam ?? []).map(String);
  const vurgulu = fremhev.length > 0 || toplam.length > 0;
  const sinif = (q) => (toplam.includes(String(q.x)) ? 'g-f-kontur' : fremhev.includes(String(q.x)) ? 'g-f-su' : vurgulu ? 'g-f-gri' : 'g-f-su');
  const rader = d.valg?.sorter ? [...s.punkter].sort((a, b) => (tom(a.y) || tom(b.y) ? Number(tom(a.y)) - Number(tom(b.y)) : b.y - a.y)) : [...s.punkter];
  const M = o.bred ? 300 : 225;
  const maksNavn = o.bred ? 46 : 34;
  const mal = (d.merknader ?? []).find((m) => m.type === 'mal');
  const REF = mal ? 22 : 0;
  const verdier = [...rader.map((q) => q.y).filter((v) => !tom(v)), ...(mal ? [mal.y] : [])];
  const lo = Math.min(0, ...verdier), hi = Math.max(0, ...verdier);
  const x = skala(lo, hi === lo ? lo + 1 : hi, M, bredde - 52);
  const H = REF + rader.length * RAD + 4;

  const deler = [];
  const punkter = rader.map((q, i) => {
    const yy = REF + i * RAD + 2;
    const ut = vurgulu && (fremhev.includes(String(q.x)) || toplam.includes(String(q.x)));
    deler.push(`<g data-i="${i}"><rect x="0" y="${yy}" width="${bredde}" height="${RAD}" class="g-luft"/>`);
    deler.push(tekst(M - 8, yy + 16, kortNavn(String(q.x), maksNavn), `text-anchor="end" class="${ut ? 'g-t-sterk' : 'g-t-blekk'}"`));
    if (tom(q.y)) {
      deler.push(tekst(x(0) + 5, yy + 16, '–'));
      deler.push('</g>');
      return { x: x(0), y: yy + 4, tekst: `${q.x}\n–` };
    }
    const x0 = Math.min(x(0), x(q.y));
    deler.push(`<rect x="${r2(x0)}" y="${yy + 5}" width="${r2(Math.max(1, Math.abs(x(q.y) - x(0))))}" height="${RAD - 10}" class="${sinif(q)}"/>`);
    deler.push(tekst(q.y >= 0 ? x(q.y) + 5 : x(0) + 5, yy + 16, kisaBi(q.y, des, enh), 'class="g-t-sterk"'));
    deler.push('</g>');
    return { x: (x0 + Math.max(x(0), x(q.y))) / 2, y: yy + 4, tekst: `${q.x}\n${bi(q.y, des, enh)}` };
  });
  if (lo < 0) deler.push(`<line class="g-null" x1="${r2(x(0))}" x2="${r2(x(0))}" y1="${REF}" y2="${H}"/>`);
  if (mal) {
    deler.push(`<line class="g-mal" x1="${r2(x(mal.y))}" x2="${r2(x(mal.y))}" y1="${REF - 4}" y2="${H}"/>`);
    deler.push(tekst(x(mal.y), 14, `${mal.tekst} ${bi(mal.y, des, enh)}`, `class="g-mal-t" text-anchor="${x(mal.y) > bredde - 90 ? 'end' : 'middle'}"`));
  }

  const beskrivelse = `${d.tittel}. ${rader.filter((q) => !tom(q.y)).slice(0, 3).map((q) => `${q.x} ${bi(q.y, des, enh)}`).join(', ')}.`;
  return {
    svg: `<svg viewBox="0 0 ${bredde} ${H}" class="g-svg" role="img" aria-label="${esc(beskrivelse)}">${deler.join('')}</svg>`,
    bredde, hoyde: H, modus: 'element', punkter,
    tabell: { kolonner: ['', s.navn], rader: [...rader.map((q) => [String(q.x), tom(q.y) ? '–' : bi(q.y, des, enh)]), ...(mal ? [[mal.tekst, bi(mal.y, des, enh)]] : [])] },
    beskrivelse,
  };
}
