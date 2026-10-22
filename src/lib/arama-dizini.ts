// Site içi arama dizini (bkz. src/lib/arama-cekirdek.mjs): bir dildeki her haberin başlığı, spotu, bölümü, adresi, tarihi.
// Uç noktalar: src/pages/tr/arama.json.ts, src/pages/en/search.json.ts.
import { getPublishedPosts } from './news';
import { getCategory, type Locale } from './site';
import { haberYolu } from './yollar.mjs';

export async function aramaDizini(lang: Locale) {
  const kayitlar = (await getPublishedPosts(lang)).map((h) => ({
    t: h.data.title,
    d: h.data.description,
    k: getCategory(h.data.category, lang).title,
    u: haberYolu(lang, h.id),
    z: h.data.date.toISOString(),
  }));
  return new Response(JSON.stringify(kayitlar), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
