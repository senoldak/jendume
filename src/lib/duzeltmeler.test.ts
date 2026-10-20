import test from 'node:test';
import assert from 'node:assert/strict';
import { duzeltmeKayitlari, notuAyir } from './duzeltmeler.mjs';

const haber = (id: string, duzeltme?: string) => ({
  id,
  data: { title: `Başlık ${id}`, date: new Date('2026-10-10T08:00:00Z'), duzeltme },
});

test('notuAyir: tarih ve saati ayırır, biçim tutmazsa yedek tarihi kullanır', () => {
  const a = notuAyir('20.10.2026 14:30: Rakam düzeltildi.', new Date('2026-01-01'));
  assert.equal(a.tarih.toISOString(), '2026-10-20T14:30:00.000Z');
  assert.equal(a.metin, 'Rakam düzeltildi.');
  const b = notuAyir('20.10.2026: Ad çıkarıldı.', new Date('2026-01-01'));
  assert.equal(b.tarih.toISOString().slice(0, 10), '2026-10-20');
  const c = notuAyir('Tarihsiz bir düzeltme notu', new Date('2026-01-01'));
  assert.equal(c.tarih.toISOString().slice(0, 10), '2026-01-01');
  assert.equal(c.metin, 'Tarihsiz bir düzeltme notu');
});

test('duzeltmeKayitlari: iki kaynak birleşir, yeniden eskiye sıralanır, notsuz haber girmez', () => {
  const kayitlar = duzeltmeKayitlari(
    [haber('a', '19.10.2026: Birinci düzeltme notu.'), haber('b'), haber('c', '21.10.2026: İkinci düzeltme notu.')],
    [{ tarih: '2026-10-20', ilkYayin: '2026-10-12', konu: { tr: 'Kaldırılan', en: 'Removed' }, neden: { tr: 'neden', en: 'reason' } }],
    'en',
    (id) => `/en/news/${id}/`,
  );
  assert.deepEqual(kayitlar.map((k) => k.tur + ':' + (k.yol ?? k.baslik)), [
    'duzeltme:/en/news/c/',
    'kaldirildi:Removed',
    'duzeltme:/en/news/a/',
  ]);
  assert.equal(kayitlar[1].metin, 'reason');
});

test('duzeltmeKayitlari: kayıt yoksa boş liste', () => {
  assert.deepEqual(duzeltmeKayitlari([haber('x')], [], 'tr', (id) => id), []);
});
