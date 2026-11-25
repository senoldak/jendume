import { test } from 'node:test';
import assert from 'node:assert/strict';
import { izdenResmi, onBilgiyeResmiEkle } from './resmi-kaynak-ac.mjs';

const adlar = new Set(['OpenAI News']);
const resmi = { ad: 'OpenAI News', url: 'https://openai.com/index/ornek/' };
const medya = { ad: 'Örnek Gazete', url: 'https://haber.example.com/x' };

test('izdenResmi: yalnız açık birincil kaynaklar, https, aynı adres bir kez', () => {
  assert.deepEqual(izdenResmi([medya, resmi, { ...resmi }], adlar), [resmi]);
  assert.deepEqual(izdenResmi([{ ...resmi, url: 'http://openai.com/x' }, medya], adlar), []);
  assert.deepEqual(izdenResmi(undefined, adlar), []);
});

test('onBilgiyeResmiEkle: kaynakIzi altına blok; karmada işaret; alan varsa dokunmaz', () => {
  const md = '---\ntitle: "X"\nkaynakIzi: "v1.abc"\nfeatured: false\n---\n';
  assert.equal(
    onBilgiyeResmiEkle(md, [resmi], true),
    '---\ntitle: "X"\nkaynakIzi: "v1.abc"\nkaynaklar:\n  - ad: "OpenAI News"\n    url: "https://openai.com/index/ornek/"\nkarmaKaynak: true\nfeatured: false\n---\n',
  );
  assert.doesNotMatch(onBilgiyeResmiEkle(md, [resmi], false), /karmaKaynak/);
  const dolu = md.replace('featured', 'kaynaklar: []\nfeatured');
  assert.equal(onBilgiyeResmiEkle(dolu, [resmi], true), dolu);
  assert.equal(onBilgiyeResmiEkle(md, [], true), md);
});
