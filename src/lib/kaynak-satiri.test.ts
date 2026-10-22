import test from 'node:test';
import assert from 'node:assert/strict';
import { medyaKaynakli } from './kaynak-satiri.mjs';

test('medyaKaynakli: yalnız kaynak izi dolu, resmî kaynağı olmayan bot haberi', () => {
  assert.equal(medyaKaynakli({ kaynakIzi: 'x', kaynaklar: [] }), true);
  assert.equal(medyaKaynakli({ kaynakIzi: 'x', kaynaklar: [{ ad: 'a', url: 'https://a.gov' }] }), false);
  assert.equal(medyaKaynakli({ kaynaklar: [] }), false);
  assert.equal(medyaKaynakli({ kaynakIzi: 'x', kaynaklar: [], category: 'gunluk-bulten' }), false);
  assert.equal(medyaKaynakli({ kaynakIzi: 'x', kaynaklar: [], yaziTuru: 'aciklayici' }), false);
  assert.equal(medyaKaynakli({ kaynakIzi: 'x', kaynaklar: [], uretim: 'yazi-isleri' }), false);
});
