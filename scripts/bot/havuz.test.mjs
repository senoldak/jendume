// Kısa haber havuzu: olayların şifreli saklanması, dilim derlemesi, süre ve tekrar kuralları, uzunluk kuralı.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { uzunlukKontrol } from './denetci.mjs';
import { havuzOlayi, havuzAc, havuzKapat, dilimGruplari, bultenDilimi, dilimEki, dilimBasligiEkle, derlemeEnAz, derlemeKaynagi, havuzuIsle, HAVUZ_SAAT, DERLEME_AZAMI } from './havuz.mjs';

const simdi = new Date('2026-10-16T12:00:00Z'); // 15:00 İstanbul: öğle dilimi sürüyor
const saatOnce = (h) => new Date(simdi.getTime() - h * 3600e3).toISOString();
// Varsayılan giriş 10:00 İstanbul: açılış dilimi, yani bitmiş.
const olay = (id, kategori = 'yapay-zeka', girdi = saatOnce(5)) =>
  havuzOlayi({
    id,
    taslak: { category: kategori, tr: { title: `Başlık ${id}` } },
    basliklar: [`Source title ${id}`],
    kaynaklar: [{ baslik: `Source title ${id}`, tarih: '2026-10-16', metin: `Kaynak metni ${id} `.repeat(400) }],
    kullanilan: [{ ad: 'Haber Sitesi', url: `https://haber.example.com/${id}` }],
    iso: girdi,
  });

const bagimlilik = (ek = {}) => {
  const kaydedilen = [];
  return {
    kaydedilen,
    simdi,
    log: () => {},
    mukerrer: () => null,
    yaz: async (grup) => ({ category: grup[0].kategori, tr: { title: 'Derleme' }, en: { title: 'Roundup' } }),
    denetle: () => [],
    duzelt: async (t) => t,
    standart: (t, grup) => ({ yayin: true, t, grup, s: { karar: 'temiz', gerekce: '' }, atlanan: [] }), // süzgeç testleri: kapi.test.mjs
    kaydet: async (t, grup) => (kaydedilen.push(grup.map((o) => o.id)), `derleme-${kaydedilen.length}`),
    ...ek,
  };
};

test('havuzOlayi: kaynak metnini kırpar, kategori ve TR başlığı taşır', () => {
  const o = olay('a');
  assert.equal(o.kategori, 'yapay-zeka');
  assert.equal(o.baslik, 'Başlık a');
  assert.equal(o.kaynaklar[0].metin.length, 3500);
});

test('havuzKapat: kaynak metni, adı ve adresi durum dosyasına düz girmez; havuzAc geri açar', () => {
  const kapali = havuzKapat([olay('a')]);
  const metin = JSON.stringify(kapali);
  assert.doesNotMatch(metin, /Kaynak metni|haber\.example\.com|Haber Sitesi|Source title/);
  assert.deepEqual(Object.keys(kapali[0]).sort(), ['havuzaGirdi', 'id', 'kategori', 'sifreli']);
  const acik = havuzAc(kapali);
  assert.equal(acik[0].id, 'a');
  assert.equal(acik[0].kullanilan[0].url, 'https://haber.example.com/a');
  // Değişmeyen kayıt yeniden şifrelenmez (dosya farkı küçük kalır).
  assert.equal(havuzKapat(acik)[0].sifreli, kapali[0].sifreli);
});

test('bultenDilimi: İstanbul dilimleri ve gece yarısından sonrası önceki günün kapanışı', () => {
  const d = (iso) => bultenDilimi(new Date(iso)).anahtar;
  assert.equal(d('2026-10-18T03:00:00Z'), '2026-10-18:acilis'); // 06:00
  assert.equal(d('2026-10-18T08:59:00Z'), '2026-10-18:acilis'); // 11:59
  assert.equal(d('2026-10-18T09:00:00Z'), '2026-10-18:ogle'); // 12:00
  assert.equal(d('2026-10-18T15:00:00Z'), '2026-10-18:kapanis'); // 18:00
  assert.equal(d('2026-10-18T22:30:00Z'), '2026-10-18:kapanis'); // 01:30 ertesi gün
  assert.equal(d('2026-10-19T02:59:00Z'), '2026-10-18:kapanis'); // 05:59
});

test('dilimEki: TR ve EN başlık eki', () => {
  assert.deepEqual(dilimEki({ havuzaGirdi: '2026-10-18T10:00:00Z' }), { tr: '18 Ekim, öğle', en: '18 October, midday' }); // 13:00
  assert.equal(dilimEki({ havuzaGirdi: '2026-10-18T04:00:00Z' }).en, '18 October, opening');
  assert.equal(dilimEki({ havuzaGirdi: '2026-10-18T20:00:00Z' }).tr, '18 Ekim, kapanış');
});

test('dilimBasligiEkle: TR ve EN başlıklarına kendi dilinde dilim eki', () => {
  const t = dilimBasligiEkle({ category: 'bilim', tr: { title: 'Yeni modeller', body: 'x' }, en: { title: 'New models', body: 'y' } }, [{ havuzaGirdi: '2026-10-18T10:00:00Z' }]);
  assert.equal(t.tr.title, 'Yeni modeller · 18 Ekim, öğle');
  assert.equal(t.en.title, 'New models · 18 October, midday');
  assert.equal(t.tr.body, 'x');
});

test('dilimGruplari: kategori aranmadan dilime göre tek grup, kategoriler kümelenir', () => {
  const liste = [olay('a', 'bilim'), olay('b', 'ekonomi'), olay('c', 'bilim'), olay('d', 'dunya', saatOnce(20))];
  const { gruplar, artan } = dilimGruplari(liste);
  // d önceki gecenin kapanış diliminde tek başına: artan. Diğer üçü açılış diliminde: tek grup.
  assert.equal(gruplar.length, 1);
  assert.deepEqual(artan.map((o) => o.id), ['d']);
  assert.deepEqual(gruplar[0].map((o) => o.kategori), ['bilim', 'bilim', 'ekonomi']);
});

test('dilimGruplari: farklı dilimler birleşmez; en eski dilim önce', () => {
  const liste = [olay('a'), olay('b'), olay('x', 'bilim', saatOnce(20)), olay('y', 'bilim', saatOnce(20.5))];
  const { gruplar, artan } = dilimGruplari(liste);
  assert.equal(artan.length, 0);
  assert.equal(gruplar.length, 2);
  assert.deepEqual(gruplar[0].map((o) => o.id).sort(), ['x', 'y']);
  assert.deepEqual(gruplar[1].map((o) => o.id).sort(), ['a', 'b']);
});

test('dilimGruplari: DERLEME_AZAMI aşılınca dengeli bölünür, tek olay artmaz', () => {
  const liste = Array.from({ length: DERLEME_AZAMI + 1 }, (_, i) => olay(`x${i}`, 'bilim', saatOnce(5 + i * 0.01)));
  const { gruplar, artan } = dilimGruplari(liste);
  assert.deepEqual(gruplar.map((g) => g.length), [5, 4]);
  assert.equal(artan.length, 0);
  assert.ok(dilimGruplari(liste.slice(0, DERLEME_AZAMI)).gruplar.every((g) => g.length === DERLEME_AZAMI));
});

test('derlemeEnAz: min(üst, max(150, n x 20)), üst TR 180 / EN 200', () => {
  assert.deepEqual(derlemeEnAz(2), { tr: 150, en: 150 });
  assert.deepEqual(derlemeEnAz(8), { tr: 160, en: 160 });
  assert.deepEqual(derlemeEnAz(10), { tr: 180, en: 200 });
  assert.deepEqual(derlemeEnAz(20), { tr: 180, en: 200 });
});

test('derlemeKaynagi: her haber kendi bölümünde', () => {
  const k = derlemeKaynagi([olay('a'), olay('b')]);
  assert.match(k, /### 1\. Başlık a/);
  assert.match(k, /### 2\. Başlık b/);
});

test('havuzuIsle: şimdiki dilimin olayı dilim bitene kadar bekler; dilim bitince kategori aranmadan tek derleme olur', async () => {
  const b = bagimlilik();
  // 14:00 ve 14:30 İstanbul (şimdi 15:00): aynı dilim sürüyor.
  let r = await havuzuIsle([olay('a', 'bilim', saatOnce(1)), olay('b', 'ekonomi', saatOnce(0.5))], b);
  assert.deepEqual(r.yazilan, []);
  assert.equal(r.havuz.length, 2);
  // 19:00 İstanbul: öğle dilimi bitti, farklı kategoriler tek derlemede.
  r = await havuzuIsle(r.havuz, { ...b, simdi: new Date('2026-10-16T16:00:00Z') });
  assert.deepEqual(r.yazilan, ['derleme-1']);
  assert.deepEqual(b.kaydedilen.map((g) => [...g].sort()), [['a', 'b']]);
  assert.deepEqual(r.havuz, []);
});

test('havuzuIsle: dilimde tek kalan olay düşer (jendume bülten satırına düşmez)', async () => {
  const logs = [];
  const r = await havuzuIsle([olay('a')], bagimlilik({ log: (m) => logs.push(m) }));
  assert.deepEqual(r.havuz, []);
  assert.ok(logs.some((m) => /dilimde eş yok/.test(m)));
});

test('havuzuIsle: HAVUZ_SAAT dolan olay düşer', async () => {
  const r = await havuzuIsle([olay('a', 'yapay-zeka', saatOnce(HAVUZ_SAAT)), olay('b', 'bilim', saatOnce(1))], bagimlilik());
  assert.deepEqual(r.havuz.map((o) => o.id), ['b']);
});

test('havuzuIsle: bu arada tam haber olarak yazılan olay düşer', async () => {
  const r = await havuzuIsle([olay('a'), olay('b')], bagimlilik({ mukerrer: (o) => (o.id === 'a' ? 'aynı hikâye' : null) }));
  assert.deepEqual(r.yazilan, []);
  assert.deepEqual(r.havuz, []); // b dilimde tek kaldı
});

test('havuzuIsle: bir turda en fazla DERLEME_MAKS derleme; kalan grup havuzda bekler', async () => {
  const b = bagimlilik();
  const liste = [
    olay('a', 'bilim', saatOnce(20)),
    olay('b', 'bilim', saatOnce(20.1)),
    olay('c', 'bilim', saatOnce(5)),
    olay('d', 'bilim', saatOnce(5.1)),
    olay('e', 'bilim', saatOnce(23)),
    olay('f', 'bilim', saatOnce(23.1)),
  ];
  const r = await havuzuIsle(liste, b);
  assert.equal(r.yazilan.length, 2);
  assert.equal(r.havuz.length, 2);
  assert.deepEqual(r.havuz.map((o) => o.id).sort(), ['c', 'd']); // en yeni dilim sona kalır
});

test('havuzuIsle: düzeltme turları sonunda denetimden geçmeyen derleme yayımlanmaz ve grup bir daha denenmez', async () => {
  let duzeltme = 0;
  const b = bagimlilik({ denetle: () => ['[TR] Kaynakta olmayan rakam'], duzelt: async (t) => (duzeltme++, t) });
  const r = await havuzuIsle([olay('a'), olay('b')], b);
  assert.equal(duzeltme, 2);
  assert.deepEqual(b.kaydedilen, []);
  assert.deepEqual(r.havuz, []);
});

test('havuzuIsle: düzeltme sorunu giderirse derleme yazılır', async () => {
  let sorunlu = true;
  const b = bagimlilik({ denetle: () => (sorunlu ? ['[EN] Kaynakta olmayan rakam'] : []), duzelt: async (t) => ((sorunlu = false), t) });
  const r = await havuzuIsle([olay('a'), olay('b')], b);
  assert.deepEqual(r.yazilan, ['derleme-1']);
});

test('havuzuIsle: anahtar/kota hatasında olaylar havuzda kalır ve tur durur', async () => {
  const hata = Object.assign(new Error('403'), { ayar: true });
  const r = await havuzuIsle([olay('a'), olay('b')], bagimlilik({ yaz: async () => { throw hata; } }));
  assert.equal(r.ayarHatasi, hata);
  assert.equal(r.havuz.length, 2);
});

test('havuzuIsle: zaman/Gemini bütçesi bittiyse derleme denenmez, olaylar bekler', async () => {
  const r = await havuzuIsle([olay('a'), olay('b')], bagimlilik({ surVar: () => false }));
  assert.deepEqual(r.yazilan, []);
  assert.equal(r.havuz.length, 2);
});

const paket = (m) => ({ category: 'bilim', tr: { title: 'T', body: m }, en: { title: 'E', body: m } });
const uzun = 'kelime '.repeat(260);
const kisa = 'kelime '.repeat(40);

test('havuzuIsle: kısa derleme, denetimden önce uzatılır', async () => {
  let uzatma = 0;
  const b = bagimlilik({
    yaz: async () => paket(kisa),
    uzat: async () => (uzatma++, paket(uzun)),
    denetle: (t) => uzunlukKontrol(t, derlemeEnAz(2)),
  });
  const r = await havuzuIsle([olay('a'), olay('b')], b);
  assert.equal(uzatma, 1);
  assert.deepEqual(r.yazilan, ['derleme-1']);
});

test('havuzuIsle: yeterli uzunluktaki derleme uzatılmaz', async () => {
  let uzatma = 0;
  const b = bagimlilik({ yaz: async () => paket(uzun), uzat: async (t) => (uzatma++, t) });
  await havuzuIsle([olay('a'), olay('b')], b);
  assert.equal(uzatma, 0);
});

test('havuzuIsle: düzeltme derlemeyi alt sınırın altına indirirse bir kez yeniden uzatılır', async () => {
  let uzatma = 0;
  let denetim = 0;
  const b = bagimlilik({
    yaz: async () => paket(uzun),
    denetle: (t) => (denetim++ === 0 ? ['[TR] Kaynakta olmayan rakam'] : uzunlukKontrol(t, derlemeEnAz(2))),
    duzelt: async () => paket(kisa), // düzeltme sorunlu cümleleri silip kısaltıyor
    uzat: async () => (uzatma++, paket(uzun)),
  });
  const r = await havuzuIsle([olay('a'), olay('b')], b);
  assert.equal(uzatma, 1);
  assert.deepEqual(r.yazilan, ['derleme-1']);
});

test('havuzuIsle: yeniden uzatma da yetmezse yayımlanmaz; günlükte uzatmadan önceki sayı görünür', async () => {
  let uzatma = 0;
  let denetim = 0;
  const logs = [];
  const b = bagimlilik({
    log: (m) => logs.push(m),
    yaz: async () => paket(uzun),
    denetle: (t) => (denetim++ === 0 ? ['[TR] Kaynakta olmayan rakam'] : uzunlukKontrol(t, derlemeEnAz(2))),
    duzelt: async () => paket(kisa),
    uzat: async () => (uzatma++, paket(kisa)),
  });
  const r = await havuzuIsle([olay('a'), olay('b')], b);
  assert.equal(uzatma, 1);
  assert.deepEqual(r.yazilan, []);
  assert.ok(logs.some((m) => /YAYIMLANMADI.*uzatmadan önce 40 TR \/ 40 EN/.test(m)));
});

test('derlemeIstemi: kategori ara başlıkları, her haber ayrı paragraf ve iki dil istenir', async () => {
  const { derlemeIstemi } = await import('./yazar.mjs');
  const grup = [olay('a', 'bilim'), olay('b', 'ekonomi')];
  const istem = derlemeIstemi(grup, derlemeKaynagi(grup));
  assert.match(istem, /2 kısa yapay zekâ haberi/);
  assert.match(istem, /### 1\. Başlık a/);
  assert.match(istem, /Türkçe \(tr\) hem İngilizce \(en\)/);
  assert.match(istem, /## Kategori adı/);
  assert.match(istem, /50-80 kelime/);
  assert.match(istem, /1\. haber: tr "Bilim", en "Science"/);
  assert.match(istem, /2\. haber: tr "Ekonomi", en "Economy"/);
});

test('derlemeKategorisi: en çok haberi olan kategori, eşitlikte ilk', async () => {
  const { derlemeKategorisi } = await import('./yazar.mjs');
  assert.equal(derlemeKategorisi([olay('a', 'bilim'), olay('b', 'ekonomi'), olay('c', 'ekonomi')]), 'ekonomi');
  assert.equal(derlemeKategorisi([olay('a', 'bilim'), olay('b', 'ekonomi')]), 'bilim');
});

test('derlemeUzat: yalnız gövdeleri ve yalnız uzayanları alır; başlıklar korunur', async () => {
  const { derlemeUzat } = await import('./yazar.mjs');
  const t = { category: 'bilim', tr: { title: 'TR başlık', description: 'd', body: 'kısa gövde' }, en: { title: 'EN title', description: 'd', body: 'short body here' } };
  const grup = [olay('a', 'bilim'), olay('b', 'bilim')];
  const kall = async () => ({ tr: { title: 'DEĞİŞTİ', body: 'çok daha uzun bir gövde metni burada' }, en: { title: 'CHANGED', body: 'x' } });
  const y = await derlemeUzat(t, grup, derlemeKaynagi(grup), derlemeEnAz(2), { kall });
  assert.equal(y.tr.title, 'TR başlık');
  assert.equal(y.tr.body, 'çok daha uzun bir gövde metni burada');
  assert.equal(y.en.body, 'short body here'); // kısalan gövde alınmaz
  assert.equal(y.category, 'bilim');
  assert.equal((await derlemeUzat(t, grup, 'k', derlemeEnAz(2), { kall: async () => null })).tr.body, 'kısa gövde');
});

test('dilimGruplari: aynı günün dilimleri gün içi sırayla gelir (öğle kapanıştan önce)', () => {
  const o = (id, havuzaGirdi) => ({ id, kategori: 'yapay-zeka', havuzaGirdi });
  const { gruplar } = dilimGruplari([
    o('k1', '2026-10-18T16:00:00Z'), o('k2', '2026-10-18T16:30:00Z'),
    o('o1', '2026-10-18T10:00:00Z'), o('o2', '2026-10-18T10:30:00Z'),
  ]);
  assert.deepEqual(gruplar.map((g) => g.map((x) => x.id).sort()), [['o1', 'o2'], ['k1', 'k2']]);
});

test('havuzuIsle: yumuşak sorun (uzun başlık) düzeltmeye girer ama derlemeyi düşürmez', async () => {
  const istenen = [];
  const b = bagimlilik({
    simdi: new Date('2026-10-16T16:00:00Z'),
    yumusak: (t) => (t.tr.title.length > 10 ? ['uzun başlık'] : []),
    yaz: async (grup) => ({ category: grup[0].kategori, tr: { title: 'Çok uzun bir derleme başlığı' }, en: { title: 'Roundup' } }),
    duzelt: async (t, k, sorunlar) => (istenen.push(sorunlar), t), // kısaltamıyor
  });
  const r = await havuzuIsle([olay('a', 'bilim', saatOnce(2)), olay('b', 'ekonomi', saatOnce(1.5))], b);
  assert.deepEqual(r.yazilan, ['derleme-1']);
  assert.ok(istenen.length > 0 && istenen.every((s) => s.includes('uzun başlık')));
});

test('baslikUzunlukKontrol: sınırı aşan dil yakalanır', async () => {
  const { baslikUzunlukKontrol } = await import('./denetci.mjs');
  const uzun = 'ABD ve Çin yapay zekâ kısıtlamaları, hastane entegrasyonu ve NVIDIA GTC Berlin donanımları';
  const s = baslikUzunlukKontrol({ tr: { title: uzun }, en: { title: 'OpenAI, IBM and Google announce updates' } });
  assert.equal(s.length, 1);
  assert.match(s[0], /^\[TR\] Başlık 90 karakter/);
});
