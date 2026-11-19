import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { dilRedakte, enRedakte, enSorunlari, turkceGibi, SISTEM_TR, SISTEM_EN } from './dil-redaksiyon.mjs';
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
  // Bir TR çağrısı; EN adımı da çağrılır ama sahte model Türkçe döndürdüğü için EN kabul edilmez (EN aynen kalır).
  assert.equal(cagrilar.filter((c) => c.sistem === SISTEM_TR).length, 1);
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
  const kall = async (a) => {
    if (a.sistem !== SISTEM_TR) return null;
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
  await dilRedakte(taslak(iyiGovde, { perspektif: ayni, why_matters: ayni }), KAYNAK, { kall: async (a) => (a.sistem === SISTEM_TR && (istem = a.prompt), null) });
  assert.ok(istem.includes('why_matters perspektif ile aynı'));
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
  const r = await enRedakte(enTaslak(govde), EN_KAYNAK, { kall: async (a) => (istemler.push(a), { title: 'Orionlab unveils its new chip design', description: 'The firm said the chip uses less power.', body: duz }) });
  assert.equal(istemler[0].sistem, SISTEM_EN);
  assert.match(istemler[0].prompt, /Dash used to join clauses/);
  assert.match(istemler[0].prompt, /Inflated or overused wording/);
  assert.equal(r.en.body, duz);
});

test('EN redaksiyonu: rakam değişirse iki deneme de reddedilir, EN olduğu gibi kalır', async () => {
  const govde = `${ingilizce(240)} — the first such deal. The deal is worth 34 million dollars.`;
  const loglar = [];
  const r = await enRedakte(enTaslak(govde), EN_KAYNAK, { kall: async () => ({ title: 'Orionlab unveils its new chip design', description: 'The firm said the chip uses less power.', body: govde.replace('34 million', '99 million') }), log: (m) => loglar.push(m) });
  assert.equal(r, null);
  assert.ok(loglar.some((l) => l.includes('EN redaksiyonu atıldı')));
});

test('EN redaksiyonu: Türkçe dönen gövde ve uzunluğu %90–115 dışına çıkan gövde reddedilir', async () => {
  const govde = `${ingilizce(240)} — the first such deal. The deal is worth 34 million dollars.`;
  const tr = await enRedakte(enTaslak(govde), EN_KAYNAK, { kall: async () => ({ title: 'Orionlab unveils its new chip design', description: 'd.', body: `${'şirket ve bir ürün için ile '.repeat(50)} 34 million dollars.` }) });
  assert.equal(tr, null);
  const kisa = await enRedakte(enTaslak(govde), EN_KAYNAK, { kall: async () => ({ title: 'Orionlab unveils its new chip design', description: 'd.', body: `${ingilizce(60)}. The deal is worth 34 million dollars.` }) });
  assert.equal(kisa, null);
});

test('turkceGibi ve enSorunlari: Türkiye gibi tek tük ad Türkçe sayılmaz; temiz EN metinde sorun yok', () => {
  assert.equal(turkceGibi('The firm opened an office in Türkiye and İstanbul.'), false);
  assert.equal(turkceGibi('Şirket bir yatırım için ve ile olarak daha fazla.'), true);
  assert.equal(enSorunlari({ body: 'The firm raised 5 million dollars in 2015–2025.' }), '');
  assert.match(enSorunlari({ body: 'It is not only cheap but also fast.' }), /False contrast/);
});

test('EN redaksiyonu: kod kalıp bulmazsa çağrı yapılmaz; olgu sözcüğü (first) silinirse reddedilir', async () => {
  let n = 0;
  const temiz = await enRedakte(enTaslak(`${ingilizce(240)}. The deal is worth 34 million dollars.`), EN_KAYNAK, { kall: async () => (n++, null) });
  assert.equal(temiz, null);
  assert.equal(n, 0);
  const govde = `${ingilizce(240)} — the first such deal. The deal is worth 34 million dollars.`;
  const r = await enRedakte(enTaslak(govde), EN_KAYNAK, { kall: async () => ({ title: 'Orionlab unveils its new chip design', description: 'The firm said the chip uses less power.', body: govde.replace(' — the first such deal', ', a deal') }) });
  assert.equal(r, null);
});
