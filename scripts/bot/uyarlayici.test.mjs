import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { adayYuku, adayiKur, gorulmeyen, uyarlayiciKur, yerelTur } from './uyarlayici.mjs';
import { anahtarlar, tamMetin } from './kaynaklar.mjs';
import { ozelAdlar } from './esleme.mjs';
import { havuzOlayi } from './havuz.mjs';
import { motorKimlik } from './motor.mjs';
import { medyaAdlariniKur } from './denetci.mjs';

// Gerçek yayın adları şifreli listede durur; testler uydurma adlarla çalışır.
medyaAdlariniKur(['Örnek Haber', 'Ajans Beta']);
mock.method(console, 'log', () => {});
mock.method(console, 'warn', () => {});

const K1 = { ad: 'Birinci Kaynak', kisa: 'bir', akis: 'https://haber.example.com/bir.xml', etiket: 'kodbir' };
const K2 = { ad: 'Ikinci Kaynak', kisa: 'iki', akis: 'https://haber.example.com/iki.xml', etiket: 'kodiki' };
const KAYNAKLAR = [K1, K2];
const SIMDI = new Date('2026-10-22T09:00:00Z');
const GUN = 86_400_000;
const tarihte = (gunOnce) => new Date(SIMDI.getTime() - gunOnce * GUN).toUTCString();

// Yalnız harflerden oluşan uydurma sözcükler: rakam, zaman ya da kaynak kopyası denetimine takılmaz.
const uydur = (n, tohum, hece = ['mar', 'vel', 'tor', 'kin', 'sul', 'ber', 'dan', 'fil', 'gor', 'hap']) => {
  return Array.from({ length: n }, (_, i) => `${hece[(i * 7 + tohum) % 10]}${hece[(i * 3 + tohum * 2) % 10]}${hece[(i + tohum) % 10]}`).join(' ');
};
const blok = (baslik, n, tohum) => ({
  title: baslik,
  description: `${uydur(12, tohum + 1)}.`,
  bolge: 'Küresel',
  perspektif: `${uydur(10, tohum + 2)}.`,
  body: `${uydur(n, tohum)}.`,
  why_matters: `${uydur(9, tohum + 3)}.`,
  key_points: [],
  rakamlar: [],
});
const taslak = (n = 300, baslik = 'Orionlab yeni kuantum cipini tanitti') => ({
  ayniOlay: true,
  uygun: true,
  neden: '',
  category: 'yapay-zeka',
  breaking: false,
  tr: blok(baslik, n, 1),
  en: blok(`${baslik} again`, n, 4),
});

const oge = (k, id, title, gunOnce = 0.2) => ({
  id: `${k.kisa}:${id}`,
  guid: id,
  link: `https://haber.example.com/${id}`,
  title,
  description: 'ozet',
  pubDate: tarihte(gunOnce),
  kaynak: k,
});
const aday = (o, ek = {}) => ({ kimlik: motorKimlik(o.id), yuk: adayYuku(o), baslik: o.title, ...ek });

const bosDurum = () => ({ gorulen: {}, hatalar: {}, ayrik: {}, taranan: {}, ayni: {}, puan: {}, yayinlanan: {}, havuz: [] });

// Her çağrıyı kaydeden sahte bağımlılıklar; Gemini, ağ ve disk yok.
function kur({ durum = bosDurum(), bag = {}, ayar = {} } = {}) {
  const yazilan = [];
  const cagri = { taslak: 0 };
  const tam = uyarlayiciKur({
    rot: '.',
    durum,
    simdi: SIMDI,
    ayar: { baslangic: Date.now(), sureMs: 60_000, ...ayar },
    bag: {
      KAYNAKLAR,
      sonHaberler: async () => [],
      tamMetin: async (u) => uydur(150, u.id.length + 5, ['pek', 'lum', 'zan', 'rok', 'tis', 'yem', 'cuz', 'oluf', 'nab', 'esk']),
      onbellekliEsle: async () => null,
      onbellekliPuanla: async (basliklar) => basliklar.map(() => 90),
      taslakYaz: async () => {
        cagri.taslak++;
        return taslak();
      },
      duzelt: async (t) => t,
      derlemeYaz: async () => null,
      derlemeUzat: async (t) => t,
      ucDilliHaberYaz: async (_rot, paket) => {
        yazilan.push(paket);
        return `haber-${yazilan.length}`;
      },
      geminiPayiBitti: () => false,
      motorYaz: async () => true,
      ...bag,
    },
  });
  return { u: tam, durum, yazilan, cagri };
}

const sonucu = (sonuclar, o) => sonuclar.find((s) => s.kimlik === motorKimlik(o.id));

test('adayYuku/adayiKur gidiş dönüş aynı öğeyi verir; yükte kaynak adresi yok', () => {
  const o = { ...oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti'), icerik: 'kisa akis icerigi' };
  const yuk = adayYuku(o);
  assert.equal(yuk.kaynak, 'kodbir');
  const geri = adayiKur(yuk, KAYNAKLAR);
  for (const alan of ['id', 'guid', 'link', 'title', 'description', 'icerik', 'pubDate']) assert.deepEqual(geri[alan], o[alan], alan);
  assert.equal(geri.baslik, o.title);
  assert.deepEqual(geri.anahtar, anahtarlar(o.title));
  assert.deepEqual(geri.adlar, ozelAdlar(o.title));
  assert.equal(geri.kaynak, K1);
  assert.equal(geri.tarih.valueOf(), new Date(o.pubDate).valueOf());
  // Kaynağın düz adı ve akış adresi yükte yok; yalnız öğenin kendi bağlantısı (example.com) var.
  const metin = JSON.stringify(yuk);
  assert.ok(!metin.includes('Birinci Kaynak'));
  assert.ok(!metin.includes('bir.xml'));
  const alanAdlari = metin.match(/https?:\/\/([^/"]+)/g).map((a) => a.replace(/^https?:\/\//, ''));
  assert.ok(alanAdlari.every((a) => a.endsWith('example.com')));
});

test('adayiKur: listede olmayan etiket null', () => {
  const yuk = adayYuku(oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti'));
  assert.equal(adayiKur({ ...yuk, kaynak: 'yok-boyle-bir-kod' }, KAYNAKLAR), null);
});

test('isle: yazılan olayın her üyesi yazildi, hiçbirinde yazi yok', async () => {
  const { u, durum, yazilan } = kur();
  const a = oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti');
  const b = oge(K2, 'b1', 'Orionlab yeni kuantum cipini tanitti');
  const sonuclar = await u.isle([aday(a), aday(b)]);
  assert.equal(yazilan.length, 1);
  assert.equal(sonuclar.length, 2);
  // Telegram jendume'de saat'in RSS süpürgesinden gider; adaptör yazi eklemez.
  assert.ok(sonuclar.every((s) => s.yazi === undefined));
  assert.ok(sonuclar.every((s) => s.durum === 'yazildi' && s.slug === 'haber-1'));
  // Karar verilen üyeler isle'de de gorulen'e işaretlenir.
  assert.ok(durum.gorulen[a.id] && durum.gorulen[b.id]);
});

test('isle: havuza alınan olay bekliyor/havuzda; aynı aday sonraki turda eski olarak gelince işlenmez ve havuz büyümez', async () => {
  const { u, durum, cagri } = kur({ bag: { taslakYaz: async () => taslak(120) } });
  const a = oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti');
  const sonuclar = await u.isle([aday(a)]);
  assert.deepEqual(
    { durum: sonucu(sonuclar, a).durum, gerekce: sonucu(sonuclar, a).gerekce, havuzda: sonucu(sonuclar, a).havuzda },
    { durum: 'bekliyor', gerekce: 'havuzda', havuzda: true },
  );
  assert.equal(durum.havuz.length, 1);
  const cagriOnce = cagri.taslak;
  const ikinci = await u.isle([aday(a, { eski: true })]);
  assert.equal(sonucu(ikinci, a), undefined);
  assert.equal(durum.havuz.length, 1);
  assert.equal(cagri.taslak, cagriOnce);
});

test('isle: tek yayının özel haberi (Exclusive:) kısa kalsa da havuza girmez, elenir', async () => {
  const yazilanKayit = [];
  const { u, durum } = kur({
    bag: {
      taslakYaz: async () => taslak(120),
      tamMetin: async () => `Exclusive: ${uydur(150, 9, ['pek', 'lum', 'zan', 'rok', 'tis', 'yem', 'cuz', 'oluf', 'nab', 'esk'])}`,
      motorYaz: async (k) => (yazilanKayit.push(k), true),
    },
  });
  const a = oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti');
  const s = sonucu(await u.isle([aday(a)]), a);
  assert.equal(durum.havuz.length, 0);
  assert.equal(s.durum, 'elendi');
  assert.match(s.gerekce, /ozel-haber/);
  assert.equal(yazilanKayit.length, 1);
});

test('isle: havuzdaki üye taze (eski olmayan) aday olarak gelse de işlenmez, Sonuc dönmez, havuz büyümez', async () => {
  const { u, durum, cagri } = kur({ bag: { taslakYaz: async () => taslak(120) } });
  const a = oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti');
  await u.isle([aday(a)]);
  assert.equal(durum.havuz.length, 1);
  const cagriOnce = cagri.taslak;
  const ikinci = await u.isle([aday(a)]); // eski: yok
  assert.equal(sonucu(ikinci, a), undefined);
  assert.equal(durum.havuz.length, 1);
  assert.equal(cagri.taslak, cagriOnce);
});

test('isle: habere özgü hata Sonuc.hata içinde adres taşımaz', async () => {
  const { u } = kur({ bag: { taslakYaz: async () => { throw new Error('baglanti https://haber.example.com/x?k=1 koptu'); } } });
  const a = oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti');
  const s = sonucu(await u.isle([aday(a)]), a);
  assert.equal(s.durum, 'bekliyor');
  assert.ok(s.hata instanceof Error);
  assert.ok(!s.hata.message.includes('haber.example.com'), s.hata.message);
});

test("isle: havuzdan düşen olay elendi 'kısa, eş bulunamadı'", async () => {
  const durum = bosDurum();
  const iso = new Date(SIMDI.getTime() - 25 * 3600e3).toISOString(); // 24 saati doldu
  const olay = havuzOlayi({ id: 'bir:eski-olay', taslak: taslak(120), basliklar: ['Eski olay basligi'], kaynaklar: [{ baslik: 'b', tarih: '2026-10-21', metin: 'x' }], kullanilan: [], iso });
  durum.havuz.push(olay);
  const { u } = kur({ durum });
  const sonuclar = await u.isle([]);
  assert.deepEqual(sonuclar, [{ kimlik: motorKimlik('bir:eski-olay'), durum: 'elendi', gerekce: 'kısa, eş bulunamadı' }]);
  assert.equal(durum.havuz.length, 0);
  assert.ok(durum.gorulen['bir:eski-olay']);
});

test("isle: 6 günlük eski aday elendi 'bayat (5 günü geçti)'", async () => {
  const { u, cagri } = kur();
  const a = oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti', 6);
  const sonuclar = await u.isle([aday(a, { eski: true })]);
  assert.deepEqual(sonuclar, [{ kimlik: motorKimlik(a.id), durum: 'elendi', gerekce: 'bayat (5 günü geçti)' }]);
  assert.equal(cagri.taslak, 0);
});

test("isle: kaynağı listeden çıkmış eski aday elendi 'kaynak listeden çıkarıldı'", async () => {
  const { u } = kur();
  const a = oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti');
  const yuk = { ...adayYuku(a), kaynak: 'silinmis-kod' };
  const sonuclar = await u.isle([{ kimlik: motorKimlik(a.id), yuk, eski: true }]);
  assert.deepEqual(sonuclar, [{ kimlik: motorKimlik(a.id), durum: 'elendi', gerekce: 'kaynak listeden çıkarıldı' }]);
});

test("isle: ayar hatası fırlatılır, e.sonuclar o ana kadarki yazildi'yi içerir", async () => {
  let n = 0;
  const { u } = kur({
    bag: {
      taslakYaz: async () => {
        if (++n === 2) throw Object.assign(new Error('anahtar gecersiz'), { ayar: true });
        return taslak();
      },
    },
  });
  const a = oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti', 0.1); // daha yeni: önce işlenir
  const b = oge(K1, 'b1', 'Zefirnet baska bir modelini acikladi', 0.3);
  await assert.rejects(
    () => u.isle([aday(a), aday(b)]),
    (e) => {
      assert.equal(e.ayar, true);
      assert.equal(e.sonuclar.length, 1);
      assert.equal(e.sonuclar[0].durum, 'yazildi');
      assert.equal(e.sonuclar[0].kimlik, motorKimlik(a.id));
      return true;
    },
  );
});

test("isle: 3. hatada elendi, öncekilerde bekliyor + hata", async () => {
  const hata = new Error('gecici sorun');
  const a = oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti');
  for (const [onceki, beklenen] of [[0, 'bekliyor'], [1, 'bekliyor'], [2, 'elendi']]) {
    const durum = bosDurum();
    if (onceki) durum.hatalar[a.id] = { sayi: onceki };
    const { u } = kur({ durum, bag: { taslakYaz: async () => { throw hata; } } });
    const sonuclar = await u.isle([aday(a)]);
    const s = sonucu(sonuclar, a);
    assert.equal(s.durum, beklenen, `önceki ${onceki}`);
    assert.equal(durum.hatalar[a.id].sayi, onceki + 1);
    if (beklenen === 'bekliyor') {
      assert.equal(s.hata.message, hata.message);
      assert.equal(durum.gorulen[a.id], undefined);
    } else {
      assert.equal(s.gerekce, '3 denemede yazılamadı');
      assert.ok(durum.gorulen[a.id]);
    }
  }
});

test("yerelTur: bugünkü gibi yalnız karar verilen üyeler gorulen'e işaretlenir; puanlanamayan işaretlenmez", async () => {
  const beslemeler = {
    [K1.akis]: [oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti', 0.1), oge(K1, 'b1', 'Zefirnet baska bir modelini acikladi', 0.3)],
    [K2.akis]: [],
  };
  const durum = bosDurum();
  const eskiGorulen = oge(K1, 'g0', 'Daha once karar verilmis haber basligi');
  durum.gorulen[eskiGorulen.id] = 'x';
  beslemeler[K1.akis].push(eskiGorulen);
  const { u } = kur({
    durum,
    bag: {
      hentTekst: async (akis) => akis,
      rssOku: (akis) => beslemeler[akis].map(({ kaynak, id, ...o }) => o),
      // İlk olay puanlanır (90), ikincisi puanlanamaz (null): bekliyor kalır.
      onbellekliPuanla: async (basliklar) => basliklar.map((_, i) => (i === 0 ? 90 : null)),
    },
  });
  const { sonuclar, ayarHatasi } = await yerelTur(u, durum);
  assert.equal(ayarHatasi, null);
  assert.equal(sonuclar.length, 1);
  assert.equal(sonuclar[0].durum, 'yazildi');
  const kimlikA = `${K1.kisa}:a1`;
  const kimlikB = `${K1.kisa}:b1`;
  assert.ok(durum.gorulen[kimlikA]);
  assert.equal(durum.gorulen[kimlikB], undefined);
  assert.equal(durum.gorulen[eskiGorulen.id], 'x'); // önceden karar verilen yeniden işlenmedi
  assert.ok(durum.taranan[kimlikA] && durum.taranan[kimlikB]); // taranan her aday kaydedilir
});

test('gorulmeyen: gorulen kayıtlı adayları eler', () => {
  const a = oge(K1, 'a1', 'x y z w');
  const b = oge(K1, 'b1', 'x y z w');
  const durum = { gorulen: { [a.id]: '2026-10-22T00:00:00Z' } };
  assert.deepEqual(gorulmeyen([aday(a), aday(b)], durum).map((x) => x.yuk.id), [b.id]);
});

test('isle: havuzdan derleme yazılınca her olayın üyeleri yazildi, hiçbirinde yazi yok', async () => {
  const durum = bosDurum();
  const olay = (id, iso, uyeIdler) => ({
    ...havuzOlayi({ id, taslak: taslak(120), basliklar: [`Baslik ${id}`], kaynaklar: [{ baslik: 'b', tarih: '2026-10-22', metin: uydur(60, 3, ['pek', 'lum', 'zan', 'rok', 'tis', 'yem', 'cuz', 'oluf', 'nab', 'esk']) }], kullanilan: [], iso }),
    uyeIdler,
  });
  const e1 = olay('bir:e1', '2026-10-22T06:40:00.000Z', ['bir:e1', 'iki:e1b']); // açılış dilimi (06-12 İstanbul) bitti
  const e2 = olay('bir:e2', '2026-10-22T06:30:00.000Z', ['bir:e2']);
  durum.havuz.push(e1, e2);
  const { u, yazilan } = kur({ durum, bag: { derlemeYaz: async () => ({ ...taslak(320, 'Orionlab ve Zefirnet haftalik gelisme ozeti'), category: 'yapay-zeka' }) } });
  const sonuclar = await u.isle([]);
  assert.equal(yazilan.length, 1);
  assert.equal(durum.havuz.length, 0);
  assert.equal(sonuclar.length, 3);
  assert.ok(sonuclar.every((s) => s.durum === 'yazildi' && s.slug === 'haber-1'));
  assert.equal(sonuclar.filter((s) => s.yazi !== undefined).length, 0);
  assert.ok(durum.gorulen['bir:e1'] && durum.gorulen['iki:e1b'] && durum.gorulen['bir:e2']);
});

test('adayYuku: çok uzun description/icerik/başlık olsa da yük JSON baytı 11000 baytın altında', () => {
  const uzun = 'Ğüşiöçİ '.repeat(5000);
  const o = { ...oge(K1, 'a1', uzun), description: uzun, icerik: uzun };
  const yuk = adayYuku(o);
  assert.ok(Buffer.byteLength(JSON.stringify(yuk)) < 11000, String(Buffer.byteLength(JSON.stringify(yuk))));
  assert.ok(yuk.icerik.length > 1000 && yuk.icerik.length <= 6000);
  assert.equal(adayiKur(yuk, KAYNAKLAR).icerik, yuk.icerik);
});

test("isle: eski aday akış içeriğini taşır; sayfa okunamasa da 'kaynak metni çok kısa' ile elenmez, yazılır", async () => {
  const kaynakMetin = uydur(220, 9, ['pek', 'lum', 'zan', 'rok', 'tis', 'yem', 'cuz', 'oluf', 'nab', 'esk']);
  assert.ok(kaynakMetin.length >= 1200);
  const o = { ...oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti'), icerik: kaynakMetin };
  const eski = aday(o, { eski: true }); // yük depodan gelir: yalnız JSON
  eski.yuk = JSON.parse(JSON.stringify(eski.yuk));
  const { u, yazilan } = kur({ bag: { tamMetin, hentTekst: async () => { throw new Error('ag yok'); } } });
  const sonuclar = await u.isle([eski]);
  assert.equal(yazilan.length, 1);
  assert.equal(sonucu(sonuclar, o).durum, 'yazildi');
});

// ── Yayın kapısı (ikinci okuma) ──────────────────────────────────────────────
const kapiOge = () => oge(K1, 'a1', 'Orionlab yeni kuantum cipini tanitti');
const kapiKayitli = () => {
  const kayitlar = [];
  return { kayitlar, motorYaz: async (k) => (kayitlar.push(k), true) };
};

test('kapı: elendi yazmaz; üye elendi, motor kaydı elendi + gerekçe', async () => {
  const { kayitlar, motorYaz } = kapiKayitli();
  const { u, yazilan, durum } = kur({ bag: { motorYaz } });
  const a = kapiOge();
  const sonuclar = await u.isle([aday(a)], { kapi: async () => ({ karar: 'elendi', gerekce: 'kapi:kirmizi:kisi-suc' }) });
  assert.equal(yazilan.length, 0);
  assert.equal(sonucu(sonuclar, a).durum, 'elendi');
  assert.equal(sonucu(sonuclar, a).gerekce, 'kapi:kirmizi:kisi-suc');
  assert.ok(durum.gorulen[a.id]);
  assert.equal(kayitlar.length, 1);
  assert.equal(kayitlar[0].durum, 'elendi');
  assert.equal(kayitlar[0].gerekce, 'kapi:kirmizi:kisi-suc');
});

test('kapı: bekle yazmaz, sayılmaz, görüldü işaretlenmez ve hata sayacı artmaz', async () => {
  const { u, yazilan, durum } = kur();
  const a = kapiOge();
  const sonuclar = await u.isle([aday(a)], { kapi: async () => ({ karar: 'bekle', gerekce: 'kapi-hata:kota', hata: 'kota' }) });
  const s = sonucu(sonuclar, a);
  assert.equal(yazilan.length, 0);
  assert.equal(s.durum, 'bekliyor');
  assert.equal(s.sayilmaz, true);
  assert.ok(s.hata instanceof Error);
  assert.equal(durum.gorulen[a.id], undefined);
  assert.equal(durum.hatalar[a.id], undefined);
});

test('kapı: gec yazar; ilk motor kaydı gerekçesi kapının gerekçesi (sarı gerekçe ile boşlukla birleşik, 300 kesilir)', async () => {
  const { kayitlar, motorYaz } = kapiKayitli();
  const { u, yazilan } = kur({ bag: { motorYaz } });
  const a = kapiOge();
  const sonuclar = await u.isle([aday(a)], { kapi: async () => ({ karar: 'gec', gerekce: 'kapi:temiz @model#abc' }) });
  assert.equal(yazilan.length, 1);
  assert.equal(sonucu(sonuclar, a).durum, 'yazildi');
  assert.equal(kayitlar.length, 1);
  assert.equal(kayitlar[0].durum, 'yazildi');
  assert.equal(kayitlar[0].slug, 'haber-1');
  assert.equal(kayitlar[0].gerekce, 'kapi:temiz @model#abc');
  // Çok uzun gerekçe 300 karakterde kesilir; boş gerekçe kayıt yazmaz.
  const k2 = kapiKayitli();
  const d = kur({ bag: { motorYaz: k2.motorYaz } });
  await d.u.isle([aday(kapiOge())], { kapi: async () => ({ karar: 'gec', gerekce: 'x'.repeat(500) }) });
  assert.equal(k2.kayitlar[0].gerekce.length, 300);
  const k3 = kapiKayitli();
  const e = kur({ bag: { motorYaz: k3.motorYaz } });
  await e.u.isle([aday(kapiOge())], { kapi: async () => ({ karar: 'gec', gerekce: '' }) });
  assert.equal(k3.kayitlar.length, 0);
});

test('kapı: null iken eski davranış (kayıt yok, yazılır); kapı gelmese de aynı', async () => {
  const { kayitlar, motorYaz } = kapiKayitli();
  const { u, yazilan } = kur({ bag: { motorYaz } });
  const sonuclar = await u.isle([aday(kapiOge())], { kapi: null });
  assert.equal(yazilan.length, 1);
  assert.equal(sonuclar[0].durum, 'yazildi');
  assert.equal(kayitlar.length, 0);
});

test('kapı: belirlenimci kırmızıda çağrılmaz', async () => {
  const kirmizi = taslak();
  kirmizi.tr.body = `${kirmizi.tr.body} Ajans Beta bildirdi.`; // yayın adı (uydurma): medya-adı kırmızısı
  let cagri = 0;
  const { u, yazilan } = kur({ bag: { taslakYaz: async () => kirmizi } });
  const a = kapiOge();
  const sonuclar = await u.isle([aday(a)], { kapi: async () => (cagri++, { karar: 'gec', gerekce: '' }) });
  assert.equal(cagri, 0);
  assert.equal(yazilan.length, 0);
  assert.equal(sonucu(sonuclar, a).durum, 'elendi');
});

test('kapı: ayar hatası turu durdurur (e.ayar, e.sonuclar)', async () => {
  const { u, yazilan } = kur();
  await assert.rejects(
    () => u.isle([aday(kapiOge())], { kapi: async () => { throw Object.assign(new Error('token yok'), { ayar: true }); } }),
    (e) => e.ayar === true && Array.isArray(e.sonuclar),
  );
  assert.equal(yazilan.length, 0);
});

const havuzDurumu = () => {
  const durum = bosDurum();
  const olay = (id, iso, uyeIdler) => ({
    ...havuzOlayi({ id, taslak: taslak(120), basliklar: [`Baslik ${id}`], kaynaklar: [{ baslik: 'b', tarih: '2026-10-22', metin: uydur(60, 3, ['pek', 'lum', 'zan', 'rok', 'tis', 'yem', 'cuz', 'oluf', 'nab', 'esk']) }], kullanilan: [], iso }),
    uyeIdler,
  });
  durum.havuz.push(olay('bir:e1', '2026-10-22T06:40:00.000Z', ['bir:e1', 'iki:e1b']), olay('bir:e2', '2026-10-22T06:30:00.000Z', ['bir:e2']));
  return durum;
};
const derlemeBag = { derlemeYaz: async () => ({ ...taslak(320, 'Orionlab ve Zefirnet haftalik gelisme ozeti'), category: 'yapay-zeka' }) };

test('kapı, derleme: elendi yazı yazılmaz, üyeler elendi', async () => {
  const { kayitlar, motorYaz } = kapiKayitli();
  const { u, yazilan, durum } = kur({ durum: havuzDurumu(), bag: { ...derlemeBag, motorYaz } });
  let metinler;
  const sonuclar = await u.isle([], { kapi: async (m) => ((metinler = m), { karar: 'elendi', gerekce: 'kapi:kirmizi:iftira' }) });
  assert.equal(metinler.length, 2);
  assert.deepEqual(metinler.map((m) => m.dil), ['tr', 'en']);
  assert.equal(yazilan.length, 0);
  assert.equal(sonuclar.length, 3);
  assert.ok(sonuclar.every((s) => s.durum === 'elendi' && s.gerekce === 'kapi:kirmizi:iftira'));
  assert.equal(durum.havuz.length, 0);
  assert.ok(kayitlar.every((k) => k.durum === 'elendi'));
});

test('kapı, derleme: bekle üyeler bekler (sayılmaz), yazı yok', async () => {
  const { u, yazilan, durum } = kur({ durum: havuzDurumu(), bag: derlemeBag });
  const sonuclar = await u.isle([], { kapi: async () => ({ karar: 'bekle', gerekce: 'kapi-hata:gecici' }) });
  assert.equal(yazilan.length, 0);
  assert.equal(sonuclar.length, 3);
  assert.ok(sonuclar.every((s) => s.durum === 'bekliyor' && s.sayilmaz === true));
  assert.equal(durum.havuz.length, 0);
});

test('kapı, derleme: gec yazar, kayıt gerekçesi kapının gerekçesi', async () => {
  const { kayitlar, motorYaz } = kapiKayitli();
  const { u, yazilan } = kur({ durum: havuzDurumu(), bag: { ...derlemeBag, motorYaz } });
  const sonuclar = await u.isle([], { kapi: async () => ({ karar: 'gec', gerekce: 'kapi:temiz @m#1' }) });
  assert.equal(yazilan.length, 1);
  assert.ok(sonuclar.every((s) => s.durum === 'yazildi'));
  assert.equal(kayitlar.length, 1);
  assert.equal(kayitlar[0].gerekce, 'kapi:temiz @m#1');
  assert.equal(kayitlar[0].durum, 'yazildi');
});
