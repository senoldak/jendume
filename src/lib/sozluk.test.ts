import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TERIMLER, terimGecisleri, terimGeciyor, sozlukBaglantilariEkle } from './sozluk.mjs';

const kelime = (s: string) => s.split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length;

test('sözlük verisi: 50–80 terim, tekil kimlik ve slug, geçerli ilgili terimler, 100–250 kelimelik tanımlar', () => {
  assert.ok(TERIMLER.length >= 50 && TERIMLER.length <= 80, `terim sayısı ${TERIMLER.length}`);
  const ids = new Set(TERIMLER.map((t) => t.id));
  assert.equal(ids.size, TERIMLER.length);
  for (const dil of ['tr', 'en'] as const) {
    const sluglar = TERIMLER.map((t) => t[dil].slug);
    assert.equal(new Set(sluglar).size, sluglar.length, `${dil} slug çakışması`);
    for (const s of sluglar) assert.match(s, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
  for (const t of TERIMLER) {
    for (const r of t.ilgili) assert.ok(ids.has(r) && r !== t.id, `${t.id} → ${r}`);
    for (const dil of ['tr', 'en'] as const) {
      const b = t[dil];
      const n = kelime(b.tanim.join(' '));
      assert.ok(n >= 100 && n <= 250, `${t.id}/${dil}: ${n} kelime`);
      assert.ok(b.ozet.length > 0 && b.ozet.length <= 155, `${t.id}/${dil}: özet ${b.ozet.length}`);
      assert.ok(b.ad.trim().length > 0);
      for (const p of b.tanim) assert.doesNotMatch(p, /[<>[\]*_`]/, `${t.id}/${dil}: düz metin olmalı`);
      if (t.bagla) assert.ok(b.esles.length + b.kisaltmaEsles.length > 0, `${t.id}/${dil}: eşleme yok`);
    }
  }
});

test('terim eşleme: Türkçe ekler ve şapkasız yazım eşleşir; başka sözcüklerin içi eşleşmez', () => {
  const ids = (m: string, d: 'tr' | 'en') => terimGecisleri(m, d, { yalnizBaglanan: true }).map((g) => g.id);
  assert.ok(ids('Şirket yeni büyük dil modelini tanıttı.', 'tr').includes('llm'));
  assert.ok(ids('Bu LLM’ler çok enerji harcıyor.', 'tr').includes('llm'));
  assert.ok(terimGeciyor('Modelin bağlam penceresi genişledi.', 'tr', 'context-window'));
  assert.ok(terimGeciyor('The context window grew.', 'en', 'context-window'));
  // Kısaltmalar büyük/küçük harf duyarlıdır ve sözcük içinde eşleşmez.
  assert.ok(!ids('The drag force and the rage.', 'en').includes('rag'));
  assert.ok(!ids('Haber ajansları ve ajanda.', 'tr').includes('ai-agent'));
});

function paragraf(metin: string) {
  return { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', value: metin }] }] } as any;
}

test('bağlantı: her terimin yalnız ilk geçişi, haber başına en fazla 3; başlık ve mevcut bağlantıya dokunulmaz', () => {
  const agac = paragraf(
    'A large language model uses a context window. Another large language model has hallucinations. GPU racks host a transformer architecture with RAG.',
  );
  const baglanan = sozlukBaglantilariEkle(agac, 'en');
  assert.equal(baglanan.length, 3);
  const linkler = agac.children[0].children.filter((c: any) => c.type === 'link');
  assert.equal(linkler.length, 3);
  assert.equal(linkler[0].url, '/en/glossary/large-language-model/');
  assert.equal(linkler[0].children[0].value, 'large language model');
  // Metin kaybolmaz.
  const duz = agac.children[0].children.map((c: any) => (c.type === 'link' ? c.children[0].value : c.value)).join('');
  assert.ok(duz.startsWith('A large language model uses a context window. Another large language model'));

  const agac2 = {
    type: 'root',
    children: [
      { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Büyük dil modelleri' }] },
      { type: 'paragraph', children: [{ type: 'link', url: '/x/', children: [{ type: 'text', value: 'büyük dil modeli' }] }] },
    ],
  } as any;
  assert.deepEqual(sozlukBaglantilariEkle(agac2, 'tr'), []);
});
