// Çizgi: tek ya da çok seri (en çok 3). valg.noktalar her veri noktasına yuvarlak koyar ("nokta grafik"); ilk seri yeşil,
// ikincisi mürekkep, üçüncüsü gri. Öteki seriler ilk serinin x etiketlerine göre hizalanır; eksik etiket boşluk olur.
import { bi, esc, etikettIndekser, fineTikker, kortEnhet, kortNavn, r2, skala, sti, T, tall, tekst, tikkDesimaler } from '../felles.mjs';

const B = 400, B_BRED = 900, H = 220, V = 40, S = 46, U = 14, A = 26;

/** @param {import('../sema.mjs').GrafData} d @param {{ bred?: boolean }} [o] @returns {import('../sema.mjs').Tegning} */
export function tegn(d, o = {}) {
  const bredde = o.bred ? B_BRED : B;
  const des = d.desimaler ?? 1;
  const enh = kortEnhet(d.enhet);
  const etiketter = d.serier[0].punkter.map((p) => String(p.x));
  const serier = d.serier.slice(0, 3).map((s, si) => (si === 0 ? s : { ...s, punkter: etiketter.map((e) => s.punkter.find((p) => String(p.x) === e) ?? { x: e, y: null }) }));
  const lengde = etiketter.length;
  const verdier = serier.flatMap((s) => s.punkter.map((p) => p.y)).filter((v) => v !== null && v !== undefined);
  const tikker = fineTikker(Math.min(...verdier), Math.max(...verdier));
  const y = skala(tikker[0], tikker.at(-1), H - A, U);
  const x = (i) => (lengde === 1 ? (V + bredde - S) / 2 : V + (i / (lengde - 1)) * (bredde - V - S));

  const deler = [];
  deler.push('<g class="g-akse">');
  for (const t of tikker) {
    deler.push(`<line x1="${V}" x2="${bredde - S + 6}" y1="${y(t)}" y2="${y(t)}"${t === 0 ? ' class="g-null"' : ''}/>`);
    deler.push(tekst(V - 6, y(t) + 4, tall(t, tikkDesimaler(tikker)), 'text-anchor="end"'));
  }
  for (const i of etikettIndekser(lengde)) {
    const anker = lengde === 1 ? 'middle' : i === 0 ? 'start' : i === lengde - 1 ? 'end' : 'middle';
    deler.push(tekst(x(i), H - 7, kortNavn(etiketter[i], 12), `text-anchor="${anker}"`));
  }
  deler.push('</g>');

  serier.forEach((s, si) => {
    const p = s.punkter.map((q, i) => ({ x: x(i), y: q.y === null || q.y === undefined ? null : y(q.y) }));
    deler.push(`<g class="g-serie g-s${si}"><path d="${sti(p)}"/>`);
    if (d.valg?.noktalar) for (const q of p) if (q.y !== null) deler.push(`<circle cx="${r2(q.x)}" cy="${r2(q.y)}" r="3"/>`);
    const siste = [...s.punkter].map((q, i) => ({ q, i })).reverse().find(({ q }) => q.y !== null && q.y !== undefined);
    if (siste) {
      deler.push(`<circle cx="${x(siste.i)}" cy="${y(siste.q.y)}" r="3.5"/>`);
      const sisteTekst = tall(siste.q.y, des);
      const forLang = x(siste.i) + 7 + sisteTekst.length * 7 > bredde;
      deler.push(tekst(forLang ? x(siste.i) - 7 : x(siste.i) + 7, y(siste.q.y) + (forLang ? -8 : 4), sisteTekst, forLang ? 'text-anchor="end" class="g-siste"' : 'class="g-siste"'));
    }
    deler.push('</g>');
  });

  const punkter = [];
  for (let i = 0; i < lengde; i++) {
    const verdi = serier.map((s) => s.punkter[i]?.y).map((v) => (v === null || v === undefined ? null : v));
    if (verdi.every((v) => v === null)) continue;
    const linjer = serier.length === 1 ? [bi(verdi[0], des, enh)] : serier.map((s, si) => `${s.navn}: ${verdi[si] === null ? '–' : bi(verdi[si], des, enh)}`);
    punkter.push({ x: x(i), y: Math.min(...verdi.filter((v) => v !== null).map(y)), tekst: [etiketter[i], ...linjer].join('\n') });
  }

  const sisteVerdi = serier[0].punkter.findLast((p) => p.y !== null && p.y !== undefined);
  const beskrivelse = `${d.tittel}. ${T('Son değer', 'Latest value')} ${sisteVerdi ? bi(sisteVerdi.y, des, enh) : '–'} (${sisteVerdi?.x ?? ''}).`;
  return {
    svg: `<svg viewBox="0 0 ${bredde} ${H}" class="g-svg" role="img" aria-label="${esc(beskrivelse)}">${deler.join('')}</svg>`,
    bredde, hoyde: H, modus: 'serie', punkter, ramme: { topp: U, bunn: H - A },
    nokkel: serier.length > 1 ? serier.map((s, si) => ({ navn: s.navn, klasse: `g-s${si}` })) : undefined,
    tabell: { kolonner: ['', ...serier.map((s) => s.navn)], rader: etiketter.map((e, i) => [e, ...serier.map((s) => (s.punkter[i]?.y === null || s.punkter[i]?.y === undefined ? '–' : bi(s.punkter[i].y, des, enh)))]) },
    beskrivelse,
  };
}
