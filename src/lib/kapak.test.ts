import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bolumKapakYolu, haberKapakYolu, kapakliKimlikler } from './kapak.mjs';

test('kapakliKimlikler en yeni haberleri seçer, sıradan bağımsız ve deterministiktir', () => {
  const haberler = [
    { id: 'eski', date: new Date('2026-01-01') },
    { id: 'yeni', date: new Date('2026-10-14') },
    { id: 'orta-b', date: new Date('2026-05-01') },
    { id: 'orta-a', date: new Date('2026-05-01') },
  ];
  assert.deepEqual([...kapakliKimlikler(haberler, 2)], ['yeni', 'orta-a']);
  assert.deepEqual([...kapakliKimlikler([...haberler].reverse(), 2)], ['yeni', 'orta-a']);
  assert.equal(kapakliKimlikler(haberler).size, 4);
});

test('kapak yolları', () => {
  assert.equal(haberKapakYolu('tr', 'bir-haber'), '/kapak/tr/bir-haber.png');
  assert.equal(bolumKapakYolu('en', 'bilim'), '/kapak/en/bolum/bilim.png');
});
