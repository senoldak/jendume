import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bolumKapakSvg, kapakSvg } from './ciz.ts';

const yazi = { data: { title: 'Kyutai REKI robot kontrolü için hafıza özellikli modeli tanıttı', category: 'yapay-zeka', breaking: false } } as never;

test('kapakSvg 1200×675 SVG döner, yazı yol olarak çizilir, slogan yoktur', () => {
  const svg = kapakSvg(yazi, 'tr');
  assert.match(svg, /width="1200" height="675"/);
  assert.ok(svg.includes('#ffc72c') && svg.includes('#16181d'));
  assert.ok((svg.match(/<path /g) ?? []).length > 40);
  assert.ok(!/<text|jendume\.com|Beyond Words/i.test(svg));
  assert.ok(!svg.includes('#c8102e'), 'son dakika yoksa kırmızı etiket çizilmez');
});

test('son dakika etiketi yalnız breaking ise çizilir', () => {
  const b = { data: { ...(yazi as { data: object }).data, breaking: true } } as never;
  assert.ok(kapakSvg(b, 'en').includes('#c8102e'));
});

test('bölüm kapağı aynı tasarımı kullanır', () => {
  assert.match(bolumKapakSvg('teknoloji', 'en'), /width="1200" height="675"/);
});
