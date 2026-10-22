// Yapılandırılmış veri (JSON-LD) yardımcıları. Kurum ve site düğümleri her sayfada; sayfalar kendi düğümlerini ekler.
import { SITE, getCategory, type Locale } from './site';
import { getCategoryUrl, getPostUrl, type NewsEntry } from './news';
import { matchEntities } from './entities';
import { KAPAK_G, KAPAK_Y, LOGO_G, LOGO_Y } from '../kapak/ciz';
import { konuDiziniYolu, konuYolu, sozlukYolu, terimYolu, yazarYolu } from './yollar.mjs';
import type { Terim } from '../data/sozluk/tip';
import type { Konu } from './konular';

export const abs = (path: string) => new URL(path, SITE.url).href;

export const ORG_ID = abs('/#organization');
export const WEBSITE_ID = abs('/#website');

/** Yazar sayfasındaki Person düğümünün kimliği (dil başına). */
export const authorId = (lang: Locale) => `${abs(yazarYolu(lang))}#person`;

/** Haber ve yazar sayfalarındaki yazar: içerikteki `author` alanından bağımsız, sitenin tek yazarı. */
export function authorNode(lang: Locale) {
  return {
    '@type': 'Person',
    '@id': authorId(lang),
    name: SITE.author.name,
    jobTitle: SITE.author.title[lang],
    url: abs(yazarYolu(lang)),
    worksFor: { '@id': ORG_ID },
  };
}

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
      correctionsPolicy: abs('/en/corrections-policy/'),
      masthead: abs('/en/legal/'),
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
    author: authorNode(lang),
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
  extra: Record<string, unknown> = {},
) {
  return [
    {
      ...extra,
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

// --- Konu sayfaları (src/lib/konular.ts) ---

export function topicsIndexCrumbs(lang: Locale): Crumb[] {
  return [homeCrumb(lang), { name: SITE.ui[lang].topics, path: konuDiziniYolu(lang) }];
}

export function topicCrumbs(lang: Locale, konu: Konu, page = 1, pagePath?: string): Crumb[] {
  const items = [...topicsIndexCrumbs(lang), { name: konu.ad, path: konuYolu(lang, konu.slug) }];
  if (page > 1 && pagePath) items.push({ name: `${SITE.ui[lang].page} ${page}`, path: pagePath });
  return items;
}

/** Konu sayfasının "about" düğümü: şirket → Organization, model/asistan → Thing (sameAs verilmez; doğrulanmamış kimlik yazılmaz). */
export function topicAbout(konu: Konu) {
  return { about: { '@type': konu.tur === 'sirket' ? 'Organization' : 'Thing', name: konu.ad } };
}

// --- Sözlük (src/data/sozluk) ---

const termSetId = (lang: Locale) => `${abs(sozlukYolu(lang))}#set`;

export function glossaryCrumbs(lang: Locale, terim?: Terim): Crumb[] {
  const items = [homeCrumb(lang), { name: SITE.ui[lang].glossary, path: sozlukYolu(lang) }];
  if (terim) items.push({ name: terim[lang].ad, path: terimYolu(lang, terim.id) });
  return items;
}

export function definedTermSetGraph(lang: Locale, terimler: Terim[]) {
  const ui = SITE.ui[lang];
  return [
    {
      '@type': 'DefinedTermSet',
      '@id': termSetId(lang),
      url: abs(sozlukYolu(lang)),
      name: `${ui.glossary} — ${SITE.displayName}`,
      description: ui.glossaryDesc,
      inLanguage: SITE.localeTag[lang],
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORG_ID },
      hasDefinedTerm: terimler.map((t) => ({
        '@type': 'DefinedTerm',
        '@id': `${abs(terimYolu(lang, t.id))}#term`,
        name: t[lang].ad,
        url: abs(terimYolu(lang, t.id)),
      })),
    },
    crumbs(glossaryCrumbs(lang)),
  ];
}

export function definedTermGraph(lang: Locale, terim: Terim) {
  const b = terim[lang];
  const url = abs(terimYolu(lang, terim.id));
  const node: Record<string, unknown> = {
    '@type': 'DefinedTerm',
    '@id': `${url}#term`,
    name: b.ad,
    description: b.ozet,
    url,
    inLanguage: SITE.localeTag[lang],
    inDefinedTermSet: { '@type': 'DefinedTermSet', '@id': termSetId(lang), url: abs(sozlukYolu(lang)) },
  };
  if (b.kisaltma) node.alternateName = b.kisaltma;
  return [
    node,
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: b.ad,
      description: b.ozet,
      inLanguage: SITE.localeTag[lang],
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORG_ID },
      mainEntity: { '@id': `${url}#term` },
    },
    crumbs(glossaryCrumbs(lang, terim)),
  ];
}
