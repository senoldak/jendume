// Her haber için derleme anında çizilen kapak (1200×675 PNG). Paylaşım görseli (og:image, Telegram) olarak da kullanılır.
// Dil başına en yeni KAPAK_BUTCE haber kendi kapağını alır; daha eskiler bölüm kapağını kullanır (bkz. src/lib/kapak.mjs).
import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { LOCALES, type Locale } from '../../../lib/site';
import { getPublishedPosts, kapakliHaberler, type NewsEntry } from '../../../lib/news';
import { kapakSvg } from '../../../kapak/ciz';

export const getStaticPaths = (async () => {
  const paths = [];
  for (const lang of LOCALES) {
    const kapakli = await kapakliHaberler(lang);
    for (const post of (await getPublishedPosts(lang)).filter((p) => kapakli.has(p.id))) paths.push({ params: { lang, id: post.id }, props: { post } });
  }
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params, props }) => {
  const png = await sharp(Buffer.from(kapakSvg((props as { post: NewsEntry }).post, params.lang as Locale)))
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
