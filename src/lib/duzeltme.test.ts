import test from 'node:test';
import assert from 'node:assert/strict';
import { duzeltmeNotu } from './duzeltme.mjs';

test('duzeltmeNotu: alan yoksa null', () => {
  assert.equal(duzeltmeNotu({}, 'tr'), null);
  assert.equal(duzeltmeNotu({ duzeltme: undefined }, 'en'), null);
});

test('duzeltmeNotu: tr yazıda tr etiket ve Düzeltme Politikası ile Düzeltmeler bağlantıları', () => {
  assert.deepEqual(duzeltmeNotu({ duzeltme: '19.10.2026 14:00: Tarih düzeltildi.' }, 'tr'), {
    etiket: 'Düzeltme:',
    metin: '19.10.2026 14:00: Tarih düzeltildi.',
    baglanti: '/tr/duzeltme-politikasi/',
    kayit: '/tr/duzeltmeler/',
  });
});

test('duzeltmeNotu: en yazıda Correction: ve Corrections Policy ile Corrections bağlantıları', () => {
  assert.deepEqual(duzeltmeNotu({ duzeltme: '19.10.2026 14:00: Date corrected.' }, 'en'), {
    etiket: 'Correction:',
    metin: '19.10.2026 14:00: Date corrected.',
    baglanti: '/en/corrections-policy/',
    kayit: '/en/corrections/',
  });
});

test('duzeltmeNotu: 10 karakterden kısa not şemadaki gibi reddedilir', () => {
  assert.equal(duzeltmeNotu({ duzeltme: 'kısa' }, 'tr'), null);
  assert.equal(duzeltmeNotu({ duzeltme: '123456789' }, 'en'), null);
  assert.notEqual(duzeltmeNotu({ duzeltme: '1234567890' }, 'en'), null);
});
