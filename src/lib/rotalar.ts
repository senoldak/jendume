// Dile özgü yol dosyalarının (src/pages/tr/…, src/pages/en/…) ortak getStaticPaths yardımcıları.
// Sayfa gövdeleri src/components/sayfalar/ içindedir; yol parçaları src/lib/yollar.mjs'te.
import type { PaginateFunction } from 'astro';
import { ALL_CATEGORIES, otherLocale, type Locale } from './site';
import { CATEGORY_PAGE_SIZE, getPostsByCategory, getPublishedPosts } from './news';
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
