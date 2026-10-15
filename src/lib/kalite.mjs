// Haber kalite eşiği: çok kısa haber gövdeleri arama motorlarına "ince içerik" sinyali verir.
// Eşiğin altındaki haber sayfası erişilebilir kalır ama `noindex, follow` alır; site haritası ve Google News
// site haritasına girmez. Ölçüm her dil için ayrıdır (TR kısa, EN uzun olabilir).
// Ortak yardımcı: haber sayfası (src/pages/[lang]/haber/[id].astro), astro.config.mjs site haritası süzgeci ve
// src/pages/news-sitemap.xml.ts. Bot tarafındaki yazım eşiği (200 kelime) scripts/bot/denetci.mjs içindedir.

/** Dizine girmek için gereken en az gövde kelimesi. */
export const INDEKS_EN_AZ_KELIME = 120;

/**
 * Markdown gövdedeki kelime sayısı. Ön bilgi (frontmatter), bağlantı adresleri, HTML etiketleri ve biçim işaretleri sayılmaz.
 * @param {string | undefined} markdown
 * @returns {number}
 */
export function govdeKelime(markdown = '') {
  return String(markdown ?? '')
    .replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .split(/\s+/)
    .filter((w) => /[\p{L}\d]/u.test(w)).length;
}

/**
 * Haber gövdesi dizine girecek kadar uzun mu?
 * @param {string | undefined} markdown
 * @returns {boolean}
 */
export const dizinlenir = (markdown) => govdeKelime(markdown) >= INDEKS_EN_AZ_KELIME;
