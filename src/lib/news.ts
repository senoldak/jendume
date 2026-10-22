import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { otherLocale, type CategorySlug, type Locale } from './site';
import { karsiKimlik } from './es-kimlik.mjs';
import { bolumKapakYolu, haberKapakYolu, kapakliKimlikler } from './kapak.mjs';
import { haberYolu, kategoriYolu } from './yollar.mjs';
import { yayinda, yayindakiDiller } from './yayinda.mjs';

export type NewsEntry =
  | CollectionEntry<'haberler_tr'>
  | CollectionEntry<'haberler_en'>;

const COLLECTION_MAP = {
  tr: 'haberler_tr',
  en: 'haberler_en',
} as const;

// Taslaklar ve tarihi gelmemiş (planlanmış) yazılar canlı sitede görünmez, yerel geliştirmede görünür
// (src/lib/yayinda.mjs). Her dil kendi dosyasının tarihiyle süzülür.
export async function getPublishedPosts(lang: Locale): Promise<NewsEntry[]> {
  const collectionName = COLLECTION_MAP[lang];
  const entries = (await getCollection(collectionName)) as NewsEntry[];
  return entries
    .filter((entry) => import.meta.env.DEV || yayinda(entry.data))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPostsByCategory(
  lang: Locale,
  category: CategorySlug
): Promise<NewsEntry[]> {
  const all = await getPublishedPosts(lang);
  return all.filter((entry) => entry.data.category === category);
}

// Dil köprüsü ve hreflang yalnız yayındaki dile bağlanır: TR yayında, EN ileri tarihliyse EN'e bağlantı yok
// (getPublishedPosts ile aynı kural; yerel geliştirmede var olan her dil görünür).
// Karşılık, kendi dosyasındaki `esId` ile bulunur (yoksa aynı kimlik; src/lib/es-kimlik.mjs).
export async function getAvailableTranslations(
  lang: Locale,
  id: string
): Promise<{ available: Record<Locale, boolean>; ids: Record<Locale, string> }> {
  const kendi = await getEntry(COLLECTION_MAP[lang], id);
  const digerDil = otherLocale(lang);
  const digerId = karsiKimlik(id, kendi?.data.esId);
  const diger = await getEntry(COLLECTION_MAP[digerDil], digerId);
  const ids = { [lang]: id, [digerDil]: digerId } as Record<Locale, string>;
  const veri = { [lang]: kendi?.data, [digerDil]: diger?.data } as Record<Locale, NewsEntry['data'] | undefined>;
  if (import.meta.env.DEV) return { available: { tr: Boolean(veri.tr), en: Boolean(veri.en) }, ids };
  const diller = yayindakiDiller({ tr: veri.tr, en: veri.en });
  return { available: { tr: diller.includes('tr'), en: diller.includes('en') }, ids };
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
