import { test } from 'node:test';
import assert from 'node:assert/strict';
import { KONULAR, KONU_EN_AZ, haberKonulari, konuHaberleri } from './konular.ts';

const haber = (id: string, title: string, body = '', category = 'yapay-zeka') => ({
  id,
  body,
  data: { title, description: '', category },
});

test('konu sözlüğü: tekil ASCII slug, geçerli ilgili konu, iki dilde giriş metni', () => {
  const sluglar = new Set(KONULAR.map((k) => k.slug));
  assert.equal(sluglar.size, KONULAR.length);
  for (const k of KONULAR) {
    assert.match(k.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const r of k.ilgili ?? []) assert.ok(sluglar.has(r), `${k.slug} → ${r}`);
    assert.ok(k.giris.tr.length > 60 && k.giris.en.length > 60);
    assert.ok(k.anahtarlar.length + (k.onekler?.length ?? 0) > 0);
  }
});

test('haberKonulari: büyük/küçük harf duyarlı, Türkçe ekli, eş adlı kullanım hariç; bülten konusuz', () => {
  assert.deepEqual(haberKonulari(haber('a', 'OpenAI’ın yeni modeli', 'GPT-5 tanıtıldı.')), ['openai', 'gpt']);
  assert.deepEqual(haberKonulari(haber('b', 'Meta veri ve metadata', 'meta')), ['meta']);
  assert.deepEqual(haberKonulari(haber('c', 'Yapay zekâ ile metaverse', 'Intelligence ve meta')), []);
  assert.deepEqual(haberKonulari(haber('d', 'Amazon ormanlarında yapay zekâ ile izleme', '')), []);
  assert.deepEqual(haberKonulari(haber('e', 'Claude ve OpenAI', '', 'gunluk-bulten')), []);
});

test('konuHaberleri: yalnız en az KONU_EN_AZ haberi olan konular', () => {
  const posts = [
    haber('1', 'Anthropic Claude için yeni araç'),
    haber('2', 'Anthropic yatırım aldı'),
    haber('3', 'Anthropic araştırması'),
    haber('4', 'Nvidia çip'),
  ];
  const h = konuHaberleri(posts);
  assert.equal(KONU_EN_AZ, 3);
  assert.deepEqual([...h.keys()], ['anthropic']);
  assert.deepEqual(h.get('anthropic')!.map((p) => p.id), ['1', '2', '3']);
});
