import test from 'node:test';
import assert from 'node:assert/strict';
import { ELENME_METNI, elenmeKodu, topla, yayinOdasiVerisi } from './yayin-odasi.mjs';

const simdi = new Date('2026-11-04T09:00:00Z');
const h = (baslik, iso, uretim) => ({ baslik, url: `/tr/haber/${baslik}/`, tarih: new Date(iso), ...(uretim ? { uretim } : {}) });

test('ELENME_METNI: her kodun iki dilli metni var', () => {
  for (const [k, v] of Object.entries(ELENME_METNI)) assert.ok(v.tr && v.en, k);
  assert.equal(ELENME_METNI.standart.en, 'Stopped by publishing rules');
});

test('elenmeKodu: standart:* tek başlık, bilinmeyen diger', () => {
  assert.equal(elenmeKodu('standart:kirmizi-cizgi'), 'standart');
  assert.equal(elenmeKodu('bayat'), 'bayat');
  assert.equal(elenmeKodu('bilinmeyen'), 'diger');
});

test('topla: elenen kodları katlanır ve toplanır', () => {
  const t = topla([{ bulunan: 5, degerlendirilen: 4, yazilan: 1, elenen: { bayat: 2, 'standart:a': 1 } }, { bulunan: 3, elenen: { 'standart:b': 2, x: 1 } }]);
  assert.equal(t.bulunan, 8);
  assert.deepEqual(t.elenen, { bayat: 2, standart: 3, diger: 1 });
  assert.equal(t.elenenToplam, 6);
});

test('kayıt yoksa sayı alanları null, tahmin yok', () => {
  const v = yayinOdasiVerisi({ haberler: [], gunluk: undefined, dil: 'tr', simdi });
  assert.equal(v.gun, null);
  assert.equal(v.kayitHafta, null);
  assert.equal(v.sonZincir, null);
  assert.equal(v.hafta.length, 7);
  assert.equal(v.haftaToplam, 0);
});

test('son 8 haber, İstanbul günü sayımı, son zincir yazısı', () => {
  const haberler = [
    h('a', '2026-11-04T05:00:00Z'), h('b', '2026-11-03T22:30:00Z'), h('c', '2026-11-03T10:00:00Z', 'yazi-isleri'),
    h('gelecek', '2026-11-05T10:00:00Z'), h('eski', '2026-10-01T10:00:00Z'),
    ...Array.from({ length: 8 }, (_, i) => h(`d${i}`, `2026-10-2${i}T10:00:00Z`)),
  ];
  const v = yayinOdasiVerisi({ haberler, dil: 'tr', simdi });
  assert.equal(v.sonHaberler.length, 8);
  assert.equal(v.sonHaberler[0].baslik, 'a');
  assert.ok(!v.sonHaberler.some((s) => s.baslik === 'gelecek'));
  const g = Object.fromEntries(v.hafta.map((x) => [x.gun, x.yayimlanan]));
  assert.equal(g['2026-11-04'], 2); // a + b (22:30Z = 01:30 İstanbul)
  assert.equal(g['2026-11-03'], 1);
  assert.equal(v.sonZincir.baslik, 'c');
});

test('günlük kayıt: son kayıtlı gün, bugünden ilerisi atlanır, 7 günlük toplam', () => {
  const gunluk = { gunler: {
    '2026-11-02': { bulunan: 10, degerlendirilen: 8, yazilan: 2, elenen: { bayat: 3 } },
    '2026-11-03': { bulunan: 20, degerlendirilen: 15, yazilan: 4, elenen: { 'standart:x': 2, bayat: 1 } },
    '2026-11-09': { bulunan: 99 },
  } };
  const v = yayinOdasiVerisi({ haberler: [], gunluk, dil: 'en', simdi });
  assert.equal(v.gun.gun, '2026-11-03');
  assert.equal(v.gun.bugun, false);
  assert.equal(v.gun.bulunan, 20);
  assert.equal(v.kayitHafta.dahil, 2);
  assert.equal(v.kayitHafta.bulunan, 30);
  assert.deepEqual(v.kayitHafta.elenenListe.map((x) => [x.kod, x.sayi]), [['bayat', 4], ['standart', 2]]);
  assert.equal(v.kayitHafta.elenenListe[1].metin, 'Stopped by publishing rules');
});
