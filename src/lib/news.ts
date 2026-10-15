import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategorySlug, Locale } from './site';

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

export function getPostUrl(lang: Locale, id: string): string {
  return `/${lang}/haber/${id}/`;
}

export function getCategoryUrl(lang: Locale, slug: CategorySlug): string {
  return `/${lang}/kategori/${slug}/`;
}

// Kapak görseli yalnızca yeni haberlerde üretilir: anasayfa ve Telegram için yeterli.
// Eski haberler görselsiz yayımlanır; Cloudflare'in 20.000 dosya sınırına yaklaşmayı geciktirir.
export const GORSEL_GUN = 14;
export const gorselVar = (tarih: Date | string | number, simdi = new Date()) =>
  simdi.valueOf() - new Date(tarih).valueOf() <= GORSEL_GUN * 86_400_000;
