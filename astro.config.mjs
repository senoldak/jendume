import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { dizinlenir } from './src/lib/kalite.mjs';
import { bolumKapakYolu, haberKapakYolu, kapakliKimlikler } from './src/lib/kapak.mjs';

const SITE = 'https://jendume.com';

// Gövdesi çok kısa haberler (src/lib/kalite.mjs) noindex alır; site haritasına girmesinler diye ayrıca toplanır.
const kisaHaberler = new Set();

// Site haritası için haber yolu → { lastmod, kapak } eşlemesi (içerik koleksiyonu config'te okunamadığı için dosyadan).
function haberBilgisi() {
  const map = new Map();
  for (const lang of ['en', 'tr']) {
    const dir = path.resolve('src/content/haberler', lang);
    if (!fs.existsSync(dir)) continue;
    const dilHaberleri = [];
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const md = fs.readFileSync(path.join(dir, file), 'utf8');
      const fm = md.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const field = (k) => fm.match(new RegExp(`^${k}:\\s*["']?([^"'\\r\\n]+)`, 'm'))?.[1]?.trim();
      if (field('draft') === 'true') continue;
      const date = new Date(field('date') ?? '');
      if (Number.isNaN(date.valueOf())) continue;
      const updated = new Date(field('updated') ?? '');
      const id = file.replace(/\.md$/, '');
      // Kapak seçimi bütün yayımlanmış haberler üzerinden yapılır (kısa haberler dahil; src/lib/news.ts ile aynı).
      dilHaberleri.push({ id, date, category: field('category') ?? '' });
      if (!dizinlenir(md)) {
        kisaHaberler.add(`${SITE}/${lang}/haber/${id}/`);
        continue;
      }
      map.set(`${SITE}/${lang}/haber/${id}/`, {
        lastmod: (Number.isNaN(updated.valueOf()) ? date : updated).toISOString(),
      });
    }
    // Kendi kapağı olmayan eski haber bölüm kapağını gösterir (bütçe: src/lib/kapak.mjs).
    const kapakli = kapakliKimlikler(dilHaberleri);
    for (const h of dilHaberleri) {
      const haber = map.get(`${SITE}/${lang}/haber/${h.id}/`);
      if (haber) haber.kapak = SITE + (kapakli.has(h.id) ? haberKapakYolu(lang, h.id) : bolumKapakYolu(lang, h.category));
    }
  }
  return map;
}

const haberler = haberBilgisi();
const ROOT = `${SITE}/`;

// public/_redirects kaynakları (ör. /en/yayin-ilkeleri/ → /en/editorial-standards/) yönlendirme sayfasıdır; haritaya girmez.
const yonlendirmeler = new Set(
  (fs.existsSync('public/_redirects') ? fs.readFileSync('public/_redirects', 'utf8') : '')
    .split(/\r?\n/)
    .map((s) => s.trim().split(/\s+/)[0])
    .filter((s) => s.startsWith('/'))
    .map((s) => `${SITE}${s}`),
);
const haritaDisi = (url) => kisaHaberler.has(url) || yonlendirmeler.has(url);

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', tr: 'tr-TR' } },
      filter: (page) => !haritaDisi(page),
      serialize(item) {
        // Dizine girmeyen eş sürüm (kısa haber, yönlendirme) hreflang bağlantısı olarak da verilmez.
        if (item.links) {
          item.links = item.links.filter((l) => !haritaDisi(l.url));
          if (item.links.length < 2) delete item.links;
        }
        // Kök (/) dil seçim sayfasıdır: /en/ ile /tr/'nin x-default'u; i18n eklentisi onu yanlışlıkla "en" sayar.
        if (item.links?.some((l) => l.url === ROOT)) {
          item.links = [
            { url: `${SITE}/en/`, lang: 'en-US' },
            { url: `${SITE}/tr/`, lang: 'tr-TR' },
            { url: ROOT, lang: 'x-default' },
          ];
        } else if (item.links && item.links.length > 1) {
          const en = item.links.find((l) => l.lang === 'en-US');
          if (en) item.links = [...item.links, { url: en.url, lang: 'x-default' }];
        }
        const haber = haberler.get(item.url);
        if (haber) {
          item.lastmod = haber.lastmod;
          if (haber.kapak) item.img = [{ url: haber.kapak }];
        }
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },
});
