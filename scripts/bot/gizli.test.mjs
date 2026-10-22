// node --test scripts/bot/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import {
  adresiSil,
  coz,
  gizliKaynaklar,
  gizliMedyaAdlari,
  kaynakIzi,
  kaynakKodu,
  ozet,
  sifrele,
  yayinlananAc,
  yayinlananKapat,
} from './gizli.mjs';
import { ucDilliHaberYaz } from './lib.mjs';
import { esKimligi } from '../../src/lib/es-kimlik.mjs';
// EN dosyası kendi başlığından adlanır; adı TR dosyasındaki esId verir (src/lib/es-kimlik.mjs).
async function haberOku(rot, dil, slug) {
  const tr = await readFile(path.join(rot, 'src/content/haberler/tr', `${slug}.md`), 'utf8');
  const ad = dil === 'en' ? esKimligi(tr) ?? slug : slug;
  return readFile(path.join(rot, 'src/content/haberler', dil, `${ad}.md`), 'utf8');
}

const A = Buffer.alloc(32, 1);
const B = Buffer.alloc(32, 2);

test('şifrele/çöz gidiş-dönüş; her şifreleme farklı metin, yanlış anahtar reddedilir', () => {
  const v = [{ ad: 'Örnek', url: 'https://haber.example.com/a' }];
  const s1 = sifrele(v, A);
  assert.match(s1, /^v1\./);
  assert.notEqual(s1, sifrele(v, A));
  assert.deepEqual(coz(s1, A), v);
  assert.throws(() => coz(s1, B));
  assert.ok(!s1.includes('example'));
});

test('kod ve özet: kararlı, anahtara bağlı, adı içermez', () => {
  assert.equal(kaynakKodu('ornek-haber', A), kaynakKodu('ornek-haber', A));
  assert.notEqual(kaynakKodu('ornek-haber', A), kaynakKodu('ornek-haber', B));
  assert.match(kaynakKodu('ornek-haber', A), /^k[0-9a-f]{6}$/);
  assert.match(ozet('https://haber.example.com/a', A), /^[0-9a-f]{16}$/);
});

test('adresiSil hata mesajındaki adresleri siler', () => {
  assert.equal(adresiSil('403 Forbidden: https://haber.example.com/feed?x=1'), '403 Forbidden: [adres]');
});

test('gizliKaynaklar: dosyadan okur, anahtar yoksa boş döner; medya adları eklerinden arınır', () => {
  const dosya = path.join(mkdtempSync(path.join(tmpdir(), 'gizli-')), 'k.sifreli');
  const icerik = {
    kaynaklar: [
      { ad: 'Örnek Haber AI', kisa: 'ornek', akis: 'https://haber.example.com/feed' },
      { ad: 'Deneme Dergisi Yapay Zekâ', kisa: 'deneme', akis: 'https://dergi.example.com/feed', yerli: true },
      { ad: 'Bülten (Örnek Vakfı)', kisa: 'bulten', akis: 'https://bulten.example.com/feed', filtre: true },
    ],
    medya: ['Ek Yayın'],
  };
  writeFileSync(dosya, sifrele(icerik, A));
  assert.deepEqual(gizliKaynaklar({ dosya, a: A }), icerik);
  assert.deepEqual(gizliKaynaklar({ dosya, a: null, uyar: () => {} }), { kaynaklar: [], medya: [] });
  assert.deepEqual(gizliMedyaAdlari(icerik), ['Örnek Haber', 'Deneme Dergisi', 'Bülten', 'Ek Yayın']);
});

test('kaynakIzi: tekilleştirip şifreler, boş listede alan yazılmaz', () => {
  assert.equal(kaynakIzi([]), undefined);
  const iz = kaynakIzi([
    { ad: 'X', url: 'https://x.example.com/1' },
    { ad: 'X', url: 'https://x.example.com/1' },
  ]);
  assert.deepEqual(coz(iz), [{ ad: 'X', url: 'https://x.example.com/1' }]);
});

test('yayın belleği: kaynak başlıkları şifreli saklanır, değişmeyen kayıt yeniden şifrelenmez', () => {
  const kapali = yayinlananKapat({ 'ornek-haber': { zaman: '2026-10-15T00:00:00Z', basliklar: ['Acme raises $10M'] } });
  assert.equal(kapali['ornek-haber'].basliklar, undefined);
  assert.ok(!JSON.stringify(kapali).includes('Acme'));
  const acik = yayinlananAc(kapali);
  assert.deepEqual(acik['ornek-haber'].basliklar, ['Acme raises $10M']);
  assert.equal(yayinlananKapat(acik)['ornek-haber'].basliklarSifreli, kapali['ornek-haber'].basliklarSifreli);
  // Eski biçimdeki (açık) kayıt da okunur.
  assert.deepEqual(yayinlananAc({ eski: { zaman: 't', basliklar: ['b'] } }).eski.basliklar, ['b']);
});

test('ucDilliHaberYaz kaynak izini frontmatter\'a şifreli yazar', async () => {
  const rot = await mkdtemp(path.join(tmpdir(), 'jendume-iz-'));
  try {
    const iz = kaynakIzi([{ ad: 'Örnek Haber', url: 'https://haber.example.com/1' }]);
    const blok = { title: 'Acme yeni modelini tanıttı', description: 'Acme yeni bir model duyurdu ve ayrıntıları paylaştı.', body: 'Gövde.' };
    const slug = await ucDilliHaberYaz(rot, { tr: blok, en: blok, kaynakIzi: iz, date: '2026-10-15T00:00:00Z' });
    for (const dil of ['tr', 'en']) {
      const md = await haberOku(rot, dil, slug);
      const m = md.match(/^kaynakIzi: "([^"]+)"$/m);
      assert.ok(m);
      assert.ok(!md.includes('example'));
      assert.deepEqual(coz(m[1]), [{ ad: 'Örnek Haber', url: 'https://haber.example.com/1' }]);
    }
  } finally {
    await rm(rot, { recursive: true, force: true });
  }
});
