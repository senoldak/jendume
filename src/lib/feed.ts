// Dil başına RSS: mutlak bağlantılar, atom:link rel=self, dil etiketi ve (varsa) kapak görseli.
import rss from '@astrojs/rss';
import { SITE, type Locale } from './site';
import { getPublishedPosts, getPostUrl, gorselVar } from './news';
import { kapakUrl, KAPAK_G, KAPAK_Y } from '../kapak/ciz';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export async function feed(lang: Locale, title: string, selfPath: string) {
  const posts = await getPublishedPosts(lang);
  return rss({
    title,
    description: SITE.description[lang],
    site: SITE.url,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      media: 'http://search.yahoo.com/mrss/',
    },
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: new URL(getPostUrl(lang, post.id), SITE.url).href,
      customData: gorselVar(post.data.date)
        ? `<media:content url="${esc(new URL(kapakUrl(post, lang), SITE.url).href)}" medium="image" type="image/png" width="${KAPAK_G}" height="${KAPAK_Y}"/>`
        : undefined,
    })),
    customData: `<language>${SITE.localeTag[lang]}</language><atom:link href="${new URL(selfPath, SITE.url).href}" rel="self" type="application/rss+xml"/>`,
  });
}
