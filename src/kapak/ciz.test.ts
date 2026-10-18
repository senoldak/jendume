import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bolumKapakSvg, kapakSvg, logoSvg } from './ciz.ts';

const yazi = { data: { title: 'Kyutai REKI robot kontrolü için hafıza özellikli modeli tanıttı', category: 'yapay-zeka', breaking: false } } as never;

test('kapakSvg 1200×675, kâğıt zemin, büyük yeşil daire, yazı yol olarak çizilir, slogan yok', () => {
  const svg = kapakSvg(yazi, 'tr');
  assert.match(svg, /width="1200" height="675"/);
  assert.ok(svg.includes('#f4f5f2') && svg.includes('<circle cx="1130" cy="40" r="230" fill="#00924a"/>'));
  assert.ok((svg.match(/<path /g) ?? []).length > 60);
  assert.ok(!/<text|jendume\.com|Beyond Words/i.test(svg));
  assert.ok(!/#ffc72c|#c8102e/.test(svg), 'eski sarı ve kırmızı yok');
});

test('kapak tek dillidir: öteki dilde başlık ya da kategori yok', () => {
  const svg = kapakSvg(yazi, 'tr');
  assert.ok(!svg.includes('fill="#5a5d63"'));
});

test('önemli gelişme etiketi yalnız breaking ise mürekkep dolgulu çizilir', () => {
  const b = { data: { ...(yazi as { data: object }).data, breaking: true } } as never;
  assert.ok(kapakSvg(b, 'en').includes('height="34" fill="#16181d"'));
  assert.ok(!kapakSvg(yazi, 'en').includes('height="34" fill="#16181d"'));
});

test('bölüm kapağı aynı tasarımı kullanır', () => {
  assert.match(bolumKapakSvg('teknoloji', 'en'), /width="1200" height="675"/);
});

test('yayıncı logosu 600×60, levha ve yeşil kare', () => {
  const s = logoSvg();
  assert.match(s, /width="600" height="60"/);
  assert.ok(s.includes('fill="#00924a"') && s.includes('fill="#16181d"'));
});
