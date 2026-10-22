// Standartlar Raporu ve Şikâyet Prosedürü için saf hesaplar (Astro'ya bağımlı değildir; düz `node` ile test edilir).
// Sayfalar: src/pages/tr/standartlar-raporu.astro, src/pages/en/standards-report.astro,
// bileşen: src/components/sayfalar/StandartlarRaporu.astro.
//
// Veri iki yerden gelir:
//   1) Çeyrek bitince botun yazdığı defter sayıları: src/data/standartlar-raporu/<YYYY>-c<N>.json
//      { ceyrek:"2026-c4", bas:"2026-10-01", son:"2026-12-31", defterBaslangici:"2026-10-20", yazildi, elendi, kirmizi, sari,
//        kurallar:{ kirmizi:{ kod:n }, sari:{ kod:n } }, geminiCagri, kuralDegisiklikleri:["YYYY-MM-DD"] | null, uretim }
//      Defter sayıları iki dilli haber çiftini tek haber sayar.
//   2) Sitenin kendi içeriği (derleme anında, çeyrek aralığında, İstanbul günü): otomatik yazılan haber, yayıncının adıyla
//      çıkan yazı, düzeltme/kaldırma, şikâyet.
//
// Şikâyet kaydı: src/data/sikayetler.json, her karara bağlanan şikâyet için tek satır (kimlik ve metin YAZILMAZ):
//   { "alindi": "YYYY-MM-DD", "karar": "YYYY-MM-DD", "sonuc": "yerinde" | "kismen" | "yerinde-degil" }
// Rapor, kararın verildiği güne göre çeyreğe sayar.
import { aciklayiciMi } from './yazi-turu.mjs';
import { ZINCIR_URETIMI } from './yapayzeka-notu.mjs';
import { duzeltmeKayitlari } from './duzeltmeler.mjs';
import { sikayetYolu, standartlarRaporuYolu } from './yollar.mjs';

// Sayfa yolları src/lib/yollar.mjs'de (dil değiştirici için); burada yeniden dışa aktarılır.
export { sikayetYolu, standartlarRaporuYolu };

/** İstanbul takvim günü (YYYY-AA-GG). */
export const istanbulGunu = (t) => new Date(t).toLocaleDateString('sv-SE', { timeZone: 'Europe/Istanbul' });

/** Gün (YYYY-AA-GG) çeyrek aralığında mı (uçlar dahil)? */
export const aralikta = (gun, bas, son) => gun >= bas && gun <= son;

/** Kural kodunun okur için adı; bilinmeyen kod olduğu gibi döner. */
export const KURAL_ADLARI = {
  tr: {
    suc: 'suç',
    cocuk: 'çocuk',
    intihar: 'intihar',
    teror: 'terör',
    'savas-dili': 'savaş tarafı dili',
    'grup-genelleme': 'grup genellemesi',
    'turkiye-devlet': 'Türkiye devlet büyükleri',
    'yatirim-tavsiyesi': 'yatırım tavsiyesi',
    'ozel-haber': 'tek yayının özel haberi',
    'kaynak-benzerligi': 'kaynağa fazla benzerlik',
    'medya-adi': 'medya adı',
    'olum-kaza': 'ölüm ve kaza',
    'turkiye-resmi': 'Türkiye resmî kurumları',
    'savas-konu': 'savaş',
    secim: 'seçim',
    'grup-konu': 'grup konuları',
    'kurum-degerlendirme': 'kurum değerlendirmesi',
    'suc-genel': 'suç (genel)',
  },
  en: {
    suc: 'crime',
    cocuk: 'children',
    intihar: 'suicide',
    teror: 'terrorism',
    'savas-dili': 'partisan war language',
    'grup-genelleme': 'group generalisation',
    'turkiye-devlet': 'Turkish state leaders',
    'yatirim-tavsiyesi': 'investment advice',
    'ozel-haber': "another outlet's exclusive",
    'kaynak-benzerligi': 'too close to the source text',
    'medya-adi': 'media name',
    'olum-kaza': 'deaths and accidents',
    'turkiye-resmi': 'Turkish authorities',
    'savas-konu': 'war',
    secim: 'elections',
    'grup-konu': 'group-related topics',
    'kurum-degerlendirme': 'judgements of institutions',
    'suc-genel': 'crime (general)',
  },
};

export const kuralAdi = (kod, dil) => KURAL_ADLARI[dil]?.[kod] ?? kod;

/** Rakamı 0 (ya da sayı olmayan) olan kural satırı yazılmaz; çoktan aza, eşitte ada göre. → [{ kod, ad, n }] */
export function kuralSatirlari(kurallar, dil) {
  return Object.entries(kurallar ?? {})
    .filter(([, n]) => Number.isFinite(n) && n > 0)
    .map(([kod, n]) => ({ kod, ad: kuralAdi(kod, dil), n }))
    .sort((a, b) => b.n - a.n || a.ad.localeCompare(b.ad, dil));
}

/** Kırmızıya takılmayan elenen aday sayısı: elendi − kirmizi, negatif olmaz. */
export const kalanElenen = (elendi, kirmizi) => Math.max(0, (elendi ?? 0) - (kirmizi ?? 0));

/**
 * Çeyrekte yayımlanan haberler. `haberler` tek dilin (Türkçe) koleksiyonudur: bir TR/EN çifti tek haber sayılır.
 * Bültenler şeffaflık sayfasındaki gibi ayrılmaz; yapay zekâ notu kodunun (yapayzeka-notu.mjs) ayırdığı gibi
 * sınıflanır: zincir (uretim: yazi-isleri) önce, sonra açıklayıcı/referans yazı = yayıncının adıyla, kalanı otomatik.
 * @param {{ data: { date: Date; uretim?: string; yaziTuru?: string } }[]} haberler
 */
export function yayinSayilari(haberler, bas, son) {
  let otomatik = 0;
  let yayinci = 0;
  let zincir = 0;
  for (const h of haberler ?? []) {
    if (!aralikta(istanbulGunu(h.data.date), bas, son)) continue;
    if (h.data.uretim === ZINCIR_URETIMI) zincir++;
    else if (aciklayiciMi(h.data)) yayinci++;
    else otomatik++;
  }
  return { otomatik, yayinci, zincir };
}

/** Çeyrekteki düzeltme ve kaldırma sayısı (Düzeltmeler sayfasıyla aynı kayıt kodu; tarih İstanbul günüdür). */
export function duzeltmeSayilari(haberler, kaldirilan, bas, son) {
  const kayitlar = duzeltmeKayitlari(haberler ?? [], kaldirilan ?? [], 'tr', (id) => id).filter((k) =>
    aralikta(istanbulGunu(k.tarih), bas, son),
  );
  return {
    duzeltme: kayitlar.filter((k) => k.tur === 'duzeltme').length,
    kaldirilan: kayitlar.filter((k) => k.tur === 'kaldirildi').length,
  };
}

/** Çeyrekte karara bağlanan şikâyetler ve sonuçları. Bilinmeyen sonuç toplama girer, kırılıma girmez. */
export function sikayetSayilari(sikayetler, bas, son) {
  const liste = (sikayetler ?? []).filter((s) => s?.karar && aralikta(s.karar, bas, son));
  const say = (sonuc) => liste.filter((s) => s.sonuc === sonuc).length;
  return { toplam: liste.length, yerinde: say('yerinde'), kismen: say('kismen'), yerindeDegil: say('yerinde-degil') };
}

/** Raporları en yeniden eskiye (başlangıç gününe göre) sıralar; girdiyi değiştirmez. */
export const raporlariSirala = (raporlar) => [...(raporlar ?? [])].sort((a, b) => b.bas.localeCompare(a.bas));

/** Bir çeyreğin sayfa verisi: defter (JSON) + sitenin kendi sayıları. */
export function ceyrekVerisi(rapor, { haberler, kaldirilan, sikayetler }, dil = 'tr') {
  const { bas, son } = rapor;
  return {
    ...rapor,
    defterNotu: Boolean(rapor.defterBaslangici && rapor.defterBaslangici > bas),
    yayin: yayinSayilari(haberler, bas, son),
    duzeltme: duzeltmeSayilari(haberler, kaldirilan, bas, son),
    sikayet: sikayetSayilari(sikayetler, bas, son),
    kalan: kalanElenen(rapor.elendi, rapor.kirmizi),
    kirmiziSatirlari: kuralSatirlari(rapor.kurallar?.kirmizi, dil),
    sariSatirlari: kuralSatirlari(rapor.kurallar?.sari, dil),
  };
}
