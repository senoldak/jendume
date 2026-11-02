import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { elenmeKodlari, turSayilari, gunEkle, istanbulGunu, sayan, gunlukYaz, SAKLA_GUN } from './gunluk-sayilar.mjs';

test('elenmeKodlari: bilinen gerekçeler sabit kod, standart kural başına, bilinmeyen diger', () => {
  assert.deepEqual(elenmeKodlari('düşük haber değeri (42)'), ['dusuk-haber-degeri']);
  assert.deepEqual(elenmeKodlari('kapsam dışı'), ['kapsam-disi']);
  assert.deepEqual(elenmeKodlari('zaten yazıldı (özel ad eşleşmesi)'), ['daha-once-yazildi']);
  assert.deepEqual(elenmeKodlari('metin okunamadı'), ['kaynak-yetersiz']);
  assert.deepEqual(elenmeKodlari('bayat (5 günü geçti)'), ['bayat']);
  assert.deepEqual(elenmeKodlari('3 denemede yazılamadı'), ['yazilamadi']);
  assert.deepEqual(elenmeKodlari('kısa, eş bulunamadı'), ['kisa-es-yok']);
  assert.deepEqual(elenmeKodlari('[TR] rakam kaynakta yok: 42'), ['denetimde-durdu']);
  assert.deepEqual(elenmeKodlari('standart:kirmizi:kaynak-benzerligi,medya-adi @x#y'), ['standart:kaynak-benzerligi', 'standart:medya-adi']);
  assert.deepEqual(elenmeKodlari('Örnek Yayın haberi başka bir olay'), ['diger']);
  assert.deepEqual(elenmeKodlari(undefined), ['diger']);
});

test('turSayilari: kaynak öğeleri sayılır, yazılan benzersiz haber', () => {
  const t = turSayilari({
    bulunan: 9,
    sonuclar: [
      { durum: 'yazildi', slug: 's1' }, { durum: 'yazildi', slug: 's1' }, { durum: 'yazildi', slug: 's2' },
      { durum: 'elendi', gerekce: 'düşük haber değeri (30)' }, { durum: 'elendi', gerekce: 'kapsam dışı' },
      { durum: 'bekliyor', havuzda: true }, { durum: 'bekliyor' },
    ],
  });
  assert.deepEqual(t, { tur: 1, bulunan: 9, degerlendirilen: 5, elenen: { 'dusuk-haber-degeri': 1, 'kapsam-disi': 1 }, yazilan: 2, havuza: 1 });
});

test('gunEkle: aynı gün toplanır (elenen dahil), eski günler düşer', () => {
  const a = turSayilari({ bulunan: 2, sonuclar: [{ durum: 'elendi', gerekce: 'kapsam dışı' }] });
  let d = gunEkle({}, '2026-11-02', a, 't1');
  d = gunEkle(d, '2026-11-02', a, 't2');
  assert.equal(d.guncellendi, 't2');
  assert.equal(d.gunler['2026-11-02'].tur, 2);
  assert.equal(d.gunler['2026-11-02'].bulunan, 4);
  assert.deepEqual(d.gunler['2026-11-02'].elenen, { 'kapsam-disi': 2 });
  const cok = { gunler: Object.fromEntries(Array.from({ length: SAKLA_GUN }, (_, i) => [`2025-${String(i).padStart(4, '0')}`, { tur: 1 }])) };
  const e = gunEkle(cok, '2026-11-02', a, 't3');
  assert.equal(Object.keys(e.gunler).length, SAKLA_GUN);
  assert.ok(e.gunler['2026-11-02'] && !e.gunler['2025-0000']);
});

test('istanbulGunu: gün İstanbul saatine göre döner', () => {
  assert.equal(istanbulGunu(new Date('2026-11-01T21:30:00Z')), '2026-11-02');
  assert.equal(istanbulGunu(new Date('2026-11-01T20:30:00Z')), '2026-11-01');
});

test('sayan: adayları ve sonuçları sayar, hatadaki kısmi sonuçlar dahil', async () => {
  const hata = Object.assign(new Error('dur'), { sonuclar: [{ durum: 'elendi', gerekce: 'bayat (5 günü geçti)' }] });
  const s = sayan({ adaylar: async () => [1, 2, 3], isle: async () => { throw hata; } });
  assert.equal((await s.uyarlayici.adaylar()).length, 3);
  await assert.rejects(s.uyarlayici.isle([]), /dur/);
  assert.deepEqual(s.sayilar().elenen, { bayat: 1 });
  assert.equal(s.sayilar().bulunan, 3);
});

test('gunlukYaz: dosyayı kurar ve ekler; dosyada serbest metin yok', async () => {
  const dosya = path.join(mkdtempSync(path.join(tmpdir(), 'gunluk-')), 'yayin-odasi', 'gunluk.json');
  const sayilar = turSayilari({ bulunan: 1, sonuclar: [{ durum: 'elendi', gerekce: 'Örnek Yayın https://x.example' }] });
  await gunlukYaz(dosya, sayilar, new Date('2026-11-02T10:00:00Z'));
  await gunlukYaz(dosya, sayilar, new Date('2026-11-02T11:00:00Z'));
  const metin = readFileSync(dosya, 'utf8');
  assert.ok(!/Örnek Yayın|example/.test(metin));
  assert.equal(JSON.parse(metin).gunler['2026-11-02'].tur, 2);
  writeFileSync(dosya, '{bozuk');
  await assert.rejects(gunlukYaz(dosya, sayilar), SyntaxError);
});
