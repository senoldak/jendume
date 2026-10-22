import type { APIRoute } from 'astro';
import { getPublishedPosts, getPostUrl } from '../lib/news';
import { SITE } from '../lib/site';

export const prerender = true;

export const GET: APIRoute = async () => {
  const [trPosts, enPosts] = await Promise.all([
    getPublishedPosts('tr'),
    getPublishedPosts('en'),
  ]);

  const allPosts = [...trPosts, ...enPosts].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const top40 = allPosts.slice(0, 40);

  let output = `# Jendume - Full Content & News Feed (llms-full.txt)\n\n`;
  output += `> Beyond Words — AI, science, technology, and economic shifts explained with clarity.\n`;
  output += `> Kelimelerin ötesinde — Yapay zekâ, bilim, teknoloji ve ekonomik dönüşümler; sade ve derinlikli bir dille.\n\n`;
  output += `Last updated / Son güncelleme: ${new Date().toISOString()}\n\n`;

  for (const post of top40) {
    const lang = post.data.lang;
    const url = `${SITE.url}${getPostUrl(lang, post.id)}`;
    output += `## ${post.data.title}\n`;
    output += `- Language / Dil: ${lang.toUpperCase()}\n`;
    output += `- URL: ${url}\n`;
    output += `- Author / Yazar: ${SITE.author.name}
`;
    output += `- Date / Tarih: ${post.data.date.toISOString()}\n`;
    output += `- Category / Kategori: ${post.data.category}\n`;
    if (post.data.description) {
      output += `- Summary / Özet: ${post.data.description}\n`;
    }
    const whyMatters = post.data.why_matters || post.data.perspektif;
    if (whyMatters) {
      output += `- Why It Matters / Neden Önemli: ${whyMatters}\n`;
    }
    if (post.data.key_points && post.data.key_points.length > 0) {
      output += `- Key Points / Öne Çıkanlar: ${post.data.key_points.join('; ')}\n`;
    }
    output += `\n`;
  }

  return new Response(output, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
