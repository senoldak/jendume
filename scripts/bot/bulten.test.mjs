import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { calistir, donemSec, onBilgi, bultenMetni, bultenBasligi, DONEMLER } from './bulten.mjs';

// bulten.mjs'in console.log satırları (CI günlüğü için) testte susturulur: alt süreçte stdout'a düşen düz metin
// node test koşucusunun v8 akışına karışır; "Bülten…" gibi 3. baytı ≥0x80 olan satır bir mesajın hemen ardından
// aynı okuma parçasına düşerse koşucu onu ileti boyu sanar ve dosya "Unable to deserialize cloned data" ile düşer.
mock.method(console, 'log', () => {});

const simdi = new Date('2026-10-14T11:00:00+03:00');

async function kok() {
  const k = await mkdtemp(path.join(os.tmpdir(), 'jendume-bulten-'));
  for (const d of ['tr', 'en']) await mkdir(path.join(k, 'src/content/haberler', d), { recursive: true });
  return k;
}

async function haber(k, dil, slug, { date, category = 'dunya', draft = false } = {}) {
  const md = `---
lang: ${dil}
title: "${slug} başlığı"
description: "Açıklama metni burada yer alıyor."
category: ${category}
date: ${date}
draft: ${draft}
---

Gövde.
`;
  await writeFile(path.join(k, 'src/content/haberler', dil, `${slug}.md`), md, 'utf8');
}

const var_ = (p) => access(p).then(() => true, () => false);

test('donemSec Türkiye saatine göre sabah, öğle, akşam seçer', () => {
  assert.equal(donemSec(new Date('2026-10-14T06:00:00+03:00')), 'sabah');
  assert.equal(donemSec(new Date('2026-10-14T14:00:00+03:00')), 'ogle');
  assert.equal(donemSec(new Date('2026-10-14T21:00:00+03:00')), 'aksam');
});

test('onBilgi tırnaklı ve düz alanları okur', () => {
  const d = onBilgi('---\ntitle: "Merhaba \\"dünya\\""\ncategory: dunya\ndraft: false\n---\n');
  assert.equal(d.title, 'Merhaba "dünya"');
  assert.equal(d.category, 'dunya');
  assert.equal(d.draft, 'false');
});

test('yeterli haber varsa TR ve EN bülten yazar', async () => {
  const k = await kok();
  await haber(k, 'tr', 'a-haber', { date: '2026-10-14T07:30:00.000Z' });
  await haber(k, 'tr', 'b-haber', { date: '2026-10-14T06:30:00.000Z' });
  await haber(k, 'en', 'a-haber', { date: '2026-10-14T07:30:00.000Z' });
  await haber(k, 'en', 'b-haber', { date: '2026-10-14T06:30:00.000Z' });
  const slug = await calistir({ simdi, donem: 'ogle', kok: k });
  assert.match(slug, /^ogle-bulteni-14-ekim$/);
  const tr = await readFile(path.join(k, 'src/content/haberler/tr', `${slug}.md`), 'utf8');
  const en = await readFile(path.join(k, 'src/content/haberler/en', `${slug}.md`), 'utf8');
  assert.match(tr, /lang: tr/);
  assert.match(tr, /category: gunluk-bulten/);
  assert.match(tr, /title: "Yapay Zekâ Öğle Bülteni — 14 Ekim 2026"/);
  assert.match(en, /lang: en/);
  assert.match(en, /title: "AI Afternoon Bulletin — 14 October 2026"/);
  assert.match(en, /\(\/en\/news\/a-haber\/\)/);
});

test('bir haberden az ise bülten yazılmaz', async () => {
  const k = await kok();
  await haber(k, 'tr', 'tek-haber', { date: '2026-10-14T09:00:00.000Z' });
  await haber(k, 'en', 'tek-haber', { date: '2026-10-14T09:00:00.000Z' });
  assert.equal(await calistir({ simdi, donem: 'ogle', kok: k }), null);
});

test('son bültenden önceki haberler ve bülten yazıları bültene girmez', async () => {
  const k = await kok();
  await haber(k, 'tr', 'eski-1', { date: '2026-10-14T05:00:00.000Z' });
  await haber(k, 'tr', 'eski-2', { date: '2026-10-14T05:10:00.000Z' });
  await haber(k, 'tr', 'onceki-bulten', { date: '2026-10-14T06:00:00.000Z', category: 'gunluk-bulten' });
  await haber(k, 'en', 'eski-1', { date: '2026-10-14T05:00:00.000Z' });
  await haber(k, 'en', 'eski-2', { date: '2026-10-14T05:10:00.000Z' });
  assert.equal(await calistir({ simdi, donem: 'ogle', kok: k }), null);
});

test('taslak ve 24 saatten eski haberler alınmaz', async () => {
  const k = await kok();
  await haber(k, 'tr', 'taslak-1', { date: '2026-10-14T09:00:00.000Z', draft: true });
  await haber(k, 'tr', 'taslak-2', { date: '2026-10-14T09:00:00.000Z', draft: true });
  await haber(k, 'tr', 'cok-eski', { date: '2026-10-10T09:00:00.000Z' });
  assert.equal(await calistir({ simdi, donem: 'ogle', kok: k }), null);
});

test('aynı bülten ikinci kez yazılmaz', async () => {
  const k = await kok();
  await haber(k, 'tr', 'a-haber', { date: '2026-10-14T07:30:00.000Z' });
  await haber(k, 'tr', 'b-haber', { date: '2026-10-14T06:30:00.000Z' });
  await haber(k, 'en', 'a-haber', { date: '2026-10-14T07:30:00.000Z' });
  await haber(k, 'en', 'b-haber', { date: '2026-10-14T06:30:00.000Z' });
  await calistir({ simdi, donem: 'ogle', kok: k });
  assert.equal(await calistir({ simdi, donem: 'ogle', kok: k }), null);
});

test('bultenMetni sabah bülteni TR başlığını doğru üretir', () => {
  const { slug, md } = bultenMetni({
    donem: 'sabah',
    dil: 'tr',
    simdi,
    haberler: [{ slug: 'x-haber', title: 'X haber' }],
  });
  assert.equal(slug, 'sabah-bulteni-14-ekim');
  assert.match(md, /title: "Yapay Zekâ Sabah Bülteni — 14 Ekim 2026"/);
});

test('bülten başlıkları tarih ve yılla her dönem ve dilde tektir', () => {
  const basliklar = new Set();
  for (const gun of ['2026-10-14T12:00:00+03:00', '2026-10-15T12:00:00+03:00', '2027-10-14T12:00:00+03:00']) {
    for (const donem of Object.keys(DONEMLER)) {
      for (const dil of ['tr', 'en']) basliklar.add(bultenBasligi(donem, dil, new Date(gun)));
    }
  }
  assert.equal(basliklar.size, 3 * 3 * 2);
  assert.equal(bultenBasligi('aksam', 'en', new Date('2026-10-14T21:00:00+03:00')), 'AI Evening Bulletin — 14 October 2026');
});

test('var_ yardımcısı dosya yokken false döner', async () => {
  const k = await kok();
  assert.equal(await var_(path.join(k, 'yok.md')), false);
});

test('ileri tarihli haber bültene girmez; EN karşılığı ileri tarihliyse EN bültene girmez', async () => {
  const k = await kok();
  await haber(k, 'tr', 'a-haber', { date: '2026-10-14T07:30:00.000Z' });
  await haber(k, 'tr', 'b-haber', { date: '2026-10-14T06:30:00.000Z' });
  await haber(k, 'tr', 'c-haber', { date: '2026-10-14T06:00:00.000Z' });
  await haber(k, 'tr', 'ileri-haber', { date: '"2026-10-14T12:00:00+03:00"' });
  await haber(k, 'en', 'a-haber', { date: '2026-10-14T07:30:00.000Z' });
  await haber(k, 'en', 'b-haber', { date: '2026-10-14T06:30:00.000Z' });
  // TR yayında, EN karşılığı ileri tarihli: EN bülten bu habere bağlanmamalı.
  await haber(k, 'en', 'c-haber', { date: '2026-10-14T09:00:00.000Z' });
  await haber(k, 'en', 'ileri-haber', { date: '"2026-10-14T12:00:00+03:00"' });
  const slug = await calistir({ simdi, donem: 'ogle', kok: k });
  assert.ok(slug);
  const tr = await readFile(path.join(k, 'src/content/haberler/tr', `${slug}.md`), 'utf8');
  const en = await readFile(path.join(k, 'src/content/haberler/en', `${slug}.md`), 'utf8');
  assert.match(tr, /\/tr\/haber\/c-haber\//);
  assert.doesNotMatch(tr, /ileri-haber/);
  assert.match(en, /\/en\/news\/a-haber\//);
  assert.doesNotMatch(en, /c-haber|ileri-haber/);
});

test('ileri tarihli bülten "son bülten" sayılmaz, yeni haberleri yutmaz', async () => {
  const k = await kok();
  await haber(k, 'tr', 'a-haber', { date: '2026-10-14T07:30:00.000Z' });
  await haber(k, 'tr', 'b-haber', { date: '2026-10-14T06:30:00.000Z' });
  await haber(k, 'en', 'a-haber', { date: '2026-10-14T07:30:00.000Z' });
  await haber(k, 'en', 'b-haber', { date: '2026-10-14T06:30:00.000Z' });
  await haber(k, 'tr', 'planli-bulten', { date: '2026-10-14T15:00:00.000Z', category: 'gunluk-bulten' });
  const slug = await calistir({ simdi, donem: 'ogle', kok: k });
  assert.ok(slug);
  const tr = await readFile(path.join(k, 'src/content/haberler/tr', `${slug}.md`), 'utf8');
  assert.match(tr, /\/tr\/haber\/a-haber\//);
});
