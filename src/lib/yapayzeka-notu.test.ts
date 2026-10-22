import test from 'node:test';
import assert from 'node:assert/strict';
import { yapayZekaNotu } from './yapayzeka-notu.mjs';

const adres = 'https://jendume.com/tr/haber/ornek-haber/';

test('bot haberi TR: not metni ve Hata bildir bağlantısı birebir', () => {
  const n = yapayZekaNotu({ veri: {}, dil: 'tr', baslik: 'Örnek & haber', adres });
  assert.equal(n.metin, 'Bu haber yapay zekâ ile otomatik yazıldı ve otomatik denetimden geçti.');
  assert.equal(n.baglanti, 'Hata bildir →');
  const u = new URL(n.mailto);
  assert.equal(u.protocol, 'mailto:');
  assert.equal(u.pathname, 'contact@jendume.com');
  assert.equal(u.searchParams.get('subject'), 'Hata bildirimi: Örnek & haber');
  assert.equal(u.searchParams.get('body'), adres);
});

test('bot haberi EN: İngilizce not ve Error report konusu', () => {
  const n = yapayZekaNotu({ veri: { yaziTuru: 'haber' }, dil: 'en', baslik: 'A story', adres: 'https://jendume.com/en/news/a-story/' });
  assert.equal(n.metin, 'This story was written automatically with AI and checked automatically.');
  assert.equal(n.baglanti, 'Report an error →');
  assert.equal(new URL(n.mailto).searchParams.get('subject'), 'Error report: A story');
});

test('yazı işleri yazısı (açıklayıcı ya da referans): çeviri ve dil düzeltmesi notu', () => {
  for (const yaziTuru of ['aciklayici', 'referans']) {
    assert.equal(
      yapayZekaNotu({ veri: { yaziTuru }, dil: 'tr', baslik: 'x', adres }).metin,
      'Yazım ve dil düzeltmesinde yapay zekâ araçları kullanıldı. Bütün rakamlar resmî kaynaklardan alındı ve kontrol edildi.',
    );
    assert.equal(
      yapayZekaNotu({ veri: { yaziTuru }, dil: 'en', baslik: 'x', adres }).metin,
      'AI tools were used for translation and language editing. All figures are taken from official sources and checked.',
    );
  }
});

test('notlarda "Sorumlu" kelimesi geçmez', () => {
  for (const dil of ['tr', 'en']) for (const veri of [{}, { yaziTuru: 'aciklayici' }]) {
    const n = yapayZekaNotu({ veri, dil, baslik: 'x', adres });
    assert.doesNotMatch(`${n.metin} ${n.baglanti}`, /sorumlu|ansvarlig|responsible/i);
  }
});

test('yazı işleri zinciri (uretim yazi-isleri): yazı türü dolu olsa da TR ve EN zincir notu; bağlantı aynı', () => {
  const tr = 'Bu yazı yapay zekâ araçlarıyla yazıldı. Rakamlar ve alıntılar resmî kaynaklarla karşılaştırıldı; yazı yayından önce editör tarafından okunup onaylandı.';
  const en = 'This article was written with AI tools. Figures and quotes were checked against official sources, and an editor read and approved it before publication.';
  for (const yaziTuru of ['aciklayici', 'referans']) {
    const veri = { yaziTuru, uretim: 'yazi-isleri' };
    const n = yapayZekaNotu({ veri, dil: 'tr', baslik: 'Örnek & yazı', adres });
    assert.equal(n.metin, tr);
    assert.equal(n.baglanti, 'Hata bildir →');
    assert.equal(n.mailto, yapayZekaNotu({ veri: {}, dil: 'tr', baslik: 'Örnek & yazı', adres }).mailto);
    const e = yapayZekaNotu({ veri, dil: 'en', baslik: 'x', adres: 'https://jendume.com/en/news/x/' });
    assert.equal(e.metin, en);
    assert.equal(e.baglanti, 'Report an error →');
    assert.doesNotMatch(`${n.metin} ${e.metin}`, /sorumlu|responsible|translation/i);
  }
});
