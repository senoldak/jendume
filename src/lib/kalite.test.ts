import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INDEKS_EN_AZ_KELIME, dizinlenir, govdeKelime } from './kalite.mjs';

test('govdeKelime ön bilgiyi, bağlantı adreslerini ve biçim işaretlerini saymaz', () => {
  const md = '---\ntitle: "Başlık burada"\n---\n\n## Ara başlık\n\nBir [bağlantı](https://haber.example.com/uzun-adres) ve - işaret.';
  assert.equal(govdeKelime(md), 6);
});

test('dizinlenir eşiğin altındaki gövdeyi dizin dışı bırakır', () => {
  const metin = (n: number) => Array.from({ length: n }, () => 'kelime').join(' ');
  assert.equal(dizinlenir(metin(INDEKS_EN_AZ_KELIME - 1)), false);
  assert.equal(dizinlenir(metin(INDEKS_EN_AZ_KELIME)), true);
});
