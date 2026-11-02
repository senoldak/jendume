// Grafik kartının HTML'i (tek kaynak): markdown eklentisi (kart.mjs) bunu kullanır.
// Başlık, derlemede çizilen SVG, renk açıklaması, "Grafik / Tablo" düğmesi, tablo, yazının kendi italik açıklaması
// (kaynak satırı), "Veriyi indir (CSV)" ve etkileşim JSON'u. Okura giden metinler grafiğin diline göre (felles.mjs → T).
import { esc, setDil, T } from './felles.mjs';
import { tegnGraf } from './index.mjs';

const BOM = String.fromCharCode(0xfeff);
const tirnak = (v) => (v === null || v === undefined ? '' : typeof v === 'number' ? String(v) : /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

/** Verinin CSV'si (UTF-8, BOM'lu; ondalık nokta, binlik ayracı yok): satır = etiket, sütun = seri. */
export function csvAv(d) {
  setDil(d.dil);
  let baslik, satirlar;
  if (d.form === 'manual') {
    const [gA, gB] = d.valg.gruppenavn;
    const mal = d.serier[0].punkter.some((p) => Number.isFinite(p.mal));
    baslik = [T('etiket', 'label'), gA, gB, ...(mal ? [d.valg.malnavn ?? T('Hedef', 'Target')] : [])];
    satirlar = d.serier[0].punkter.map((p) => [String(p.x), p.y, p.y2, ...(mal ? [Number.isFinite(p.mal) ? p.mal : null] : [])]);
  } else {
    const etiketler = [...new Set(d.serier.flatMap((s) => s.punkter.map((p) => String(p.x))))];
    baslik = [T('etiket', 'label'), ...d.serier.map((s) => s.navn)];
    satirlar = etiketler.map((e) => [e, ...d.serier.map((s) => s.punkter.find((p) => String(p.x) === e)?.y ?? null)]);
    for (const m of d.merknader ?? []) if (m.type === 'mal') satirlar.push([m.tekst, m.y, ...d.serier.slice(1).map(() => null)]);
  }
  return `${BOM}${[baslik, ...satirlar].map((r) => r.map(tirnak).join(',')).join('\r\n')}\r\n`;
}

/**
 * @param {import('./sema.mjs').GrafData} d
 * @param {{ id?: string, bred?: boolean, nivaa?: 2|3, bildetekst?: string, dosya?: string, varliklar?: string }} [o]
 * bildetekst: yazının kendi italik açıklaması (dönem, birim, "Kaynak: …"); verilirse kartın altında aynen yazılır, yoksa
 *   kartın kendi "Kaynak: …" satırı çıkar. dosya: CSV dosya adı. varliklar: karttan önce eklenecek stil/betik etiketleri.
 */
export function grafHtml(d, o = {}) {
  setDil(d.dil);
  const { id, bred = false, nivaa = 3, bildetekst, dosya = 'veri', varliklar = '' } = o;
  const t = tegnGraf(d, { id, bred });
  const json = JSON.stringify({ modus: t.modus, punkter: t.punkter, bredde: t.bredde, ramme: t.ramme ?? null }).replace(/</g, '\\u003c');
  const h = `h${nivaa}`;
  const grafikAd = T('Grafik', 'Chart');
  const tabloAd = T('Tablo', 'Table');
  const csv = `data:text/csv;charset=utf-8,${encodeURIComponent(csvAv(d))}`;
  const kaynak = bildetekst
    ? `<p class="g-bildetekst"><em>${esc(bildetekst)}</em></p>`
    : `<p class="g-kilde">${T('Kaynak', 'Source')}: ${d.kilde.url ? `<a href="${esc(d.kilde.url)}">${esc(d.kilde.navn)}</a>` : esc(d.kilde.navn)}</p>`;
  return [
    varliklar,
    `<figure class="g-kort${bred ? ' g-bred' : ''}" data-graf tabindex="0">`,
    `<figcaption><${h} class="g-tittel">${esc(d.tittel)}</${h}>${d.under ? `<p class="g-under">${esc(d.under)}</p>` : ''}${d.tall ? `<p class="g-tall">${esc(d.tall.verdi)}${d.tall.etikett ? `<small>${esc(d.tall.etikett)}</small>` : ''}</p>` : ''}</figcaption>`,
    `<div class="g-sekme" role="group" aria-label="${T('Görünüm', 'View')}" hidden><button type="button" aria-pressed="true" data-g="grafik">${grafikAd}</button><button type="button" aria-pressed="false" data-g="tablo">${tabloAd}</button></div>`,
    `<div class="g-gorunum" data-v="grafik"><div class="g-flate">${t.svg}<div class="g-tips" hidden></div></div>`,
    t.nokkel ? `<p class="g-nokkel">${t.nokkel.map((n) => `<span class="${n.klasse}">${esc(n.navn)}</span>`).join('')}</p>` : '',
    '</div>',
    `<div class="g-gorunum g-tabell" data-v="tablo"><div class="g-tabell-rull"><table><thead><tr>${t.tabell.kolonner.map((k) => `<th scope="col">${esc(k)}</th>`).join('')}</tr></thead><tbody>${t.tabell.rader.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join('')}</tr>`).join('')}</tbody></table></div></div>`,
    `<div class="g-alt">${kaynak}<a class="g-indir" href="${csv}" download="${esc(dosya)}.csv">${T('Veriyi indir (CSV)', 'Download data (CSV)')}</a></div>`,
    `<script type="application/json" data-graf-punkter>${json}</script>`,
    '</figure>',
  ].join('');
}
