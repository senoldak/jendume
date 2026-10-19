import test from 'node:test';
import assert from 'node:assert/strict';
import { yayinda, onyuzMaddesiYayinda, yayindakiDiller } from './yayinda.mjs';

const SIMDI = Date.parse('2026-11-14T05:00:00Z');

test('yayinda: geçmiş tarihli yazı yayında', () => {
  assert.equal(yayinda({ date: new Date('2026-11-13T10:00:00Z') }, SIMDI), true);
  assert.equal(yayinda({ draft: false, date: '2026-11-13T10:00:00Z' }, SIMDI), true);
});

test('yayinda: ileri tarihli yazı yayında değil', () => {
  assert.equal(yayinda({ date: new Date('2026-11-15T10:00:00Z') }, SIMDI), false);
  assert.equal(yayinda({ draft: false, date: '2026-11-15T10:00:00Z' }, SIMDI), false);
});

test('yayinda: taslak, tarihi geçmiş olsa da yayında değil', () => {
  assert.equal(yayinda({ draft: true, date: new Date('2026-11-13T10:00:00Z') }, SIMDI), false);
});

test('yayinda: açık ofsetli tarih doğru karşılaştırılır (+03:00 08:00 = 05:00Z)', () => {
  const date = '2026-11-14T08:00:00+03:00';
  assert.equal(yayinda({ date }, SIMDI), true);
  assert.equal(yayinda({ date }, SIMDI - 60_000), false);
  assert.equal(yayinda({ date: new Date(date) }, SIMDI), true);
  assert.equal(yayinda({ date: new Date(date) }, SIMDI - 60_000), false);
});

test('yayinda: ofsetsiz tarih UTC sayılır (zod coerce.date gibi)', () => {
  assert.equal(yayinda({ date: '2026-11-14T05:00:00' }, SIMDI), true);
  assert.equal(yayinda({ date: '2026-11-14T05:00:00' }, SIMDI - 60_000), false);
  assert.equal(yayinda({ date: '2026-11-14' }, Date.parse('2026-11-14T00:00:00Z')), true);
  assert.equal(yayinda({ date: '2026-11-14' }, Date.parse('2026-11-13T23:59:00Z')), false);
});

test('yayinda: geçersiz tarih yayında değil', () => {
  assert.equal(yayinda({ date: 'yarın' }, SIMDI), false);
  assert.equal(yayinda({ date: new Date('') }, SIMDI), false);
});

const md = (onyuz: string) => `---\n${onyuz}\n---\n\nGövde metni.\n`;

test('onyuzMaddesiYayinda: tırnaksız date satırı', () => {
  assert.equal(onyuzMaddesiYayinda(md('title: "A"\ndate: 2026-11-14T08:00:00+03:00'), SIMDI), true);
  assert.equal(onyuzMaddesiYayinda(md('title: "A"\ndate: 2026-11-14T08:00:00+03:00'), SIMDI - 60_000), false);
});

test('onyuzMaddesiYayinda: tırnaklı date satırı', () => {
  assert.equal(onyuzMaddesiYayinda(md('date: "2026-11-14T08:00:00+03:00"'), SIMDI), true);
  assert.equal(onyuzMaddesiYayinda(md('date: "2026-11-14T08:00:00+03:00"'), SIMDI - 60_000), false);
  assert.equal(onyuzMaddesiYayinda(md("date: '2026-11-14T05:00:00Z'"), SIMDI), true);
  assert.equal(onyuzMaddesiYayinda(md("date: '2026-11-14T05:00:00Z'"), SIMDI - 60_000), false);
});

test('onyuzMaddesiYayinda: CRLF satır sonları', () => {
  assert.equal(onyuzMaddesiYayinda('---\r\ntitle: A\r\ndate: 2026-11-13T05:00:00.000Z\r\n---\r\n\r\nGövde\r\n', SIMDI), true);
});

test('onyuzMaddesiYayinda: draft: true ise yayında değil', () => {
  assert.equal(onyuzMaddesiYayinda(md('date: 2026-11-13T05:00:00.000Z\ndraft: true'), SIMDI), false);
  assert.equal(onyuzMaddesiYayinda(md('date: 2026-11-13T05:00:00.000Z\ndraft: false'), SIMDI), true);
});

test('onyuzMaddesiYayinda: date yoksa false', () => {
  assert.equal(onyuzMaddesiYayinda(md('title: "A"'), SIMDI), false);
  assert.equal(onyuzMaddesiYayinda('ön bilgisi olmayan metin', SIMDI), false);
  // Gövdedeki "date:" satırı ön bilgi sayılmaz.
  assert.equal(onyuzMaddesiYayinda('---\ntitle: A\n---\n\ndate: 2026-11-13T05:00:00Z\n', SIMDI), false);
});

const GECMIS = { date: '2026-11-13T10:00:00Z' };
const ILERI = { date: '2026-11-14T08:01:00+03:00' };

test('yayindakiDiller: iki dil de yayında', () => {
  assert.deepEqual(yayindakiDiller({ tr: GECMIS, en: GECMIS }, SIMDI), ['tr', 'en']);
});

test('yayindakiDiller: TR yayında, EN ileri tarihli → yalnız tr', () => {
  assert.deepEqual(yayindakiDiller({ tr: GECMIS, en: ILERI }, SIMDI), ['tr']);
});

test('yayindakiDiller: EN yayında, TR ileri tarihli ya da taslak → yalnız en', () => {
  assert.deepEqual(yayindakiDiller({ tr: ILERI, en: GECMIS }, SIMDI), ['en']);
  assert.deepEqual(yayindakiDiller({ tr: { ...GECMIS, draft: true }, en: GECMIS }, SIMDI), ['en']);
});

test('yayindakiDiller: eksik dil kaydı yayında sayılmaz', () => {
  assert.deepEqual(yayindakiDiller({ tr: GECMIS }, SIMDI), ['tr']);
  assert.deepEqual(yayindakiDiller({ tr: undefined, en: GECMIS }, SIMDI), ['en']);
  assert.deepEqual(yayindakiDiller({ tr: null, en: null }, SIMDI), []);
  assert.deepEqual(yayindakiDiller({}, SIMDI), []);
});

test('yayindakiDiller: vakti gelince ileri tarihli dil de yayına girer', () => {
  assert.deepEqual(yayindakiDiller({ tr: GECMIS, en: ILERI }, SIMDI + 60_000), ['tr', 'en']);
});
