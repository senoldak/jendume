import test from 'node:test';
import assert from 'node:assert/strict';
import { gosterilmezleriCikar, onBilgiyeEkle } from './kaynak-adlari-ac.mjs';

// Gerçek yayın adları şifreli listede durur; testler uydurma adlarla çalışır.
const md = (blok) => `---\ntitle: "Deneme"\nkaynakIzi: "v1.x"\n${blok}featured: false\n---\n\nGövde.\n`;
const iki = 'kaynakAdlari:\n  - ad: "Örnek Yayın"\n    url: "https://ornek.example/a"\n  - ad: "Kapalı Yayın"\n    url: "https://kapali.example/b"\n';

test('gosterilmezleriCikar: yalnız gösterilmez yayın çıkar, öteki kalır', () => {
  const r = gosterilmezleriCikar(md(iki), ['Kapalı Yayın (Teknoloji)']);
  assert.equal(r.cikan, 1);
  assert.match(r.metin, /kaynakAdlari:\n  - ad: "Örnek Yayın"\n    url: "https:\/\/ornek\.example\/a"\nfeatured/);
  assert.doesNotMatch(r.metin, /Kapalı Yayın|kapali\.example/);
});

test('gosterilmezleriCikar: liste boşalırsa alan silinir; eşleşme yoksa metin aynı', () => {
  const tek = 'kaynakAdlari:\n  - ad: "Kapalı Yayın"\n    url: "https://kapali.example/b"\n';
  const r = gosterilmezleriCikar(md(tek), ['Kapalı Yayın']);
  assert.equal(r.cikan, 1);
  assert.doesNotMatch(r.metin, /kaynakAdlari/);
  assert.match(r.metin, /kaynakIzi: "v1\.x"\nfeatured: false/);
  assert.deepEqual(gosterilmezleriCikar(md(iki), ['Başka']), { metin: md(iki), cikan: 0 });
  assert.deepEqual(gosterilmezleriCikar(md(iki), []), { metin: md(iki), cikan: 0 });
});

test('onBilgiyeEkle: kaynakIzi altına ekler, var olan alana dokunmaz', () => {
  const eklenen = onBilgiyeEkle(md(''), [{ ad: 'Örnek Yayın', url: 'https://ornek.example/a' }]);
  assert.match(eklenen, /kaynakIzi: "v1\.x"\nkaynakAdlari:\n  - ad: "Örnek Yayın"\n    url: "https:\/\/ornek\.example\/a"\n/);
  assert.equal(onBilgiyeEkle(eklenen, [{ ad: 'X', url: 'https://x.example' }]), eklenen);
});
