// jendume haber akışının motor uyarlayıcısı: calistir.mjs'nin eski akış gövdesi, ortak motorun sürebileceği iki parçaya bölündü.
//   adaylar({ simdi, log }) → [{ kimlik, yuk, baslik }]   akışları okur, taze öğelerin hepsini döner (gorulen'e bakmaz)
//   isle(adaylar, { surVar, log }) → Sonuc[]               ön eleme + yazım + havuz akışı; karar verilenler Sonuc olarak döner
// Motor yokken yerelTur aynı akışı eskisi gibi sürer (davranış değişmedi). Karar verilen her üye durum.gorulen'e işaretlenir
// ve habere özgü hatalar durum.hatalar'a sayılır (3 deneme kuralı bunu okur); iki modda da.
// Sonuc = { kimlik, durum: 'yazildi' | 'elendi' | 'bekliyor', gerekce?, hata?, slug?, havuzda? }
// Sonucu olmayan aday bekliyor kalır (puanlanamadı, düzeltme cevapsız, süre ya da Gemini payı doldu).
import { KAYNAKLAR, anahtarlar, baslikTemiz, benzer, haberKimligi, tamMetin } from './kaynaklar.mjs';
import { MIN_DEGER, onbellekliPuanla, taslakYaz, duzelt, derlemeYaz, derlemeUzat } from './yazar.mjs';
import { ciftleriKur, onbellekliEsle, ozelAdlar, uygula } from './esleme.mjs';
import { baslikKontrol, baslikUzunlukKontrol, duzeltmeAyrintisi, gunlukSatiri, kesinKontroller, rakamSeritleriniSuz, uzunlukKontrol, yerelDuzelt } from './denetci.mjs';
import { BELLEK_SAAT, bellekKur, grupAdayi, mukerrerBul } from './mukerrer.mjs';
import { hentTekst, rssOku, sonHaberler, ucDilliHaberYaz } from './lib.mjs';
import { geminiPayiBitti } from './butce.mjs';
import { adresiSil, kaynakIzi } from './gizli.mjs';
import { resmiKaynakListesi } from './resmi-kaynak.mjs';
import { havuzOlayi, havuzuIsle, derlemeAraligi, derlemeEnAz, derlemeKaynagi, dilimBasligiEkle } from './havuz.mjs';
import { standartOzeti } from './standart.mjs';
import { derlemeStandardi, gerekceBirlestir, haberStandardi, kapiMetinleri, puanKapisi } from './kapi.mjs';
import { kirmiziKayit, motorKaydet, motorKimlik, sariKayit } from './motor.mjs';

const EN_FAZLA_HATA = 3;
// Kaynak metinlerin toplam en az uzunluğu (karakter); altında olay yazılmaz.
const EN_AZ_KAYNAK = 1200;
const GUN_MS = 86_400_000;

// Motor yükü şifreli 16 KB'a sığmalı: uzun alanlar hem karakter hem UTF-8 bayt sınırıyla kırpılır (yük JSON'u ~11 KB altında).
const kes = (m, enCok, enCokBayt) => {
  let t = String(m ?? '').slice(0, enCok);
  while (Buffer.byteLength(t) > enCokBayt) t = t.slice(0, Math.floor(t.length * 0.9));
  return t;
};
export const ICERIK_ENCOK = 6000;

/** Aday öğenin motora giden yükü: düz kaynak adı/adresi yok, kaynak yalnız etiketiyle anılır. Akış içeriği (icerik) kırpılarak taşınır. */
export const adayYuku = (o) => ({
  id: o.id,
  guid: o.guid,
  link: o.link,
  title: kes(o.title, 300, 600),
  description: kes(o.description, 1500, 2000),
  icerik: kes(o.icerik, ICERIK_ENCOK, 7000),
  pubDate: o.pubDate,
  kaynak: o.kaynak.etiket,
});

/** Yükten aday öğeyi yeniden kurar; etiket kaynak listesinde yoksa null. */
export function adayiKur(yuk, kaynaklar = KAYNAKLAR) {
  const k = kaynaklar.find((x) => x.etiket === yuk.kaynak);
  if (!k) return null;
  const baslik = baslikTemiz(yuk.title);
  return {
    guid: yuk.guid,
    title: yuk.title,
    link: yuk.link,
    description: yuk.description,
    icerik: yuk.icerik ?? '',
    pubDate: yuk.pubDate,
    id: yuk.id,
    tarih: new Date(yuk.pubDate),
    baslik,
    kaynak: k,
    anahtar: anahtarlar(baslik),
    adlar: ozelAdlar(baslik),
  };
}

const temiz = (m) => adresiSil(gunlukSatiri(String(m)));

/** Durum dosyasında karar verilmemiş (gorulen'de olmayan) adaylar. */
export const gorulmeyen = (adaylar, durum) => adaylar.filter((a) => !durum.gorulen?.[a.yuk.id]);

/**
 * @param {{ rot: string, durum: object, simdi: Date, ayar?: object, bag?: object }} p
 *   ayar: { enFazla, teyit, yasGun, sureMs, baslangic }
 *   bag: yalnız testler için bağımlılık değişimi (Gemini/ağ/disk çağıran işlevler).
 */
export function uyarlayiciKur({ rot, durum, simdi, ayar = {}, bag = {} }) {
  const A = { enFazla: 6, teyit: 1, yasGun: 5, sureMs: 18 * 60_000, baslangic: Date.now(), ...ayar };
  const B = {
    KAYNAKLAR, hentTekst, rssOku, tamMetin, taslakYaz, duzelt, derlemeYaz, derlemeUzat, onbellekliPuanla, onbellekliEsle,
    ucDilliHaberYaz, sonHaberler, geminiPayiBitti,
    motorYaz: (kayit) => motorKaydet({ url: process.env.MOTOR_URL, anahtar: process.env.MOTOR_ANAHTARI, kayit }),
    ...bag,
  };
  durum.gorulen ??= {};
  durum.taranan ??= { ...durum.gorulen };
  durum.hatalar ??= {};
  durum.ayrik ??= {};
  durum.ayni ??= {};
  durum.puan ??= {};
  durum.yayinlanan ??= {};
  durum.havuz ??= [];

  const ozet = { yazilan: [], elenen: [], atlanan: [], hata: [] };
  const icerikler = new Map(); // bu turda okunan tam akış içerikleri (yükte kırpılı taşınır); yerel yol eskisi gibi tamını kullanır
  let hazir = null;

  const gorulduIsaretle = (id) => (durum.gorulen[id] = simdi.toISOString());
  const ciftAnahtar = (a, b) => [a, b].sort().join('|');
  const ayrikMi = (a, b) => Boolean(durum.ayrik[ciftAnahtar(a, b)]);
  // Olayın puan anahtarı üyelerinden kurulur; gruba yeni haber katılırsa olay yeniden puanlanır.
  const grupAnahtar = (g) => g.uyeler.map((u) => u.id).sort().join('+');
  const grupBitti = (g) => g.uyeler.forEach((u) => gorulduIsaretle(u.id));
  const grupBilgisi = (g) => {
    g.siteler = new Set(g.uyeler.map((u) => u.kaynak.etiket));
    g.yerli = g.uyeler.some((u) => u.kaynak.yerli);
    g.tarih = new Date(Math.max(...g.uyeler.map((u) => u.tarih)));
    return g;
  };
  const surDolduMu = () => Date.now() - A.baslangic > A.sureMs;

  async function hazirla() {
    if (hazir) return hazir;
    const yazilmis = await B.sonHaberler(rot, 14);
    const yazilmisAnahtar = yazilmis.flatMap((h) => [anahtarlar(h.title), anahtarlar(`${h.title} ${h.description}`)]);
    // Çalıştırmalar arası bellek: son 72 saatin haber dosyaları + yayımlanan olayların kaynak başlıkları.
    const bellek = bellekKur(yazilmis.filter((h) => simdi - new Date(h.date) <= BELLEK_SAAT * 3_600_000), durum.yayinlanan);
    hazir = { yazilmis, yazilmisAnahtar, bellek };
    return hazir;
  }

  // Zaten yazılmışsa nedenini (metin), değilse null döner; mükerrer eşleşmesi günlüğe düşer.
  const yazildiNedeni = (g, { yazilmisAnahtar, bellek }, log) => {
    if (g.uyeler.some((u) => yazilmisAnahtar.some((k) => benzer(k, u.anahtar)))) return 'zaten yazıldı';
    const m = mukerrerBul(grupAdayi(g), bellek, { simdi });
    if (!m) return null;
    log(`zaten yazıldı (${m.kayit.slug}; ${m.neden}): ${g.uyeler[0].baslik}`);
    return `zaten yazıldı (${m.kayit.slug}; ${m.neden})`;
  };

  // Yüklerden öğeleri kurar, olaylara gruplar. Bayat / listeden çıkmış eski adaylar ve havuzdakiler ayıklanır (sonuçları koy'a gider).
  function grupla(girdi, koy) {
    const havuzdaki = new Set(durum.havuz.flatMap((h) => h.uyeIdler ?? [h.id]));
    const os = [];
    for (const a of girdi) {
      if (havuzdaki.has(a.yuk.id)) continue; // havuzda bekliyor (taze ya da eski gelse de): işlenmez, Sonuc dönmez, bekliyor kalır, havuz büyümez
      const o = adayiKur(a.yuk, B.KAYNAKLAR);
      if (!o) {
        koy({ kimlik: a.kimlik, durum: 'elendi', gerekce: 'kaynak listeden çıkarıldı' });
        gorulduIsaretle(a.yuk.id);
        continue;
      }
      if (a.eski && simdi - o.tarih > A.yasGun * GUN_MS) {
        koy({ kimlik: a.kimlik, durum: 'elendi', gerekce: 'bayat (5 günü geçti)' });
        gorulduIsaretle(a.yuk.id);
        continue;
      }
      if (icerikler.has(o.id)) o.icerik = icerikler.get(o.id);
      os.push(o);
    }
    const gruplar = [];
    for (const a of os.sort((x, y) => y.tarih - x.tarih)) {
      const g = gruplar.find((grp) => benzer(grp.uyeler[0].anahtar, a.anahtar) && !grp.uyeler.some((u) => ayrikMi(u.id, a.id)));
      if (g) g.uyeler.push(a);
      else gruplar.push({ uyeler: [a] });
    }
    gruplar.forEach(grupBilgisi);
    const teyitli = gruplar.filter((g) => g.siteler.size >= A.teyit);
    return { os, gruplar, teyitli };
  }

  async function adaylar({ simdi: s = simdi, log = console.log } = {}) {
    const cikti = [];
    for (const k of B.KAYNAKLAR) {
      let ogeler = [];
      try {
        ogeler = B.rssOku(await B.hentTekst(k.akis));
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
        .filter((o) => s - o.tarih <= A.yasGun * GUN_MS)
        .filter((o) => !k.filtre || k.filtre.test(`${o.baslik} ${o.description || ''}`));
      // Zaman olarak yayın tarihi (gelecekteyse şimdi): ilk turda akışta günlerdir duran adaylar bugüne yığılmasın.
      for (const o of taze) durum.taranan[o.id] ??= new Date(Math.min(o.tarih, s)).toISOString();
      for (const o of taze) if (o.icerik) icerikler.set(o.id, o.icerik);
      // Günlükteki sayı karar bekleyen (gorulen'de olmayan) adaylardır; dönen liste hepsini içerir.
      log(`${k.etiket}: ${taze.filter((o) => !durum.gorulen[o.id]).length} aday`);
      for (const o of taze) cikti.push({ kimlik: motorKimlik(o.id), yuk: adayYuku(o), baslik: o.baslik });
    }
    return cikti;
  }

  // Kuru çalışma: olayları gruplar ve yazdırır, hiçbir şey yazmaz.
  async function kuru(girdi, { log = console.log } = {}) {
    const h = await hazirla();
    const { gruplar, teyitli } = grupla(girdi, () => {});
    log(`\n${gruplar.length} olay, ${teyitli.length} tanesi aday (${teyitli.filter((g) => g.yerli).length} yerli).`);
    for (const g of teyitli.slice(0, 20)) {
      log(`\n[${g.siteler.size} kaynak]${yazildiNedeni(g, h, log) ? ' (zaten yazıldı)' : ''}`);
      for (const u of g.uyeler) log(`  - ${u.kaynak.etiket}: ${u.baslik}`);
    }
  }

  // Kapı kararı 'elendi' olunca standartOzeti'nin okuyabileceği kırmızı karar.
  const kapiKirmizi = (gerekce) => ({ karar: 'kirmizi', gerekce, kirmizi: [{ kural: 'kapi', ham: gerekce }], sari: [] });

  async function isle(girdi, { surVar, log = console.log, kapi = null } = {}) {
    const h = await hazirla();
    const { yazilmisAnahtar, bellek, yazilmis } = h;
    const sonuclar = [];
    const yer = new Map();
    // Aynı kimliğe sonradan gelen sonuç öncekinin yerine geçer (havuza girip aynı turda düşen olay gibi).
    const koy = (s) => {
      if (yer.has(s.kimlik)) sonuclar[yer.get(s.kimlik)] = s;
      else {
        yer.set(s.kimlik, sonuclar.length);
        sonuclar.push(s);
      }
    };
    const kim = (u) => motorKimlik(u.id);
    const uyeler = (o) => (o.uyeIdler ?? [o.id]).map((id) => motorKimlik(id)); // havuz olayının üyeleri
    const elendi = (g, gerekce) => g.uyeler.forEach((u) => koy({ kimlik: kim(u), durum: 'elendi', gerekce: temiz(gerekce) }));
    const ele = (g, gerekce) => {
      grupBitti(g);
      elendi(g, gerekce);
    };
    // Sonuc'a yazi eklenmez: Telegram'a gidiş saat'in RSS süpürgesinden (adaptör commit+yayından önce raporlar, D1 kuyruğu 404 görürdü).
    const yazildi = (g, slug) => g.uyeler.forEach((u) => koy({ kimlik: kim(u), durum: 'yazildi', slug }));
    const payNedeni = () => {
      if (surVar) return surVar() ? null : 'Tur payı';
      if (surDolduMu()) return 'Süre bütçesi';
      return B.geminiPayiBitti() ? 'Gemini tur payı' : null;
    };

    const { gruplar, teyitli } = grupla(girdi, koy);
    log(`\n${gruplar.length} olay, ${teyitli.length} tanesi aday (${teyitli.filter((g) => g.yerli).length} yerli).`);

    // ── Ön eleme ──────────────────────────────────────────────────────────
    // a) Başlık kelimeleri yayımlanmış bir haberle örtüşen olaylar düşer.
    let sira = [];
    for (const g of teyitli) {
      const neden = yazildiNedeni(g, h, log);
      if (neden) ele(g, neden);
      else sira.push(g);
    }

    // b) Dilden bağımsız eşleme (esleme.mjs): Türkçe ve İngilizce kaynaklar özel adlar üzerinden birbirleriyle ve
    //    yayımlanmış haberlerle eşleşir; kelime benzerliğiyle kurulan gruplar doğrulanır. Hata turu düşürmez.
    if (sira.length) {
      try {
        const bySlug = new Map();
        for (const x of yazilmis) {
          const m = bySlug.get(x.slug) ?? { id: `haber:${x.slug}`, parca: [] };
          m.parca.push(`${x.title} — ${x.description}`);
          bySlug.set(x.slug, m);
        }
        const yazilmisAdlar = [...bySlug.values()].map((m) => ({ id: m.id, metin: m.parca.join(' / '), adlar: ozelAdlar(m.parca.join(' ')) }));
        const ciftler = ciftleriKur(sira, yazilmisAdlar, ayrikMi);
        const ayni = await B.onbellekliEsle(ciftler, durum.ayni, (c) => ciftAnahtar(c.idA, c.idB), { zaman: simdi.toISOString() });
        if (ayni) {
          const sonuc = uygula(sira, ciftler, ayni);
          for (const [x, y] of sonuc.ayrik) durum.ayrik[ciftAnahtar(x, y)] = simdi.toISOString();
          sira = [];
          for (const g of sonuc.gruplar.map(grupBilgisi)) {
            if (g.yazilmis) {
              log(`zaten yazıldı (özel ad eşleşmesi): ${g.uyeler[0].baslik}`);
              ele(g, 'zaten yazıldı (özel ad eşleşmesi)');
            } else sira.push(g);
          }
          log(`Eşleme: ${ciftler.length} çift soruldu, ${ayni.size} tanesi aynı olay; ${sira.length} olay kaldı.`);
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
          B.onbellekliPuanla(
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
        const gerekce = p === 0 ? 'kapsam dışı' : `düşük haber değeri (${p})`;
        log(`${gerekce}: ${g.uyeler[0].baslik}`);
        ele(g, gerekce);
      }
      puan = k.puanlar;
      sira = k.gecen;
    }
    sira.sort((a, b) => (puan.get(b) ?? 0) - (puan.get(a) ?? 0) || (a.yerli !== b.yerli ? (a.yerli ? -1 : 1) : b.tarih - a.tarih));

    let yazilanSayi = 0;
    let ayarHatasi = null;

    for (const g of sira) {
      if (yazilanSayi >= A.enFazla) break;
      const pay = payNedeni();
      if (pay) {
        log(`\n${pay} doldu; kalan olaylar sonraki çalışmaya kaldı.`);
        break;
      }
      const yazildiGerekcesi = yazildiNedeni(g, h, log);
      if (yazildiGerekcesi) {
        ele(g, yazildiGerekcesi);
        continue;
      }

      const ad = g.uyeler[0].baslik;
      log(`\n[${[...g.siteler].join(', ')}] ${ad}`);
      try {
        const secilen = [];
        for (const etiket of g.siteler) secilen.push(g.uyeler.find((u) => u.kaynak.etiket === etiket));
        const kaynaklar = [];
        // Metni kullanılan kaynakların adı ve adresi; haberde şifreli kaynakIzi olarak durur. Hepsi birincil kaynaksa
        // (resmi) ad ve bağlantı ayrıca açık yazılır (resmi-kaynak.mjs).
        const kullanilan = [];
        for (const u of secilen.slice(0, 3)) {
          const metin = await B.tamMetin(u);
          if (metin.length >= 200) {
            kullanilan.push({ ad: u.kaynak.ad, url: u.link, resmi: u.kaynak.resmi === true });
            kaynaklar.push({
              baslik: u.baslik,
              metin,
              tarih: u.tarih.toISOString().slice(0, 10),
            });
          }
        }
        // 250–400 kelimelik haber yalnız kaynaktaki olgulardan kurulur; kısa özetten uzun haber yazılmaz (dolgu riski).
        if (kaynaklar.reduce((n, k) => n + k.metin.length, 0) < EN_AZ_KAYNAK) {
          const gerekce = kaynaklar.length ? 'kaynak metni çok kısa' : 'metin okunamadı';
          ozet.atlanan.push(`${ad} (${gerekce})`);
          ele(g, gerekce);
          continue;
        }

        let t = await B.taslakYaz(kaynaklar);
        if (!t) break;
        if (!t.ayniOlay && g.uyeler.length > 1) {
          log(`  aynı olay değil: ${t.neden}`);
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
          ele(g, `uygun değil (${t.neden})`);
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
          log(`  düzeltme turu ${tur}: ${sorunlar.join(' | ')}`);
          const duzeltilmis = await B.duzelt(t, kaynakBirlesik, sorunlar, duzeltmeAyrintisi(t, kaynakBirlesik));
          if (!duzeltilmis) {
            duzeltmeCevapsiz = true;
            break;
          }
          t = yerelDuzelt(duzeltilmis);
          sorunlar = denetle(t);
        }
        if (duzeltmeCevapsiz && sorunlar.length) {
          log(`  düzeltme turu cevapsız; haber bu tur yayımlanmadı, sonraki turda yeniden denenecek: ${sorunlar.join(' | ')}`);
          ozet.atlanan.push(`${t.tr?.title || ad} (düzeltme cevapsız, bekliyor)`);
          continue;
        }
        grupBitti(g);
        if (sorunlar.length) {
          log(`  YAYIMLANMADI: ${sorunlar.join(' | ')}`);
          ozet.elenen.push(`${t.tr?.title || ad} — ${sorunlar.join('; ')}`);
          // Yalnız uzunluk yüzünden duran olay havuza girer: dilimi bitince o dilimin kısa haberleriyle tek derleme olur.
          const uzunluk = uzunlukKontrol(t);
          // Tek yayının özel haberi derlemede de kırmızı çıkar (kapi.mjs → derlemeStandardi): havuza girmez, Gemini harcanmaz.
          // Yalnız kaynağa bağlı bu kural ön denetlenir; metne bağlı kurallar (kaynak benzerliği) derleme yeniden yazdığı için beklenir.
          let ozel = null;
          try {
            const on = haberStandardi(t, kaynakBirlesik);
            if (on.kirmizi.some((b) => b.kural === 'ozel-haber')) ozel = on;
          } catch {
            // ön denetim yapılamadı: derlemedeki kapı yine denetler
          }
          if (ozel) {
            log(`  havuza alınmadı: ${standartOzeti(ozel)}`);
            elendi(g, ozel.gerekce);
            await B.motorYaz(kirmiziKayit(g.uyeler[0].id, ozel));
          } else if (sorunlar.every((s) => uzunluk.includes(s))) {
            // uyeIdler: olayın bütün üyeleri (havuzdan derleme yazılınca ya da olay düşünce her üyeye sonuç verilir).
            durum.havuz.push({
              ...havuzOlayi({ id: g.uyeler[0].id, taslak: t, basliklar: g.uyeler.map((u) => u.baslik), kaynaklar, kullanilan, iso: simdi.toISOString() }),
              uyeIdler: g.uyeler.map((u) => u.id),
            });
            log('  havuza alındı: dilim sonunda derlemeye girecek');
            g.uyeler.forEach((u) => koy({ kimlik: kim(u), durum: 'bekliyor', gerekce: 'havuzda', havuzda: true }));
          } else elendi(g, sorunlar.join('; '));
          continue;
        }

        // Standartlar süzgeci (iki dil ayrı denetlenir, en ağır karar geçerli): kırmızı ise dosya yazılmaz, olay elendi olarak kaydedilir.
        // Süzgeç hata verirse yayımlanmaz (aşağıdaki catch: hata sayılır, haber yazılmaz).
        const yazilacak = rakamSeritleriniSuz(t, kaynakBirlesik);
        const st = haberStandardi(yazilacak, kaynakBirlesik);
        if (st.karar !== 'temiz') log(`  ${standartOzeti(st)}`);
        if (st.karar === 'kirmizi') {
          ozet.elenen.push(`${t.tr?.title || ad} — ${st.gerekce}`);
          elendi(g, st.gerekce);
          await B.motorYaz(kirmiziKayit(g.uyeler[0].id, st));
          continue;
        }
        // Yayın kapısı, ikinci okuma (kapi null ise atlanır: bugünkü davranış). Ayar hatası fırlar, catch turu durdurur.
        let kapiGerekce = '';
        if (typeof kapi === 'function') {
          const r = await kapi(kapiMetinleri(yazilacak));
          if (r.karar === 'elendi') {
            log(`  kapı: elendi — ${temiz(r.gerekce ?? '')}`);
            ozet.elenen.push(`${t.tr?.title || ad} — ${r.gerekce}`);
            const s = kapiKirmizi(r.gerekce);
            elendi(g, s.gerekce);
            await B.motorYaz(kirmiziKayit(g.uyeler[0].id, s));
            continue;
          }
          if (r.karar !== 'gec') {
            // bekle (ya da tanınmayan karar): yazılmaz, denetim hatası gibi bekler; kapı hatası haberin suçu değil, deneme sayılmaz.
            log(`  kapı: bekle — ${temiz(r.gerekce ?? r.hata ?? '')}`);
            ozet.atlanan.push(`${t.tr?.title || ad} (kapı bekletti)`);
            g.uyeler.forEach((u) => delete durum.gorulen[u.id]); // grupBitti işaretini geri al: sonraki turda yeniden denenir
            g.uyeler.forEach((u) => koy({ kimlik: kim(u), durum: 'bekliyor', gerekce: temiz(r.gerekce ?? 'kapı bekletti'), hata: new Error(temiz(r.hata ?? r.gerekce ?? 'kapı bekletti')), sayilmaz: true }));
            continue;
          }
          kapiGerekce = r.gerekce ?? '';
        }
        const slug = await B.ucDilliHaberYaz(rot, {
          ...yazilacak,
          date: simdi.toISOString(),
          kaynakIzi: kaynakIzi(kullanilan),
          kaynaklar: resmiKaynakListesi(kullanilan),
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
        log(`  yazıldı (TR/EN): ${slug}`);
        yazildi(g, slug);
        // Defterde ilk biten kayıt gerekçeyi taşır: sarı gerekçe ile kapının gerekçesi tek kayıtta birleşir.
        const birlesik = gerekceBirlestir(st.karar === 'sari' ? st.gerekce : '', kapiGerekce);
        if (st.karar === 'sari' || birlesik) await B.motorYaz({ ...sariKayit(g.uyeler[0].id, slug, st), gerekce: birlesik });
        ozet.yazilan.push(`${slug} (${t.tr.title})`);
      } catch (e) {
        console.warn(`  hata: ${adresiSil(e.message)}`);
        ozet.hata.push(`${ad}: ${adresiSil(e.message)}`);
        if (e.ayar) {
          ayarHatasi = e;
          break;
        }
        // Habere özgü hata: 3 denemeden sonra görüldü sayılır (her turda Gemini harcamasın).
        const hh = (durum.hatalar[g.uyeler[0].id] ??= { sayi: 0 });
        hh.sayi++;
        hh.mesaj = adresiSil(e.message);
        hh.zaman = simdi.toISOString();
        if (hh.sayi >= EN_FAZLA_HATA) ele(g, '3 denemede yazılamadı');
        else g.uyeler.forEach((u) => koy({ kimlik: kim(u), durum: 'bekliyor', hata: new Error(temiz(e.message)) }));
      }
    }

    // Kısa haber havuzu: dilimi (açılış/öğle/kapanış) biten kısa haberler, kategori aranmadan tek bir iki dilli derleme yazısı olur (havuz.mjs).
    try {
      const onceki = [...durum.havuz];
      const yazilanOlaylar = new Set(); // derlemeye giren olaylar
      const atlananOlaylar = new Set(); // kırmızı çıkıp derlemeden atılan olaylar
      const bekleyenOlaylar = new Set(); // kapı bekletti: bu turda sonuçları bekliyor (sayılmaz) olarak verildi
      const sh = await havuzuIsle(durum.havuz, {
        simdi,
        // Bu arada (bu turda ya da son 72 saatte) tam haber olarak yazılan olay düşer.
        mukerrer: (o) => mukerrerBul({ basliklar: o.basliklar, metinler: [] }, bellek, { simdi })?.neden ?? null,
        yaz: async (grup, kaynak) => {
          const t = await B.derlemeYaz(grup, kaynak);
          return t && yerelDuzelt(t);
        },
        uzat: async (x, grup, kaynak, enAz) => yerelDuzelt({ ...(await B.derlemeUzat(x, grup, kaynak, enAz)), category: x.category }),
        // Derlemenin uzunluk alt sınırı haber sayısına göre (havuz.mjs → derlemeEnAz).
        denetle: (x, kaynak, n) => [...kesinKontroller(x, kaynak), ...uzunlukKontrol(x, derlemeEnAz(n), derlemeAraligi(n)), ...baslikKontrol(x)],
        // Uzun başlık düzeltmeye girer ama derlemeyi düşürmez.
        yumusak: (x) => baslikUzunlukKontrol(x),
        duzelt: async (x, kaynak, sorunlar) => {
          const d = await B.duzelt(x, kaynak, sorunlar, duzeltmeAyrintisi(x, kaynak));
          return d && yerelDuzelt({ ...d, category: x.category });
        },
        // Standartlar süzgeci: kırmızı madde atlanır, yazı bütünüyle düşmez (kapi.mjs → derlemeStandardi).
        // Ardından yayın kapısı (kapi null ise yok): elendi -> bütün üyeler elenir, bekle -> üyeler bekler (sayılmaz), gec -> gerekçe kaydet'e gider.
        standart: async (x, grup) => {
          const sf = derlemeStandardi(x, grup);
          if (!sf.yayin || typeof kapi !== 'function') return sf;
          const r = await kapi(kapiMetinleri(rakamSeritleriniSuz(sf.t, derlemeKaynagi(sf.grup))));
          if (r.karar === 'elendi') {
            const s = kapiKirmizi(r.gerekce);
            return { ...sf, yayin: false, s, atlanan: [...sf.atlanan, ...sf.grup.map((o) => ({ o, s }))] };
          }
          if (r.karar !== 'gec') {
            log(`  kapı: derleme bekletildi — ${temiz(r.gerekce ?? r.hata ?? '')}`);
            for (const o of sf.grup) {
              bekleyenOlaylar.add(o);
              uyeler(o).forEach((kimlik) => koy({ kimlik, durum: 'bekliyor', gerekce: temiz(r.gerekce ?? 'kapı bekletti'), hata: new Error(temiz(r.hata ?? r.gerekce ?? 'kapı bekletti')), sayilmaz: true }));
            }
            return { ...sf, yayin: false, s: { ...sf.s, gerekce: r.gerekce ?? 'kapı bekletti' } };
          }
          return { ...sf, s: { ...sf.s, kapiGerekce: gerekceBirlestir(sf.s.karar === 'sari' ? sf.s.gerekce : '', r.gerekce) } };
        },
        atla: async (o, s) => {
          log(`  derleme maddesi atlandı: ${standartOzeti(s)}`);
          atlananOlaylar.add(o);
          uyeler(o).forEach((kimlik) => koy({ kimlik, durum: 'elendi', gerekce: temiz(s.gerekce) }));
          await B.motorYaz(kirmiziKayit(o.id, s));
        },
        kaydet: async (x, grup, kaynak, s) => {
          x = dilimBasligiEkle(x, grup); // başlığa dilim eki (denetimden sonra)
          if (s?.karar === 'sari') log(`  ${standartOzeti(s)}`);
          const slug = await B.ucDilliHaberYaz(rot, {
            ...rakamSeritleriniSuz(x, kaynak),
            date: simdi.toISOString(),
            kaynakIzi: kaynakIzi(grup.flatMap((o) => o.kullanilan ?? [])),
            kaynaklar: resmiKaynakListesi(grup.flatMap((o) => o.kullanilan ?? [])),
            featured: false,
            draft: false,
          });
          const kayit = { zaman: simdi.toISOString(), basliklar: grup.flatMap((o) => o.basliklar) };
          durum.yayinlanan[slug] = kayit;
          bellek.push(...bellekKur(['tr', 'en'].map((d) => ({ slug, date: kayit.zaman, title: x[d].title, description: x[d].description })), { [slug]: kayit }));
          yazilanSayi++;
          ozet.yazilan.push(`${slug} (derleme: ${x.tr.title})`);
          // Derlemedeki her olayın üyeleri yazıldı.
          grup.forEach((o) => {
            yazilanOlaylar.add(o);
            uyeler(o).forEach((kimlik, ui) => {
              koy({ kimlik, durum: 'yazildi', slug });
              gorulduIsaretle(o.uyeIdler?.[ui] ?? o.id);
            });
          });
          if (s?.karar === 'sari' || s?.kapiGerekce) await B.motorYaz({ ...sariKayit(grup[0].id, slug, s), gerekce: s.kapiGerekce ?? s.gerekce });
          return slug;
        },
        surVar: () => !payNedeni(),
        log,
      });
      const kalan = new Set(sh.havuz);
      // Havuzdan düşenler (süresi doldu, dilimde eş yok, mükerrer, yazılamayan derleme): derlemeye girmeyen ve kalmayan olaylar.
      for (const o of onceki) {
        if (kalan.has(o) || yazilanOlaylar.has(o) || atlananOlaylar.has(o) || bekleyenOlaylar.has(o)) continue;
        uyeler(o).forEach((kimlik, ui) => {
          koy({ kimlik, durum: 'elendi', gerekce: 'kısa, eş bulunamadı' });
          gorulduIsaretle(o.uyeIdler?.[ui] ?? o.id);
        });
      }
      durum.havuz = sh.havuz;
      if (sh.ayarHatasi) {
        ozet.hata.push(`derleme: ${adresiSil(sh.ayarHatasi.message)}`);
        ayarHatasi ??= sh.ayarHatasi;
      }
    } catch (e) {
      console.warn(`havuz hatası: ${adresiSil(e.message)}`);
      ozet.hata.push(`havuz: ${adresiSil(e.message)}`);
    }

    if (ayarHatasi) {
      ayarHatasi.sonuclar = sonuclar;
      throw ayarHatasi;
    }
    return sonuclar;
  }

  return { adaylar, isle, kuru, ozet, simdi };
}

/**
 * Motor yokken yerel tur: karar bekleyen adaylar (gorulen'de olmayanlar) işlenir; yazildi / elendi / havuzda olan her üye
 * gorulen'e işaretlenir, bekleyenler (puanlanamayan, düzeltmesi cevapsız, payı dolan) işaretlenmez. Bugünkü davranışın aynısı.
 * Turu durduran ayar hatası ayarHatasi olarak döner (eskiden de tur durur, durum yine yazılırdı).
 */
export async function yerelTur(uyarlayici, durum, { log } = {}) {
  const hepsi = await uyarlayici.adaylar({ log });
  const kimden = new Map(hepsi.map((a) => [a.kimlik, a.yuk.id]));
  let sonuclar;
  let ayarHatasi = null;
  try {
    sonuclar = await uyarlayici.isle(gorulmeyen(hepsi, durum), { log });
  } catch (e) {
    if (!Array.isArray(e?.sonuclar)) throw e;
    sonuclar = e.sonuclar;
    ayarHatasi = e;
  }
  const zaman = (uyarlayici.simdi ?? new Date()).toISOString();
  for (const s of sonuclar) {
    const karar = s.durum === 'yazildi' || s.durum === 'elendi' || (s.durum === 'bekliyor' && s.havuzda);
    const id = kimden.get(s.kimlik);
    if (karar && id) durum.gorulen[id] ??= zaman;
  }
  return { sonuclar, ayarHatasi };
}
