import test from 'node:test';
import assert from 'node:assert/strict';
import { AJANLAR, adimlar, insanOkumadi, kartMetinleri, olguSatiri, uretimTuru } from './ajanlar.mjs';

const medya = { category: 'bilim', kaynakIzi: 'v1.x', kaynaklar: [] };
const resmi = { category: 'yapay-zeka', kaynakIzi: 'v1.x', kaynaklar: [{ ad: 'Avrupa Komisyonu', url: 'https://example.eu' }], haberDegeri: 82 };
const sahip = { category: 'bilim', yaziTuru: 'analiz', uretim: 'yazi-isleri', kaynaklar: [] };

test('uretimTuru: sahip > zincir > resmî > medya; bülten ve bilinmeyen kart almaz', () => {
  assert.equal(uretimTuru(sahip), 'sahip');
  assert.equal(uretimTuru({ category: 'bilim', uretim: 'yazi-isleri', kaynaklar: [] }), 'zincir');
  assert.equal(uretimTuru(resmi), 'bot-resmi');
  assert.equal(uretimTuru(medya), 'bot-medya');
  assert.equal(uretimTuru({ category: 'gunluk-bulten', kaynakIzi: 'x' }), null);
  assert.equal(uretimTuru({ category: 'bilim', kaynaklar: [] }), null);
  assert.equal(adimlar({ category: 'bilim', kaynaklar: [] }), null);
});

test('adımlar: her ajan kayıtlı, sahip yazısında ilk adım insan', () => {
  for (const v of [sahip, resmi, medya, { category: 'bilim', uretim: 'yazi-isleri', kaynaklar: [] }]) {
    for (const a of adimlar(v)) {
      assert.ok(AJANLAR[a.id], a.id);
      assert.ok(a.metin.tr && a.metin.en);
    }
  }
  assert.equal(AJANLAR[adimlar(sahip)[0].id].yz, false);
  assert.equal(adimlar(medya).length, 7);
});

test('haber değeri yalnız kayıtlıysa söylenir', () => {
  assert.match(adimlar(resmi)[1].metin.tr, /100 üzerinden 82 puan/);
  assert.doesNotMatch(adimlar(medya)[1].metin.tr, /\d+ olarak/);
  assert.deepEqual(olguSatiri(resmi, 'tr'), ['Resmî kaynaktan', 'Haber değeri 82/100']);
  assert.deepEqual(olguSatiri(medya, 'en'), ['From news outlets']);
  assert.match(adimlar(resmi)[0].metin.tr, /Avrupa Komisyonu/);
});

test('kart metinleri: bot haberi insan okumadı, sahip yazısı okundu; ajanların insan olmadığı yazılı', () => {
  assert.equal(insanOkumadi(medya), true);
  assert.equal(insanOkumadi(sahip), false);
  assert.match(kartMetinleri(medya, 'tr').kisa, /^Yedi yapay zekâ ajanı/);
  assert.match(kartMetinleri(medya, 'tr').not, /insan değil/);
  assert.match(kartMetinleri(medya, 'en').not, /not people/);
  assert.equal(kartMetinleri(sahip, 'tr').not, 'Cem ve Mina otomatik adımların adıdır, insan değildir.');
});

test('kaynak adı olan haberde kart kaynağı adıyla ve sayısıyla söyler', () => {
  const bir = { ...medya, kaynakAdlari: [{ ad: 'Örnek Yayın', url: 'https://ornek.example/a' }] };
  assert.match(adimlar(bir)[0].metin.tr, /^Haberi Örnek Yayın haberinde buldu\.$/);
  assert.deepEqual(olguSatiri(bir, 'tr'), ['1 kaynak']);
  const iki = { ...medya, kaynakAdlari: [{ ad: 'A', url: 'https://a.example/x' }, { ad: 'B', url: 'https://b.example/y' }] };
  assert.match(adimlar(iki)[0].metin.en, /reports by 2 outlets/);
  assert.deepEqual(olguSatiri(iki, 'en'), ['2 sources']);
});
