import { test } from 'node:test';
import assert from 'node:assert/strict';
import { esKimligi, karsiKimlik, eslemeAnahtari } from './es-kimlik.mjs';
import { haberYolu, karsiYol } from './yollar.mjs';

test('esId yoksa karşılık aynı kimliktir; eski haberin yolları değişmez', () => {
  assert.equal(esKimligi('---\ntitle: x\n---\n'), undefined);
  assert.equal(karsiKimlik('eski-haber', undefined), 'eski-haber');
  assert.equal(eslemeAnahtari('en', 'eski-haber', undefined), 'eski-haber');
  assert.equal(karsiYol('/en/news/eski-haber/', 'tr'), '/tr/haber/eski-haber/');
  assert.equal(karsiYol('/tr/haber/eski-haber/', 'en'), '/en/news/eski-haber/');
});

test('esId varsa TR ve EN yolları farklıdır ve karşılıklar doğru bulunur', () => {
  assert.equal(esKimligi('---\nlang: en\nesId: "yeni-haber"\ndate: 2026-10-23\n---\n'), 'yeni-haber');
  assert.equal(esKimligi('---\nesId: new-story\n---\n'), 'new-story');
  const cozucu = (dil: string, id: string) => ({ 'tr/yeni-haber': 'new-story', 'en/new-story': 'yeni-haber' } as Record<string, string>)[`${dil}/${id}`];
  assert.equal(haberYolu('tr', 'yeni-haber'), '/tr/haber/yeni-haber/');
  assert.equal(haberYolu('en', 'new-story'), '/en/news/new-story/');
  assert.equal(karsiYol('/tr/haber/yeni-haber/', 'en', cozucu), '/en/news/new-story/');
  assert.equal(karsiYol('/en/news/new-story/', 'tr', cozucu), '/tr/haber/yeni-haber/');
  assert.equal(eslemeAnahtari('en', 'new-story', 'yeni-haber'), 'yeni-haber');
  assert.equal(eslemeAnahtari('tr', 'yeni-haber', 'new-story'), 'yeni-haber');
});
