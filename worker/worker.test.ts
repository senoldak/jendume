// Uç nokta işleyicileri ve haftalık gönderim: gerçek SQLite (node:sqlite, D1 şemasıyla aynı migrasyon) ve sahte fetch.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { istekIsle } from './index.ts';
import { batchGovdesi, dilGonder, haberleriSec, haftalikGonder } from './gonder.ts';
import type { D1Like, Env } from './tipler.ts';

interface Veritabani {
  db: DatabaseSync;
  DB: D1Like;
}

function veritabani(): Veritabani {
  const db = new DatabaseSync(':memory:');
  db.exec(readFileSync(new URL('../migrations/0001_bulten.sql', import.meta.url), 'utf8'));
  const DB: D1Like = {
    prepare(sql: string) {
      const st = db.prepare(sql);
      return {
        bind(...args: unknown[]) {
          const a = args as never[];
          return {
            first: async () => (st.get(...a) as never) ?? null,
            all: async () => ({ results: st.all(...a) as never[] }),
            run: async () => {
              st.run(...a);
              return { success: true };
            },
          };
        },
      };
    },
  };
  return { db, DB };
}

function assetler(harita: Record<string, unknown>) {
  return {
    fetch: async (istek: Request) => {
      const yol = new URL(istek.url).pathname;
      if (yol in harita) return Response.json(harita[yol]);
      return new Response('yok', { status: 404 });
    },
  };
}

function ortam(v: Veritabani, anahtar: boolean = true, harita: Record<string, unknown> = {}): Env {
  return {
    DB: v.DB,
    ASSETS: assetler(harita),
    RESEND_API_KEY: anahtar ? 're_test_anahtar' : undefined,
    BULTEN_GONDEREN: 'JEN DUME <bulten@jendume.com>',
  };
}

function kayitEkle(v: Veritabani, satir: { eposta: string; dil: string; durum: string; belirtec: string; olusturma?: string }) {
  v.db
    .prepare('INSERT INTO abone (eposta, dil, durum, belirtec, olusturma, onay) VALUES (?, ?, ?, ?, ?, ?)')
    .run(satir.eposta, satir.dil, satir.durum, satir.belirtec, satir.olusturma ?? '2026-10-10T00:00:00.000Z', null);
}

const satirlar = (v: Veritabani, sql: string, ...args: unknown[]) =>
  v.db.prepare(sql).all(...(args as never[])) as Record<string, unknown>[];

function formIstek(yol: string, alanlar: Record<string, string>): Request {
  return new Request(`https://jendume.com${yol}`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(alanlar),
  });
}

function resendSahte(durum = 200) {
  const cagrilar: { url: string; govde: unknown; headers: Record<string, string> }[] = [];
  const fetchFn = (async (url: string | URL | Request, init?: RequestInit) => {
    cagrilar.push({
      url: String(url),
      govde: JSON.parse(String(init?.body ?? 'null')),
      headers: (init?.headers ?? {}) as Record<string, string>,
    });
    return new Response(JSON.stringify({ data: [] }), { status: durum });
  }) as typeof fetch;
  return { cagrilar, fetchFn };
}

const T0 = new Date('2026-10-19T06:00:00.000Z');

test('tuzak doluysa e-posta gitmez, aynı kontrol yanıtı verilir', async () => {
  const v = veritabani();
  const r = resendSahte();
  const yanit = await istekIsle(
    formIstek('/api/bulten/abone', { eposta: 'bot@example.com', web: 'doldu', dil: 'en' }),
    ortam(v),
    { fetch: r.fetchFn },
  );
  assert.equal(yanit.status, 303);
  assert.equal(yanit.headers.get('location'), '/en/newsletter/?durum=kontrol');
  assert.equal(r.cagrilar.length, 0);
  assert.equal(satirlar(v, 'SELECT * FROM abone').length, 0);
});

test('RESEND_API_KEY yoksa kapali yönlendirmesi', async () => {
  const v = veritabani();
  const yanit = await istekIsle(formIstek('/api/bulten/abone', { eposta: 'a@example.com' }), ortam(v, false));
  assert.equal(yanit.headers.get('location'), '/tr/bulten/?durum=kapali');
});

test('geçersiz adres kayıt oluşturmaz, yine kontrol yanıtı döner', async () => {
  const v = veritabani();
  const r = resendSahte();
  const yanit = await istekIsle(formIstek('/api/bulten/abone', { eposta: 'yanlis-adres', dil: 'tr' }), ortam(v), { fetch: r.fetchFn });
  assert.equal(yanit.headers.get('location'), '/tr/bulten/?durum=kontrol');
  assert.equal(r.cagrilar.length, 0);
  assert.equal(satirlar(v, 'SELECT * FROM abone').length, 0);
});

test('yeni abone: bekliyor kaydı, dil ve onay e-postası; yanıt değişmez', async () => {
  const v = veritabani();
  const r = resendSahte();
  const yanit = await istekIsle(
    formIstek('/api/bulten/abone', { eposta: 'Ali@Example.com', dil: 'en' }),
    ortam(v),
    { fetch: r.fetchFn, simdi: () => T0 },
  );
  assert.equal(yanit.headers.get('location'), '/en/newsletter/?durum=kontrol');
  const [satir] = satirlar(v, 'SELECT * FROM abone');
  assert.equal(satir.eposta, 'ali@example.com');
  assert.equal(satir.durum, 'bekliyor');
  assert.equal(satir.dil, 'en');
  assert.equal(r.cagrilar.length, 1);
  assert.equal(r.cagrilar[0].url, 'https://api.resend.com/emails');
  const govde = r.cagrilar[0].govde as { to: string[]; html: string };
  assert.deepEqual(govde.to, ['ali@example.com']);
  assert.ok(govde.html.includes(`/api/bulten/onay?t=${satir.belirtec as string}`));
  assert.equal(r.cagrilar[0].headers.Authorization, 'Bearer re_test_anahtar');
});

test('10 dakika içinde tekrar istek: e-posta yok, belirteç değişmez; sonra yenilenir', async () => {
  const v = veritabani();
  const r = resendSahte();
  const env = ortam(v);
  await istekIsle(formIstek('/api/bulten/abone', { eposta: 'a@example.com' }), env, { fetch: r.fetchFn, simdi: () => T0 });
  const ilk = satirlar(v, 'SELECT belirtec FROM abone')[0].belirtec;
  const bes = new Date(T0.valueOf() + 5 * 60_000);
  await istekIsle(formIstek('/api/bulten/abone', { eposta: 'a@example.com' }), env, { fetch: r.fetchFn, simdi: () => bes });
  assert.equal(r.cagrilar.length, 1);
  assert.equal(satirlar(v, 'SELECT belirtec FROM abone')[0].belirtec, ilk);
  const onBir = new Date(T0.valueOf() + 11 * 60_000);
  await istekIsle(formIstek('/api/bulten/abone', { eposta: 'a@example.com' }), env, { fetch: r.fetchFn, simdi: () => onBir });
  assert.equal(r.cagrilar.length, 2);
  assert.notEqual(satirlar(v, 'SELECT belirtec FROM abone')[0].belirtec, ilk);
});

test('onaylı adrese e-posta gitmez, kayıt değişmez', async () => {
  const v = veritabani();
  kayitEkle(v, { eposta: 'a@example.com', dil: 'tr', durum: 'onayli', belirtec: 'onayli-belirtec-1' });
  const r = resendSahte();
  const yanit = await istekIsle(formIstek('/api/bulten/abone', { eposta: 'a@example.com' }), ortam(v), { fetch: r.fetchFn });
  assert.equal(yanit.headers.get('location'), '/tr/bulten/?durum=kontrol');
  assert.equal(r.cagrilar.length, 0);
  assert.equal(satirlar(v, 'SELECT belirtec FROM abone')[0].belirtec, 'onayli-belirtec-1');
});

test('onay: geçerli belirteç onaylar; dile göre yönlendirir', async () => {
  const v = veritabani();
  kayitEkle(v, { eposta: 'a@example.com', dil: 'en', durum: 'bekliyor', belirtec: 'onay-belirtec-1', olusturma: T0.toISOString() });
  const yanit = await istekIsle(new Request('https://jendume.com/api/bulten/onay?t=onay-belirtec-1'), ortam(v), { simdi: () => T0 });
  assert.equal(yanit.status, 303);
  assert.equal(yanit.headers.get('location'), '/en/newsletter/?durum=onaylandi');
  assert.equal(yanit.headers.get('cache-control'), 'no-store');
  assert.equal(satirlar(v, 'SELECT durum FROM abone')[0].durum, 'onayli');
});

test('onay: bilinmeyen belirteç gecersiz; 7 günü geçen bekleyen kayıt silinir', async () => {
  const v = veritabani();
  const yok = await istekIsle(new Request('https://jendume.com/api/bulten/onay?t=yok-belirtec-99'), ortam(v));
  assert.equal(yok.headers.get('location'), '/tr/bulten/?durum=gecersiz');
  kayitEkle(v, { eposta: 'eski@example.com', dil: 'tr', durum: 'bekliyor', belirtec: 'eski-belirtec-1', olusturma: '2026-10-01T00:00:00.000Z' });
  const eski = await istekIsle(new Request('https://jendume.com/api/bulten/onay?t=eski-belirtec-1'), ortam(v), { simdi: () => T0 });
  assert.equal(eski.headers.get('location'), '/tr/bulten/?durum=gecersiz');
  assert.equal(satirlar(v, 'SELECT * FROM abone').length, 0);
});

test('ayril GET: onay formu içerir, abonelik silmez, önbelleğe alınmaz', async () => {
  const v = veritabani();
  kayitEkle(v, { eposta: 'a@example.com', dil: 'en', durum: 'onayli', belirtec: 'ayril-belirtec-1' });
  const yanit = await istekIsle(new Request('https://jendume.com/api/bulten/ayril?t=ayril-belirtec-1'), ortam(v));
  assert.equal(yanit.status, 200);
  assert.equal(yanit.headers.get('cache-control'), 'no-store');
  const html = await yanit.text();
  assert.match(html, /<form method="post" action="\/api\/bulten\/ayril\?t=ayril-belirtec-1">/);
  assert.match(html, /lang="en"/);
  assert.equal(satirlar(v, 'SELECT * FROM abone').length, 1);
});

test('ayril POST: satırı siler, dile göre ayrildi yönlendirmesi', async () => {
  const v = veritabani();
  kayitEkle(v, { eposta: 'a@example.com', dil: 'en', durum: 'onayli', belirtec: 'ayril-belirtec-2' });
  const yanit = await istekIsle(
    new Request('https://jendume.com/api/bulten/ayril?t=ayril-belirtec-2', { method: 'POST', body: 'x=1' }),
    ortam(v),
  );
  assert.equal(yanit.headers.get('location'), '/en/newsletter/?durum=ayrildi');
  assert.equal(satirlar(v, 'SELECT * FROM abone').length, 0);
});

test('RFC 8058 tek tıkla ayrılma: List-Unsubscribe=One-Click gövdesiyle 200 ve silme', async () => {
  const v = veritabani();
  kayitEkle(v, { eposta: 'a@example.com', dil: 'tr', durum: 'onayli', belirtec: 'tek-tik-belirtec' });
  const yanit = await istekIsle(
    new Request('https://jendume.com/api/bulten/ayril?t=tek-tik-belirtec', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'List-Unsubscribe=One-Click',
    }),
    ortam(v),
  );
  assert.equal(yanit.status, 200);
  assert.equal(yanit.headers.get('cache-control'), 'no-store');
  assert.equal(satirlar(v, 'SELECT * FROM abone').length, 0);
});

test('tanımsız /api yolu 404 döner; /api dışı istekler statik dosyalara gider', async () => {
  const v = veritabani();
  const bilinmeyen = await istekIsle(new Request('https://jendume.com/api/bulten/abone'), ortam(v));
  assert.equal(bilinmeyen.status, 404);
  assert.equal(bilinmeyen.headers.get('cache-control'), 'no-store');
  let statikCagrildi = false;
  const env = ortam(v);
  env.ASSETS = {
    fetch: async () => {
      statikCagrildi = true;
      return new Response('sayfa', { status: 200 });
    },
  };
  const sayfa = await istekIsle(new Request('https://jendume.com/tr/'), env);
  assert.equal(statikCagrildi, true);
  assert.equal(sayfa.status, 200);
});

// --- Haftalık gönderim ---

const haberOrnegi = (id: string, tarih: string) => ({
  baslik: `Haber ${id}`,
  ozet: `Özet ${id}`,
  url: `https://jendume.com/tr/haber/${id}/`,
  tarih,
});

test('haberleriSec: 7 gün dışındakileri ve geçersiz URL’leri eler, en fazla 10 tane', () => {
  const liste = [
    haberOrnegi('yeni', '2026-10-18T06:00:00.000Z'),
    haberOrnegi('eski', '2026-10-01T06:00:00.000Z'),
    { ...haberOrnegi('kotu', '2026-10-18T06:00:00.000Z'), url: 'http://ornek.example.com/x' },
    ...Array.from({ length: 12 }, (_, i) => haberOrnegi(`s${i}`, `2026-10-17T0${i % 9}:00:00.000Z`)),
  ];
  const secilen = haberleriSec({ haberler: liste }, T0);
  assert.equal(secilen.length, 10);
  assert.equal(secilen[0].baslik, 'Haber yeni');
  assert.ok(!secilen.some((h) => h.baslik === 'Haber eski'));
  assert.ok(!secilen.some((h) => h.url.startsWith('http://')));
});

test('batchGovdesi: her alıcıya ayrı e-posta, kişiye özel ayrılma bağlantısı ve List-Unsubscribe başlıkları', () => {
  const govde = batchGovdesi({
    gonderen: 'JEN DUME <bulten@jendume.com>',
    dil: 'tr',
    hafta: '2026-W43',
    haberler: [haberOrnegi('a', '2026-10-18T06:00:00.000Z')],
    alicilar: [
      { eposta: 'bir@example.com', belirtec: 'belirtec-bir-1' },
      { eposta: 'iki@example.com', belirtec: 'belirtec-iki-2' },
    ],
  });
  assert.equal(govde.length, 2);
  assert.deepEqual(govde[0].to, ['bir@example.com']);
  assert.equal(govde[0].headers['List-Unsubscribe-Post'], 'List-Unsubscribe=One-Click');
  assert.equal(govde[0].headers['List-Unsubscribe'], '<https://jendume.com/api/bulten/ayril?t=belirtec-bir-1>');
  assert.ok(govde[1].html.includes('belirtec-iki-2'));
  assert.ok(!govde[0].html.includes('belirtec-iki-2'));
});

test('haftalık gönderim: dil başına bir kez; ikinci çalışmada yeniden gönderilmez', async () => {
  const v = veritabani();
  kayitEkle(v, { eposta: 'tr1@example.com', dil: 'tr', durum: 'onayli', belirtec: 'tr-belirtec-1' });
  kayitEkle(v, { eposta: 'tr2@example.com', dil: 'tr', durum: 'onayli', belirtec: 'tr-belirtec-2' });
  kayitEkle(v, { eposta: 'en1@example.com', dil: 'en', durum: 'onayli', belirtec: 'en-belirtec-1' });
  kayitEkle(v, { eposta: 'bekleyen@example.com', dil: 'tr', durum: 'bekliyor', belirtec: 'bekleyen-belirtec' });
  const harita = {
    '/bulten/haftalik-tr.json': { dil: 'tr', haberler: [haberOrnegi('t1', '2026-10-18T06:00:00.000Z')] },
    '/bulten/haftalik-en.json': {
      dil: 'en',
      haberler: [{ ...haberOrnegi('e1', '2026-10-18T06:00:00.000Z'), url: 'https://jendume.com/en/news/e1/' }],
    },
  };
  const env = ortam(v, true, harita);
  const r = resendSahte();
  const sonuc = await haftalikGonder(env, T0, r.fetchFn);
  assert.deepEqual(
    sonuc.map((s) => [s.dil, s.durum, s.adet]),
    [['tr', 'gonderildi', 2], ['en', 'gonderildi', 1]],
  );
  assert.equal(r.cagrilar.length, 2);
  const trGovde = r.cagrilar[0].govde as { to: string[] }[];
  assert.deepEqual(trGovde.map((m) => m.to[0]).sort(), ['tr1@example.com', 'tr2@example.com']);
  assert.equal(
    satirlar(v, 'SELECT hafta, dil, adet FROM gonderim ORDER BY dil').map((s) => `${s.hafta}/${s.dil}/${s.adet}`).join(' '),
    '2026-W43/en/1 2026-W43/tr/2',
  );
  const ikinci = await haftalikGonder(env, T0, r.fetchFn);
  assert.deepEqual(ikinci.map((s) => s.durum), ['zaten', 'zaten']);
  assert.equal(r.cagrilar.length, 2);
});

test('haftalık gönderim: 150 alıcı iki Resend çağrısına (100 + 50) bölünür', async () => {
  const v = veritabani();
  for (let i = 0; i < 150; i++) kayitEkle(v, { eposta: `kisi${i}@example.com`, dil: 'tr', durum: 'onayli', belirtec: `parti-belirtec-${i}` });
  const env = ortam(v, true, {
    '/bulten/haftalik-tr.json': { haberler: [haberOrnegi('t1', '2026-10-18T06:00:00.000Z')] },
  });
  const r = resendSahte();
  const sonuc = await dilGonder(env, 'tr', T0, r.fetchFn);
  assert.equal(sonuc.adet, 150);
  assert.deepEqual(r.cagrilar.map((c) => (c.govde as unknown[]).length), [100, 50]);
});

test('haftalık gönderim: haber yoksa ya da alıcı yoksa kayıt yazılmaz', async () => {
  const v = veritabani();
  const env = ortam(v, true, { '/bulten/haftalik-tr.json': { haberler: [] } });
  const r = resendSahte();
  const sonuc = await haftalikGonder(env, T0, r.fetchFn);
  assert.equal(sonuc.find((s) => s.dil === 'tr')?.durum, 'haber-yok');
  assert.equal(sonuc.find((s) => s.dil === 'en')?.durum, 'veri-yok');
  assert.equal(satirlar(v, 'SELECT * FROM gonderim').length, 0);
  assert.equal(r.cagrilar.length, 0);
});

test('haftalık gönderim: RESEND_API_KEY yoksa hiçbir şey yapılmaz', async () => {
  const v = veritabani();
  const r = resendSahte();
  const sonuc = await haftalikGonder(ortam(v, false), T0, r.fetchFn);
  assert.deepEqual(sonuc, []);
  assert.equal(r.cagrilar.length, 0);
});

test('haftalık gönderim: Resend hatasında adet 0 yazılır; hafta yeniden denenip çift gönderilmez', async () => {
  const v = veritabani();
  kayitEkle(v, { eposta: 'tr1@example.com', dil: 'tr', durum: 'onayli', belirtec: 'hata-belirtec-1' });
  const env = ortam(v, true, { '/bulten/haftalik-tr.json': { haberler: [haberOrnegi('t1', '2026-10-18T06:00:00.000Z')] } });
  const r = resendSahte(500);
  const sonuc = await dilGonder(env, 'tr', T0, r.fetchFn);
  assert.equal(sonuc.adet, 0);
  assert.equal(satirlar(v, 'SELECT adet FROM gonderim')[0].adet, 0);
  const tekrar = await dilGonder(env, 'tr', T0, r.fetchFn);
  assert.equal(tekrar.durum, 'zaten');
});

test('haftalık gönderim: 7 günü geçen onaylanmamış kayıtlar temizlenir', async () => {
  const v = veritabani();
  kayitEkle(v, { eposta: 'eski@example.com', dil: 'tr', durum: 'bekliyor', belirtec: 'temizlik-belirtec-1', olusturma: '2026-10-01T00:00:00.000Z' });
  kayitEkle(v, { eposta: 'yeni@example.com', dil: 'tr', durum: 'bekliyor', belirtec: 'temizlik-belirtec-2', olusturma: '2026-10-18T00:00:00.000Z' });
  await haftalikGonder(ortam(v, false), T0, resendSahte().fetchFn);
  const kalan = satirlar(v, 'SELECT eposta FROM abone').map((s) => s.eposta);
  assert.deepEqual(kalan, ['yeni@example.com']);
});
