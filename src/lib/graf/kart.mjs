// Haber gövdesindeki grafik resimleri: `![…](/grafik/<yazı>/graf-N.svg)` paragrafı, yanında src/data/grafik/<yazı>/graf-N.json
// (grafik setinin şeması; değerleri resmin alt metninden scripts/grafik/alt-metinden.mjs çıkarır, aynı betik sınar) varsa
// aynı veriyle etkileşimli karta döner. Resmin altındaki italik satır (dönem, birim, "Kaynak: …") kartın altında aynen kalır.
// JSON yoksa ya da geçersizse resim olduğu gibi kalır; derleme sonu denetimi (etkilesim-denetim.mjs) bunu yakalar.
// Kartın stil ve betiği (public/graf.css, public/graf.js) sayfa başına bir kez, ilk kartın önüne eklenir.
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { grafHtml } from './html.mjs';
import { nyId } from './index.mjs';
import { validerGraf } from './sema.mjs';

const GRAF = /^\/grafik\/([a-z0-9-]+)\/(graf-\d+)\.svg$/;
export const VERI_KOK = new URL('../../data/grafik/', import.meta.url);
export const VARLIKLAR = '<link rel="stylesheet" href="/graf.css"><script src="/graf.js" defer></script>';

/** Yazının JSON'u: src/data/grafik/<yazı>/graf-N.json ya da null. */
export function grafVerisi(yazi, graf) {
  const dosya = new URL(`${yazi}/${graf}.json`, VERI_KOK);
  if (!existsSync(dosya)) return null;
  return JSON.parse(readFileSync(dosya, 'utf8'));
}

/** Düğümün düz metni (içindeki bağlantı ya da vurgu işaretleri atılır). */
const duzMetin = (n) => (n.type === 'text' ? n.value : (n.children ?? []).map(duzMetin).join(''));

/**
 * Paragraf bir graf-N.svg resminden (ve isteğe bağlı altındaki italik açıklamadan) ibaretse ve JSON'u varsa kart
 * HTML'i; yoksa null.
 * @param {{ ilk?: boolean, dil?: 'tr' | 'en' }} durum sayfadaki ilk kart stil ve betiği taşır; dil: JSON'da dil yoksa
 *   yazının dili (zincirin kart verisi dil alanı taşımaz)
 */
export function grafForParagraf(p, durum = { ilk: true }) {
  const cocuk = (p.children ?? []).filter((c) => !(c.type === 'text' && !c.value.trim()));
  let bildetekst;
  if (cocuk.length === 2 && cocuk[1].type === 'element' && cocuk[1].tagName === 'em') {
    const em = cocuk.pop();
    bildetekst = duzMetin(em).trim();
  }
  if (cocuk.length !== 1 || cocuk[0].type !== 'element' || cocuk[0].tagName !== 'img') return null;
  const m = String(cocuk[0].properties?.src ?? '').match(GRAF);
  if (!m) return null;
  try {
    const ham = grafVerisi(m[1], m[2]);
    if (!ham) return null;
    const veri = ham.dil || !durum.dil ? ham : { ...ham, dil: durum.dil };
    const hata = validerGraf(veri);
    if (hata.length) {
      console.warn(`[graf] ${m[1]}/${m[2]}.json: ${hata.join('; ')} (resim bırakıldı)`);
      return null;
    }
    const html = grafHtml(veri, { id: nyId(), bildetekst, dosya: `${m[1]}-${m[2]}`, varliklar: durum.ilk ? VARLIKLAR : '' });
    durum.ilk = false;
    return html;
  } catch (e) {
    console.warn(`[graf] ${m[1]}/${m[2]}: ${e.message} (resim bırakıldı)`);
    return null;
  }
}

// Sätteri hast eklentisi: yalnız src/content/haberler/ altındaki yazılar.
export function satteriGraf() {
  return (fabrika) => {
    // GRAF_KART=0 iken kapalı (tidsrost ile aynı): yazı işlerinin onay denetimi (mecmua onay/site-denetimi.mjs) gövdeyi
    // resim başvurusuyla görür, kart verisini kendisi denetler.
    if (process.env.GRAF_KART === '0') return null;
    const yol = fabrika?.fileURL ? fileURLToPath(fabrika.fileURL).split('\\').join('/') : '';
    if (!yol.includes('src/content/haberler/')) return null;
    const durum = { ilk: true, dil: /src\/content\/haberler\/en\//.test(yol) ? 'en' : 'tr' };
    return {
      name: 'jendume-graf',
      element: {
        filter: ['p'],
        visit(dugum, ctx) {
          const html = grafForParagraf(dugum, durum);
          if (html) ctx.replaceNode(dugum, { type: 'raw', value: html });
        },
      },
    };
  };
}
