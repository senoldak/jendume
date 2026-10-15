// Bölümlerin ortak kapağı (1200×675 PNG): kendi kapağı bütçe dışında kalan eski haberlerin paylaşım görseli
// (bkz. src/lib/kapak.mjs). Dil başına bölüm sayısı kadar dosya; bütçeye etkisi yok denecek kadar az.
import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { ALL_CATEGORIES, LOCALES, type Locale } from '../../../../lib/site';
import { bolumKapakSvg } from '../../../../kapak/ciz';

export const getStaticPaths = (() =>
  LOCALES.flatMap((lang) => ALL_CATEGORIES.map((cat) => ({ params: { lang, slug: cat.slug } })))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const png = await sharp(Buffer.from(bolumKapakSvg(params.slug as string, params.lang as Locale)))
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
