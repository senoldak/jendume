import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ozetKapakSvg } from './ozet.ts';

const GUN = [
  'OpenAI, Daybreak markasıyla siber güvenlik pazarına girdi',
  'Cerebras Microsoft ile bulut ortaklığı kurduğunu ve gelir beklentisini artırdığını açıkladı',
  'Llama.cpp ve ggml v1.0.0 sürümleriyle yerel yapay zekâ altyapısını güçlendiriyor',
  'Google, yapay zekâ ajanlarındaki hataları tespit eden AQuA aracını açık kaynaklı hale getirdi',
  'Alliance for Secure AI ve sivil toplum kuruluşları beş teknoloji devine dava açtı',
];
const oz = (s: string, ad: string) => s.match(new RegExp(`data-${ad}="([^"]*)"`))?.[1] ?? '';
const basliklar = (s: string): string[] => JSON.parse(oz(s, 'basliklar').replaceAll('&quot;', '"').replaceAll('&amp;', '&'));

test('ozetKapakSvg: 1200×675, kimlik, en çok 4 başlık, kalan, kesme yok, liste logoya değmez', () => {
  const s = ozetKapakSvg({ tarih: '13 Kasım 2026', basliklar: GUN, toplam: 32 });
  assert.match(s, /width="1200" height="675"/);
  assert.ok(s.includes('#f4f5f2') && s.includes('<circle cx="1130" cy="40" r="230" fill="#00924a"/>'));
  assert.ok(!/<text/.test(s));
  const b = basliklar(s);
  assert.ok(b.length >= 2 && b.length <= 4, String(b.length));
  for (const x of b) assert.ok(GUN.includes(x), x);
  assert.equal(Number(oz(s, 'kalan')), 32 - b.length);
  assert.ok(Number(oz(s, 'madde-alt')) + 20 <= Number(oz(s, 'alt-ust')));
});

test('ozetKapakSvg: iki satıra sığmayan başlık kapağa girmez', () => {
  const dev = 'Çok uzun bir başlık '.repeat(10).trim();
  const s = ozetKapakSvg({ tarih: '13 Kasım 2026', basliklar: [dev, GUN[0]], toplam: 2 });
  assert.deepEqual(basliklar(s), [GUN[0]]);
  assert.equal(oz(s, 'kalan'), '1');
});
