import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  belirtecGecerli,
  bultenEpostasi,
  dilSecimi,
  durumYolu,
  epostaNormalize,
  htmlKacis,
  isoHafta,
  onayEpostasi,
  utmEkle,
  bultenUtm,
} from './saf.ts';

test('epostaNormalize: küçük harfe çevirir, boşlukları atar, geçersizleri reddeder', () => {
  assert.equal(epostaNormalize('  Ali.Veli@Example.COM '), 'ali.veli@example.com');
  assert.equal(epostaNormalize('kisi@haber.example.com'), 'kisi@haber.example.com');
  assert.equal(epostaNormalize('yok-bu-adres'), null);
  assert.equal(epostaNormalize('a@b'), null);
  assert.equal(epostaNormalize('bir iki@example.com'), null);
  assert.equal(epostaNormalize(`${'a'.repeat(65)}@example.com`), null);
  assert.equal(epostaNormalize(42), null);
  assert.equal(epostaNormalize(null), null);
});

test('dilSecimi: yalnız en İngilizce, diğerleri Türkçe', () => {
  assert.equal(dilSecimi('en'), 'en');
  assert.equal(dilSecimi('tr'), 'tr');
  assert.equal(dilSecimi('de'), 'tr');
  assert.equal(dilSecimi(undefined), 'tr');
});

test('belirtecGecerli: UUID biçimini kabul eder, enjeksiyon karakterlerini reddeder', () => {
  assert.equal(belirtecGecerli('3f2b8c1e-9a7d-4e5f-8b6c-1a2b3c4d5e6f'), true);
  assert.equal(belirtecGecerli('ab"><script>'), false);
  assert.equal(belirtecGecerli(null), false);
  assert.equal(belirtecGecerli('kisa'), false);
});

test('durumYolu: abonenin diline göre bülten sayfası', () => {
  assert.equal(durumYolu('tr', 'onaylandi'), '/tr/bulten/?durum=onaylandi');
  assert.equal(durumYolu('en', 'kontrol'), '/en/newsletter/?durum=kontrol');
});

test('isoHafta: ISO hafta anahtarı, yıl sınırlarında doğru', () => {
  assert.equal(isoHafta(new Date('2026-10-19T06:00:00Z')), '2026-W43');
  assert.equal(isoHafta(new Date('2024-12-30T12:00:00Z')), '2025-W01');
  assert.equal(isoHafta(new Date('2027-01-01T00:00:00Z')), '2026-W53');
  assert.equal(isoHafta(new Date('2026-01-05T00:00:00Z')), '2026-W02');
});

test('utmEkle ve bultenUtm: parametreleri ekler, mevcut sorguyu korur', () => {
  assert.equal(
    utmEkle('https://jendume.com/tr/haber/x/?a=1', bultenUtm('2026-W43')),
    'https://jendume.com/tr/haber/x/?a=1&utm_source=bulten&utm_medium=email&utm_campaign=haftalik-2026-W43',
  );
});

test('htmlKacis: HTML özel karakterlerini kaçırır', () => {
  assert.equal(htmlKacis(`<a href="x">'&'</a>`), '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;');
});

test('onayEpostasi: iki dilde, bağlantı içerir ve özgün metin', () => {
  const tr = onayEpostasi('tr', 'https://jendume.com/api/bulten/onay?t=abc');
  const en = onayEpostasi('en', 'https://jendume.com/api/bulten/onay?t=abc');
  assert.match(tr.subject, /onaylayın/);
  assert.match(en.subject, /Confirm/);
  assert.match(tr.html, /api\/bulten\/onay\?t=abc/);
  assert.match(en.text, /https:\/\/jendume\.com\/api\/bulten\/onay\?t=abc/);
});

test('bultenEpostasi: bağlantılar UTM taşır, ayrılma bağlantısı UTM taşımaz ve iki sürüm vardır', () => {
  const haberler = [
    { baslik: 'Örnek haber', ozet: 'Kısa özet.', url: 'https://jendume.com/tr/haber/ornek/', tarih: '2026-10-18T06:00:00.000Z' },
  ];
  const ayril = 'https://jendume.com/api/bulten/ayril?t=3f2b8c1e-9a7d-4e5f-8b6c-1a2b3c4d5e6f';
  const e = bultenEpostasi({ dil: 'tr', hafta: '2026-W43', haberler, ayrilmaLinki: ayril });
  assert.equal(e.subject, 'JEN DUME haftalık bülten · 2026-W43');
  assert.match(e.html, /utm_campaign=haftalik-2026-W43/);
  assert.match(e.text, /utm_campaign=haftalik-2026-W43/);
  assert.ok(e.html.includes(ayril), 'ayrılma bağlantısı HTML içinde');
  assert.ok(!ayril.includes('utm_'));
  assert.ok(e.text.includes(ayril));
  const en = bultenEpostasi({ dil: 'en', hafta: '2026-W43', haberler, ayrilmaLinki: ayril });
  assert.match(en.subject, /weekly bulletin/);
  assert.match(en.html, /End bulletin subscription/);
  assert.match(en.text, /utm_source=bulten/);
});

test('bultenEpostasi: haber başlığındaki HTML kaçırılır', () => {
  const e = bultenEpostasi({
    dil: 'tr',
    hafta: '2026-W43',
    haberler: [{ baslik: '<img src=x onerror=1>', ozet: 'o', url: 'https://jendume.com/tr/haber/a/', tarih: '2026-10-18T00:00:00Z' }],
    ayrilmaLinki: 'https://jendume.com/api/bulten/ayril?t=abcdefgh',
  });
  assert.ok(!e.html.includes('<img src=x'));
  assert.ok(e.html.includes('&lt;img src=x onerror=1&gt;'));
});
