// jendume bülten Worker'ı: /api/* uç noktaları ve haftalık cron. Diğer istekler statik dosyalara gider.
// Saf fonksiyonlar worker/saf.ts, haftalık gönderim worker/gonder.ts içindedir.
import {
  GONDEREN_VARSAYILAN,
  ONAY_ARA_MS,
  ONAY_SURESI_MS,
  SITE,
  ayrilmaSayfasi,
  belirtecGecerli,
  dilSecimi,
  durumYolu,
  epostaNormalize,
  onayEpostasi,
  onayUrl,
  type Dil,
} from './saf.ts';
import { haftalikGonder } from './gonder.ts';
import type { Bagimlilik, Env } from './tipler.ts';

const NO_STORE = 'no-store';

function yonlendir(yol: string): Response {
  return new Response(null, { status: 303, headers: { Location: yol, 'Cache-Control': NO_STORE } });
}

function metin(durum: number, govde: string): Response {
  return new Response(govde, {
    status: durum,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': NO_STORE },
  });
}

async function epostaGonder(
  env: Env,
  bag: Bagimlilik,
  mesaj: { to: string; subject: string; html: string; text: string },
): Promise<void> {
  const yanit = await (bag.fetch ?? fetch)('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.BULTEN_GONDEREN ?? GONDEREN_VARSAYILAN,
      to: [mesaj.to],
      subject: mesaj.subject,
      html: mesaj.html,
      text: mesaj.text,
    }),
  });
  if (!yanit.ok) throw new Error(`Resend yanıtı ${yanit.status}`);
}

/** POST /api/bulten/abone. Her durumda aynı yanıt; adresin kayıtlı olup olmadığı sızdırılmaz. */
async function abone(request: Request, env: Env, bag: Bagimlilik): Promise<Response> {
  const form = await request.formData().catch(() => null);
  const dil = dilSecimi(form?.get('dil'));
  const kontrol = yonlendir(durumYolu(dil, 'kontrol'));
  // Tuzak alanı doluysa bot sayılır: sessizce aynı yanıt.
  if (!form || String(form.get('web') ?? '') !== '') return kontrol;
  if (!env.RESEND_API_KEY) return yonlendir(durumYolu(dil, 'kapali'));
  const eposta = epostaNormalize(form.get('eposta'));
  if (!eposta) return kontrol;

  const simdi = bag.simdi?.() ?? new Date();
  const mevcut = await env.DB.prepare('SELECT id, durum, son_mail FROM abone WHERE eposta = ?')
    .bind(eposta)
    .first<{ id: number; durum: string; son_mail: string | null }>();
  if (mevcut?.durum === 'onayli') return kontrol;
  if (mevcut?.son_mail && simdi.valueOf() - Date.parse(mevcut.son_mail) < ONAY_ARA_MS) return kontrol;

  const belirtec = crypto.randomUUID();
  const su = simdi.toISOString();
  try {
    if (mevcut) {
      await env.DB.prepare('UPDATE abone SET belirtec = ?, dil = ?, son_mail = ? WHERE id = ?')
        .bind(belirtec, dil, su, mevcut.id).run();
    } else {
      await env.DB.prepare(
        "INSERT INTO abone (eposta, dil, durum, belirtec, olusturma, son_mail) VALUES (?, ?, 'bekliyor', ?, ?, ?)",
      ).bind(eposta, dil, belirtec, su, su).run();
    }
  } catch {
    // Eşzamanlı istekte UNIQUE çakışması: kayıt zaten var; yanıt aynı kalır.
    return kontrol;
  }
  try {
    const e = onayEpostasi(dil, onayUrl(SITE, belirtec));
    await epostaGonder(env, bag, { to: eposta, ...e });
  } catch {
    console.error('bülten: onay e-postası gönderilemedi');
  }
  return kontrol;
}

/** GET /api/bulten/onay?t=… */
async function onay(url: URL, env: Env, bag: Bagimlilik): Promise<Response> {
  const t = url.searchParams.get('t');
  if (!belirtecGecerli(t)) return yonlendir(durumYolu('tr', 'gecersiz'));
  const kayit = await env.DB.prepare('SELECT id, durum, olusturma, dil FROM abone WHERE belirtec = ?')
    .bind(t)
    .first<{ id: number; durum: string; olusturma: string; dil: string }>();
  if (!kayit) return yonlendir(durumYolu('tr', 'gecersiz'));
  const dil: Dil = dilSecimi(kayit.dil);
  if (kayit.durum === 'onayli') return yonlendir(durumYolu(dil, 'onaylandi'));
  if (kayit.durum !== 'bekliyor') return yonlendir(durumYolu(dil, 'gecersiz'));
  const simdi = bag.simdi?.() ?? new Date();
  if (simdi.valueOf() - Date.parse(kayit.olusturma) > ONAY_SURESI_MS) {
    await env.DB.prepare('DELETE FROM abone WHERE id = ?').bind(kayit.id).run();
    return yonlendir(durumYolu(dil, 'gecersiz'));
  }
  await env.DB.prepare("UPDATE abone SET durum = 'onayli', onay = ? WHERE id = ?")
    .bind(simdi.toISOString(), kayit.id)
    .run();
  return yonlendir(durumYolu(dil, 'onaylandi'));
}

/** GET /api/bulten/ayril?t=… : onay sayfası; abonelik yalnız POST ile silinir. */
async function ayrilSayfa(url: URL, env: Env): Promise<Response> {
  const t = url.searchParams.get('t');
  let dil: Dil = 'tr';
  if (belirtecGecerli(t)) {
    const kayit = await env.DB.prepare('SELECT dil FROM abone WHERE belirtec = ?')
      .bind(t)
      .first<{ dil: string }>();
    if (kayit) dil = dilSecimi(kayit.dil);
  }
  return new Response(ayrilmaSayfasi(dil, belirtecGecerli(t) ? t : ''), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': NO_STORE,
      'X-Robots-Tag': 'noindex',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    },
  });
}

/** POST /api/bulten/ayril?t=… : hem form hem RFC 8058 tek tıkla (List-Unsubscribe=One-Click) için. */
async function ayril(request: Request, url: URL, env: Env): Promise<Response> {
  const govde = await request.text().catch(() => '');
  const tekTik = govde.includes('List-Unsubscribe=One-Click');
  const t = url.searchParams.get('t');
  let dil: Dil = 'tr';
  if (belirtecGecerli(t)) {
    const kayit = await env.DB.prepare('SELECT dil FROM abone WHERE belirtec = ?')
      .bind(t)
      .first<{ dil: string }>();
    if (kayit) dil = dilSecimi(kayit.dil);
    await env.DB.prepare('DELETE FROM abone WHERE belirtec = ?').bind(t).run();
  }
  if (tekTik) return metin(200, 'Abonelik bitirildi.');
  return yonlendir(durumYolu(dil, 'ayrildi'));
}

/** Test edilebilir istek işleyicisi. */
export async function istekIsle(request: Request, env: Env, bag: Bagimlilik = {}): Promise<Response> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
  try {
    if (url.pathname === '/api/bulten/abone' && request.method === 'POST') return await abone(request, env, bag);
    if (url.pathname === '/api/bulten/onay' && request.method === 'GET') return await onay(url, env, bag);
    if (url.pathname === '/api/bulten/ayril' && request.method === 'GET') return await ayrilSayfa(url, env);
    if (url.pathname === '/api/bulten/ayril' && request.method === 'POST') return await ayril(request, url, env);
    return metin(404, 'Bulunamadı');
  } catch (e) {
    // Yalnız hata türü kaydedilir: istek içeriği (e-posta, belirteç) günlüğe yazılmaz.
    console.error('bülten API hatası', e instanceof Error ? e.name : 'bilinmeyen');
    return metin(500, 'Sunucu hatası');
  }
}

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    return istekIsle(request, env);
  },
  scheduled(_olay: unknown, env: Env, ctx: { waitUntil(p: Promise<unknown>): void }): void {
    ctx.waitUntil(
      haftalikGonder(env).catch(() => {
        console.error('bülten: haftalık gönderim hatası');
      }),
    );
  },
};
