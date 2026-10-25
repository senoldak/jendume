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

test('sahibin yazısı (açıklayıcı ya da referans): TR "Bu yazı nasıl hazırlandı" çevirisiz, EN çeviri satırıyla', () => {
  for (const yaziTuru of ['aciklayici', 'referans']) {
    const tr = yapayZekaNotu({ veri: { yaziTuru }, dil: 'tr', baslik: 'x', adres });
    assert.equal(tr.baslik, 'Bu yazı nasıl hazırlandı');
    assert.deepEqual(tr.satirlar.map((s) => s.etiket), ['Yazar', 'Dil ve yapay zekâ', 'Rakamlar ve kaynaklar', 'İlkeler']);
    assert.doesNotMatch(tr.satirlar.map((s) => s.metin).join(' '), /çevir/i);
    const en = yapayZekaNotu({ veri: { yaziTuru }, dil: 'en', baslik: 'x', adres: 'https://jendume.com/en/news/x/' });
    assert.equal(en.baslik, 'How this article was made');
    assert.deepEqual(en.satirlar.map((s) => s.etiket), ['Author', 'Language and AI', 'Figures and sources', 'Principles']);
    assert.match(en.satirlar[1].metin, /written in Turkish and translated into English/);
    assert.match(en.satirlar[1].metin, /not used for content, angle or figures/);
  }
  assert.equal(yapayZekaNotu({ veri: {}, dil: 'tr', baslik: 'x', adres }).satirlar, null);
});

test('analiz: yöntem satırı İlkeler satırından önce (TR ve EN)', () => {
  const tr = yapayZekaNotu({ veri: { yaziTuru: 'analiz', uretim: 'yazi-isleri' }, dil: 'tr', baslik: 'x', adres });
  assert.deepEqual(tr.satirlar.map((s) => s.etiket), ['Yazar', 'Dil ve yapay zekâ', 'Rakamlar ve kaynaklar', 'Yöntem', 'İlkeler']);
  const en = yapayZekaNotu({ veri: { yaziTuru: 'analiz' }, dil: 'en', baslik: 'x', adres });
  assert.equal(en.satirlar[3].etiket, 'Method');
});

test('notlarda "Sorumlu" kelimesi geçmez', () => {
  for (const dil of ['tr', 'en']) for (const veri of [{}, { yaziTuru: 'aciklayici' }, { yaziTuru: 'analiz' }]) {
    const n = yapayZekaNotu({ veri, dil, baslik: 'x', adres });
    const satirlar = (n.satirlar ?? []).map((s) => s.metin).join(' ');
    assert.doesNotMatch(`${n.metin} ${n.baglanti} ${satirlar}`, /sorumlu|ansvarlig|responsible/i);
  }
});

test('yazı işleri zinciri (uretim yazi-isleri): sahibin olmayan yazı TR ve EN zincir notu; imzalı yazı zincirden gelse de sahip', () => {
  const tr = 'Bu yazı yapay zekâ araçlarıyla yazıldı. Rakamlar ve alıntılar resmî kaynaklarla karşılaştırıldı; yazı yayından önce editör tarafından okunup onaylandı.';
  const en = 'This article was written with AI tools. Figures and quotes were checked against official sources, and an editor read and approved it before publication.';
  const veri = { yaziTuru: 'haber', uretim: 'yazi-isleri' };
  const n = yapayZekaNotu({ veri, dil: 'tr', baslik: 'Örnek & yazı', adres });
  assert.equal(n.metin, tr);
  assert.equal(n.satirlar, null);
  assert.equal(n.baglanti, 'Hata bildir →');
  assert.equal(n.mailto, yapayZekaNotu({ veri: {}, dil: 'tr', baslik: 'Örnek & yazı', adres }).mailto);
  const e = yapayZekaNotu({ veri, dil: 'en', baslik: 'x', adres: 'https://jendume.com/en/news/x/' });
  assert.equal(e.metin, en);
  assert.equal(e.baglanti, 'Report an error →');
  for (const yaziTuru of ['aciklayici', 'referans', 'analiz']) {
    assert.notEqual(yapayZekaNotu({ veri: { yaziTuru, uretim: 'yazi-isleri' }, dil: 'tr', baslik: 'x', adres }).satirlar, null);
  }
});
