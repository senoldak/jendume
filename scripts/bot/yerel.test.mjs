import { test } from 'node:test';
import assert from 'node:assert/strict';
import { yerelDuzelt, yerelDuzeltMetin, ilgiliKisim, kesinKontroller } from './denetci.mjs';

test('yerelDuzeltMetin cümle başındaki göreli zamanı siler ve büyük harf yapar', () => {
  assert.equal(yerelDuzeltMetin('OpenAI modeli tanıttı. Bugün şirket fiyatları açıkladı.', 'tr'), 'OpenAI modeli tanıttı. Şirket fiyatları açıkladı.');
  assert.equal(yerelDuzeltMetin('Yesterday, the company shipped it.', 'en'), 'The company shipped it.');
});

test('yerelDuzeltMetin cümle içindeki göreli zamanı siler, noktalamayı toparlar', () => {
  assert.equal(yerelDuzeltMetin('Şirket modeli bu hafta yayımladı.', 'tr'), 'Şirket modeli yayımladı.');
  assert.equal(yerelDuzeltMetin('It launched today.', 'en'), 'It launched.');
});

test('yerelDuzeltMetin alıntı içine dokunmaz', () => {
  const m = 'Altman "bugün çok önemli bir gün" dedi.';
  assert.equal(yerelDuzeltMetin(m, 'tr'), m);
  assert.equal(yerelDuzeltMetin('Today, “today matters” he said.', 'en'), '“today matters” he said.');
});

test('yerelDuzeltMetin yayın kuruluşu atıflarını siler, başka kullanımlara dokunmaz', () => {
  assert.equal(yerelDuzeltMetin("Bloomberg'in haberine göre, Anthropic 2,5 milyar dolar topladı.", 'tr'), 'Anthropic 2,5 milyar dolar topladı.');
  assert.equal(yerelDuzeltMetin("Reuters'a göre şirket büyüdü.", 'tr'), 'Şirket büyüdü.');
  assert.equal(yerelDuzeltMetin('According to Reuters, the deal is worth $1.2 billion.', 'en'), 'The deal is worth $1.2 billion.');
  assert.equal(yerelDuzeltMetin('The deal closed, Bloomberg reported.', 'en'), 'The deal closed.');
  const kalan = 'Bloomberg terminali de güncellendi.';
  assert.equal(yerelDuzeltMetin(kalan, 'tr'), kalan);
});

test('yerelDuzelt iki dil bloğunu da temizler ve kesin kontrolleri geçirir', () => {
  const kaynak = 'Anthropic raised 2.5 billion dollars in a new round led by investors.';
  const paket = {
    kategori: 'x',
    tr: { title: 'Anthropic yatırım aldı', description: 'Bugün açıklandı.', body: "Reuters'a göre Anthropic 2,5 milyar dolar topladı." },
    en: { title: 'Anthropic raises funds', description: 'Announced today.', body: 'According to Reuters, Anthropic raised $2.5 billion.' },
  };
  assert.ok(kesinKontroller(paket, kaynak).length > 0);
  const d = yerelDuzelt(paket);
  assert.deepEqual(kesinKontroller(d, kaynak), []);
  assert.equal(d.kategori, 'x');
  assert.equal(paket.tr.description, 'Bugün açıklandı.');
});

test('ilgiliKisim sınırın altındaki kaynağı aynen döndürür', () => {
  assert.equal(ilgiliKisim('kısa kaynak', 'taslak', 1000), 'kısa kaynak');
});

test('ilgiliKisim rakam eşleşmesiyle geç paragrafı çeker, sırayı korur', () => {
  const giris = 'Giriş paragrafı. '.repeat(100).trim();
  const dolgu = Array.from({ length: 20 }, (_, i) => `Alakasız dolgu paragrafı ${i} hakkında genel bilgiler içeriyor. `.repeat(5).trim());
  const gec = 'The company reported revenue of 1,250 million in the quarter.';
  const kaynak = [giris, ...dolgu, gec].join('\n\n');
  const out = ilgiliKisim(kaynak, 'Şirket çeyrekte 1.250 milyon gelir açıkladı.', 3000);
  assert.ok(out.length <= 3000);
  assert.ok(out.startsWith('Giriş paragrafı.'));
  assert.ok(out.includes(gec));
  assert.ok(out.includes('[…]'));
  assert.ok(out.indexOf(gec) > out.indexOf('Giriş'));
});

test('ilgiliKisim alıntı ve adlarla eşleşen paragrafı seçer', () => {
  const kaynak = [
    'A'.repeat(1600),
    'Filler text without anything useful at all here. '.repeat(30),
    'Dario Amodei said "we are building safer systems" at the event.',
    'More filler about unrelated weather and sports. '.repeat(30),
  ].join('\n\n');
  const out = ilgiliKisim(kaynak, 'Amodei "we are building safer systems" dedi.', 2000);
  assert.ok(out.includes('Dario Amodei said'));
  assert.ok(!out.includes('weather'));
});
