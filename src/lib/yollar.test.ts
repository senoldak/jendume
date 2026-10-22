import { test } from 'node:test';
import assert from 'node:assert/strict';
import { haberYolu, kategoriYolu, hakkimizdaYolu, karsiYol, kategoriKimligi, KATEGORI_EN } from './yollar.mjs';

test('İngilizce sayfalar İngilizce, Türkçe sayfalar Türkçe yol parçası kullanır; haber kimliği değişmez', () => {
  assert.equal(haberYolu('tr', 'ornek-haber'), '/tr/haber/ornek-haber/');
  assert.equal(haberYolu('en', 'ornek-haber'), '/en/news/ornek-haber/');
  assert.equal(kategoriYolu('tr', 'yapay-zeka'), '/tr/kategori/yapay-zeka/');
  assert.equal(kategoriYolu('en', 'yapay-zeka'), '/en/category/ai/');
  assert.equal(hakkimizdaYolu('en'), '/en/about/');
  assert.equal(kategoriKimligi('en', 'world'), 'dunya');
  assert.equal(kategoriKimligi('tr', 'world'), undefined);
  // EN bölüm parçaları tekil ve ASCII.
  const parcalar = Object.values(KATEGORI_EN);
  assert.equal(new Set(parcalar).size, parcalar.length);
  for (const p of parcalar) assert.match(p, /^[a-z-]+$/);
});

test('karsiYol yolu öteki dile çevirir (sayfalı bölüm dahil)', () => {
  assert.equal(karsiYol('/tr/haber/x/', 'en'), '/en/news/x/');
  assert.equal(karsiYol('/en/category/ai/2/', 'tr'), '/tr/kategori/yapay-zeka/2/');
  assert.equal(karsiYol('/en/about/', 'tr'), '/tr/hakkimizda/');
  assert.equal(karsiYol('/tr/', 'en'), '/en/');
  assert.equal(karsiYol('/tr/rss.xml', 'en'), '/en/rss.xml');
});

test('public/_redirects: dinamik kurallar dosyanın sonunda, sınırların altında; eski EN yolları yönleniyor', async () => {
  const fs = await import('node:fs');
  const satirlar = fs
    .readFileSync(new URL('../../public/_redirects', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith('#'));
  const dinamik = (s: string) => /[*:]/.test(s.split(/\s+/)[0]);
  const ilkDinamik = satirlar.findIndex(dinamik);
  assert.ok(ilkDinamik >= 0);
  assert.ok(satirlar.slice(ilkDinamik).every(dinamik), 'dinamik kuraldan sonra statik kural olmamalı');
  assert.ok(satirlar.filter(dinamik).length <= 100);
  assert.ok(satirlar.length <= 2000);
  assert.ok(satirlar.includes('/en/haber/* /en/news/:splat 301'));
  for (const [tr, en] of Object.entries(KATEGORI_EN)) {
    assert.ok(satirlar.includes(`/en/kategori/${tr}/* /en/category/${en}/:splat 301`), tr);
  }
});

test('konu ve sözlük yolları; sözlük terimi öteki dilde kendi slug’ına çevrilir', async () => {
  const { konuYolu, terimYolu, sozlukYolu, konuDiziniYolu } = await import('./yollar.mjs');
  assert.equal(konuYolu('tr', 'openai'), '/tr/konu/openai/');
  assert.equal(konuYolu('en', 'openai'), '/en/topic/openai/');
  assert.equal(konuDiziniYolu('en'), '/en/topic/');
  assert.equal(sozlukYolu('tr'), '/tr/sozluk/');
  assert.equal(terimYolu('tr', 'context-window'), '/tr/sozluk/baglam-penceresi/');
  assert.equal(terimYolu('en', 'context-window'), '/en/glossary/context-window/');
  assert.equal(karsiYol('/tr/sozluk/baglam-penceresi/', 'en'), '/en/glossary/context-window/');
  assert.equal(karsiYol('/en/topic/claude/2/', 'tr'), '/tr/konu/claude/2/');
});

test('şikâyet ve standartlar raporu yolları dil eşlemesiyle çevrilir', () => {
  assert.equal(karsiYol('/tr/sikayet/', 'en'), '/en/complaints/');
  assert.equal(karsiYol('/en/standards-report/', 'tr'), '/tr/standartlar-raporu/');
});

test('yazar sayfası yolu dile göre değişir, slug aynı kalır', async () => {
  const { yazarYolu } = await import('./yollar.mjs');
  assert.equal(yazarYolu('tr'), '/tr/yazar/senol-dak/');
  assert.equal(yazarYolu('en'), '/en/author/senol-dak/');
  assert.equal(karsiYol('/tr/yazar/senol-dak/', 'en'), '/en/author/senol-dak/');
  assert.equal(karsiYol('/en/author/senol-dak/', 'tr'), '/tr/yazar/senol-dak/');
});
