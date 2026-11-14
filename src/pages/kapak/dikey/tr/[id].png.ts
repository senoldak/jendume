// Türkçe bültenin dikey kartı (1080×1350 PNG): LinkedIn gönderisinin görseli (linkedin-gorsel). Başlık "Sabah Bülteni"
// gibi dönem adı, maddeler bültenin haber başlıkları, sağ altta tarih. Sitede ve Telegram'da yatay kapak kalır.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getPublishedPosts, type NewsEntry } from '../../../../lib/news';
import { ozetKapakSvg } from '../../../../kapak/ozet';
import { onbellekliPng } from '../../../../lib/kapak-onbellek.mjs';

export const getStaticPaths = (async () =>
  (await getPublishedPosts('tr'))
    .filter((p) => p.data.category === 'gunluk-bulten')
    .map((post) => ({ params: { id: post.id }, props: { post } }))) satisfies GetStaticPaths;

/** "Yapay Zekâ Sabah Bülteni — 9 Kasım 2026" → { ad: "Sabah Bülteni", tarih: "9 Kasım 2026" }; gövdeden madde başlıkları. */
function bultenKarti(post: NewsEntry) {
  const [sol, tarih = ''] = post.data.title.split(' — ');
  const ad = sol.match(/(Sabah|Öğle|Akşam) Bülteni/)?.[0] ?? sol;
  const basliklar = [...(post.body ?? '').matchAll(/^- \[(.+?)\]\(/gm)].map((m) => m[1].replace(/\\([[\]])/g, '$1'));
  return { ad, tarih, basliklar };
}

export const GET: APIRoute = async ({ props }) => {
  const { ad, tarih, basliklar } = bultenKarti((props as { post: NewsEntry }).post);
  const png = await onbellekliPng(ozetKapakSvg({ baslik: ad, tarih, basliklar, toplam: basliklar.length, bicim: 'dikey' }));
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
