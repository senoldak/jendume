// Mini tablo: satırda etiket, değer + satır içi çubuk (seri 0) ve değişim (seri 1; seri.isaret ise +/− işaretli).
// Her seri kendi ondalığını (desimaler) ve birimini (enhet) taşıyabilir.
import { bi, buyuk, kortEnhet, kortNavn, r2, svgKabuk, tall, tekst, tom } from '../felles.mjs';

const RAD = 40, TOPP = 30;

/** @param {import('../sema.mjs').GrafData} d @param {{ bred?: boolean }} [o] @returns {import('../sema.mjs').Tegning} */
export function tegn(d, o = {}) {
  const bredde = o.bred ? 900 : 400;
  const [verdi, endring] = d.serier;
  // Seri başına prosent (zincir): true '%' yazar, false ise genel yüzde biriminden bağımsız düz sayı.
  const enhDe = (s) => (s.prosent === true ? '%' : s.prosent === false && kortEnhet(s.enhet ?? d.enhet) === '%' ? '' : kortEnhet(s.enhet ?? d.enhet));
  const enhVerdi = enhDe(verdi);
  const enhEndring = enhDe(endring);
  const desV = verdi.desimaler ?? d.desimaler ?? 0;
  const desE = endring.desimaler ?? d.desimaler ?? 0;
  const fv = (q) => (tom(q.y) ? '–' : bi(q.y, desV, enhVerdi));
  const fe = (y) => {
    if (tom(y)) return '–';
    const t = bi(y, desE, enhEndring);
    const null0 = !/[1-9]/.test(tall(y, desE));
    return `${endring.isaret && y > 0 && !null0 ? '+' : ''}${t}`;
  };
  const fremhev = d.valg?.fremhev?.map(String) ?? [];
  const maks = Math.max(0, ...verdi.punkter.map((q) => q.y ?? 0)) || 1;
  const XB = o.bred ? 420 : 205, BW = o.bred ? 240 : 70;
  const deler = [
    tekst(XB - 8, 16, buyuk(kortNavn(verdi.navn, 18)), 'class="g-overtekst" text-anchor="end"'),
    tekst(bredde, 16, buyuk(kortNavn(endring.navn, 14)), 'class="g-overtekst" text-anchor="end"'),
    `<line class="g-akse-sterk" x1="0" x2="${bredde}" y1="${TOPP - 6}" y2="${TOPP - 6}"/>`,
  ];
  const punkter = verdi.punkter.map((q, i) => {
    const e = endring.punkter.find((r) => String(r.x) === String(q.x))?.y ?? null;
    const y0 = TOPP + i * RAD;
    const ut = fremhev.includes(String(q.x));
    deler.push(`<g data-i="${i}"><rect x="0" y="${y0}" width="${bredde}" height="${RAD}" class="g-luft"/>`);
    deler.push(tekst(0, y0 + 25, kortNavn(String(q.x), o.bred ? 40 : 22), ut ? 'class="g-t-sterk"' : 'class="g-t-blekk"'));
    deler.push(tekst(XB - 8, y0 + 25, fv(q), `text-anchor="end" class="${ut ? 'g-t-sterk' : 'g-t-blekk'}"`));
    if (!tom(q.y)) deler.push(`<rect x="${XB}" y="${y0 + 14}" width="${r2(Math.max(1, (BW * Math.max(0, q.y)) / maks))}" height="14" class="${ut ? 'g-f-su' : 'g-f-bar'}"/>`);
    deler.push(tekst(bredde, y0 + 25, fe(e), `text-anchor="end" class="g-t-sterk${ut ? ' g-t-su' : ''}"`));
    deler.push(`<line class="g-akse-linje" x1="0" x2="${bredde}" y1="${y0 + RAD}" y2="${y0 + RAD}"/></g>`);
    return { x: XB + BW / 2, y: y0 + 8, tekst: `${q.x}\n${verdi.navn}: ${fv(q)}\n${endring.navn}: ${fe(e)}` };
  });
  const H = TOPP + verdi.punkter.length * RAD + 4;
  const beskrivelse = `${d.tittel}. ${verdi.navn} / ${endring.navn}.`;
  return {
    svg: svgKabuk(bredde, H, beskrivelse, deler.join('')),
    bredde, hoyde: H, modus: 'element', punkter,
    tabell: { kolonner: ['', verdi.navn, endring.navn], rader: verdi.punkter.map((q) => [String(q.x), fv(q), fe(endring.punkter.find((r) => String(r.x) === String(q.x))?.y ?? null)]) },
    beskrivelse,
  };
}
