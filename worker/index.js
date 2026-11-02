// Worker: yalnız POST /api/yarar ("Bu haber işine yaradı mı?") burada karşılanır; geri kalan her şey statik dosyalardır.
// Yalnız gün + haber + cevap başına anonim sayı tutulur. IP, başlık, çerez ya da okur bilgisi saklanmaz.
import { cevapDogrula, istanbulGunu } from './dogrula.mjs';

export default {
  async fetch(istek, env) {
    const url = new URL(istek.url);
    if (url.pathname !== '/api/yarar') return env.ASSETS.fetch(istek);
    if (istek.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
    if (Number(istek.headers.get('content-length') || 0) > 1024) return new Response(null, { status: 400 });
    const c = cevapDogrula(await istek.text(), istek.headers.get('content-type'));
    if (!c.ok) return new Response(null, { status: 400 });
    await env.DB.prepare(
      'INSERT INTO cevap (gun, kimlik, cevap, sayi) VALUES (?1, ?2, ?3, 1) ON CONFLICT(gun, kimlik, cevap) DO UPDATE SET sayi = sayi + 1',
    )
      .bind(istanbulGunu(), c.kimlik, c.cevap)
      .run();
    return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  },
};
