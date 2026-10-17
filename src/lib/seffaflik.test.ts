import test from 'node:test';
import assert from 'node:assert/strict';
import { kaynakTuru, seffaflikVerisi } from './seffaflik.mjs';
import { karsiYol, seffaflikYolu } from './yollar.mjs';

const SIMDI = new Date('2026-10-16T20:00:00Z');

test('kaynakTuru: gizli kod yayın, laboratuvar akışı resmi', () => {
  assert.equal(kaynakTuru('k621881:bd701a3c41fa1e69'), 'yayin');
  assert.equal(kaynakTuru('openai:https://openai.com/x'), 'resmi');
  assert.equal(kaynakTuru('hf-blog:https://huggingface.co/x'), 'resmi');
});

test('seffaflikVerisi: pencere ilk taramadan, türler ve günlük sayılar', () => {
  const gorulen = {
    'k621881:aa': '2026-10-15T08:00:00Z',
    'k9f8e7d:bb': '2026-10-15T09:00:00Z',
    'k621881:cc': '2026-10-16T09:00:00Z',
    'openai:https://x': '2026-10-16T10:00:00Z',
  };
  const haberler = [{ date: new Date('2026-10-16T11:00:00Z') }, { date: new Date('2026-09-01T11:00:00Z') }];
  const v = seffaflikVerisi(haberler, gorulen, { simdi: SIMDI, baslangic: '2026-10-01' });
  assert.equal(v.ilkGun, '2026-10-15');
  assert.equal(v.taranan, 4);
  assert.equal(v.yayinlanan, 1);
  assert.deepEqual(v.yayin, { taranan: 3, kaynak: 2 });
  assert.deepEqual(v.resmi, { taranan: 1, kaynak: 1 });
  assert.deepEqual(v.gunluk, [
    { gun: '2026-10-15', taranan: 2, yayinlanan: 0 },
    { gun: '2026-10-16', taranan: 2, yayinlanan: 1 },
  ]);
});

test('şeffaflık yolu iki dilde ve dil değiştiricide eşlenir', () => {
  assert.equal(seffaflikYolu('tr'), '/tr/seffaflik/');
  assert.equal(seffaflikYolu('en'), '/en/transparency/');
  assert.equal(karsiYol('/tr/seffaflik/', 'en'), '/en/transparency/');
});

test('seffaflikVerisi: bot başlangıcından önceki günler (taşınan haberler) pencereye girmez', () => {
  const v = seffaflikVerisi(
    [{ date: new Date('2026-10-14T10:00:00Z') }, { date: new Date('2026-10-16T10:00:00Z') }],
    { 'k621881:aa': '2026-10-13T08:00:00Z', 'k621881:bb': '2026-10-16T08:00:00Z' },
    { simdi: SIMDI, baslangic: '2026-10-15' },
  );
  assert.equal(v.ilkGun, '2026-10-15');
  assert.equal(v.yayinlanan, 1);
  assert.equal(v.taranan, 1);
});

test('arama yolu iki dilde ve dil değiştiricide eşlenir', async () => {
  const { aramaYolu, aramaDiziniYolu } = await import('./yollar.mjs');
  assert.equal(aramaYolu('tr'), '/tr/arama/');
  assert.equal(aramaYolu('en'), '/en/search/');
  assert.equal(aramaDiziniYolu('en'), '/en/search.json');
  assert.equal(karsiYol('/en/search/', 'tr'), '/tr/arama/');
});
