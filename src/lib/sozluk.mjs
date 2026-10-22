// Yapay zekâ sözlüğü yardımcıları: terim arama, haber metninde terim eşleme ve Markdown'a bağlantı ekleyen
// remark eklentisi (astro.config.mjs → markdown.remarkPlugins). Veri: src/data/sozluk/.
//
// Bağlantı kuralı: haber gövdesinde bir terim ilk geçtiği yerde sözlük sayfasına bağlanır; haber başına en fazla
// SOZLUK_BAGLANTI_SINIRI bağlantı. Başlık, mevcut bağlantı, kod ve HTML içindeki metne dokunulmaz; bültenler atlanır.
// `bagla: false` terimler (aşırı genel olanlar) hiç bağlanmaz.
import { TERIMLER } from '../data/sozluk/index.mjs';
import { terimYolu } from './yollar.mjs';

export { TERIMLER };
export const SOZLUK_BAGLANTI_SINIRI = 3;

/** @typedef {'tr' | 'en'} Dil */

const YEREL = { tr: 'tr-TR', en: 'en-US' };

/** Küçük harf + şapkasız (â→a, î→i, û→u). Uzunluk korunur; korunmazsa (nadir) düz küçük harf döner. */
function normal(metin, dil) {
  const k = metin.toLocaleLowerCase(YEREL[dil]).replace(/[âÂ]/g, 'a').replace(/[îÎ]/g, 'i').replace(/[ûÛ]/g, 'u');
  return k.length === metin.length ? k : metin.toLowerCase();
}

const kacis = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const SOL = '(?<![\\p{L}\\p{N}\\-])';

/** Dil başına terim kalıpları (önbellekli). */
const kaliplar = { tr: null, en: null };
function kaliplariAl(dil) {
  if (!kaliplar[dil]) {
    kaliplar[dil] = TERIMLER.map((t) => ({
      id: t.id,
      bagla: t.bagla,
      onekler: t[dil].esles.filter(Boolean).map((e) => new RegExp(SOL + kacis(normal(e, dil)), 'gu')),
      kisaltmalar: t[dil].kisaltmaEsles.filter(Boolean).map((k) => new RegExp(`${SOL}${kacis(k)}(?![\\p{L}\\p{N}])`, 'gu')),
    }));
  }
  return kaliplar[dil];
}

/**
 * Metindeki bütün terim geçişleri: { id, bas, son }, başlangıca göre sıralı (eşitlikte uzun olan önce).
 * @param {string} metin
 * @param {Dil} dil
 * @param {{ yalnizBaglanan?: boolean }} [secenek]
 */
export function terimGecisleri(metin, dil, { yalnizBaglanan = false } = {}) {
  const sonuc = [];
  const kucuk = normal(metin, dil);
  for (const k of kaliplariAl(dil)) {
    if (yalnizBaglanan && !k.bagla) continue;
    for (const [hedef, liste] of [
      [kucuk, k.onekler],
      [metin, k.kisaltmalar],
    ]) {
      for (const r of liste) {
        r.lastIndex = 0;
        for (const m of hedef.matchAll(r)) sonuc.push({ id: k.id, bas: m.index, son: m.index + m[0].length });
      }
    }
  }
  return sonuc.sort((a, b) => a.bas - b.bas || b.son - a.son);
}

/** Metin bir terimi içeriyor mu? (Terim sayfasındaki "bu terimin geçtiği haberler" listesi için.) */
export function terimGeciyor(metin, dil, id) {
  const k = kaliplariAl(dil).find((x) => x.id === id);
  if (!k) return false;
  const kucuk = normal(metin, dil);
  return k.onekler.some((r) => ((r.lastIndex = 0), r.test(kucuk))) || k.kisaltmalar.some((r) => ((r.lastIndex = 0), r.test(metin)));
}

export const terimBul = (id) => TERIMLER.find((t) => t.id === id);
export const terimSlugdan = (dil, slug) => TERIMLER.find((t) => t[dil].slug === slug);

// --- remark eklentisi ---------------------------------------------------------------------------------------

const ATLA = new Set(['link', 'linkReference', 'heading', 'code', 'inlineCode', 'html', 'image', 'imageReference', 'definition', 'footnoteDefinition']);

/**
 * mdast ağacına sözlük bağlantıları ekler (yerinde). Döner: bağlanan terim kimlikleri.
 * @param {any} agac mdast kökü
 * @param {Dil} dil
 * @param {number} [sinir]
 */
/**
 * Tek bir metin parçasını böler: bağlanacak ilk geçişler `text` ve `link` parçalarına ayrılır. Hiç bağlantı
 * yoksa null döner. `baglanan` (terim kimlikleri kümesi) belge genelinde paylaşılır ve güncellenir.
 * @returns {{ tip: 'text' | 'link', deger: string, url?: string }[] | null}
 */
function metniBol(metin, dil, baglanan, sinir) {
  const parcalar = [];
  let imlec = 0;
  for (const g of terimGecisleri(metin, dil, { yalnizBaglanan: true })) {
    if (baglanan.size >= sinir) break;
    if (baglanan.has(g.id) || g.bas < imlec) continue;
    if (g.bas > imlec) parcalar.push({ tip: 'text', deger: metin.slice(imlec, g.bas) });
    parcalar.push({ tip: 'link', deger: metin.slice(g.bas, g.son), url: terimYolu(dil, g.id) });
    baglanan.add(g.id);
    imlec = g.son;
  }
  if (imlec === 0) return null;
  if (imlec < metin.length) parcalar.push({ tip: 'text', deger: metin.slice(imlec) });
  return parcalar;
}

/**
 * mdast ağacına sözlük bağlantıları ekler (yerinde). Döner: bağlanan terim kimlikleri.
 * @param {any} agac mdast kökü
 * @param {Dil} dil
 * @param {number} [sinir]
 */
export function sozlukBaglantilariEkle(agac, dil, sinir = SOZLUK_BAGLANTI_SINIRI) {
  const baglanan = new Set();
  function gez(dugum) {
    if (!dugum.children || baglanan.size >= sinir) return;
    const yeni = [];
    for (const cocuk of dugum.children) {
      if (baglanan.size >= sinir || ATLA.has(cocuk.type)) {
        yeni.push(cocuk);
        continue;
      }
      if (cocuk.type !== 'text') {
        gez(cocuk);
        yeni.push(cocuk);
        continue;
      }
      const parcalar = metniBol(cocuk.value, dil, baglanan, sinir);
      if (!parcalar) {
        yeni.push(cocuk);
        continue;
      }
      for (const p of parcalar) {
        yeni.push(
          p.tip === 'text'
            ? { type: 'text', value: p.deger }
            : { type: 'link', url: p.url, data: { hProperties: { className: ['term-link'] } }, children: [{ type: 'text', value: p.deger }] },
        );
      }
    }
    dugum.children = yeni;
  }
  gez(agac);
  return [...baglanan];
}

/** Haber kaynağının ön bilgisini (frontmatter) düz anahtar-değer olarak okur. */
function onBilgi(kaynak) {
  const cikti = {};
  const m = /^﻿?---\r?\n([\s\S]*?)\r?\n---/.exec(kaynak ?? '');
  if (m) {
    for (const satir of m[1].split(/\r?\n/)) {
      const k = /^([A-Za-z_]+):\s*(.*)$/.exec(satir);
      if (k) cikti[k[1]] = k[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return cikti;
}

/**
 * Sätteri mdast eklentisi (astro.config.mjs → markdown.processor). Yalnız haber dosyalarında (src/content/haberler/)
 * çalışır; bültenlerde çalışmaz. Belge başına bir durum tutulur (her terim bir kez, en fazla SOZLUK_BAGLANTI_SINIRI).
 * Başlık, bağlantı, kod ve HTML içindeki metin atlanır.
 */
export function sozlukEklentisi() {
  return (ctx) => {
    const yol = String(ctx.fileURL?.pathname ?? '').replace(/\\/g, '/');
    if (!yol.includes('/content/haberler/')) return null;
    const on = onBilgi(ctx.source);
    if (on.category === 'gunluk-bulten') return null;
    const dil = on.lang === 'en' || on.lang === 'tr' ? on.lang : /\/haberler\/en\//.test(yol) ? 'en' : 'tr';
    const baglanan = new Set();
    return {
      name: 'jendume-sozluk',
      text(dugum, c) {
        if (baglanan.size >= SOZLUK_BAGLANTI_SINIRI) return;
        for (let ust = c.parent(dugum); ust; ust = c.parent(ust)) if (ATLA.has(ust.type)) return;
        const parcalar = metniBol(dugum.value, dil, baglanan, SOZLUK_BAGLANTI_SINIRI);
        if (!parcalar) return;
        c.replaceNode(
          dugum,
          parcalar.map((p) =>
            p.tip === 'text'
              ? { type: 'text', value: p.deger }
              : { type: 'link', url: p.url, data: { hProperties: { className: ['term-link'] } }, children: [{ type: 'text', value: p.deger }] },
          ),
        );
      },
    };
  };
}
