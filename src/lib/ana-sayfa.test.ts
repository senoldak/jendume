import { test } from 'node:test';
import assert from 'node:assert/strict';
import { anaSayfaEskileri, ESKI_SINIRI } from './ana-sayfa.mjs';
import { SITE } from './site.ts';

test('ana sayfa eski haber listesi sınırlıdır ve ilk 4 haberi tekrarlamaz', () => {
  const hepsi = Array.from({ length: 560 }, (_, i) => i);
  const eskiler = anaSayfaEskileri(hepsi);
  assert.equal(eskiler.length, ESKI_SINIRI);
  assert.equal(eskiler[0], 4);
  assert.deepEqual(anaSayfaEskileri([1, 2, 3]), []);
});

test('sosyal bağlantılar yalnız https ve bilinen hesaplardır; iletişim etiketi iki dilde var', () => {
  for (const url of Object.values(SITE.social)) assert.match(url, /^https:\/\//);
  assert.equal(SITE.social.telegram, 'https://t.me/jenndume');
  assert.ok(SITE.ui.tr.contact && SITE.ui.en.contact);
});
