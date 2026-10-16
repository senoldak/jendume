// Dile özgü yol dosyalarının (src/pages/tr/…, src/pages/en/…) ortak getStaticPaths yardımcıları.
// Sayfa gövdeleri src/components/sayfalar/ içindedir; yol parçaları src/lib/yollar.mjs'te.
import type { PaginateFunction } from 'astro';
import { ALL_CATEGORIES, otherLocale, type Locale } from './site';
import { CATEGORY_PAGE_SIZE, getPostsByCategory, getPublishedPosts, type NewsEntry } from './news';
import { konuHaberleri } from './konular';
import { TERIMLER } from './sozluk.mjs';
import { kategoriParcasi } from './yollar.mjs';

export async function haberYollari(lang: Locale) {
  return (await getPublishedPosts(lang)).map((post) => ({ params: { id: post.id }, props: { post } }));
}

export async function kategoriYollari(lang: Locale, paginate: PaginateFunction) {
  const paths = [];
  for (const cat of ALL_CATEGORIES) {
    const posts = await getPostsByCategory(lang, cat.slug);
    const otherCount = (await getPostsByCategory(otherLocale(lang), cat.slug)).length;
    // Boş bölüm de tek (boş) sayfa olarak üretilir.
    paths.push(
      ...paginate(posts, {
        params: { slug: kategoriParcasi(lang, cat.slug) },
        props: { kimlik: cat.slug, otherCount },
        pageSize: CATEGORY_PAGE_SIZE,
      }),
    );
  }
  return paths;
}

// --- Konu sayfaları (src/lib/konular.ts) ---

const konuCache = new Map<Locale, Promise<Map<string, NewsEntry[]>>>();
/** Dildeki konu → haberler (yalnız en az KONU_EN_AZ haberi olan konular; bültenler hariç). */
export function konuVerisi(lang: Locale): Promise<Map<string, NewsEntry[]>> {
  let v = konuCache.get(lang);
  if (!v) {
    v = getPublishedPosts(lang).then((posts) => konuHaberleri(posts));
    konuCache.set(lang, v);
  }
  return v;
}

export async function konuYollari(lang: Locale, paginate: PaginateFunction) {
  const [bu, oteki] = await Promise.all([konuVerisi(lang), konuVerisi(otherLocale(lang))]);
  const paths = [];
  for (const [slug, posts] of bu) {
    paths.push(
      ...paginate(posts, {
        params: { slug },
        props: { slug, otherCount: oteki.get(slug)?.length ?? 0 },
        pageSize: CATEGORY_PAGE_SIZE,
      }),
    );
  }
  return paths;
}

// --- Sözlük (src/data/sozluk) ---

export function terimYollari(lang: Locale) {
  return TERIMLER.map((t) => ({ params: { terim: t[lang].slug }, props: { id: t.id } }));
}
