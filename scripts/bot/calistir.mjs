// jendume iki dilli (TR, EN) yapay zekâ haber botu çalıştırıcısı.
// Kuru çalışma: node scripts/bot/calistir.mjs --kuru
// Canlı çalışma: GEMINI_API_KEY=... node scripts/bot/calistir.mjs
import { writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { KAYNAKLAR, anahtarlar, baslikTemiz, benzer, haberKimligi, tamMetin } from './kaynaklar.mjs';
import { MIN_DEGER, onbellekliPuanla, taslakYaz, duzelt, derlemeYaz } from './yazar.mjs';
import { ciftleriKur, onbellekliEsle, ozelAdlar, uygula } from './esleme.mjs';
import { baslikKontrol, kesinKontroller, uzunlukKontrol, yerelDuzelt } from './denetci.mjs';
import { BELLEK_SAAT, bellekKur, grupAdayi, mukerrerBul } from './mukerrer.mjs';
import { hentTekst, jsonOku, rssOku, sonHaberler, ucDilliHaberYaz } from './lib.mjs';
import { butceYukle, geminiPayiBitti } from './butce.mjs';
import { adresiSil, kaynakIzi, yayinlananAc, yayinlananKapat } from './gizli.mjs';
import { havuzOlayi, havuzAc, havuzKapat, havuzuIsle } from './havuz.mjs';

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

// Katman 3 (Gemini kota planı): bu turun Gemini payı; yeni habere başlamadan önce geminiPayiBitti() sorulur.
if (!KURU) console.log(await butceYukle({ url: process.env.MOTOR_URL, anahtar: process.env.MOTOR_ANAHTARI, site: 'jendume' }));
const YAS_GUN = sayiAyar('YAS_GUN', 5);
const EN_FAZLA_HATA = 3;
// Kaynak metinlerin toplam en az uzunluğu (karakter); altında olay yazılmaz.
const EN_AZ_KAYNAK = 1200;

const durum = await jsonOku(DURUM_DOSYASI, { gorulen: {}, hatalar: {}, ayrik: {} });
durum.gorulen ??= {};
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
  const yeni = ogeler
    .map((o) => ({
      ...o,
      id: haberKimligi(k, o.guid || o.link),
      tarih: new Date(o.pubDate),
      baslik: baslikTemiz(o.title),
      kaynak: k,
    }))
    .filter((o) => o.link.startsWith('https://') && !Number.isNaN(o.tarih.valueOf()))
    .filter((o) => simdi - o.tarih <= YAS_GUN * 86_400_000)
    .filter((o) => !k.filtre || k.filtre.test(`${o.baslik} ${o.description || ''}`))
    .filter((o) => !durum.gorulen[o.id]);

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
//    Hata ya da cevapsızlıkta eski usul (yerli önce, yeni önce); tur düşmez.
const puan = new Map();
if (sira.length) {
  try {
    const sonuc = await onbellekliPuanla(
      sira.map((g) => g.uyeler.map((u) => u.baslik).join(' / ')),
      sira.map(grupAnahtar),
      durum.puan,
      { zaman: simdi.toISOString() },
    );
    if (sonuc === null) throw new Error('cevap yok');
    sonuc.forEach((p, n) => puan.set(sira[n], p));
    const disari = sira.filter((g) => puan.get(g) < MIN_DEGER);
    for (const g of disari) {
      console.log(`${puan.get(g) === 0 ? 'kapsam dışı' : `düşük haber değeri (${puan.get(g)})`}: ${g.uyeler[0].baslik}`);
      grupBitti(g);
    }
    sira = sira.filter((g) => puan.get(g) >= MIN_DEGER);
  } catch (e) {
    puan.clear();
    console.warn(`Ön eleme yapılamadı (${adresiSil(e.message)}); bütün olaylar yazara gidecek.`);
  }
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
    for (let tur = 1; tur <= 2 && sorunlar.length; tur++) {
      console.log(`  düzeltme turu ${tur}: ${sorunlar.join(' | ')}`);
      const duzeltilmis = await duzelt(t, kaynakBirlesik, sorunlar);
      if (!duzeltilmis) break;
      t = yerelDuzelt(duzeltilmis);
      sorunlar = denetle(t);
    }
    grupBitti(g);
    if (sorunlar.length) {
      console.log(`  YAYIMLANMADI: ${sorunlar.join(' | ')}`);
      ozet.elenen.push(`${t.tr?.title || ad} — ${sorunlar.join('; ')}`);
      // Yalnız uzunluk yüzünden duran olay havuza girer: aynı kategoriden eşi gelince derleme olur.
      const uzunluk = uzunlukKontrol(t);
      if (sorunlar.every((s) => uzunluk.includes(s))) {
        havuz.push(havuzOlayi({ id: g.uyeler[0].id, taslak: t, basliklar: g.uyeler.map((u) => u.baslik), kaynaklar, kullanilan, iso: simdi.toISOString() }));
        console.log('  havuza alındı: eş bekleyecek');
      }
      continue;
    }

    const slug = await ucDilliHaberYaz(ROT, {
      ...t,
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

// Kısa haber havuzu: aynı kategoriden biriken kısa haberler tek bir iki dilli derleme yazısı olur (havuz.mjs).
try {
  const h = await havuzuIsle(havuz, {
    simdi,
    // Bu arada (bu turda ya da son 72 saatte) tam haber olarak yazılan olay düşer.
    mukerrer: (o) => mukerrerBul({ basliklar: o.basliklar, metinler: [] }, bellek, { simdi })?.neden ?? null,
    yaz: async (grup, kaynak) => {
      const t = await derlemeYaz(grup, kaynak);
      return t && yerelDuzelt(t);
    },
    denetle: (x, kaynak) => [...kesinKontroller(x, kaynak), ...uzunlukKontrol(x), ...baslikKontrol(x)],
    duzelt: async (x, kaynak, sorunlar) => {
      const d = await duzelt(x, kaynak, sorunlar);
      return d && yerelDuzelt({ ...d, category: x.category });
    },
    kaydet: async (x, grup) => {
      const slug = await ucDilliHaberYaz(ROT, {
        ...x,
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
for (const kayit of [durum.gorulen, durum.ayrik, durum.ayni]) {
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
    `## jendume botu\n${liste('Yayımlandı (TR/EN)', ozet.yazilan)}${liste('Denetimden geçemedi', ozet.elenen)}${liste('Atlandı', ozet.atlanan)}${liste('Hata', ozet.hata)}`
  );
}
