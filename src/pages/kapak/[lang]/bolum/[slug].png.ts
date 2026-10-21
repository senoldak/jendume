// Bölümlerin ortak kapağı (1200×675 PNG): kendi kapağı bütçe dışında kalan eski haberlerin paylaşım görseli
// (bkz. src/lib/kapak.mjs). Dil başına bölüm sayısı kadar dosya; bütçeye etkisi yok denecek kadar az.
import type { APIRoute, GetStaticPaths } from 'astro';
import { ALL_CATEGORIES, LOCALES, type Locale } from '../../../../lib/site';
import { bolumKapakSvg } from '../../../../kapak/ciz';
import { onbellekliPng } from '../../../../lib/kapak-onbellek.mjs';

export const getStaticPaths = (() =>
  LOCALES.flatMap((lang) => ALL_CATEGORIES.map((cat) => ({ params: { lang, slug: cat.slug } })))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const png = await onbellekliPng(bolumKapakSvg(params.slug as string, params.lang as Locale));
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
