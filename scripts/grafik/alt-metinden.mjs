// Haber gövdesindeki grafik resimlerinin alt metninden (`![alt](/grafik/<yazı>/graf-N.svg)`) etkileşimli grafik verisi üretir:
//   src/data/grafik/<yazı>/graf-N.json (şema: src/lib/graf/sema.mjs). Değerleri YALNIZ alt metin verir; hiçbir şey eklenmez,
//   hesaplanmaz. Başlık resmin SVG'sindeki <title> öğesinden alınır (alt metin "<tür>: <başlık>: <veri>" biçimindedir ve
//   başlıkta da ": " geçebilir), kaynak adı resmin altındaki italik satırdan ("Kaynak: …" / "Source: …").
//   Her değer üretimde yeniden biçimlenir (src/lib/graf/felles.mjs → bi) ve alt metindeki yazımla birebir eşleşmezse hata verir.
// Kullanım:  node scripts/grafik/alt-metinden.mjs            (JSON'ları yazar)
//            node scripts/grafik/alt-metinden.mjs --kontrol  (diskteki JSON güncel mi; farklıysa çıkış kodu 1)
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { bi, setDil } from '../../src/lib/graf/felles.mjs';

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const ICERIK = path.join(KOK, 'src/content/haberler');
export const VERI = path.join(KOK, 'src/data/grafik');
export const SVG = path.join(KOK, 'public/grafik');

/** Alt metindeki tür adı → kısa anahtar. */
export const TURLER = {
  tr: { 'Çubuk grafik': 'bar', 'Sütun grafik': 'column', 'Çizgi grafik': 'line', 'Nokta grafik': 'dot', Tablo: 'table', 'Eğim grafiği': 'slope', 'Halter grafik': 'dumbbell', 'Küçük çoklu grafik': 'multiples', 'Rakam kutusu': 'key', 'Kare grafik': 'unit', 'Şelale grafik': 'waterfall', 'Pay grafiği': 'share' },
  en: { 'Bar chart': 'bar', 'Column chart': 'column', 'Line chart': 'line', 'Dot chart': 'dot', Table: 'table', 'Slope chart': 'slope', 'Dumbbell chart': 'dumbbell', 'Small multiples': 'multiples', 'Key figure': 'key', 'Unit chart': 'unit', 'Waterfall chart': 'waterfall', 'Share chart': 'share' },
};
/** Alt metin türü → çizim biçimi (src/lib/graf/index.mjs). */
export const FORM = { bar: 'rangering', column: 'soyle', line: 'linje', dot: 'linje', table: 'minitabell', slope: 'helning', dumbbell: 'manual', multiples: 'smaa', key: 'nokkeltall', unit: 'rutenett', waterfall: 'fossefall', share: 'smultring' };

// ---- Değer ve nokta ayrıştırma ------------------------------------------------------------------------------------

/** Sayı + birim, dile göre; {y, enh, end} ya da null. tr: %4,85 · 1.849,7 · −799 milyon ton; en: 4.85% · 1,849.7 · −799 million ton. */
function degerOku(s, i, dil) {
  let j = i;
  let pct = false;
  if (dil === 'tr' && s[j] === '%') { pct = true; j++; }
  let neg = false;
  if (s[j] === '−' || s[j] === '-') { neg = true; j++; }
  const grup = dil === 'tr' ? /\d{1,3}(?:\.\d{3})+|\d+/y : /\d{1,3}(?:,\d{3})+|\d+/y;
  grup.lastIndex = j;
  const g = grup.exec(s);
  if (!g) return null;
  j = grup.lastIndex;
  let tam = g[0].replace(dil === 'tr' ? /\./g : /,/g, '');
  let des = 0;
  const ondal = dil === 'tr' ? /,(\d+)/y : /\.(\d+)/y;
  ondal.lastIndex = j;
  const o = ondal.exec(s);
  if (o) { tam += `.${o[1]}`; des = o[1].length; j = ondal.lastIndex; }
  if (dil === 'en' && s[j] === '%') { pct = true; j++; }
  let birim = '';
  if (!pct && s[j] === ' ' && /\p{L}/u.test(s[j + 1] ?? '') && !(dil === 'en' && /^ in \d{4}(?:, |$)/.test(s.slice(j)))) {
    // Birim: bir sonraki ayraca (", " ya da " in 2030") ya da sona kadar.
    const rest = s.slice(j + 1);
    const son = rest.search(dil === 'en' ? /, | in \d{4}(?:, |$)|$/ : /, |$/);
    birim = rest.slice(0, son);
    j = j + 1 + son;
  }
  const y = (neg ? -1 : 1) * Number(tam);
  return { y, des, enh: pct ? '%' : birim, end: j };
}

/** Bir serinin nokta listesi ("1990 yılında 1,44 milyar ton, Oca 2025: 99,6, Dünya, 2023 yılında: %15,4"). */
function noktalar(s, dil) {
  const ut = [];
  let i = 0;
  const ayrac = (j) => (j === s.length ? j : s.startsWith(', ', j) ? j + 2 : -1);
  while (i < s.length) {
    let nokta = null;
    if (dil === 'tr') {
      const m = /(\d{4}) yılında /y;
      m.lastIndex = i;
      const e = m.exec(s);
      if (e) {
        const v = degerOku(s, m.lastIndex, dil);
        if (v && ayrac(v.end) >= 0) nokta = { x: e[1], v };
      }
    } else {
      const v = degerOku(s, i, dil);
      const m = v && /^ in (\d{4})/.exec(s.slice(v.end));
      if (v && m && ayrac(v.end + m[0].length) >= 0) nokta = { x: m[1], v: { ...v, end: v.end + m[0].length } };
    }
    if (!nokta) {
      for (let c = s.indexOf(': ', i); c >= 0; c = s.indexOf(': ', c + 1)) {
        const v = degerOku(s, c + 2, dil);
        if (v && ayrac(v.end) >= 0) { nokta = { x: s.slice(i, c), v }; break; }
      }
    }
    if (!nokta) throw new Error(`nokta ayrıştırılamadı: "${s.slice(i, i + 60)}"`);
    ut.push({ x: nokta.x, y: nokta.v.y, des: nokta.v.des, enh: nokta.v.enh, simge: s.slice(i, nokta.v.end) });
    i = ayrac(nokta.v.end);
  }
  return ut;
}

/** Yıl adı sadeleşir: "2000 yılında" / "2015 yılı" / "in 2000" / "Year 2015" → "2000". Öteki adlar olduğu gibi. */
export function yilAdi(ad) {
  return ad.replace(/^(\d{4}) yılı(?:nda)?$/, '$1').replace(/^(?:in|In|Year) (\d{4})$/, '$1');
}

const XML = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'" };
const xmlCoz = (s) => s.replace(/&(?:amp|lt|gt|quot|apos|#39);/g, (m) => XML[m]);

/** SVG'nin <title> metni (başlık). */
export function svgBaslik(svgMetin) {
  const m = svgMetin.match(/<title[^>]*>([\s\S]*?)<\/title>/);
  return m ? xmlCoz(m[1]) : null;
}

/** "<tür>: <başlık>: <veri>." → { tur, ad, veri: string }. Başlık SVG'den bilindiği için ayrım kesin. */
export function altBol(alt, baslik, dil) {
  for (const [ad, tur] of Object.entries(TURLER[dil])) {
    const bas = `${ad}: ${baslik}: `;
    if (alt.startsWith(bas)) return { tur, veri: alt.slice(bas.length).replace(/\.$/, '') };
  }
  throw new Error(`alt metin "<tür>: <başlık>: " ile başlamıyor (${dil}): ${alt.slice(0, 80)}`);
}

/** Veri kısmı → seri blokları [{ ad, noktalar }]. */
export function bloklar(veri, dil) {
  return veri.split('; ').map((b) => {
    const k = b.indexOf(': ');
    if (k < 0) throw new Error(`blok adı yok: "${b.slice(0, 60)}"`);
    return { ad: b.slice(0, k), noktalar: noktalar(b.slice(k + 2), dil) };
  });
}

// ---- Biçim eşlemesi ----------------------------------------------------------------------------------------------

const TOPLAM = /^(OECD|OECD üyeleri|OECD toplamı|OECD members|OECD aggregate|OECD-wide|Dünya|World|AB|EU|AB geneli|EU overall|Tümü|All|Toplam|Total|Tüm işletmeler.*|All enterprises.*)$/;
const ESIK = /^(Eşik|Threshold)$/;
const KARSILASTIRMA = /^(Karşılaştırma|Comparison)$/;
const YILLAR = /yıl|year/i;

const nokta = (p, ek = {}) => ({ x: p.x, y: p.y, ...ek });

/** Bir bloğun noktalarından birim ve ondalık: hepsi aynı olmak zorunda (üretimde yazım denetimi bunu da doğrular). */
function olcu(noktalar) {
  const enhler = new Set(noktalar.map((p) => p.enh));
  if (enhler.size > 1) throw new Error(`birim tutarsız: ${[...enhler].join(' | ')}`);
  return { enh: [...enhler][0] ?? '', des: Math.max(...noktalar.map((p) => p.des)) };
}
const tumOlcu = (bl) => olcu(bl.flatMap((b) => b.noktalar));

/**
 * @param {{ alt: string, baslik: string, dil: 'tr'|'en', kaynak: string }} g
 * @returns {import('../../src/lib/graf/sema.mjs').GrafData}
 */
export function grafVerisi({ alt, baslik, dil, kaynak }) {
  const { tur, veri } = altBol(alt, baslik, dil);
  const bl = bloklar(veri, dil);
  const form = FORM[tur];
  const taban = { dil, form, tittel: baslik, kilde: { navn: kaynak } };
  const bir = () => {
    if (bl.length !== 1) throw new Error(`${tur}: tek seri bekleniyordu (${bl.length})`);
    return bl[0];
  };
  const seri = (b, ek = {}) => ({ navn: yilAdi(b.ad), punkter: b.noktalar.map((p) => nokta(p)), ...ek });
  const ayniEtiket = (a, b, ne) => {
    if (a.noktalar.map((p) => p.x).join('|') !== b.noktalar.map((p) => p.x).join('|')) throw new Error(`${ne}: "${a.ad}" ve "${b.ad}" etiketleri aynı değil`);
  };
  let d;
  switch (tur) {
    case 'bar': {
      const b = bir();
      const esik = b.noktalar.find((p) => ESIK.test(p.x));
      const govde = b.noktalar.filter((p) => p !== esik);
      const o = olcu(b.noktalar);
      d = { ...taban, enhet: o.enh, desimaler: o.des, serier: [{ navn: b.ad, punkter: govde.map((p) => nokta(p)) }], valg: { sorter: false } };
      const fremhev = govde.filter((p) => p.x === 'Türkiye').map((p) => p.x);
      const toplam = govde.filter((p) => TOPLAM.test(p.x)).map((p) => p.x);
      if (fremhev.length) d.valg.fremhev = fremhev;
      if (toplam.length) d.valg.toplam = toplam;
      if (esik) d.merknader = [{ type: 'mal', y: esik.y, tekst: esik.x }];
      break;
    }
    case 'column': {
      const b = bir();
      const o = olcu(b.noktalar);
      d = { ...taban, enhet: o.enh, desimaler: o.des, serier: [seri(b)], valg: { fremhev: b.noktalar.map((p) => p.x) } };
      break;
    }
    case 'line':
    case 'dot': {
      const o = tumOlcu(bl);
      for (const b of bl) ayniEtiket(bl[0], b, tur);
      d = { ...taban, enhet: o.enh, desimaler: o.des, serier: bl.map((b) => seri(b)), ...(tur === 'dot' ? { valg: { noktalar: true } } : {}) };
      break;
    }
    case 'table': {
      if (bl.length !== 2) throw new Error('tablo: iki sütun bekleniyordu');
      ayniEtiket(bl[0], bl[1], 'tablo');
      const [a, b] = bl.map((x) => olcu(x.noktalar));
      d = {
        ...taban, enhet: a.enh, desimaler: a.des,
        serier: [seri(bl[0], { enhet: a.enh, desimaler: a.des }), seri(bl[1], { enhet: b.enh, desimaler: b.des })],
        valg: { fremhev: bl[0].noktalar.filter((p) => p.x === 'Türkiye').map((p) => p.x) },
      };
      if (!d.valg.fremhev.length) delete d.valg;
      break;
    }
    case 'slope': {
      if (bl.length !== 2) throw new Error('eğim: iki dönem bekleniyordu');
      ayniEtiket(bl[0], bl[1], 'eğim');
      const o = tumOlcu(bl);
      d = { ...taban, enhet: o.enh, desimaler: o.des, serier: bl[0].noktalar.map((p, i) => ({ navn: p.x, punkter: [{ x: yilAdi(bl[0].ad), y: p.y }, { x: yilAdi(bl[1].ad), y: bl[1].noktalar[i].y }] })) };
      if (bl[0].noktalar.some((p) => p.x === 'Türkiye')) d.valg = { fremhev: ['Türkiye'] };
      break;
    }
    case 'dumbbell': {
      if (bl.length < 2 || bl.length > 3) throw new Error('halter: iki grup (ve isteğe bağlı hedef) bekleniyordu');
      const [a, b, hedef] = bl;
      ayniEtiket(a, b, 'halter');
      if (hedef) ayniEtiket(a, hedef, 'halter');
      const o = tumOlcu(bl);
      d = {
        ...taban, enhet: o.enh, desimaler: o.des,
        serier: [{ navn: a.ad, punkter: a.noktalar.map((p, i) => ({ x: p.x, y: p.y, y2: b.noktalar[i].y, ...(hedef ? { mal: hedef.noktalar[i].y } : {}) })) }],
        valg: { gruppenavn: [yilAdi(a.ad), yilAdi(b.ad)], sorter: false, ...(hedef ? { malnavn: hedef.ad } : {}) },
      };
      break;
    }
    case 'multiples': {
      const o = tumOlcu(bl);
      for (const b of bl) ayniEtiket(bl[0], b, 'küçük çoklu');
      d = { ...taban, enhet: o.enh, desimaler: o.des, serier: bl.map((b) => seri(b)), valg: { kolonner: 2 } };
      break;
    }
    case 'key': {
      if (bl[0].noktalar.length !== 1) throw new Error('rakam kutusu: ana değer tek olmalı');
      if (bl.length < 2 || bl.length > 2) throw new Error('rakam kutusu: ana değer ve bir karşılaştırma/yıl bloğu bekleniyordu');
      const [ana, oteki] = bl;
      const rol = KARSILASTIRMA.test(oteki.ad) || !YILLAR.test(oteki.ad) ? 'sammenligning' : 'kunye';
      const o = olcu(ana.noktalar);
      const so = olcu(oteki.noktalar);
      d = {
        ...taban, enhet: o.enh, desimaler: o.des,
        serier: [seri(ana, { rol: 'ana', enhet: o.enh, desimaler: o.des }), seri(oteki, { rol, enhet: so.enh, desimaler: so.des })],
      };
      break;
    }
    case 'unit': {
      const b = bir();
      const o = olcu(b.noktalar);
      d = { ...taban, enhet: o.enh, desimaler: o.des, serier: [{ navn: b.ad, punkter: b.noktalar.map((p) => nokta(p)) }] };
      break;
    }
    case 'waterfall': {
      if (bl.length !== 2 || bl[1].noktalar.length !== 1) throw new Error('şelale: kalemler ve tek noktalı toplam bekleniyordu');
      const o = tumOlcu(bl);
      d = { ...taban, enhet: o.enh, desimaler: o.des, serier: [seri(bl[0]), seri(bl[1], { rol: 'toplam' })], valg: { fark: true, sum: true } };
      break;
    }
    case 'share': {
      const b = bir();
      const o = olcu(b.noktalar);
      d = { ...taban, enhet: o.enh, desimaler: o.des, serier: [seri(b)], valg: { maks: b.noktalar.length, dogrudan: true } };
      break;
    }
    default:
      throw new Error(`eşlenmeyen tür: ${tur}`);
  }
  const hatalar = yazimHatalari(d, bl);
  if (hatalar.length) throw new Error(`yazım uyuşmuyor: ${hatalar.join('; ')}`);
  return d;
}

/** Her değer felles.bi ile yeniden biçimlenince alt metindeki yazımla birebir aynı olmalı. */
function yazimHatalari(d, bl) {
  setDil(d.dil);
  const h = [];
  const beklenen = new Map();
  for (const b of bl) for (const p of b.noktalar) beklenen.set(`${p.x}|${p.y}`, p);
  for (const s of d.serier) {
    for (const p of s.punkter) for (const [y, ad] of [[p.y, 'y'], [p.y2, 'y2'], [p.mal, 'mal']]) {
      if (!Number.isFinite(y)) continue;
      const enh = s.enhet ?? d.enhet;
      const des = s.desimaler ?? d.desimaler;
      const bicim = bi(y, des, enh);
      // Hangi alt metin parçasından geldiğini bulmak yerine: alt metindeki hiçbir değer yazımı bu biçimi taşımıyorsa hata.
      const var_ = bl.some((b) => b.noktalar.some((q) => q.y === y && q.simge.includes(bicim)));
      if (!var_) h.push(`${s.navn}/${p.x}.${ad}: "${bicim}" alt metinde yok`);
    }
  }
  return h;
}

// ---- Dosya taraması ---------------------------------------------------------------------------------------------

const RESIM = /^!\[(.*)\]\(\/grafik\/([a-z0-9-]+)\/(graf-\d+)\.svg\)\s*$/;

/** Kaynak adı: italik satırdaki "Kaynak: X." / "Source: X." (X olduğu gibi). */
export function kaynakAdi(italik, dil) {
  const m = italik.match(dil === 'tr' ? /Kaynak:\s*(.+?)\.?\*?\s*$/ : /Source:\s*(.+?)\.?\*?\s*$/);
  return m ? m[1].trim() : null;
}

/** Bütün haber dosyalarındaki grafik resimleri: [{ yazi, graf, dil, alt, italik, dosya }]. */
export function resimler() {
  const ut = [];
  for (const dil of ['tr', 'en']) {
    const dizin = path.join(ICERIK, dil);
    for (const f of readdirSync(dizin)) {
      if (!f.endsWith('.md')) continue;
      const satirlar = readFileSync(path.join(dizin, f), 'utf8').split(/\r?\n/);
      satirlar.forEach((l, i) => {
        const m = l.match(RESIM);
        if (m) ut.push({ yazi: m[2], graf: m[3], dil, alt: m[1], italik: satirlar[i + 1] ?? '', dosya: `${dil}/${f}` });
      });
    }
  }
  return ut;
}

/** Bir resmin üretilmiş verisi; hata olursa { hata }. */
export function uret(r) {
  try {
    const svg = readFileSync(path.join(SVG, r.yazi, `${r.graf}.svg`), 'utf8');
    const baslik = svgBaslik(svg);
    if (!baslik) throw new Error('SVG <title> yok');
    const kaynak = kaynakAdi(r.italik, r.dil);
    if (!kaynak) throw new Error(`italik satırda kaynak yok: ${r.italik.slice(0, 80)}`);
    return { veri: grafVerisi({ alt: r.alt, baslik, dil: r.dil, kaynak }) };
  } catch (e) {
    return { hata: e.message };
  }
}

/** JSON metni: her nokta tek satırda, okunur. */
export function jsonMetni(d) {
  return `${JSON.stringify(d, null, 1).replace(/\{\n\s*("x":[^{}]*?)\n\s*\}/g, (_, a) => `{${a.replace(/\n\s*/g, ' ')}}`)}\n`;
}

function main() {
  const kontrol = process.argv.includes('--kontrol');
  const hepsi = resimler();
  let yazilan = 0, farkli = 0;
  const hatalar = [];
  for (const r of hepsi) {
    const s = uret(r);
    if (s.hata) { hatalar.push(`${r.dosya} ${r.yazi}/${r.graf}: ${s.hata}`); continue; }
    const hedef = path.join(VERI, r.yazi, `${r.graf}.json`);
    const metin = jsonMetni(s.veri);
    if (kontrol) {
      if (!existsSync(hedef) || readFileSync(hedef, 'utf8') !== metin) farkli++;
      continue;
    }
    mkdirSync(path.dirname(hedef), { recursive: true });
    writeFileSync(hedef, metin);
    yazilan++;
  }
  console.log(`${hepsi.length} grafik resmi; ${kontrol ? `${farkli} dosya güncel değil` : `${yazilan} JSON yazıldı`}; ${hatalar.length} hata.`);
  for (const h of hatalar) console.log(`  HATA ${h}`);
  process.exit(hatalar.length || farkli ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
