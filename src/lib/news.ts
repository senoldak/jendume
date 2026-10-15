import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategorySlug, Locale } from './site';
import { bolumKapakYolu, haberKapakYolu, kapakliKimlikler } from './kapak.mjs';
import { haberYolu, kategoriYolu } from './yollar.mjs';

export type NewsEntry =
  | CollectionEntry<'haberler_tr'>
  | CollectionEntry<'haberler_en'>;

const COLLECTION_MAP = {
  tr: 'haberler_tr',
  en: 'haberler_en',
} as const;

export async function getPublishedPosts(lang: Locale): Promise<NewsEntry[]> {
  const collectionName = COLLECTION_MAP[lang];
  const entries = (await getCollection(collectionName)) as NewsEntry[];
  return entries
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPostsByCategory(
  lang: Locale,
  category: CategorySlug
): Promise<NewsEntry[]> {
  const all = await getPublishedPosts(lang);
  return all.filter((entry) => entry.data.category === category);
}

export async function getAvailableTranslations(
  slug: string
): Promise<Record<Locale, boolean>> {
  const [trList, enList] = await Promise.all([
    getPublishedPosts('tr'),
    getPublishedPosts('en'),
  ]);
  return {
    tr: trList.some((e) => e.id === slug),
    en: enList.some((e) => e.id === slug),
  };
}

/** TR /tr/haber/<id>/, EN /en/news/<id>/ (src/lib/yollar.mjs). */
export function getPostUrl(lang: Locale, id: string): string {
  return haberYolu(lang, id);
}

/** TR /tr/kategori/<kimlik>/, EN /en/category/<section>/ (src/lib/yollar.mjs). */
export function getCategoryUrl(lang: Locale, slug: CategorySlug): string {
  return kategoriYolu(lang, slug);
}

// Kapak görseli: her haberin paylaşım görseli (og:image, JSON-LD, RSS) en az 1200 px'tir. Dil başına en yeni
// KAPAK_BUTCE haber kendi çizilmiş kapağını, daha eskiler bölümün ortak kapağını alır (bütçe: src/lib/kapak.mjs).
export interface KapakBilgisi {
  url: string;
  /** Haberin kendi kapağı mı (true) yoksa bölümün ortak kapağı mı (false)? */
  ozel: boolean;
}

const kapakliCache = new Map<Locale, Promise<Set<string>>>();
export function kapakliHaberler(lang: Locale): Promise<Set<string>> {
  let set = kapakliCache.get(lang);
  if (!set) {
    set = getPublishedPosts(lang).then((posts) => kapakliKimlikler(posts.map((p) => ({ id: p.id, date: p.data.date }))));
    kapakliCache.set(lang, set);
  }
  return set;
}

export async function kapakBilgisi(post: NewsEntry, lang: Locale): Promise<KapakBilgisi> {
  const ozel = (await kapakliHaberler(lang)).has(post.id);
  return { url: ozel ? haberKapakYolu(lang, post.id) : bolumKapakYolu(lang, post.data.category), ozel };
}

/** Bölüm arşivinde sayfa başına haber (src/components/sayfalar/KategoriSayfasi.astro). */
export const CATEGORY_PAGE_SIZE = 24;
