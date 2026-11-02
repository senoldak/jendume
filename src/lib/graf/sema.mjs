// Grafik verisinin tek sözleşmesi: src/data/grafik/<yazı>/graf-N.json dosyaları ve çizim biçimleri aynı şemayı kullanır.
// Şema tidsrost grafik setinden alınmıştır (yalnız jendume'nin kullandığı biçimler); okura giden metinler dile göre (felles.mjs → T).

/**
 * @typedef {{ x: string|number, y: number|null, y2?: number, mal?: number }} Punkt
 * @typedef {{ navn: string, punkter: Punkt[], rol?: 'ana'|'sammenligning'|'kunye'|'toplam', enhet?: string, desimaler?: number, isaret?: boolean }} Serie
 * @typedef {{ type: 'mal', y: number, tekst: string }} Merknad
 * @typedef {{
 *   dil?: 'tr'|'en', form: string, tittel: string, kilde: { navn: string, url?: string },
 *   enhet: string, desimaler?: number, serier: Serie[], merknader?: Merknad[],
 *   valg?: { sorter?: boolean, fremhev?: (string|number)[], toplam?: (string|number)[], gruppenavn?: [string, string], malnavn?: string, kolonner?: number, noktalar?: boolean, fark?: boolean, sum?: boolean, maks?: number, dogrudan?: boolean }
 * }} GrafData
 * @typedef {{ x: number, y: number, tekst: string, midt?: string }} TipsPunkt
 * @typedef {{ svg: string, bredde: number, hoyde: number, modus: 'serie'|'element', punkter: TipsPunkt[], ramme?: { topp: number, bunn: number }, nokkel?: { navn: string, klasse: string }[], tabell: { kolonner: string[], rader: string[][] }, beskrivelse: string }} Tegning
 */

export const BILINEN_FORMER = ['linje', 'soyle', 'rangering', 'smultring', 'helning', 'manual', 'smaa', 'nokkeltall', 'minitabell', 'rutenett', 'fossefall'];

/** @param {GrafData} d @returns {string[]} hata listesi; boşsa geçerli */
export function validerGraf(d) {
  const h = [];
  if (!d || typeof d !== 'object') return ['veri yok'];
  if (!BILINEN_FORMER.includes(d.form)) h.push(`bilinmeyen form: ${d.form}`);
  if (!d.tittel) h.push('tittel eksik');
  if (!d.kilde?.navn) h.push('kilde.navn eksik');
  if (typeof d.enhet !== 'string') h.push('enhet eksik');
  if (d.form === 'manual') {
    if (!(Array.isArray(d.valg?.gruppenavn) && d.valg.gruppenavn.length === 2)) h.push('manual: valg.gruppenavn [a, b] eksik');
    for (const s of d.serier ?? []) for (const p of s.punkter ?? []) if (p.y !== null && !Number.isFinite(p.y2)) h.push(`manual: "${p.x}" y2 eksik`);
  }
  if (d.form === 'smaa' && !(d.serier?.length >= 2)) h.push('smaa: en az 2 seri');
  if (d.form === 'nokkeltall') {
    const ana = (d.serier ?? []).filter((s) => s.rol === 'ana');
    if (ana.length !== 1 || ana[0].punkter?.length !== 1) h.push('nokkeltall: tam bir ana seri, tek noktalı');
  }
  if (d.form === 'minitabell') {
    const [a, b] = d.serier ?? [];
    if (d.serier?.length !== 2 || a.punkter.map((p) => String(p.x)).join('|') !== b.punkter.map((p) => String(p.x)).join('|')) h.push('minitabell: aynı etiketli iki seri');
  }
  if (d.form === 'fossefall' && !Number.isFinite(d.serier?.[0]?.punkter?.[0]?.y)) h.push('fossefall: ilk değer eksik');
  if (d.form === 'helning') for (const s of d.serier ?? []) if (s.punkter?.length !== 2) h.push(`helning: "${s.navn}" iki noktalı olmalı`);
  if (d.form === 'linje' && d.serier?.length > 3) h.push('linje: en çok 3 seri');
  if (!Array.isArray(d.serier) || !d.serier.length) h.push('serier boş');
  else
    for (const s of d.serier) {
      if (!Array.isArray(s.punkter) || !s.punkter.length) h.push(`serier: "${s.navn}" boş`);
      else {
        for (const p of s.punkter) if (p.y !== null && !Number.isFinite(p.y)) h.push(`serier: "${s.navn}" ${p.x} geçersiz y`);
        if (!s.punkter.some((p) => Number.isFinite(p.y))) h.push(`serier: "${s.navn}" hiç değer yok`);
      }
    }
  return h;
}
