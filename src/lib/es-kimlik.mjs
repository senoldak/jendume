// İki dilli haberin dosya adları (kimlik) normalde aynıdır: /tr/haber/<kimlik>/ ↔ /en/news/<kimlik>/.
// Yeni haberde İngilizce adres kendi başlığından üretilirse (scripts/bot/lib.mjs) iki dosya da ön bilgide
// `esId` taşır: öteki dildeki dosyanın adı (.md'siz). `esId` yoksa karşılık aynı kimliktir (eski haberler, bültenler).
// Düz `node` ile içe aktarılır (astro.config.mjs, bot betikleri); Astro'ya bağımlı değildir.

/** Ham .md ön bilgisinden `esId`; yoksa undefined. */
export function esKimligi(metin) {
  const on = String(metin ?? '').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  const ham = on?.match(/^esId:[ \t]*(.*)$/m)?.[1]?.trim().replace(/^(["'])(.*)\1$/, '$2');
  return ham || undefined;
}

/** Öteki dildeki karşılığın kimliği. */
export const karsiKimlik = (id, esId) => esId || id;

/** İki dili aynı habere bağlayan ortak anahtar: Türkçe dosyanın adı (TR her zaman kanonik). */
export const eslemeAnahtari = (dil, id, esId) => (dil === 'en' && esId ? esId : id);
