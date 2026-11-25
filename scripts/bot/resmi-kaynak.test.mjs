import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resmiKaynakListesi } from './resmi-kaynak.mjs';

const resmi = { ad: 'OpenAI News', url: 'https://openai.com/index/ornek/', resmi: true };

test('bütün kaynaklar birincilse ad ve bağlantı yazılır, aynı adres bir kez', () => {
  assert.deepEqual(resmiKaynakListesi([resmi, { ...resmi }]), [{ ad: 'OpenAI News', url: 'https://openai.com/index/ornek/' }]);
});

test('karma haberde yalnız birincil kaynaklar yazılır, medya kaynağı yazılmaz', () => {
  const beklenen = [{ ad: 'OpenAI News', url: 'https://openai.com/index/ornek/' }];
  assert.deepEqual(resmiKaynakListesi([resmi, { ad: 'Örnek Gazete', url: 'https://haber.example.com/x' }]), beklenen);
  assert.deepEqual(resmiKaynakListesi([{ ad: 'Örnek', url: 'https://haber.example.com/x', resmi: false }, resmi]), beklenen);
  assert.deepEqual(resmiKaynakListesi([{ ad: 'Örnek', url: 'https://haber.example.com/x' }]), []);
});

test('boş liste, https olmayan ya da adsız kaynak: yazılmaz', () => {
  assert.deepEqual(resmiKaynakListesi([]), []);
  assert.deepEqual(resmiKaynakListesi(undefined), []);
  assert.deepEqual(resmiKaynakListesi([{ ...resmi, url: 'http://openai.com/x' }]), []);
  assert.deepEqual(resmiKaynakListesi([{ ...resmi, ad: '' }]), []);
});
