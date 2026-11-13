import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ozetKayitlari, ozetGunu } from './gunun-ozeti.ts';

const kayit = (tarih: string, kimlikler: string[] = []) => ({ tarih, paragraf: 'P.', kimlikler, yazan: 'gemini' as const, olusturma: `${tarih}T17:45:00Z` });
const p = (id: string, iso: string, category = 'yapay-zeka') => ({ id, data: { title: `Başlık ${id}`, date: new Date(iso), category } });

test('ozetKayitlari: en yeni önce', () => {
  const m = { a: kayit('2026-11-12'), b: kayit('2026-11-13') };
  assert.deepEqual(ozetKayitlari(m).map((k) => k.tarih), ['2026-11-13', '2026-11-12']);
});

test('ozetGunu: İstanbul günü, bülten ayrımı, kapak sırası, toplam', () => {
  const posts = [
    p('c', '2026-11-13T17:50:00Z'),
    p('b', '2026-11-13T11:50:00Z'),
    p('sabah-bulteni-13-kasim', '2026-11-13T06:00:00Z', 'gunluk-bulten'),
    p('a', '2026-11-12T21:30:00Z'), // İstanbul 13 Kasım 00:30
    p('dun', '2026-11-12T20:30:00Z'), // İstanbul 12 Kasım 23:30
  ];
  const g = ozetGunu(posts, kayit('2026-11-13', ['c']));
  assert.equal(g.baslik, 'Günün Özeti · 13 Kasım 2026');
  assert.deepEqual(g.haberler.map((x) => x.id), ['c', 'b', 'a']);
  assert.deepEqual(g.bultenler.map((x) => x.id), ['sabah-bulteni-13-kasim']);
  assert.deepEqual(g.kapakBasliklari, ['Başlık c', 'Başlık a', 'Başlık b']);
  assert.equal(g.toplam, 3);
});
