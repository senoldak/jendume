// Eğim: her seri bir kategori, iki nokta (önce/sonra). Her çizginin adı sağ uçta yazılır (üst üste binmesin diye aralık
// açılır); valg.fremhev'deki kategoriler yeşil ve kalın, ötekiler gri. Vurgu yoksa hepsi gri.
import { bi, esc, kortEnhet, kortNavn, r2, skala, tekst, tom } from '../felles.mjs';

const ARALIK = 14;

/** @param {import('../sema.mjs').GrafData} d @returns {import('../sema.mjs').Tegning} */
export function tegn(d) {
  const bredde = 400, X1 = 110, X2 = 250;
  const des = d.desimaler ?? 1;
  const enh = kortEnhet(d.enhet);
  const fremhev = (d.valg?.fremhev ?? []).map(String);
  const rader = d.serier.filter((s) => !tom(s.punkter[0]?.y) && !tom(s.punkter[1]?.y)).map((s) => ({ navn: s.navn, a: s.punkter[0].y, b: s.punkter[1].y }));
  const [etA, etB] = [String(d.serier[0].punkter[0].x), String(d.serier[0].punkter[1]?.x ?? '')];
  const H = Math.max(260, rader.length * 28 + 60);
  const alle = rader.flatMap((r) => [r.a, r.b]);
  const y = skala(Math.min(...alle), Math.max(...alle), H - 16, 34);
  // Sağ uçtaki adlar: y sırasına göre, en az ARALIK aralıkla.
  const sirali = rader.map((r, i) => ({ i, y: y(r.b) })).sort((p, q) => p.y - q.y);
  sirali.forEach((e, k) => { if (k && e.y < sirali[k - 1].y + ARALIK) e.y = sirali[k - 1].y + ARALIK; });
  const etiketY = new Map(sirali.map((e) => [e.i, e.y]));
  const deler = [tekst(X1, 14, etA, 'text-anchor="middle" class="g-t-sterk"'), tekst(X2, 14, etB, 'text-anchor="middle" class="g-t-sterk"')];
  const punkter = rader.map((r, i) => {
    const vurgu = fremhev.includes(r.navn) ? ' g-su-vurgu' : '';
    deler.push(`<g data-i="${i}" class="g-helning${vurgu}"><line x1="${X1}" x2="${X2}" y1="${r2(y(r.a))}" y2="${r2(y(r.b))}"/><circle cx="${X1}" cy="${r2(y(r.a))}" r="3.5"/><circle cx="${X2}" cy="${r2(y(r.b))}" r="3.5"/>`);
    deler.push(tekst(X2 + 8, etiketY.get(i) + 4, kortNavn(r.navn, 20)));
    deler.push('</g>');
    return { x: X2, y: y(r.b), tekst: `${r.navn}\n${bi(r.a, des, enh)} → ${bi(r.b, des, enh)}` };
  });
  const beskrivelse = `${d.tittel}. ${etA} → ${etB}.`;
  return {
    svg: `<svg viewBox="0 0 ${bredde} ${H}" class="g-svg" role="img" aria-label="${esc(beskrivelse)}">${deler.join('')}</svg>`,
    bredde, hoyde: H, modus: 'element', punkter,
    tabell: { kolonner: ['', etA, etB], rader: rader.map((r) => [r.navn, bi(r.a, des, enh), bi(r.b, des, enh)]) },
    beskrivelse,
  };
}
