// jendume iki dilli (TR, EN) yapay zekâ haber botu çalıştırıcısı.
// Kuru çalışma: node scripts/bot/calistir.mjs --kuru
// Canlı çalışma: GEMINI_API_KEY=... node scripts/bot/calistir.mjs
import { writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { KAYNAKLAR, anahtarlar, baslikTemiz, benzer, haberKimligi, tamMetin } from './kaynaklar.mjs';
import { MIN_DEGER, onbellekliPuanla, taslakYaz, duzelt, derlemeYaz, derlemeUzat } from './yazar.mjs';
import { ciftleriKur, onbellekliEsle, ozelAdlar, uygula } from './esleme.mjs';
import { baslikKontrol, duzeltmeAyrintisi, gunlukSatiri, kesinKontroller, rakamSeritleriniSuz, uzunlukKontrol, yerelDuzelt } from './denetci.mjs';
import { BELLEK_SAAT, bellekKur, grupAdayi, mukerrerBul } from './mukerrer.mjs';
import { hentTekst, jsonOku, rssOku, sonHaberler, ucDilliHaberYaz } from './lib.mjs';
import { butceYukle, geminiPayiBitti } from './butce.mjs';
import { adresiSil, anahtarVar, kaynakIzi, yayinlananAc, yayinlananKapat } from './gizli.mjs';
import { havuzOlayi, havuzAc, havuzKapat, havuzuIsle, derlemeAraligi, derlemeEnAz, dilimBasligiEkle } from './havuz.mjs';
import { standartOzeti } from './standart.mjs';
import { acilDurdurma, derlemeStandardi, haberStandardi, puanKapisi } from './kapi.mjs';
import { kirmiziKayit, motorKaydet, sariKayit } from './motor.mjs';

const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const DURUM_DOSYASI = path.join(ROT, 'scripts/bot/gorulen.json');
const KURU = process.argv.includes('--kuru');
// Ortam değişkeni pozitif tam sayı değilse varsayılan kullanılır (yanlış değer sınırları kaldırmasın).
const sayiAyar = (ad, varsayilan) => {
  const n = Number(process.env[ad]);
  return Number.isInteger(n) && n > 0 ? n : varsayilan;
};
const EN_FAZLA = sayiAyar('EN_FAZLA', 6);
const TEYIT = sayiAyar('TEYIT', 1);
const SURE_MS = sayiAyar('SURE_DK', 18) * 60_000;
const BASLANGIC = Date.now();

// Actions günlükleri herkese açık: kaynak başlıkları, model gerekçeleri ve denetim mesajları yayın adı,
// hata mesajları adres taşıyabilir. Bütün modüllerin günlük satırları gunlukSatiri'ndan geçer.
for (const tur of ['log', 'warn', 'error']) {
  const asil = console[tur].bind(console);
  console[tur] = (...x) => asil(...x.map((p) => (typeof p === 'string' ? gunlukSatiri(p) : p)));
}

// Standartlar Faz 0, acil durdurma: bayrak açıksa tur hiçbir şey yazmadan ve commit etmeden biter (Gemini'ye ilk çağrıdan önce).
if (!KURU && (await acilDurdurma())) process.exit(0);
// Medya adı denetimi şifreli listeye bağlı: anahtar yoksa o denetim yapılamaz, emin olamadığımız için hiçbir şey yayımlanmaz.
if (!KURU && !anahtarVar()) {
  console.warn('KAYNAK_ANAHTARI yok; medya adı denetimi yapılamaz, bu tur yayımlanmıyor.');
  process.exit(0);
}

// Standart kararını motor defterine yazar (kimlik: olayın ilk kaynağı, tek yönlü özetlenir).
const motorYaz = (kayit) => motorKaydet({ url: process.env.MOTOR_URL, anahtar: process.env.MOTOR_ANAHTARI, kayit });

// Katman 3 (Gemini kota planı): bu turun Gemini payı; yeni habere başlamadan önce geminiPayiBitti() sorulur.
if (!KURU) console.log(await butceYukle({ url: process.env.MOTOR_URL, anahtar: process.env.MOTOR_ANAHTARI, site: 'jendume' }));
const YAS_GUN = sayiAyar('YAS_GUN', 5);
const EN_FAZLA_HATA = 3;
// Kaynak metinlerin toplam en az uzunluğu (karakter); altında olay yazılmaz.
const EN_AZ_KAYNAK = 1200;

const durum = await jsonOku(DURUM_DOSYASI, { gorulen: {}, hatalar: {}, ayrik: {} });
durum.gorulen ??= {};
// Şeffaflık sayfası için taranan her aday (gorulen yalnız karar verilenleri tutar), 30 gün. İlk turda
// gorulen'den tohumlanır, böylece geçmiş günler boş kalmaz.
durum.taranan ??= { ...durum.gorulen };
durum.hatalar ??= {};
durum.ayrik ??= {};
// Önceki turların "aynı olay" kararları ve olay puanları: aynı soru Gemini'ye ikinci kez gitmez.
durum.ayni ??= {};
durum.puan ??= {};
// Son 72 saatte yayımlanan haberlerin kaynak başlıkları (mukerrer.mjs): yeni kaynak aynı olayı başka kelimelerle anlatsa da yakalanır.
// Kaynak başlıkları durum dosyasında kayıt başına şifreli durur (gizli.mjs); burada açılır, yazarken kapanır.
durum.yayinlanan = yayinlananAc(durum.yayinlanan ?? {});
// Uzunluk yüzünden yayımlanmayan, eş bekleyen kısa haberler (havuz.mjs); kayıt başına şifreli.
let havuz = havuzAc(durum.havuz ?? []);

const simdi = new Date();
const gorulduIsaretle = (id) => (durum.gorulen[id] = simdi.toISOString());
const ciftAnahtar = (a, b) => [a, b].sort().join('|');
const ayrikMi = (a, b) => Boolean(durum.ayrik[ciftAnahtar(a, b)]);
// Olayın puan anahtarı üyelerinden kurulur; gruba yeni haber katılırsa olay yeniden puanlanır.
const grupAnahtar = (g) => g.uyeler.map((u) => u.id).sort().join('+');

const adaylar = [];
for (const k of KAYNAKLAR) {
  let ogeler = [];
  try {
    ogeler = rssOku(await hentTekst(k.akis));
  } catch (e) {
    console.warn(`${k.etiket}: akış okunamadı (${adresiSil(e.message)})`);
    continue;
  }
  const taze = ogeler
    .map((o) => ({
      ...o,
      id: haberKimligi(k, o.guid || o.link),
      tarih: new Date(o.pubDate),
      baslik: baslikTemiz(o.title),
      kaynak: k,
    }))
    .filter((o) => o.link.startsWith('https://') && !Number.isNaN(o.tarih.valueOf()))
    .filter((o) => simdi - o.tarih <= YAS_GUN * 86_400_000)
    .filter((o) => !k.filtre || k.filtre.test(`${o.baslik} ${o.description || ''}`));
  // Zaman olarak yayın tarihi (gelecekteyse şimdi): ilk turda akışta günlerdir duran adaylar bugüne yığılmasın.
  for (const o of taze) durum.taranan[o.id] ??= new Date(Math.min(o.tarih, simdi)).toISOString();
  const yeni = taze.filter((o) => !durum.gorulen[o.id]);

  for (const o of yeni) o.anahtar = anahtarlar(o.baslik);
  console.log(`${k.etiket}: ${yeni.length} aday`);
  adaylar.push(...yeni);
}

const gruplar = [];
for (const a of adaylar.sort((x, y) => y.tarih - x.tarih)) {
  const g = gruplar.find(
    (grp) => benzer(grp.uyeler[0].anahtar, a.anahtar) && !grp.uyeler.some((u) => ayrikMi(u.id, a.id))
  );
  if (g) g.uyeler.push(a);
  else gruplar.push({ uyeler: [a] });
}
const grupBilgisi = (g) => {
  g.siteler = new Set(g.uyeler.map((u) => u.kaynak.etiket));
  g.yerli = g.uyeler.some((u) => u.kaynak.yerli);
  g.tarih = new Date(Math.max(...g.uyeler.map((u) => u.tarih)));
  return g;
};
gruplar.forEach(grupBilgisi);
for (const a of adaylar) a.adlar = ozelAdlar(a.baslik);

const yazilmis = await sonHaberler(ROT, 14);
const yazilmisAnahtar = yazilmis.flatMap((h) => [
  anahtarlar(h.title),
  anahtarlar(`${h.title} ${h.description}`),
]);
const kelimeyleYazildi = (g) =>
  g.uyeler.some((u) => yazilmisAnahtar.some((k) => benzer(k, u.anahtar)));
// Çalıştırmalar arası bellek: son 72 saatin haber dosyaları + yayımlanan olayların kaynak başlıkları.
const bellek = bellekKur(
  yazilmis.filter((h) => simdi - new Date(h.date) <= BELLEK_SAAT * 3_600_000),
  durum.yayinlanan,
);
const mukerrer = (g) => mukerrerBul(grupAdayi(g), bellek, { simdi });
const yazildiMi = (g) => {
  if (kelimeyleYazildi(g)) return true;
  const m = mukerrer(g);
  if (m) console.log(`zaten yazıldı (${m.kayit.slug}; ${m.neden}): ${g.uyeler[0].baslik}`);
  return Boolean(m);
};

const teyitli = gruplar.filter((g) => g.siteler.size >= TEYIT);

console.log(`\n${gruplar.length} olay, ${teyitli.length} tanesi aday (${teyitli.filter((g) => g.yerli).length} yerli).`);
const grupBitti = (g) => g.uyeler.forEach((u) => gorulduIsaretle(u.id));

if (KURU) {
  for (const g of teyitli.slice(0, 20)) {
    console.log(`\n[${g.siteler.size} kaynak]${yazildiMi(g) ? ' (zaten yazıldı)' : ''}`);
    for (const u of g.uyeler) console.log(`  - ${u.kaynak.etiket}: ${u.baslik}`);
  }
  process.exit(0);
}

if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY tanımlı değil; çıkılıyor.');
  process.exit(0);
}

// ── Ön eleme ──────────────────────────────────────────────────────────
// a) Başlık kelimeleri yayımlanmış bir haberle örtüşen olaylar düşer.
let sira = [];
for (const g of teyitli) {
  if (yazildiMi(g)) grupBitti(g);
  else sira.push(g);
}

// b) Dilden bağımsız eşleme (esleme.mjs): Türkçe ve İngilizce kaynaklar özel adlar üzerinden birbirleriyle ve
//    yayımlanmış haberlerle eşleşir; kelime benzerliğiyle kurulan gruplar doğrulanır. Hata turu düşürmez.
if (sira.length) {
  try {
    const bySlug = new Map();
    for (const h of yazilmis) {
      const m = bySlug.get(h.slug) ?? { id: `haber:${h.slug}`, parca: [] };
      m.parca.push(`${h.title} — ${h.description}`);
      bySlug.set(h.slug, m);
    }
    const yazilmisAdlar = [...bySlug.values()].map((m) => ({ id: m.id, metin: m.parca.join(' / '), adlar: ozelAdlar(m.parca.join(' ')) }));
    const ciftler = ciftleriKur(sira, yazilmisAdlar, ayrikMi);
    const ayni = await onbellekliEsle(ciftler, durum.ayni, (c) => ciftAnahtar(c.idA, c.idB), { zaman: simdi.toISOString() });
    if (ayni) {
      const sonuc = uygula(sira, ciftler, ayni);
      for (const [x, y] of sonuc.ayrik) durum.ayrik[ciftAnahtar(x, y)] = simdi.toISOString();
      sira = [];
      for (const g of sonuc.gruplar.map(grupBilgisi)) {
        if (g.yazilmis) {
          console.log(`zaten yazıldı (özel ad eşleşmesi): ${g.uyeler[0].baslik}`);
          grupBitti(g);
        } else sira.push(g);
      }
      console.log(`Eşleme: ${ciftler.length} çift soruldu, ${ayni.size} tanesi aynı olay; ${sira.length} olay kaldı.`);
    } else console.warn('Eşleme yapılamadı; gruplar kelime benzerliğiyle kaldı.');
  } catch (e) {
    console.warn(`Eşleme hatası (${adresiSil(e.message)}); gruplar kelime benzerliğiyle kaldı.`);
  }
}

// c) Kapsam ve haber değeri: 0–100 puan; MIN_DEGER altı yazılmaz. Sıra: puan, yerli kaynak, yeniden eskiye.
//    Emin değilsek yayımlamayız (standartlar Faz 0): puanlama hata verir, cevapsız kalır ya da bir başlığı puansız bırakırsa
//    o olaylar bu tur yazılmaz; görüldü işaretlenmez, sonraki turda yeniden puanlanır.
let puan = new Map();
if (sira.length) {
  const k = await puanKapisi(
    sira,
    () =>
      onbellekliPuanla(
        sira.map((g) => g.uyeler.map((u) => u.baslik).join(' / ')),
        sira.map(grupAnahtar),
        durum.puan,
        { zaman: simdi.toISOString() },
      ),
    MIN_DEGER,
  );
  if (k.hata) console.warn(`Ön eleme yapılamadı (${adresiSil(k.hata)}); emin olunamadığı için bu tur hiçbir olay yazılmıyor, sonraki turda yeniden denenecek.`);
  else if (k.bekleyen.length) console.warn(`Puanlanamayan ${k.bekleyen.length} olay bu tur yazılmıyor; sonraki turda yeniden denenecek.`);
  for (const { g, puan: p } of k.dusen) {
    console.log(`${p === 0 ? 'kapsam dışı' : `düşük haber değeri (${p})`}: ${g.uyeler[0].baslik}`);
    grupBitti(g);
  }
  puan = k.puanlar;
  sira = k.gecen;
}
sira.sort((a, b) => (puan.get(b) ?? 0) - (puan.get(a) ?? 0) || (a.yerli !== b.yerli ? (a.yerli ? -1 : 1) : b.tarih - a.tarih));

const ozet = { yazilan: [], elenen: [], atlanan: [], hata: [] };
let yazilanSayi = 0;

for (const g of sira) {
  if (yazilanSayi >= EN_FAZLA) break;
  if (Date.now() - BASLANGIC > SURE_MS || geminiPayiBitti()) {
    console.log(`\n${Date.now() - BASLANGIC > SURE_MS ? 'Süre bütçesi' : 'Gemini tur payı'} doldu; kalan olaylar sonraki çalışmaya kaldı.`);
    break;
  }
  if (yazildiMi(g)) {
    grupBitti(g);
    continue;
  }

  const ad = g.uyeler[0].baslik;
  console.log(`\n[${[...g.siteler].join(', ')}] ${ad}`);
  try {
    const secilen = [];
    for (const etiket of g.siteler) secilen.push(g.uyeler.find((u) => u.kaynak.etiket === etiket));
    const kaynaklar = [];
    // Metni kullanılan kaynakların adı ve adresi; haberde yalnızca şifreli kaynakIzi olarak durur.
    const kullanilan = [];
    for (const u of secilen.slice(0, 3)) {
      const metin = await tamMetin(u);
      if (metin.length >= 200) {
        kullanilan.push({ ad: u.kaynak.ad, url: u.link });
        kaynaklar.push({
          baslik: u.baslik,
          metin,
          tarih: u.tarih.toISOString().slice(0, 10),
        });
      }
    }
    // 250–400 kelimelik haber yalnız kaynaktaki olgulardan kurulur; kısa özetten uzun haber yazılmaz (dolgu riski).
    if (kaynaklar.reduce((n, k) => n + k.metin.length, 0) < EN_AZ_KAYNAK) {
      ozet.atlanan.push(`${ad} (${kaynaklar.length ? 'kaynak metni çok kısa' : 'metin okunamadı'})`);
      grupBitti(g);
      continue;
    }

    let t = await taslakYaz(kaynaklar);
    if (!t) break;
    if (!t.ayniOlay && g.uyeler.length > 1) {
      console.log(`  aynı olay değil: ${t.neden}`);
      for (const a of g.uyeler) {
        for (const b of g.uyeler) {
          if (a.id < b.id) durum.ayrik[ciftAnahtar(a.id, b.id)] = simdi.toISOString();
        }
      }
      for (const u of g.uyeler) {
        sira.push({ uyeler: [u], siteler: new Set([u.kaynak.etiket]), yerli: Boolean(u.kaynak.yerli), tarih: u.tarih });
      }
      continue;
    }
    if (!t.uygun) {
      ozet.atlanan.push(`${ad} (${t.neden})`);
      grupBitti(g);
      continue;
    }

    const kaynakBirlesik = kaynaklar.map((k) => `${k.baslik}\n${k.metin}`).join('\n\n');
    // Basit sorunlar (göreli zaman, kaynak atfı) önce yerelde temizlenir; Gemini yalnız kalanlar için çağrılır.
    t = yerelDuzelt(t);
    // Kısa taslak (200 kelimenin altı) ve kurala uymayan başlık da sorun sayılır; düzeltme turu onarır.
    const denetle = (x) => [...kesinKontroller(x, kaynakBirlesik), ...uzunlukKontrol(x), ...baslikKontrol(x)];
    let sorunlar = denetle(t);
    // Düzeltme turu cevapsız kalırsa (Gemini yanıt vermedi) olay karara bağlanmış sayılmaz: görüldü işaretlenmez, sonraki turda yeniden denenir.
    let duzeltmeCevapsiz = false;
    for (let tur = 1; tur <= 2 && sorunlar.length; tur++) {
      console.log(`  düzeltme turu ${tur}: ${sorunlar.join(' | ')}`);
      const duzeltilmis = await duzelt(t, kaynakBirlesik, sorunlar, duzeltmeAyrintisi(t, kaynakBirlesik));
      if (!duzeltilmis) {
        duzeltmeCevapsiz = true;
        break;
      }
      t = yerelDuzelt(duzeltilmis);
      sorunlar = denetle(t);
    }
    if (duzeltmeCevapsiz && sorunlar.length) {
      console.log(`  düzeltme turu cevapsız; haber bu tur yayımlanmadı, sonraki turda yeniden denenecek: ${sorunlar.join(' | ')}`);
      ozet.atlanan.push(`${t.tr?.title || ad} (düzeltme cevapsız, bekliyor)`);
      continue;
    }
    grupBitti(g);
    if (sorunlar.length) {
      console.log(`  YAYIMLANMADI: ${sorunlar.join(' | ')}`);
      ozet.elenen.push(`${t.tr?.title || ad} — ${sorunlar.join('; ')}`);
      // Yalnız uzunluk yüzünden duran olay havuza girer: dilimi bitince o dilimin kısa haberleriyle tek derleme olur.
      const uzunluk = uzunlukKontrol(t);
      if (sorunlar.every((s) => uzunluk.includes(s))) {
        havuz.push(havuzOlayi({ id: g.uyeler[0].id, taslak: t, basliklar: g.uyeler.map((u) => u.baslik), kaynaklar, kullanilan, iso: simdi.toISOString() }));
        console.log('  havuza alındı: dilim sonunda derlemeye girecek');
      }
      continue;
    }

    // Standartlar süzgeci (iki dil ayrı denetlenir, en ağır karar geçerli): kırmızı ise dosya yazılmaz, olay elendi olarak kaydedilir.
    // Süzgeç hata verirse yayımlanmaz (aşağıdaki catch: hata sayılır, haber yazılmaz).
    const yazilacak = rakamSeritleriniSuz(t, kaynakBirlesik);
    const st = haberStandardi(yazilacak, kaynakBirlesik);
    if (st.karar !== 'temiz') console.log(`  ${standartOzeti(st)}`);
    if (st.karar === 'kirmizi') {
      ozet.elenen.push(`${t.tr?.title || ad} — ${st.gerekce}`);
      await motorYaz(kirmiziKayit(g.uyeler[0].id, st));
      continue;
    }
    const slug = await ucDilliHaberYaz(ROT, {
      ...yazilacak,
      date: simdi.toISOString(),
      kaynakIzi: kaynakIzi(kullanilan),
      featured: false,
      draft: false,
    });
    yazilmisAnahtar.push(
      anahtarlar(t.tr.title),
      anahtarlar(`${t.tr.title} ${t.tr.description}`),
      anahtarlar(t.en.title),
      anahtarlar(`${t.en.title} ${t.en.description}`),
      ...g.uyeler.map((u) => u.anahtar)
    );
    // Belleğe yaz: bu ve sonraki çalıştırmalarda aynı olayı anlatan yeni kaynaklar atlanır.
    const kayit = { zaman: simdi.toISOString(), basliklar: g.uyeler.map((u) => u.baslik) };
    durum.yayinlanan[slug] = kayit;
    bellek.push(
      ...bellekKur(
        ['tr', 'en'].map((d) => ({ slug, date: kayit.zaman, title: t[d].title, description: t[d].description })),
        { [slug]: kayit },
      ),
    );
    yazilanSayi++;
    console.log(`  yazıldı (TR/EN): ${slug}`);
    if (st.karar === 'sari') await motorYaz(sariKayit(g.uyeler[0].id, slug, st));
    ozet.yazilan.push(`${slug} (${t.tr.title})`);
  } catch (e) {
    console.warn(`  hata: ${adresiSil(e.message)}`);
    ozet.hata.push(`${ad}: ${adresiSil(e.message)}`);
    if (e.ayar) break;
    // Habere özgü hata: 3 denemeden sonra görüldü sayılır (her turda Gemini harcamasın).
    const h = (durum.hatalar[g.uyeler[0].id] ??= { sayi: 0 });
    h.sayi++;
    h.mesaj = adresiSil(e.message);
    h.zaman = simdi.toISOString();
    if (h.sayi >= EN_FAZLA_HATA) grupBitti(g);
  }
}

// Kısa haber havuzu: dilimi (açılış/öğle/kapanış) biten kısa haberler, kategori aranmadan tek bir iki dilli derleme yazısı olur (havuz.mjs).
try {
  const h = await havuzuIsle(havuz, {
    simdi,
    // Bu arada (bu turda ya da son 72 saatte) tam haber olarak yazılan olay düşer.
    mukerrer: (o) => mukerrerBul({ basliklar: o.basliklar, metinler: [] }, bellek, { simdi })?.neden ?? null,
    yaz: async (grup, kaynak) => {
      const t = await derlemeYaz(grup, kaynak);
      return t && yerelDuzelt(t);
    },
    uzat: async (x, grup, kaynak, enAz) => yerelDuzelt({ ...(await derlemeUzat(x, grup, kaynak, enAz)), category: x.category }),
    // Derlemenin uzunluk alt sınırı haber sayısına göre (havuz.mjs → derlemeEnAz).
    denetle: (x, kaynak, n) => [...kesinKontroller(x, kaynak), ...uzunlukKontrol(x, derlemeEnAz(n), derlemeAraligi(n)), ...baslikKontrol(x)],
    duzelt: async (x, kaynak, sorunlar) => {
      const d = await duzelt(x, kaynak, sorunlar, duzeltmeAyrintisi(x, kaynak));
      return d && yerelDuzelt({ ...d, category: x.category });
    },
    // Standartlar süzgeci: kırmızı madde atlanır, yazı bütünüyle düşmez (kapi.mjs → derlemeStandardi).
    standart: (x, grup) => derlemeStandardi(x, grup),
    atla: async (o, s) => {
      console.log(`  derleme maddesi atlandı: ${standartOzeti(s)}`);
      await motorYaz(kirmiziKayit(o.id, s));
    },
    kaydet: async (x, grup, kaynak, s) => {
      x = dilimBasligiEkle(x, grup); // başlığa dilim eki (denetimden sonra)
      if (s?.karar === 'sari') console.log(`  ${standartOzeti(s)}`);
      const slug = await ucDilliHaberYaz(ROT, {
        ...rakamSeritleriniSuz(x, kaynak),
        date: simdi.toISOString(),
        kaynakIzi: kaynakIzi(grup.flatMap((o) => o.kullanilan ?? [])),
        featured: false,
        draft: false,
      });
      const kayit = { zaman: simdi.toISOString(), basliklar: grup.flatMap((o) => o.basliklar) };
      durum.yayinlanan[slug] = kayit;
      bellek.push(...bellekKur(['tr', 'en'].map((d) => ({ slug, date: kayit.zaman, title: x[d].title, description: x[d].description })), { [slug]: kayit }));
      yazilanSayi++;
      ozet.yazilan.push(`${slug} (derleme: ${x.tr.title})`);
      if (s?.karar === 'sari') await motorYaz(sariKayit(grup[0].id, slug, s));
      return slug;
    },
    surVar: () => Date.now() - BASLANGIC <= SURE_MS && !geminiPayiBitti(),
  });
  havuz = h.havuz;
  if (h.ayarHatasi) ozet.hata.push(`derleme: ${adresiSil(h.ayarHatasi.message)}`);
} catch (e) {
  console.warn(`havuz hatası: ${adresiSil(e.message)}`);
  ozet.hata.push(`havuz: ${adresiSil(e.message)}`);
}

// Yayın belleği 72 saat, puanlar yalnızca aday yaşı boyunca gerekir.
for (const [k, v] of Object.entries(durum.yayinlanan)) if (simdi - new Date(v.zaman) > BELLEK_SAAT * 3_600_000) delete durum.yayinlanan[k];
for (const [k, v] of Object.entries(durum.puan)) if (simdi - new Date(v.zaman) > (YAS_GUN + 1) * 86_400_000) delete durum.puan[k];
for (const kayit of [durum.gorulen, durum.taranan, durum.ayrik, durum.ayni]) {
  for (const [id, t] of Object.entries(kayit)) {
    if (simdi - new Date(t) > 30 * 86_400_000) delete kayit[id];
  }
}
await writeFile(DURUM_DOSYASI, `${JSON.stringify({ ...durum, yayinlanan: yayinlananKapat(durum.yayinlanan), havuz: havuzKapat(havuz) }, null, 2)}\n`, 'utf8');

const sayi = ozet.yazilan.length;
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `sayi=${sayi}\n`);
if (process.env.GITHUB_STEP_SUMMARY) {
  const liste = (b, x) => (x.length ? `\n### ${b}\n${x.map((s) => `- ${s}`).join('\n')}\n` : '');
  await appendFile(
    process.env.GITHUB_STEP_SUMMARY,
    gunlukSatiri(`## jendume botu\n${liste('Yayımlandı (TR/EN)', ozet.yazilan)}${liste('Denetimden geçemedi', ozet.elenen)}${liste('Atlandı', ozet.atlanan)}${liste('Hata', ozet.hata)}`)
  );
}
