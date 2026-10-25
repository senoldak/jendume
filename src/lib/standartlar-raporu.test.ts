import test from 'node:test';
import assert from 'node:assert/strict';
import {
  aralikta,
  ceyrekVerisi,
  duzeltmeSayilari,
  kalanElenen,
  kuralAdi,
  kuralSatirlari,
  raporlariSirala,
  sikayetSayilari,
  yayinSayilari,
} from './standartlar-raporu.mjs';

const haber = (date: string, extra: Record<string, unknown> = {}) => ({
  id: date,
  data: { title: `Başlık ${date}`, date: new Date(date), ...extra },
});
const BOS = { haberler: [], kaldirilan: [], sikayetler: [] };

test('çeyrek sınırları İstanbul gününe göre', () => {
  const h = [
    haber('2026-09-30T20:59:00Z'), // 30 Eylül 23:59 İstanbul: dışarıda
    haber('2026-09-30T21:00:00Z'), // 1 Ekim 00:00 İstanbul: içeride
    haber('2026-12-31T20:59:00Z'), // 31 Aralık 23:59: içeride
    haber('2026-12-31T21:00:00Z'), // 1 Ocak 00:00: dışarıda
  ];
  assert.equal(yayinSayilari(h, '2026-10-01', '2026-12-31').otomatik, 2);
  assert.equal(aralikta('2026-10-01', '2026-10-01', '2026-12-31'), true);
  assert.equal(aralikta('2027-01-01', '2026-10-01', '2026-12-31'), false);
});

test('yayinSayilari: otomatik, yayıncının adıyla ve zincir ayrılır', () => {
  const h = [
    haber('2026-10-05T10:00:00Z'),
    haber('2026-10-06T10:00:00Z', { yaziTuru: 'haber' }),
    haber('2026-10-07T10:00:00Z', { yaziTuru: 'aciklayici' }),
    haber('2026-10-08T10:00:00Z', { yaziTuru: 'referans' }),
    haber('2026-10-09T10:00:00Z', { yaziTuru: 'aciklayici', uretim: 'yazi-isleri' }),
    haber('2026-10-10T10:00:00Z', { yaziTuru: 'analiz', uretim: 'yazi-isleri' }),
    haber('2026-10-11T10:00:00Z', { yaziTuru: 'haber', uretim: 'yazi-isleri' }),
  ];
  // İmzalı yazı (açıklayıcı, referans, analiz) zincirden gelse de yayıncının adıyla sayılır; zincir = sahibin olmayan.
  assert.deepEqual(yayinSayilari(h, '2026-10-01', '2026-12-31'), { otomatik: 2, yayinci: 4, zincir: 1 });
});

test('boş veri: hepsi sıfır, çökmez', () => {
  assert.deepEqual(yayinSayilari([], '2026-10-01', '2026-12-31'), { otomatik: 0, yayinci: 0, zincir: 0 });
  assert.deepEqual(yayinSayilari(undefined as any, '2026-10-01', '2026-12-31'), { otomatik: 0, yayinci: 0, zincir: 0 });
  assert.deepEqual(duzeltmeSayilari([], [], '2026-10-01', '2026-12-31'), { duzeltme: 0, kaldirilan: 0 });
  assert.deepEqual(sikayetSayilari([], '2026-10-01', '2026-12-31'), { toplam: 0, yerinde: 0, kismen: 0, yerindeDegil: 0 });
  assert.deepEqual(kuralSatirlari(undefined, 'tr'), []);
  assert.deepEqual(raporlariSirala([]), []);
});

test('duzeltmeSayilari: düzeltme notu ve kaldırma çeyrek içinde sayılır', () => {
  const h = [
    haber('2026-10-10T08:00:00Z', { duzeltme: '20.10.2026: Rakam düzeltildi.' }),
    haber('2026-10-11T08:00:00Z', { duzeltme: '02.01.2027: Çeyrek dışı düzeltme.' }),
    haber('2026-10-12T08:00:00Z'),
  ];
  const kaldirilan = [
    { tarih: '2026-11-03', ilkYayin: '2026-10-30', konu: { tr: 'a', en: 'a' }, neden: { tr: 'n', en: 'n' } },
    { tarih: '2027-01-05', ilkYayin: '2026-12-30', konu: { tr: 'b', en: 'b' }, neden: { tr: 'n', en: 'n' } },
  ];
  assert.deepEqual(duzeltmeSayilari(h, kaldirilan, '2026-10-01', '2026-12-31'), { duzeltme: 1, kaldirilan: 1 });
});

test('sikayetSayilari: karar tarihine göre, sonuç kırılımı toplamla tutarlı', () => {
  const s = [
    { alindi: '2026-10-02', karar: '2026-10-20', sonuc: 'yerinde' as const },
    { alindi: '2026-10-03', karar: '2026-11-01', sonuc: 'kismen' as const },
    { alindi: '2026-10-04', karar: '2026-11-02', sonuc: 'yerinde-degil' as const },
    { alindi: '2026-12-30', karar: '2027-01-10', sonuc: 'yerinde' as const },
  ];
  assert.deepEqual(sikayetSayilari(s, '2026-10-01', '2026-12-31'), { toplam: 3, yerinde: 1, kismen: 1, yerindeDegil: 1 });
});

test('kural adları TR/EN; bilinmeyen kod olduğu gibi', () => {
  assert.equal(kuralAdi('suc', 'tr'), 'suç');
  assert.equal(kuralAdi('suc', 'en'), 'crime');
  assert.equal(kuralAdi('olum-kaza', 'en'), 'deaths and accidents');
  assert.equal(kuralAdi('ozel-haber', 'tr'), 'tek yayının özel haberi');
  assert.equal(kuralAdi('yeni-kural', 'tr'), 'yeni-kural');
  assert.equal(kuralAdi('yeni-kural', 'en'), 'yeni-kural');
});

test('kuralSatirlari: 0 yazılmaz, çoktan aza sıralanır', () => {
  const r = kuralSatirlari({ suc: 3, teror: 0, cocuk: 5, intihar: 3 }, 'tr');
  assert.deepEqual(r.map((x) => [x.kod, x.n]), [['cocuk', 5], ['intihar', 3], ['suc', 3]]);
});

test('kalanElenen = elendi − kirmizi, negatif olmaz', () => {
  assert.equal(kalanElenen(10, 4), 6);
  assert.equal(kalanElenen(3, 5), 0);
  assert.equal(kalanElenen(0, 0), 0);
});

test('raporlariSirala: en yeniden eskiye, girdiyi değiştirmez', () => {
  const a = [{ bas: '2026-10-01' }, { bas: '2027-01-01' }, { bas: '2026-07-01' }];
  assert.deepEqual(raporlariSirala(a).map((x) => x.bas), ['2027-01-01', '2026-10-01', '2026-07-01']);
  assert.equal(a[0].bas, '2026-10-01');
});

test('ceyrekVerisi: toplamlar, defter notu ve kural satırları bir araya gelir', () => {
  const rapor = {
    ceyrek: '2026-c4',
    bas: '2026-10-01',
    son: '2026-12-31',
    defterBaslangici: '2026-10-20',
    yazildi: 100,
    elendi: 40,
    kirmizi: 12,
    sari: 7,
    kurallar: { kirmizi: { suc: 8, teror: 4, cocuk: 0 }, sari: { 'olum-kaza': 5, secim: 2 } },
    geminiCagri: 900,
    kuralDegisiklikleri: null,
  };
  const v = ceyrekVerisi(rapor, { ...BOS, haberler: [haber('2026-11-01T10:00:00Z')] }, 'en');
  assert.equal(v.defterNotu, true);
  assert.equal(v.kalan, 28);
  assert.equal(v.yayin.otomatik, 1);
  assert.deepEqual(v.kirmiziSatirlari.map((x) => x.ad), ['crime', 'terrorism']);
  assert.deepEqual(v.sariSatirlari.map((x) => x.ad), ['deaths and accidents', 'elections']);
  assert.equal(ceyrekVerisi({ ...rapor, defterBaslangici: '2026-10-01' }, BOS).defterNotu, false);
});
