import test from 'node:test';
import assert from 'node:assert/strict';
import { cevapDogrula, istanbulGunu, EN_COK_BAYT } from './dogrula.mjs';

const J = 'application/json';
test('cevapDogrula: geçerli oy', () => {
  assert.deepEqual(cevapDogrula('{"kimlik":"tr/bir-haber-1","cevap":"evet"}', J), { ok: true, kimlik: 'tr/bir-haber-1', cevap: 'evet' });
  assert.deepEqual(cevapDogrula('{"kimlik":"en/a-story","cevap":"hayir"}', 'application/json; charset=utf-8').ok, true);
});
test('cevapDogrula: geçersiz istekler reddedilir', () => {
  for (const [metin, tur] of [
    ['{"kimlik":"tr/x","cevap":"evet"}', 'text/plain'],
    ['{bozuk', J],
    ['[]', J],
    ['{"kimlik":"de/x","cevap":"evet"}', J],
    ['{"kimlik":"tr/X Y","cevap":"evet"}', J],
    ['{"kimlik":"tr/x","cevap":"belki"}', J],
    [JSON.stringify({ kimlik: 'tr/x', cevap: 'evet', d: 'a'.repeat(EN_COK_BAYT) }), J],
  ]) assert.equal(cevapDogrula(metin, tur).ok, false, metin.slice(0, 40));
});
test('istanbulGunu: gün İstanbul saatine göre', () => {
  assert.equal(istanbulGunu(new Date('2026-11-01T21:30:00Z')), '2026-11-02');
});
