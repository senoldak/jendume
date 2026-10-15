// Google News site haritası: son 48 saatte yayımlanan, dizine girecek uzunluktaki haberler (her iki dil, haberin kendi dil koduyla).
// Site her bot commit'inden sonra yeniden derlendiği için derleme anındaki 48 saat penceresi yeterli.
import { LOCALES, SITE } from '../lib/site';
import { getPublishedPosts, getPostUrl } from '../lib/news';
import { dizinlenir } from '../lib/kalite.mjs';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function GET() {
  const since = Date.now() - 48 * 3_600_000;
  const urls: string[] = [];
  for (const lang of LOCALES) {
    for (const post of await getPublishedPosts(lang)) {
      if (post.data.date.valueOf() < since) continue;
      // Gövdesi çok kısa haber noindex alır (src/lib/kalite.mjs); Google News haritasına da girmez.
      if (!dizinlenir(post.body)) continue;
      urls.push(`  <url>
    <loc>${esc(new URL(getPostUrl(lang, post.id), SITE.url).href)}</loc>
    <news:news>
      <news:publication>
        <news:name>${esc(SITE.displayName)}</news:name>
        <news:language>${lang}</news:language>
      </news:publication>
      <news:publication_date>${post.data.date.toISOString()}</news:publication_date>
      <news:title>${esc(post.data.title)}</news:title>
    </news:news>
  </url>`);
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
