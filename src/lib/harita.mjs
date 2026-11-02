// Yer haritası: yalnız yer haberin konusuysa. Haberin bölgesi (bolge) tek bir ülkeyse ve o ülkenin adı başlıkta geçiyorsa
// harita çizilir; "Küresel", bölge adları (Avrupa, Asya…) ve birden çok ülke çizilmez. Analiz, açıklayıcı yazı ve bülten
// de çizilmez. Çizim derlemede statik SVG olarak üretilir (istemcide betik yok).
// Veri: src/data/dunya-110m.json = world-atlas 2.0.2 countries-110m (ISC lisansı; harita verisi Natural Earth, kamu malı).
import { readFileSync } from 'node:fs';
import path from 'node:path';

/** id: world-atlas ülke kimliği (ISO 3166 sayısal). tr/en: bolge alanında ve başlıkta aranan adlar (ilki gösterilen ad). */
export const ULKELER = [
  { id: '840', tr: ['ABD', 'Amerika Birleşik Devletleri'], en: ['United States', 'USA', 'US', 'U.S.'] },
  { id: '826', tr: ['Birleşik Krallık', 'İngiltere'], en: ['United Kingdom', 'UK', 'Britain', 'England'] },
  { id: '036', tr: ['Avustralya'], en: ['Australia'] },
  { id: '156', tr: ['Çin'], en: ['China'] },
  { id: '792', tr: ['Türkiye'], en: ['Türkiye', 'Turkey'] },
  { id: '752', tr: ['İsveç'], en: ['Sweden'] },
  { id: '124', tr: ['Kanada'], en: ['Canada'] },
  { id: '276', tr: ['Almanya'], en: ['Germany'] },
  { id: '392', tr: ['Japonya'], en: ['Japan'] },
  { id: '410', tr: ['Güney Kore'], en: ['South Korea'] },
  { id: '756', tr: ['İsviçre'], en: ['Switzerland'] },
  { id: '376', tr: ['İsrail'], en: ['Israel'] },
  { id: '484', tr: ['Meksika'], en: ['Mexico'] },
  { id: '356', tr: ['Hindistan'], en: ['India'] },
  { id: '076', tr: ['Brezilya'], en: ['Brazil'] },
  { id: '250', tr: ['Fransa'], en: ['France'] },
  { id: '380', tr: ['İtalya'], en: ['Italy'] },
  { id: '724', tr: ['İspanya'], en: ['Spain'] },
  { id: '528', tr: ['Hollanda'], en: ['Netherlands'] },
  { id: '056', tr: ['Belçika'], en: ['Belgium'] },
  { id: '442', tr: ['Lüksemburg'], en: ['Luxembourg'] },
  { id: '372', tr: ['İrlanda'], en: ['Ireland'] },
  { id: '208', tr: ['Danimarka'], en: ['Denmark'] },
  { id: '578', tr: ['Norveç'], en: ['Norway'] },
  { id: '246', tr: ['Finlandiya'], en: ['Finland'] },
  { id: '616', tr: ['Polonya'], en: ['Poland'] },
  { id: '040', tr: ['Avusturya'], en: ['Austria'] },
  { id: '643', tr: ['Rusya'], en: ['Russia'] },
  { id: '804', tr: ['Ukrayna'], en: ['Ukraine'] },
  { id: '158', tr: ['Tayvan'], en: ['Taiwan'] },
  { id: '682', tr: ['Suudi Arabistan'], en: ['Saudi Arabia'] },
  { id: '784', tr: ['Birleşik Arap Emirlikleri', 'BAE'], en: ['United Arab Emirates', 'UAE'] },
  { id: '364', tr: ['İran'], en: ['Iran'] },
  { id: '818', tr: ['Mısır'], en: ['Egypt'] },
  { id: '566', tr: ['Nijerya'], en: ['Nigeria'] },
  { id: '404', tr: ['Kenya'], en: ['Kenya'] },
  { id: '710', tr: ['Güney Afrika'], en: ['South Africa'] },
  { id: '360', tr: ['Endonezya'], en: ['Indonesia'] },
  { id: '458', tr: ['Malezya'], en: ['Malaysia'] },
  { id: '764', tr: ['Tayland'], en: ['Thailand'] },
  { id: '704', tr: ['Vietnam'], en: ['Vietnam'] },
  { id: '586', tr: ['Pakistan'], en: ['Pakistan'] },
];

const YEREL = { tr: 'tr-TR', en: 'en-US' };
const kacis = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const kucuk = (s, dil) => String(s ?? '').toLocaleLowerCase(YEREL[dil]).trim();

// Başlıkta ad: harf sınırında; Türkçede ek alabilir ("ABD'de", "Çin'in"), kısaltmalar (US, UK) yalnız tam sözcük.
function gecer(baslik, ad, dil) {
  const kisa = ad.length <= 3;
  const sag = kisa || dil === 'en' ? '(?![\\p{L}\\p{N}])' : '';
  const re = new RegExp(`(?<![\\p{L}\\p{N}])${kacis(kisa ? ad : kucuk(ad, dil))}${sag}`, 'u');
  return re.test(kisa ? String(baslik ?? '') : kucuk(baslik, dil));
}

/**
 * Haritası çizilecek ülke ya da null.
 * @param {{ bolge?: string, title?: string, category?: string, yaziTuru?: string }} veri
 * @param {'tr' | 'en'} dil
 * @returns {{ id: string, ad: string } | null}
 */
export function haritaUlkesi(veri, dil) {
  if (!veri?.bolge || veri.category === 'gunluk-bulten') return null;
  if (veri.yaziTuru && veri.yaziTuru !== 'haber') return null;
  const bolge = kucuk(veri.bolge, dil);
  if (/[·,/]| ve | and /.test(bolge)) return null;
  const ulke = ULKELER.find((u) => u[dil].some((a) => kucuk(a, dil) === bolge));
  if (!ulke) return null;
  if (!ulke[dil].some((a) => gecer(veri.title, a, dil))) return null;
  return { id: ulke.id, ad: ulke[dil][0] };
}

// ---------- Çizim ----------
let dunya = null;
function veri() {
  if (!dunya) {
    const w = JSON.parse(readFileSync(path.resolve('src/data/dunya-110m.json'), 'utf8')); // derleme ve testler jendume kökünden koşar
    const [sx, sy] = w.transform.scale;
    const [tx, ty] = w.transform.translate;
    const arcs = w.arcs.map((a) => {
      let x = 0;
      let y = 0;
      return a.map(([dx, dy]) => [(x += dx) * sx + tx, (y += dy) * sy + ty]);
    });
    const halka = (r) => r.flatMap((i, k) => {
      const a = i < 0 ? [...arcs[~i]].reverse() : arcs[i];
      return k ? a.slice(1) : a;
    });
    dunya = w.objects.countries.geometries.map((g) => ({
      id: g.id,
      halkalar: (g.type === 'Polygon' ? [g.arcs] : g.type === 'MultiPolygon' ? g.arcs : []).flatMap((p) => p.map(halka)),
    }));
  }
  return dunya;
}

export const HARITA_G = 840;
export const HARITA_Y = 400;

/** Ülkeyi çevresiyle gösteren statik SVG (viewBox 840×400). Ülke yeşil, komşular gri. */
export function haritaSvg(id, etiket) {
  const ulkeler = veri();
  const hedef = ulkeler.find((u) => u.id === id);
  if (!hedef) return null;
  // Ülkenin kendi sınır kutusu; ana kara dışındaki uzak adalar (ör. ABD'de Alaska ve Hawaii) kutuyu büyütmesin diye en büyük
  // halkanın çevresi esas alınır.
  const alan = (h) => Math.abs(h.reduce((s, [x, y], i) => { const [x2, y2] = h[(i + 1) % h.length]; return s + x * y2 - x2 * y; }, 0));
  const ana = [...hedef.halkalar].sort((a, b) => alan(b) - alan(a))[0];
  let [x0, y0, x1, y1] = [180, 90, -180, -90];
  for (const [x, y] of ana) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  const ortaY = (y0 + y1) / 2;
  const kx = Math.cos((ortaY * Math.PI) / 180);
  // Çerçeve: ülke çevresiyle; en az 24 boylam genişlik, oran 840:400.
  let gen = Math.max((x1 - x0) * kx * 2.2, 24 * kx);
  let yuk = Math.max((y1 - y0) * 2.2, gen * (HARITA_Y / HARITA_G));
  gen = Math.max(gen, yuk * (HARITA_G / HARITA_Y));
  yuk = gen * (HARITA_Y / HARITA_G);
  const cx = ((x0 + x1) / 2) * kx;
  const olcek = HARITA_G / gen;
  const P = ([lon, lat]) => [((lon * kx - cx) * olcek + HARITA_G / 2).toFixed(1), ((ortaY - lat) * olcek + HARITA_Y / 2).toFixed(1)];
  const yollar = ulkeler
    .map((u) => {
      const d = u.halkalar
        .filter((h) => h.some(([x, y]) => Math.abs(x * kx - cx) * olcek < HARITA_G && Math.abs(ortaY - y) * olcek < HARITA_Y))
        .map((h) => `M${h.map(P).join('L')}Z`)
        .join('');
      return d ? `<path d="${d}" class="${u.id === id ? 'hedef' : 'ulke'}"/>` : '';
    })
    .join('');
  const kacisli = String(etiket).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  return `<svg viewBox="0 0 ${HARITA_G} ${HARITA_Y}" role="img" aria-label="${kacisli}">${yollar}</svg>`;
}
