// Telegram Günün Özeti kapağı (1200×675 PNG), /tr/gunun-ozeti/<gün>/ sayfasının paylaşım görseli. Önbellekli.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getPublishedPosts } from '../../../../lib/news';
import { ozetGunu, ozetKayitlari, type OzetKaydi } from '../../../../lib/gunun-ozeti';
import { ozetKapakSvg } from '../../../../kapak/ozet';
import { onbellekliPng } from '../../../../lib/kapak-onbellek.mjs';

export const getStaticPaths = (async () => {
  const kayitlar = ozetKayitlari(import.meta.glob('/src/data/gunun-ozeti/*.json', { eager: true, import: 'default' }));
  const posts = await getPublishedPosts('tr');
  return kayitlar.map((kayit) => ({ params: { gun: kayit.tarih }, props: { kayit, posts } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { kayit, posts } = props as { kayit: OzetKaydi; posts: Awaited<ReturnType<typeof getPublishedPosts>> };
  const g = ozetGunu(posts, kayit);
  const png = await onbellekliPng(ozetKapakSvg({ tarih: g.tarihAd, basliklar: g.kapakBasliklari, toplam: g.toplam }));
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
