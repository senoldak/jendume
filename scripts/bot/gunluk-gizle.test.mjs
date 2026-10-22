import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gunlukSatiri, medyaAdlariniKur, medyaGizle, medyaKontrol } from './denetci.mjs';

medyaAdlariniKur(['haber.example.com']);

test('medyaKontrol mesajı adı Gemini düzeltmesi için taşır, günlük satırı taşımaz', () => {
  const sorunlar = medyaKontrol('Habere göre haber.example.com dün yazdı.');
  assert.match(sorunlar.join(' | '), /haber\.example\.com/);
  const satir = gunlukSatiri(`  YAYIMLANMADI: ${sorunlar.join(' | ')}`);
  assert.doesNotMatch(satir, /haber\.example\.com/i);
  assert.match(satir, /Yayın kuruluşu adı geçiyor \(\[yayın\]\)/);
});

test('günlük satırı büyük/küçük harf farkında ve adreste de gizler', () => {
  assert.equal(medyaGizle('model gerekçesi: HABER.EXAMPLE.COM aktardı'), 'model gerekçesi: [yayın] aktardı');
  assert.equal(gunlukSatiri('hata: https://haber.example.com/feed/?x=1'), 'hata: [adres]');
});
