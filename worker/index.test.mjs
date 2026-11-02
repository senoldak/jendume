import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.js';

const sahte = () => {
  const kayit = [];
  return {
    kayit,
    env: {
      ASSETS: { fetch: async () => new Response('sayfa', { status: 200 }) },
      DB: { prepare: (sql) => ({ bind: (...a) => ({ run: async () => kayit.push({ sql, a }) }) }) },
    },
  };
};
const istek = (yol, init) => new Request(`https://jendume.com${yol}`, init);

test('Worker: /api/yarar dışı statik dosyaya gider', async () => {
  const { env, kayit } = sahte();
  assert.equal(await (await worker.fetch(istek('/tr/'), env)).text(), 'sayfa');
  assert.equal(kayit.length, 0);
});

test('Worker: geçerli oy sayılır (gün, kimlik, cevap), geçersiz ve GET reddedilir', async () => {
  const { env, kayit } = sahte();
  const post = (govde) => istek('/api/yarar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: govde });
  assert.equal((await worker.fetch(post('{"kimlik":"tr/bir-haber","cevap":"evet"}'), env)).status, 204);
  assert.deepEqual(kayit[0].a.slice(1), ['tr/bir-haber', 'evet']);
  assert.match(kayit[0].a[0], /^\d{4}-\d{2}-\d{2}$/);
  assert.equal((await worker.fetch(post('{"kimlik":"tr/x","cevap":"belki"}'), env)).status, 400);
  assert.equal((await worker.fetch(istek('/api/yarar'), env)).status, 405);
  assert.equal(kayit.length, 1);
});

test('Worker: yayımlanmış sayfası olmayan kimlik sayılmaz (404), doğru sayfa adresi sorulur', async () => {
  const kayit = [];
  const sorulan = [];
  const env = {
    ASSETS: { fetch: async (r) => (sorulan.push(new URL(r.url).pathname), new Response('', { status: new URL(r.url).pathname === '/en/news/var/' ? 200 : 404 })) },
    DB: { prepare: (sql) => ({ bind: (...a) => ({ run: async () => kayit.push({ sql, a }) }) }) },
  };
  const post = (govde) => istek('/api/yarar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: govde });
  assert.equal((await worker.fetch(post('{"kimlik":"tr/uydurma","cevap":"evet"}'), env)).status, 404);
  assert.equal((await worker.fetch(post('{"kimlik":"en/var","cevap":"hayir"}'), env)).status, 204);
  assert.deepEqual(sorulan, ['/tr/haber/uydurma/', '/en/news/var/']);
  assert.equal(kayit.length, 1);
});
