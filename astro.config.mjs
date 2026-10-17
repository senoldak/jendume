import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { dizinlenir } from './src/lib/kalite.mjs';
import { bolumKapakYolu, haberKapakYolu, kapakliKimlikler } from './src/lib/kapak.mjs';
import { haberYolu, karsiYol } from './src/lib/yollar.mjs';
import { sozlukEklentisi } from './src/lib/sozluk.mjs';
import { satteri } from '@astrojs/markdown-satteri';

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
        kisaHaberler.add(`${SITE}${haberYolu(lang, id)}`);
        continue;
      }
      map.set(`${SITE}${haberYolu(lang, id)}`, {
        lastmod: (Number.isNaN(updated.valueOf()) ? date : updated).toISOString(),
      });
    }
    // Kendi kapağı olmayan eski haber bölüm kapağını gösterir (bütçe: src/lib/kapak.mjs).
    const kapakli = kapakliKimlikler(dilHaberleri);
    for (const h of dilHaberleri) {
      const haber = map.get(`${SITE}${haberYolu(lang, h.id)}`);
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
// Derlenmiş sayfa (dist/…/index.html) var mı, dizine giriyor mu? Site haritası astro:build:done'da yazıldığı için
// sayfalar diskte hazırdır. noindex alan her sayfa (kısa haber vb.) haritaya girmez.
const sayfaDurumu = new Map();
function sayfa(url) {
  if (sayfaDurumu.has(url)) return sayfaDurumu.get(url);
  const yol = new URL(url).pathname;
  const dosya = path.resolve('dist', `.${yol}`, yol.endsWith('/') ? 'index.html' : '');
  let durum = { var: false, noindex: false };
  if (fs.existsSync(dosya) && fs.statSync(dosya).isFile()) {
    const html = fs.readFileSync(dosya, 'utf8');
    durum = { var: true, noindex: /<meta name="robots" content="noindex/.test(html) };
  }
  sayfaDurumu.set(url, durum);
  return durum;
}
// JSON uç noktaları (arama dizini) sayfa değildir.
const haritaDisi = (url) => url.endsWith('.json') || kisaHaberler.has(url) || yonlendirmeler.has(url) || sayfa(url).noindex;

// hreflang eşleri: yol parçaları dile göre değiştiği için (/tr/haber/… ↔ /en/news/…; src/lib/yollar.mjs)
// i18n eklentisinin önek eşlemesi yetmez; karşı yol hesaplanır ve yalnız gerçekten var olan, dizine giren eş verilir.
function hreflangEsleri(url) {
  const yol = new URL(url).pathname;
  const m = /^\/(tr|en)\//.exec(yol);
  if (!m) return undefined;
  const dil = m[1];
  const karsi = `${SITE}${karsiYol(yol, dil === 'tr' ? 'en' : 'tr')}`;
  if (haritaDisi(karsi) || !sayfa(karsi).var) return undefined;
  const en = dil === 'en' ? url : karsi;
  return [
    { url: en, lang: 'en' },
    { url: dil === 'tr' ? url : karsi, lang: 'tr' },
    { url: en, lang: 'x-default' },
  ];
}

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      filter: (page) => !haritaDisi(page),
      serialize(item) {
        // Kök (/) dil seçim sayfasıdır: /en/ ile /tr/'nin x-default'u.
        if (item.url === ROOT || item.url === `${SITE}/en/` || item.url === `${SITE}/tr/`) {
          item.links = [
            { url: `${SITE}/en/`, lang: 'en' },
            { url: `${SITE}/tr/`, lang: 'tr' },
            { url: ROOT, lang: 'x-default' },
          ];
        } else {
          const esler = hreflangEsleri(item.url);
          if (esler) item.links = esler;
          else delete item.links;
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
  // Haber gövdesinde sözlük terimlerinin ilk geçişi sözlük sayfasına bağlanır (haber başına en fazla 3; src/lib/sozluk.mjs).
  markdown: {
    processor: satteri({ mdastPlugins: [sozlukEklentisi()] }),
  },
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },
  // CSP (public/_headers) satır içi betiğe izin vermez: küçük betikler de ayrı dosya (/_astro/*.js) olsun.
  vite: { build: { assetsInlineLimit: 0 } },
});
