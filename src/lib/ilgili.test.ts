import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ilgiliHaberler, varliklar, type IlgiliAday } from './ilgili.ts';

const uzun = (s: string) => `${s} ${Array.from({ length: 130 }, () => 'kelime').join(' ')}`;
const h = (id: string, category: string, title: string, body = uzun('')): IlgiliAday => ({
  id,
  body,
  data: { title, description: 'Kısa bir özet metni burada.', category, date: new Date('2026-10-10') },
});

test('varliklar genel "yapay zekâ" varlığını saymaz, şirket ve modelleri bulur', () => {
  const v = varliklar(h('a', 'teknoloji', 'NVIDIA yeni yapay zekâ çipi duyurdu', uzun('AI LLM')));
  assert.equal(v.has('https://www.wikidata.org/wiki/Q182477'), true);
  assert.equal(v.has('https://www.wikidata.org/wiki/Q115305900'), true);
  assert.equal(v.has('https://www.wikidata.org/wiki/Q11660'), false);
});

test('ilgiliHaberler ortak varlığı aynı bölümden önce tutar; kendisini, bülteni ve kısa haberi dışlar', () => {
  const post = h('ana', 'teknoloji', 'NVIDIA çip üretimini artırıyor');
  const adaylar = [
    post,
    h('bulten', 'gunluk-bulten', 'NVIDIA ve diğerleri: akşam bülteni'),
    h('kisa', 'ekonomi', 'NVIDIA kısa haber', 'çok kısa gövde'),
    h('ayni-bolum', 'teknoloji', 'Veri merkezi yatırımları büyüyor'),
    h('ortak', 'ekonomi', 'NVIDIA hisseleri rekor kırdı'),
    h('alakasiz', 'bilim', 'Okyanus sıcaklıkları ölçüldü'),
  ];
  assert.deepEqual(
    ilgiliHaberler(post, adaylar).map((p) => p.id),
    ['ortak', 'ayni-bolum', 'alakasiz'],
  );
});

test('ilgiliHaberler ortak varlık yoksa aynı bölümün en yenilerini verir', () => {
  const post = h('ana2', 'bilim', 'Okyanus sıcaklıkları ölçüldü');
  const adaylar = [
    h('b1', 'bilim', 'Yeni bir gök cismi keşfedildi'),
    h('t1', 'teknoloji', 'Telefon satışları düştü'),
    h('b2', 'bilim', 'Buzul ölçümleri yayımlandı'),
  ];
  assert.deepEqual(ilgiliHaberler(post, adaylar, 2).map((p) => p.id), ['b1', 'b2']);
});

// Gemini Faz 2 (27 Ekim): anlam benzerliği (src/data/vektorler.jsonl). Sahte anlam: kimlik çiftine göre benzerlik.
const anlamIle = (tablo: Record<string, number>) => (a: IlgiliAday, b: IlgiliAday) => tablo[`${a.id}|${b.id}`] ?? null;
const adaylarB = () => [
  h('b1', 'bilim', 'Yeni bir gök cismi keşfedildi'),
  h('t1', 'teknoloji', 'Telefon satışları düştü'),
  h('b2', 'bilim', 'Buzul ölçümleri yayımlandı'),
  h('bulten', 'gunluk-bulten', 'Akşam bülteni'),
];
const anaB = h('ana3', 'bilim', 'Okyanus sıcaklıkları ölçüldü');

test('anlam yoksa bugünkü sıra birebir', () => {
  assert.deepEqual(
    ilgiliHaberler(anaB, adaylarB(), 3, () => null).map((p) => p.id),
    ilgiliHaberler(anaB, adaylarB(), 3).map((p) => p.id),
  );
});

test('anlamca yakın haber ortak varlığı ve bölümü olmasa da öne gelir', () => {
  assert.deepEqual(ilgiliHaberler(anaB, adaylarB(), 2, anlamIle({ 'ana3|t1': 0.9 })).map((p) => p.id), ['t1', 'b1']);
});

test('anlam bülteni dışlamayı aşmaz; düşük benzerlik etkisiz', () => {
  assert.ok(!ilgiliHaberler(anaB, adaylarB(), 4, anlamIle({ 'ana3|bulten': 0.95 })).some((p) => p.id === 'bulten'));
  assert.deepEqual(
    ilgiliHaberler(anaB, adaylarB(), 2, anlamIle({ 'ana3|t1': 0.5 })).map((p) => p.id),
    ilgiliHaberler(anaB, adaylarB(), 2).map((p) => p.id),
  );
});
