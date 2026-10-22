// Her haber için derleme anında çizilen kapak (1200×675 PNG). Paylaşım görseli (og:image, Telegram) olarak da kullanılır.
// Dil başına en yeni KAPAK_BUTCE haber kendi kapağını alır; daha eskiler bölüm kapağını kullanır (bkz. src/lib/kapak.mjs).
// Çizim önbelleklidir (src/lib/kapak-onbellek.mjs): aynı SVG bir kez çizilir, sonraki derlemeler hazır PNG'yi kullanır.
import type { APIRoute, GetStaticPaths } from 'astro';
import { LOCALES, type Locale } from '../../../lib/site';
import { getPublishedPosts, kapakliHaberler, type NewsEntry } from '../../../lib/news';
import { kapakSvg } from '../../../kapak/ciz';
import { onbellekliPng } from '../../../lib/kapak-onbellek.mjs';

export const getStaticPaths = (async () => {
  const paths = [];
  for (const lang of LOCALES) {
    const kapakli = await kapakliHaberler(lang);
    for (const post of (await getPublishedPosts(lang)).filter((p) => kapakli.has(p.id))) paths.push({ params: { lang, id: post.id }, props: { post } });
  }
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params, props }) => {
  const png = await onbellekliPng(kapakSvg((props as { post: NewsEntry }).post, params.lang as Locale));
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
