// Yapılandırılmış veri (JSON-LD) yardımcıları. Kurum ve site düğümleri her sayfada; sayfalar kendi düğümlerini ekler.
import { SITE, getCategory, type Locale } from './site';
import { getCategoryUrl, getPostUrl, type NewsEntry } from './news';
import { matchEntities } from './entities';
import { KAPAK_G, KAPAK_Y, LOGO_G, LOGO_Y } from '../kapak/ciz';

export const abs = (path: string) => new URL(path, SITE.url).href;

export const ORG_ID = abs('/#organization');
export const WEBSITE_ID = abs('/#website');

export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', tr: 'tr_TR' };

export function siteGraph() {
  return [
    {
      '@type': 'NewsMediaOrganization',
      '@id': ORG_ID,
      name: SITE.displayName,
      alternateName: SITE.name,
      url: abs('/'),
      // Yatay yayıncı logosu (600×60, src/pages/logo-600x60.png.ts); kare işaret ayrıca `image` olarak verilir.
      // sameAs bilinçli olarak yok: repoda doğrulanmış resmî sosyal hesap adresi yok (uydurulmaz).
      logo: {
        '@type': 'ImageObject',
        '@id': abs('/#logo'),
        url: abs('/logo-600x60.png'),
        contentUrl: abs('/logo-600x60.png'),
        width: LOGO_G,
        height: LOGO_Y,
        caption: SITE.displayName,
      },
      image: {
        '@type': 'ImageObject',
        url: abs('/icon-512.png'),
        width: 512,
        height: 512,
      },
      publishingPrinciples: abs('/en/editorial-standards/'),
      correctionsPolicy: abs('/en/editorial-standards/#corrections'),
      inLanguage: ['en', 'tr'],
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Science',
        'Technology',
        'Yapay Zekâ',
        'Bilim',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE.displayName,
      url: abs('/'),
      inLanguage: ['en', 'tr'],
      publisher: { '@id': ORG_ID },
    },
  ];
}

/** Görünür kırıntı yolu (Breadcrumb.astro) ile BreadcrumbList aynı listeden üretilir. Son öğe sayfanın kendisidir. */
export interface Crumb {
  name: string;
  path: string;
}

function crumbs(items: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

const homeCrumb = (lang: Locale): Crumb => ({ name: SITE.displayName, path: `/${lang}/` });

export function articleCrumbs(post: NewsEntry, lang: Locale): Crumb[] {
  const cat = getCategory(post.data.category, lang);
  return [
    homeCrumb(lang),
    { name: cat.title, path: getCategoryUrl(lang, cat.slug) },
    { name: post.data.title, path: getPostUrl(lang, post.id) },
  ];
}

/** Bölüm sayfası; 2. ve sonraki sayfalarda "Sayfa n" öğesi eklenir. */
export function categoryCrumbs(lang: Locale, slug: string, page = 1, pagePath?: string): Crumb[] {
  const cat = getCategory(slug, lang);
  const items = [homeCrumb(lang), { name: cat.title, path: getCategoryUrl(lang, cat.slug) }];
  if (page > 1 && pagePath) items.push({ name: `${SITE.ui[lang].page} ${page}`, path: pagePath });
  return items;
}

export function articleGraph(post: NewsEntry, lang: Locale, image: string) {
  const url = abs(getPostUrl(lang, post.id));
  const cat = getCategory(post.data.category, lang);
  const headline =
    post.data.title.length > 110 ? `${post.data.title.slice(0, 109).trimEnd()}…` : post.data.title;
  const imageUrl = abs(image);
  const matched = matchEntities(`${post.data.title} ${post.data.description}`, lang);

  const articleNode: Record<string, unknown> = {
    '@type': 'NewsArticle',
    '@id': `${url}#article`,
    headline,
    description: post.data.description,
    image: [{ '@type': 'ImageObject', url: imageUrl, width: KAPAK_G, height: KAPAK_Y }],
    datePublished: post.data.date.toISOString(),
    dateModified: (post.data.updated ?? post.data.date).toISOString(),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: cat.title,
    inLanguage: SITE.localeTag[lang],
    isAccessibleForFree: true,
    isPartOf: { '@id': WEBSITE_ID },
  };

  if (matched.length > 0) {
    articleNode.about = matched;
  }

  return [articleNode, crumbs(articleCrumbs(post, lang))];
}

export function collectionGraph(
  lang: Locale,
  name: string,
  description: string,
  path: string,
  posts: NewsEntry[],
  breadcrumb: Crumb[] = [homeCrumb(lang), { name, path }],
) {
  return [
    {
      '@type': 'CollectionPage',
      '@id': `${abs(path)}#webpage`,
      url: abs(path),
      name,
      description,
      inLanguage: SITE.localeTag[lang],
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORG_ID },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.slice(0, 50).map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(getPostUrl(lang, p.id)),
        })),
      },
    },
    crumbs(breadcrumb),
  ];
}
