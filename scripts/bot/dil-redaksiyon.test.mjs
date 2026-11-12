import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { dilRedakte, SISTEM_TR } from './dil-redaksiyon.mjs';
import { kesinSorunlar } from './dil-tr.mjs';
import { medyaAdlariniKur } from './denetci.mjs';

medyaAdlariniKur(['Örnek Haber', 'Ajans Beta']);
mock.method(console, 'log', () => {});

const HECE = ['mar', 'vel', 'tör', 'kın', 'şul', 'ber', 'dan', 'fil', 'gör', 'hap'];
const uydur = (n, tohum) =>
  Array.from({ length: n }, (_, i) => `${HECE[(i * 7 + tohum) % 10]}${HECE[(i * 3 + tohum * 2) % 10]}${HECE[(i + tohum) % 10]}`).join(' ');

// Kaynakta rakamla yazılı tutar var; taslak onu yazıyla yazmış (kesin dil sorunu).
const KAYNAK = `${uydur(120, 5)} 34 milyon dolar ${uydur(60, 6)}`;
const kotuGovde = `${uydur(120, 1)} otuz dört milyon dolar ${uydur(60, 2)}.`;
const iyiGovde = `${uydur(120, 1)} 34 milyon dolar ${uydur(60, 2)}.`;
const en = { title: 'Orionlab unveils new chip', description: 'The firm said otuz dört cümle.', body: `${uydur(250, 4)}.`, perspektif: 'Keep EN.', why_matters: 'Keep EN too.' };
const taslak = (govde = kotuGovde, ek = {}) => ({
  tr: { title: 'Orionlab yeni çipini tanıttı', description: `${uydur(12, 7)}.`, bolge: 'Küresel', perspektif: `${uydur(10, 8)}.`, why_matters: `${uydur(9, 9)}.`, body: govde, key_points: [], rakamlar: [], ...ek },
  en,
});
const kelime = (s) => s.split(/\s+/).length;

test('redaksiyon kabul: TR düzelir, EN aynen kalır, sistem istemi ve ayarlar iletilir', async () => {
  const cagrilar = [];
  const kall = async (a) => {
    cagrilar.push(a);
    return { title: 'Orionlab yeni çipini tanıttı', description: `${uydur(12, 7)}.`, body: iyiGovde };
  };
  const enOnce = structuredClone(en);
  const r = await dilRedakte(taslak(), KAYNAK, { kall });
  assert.equal(r.elendi, undefined);
  assert.equal(cagrilar.length, 1);
  assert.equal(cagrilar[0].sistem, SISTEM_TR);
  assert.equal(cagrilar[0].dusunme, 'medium');
  assert.equal(cagrilar[0].sicaklik, 0.2);
  assert.ok(cagrilar[0].prompt.includes('otuz dört milyon dolar') || cagrilar[0].prompt.includes('Sayılar yazıyla'));
  assert.ok(!cagrilar[0].prompt.includes('Keep EN'), 'EN alanları istemde yok');
  assert.ok(r.t.tr.body.includes('34 milyon dolar'));
  assert.deepEqual(r.t.en, enOnce);
});

test('redaksiyon reddedilir (rakam uydurdu) → yeniden deneme red nedenini taşır → fallback, kesin sorun kalınca elenir', async () => {
  const loglar = [];
  const istemler = [];
  const kall = async (a) => {
    istemler.push(a.prompt);
    return { title: 'Orionlab yeni çipini tanıttı', description: `${uydur(12, 7)}.`, body: `${uydur(120, 1)} 99 milyon dolar ${uydur(60, 2)}.` };
  };
  const r = await dilRedakte(taslak(), KAYNAK, { kall, log: (m) => loglar.push(m) });
  // İlk tur + yeniden deneme; kapı ikinci turu da (2 çağrı) dener: toplam 4.
  assert.ok(istemler.length >= 2);
  assert.ok(istemler[1].includes('ÖNCEKİ DENEME REDDEDİLDİ'));
  assert.ok(loglar.some((l) => l.includes('dil redaksiyonu atıldı:')));
  assert.ok(r.elendi?.startsWith('dil:'));
  // Reddedilen çıktı alınmadı: gövde hâlâ eski (yazıyla sayılı).
  assert.ok(r.t.tr.body.includes('otuz dört milyon dolar'));
});

test('uzunluk %90–115 dışına çıkan redaksiyon reddedilir, bir sonraki deneme kabul edilir', async () => {
  let n = 0;
  const kisa = `${uydur(40, 1)} 34 milyon dolar.`;
  const kall = async () => {
    n++;
    return { title: 'Orionlab yeni çipini tanıttı', description: `${uydur(12, 7)}.`, body: n === 1 ? kisa : iyiGovde };
  };
  const r = await dilRedakte(taslak(), KAYNAK, { kall });
  assert.equal(n, 2);
  assert.equal(r.elendi, undefined);
  assert.ok(kelime(r.t.tr.body) >= kelime(kotuGovde) * 0.9);
});

test('kapı: redaksiyon sorunu gideremezse (hep eski gövde döner) kesin sorunla yayın durur; EN dokunulmamış', async () => {
  const kall = async () => ({ title: 'Orionlab yeni çipini tanıttı', description: `${uydur(12, 7)}.`, body: kotuGovde });
  const r = await dilRedakte(taslak(), KAYNAK, { kall });
  assert.ok(r.elendi.startsWith('dil:'));
  assert.ok(kesinSorunlar([{ kesin: true }]).length === 1);
  assert.deepEqual(r.t.en, en);
});

test('Gemini cevap vermezse (null) redaksiyon atılır, sorun yoksa taslak aynen yayına gider (güvenli düzeltmeler uygulanır)', async () => {
  const loglar = [];
  const t = taslak(iyiGovde, { description: `${uydur(12, 7)} 3.5 milyar ${uydur(2, 3)}.` });
  const r = await dilRedakte(t, `${KAYNAK} 3,5 milyar`, { kall: async () => null, log: (m) => loglar.push(m) });
  assert.equal(r.elendi, undefined);
  assert.ok(loglar.some((l) => l.includes('dil redaksiyonu atıldı: cevap yok')));
  assert.ok(r.t.tr.description.includes('3,5 milyar'));
  assert.equal(r.t.tr.body, iyiGovde);
});

test('why_matters perspektifle aynıysa istemde uyarı çıkar', async () => {
  let istem = '';
  const ayni = `${uydur(10, 8)}.`;
  await dilRedakte(taslak(iyiGovde, { perspektif: ayni, why_matters: ayni }), KAYNAK, { kall: async (a) => ((istem = a.prompt), null) });
  assert.ok(istem.includes('why_matters perspektif ile aynı'));
});
