// Kısa haber havuzu ve dilim derlemesi: yalnızca uzunluk denetiminden (denetci.mjs → uzunlukKontrol) geçemediği için
// yayımlanmayan olaylar çöpe gitmez, havuza girdikleri dilimin (açılış 06-12, öğle 12-18, kapanış 18-06; İstanbul) sonuna
// kadar bekler. Dilim bitince o dilimin kısa haberleri kategori aranmadan tek bir iki dilli (TR/EN) derleme yazısı olur
// (en az DERLEME_EN_AZ, en çok DERLEME_AZAMI haber; yazıda her kategori ara başlık). Kısa haber tek başına yayımlanmaz.
// Derleme de aynı denetimlerden geçer. Dilimde eşi olmayan tek haber, bu arada başka kaynaktan tam haber olarak yazılan ya
// da derlemesi yayımlanamayan olay havuzdan düşer (jendume'de bülten satırına düşme yolu yok; bir sonraki dilime devretmek
// de dilim anlamını bozardı). Derlemenin başlığına dilim eki gelir: "… · 18 Ekim, öğle" / "… · 18 October, midday".
// Olaylar kaynak metni ve adresi taşır: durum dosyasında kayıt başına şifreli durur (gizli.mjs). Anahtar yoksa havuz
// yazılmaz; düz metin hiçbir zaman dosyaya girmez.
import { anahtarVar, coz, sifrele } from './gizli.mjs';
import { kelimeSayisi, uzunlukKontrol } from './denetci.mjs';

export const HAVUZ_SAAT = 24; // en uzun dilim 12 saat; derleme dilim bitince ilk turda yazılır, kalanı için pay
export const HAVUZ_AZAMI = 24; // üç dilimlik birikim (3 x DERLEME_AZAMI); aşan en eski olaylar düşer
export const DERLEME_EN_AZ = 2; // bir derlemede en az bu kadar kısa olay
export const DERLEME_AZAMI = 8; // bir derlemede en fazla bu kadar kısa olay; fazlası dilimde dengeli bölünür
export const DERLEME_MAKS = 2; // bir çalıştırmada en fazla derleme sayısı
const KAYNAK_AZAMI = 3500; // olay başına saklanan kaynak metni (derleme isteminde de bu kadarı kullanılır)
const DUZELTME_TURU = 2;
const BOZUK_GOVDE = 30; // düzeltmeden bu kadar kelimeden az gövde dönerse (öncesi daha uzunken) yanıt bozuktur

// Düzeltilmiş taslağın bir dildeki gövdesi BOZUK_GOVDE'nin altına düştüyse (öncesi üstündeyken) düzeltme bozuktur.
const bozukGovde = (d, t) =>
  ['tr', 'en'].some((dil) => kelimeSayisi(d[dil]?.body) < BOZUK_GOVDE && kelimeSayisi(t[dil]?.body) >= BOZUK_GOVDE);

const yas = (o, simdi) => (simdi.getTime() - Date.parse(o.havuzaGirdi)) / 3600e3;

// Kısa kalan taslaktan havuz olayı: id (olayın ilk kaynağı), kategori, TR başlık, kaynak başlıkları, kırpılmış kaynak
// metinleri ve haberde şifreli iz olacak kullanılan kaynaklar.
export function havuzOlayi({ id, taslak, basliklar, kaynaklar, kullanilan, iso }) {
  return {
    id,
    kategori: taslak.category,
    baslik: taslak.tr?.title ?? basliklar[0] ?? '',
    basliklar,
    kaynaklar: kaynaklar.map((k) => ({ baslik: k.baslik, tarih: k.tarih, metin: String(k.metin).slice(0, KAYNAK_AZAMI) })),
    kullanilan,
    havuzaGirdi: iso,
  };
}

export function havuzAc(kayitlar = []) {
  if (!anahtarVar()) return [];
  const acik = [];
  for (const k of kayitlar) {
    try {
      acik.push({ ...coz(k.sifreli), havuzaGirdi: k.havuzaGirdi, sifreli: k.sifreli });
    } catch {
      // çözülemeyen kayıt (anahtar değişti) düşer
    }
  }
  return acik;
}

// Durum dosyasına yazılacak biçim: yalnız kimlik, kategori, giriş zamanı ve şifreli olay.
export function havuzKapat(olaylar = []) {
  if (!anahtarVar()) return [];
  return olaylar.map(({ sifreli, havuzaGirdi, ...o }) => ({ id: o.id, kategori: o.kategori ?? '', havuzaGirdi, sifreli: sifreli ?? sifrele(o) }));
}

const TR_AY = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const EN_AY = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DILIM_ADLARI = { acilis: { tr: 'açılış', en: 'opening' }, ogle: { tr: 'öğle', en: 'midday' }, kapanis: { tr: 'kapanış', en: 'closing' } };

// İstanbul dilimi: açılış 06-12, öğle 12-18, kapanış 18-06. Gece yarısından sonrası bir önceki günün kapanışıdır.
// Türkiye yaz saati uygulamıyor (UTC+3 sabit).
export function bultenDilimi(simdi) {
  const ist = new Date(simdi.getTime() + 3 * 3600e3);
  const saat = ist.getUTCHours();
  const dilim = saat >= 6 && saat < 12 ? 'acilis' : saat >= 12 && saat < 18 ? 'ogle' : 'kapanis';
  const p = saat < 6 ? new Date(ist.getTime() - 6 * 3600e3) : ist;
  const [y, m, g] = [p.getUTCFullYear(), p.getUTCMonth(), p.getUTCDate()];
  const anahtar = `${y}-${String(m + 1).padStart(2, '0')}-${String(g).padStart(2, '0')}:${dilim}`;
  return { anahtar, dilim, gun: g, ay: { tr: TR_AY[m], en: EN_AY[m] }, ad: DILIM_ADLARI[dilim] };
}

export const dilimAnahtari = (o) => bultenDilimi(new Date(o.havuzaGirdi)).anahtar;

// Başlık eki, dile göre: "18 Ekim, öğle" / "18 October, midday".
export function dilimEki(o) {
  const d = bultenDilimi(new Date(o.havuzaGirdi));
  return { tr: `${d.gun} ${d.ay.tr}, ${d.ad.tr}`, en: `${d.gun} ${d.ay.en}, ${d.ad.en}` };
}

// Derleme taslağının TR ve EN başlıklarına dilim eki ekler (denetimden sonra): "… · 18 Ekim, öğle" / "… · 18 October, midday".
export function dilimBasligiEkle(taslak, grup) {
  const ek = dilimEki(grup[0]);
  return { ...taslak, tr: { ...taslak.tr, title: `${taslak.tr.title} · ${ek.tr}` }, en: { ...taslak.en, title: `${taslak.en.title} · ${ek.en}` } };
}

// Derleme alt sınırı: n haber için min(üst, max(150, n x 20)) kelime; üst sınır tek haberin dil eşiğidir (TR 180, EN 200).
// Sekiz haberlik derleme de tek haberlik eşikten fazlasını taşımaz.
export const derlemeEnAz = (n) => ({ tr: Math.min(180, Math.max(150, n * 20)), en: Math.min(200, Math.max(150, n * 20)) });

// Derleme gövde hedefi (dil başına): haber başına 50-80 kelimelik paragraf.
export const derlemeHedefi = (n) => ({ alt: Math.max(250, n * 50), ust: Math.max(400, n * 80) });
// Düzeltme isteminde gösterilen aralık: "300–480".
export const derlemeAraligi = (n) => `${derlemeHedefi(n).alt}–${derlemeHedefi(n).ust}`;

// Gruptaki haberleri kategoriye göre kümeler (kategoriler ilk görünüş sırasıyla); ara başlıklar bu sıradadır.
export function kategoriyeSirala(grup) {
  const sira = [...new Set(grup.map((o) => o.kategori))];
  return [...grup].sort((a, b) => sira.indexOf(a.kategori) - sira.indexOf(b.kategori));
}

// Dilimi bitmiş olayları dilime göre gruplar; eski dilim önce. Dilim içinde en yeni olay önce seçilir.
// Bir dilimin DERLEME_AZAMI'dan fazla olayı dengeli bölünür (9 olay -> 5 + 4), böylece artan tek olay kalmaz.
// Dilimde DERLEME_EN_AZ'dan az olay varsa grup olmaz: tek kalan olay artan'a girer (havuzdan düşer).
export function dilimGruplari(olaylar) {
  const dilimler = new Map();
  for (const o of olaylar) {
    const d = dilimAnahtari(o);
    if (!dilimler.has(d)) dilimler.set(d, []);
    dilimler.get(d).push(o);
  }
  const gruplar = [];
  const artan = [];
  // Anahtar "YYYY-MM-DD:dilim"; düz sıralama aynı günde kapanışı öğleden önce koyar, dilimler gün içi sırayla dizilir.
  const SIRA = { acilis: 0, ogle: 1, kapanis: 2 };
  const anahtarSirasi = (k) => { const [g, d] = k.split(':'); return `${g}:${SIRA[d] ?? 9}`; };
  for (const d of [...dilimler.keys()].sort((a, b) => anahtarSirasi(a).localeCompare(anahtarSirasi(b)))) {
    const sirali = [...dilimler.get(d)].sort((a, b) => Date.parse(b.havuzaGirdi) - Date.parse(a.havuzaGirdi));
    if (sirali.length < DERLEME_EN_AZ) {
      artan.push(...sirali);
      continue;
    }
    const k = Math.ceil(sirali.length / DERLEME_AZAMI);
    const taban = Math.floor(sirali.length / k);
    let fazla = sirali.length % k;
    let i = 0;
    for (let j = 0; j < k; j++) {
      const n = taban + (fazla-- > 0 ? 1 : 0);
      gruplar.push(kategoriyeSirala(sirali.slice(i, i + n)));
      i += n;
    }
  }
  return { gruplar, artan };
}

// Derleme yazarının ve denetimin kaynağı: her haberin kaynakları kendi bölümünde.
export const derlemeKaynagi = (grup) =>
  grup.map((o, i) => `### ${i + 1}. ${o.baslik}\n${o.kaynaklar.map((k) => `${k.baslik}\n${k.metin}`).join('\n\n')}`).join('\n\n---\n\n');

/**
 * Havuzu bir tur ilerletir. Bağımlılıklar:
 *   mukerrer(o) → gerekçe | null   (olay bu arada tam haber olarak yazıldı mı)
 *   yaz(grup, kaynak) → taslak | null;  denetle(taslak, kaynak, n) → sorun listesi;  duzelt(taslak, kaynak, sorunlar) → taslak | null
 *   uzat(taslak, grup, kaynak, enAz) → taslak (kısa derlemeyi kendi kaynaklarından genişletir)
 *   yumusak(taslak) → sorun listesi: düzeltmeye girer ama yayını durdurmaz (ör. uzun başlık)
 *   standart(taslak, grup) → { yayin, t, grup, s, atlanan: [{ o, s }] } (kapi.mjs → derlemeStandardi; ZORUNLU: yoksa hiçbir
 *     derleme yayımlanmaz); kırmızı çıkan madde atlanır (atla(o, s) çağrılır), yazı yayımlanamıyorsa yayin=false
 *   kaydet(taslak, grup, kaynak, s) → slug;  surVar() → boolean (zaman ve Gemini bütçesi)
 * Döner: { havuz: kalan olaylar, yazilan: slug listesi, ayarHatasi?: Error } — anahtar/kota hatasında tur durur.
 */
export async function havuzuIsle(havuz, { simdi, mukerrer, yaz, denetle, duzelt, uzat = async (t) => t, yumusak = () => [], standart, atla = async () => {}, kaydet, surVar = () => true, log = console.log }) {
  const simdikiDilim = bultenDilimi(simdi).anahtar;
  let kalan = [];
  for (const o of [...havuz].sort((a, b) => Date.parse(b.havuzaGirdi) - Date.parse(a.havuzaGirdi))) {
    const neden = yas(o, simdi) >= HAVUZ_SAAT ? 'süresi doldu' : kalan.length >= HAVUZ_AZAMI ? 'havuz dolu' : mukerrer(o);
    if (neden) log(`havuz: düştü (${neden}): ${o.baslik}`);
    else kalan.push(o);
  }
  // Şimdiki dilimin olayları dilim bitene kadar bekler; dilimi bitenler derlenir.
  const olgun = kalan.filter((o) => dilimAnahtari(o) !== simdikiDilim);
  const { gruplar, artan } = dilimGruplari(olgun);
  for (const o of artan) log(`havuz: düştü (dilimde eş yok): ${o.baslik}`);
  kalan = kalan.filter((o) => !artan.includes(o));
  const yazilan = [];
  let ayarHatasi;
  let denenen = 0;
  for (const grup of gruplar) {
    if (denenen >= DERLEME_MAKS || !surVar()) break; // denenmeyen grup havuzda kalır, sonraki turda yazılır
    denenen++;
    // Denenen grup sonucu ne olursa olsun havuzdan çıkar: yayımlanamayan derleme her turda Gemini harcamasın.
    kalan = kalan.filter((o) => !grup.includes(o));
    const kaynak = derlemeKaynagi(grup);
    const n = grup.length;
    const enAz = derlemeEnAz(n);
    const kisa = (x) => uzunlukKontrol(x, enAz).length > 0;
    const kelimeler = (x) => `${kelimeSayisi(x.tr?.body)} TR / ${kelimeSayisi(x.en?.body)} EN`;
    try {
      let t = await yaz(grup, kaynak);
      if (!t) {
        log(`havuz: derleme (${n} haber) yazılamadı`);
        continue;
      }
      // Kısa derleme, denetimden önce her haberin kendi kaynağıyla genişletilir.
      let uzatmaOncesi = null;
      if (kisa(t)) {
        uzatmaOncesi = kelimeler(t);
        t = await uzat(t, grup, kaynak, enAz);
      }
      let sorunlar = denetle(t, kaynak, n);
      let hafif = yumusak(t);
      let yenidenUzatildi = uzatmaOncesi !== null;
      for (let tur = 1; tur <= DUZELTME_TURU && (sorunlar.length || hafif.length); tur++) {
        log(`  derleme düzeltme turu ${tur}: ${[...sorunlar, ...hafif].join(' | ')}`);
        const d = await duzelt(t, kaynak, [...sorunlar, ...hafif]);
        if (!d) break;
        // Düzeltme gövdeyi birkaç kelimeye indirirse (22 Ekim: başlık düzeltmesi 6 TR / 8 EN kelime döndü) bu silme değil
        // bozuk yanıttır: gövde korunur, yalnız başlıklar alınır.
        if (bozukGovde(d, t)) {
          log(`  derleme düzeltmesi gövdeyi bozdu (${kelimeler(d)}); gövde korunuyor, yalnız başlıklar alındı`);
          t = { ...t, tr: { ...t.tr, title: d.tr?.title || t.tr?.title }, en: { ...t.en, title: d.en?.title || t.en?.title } };
          sorunlar = denetle(t, kaynak, n);
          hafif = yumusak(t);
          continue;
        }
        t = d;
        // Düzeltme sorunlu cümleleri silerek derlemeyi alt sınırın altına indirebilir: bir kez daha genişletilir.
        if (kisa(t) && !yenidenUzatildi) {
          yenidenUzatildi = true;
          uzatmaOncesi = kelimeler(t);
          t = await uzat(t, grup, kaynak, enAz);
        }
        sorunlar = denetle(t, kaynak, n);
        hafif = yumusak(t);
      }
      if (hafif.length) log(`  derleme yumuşak sorunla sürüyor: ${hafif.join(' | ')}`);
      if (sorunlar.length) {
        const ek = uzatmaOncesi === null ? '' : ` (uzatmadan önce ${uzatmaOncesi})`;
        log(`havuz: derleme (${n} haber) YAYIMLANMADI: ${sorunlar.join(' | ')}${ek}`);
        continue;
      }
      // Standartlar süzgeci (kırmızı çizgiler): hata fırlatırsa (ya da süzgeç verilmemişse) derleme yayımlanmaz.
      if (typeof standart !== 'function') throw new Error('standart süzgeci yok; derleme yayımlanmaz');
      const sf = standart(t, grup);
      for (const a of sf.atlanan) await atla(a.o, a.s);
      if (!sf.yayin) {
        log(`havuz: derleme (${n} haber) YAYIMLANMADI: ${sf.s.gerekce}`);
        continue;
      }
      let yaz2 = sf.t;
      let kaynak2 = kaynak;
      if (sf.grup.length !== n) {
        // Kırmızı maddeler atlandı: kalan derleme alt sınırları ve denetimleri yeniden geçmeli.
        kaynak2 = derlemeKaynagi(sf.grup);
        const sorun2 = denetle(yaz2, kaynak2, sf.grup.length);
        if (sorun2.length) {
          log(`havuz: derleme (${n} haber) madde atlandıktan sonra YAYIMLANMADI: ${sorun2.join(' | ')}`);
          continue;
        }
        log(`havuz: derleme ${n - sf.grup.length} madde atlanarak yayımlanıyor (${sf.atlanan.map((a) => a.s.gerekce).join('; ')})`);
      }
      const slug = await kaydet(yaz2, sf.grup, kaynak2, sf.s);
      yazilan.push(slug);
      log(`havuz: derleme yazıldı (TR/EN, ${sf.grup.length} haber): ${slug}`);
    } catch (e) {
      if (e.ayar) {
        kalan.push(...grup); // anahtar/kota hatası olayların suçu değil: beklemeye devam
        ayarHatasi = e;
        break;
      }
      log(`havuz: derleme hatası: ${e.message}`);
    }
  }
  if (kalan.length) log(`havuz: ${kalan.length} kısa haber dilim sonunu bekliyor`);
  return { havuz: kalan, yazilan, ayarHatasi };
}
