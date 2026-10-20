// Standartlar Faz 0: yayın kapısı (iki dilli süzgeç, derleme maddesi atlama, puanlama kapısı, acil durdurma, motor kaydı).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { acilDurdurma, derlemeStandardi, haberStandardi, puanKapisi } from './kapi.mjs';
import { havuzOlayi, havuzuIsle } from './havuz.mjs';
import { kirmiziKayit, motorKaydet, motorKimlik, sariKayit } from './motor.mjs';
import { onEle } from './yazar.mjs';

const BU = path.dirname(fileURLToPath(import.meta.url));
const temiz = (govde = 'The company released a new language model and published its benchmark results.') => ({
  title: 'Model released',
  description: 'A new model was released.',
  body: govde,
});
const trTemiz = { title: 'Yeni model yayımlandı', description: 'Yeni bir model yayımlandı.', body: 'Şirket yeni bir dil modeli yayımladı ve sonuçlarını paylaştı.' };
const paket = (tr = trTemiz, en = temiz()) => ({ category: 'yapay-zeka', tr, en });

test('haberStandardi: iki dil temizse temiz', () => {
  assert.equal(haberStandardi(paket()).karar, 'temiz');
});

test('haberStandardi: yalnız TR kırmızıysa iki dilli yazı kırmızı (en ağır karar)', () => {
  const s = haberStandardi(paket({ ...trTemiz, body: 'Kişi dün gözaltına alındı ve tutuklandı.' }));
  assert.equal(s.karar, 'kirmizi');
  assert.match(s.gerekce, /^standart:kirmizi:/);
});

test('haberStandardi: yalnız EN kırmızıysa kırmızı', () => {
  const s = haberStandardi(paket(trTemiz, temiz('He was arrested and charged with fraud on Monday.')));
  assert.equal(s.karar, 'kirmizi');
});

test('haberStandardi: sarı yayımlanabilir, gerekçe taşır', () => {
  const s = haberStandardi(paket(trTemiz, temiz('The election commission reviewed the new model rules.')));
  assert.equal(s.karar, 'sari');
  assert.match(s.gerekce, /^standart:sari:/);
});

test('haberStandardi: ekler (perspektif, ana maddeler) de denetlenir', () => {
  const s = haberStandardi(paket({ ...trTemiz, key_points: ['Şüpheli tutuklandı'] }));
  assert.equal(s.karar, 'kirmizi');
});

test('haberStandardi: bir dil yoksa hata fırlatır (denetim yapılamadı: yayımlanmaz)', () => {
  assert.throws(() => haberStandardi({ tr: trTemiz }), /iki dilli/);
});

// ── Derleme: kırmızı madde atlanır ────────────────────────────────────────
const olay = (id, kat = 'yapay-zeka') =>
  havuzOlayi({
    id,
    taslak: { category: kat, tr: { title: `Başlık ${id}` } },
    basliklar: [`Source ${id}`],
    kaynaklar: [{ baslik: `Source ${id}`, tarih: '2026-10-16', metin: `Source text ${id} for the item. `.repeat(40) }],
    kullanilan: [],
    iso: '2026-10-16T07:00:00Z',
  });
const derleme = (trP, enP) => ({
  ...paket(
    { title: 'Günün özeti', description: 'Dilimin öne çıkan konuları.', body: `## Yapay Zekâ\n\n${trP.join('\n\n')}` },
    { title: 'Roundup', description: 'Highlights of the period.', body: `## AI\n\n${enP.join('\n\n')}` },
  ),
});

test('derlemeStandardi: temiz derleme olduğu gibi geçer', () => {
  const grup = [olay('a'), olay('b'), olay('c')];
  const r = derlemeStandardi(derleme(['Birinci haber.', 'İkinci haber.', 'Üçüncü haber.'], ['First item.', 'Second item.', 'Third item.']), grup);
  assert.equal(r.yayin, true);
  assert.equal(r.grup.length, 3);
});

test('derlemeStandardi: kırmızı madde iki dilde de atlanır, yazı düşmez', () => {
  const grup = [olay('a'), olay('b'), olay('c')];
  const r = derlemeStandardi(
    derleme(['Birinci haber.', 'Bir kişi tutuklandı.', 'Üçüncü haber.'], ['First item.', 'A man was arrested.', 'Third item.']),
    grup,
  );
  assert.equal(r.yayin, true);
  assert.deepEqual(r.grup.map((o) => o.id), ['a', 'c']);
  assert.deepEqual(r.atlanan.map((a) => a.o.id), ['b']);
  assert.doesNotMatch(r.t.tr.body, /tutuklandı/);
  assert.doesNotMatch(r.t.en.body, /arrested/);
  assert.match(r.t.tr.body, /Birinci haber/);
  assert.match(r.t.en.body, /Third item/);
});

test('derlemeStandardi: yalnız TR paragrafı kırmızıysa o madde iki dilde de düşer', () => {
  const grup = [olay('a'), olay('b'), olay('c')];
  const r = derlemeStandardi(derleme(['Birinci haber.', 'Bir kişi tutuklandı.', 'Üçüncü haber.'], ['First item.', 'Second item.', 'Third item.']), grup);
  assert.equal(r.yayin, true);
  assert.doesNotMatch(r.t.en.body, /Second item/);
});

test('derlemeStandardi: kalan haber DERLEME_EN_AZ altına düşerse yazı yayımlanmaz', () => {
  const grup = [olay('a'), olay('b')];
  const r = derlemeStandardi(derleme(['Birinci haber.', 'Bir kişi tutuklandı.'], ['First item.', 'A man was arrested.']), grup);
  assert.equal(r.yayin, false);
  assert.equal(r.s.karar, 'kirmizi');
});

test('derlemeStandardi: kırmızı ortak alanda (başlık) ise yazı yayımlanmaz', () => {
  const grup = [olay('a'), olay('b'), olay('c')];
  const t = derleme(['Bir.', 'İki.', 'Üç.'], ['One.', 'Two.', 'Three.']);
  t.tr.title = 'Şüpheli tutuklandı';
  const r = derlemeStandardi(t, grup);
  assert.equal(r.yayin, false);
});

test('derlemeStandardi: paragraf sayısı haber sayısını tutmuyorsa kırmızı derleme yayımlanmaz', () => {
  const grup = [olay('a'), olay('b'), olay('c')];
  const r = derlemeStandardi(derleme(['Bir kişi tutuklandı.'], ['One.', 'Two.', 'Three.']), grup);
  assert.equal(r.yayin, false);
});

const havuzBagimlilik = (ek = {}) => {
  const kaydedilen = [];
  const atlanan = [];
  return {
    kaydedilen,
    atlanan,
    simdi: new Date('2026-10-16T16:00:00Z'),
    log: () => {},
    mukerrer: () => null,
    yaz: async () => derleme(['Birinci haber.', 'Bir kişi tutuklandı.', 'Üçüncü haber.'], ['First item.', 'A man was arrested.', 'Third item.']),
    denetle: () => [],
    duzelt: async (t) => t,
    standart: derlemeStandardi,
    atla: async (o, s) => atlanan.push([o.id, s.gerekce]),
    kaydet: async (t, grup) => (kaydedilen.push(grup.map((o) => o.id)), `derleme-${kaydedilen.length}`),
    ...ek,
  };
};
const havuz = () => [olay('a'), olay('b'), olay('c')];

test('havuzuIsle: kırmızı madde atlanır (atla çağrılır), kalanlar yayımlanır', async () => {
  const b = havuzBagimlilik();
  const r = await havuzuIsle(havuz(), b);
  assert.deepEqual(r.yazilan, ['derleme-1']);
  assert.deepEqual(b.kaydedilen, [['a', 'c']]);
  assert.deepEqual(b.atlanan.map((x) => x[0]), ['b']);
  assert.match(b.atlanan[0][1], /^standart:kirmizi:/);
});

test('havuzuIsle: süzgeç hata verirse derleme yayımlanmaz (belirsizlikte kapalı)', async () => {
  const b = havuzBagimlilik({ standart: () => { throw new Error('kurallar okunamadı'); } });
  const r = await havuzuIsle(havuz(), b);
  assert.deepEqual(r.yazilan, []);
  assert.deepEqual(b.kaydedilen, []);
});

test('havuzuIsle: süzgeç verilmemişse hiçbir derleme yayımlanmaz', async () => {
  const b = havuzBagimlilik({ standart: undefined });
  const r = await havuzuIsle(havuz(), b);
  assert.deepEqual(r.yazilan, []);
  assert.deepEqual(b.kaydedilen, []);
});

test('havuzuIsle: kırmızı derleme tümüyle yayımlanmazsa her madde atla ile bildirilir', async () => {
  const b = havuzBagimlilik({ yaz: async () => derleme(['Bir kişi tutuklandı.', 'İki.'], ['A man was arrested.', 'Two.']) });
  const r = await havuzuIsle([olay('a'), olay('b')], b);
  assert.deepEqual(r.yazilan, []);
  assert.deepEqual(b.atlanan.map((x) => x[0]).sort(), ['a', 'b']);
});

test('havuzuIsle: sarı derleme yayımlanır, karar kaydete geçer', async () => {
  let gelenS;
  const b = havuzBagimlilik({
    yaz: async () => derleme(['Seçim kurulu yeni kuralları inceledi.', 'İkinci haber.'], ['The election board reviewed the rules.', 'Second item.']),
    kaydet: async (t, grup, k, s) => ((gelenS = s), 'x-1'),
  });
  const r = await havuzuIsle([olay('a'), olay('b')], b);
  assert.deepEqual(r.yazilan, ['x-1']);
  assert.equal(gelenS.karar, 'sari');
});

// ── Puanlama kapısı ───────────────────────────────────────────────────────
test('puanKapisi: puanlama hata verirse hiçbir olay geçmez, hepsi bekler (eşik atlanmaz)', async () => {
  const k = await puanKapisi(['a', 'b'], async () => { throw new Error('Gemini: çok fazla deneme'); }, 70);
  assert.deepEqual(k.gecen, []);
  assert.deepEqual(k.bekleyen, ['a', 'b']);
  assert.match(k.hata, /çok fazla/);
});

test('puanKapisi: cevap yoksa (null) hiçbir olay geçmez', async () => {
  const k = await puanKapisi(['a'], async () => null, 70);
  assert.deepEqual(k.gecen, []);
  assert.deepEqual(k.bekleyen, ['a']);
});

test('puanKapisi: puansız kalan olay bekler, eşik altı düşer, eşik üstü geçer', async () => {
  const k = await puanKapisi(['a', 'b', 'c', 'd'], async () => [90, null, 20, 70], 70);
  assert.deepEqual(k.gecen, ['a', 'd']);
  assert.deepEqual(k.bekleyen, ['b']);
  assert.deepEqual(k.dusen, [{ g: 'c', puan: 20 }]);
});

test('onEle: modelin atladığı başlık eşik puanı almaz (null)', async () => {
  const p = await onEle(['a', 'b'], { kall: async () => ({ puanlar: [{ nr: 0, puan: 80 }] }) });
  assert.deepEqual(p, [80, null]);
});

// ── Acil durdurma ─────────────────────────────────────────────────────────
test('acilDurdurma: bayrak açıksa true döner ve nedeni loglar', async () => {
  const log = [];
  const d = await acilDurdurma({
    env: { MOTOR_URL: 'u', MOTOR_ANAHTARI: 'k' },
    durduMu: async (p) => (assert.equal(p.site, 'jendume'), { durdu: true, neden: 'acil durdurma (z)' }),
    log: (m) => log.push(m),
  });
  assert.equal(d, true);
  assert.match(log[0], /^Acil durdurma açık: acil durdurma/);
});

test('acilDurdurma: bayrak kapalıysa false döner, neden loglanır', async () => {
  const log = [];
  const d = await acilDurdurma({ env: {}, durduMu: async () => ({ durdu: false, neden: 'açık' }), log: (m) => log.push(m) });
  assert.equal(d, false);
  assert.equal(log.length, 1);
});

test('calistir.mjs: durdurma bayrağı açıksa tur hiçbir şey yazmadan 0 ile biter', async () => {
  const istekler = [];
  const sunucu = createServer((req, res) => {
    istekler.push(`${req.method} ${req.url}`);
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ durdu: true, zaman: '2026-10-20T08:00:00Z' }));
  });
  await new Promise((r) => sunucu.listen(0, '127.0.0.1', r));
  const durumOnce = await readFile(path.join(BU, 'gorulen.json'), 'utf8');
  try {
    const cikti = await new Promise((cozuldu) => {
      const c = spawn(process.execPath, [path.join(BU, 'calistir.mjs')], {
        env: { ...process.env, MOTOR_URL: `http://127.0.0.1:${sunucu.address().port}`, MOTOR_ANAHTARI: 'x'.repeat(32), GEMINI_API_KEY: '' },
      });
      let o = '';
      c.stdout.on('data', (d) => (o += d));
      c.stderr.on('data', (d) => (o += d));
      c.on('close', (kod) => cozuldu({ kod, o }));
    });
    assert.equal(cikti.kod, 0);
    assert.match(cikti.o, /Acil durdurma açık/);
    assert.ok(istekler.every((i) => i === 'GET /motor/jendume/durum'), istekler.join());
    assert.equal(await readFile(path.join(BU, 'gorulen.json'), 'utf8'), durumOnce);
  } finally {
    sunucu.close();
  }
});

// ── Motor kaydı ───────────────────────────────────────────────────────────
test('motorKaydet: kırmızı elendi + gerekçe, sarı yazildi + gerekçe gider; kimlik adres taşımaz', async () => {
  const gelen = [];
  const fetchFn = async (url, init) => (gelen.push([url, JSON.parse(init.body)]), { ok: true });
  await motorKaydet({ url: 'https://saat.example.com/', anahtar: 'k', fetchFn, kayit: kirmiziKayit('hf:https://x.example.com/a?b=1', { gerekce: 'standart:kirmizi:suc' }) });
  await motorKaydet({ url: 'https://saat.example.com', anahtar: 'k', fetchFn, kayit: sariKayit('k1a2b3c:z', 'bir-haber', { gerekce: 'standart:sari:secim' }) });
  assert.equal(gelen[0][0], 'https://saat.example.com/motor/jendume/kaydet');
  const [k, s] = [gelen[0][1].haberler[0], gelen[1][1].haberler[0]];
  assert.deepEqual([k.durum, k.gerekce], ['elendi', 'standart:kirmizi:suc']);
  assert.deepEqual([s.durum, s.slug, s.gerekce], ['yazildi', 'bir-haber', 'standart:sari:secim']);
  assert.match(k.kimlik, /^[A-Za-z0-9:_-]{1,128}$/);
  assert.equal(motorKimlik('a'), motorKimlik('a'));
});

test('motorKaydet: ayar yoksa ya da ağ hatasında tur düşmez (false)', async () => {
  assert.equal(await motorKaydet({ kayit: { kimlik: 'a' } }), false);
  assert.equal(await motorKaydet({ url: 'u', anahtar: 'k', kayit: { kimlik: 'a' }, fetchFn: async () => { throw new Error('ağ'); } }), false);
});
