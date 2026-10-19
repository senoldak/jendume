import test from 'node:test';
import assert from 'node:assert/strict';
import { duzeltmeNotu } from './duzeltme.mjs';

test('duzeltmeNotu: alan yoksa null', () => {
  assert.equal(duzeltmeNotu({}, 'tr'), null);
  assert.equal(duzeltmeNotu({ duzeltme: undefined }, 'en'), null);
});

test('duzeltmeNotu: tr yazıda tr etiket ve Yayın İlkeleri bağlantısı', () => {
  assert.deepEqual(duzeltmeNotu({ duzeltme: '19.10.2026 14:00: Tarih düzeltildi.' }, 'tr'), {
    etiket: 'Düzeltme:',
    metin: '19.10.2026 14:00: Tarih düzeltildi.',
    baglanti: '/tr/yayin-ilkeleri/',
  });
});

test('duzeltmeNotu: en yazıda Correction: ve Editorial Standards bağlantısı', () => {
  assert.deepEqual(duzeltmeNotu({ duzeltme: '19.10.2026 14:00: Date corrected.' }, 'en'), {
    etiket: 'Correction:',
    metin: '19.10.2026 14:00: Date corrected.',
    baglanti: '/en/editorial-standards/',
  });
});

test('duzeltmeNotu: 10 karakterden kısa not şemadaki gibi reddedilir', () => {
  assert.equal(duzeltmeNotu({ duzeltme: 'kısa' }, 'tr'), null);
  assert.equal(duzeltmeNotu({ duzeltme: '123456789' }, 'en'), null);
  assert.notEqual(duzeltmeNotu({ duzeltme: '1234567890' }, 'en'), null);
});
