// Dil başına RSS: mutlak bağlantılar, atom:link rel=self, dil etiketi ve kapak görseli (haberin ya da bölümün).
import rss from '@astrojs/rss';
import { SITE, type Locale } from './site';
import { getPublishedPosts, getPostUrl, kapakBilgisi } from './news';
import { KAPAK_G, KAPAK_Y } from '../kapak/ciz';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export async function feed(lang: Locale, title: string, selfPath: string) {
  // Yalnız son 50 yazı (diğer üç site gibi): sınırsız akış 283 KB'a çıkmıştı ve mecmua-saat Worker'ı her 10 dakikada
  // tamamını indirip ayrıştırırken 10 ms CPU sınırına dayanıyordu (ücretsiz plan denetimi E1, 21 Ekim).
  const posts = (await getPublishedPosts(lang)).slice(0, 50);
  return rss({
    title,
    description: SITE.description[lang],
    site: SITE.url,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      media: 'http://search.yahoo.com/mrss/',
    },
    items: await Promise.all(posts.map(async (post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: new URL(getPostUrl(lang, post.id), SITE.url).href,
      customData: `<media:content url="${esc(new URL((await kapakBilgisi(post, lang)).url, SITE.url).href)}" medium="image" type="image/png" width="${KAPAK_G}" height="${KAPAK_Y}"/>`,
    }))),
    customData: `<language>${SITE.localeTag[lang]}</language><atom:link href="${new URL(selfPath, SITE.url).href}" rel="self" type="application/rss+xml"/>`,
  });
}
