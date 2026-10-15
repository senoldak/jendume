// Yapılandırılmış veri (JSON-LD) yardımcıları. Kurum ve site düğümleri her sayfada; sayfalar kendi düğümlerini ekler.
import { SITE, getCategory, type Locale } from './site';
import { getCategoryUrl, getPostUrl, type NewsEntry } from './news';
import { matchEntities } from './entities';

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
      logo: {
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

function crumbs(items: { name: string; path: string }[]) {
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

const homeCrumb = (lang: Locale) => ({ name: SITE.displayName, path: `/${lang}/` });

export function articleGraph(post: NewsEntry, lang: Locale, image?: string) {
  const url = abs(getPostUrl(lang, post.id));
  const cat = getCategory(post.data.category, lang);
  const headline =
    post.data.title.length > 110 ? `${post.data.title.slice(0, 109).trimEnd()}…` : post.data.title;
  const imageUrl = image ? abs(image) : abs('/og-default.png');
  const matched = matchEntities(`${post.data.title} ${post.data.description}`, lang);

  const articleNode: Record<string, unknown> = {
    '@type': 'NewsArticle',
    '@id': `${url}#article`,
    headline,
    description: post.data.description,
    image: [imageUrl],
    datePublished: post.data.date.toISOString(),
    dateModified: (post.data.updated ?? post.data.date).toISOString(),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: cat.title,
    inLanguage: lang,
    isAccessibleForFree: true,
    isPartOf: { '@id': WEBSITE_ID },
  };

  if (matched.length > 0) {
    articleNode.about = matched;
  }

  return [
    articleNode,
    crumbs([
      homeCrumb(lang),
      { name: cat.title, path: getCategoryUrl(lang, cat.slug) },
      { name: post.data.title, path: getPostUrl(lang, post.id) },
    ]),
  ];
}

export function collectionGraph(
  lang: Locale,
  name: string,
  description: string,
  path: string,
  posts: NewsEntry[]
) {
  return [
    {
      '@type': 'CollectionPage',
      '@id': `${abs(path)}#webpage`,
      url: abs(path),
      name,
      description,
      inLanguage: lang,
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORG_ID },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.slice(0, 20).map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(getPostUrl(lang, p.id)),
        })),
      },
    },
    crumbs([homeCrumb(lang), { name, path }]),
  ];
}
