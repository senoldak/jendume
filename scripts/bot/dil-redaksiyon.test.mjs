import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { dilRedakte, enRedakte, enSorunlari, turkceGibi, SISTEM_TR, SISTEM_EN } from './dil-redaksiyon.mjs';
import { DUZELTME_SEMASI } from './duzeltme.mjs';
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
    // Cümle düzeltmeli çıktı (25 Kasım 2026): yalnız değişen parça döner; EN adımına boş liste.
    return { duzeltmeler: a.sistem === SISTEM_TR ? [{ alan: 'body', eski: 'otuz dört milyon dolar', yeni: '34 milyon dolar' }] : [] };
  };
  const enOnce = structuredClone(en);
  const r = await dilRedakte(taslak(), KAYNAK, { kall });
  assert.equal(r.elendi, undefined);
  assert.equal(cagrilar.filter((c) => c.sistem === SISTEM_TR).length, 1);
  assert.equal(cagrilar[0].sistem, SISTEM_TR);
  assert.equal(cagrilar[0].schema, DUZELTME_SEMASI);
  assert.match(cagrilar[0].prompt, /ÇIKTI BİÇİMİ: Metni yeniden yazma/);
  assert.equal(r.t.tr.body, iyiGovde);
  assert.equal(cagrilar[0].dusunme, 'medium');
  assert.equal(cagrilar[0].sicaklik, null); // Gemini 3 varsayılanı (24 Kasım 2026)
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
    return { duzeltmeler: [{ alan: 'body', eski: 'otuz dört milyon dolar', yeni: '99 milyon dolar' }] };
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

test('metni kısaltan düzeltme uygulanmaz; kesin sorun kalınca kapının ikinci turu düzeltir', async () => {
  let n = 0;
  const parca = kotuGovde.split(' ').slice(0, 40).join(' ');
  const kall = async (a) => {
    if (a.sistem !== SISTEM_TR) return null;
    n++;
    return { duzeltmeler: n === 1 ? [{ alan: 'body', eski: parca, yeni: 'kısa.' }] : [{ alan: 'body', eski: 'otuz dört milyon dolar', yeni: '34 milyon dolar' }] };
  };
  const r = await dilRedakte(taslak(), KAYNAK, { kall });
  assert.equal(n, 2);
  assert.equal(r.elendi, undefined);
  assert.equal(r.t.tr.body, iyiGovde);
});

test('kapı: redaksiyon sorunu gideremezse (hep eski gövde döner) kesin sorunla yayın durur; EN dokunulmamış', async () => {
  const kall = async () => ({ duzeltmeler: [] });
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

test('why_matters perspektifle aynı olsa da istem yeniden yazım istemez (cümle düzeltmeli redaksiyon)', async () => {
  let istem = '';
  const ayni = `${uydur(10, 8)}.`;
  await dilRedakte(taslak(iyiGovde, { perspektif: ayni, why_matters: ayni }), KAYNAK, { kall: async (a) => (a.sistem === SISTEM_TR && (istem = a.prompt), null) });
  assert.ok(istem.length > 0);
  assert.doesNotMatch(istem, /farklı bir açıdan|perspektif ile aynı/);
  assert.doesNotMatch(SISTEM_TR, /farklı bir açıdan/);
});

// --- EN redaksiyonu (19 Kasım 2026)
const ENG = ['the', 'company', 'said', 'its', 'new', 'chip', 'uses', 'less', 'power', 'than', 'earlier', 'models', 'and', 'ships', 'next', 'year'];
const ingilizce = (n, k = 0) => Array.from({ length: n }, (_, i) => ENG[(i + k) % ENG.length]).join(' ');
const enTaslak = (body) => ({
  tr: { title: 'Orionlab yeni çipini tanıttı', description: 'x.', body: iyiGovde },
  en: { title: 'Orionlab unveils its new chip design', description: 'The firm said the chip uses less power.', body },
});
const EN_KAYNAK = `${KAYNAK} Orionlab signed an agreement of 34 million dollars.`;

test('EN redaksiyonu: tire ve şişirme kalıbı istemde sorun olarak geçer, düzeltilmiş EN kabul edilir', async () => {
  const govde = `${ingilizce(240)} — a pivotal step. The deal is worth 34 million dollars.`;
  const duz = `${ingilizce(240)}, a step. The deal is worth 34 million dollars.`;
  const istemler = [];
  const r = await enRedakte(enTaslak(govde), EN_KAYNAK, { kall: async (a) => (istemler.push(a), { duzeltmeler: [{ alan: 'body', eski: ' — a pivotal step.', yeni: ', a step.' }] }) });
  assert.equal(istemler[0].sistem, SISTEM_EN);
  assert.match(istemler[0].prompt, /Dash used to join clauses/);
  assert.match(istemler[0].prompt, /Inflated or overused wording/);
  assert.equal(r.en.body, duz);
});

test('EN redaksiyonu: rakamı değiştiren düzeltme atlanır, EN olduğu gibi kalır', async () => {
  const govde = `${ingilizce(240)} — the first such deal. The deal is worth 34 million dollars.`;
  let n = 0;
  const r = await enRedakte(enTaslak(govde), EN_KAYNAK, { kall: async () => (n++, { duzeltmeler: [{ alan: 'body', eski: 'The deal is worth 34 million dollars.', yeni: 'The deal is worth 99 million dollars.' }] }) });
  assert.equal(r, null);
  assert.equal(n, 1, 'uygulanacak düzeltme kalmayınca yeniden deneme yok');
});

test('EN redaksiyonu: Türkçeleşen cümle reddedilir; kısaltan düzeltme uygulanmaz (EN değişmez)', async () => {
  const govde = `${ingilizce(240)} — the first such deal. The deal is worth 34 million dollars.`;
  const tr = await enRedakte(enTaslak(govde), EN_KAYNAK, { kall: async () => ({ duzeltmeler: [{ alan: 'body', eski: 'The deal is worth 34 million dollars.', yeni: 'Anlaşma bir şirket için ve ile 34 million dollars.' }] }) });
  assert.equal(tr, null);
  const kisa = await enRedakte(enTaslak(govde), EN_KAYNAK, { kall: async () => ({ duzeltmeler: [{ alan: 'body', eski: ingilizce(40), yeni: 'the company.' }] }) });
  assert.equal(kisa, null);
});

test('turkceGibi ve enSorunlari: Türkiye gibi tek tük ad Türkçe sayılmaz; temiz EN metinde sorun yok', () => {
  assert.equal(turkceGibi('The firm opened an office in Türkiye and İstanbul.'), false);
  assert.equal(turkceGibi('Şirket bir yatırım için ve ile olarak daha fazla.'), true);
  assert.equal(enSorunlari({ body: 'The firm raised 5 million dollars in 2015–2025.' }), '');
  assert.match(enSorunlari({ body: 'It is not only cheap but also fast.' }), /False contrast/);
});

test('EN redaksiyonu: kod kalıp bulmazsa çağrı yapılmaz; olgu sözcüğünü (first) silen düzeltme atlanır, ötekiler uygulanır', async () => {
  let n = 0;
  const temiz = await enRedakte(enTaslak(`${ingilizce(240)}. The deal is worth 34 million dollars.`), EN_KAYNAK, { kall: async () => (n++, null) });
  assert.equal(temiz, null);
  assert.equal(n, 0);
  const govde = `${ingilizce(240)} — the first such deal. The deal is worth 34 million dollars.`;
  const r = await enRedakte(enTaslak(govde), EN_KAYNAK, { kall: async () => ({ duzeltmeler: [{ alan: 'body', eski: ' — the first such deal.', yeni: ', a big deal.' }] }) });
  assert.equal(r, null);
  const iki = await enRedakte(enTaslak(govde), EN_KAYNAK, { kall: async () => ({ duzeltmeler: [
    { alan: 'body', eski: ' — the first such deal.', yeni: ', a big deal.' },
    { alan: 'body', eski: 'The deal is worth 34 million dollars.', yeni: 'The agreement is worth 34 million dollars.' },
  ] }) });
  assert.ok(iki.en.body.includes('the first such deal'));
  assert.ok(iki.en.body.includes('The agreement is worth 34 million dollars.'));
});
