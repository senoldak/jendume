// Çalıştırmalar arası mükerrer denetimi (Gemini'siz). Kelime benzerliği (kaynaklar.mjs benzer) ve Gemini eşlemesi
// (esleme.mjs) aynı olayı farklı kelimelerle anlatan yeni kaynakları kaçırabiliyor. Ekim 2026'da yayımlanmış kopyalar:
//   - Character.AI iflası üç kez (13.10 13:02, 16:56, 18:52)
//   - Mistlabs/Ambi 26 milyon dolar yatırımı iki kez (13.10 13:02, 20:51)
//   - Microsoft Maia çipleri iki kez (12.10 17:20, 13.10 10:50)
// Son 72 saatte yayımlanmış her haber (TR/EN başlık + özet, haberi doğuran kaynak başlıkları) bir "iz" olarak tutulur.
// Yeni olayın izi bunlardan biriyle eşleşirse olay yazılmaz, görüldü sayılır.
//
// Eşleşme kuralı (yanlış pozitifi düşük tutmak için iki koşul birden):
//   1. En az bir ortak AYIRT EDİCİ özel ad (Character.AI, Ambi, Maia; "Microsoft", "OpenAI" gibi her gün geçen büyük
//      kurumlar tek başına yetmez), ve
//   2. aynı olayı gösteren ikinci bir işaret: ortak tutar/rakam (26M ↔ 26 milyon, Maia 300) ya da başlıkta en az iki
//      ortak kelime kökü (özel adlar dışında; "files … bankruptcy" ↔ "files … bankruptcy").
import { ozelAdlar } from './esleme.mjs';
import { anahtarlar } from './kaynaklar.mjs';

export const BELLEK_SAAT = 72;

// Neredeyse her gün haberi çıkan kurum ve ürünler: ortak olmaları aynı olay demek değildir.
const GENIS = new Set(
  `openai anthropic google alphabet microsoft nvidia meta apple amazon aws deepmind chatgpt gemini claude copilot
alibaba qwen xai grok tesla ibm intel amd tsmc samsung huawei baidu tencent bytedance tiktok hugging face github mistral
perplexity cursor cloudflare oracle salesforce adobe disney netflix youtube instagram facebook whatsapp linkedin
stanford mit berkeley harvard oxford cambridge university üniversitesi beyaz saray white house kongre congress senate
avrupa birliği commission komisyonu u.s u.k gpu gpus api apis sdk agi asi llms ai
security labs lab systems technologies technology robotics intelligence research health bio cloud data network networks
studio studios foundation institute enstitüsü enstitü ventures
ipo ipos ceo cto cfo coo next code güney kuzey doğu batı south north east west`.split(/\s+/),
);
// 22-23 Ekim 2026: "Next" + 21 (4 alakasız haber), "IPO" (DeepSeek ↔ OpenAI), "Güney" + 32 aynı olay sayıldı: bunlar ad değil, her gün geçen sözcük.

// ozelAdlar Türkçe küçük harfe çevirir ("AI" → "aı"); diller arası karşılaştırma için ı → i.
const duz = (ad) => ad.replace(/ı/g, 'i');

// Özel ad mı? İç büyük harf (OpenAI, TypeSafe), nokta (Character.AI) ya da harf-rakam karışımı (Qwen3) taşıyan kelimeler
// cümle başında da özel addır; diğer büyük harfli kelimeler yalnız cümle içinde sayılır (Title Case başlıklar gürültü üretmesin).
const belirginAd = (w) => /\p{Ll}\p{Lu}/u.test(w) || /\p{L}\.\p{L}/u.test(w) || (/\p{L}/u.test(w) && /\d/.test(w));

// Rakamla başlayan marka adları ("1Password", "3Com"): esleme.mjs ozelAdlar bunları atar, bu yüzden aynı olay kaçıyordu
// (22 Ekim: 1Password for Agents iki kez yayımlandı). Birim ekleri (10Gbps, 5GHz) ad sayılmaz.
const rakamliAd = (w) => {
  const k = w.replace(/[’'][\p{L}]+/gu, '').replace(/^[^\p{L}\d]+|[^\p{L}\d]+$/gu, '');
  return /^\d+\p{Lu}?\p{Ll}{3,}\p{L}*$/u.test(k) && /\p{Lu}/u.test(k) && !/^\d+(?:gbps|mbps|kbps|tbps|ghz|mhz|khz|kwh|mwh|gwh|tb|gb|mb|kb)$/i.test(k)
    ? [k.toLocaleLowerCase('tr')]
    : [];
};

function cumleler(metin) {
  return String(metin ?? '')
    .split(/(?<=[.!?:;—–])\s+|\n+|\s+[—–-]\s+/u)
    .map((s) => s.trim())
    .filter(Boolean);
}

const titleCase = (s) => {
  const k = s.split(/\s+/).filter((w) => /^\p{L}{4,}/u.test(w));
  return k.length >= 3 && k.filter((w) => /^\p{Lu}/u.test(w)).length / k.length >= 0.6;
};

/**
 * Metinlerdeki özel adlar (küçük harfli). ic: cümle içinde büyük harfle geçenler ve belirgin adlar; bas: cümle başındaki ya da
 * Title Case başlıktaki büyük harfli kelimeler (özel ad da olabilir, "New", "Why" gibi sıradan kelime de).
 */
export function hikayeAdlari(metinler) {
  const ic = new Set();
  const bas = new Set();
  for (const metin of metinler) {
    for (const c of cumleler(metin)) {
      const kelimeler = c.split(/\s+/);
      const tc = titleCase(c);
      kelimeler.forEach((w, i) => {
        for (const ad of [...ozelAdlar(w), ...rakamliAd(w)].map(duz)) {
          if (belirginAd(w) || (i > 0 && !tc)) ic.add(ad);
          else bas.add(ad);
        }
      });
    }
  }
  for (const ad of ic) bas.delete(ad);
  return { ic, bas };
}

// Tutarlar ve anlamlı rakamlar: "$26M", "26 milyon", "$20 million", "7,5 milyar", "Maia 300", "%96".
const CARPAN = { k: 1e3, bin: 1e3, thousand: 1e3, m: 1e6, mn: 1e6, million: 1e6, milyon: 1e6, b: 1e9, bn: 1e9, billion: 1e9, milyar: 1e9, trilyon: 1e12, trillion: 1e12 };
export function hikayeRakamlari(metinler) {
  const out = new Set();
  const metin = metinler.join(' \n ');
  for (const m of metin.matchAll(/(\d{1,3}(?:[.,]\d{3})+(?!\d)|\d+(?:[.,]\d+)?)\s*(milyon|milyar|trilyon|million|billion|trillion|thousand|bin|mn|bn|[kmb])?(?![\p{L}\d])/giu)) {
    // "10,000" / "10.000" binlik ayraçlı; "7,5" / "7.5" ondalık.
    const ham = m[1];
    const sayi = /^\d{1,3}(?:[.,]\d{3})+$/.test(ham) ? Number(ham.replace(/[.,]/g, '')) : Number(ham.replace(',', '.'));
    if (!Number.isFinite(sayi)) continue;
    const birim = m[2]?.toLowerCase();
    if (birim) {
      out.add(String(Math.round(sayi * CARPAN[birim])));
      continue;
    }
    // Yıllar ve küçük sayılar olayı ayırt etmez.
    if (Number.isInteger(sayi) && (sayi < 10 || (sayi >= 1900 && sayi <= 2100))) continue;
    out.add(String(sayi));
  }
  return out;
}

/**
 * Bir haberin ya da adayın izi. basliklar: başlık metinleri (kelime kökü karşılaştırması yalnız başlıklarda),
 * metinler: başlık + özet gibi bütün metinler (özel ad ve rakamlar).
 */
export function hikayeIzi({ basliklar = [], metinler = [] }) {
  const tum = [...basliklar, ...metinler];
  const { ic: adlar, bas } = hikayeAdlari(tum);
  const adKokleri = new Set([...adlar].map((a) => a.slice(0, 5)));
  const kelimeler = new Set();
  for (const b of basliklar) for (const k of anahtarlar(b)) if (!/^\d/.test(k) && !adKokleri.has(k)) kelimeler.add(k);
  return { adlar, bas, rakamlar: hikayeRakamlari(tum), kelimeler };
}

const ortak = (a, b) => [...a].filter((x) => b.has(x));

/** İki iz aynı olayı mı anlatıyor? Döner: gerekçe metni ya da null. */
export function ayniHikaye(x, y) {
  // Cümle başındaki ad ("Pluto Security raises…") öteki haberde cümle içinde de geçiyorsa ortak sayılır.
  const adlar = [...new Set([...ortak(x.adlar, y.adlar), ...ortak(x.adlar, y.bas ?? new Set()), ...ortak(y.adlar, x.bas ?? new Set())])];
  const ayirt = adlar.filter((a) => !GENIS.has(a) && !GENIS.has(a.split(/[.-]/)[0]));
  // Yalnız "Anthropic" gibi her gün geçen kurum ortaksa: başlıklarda (TR+EN) en az üç ortak kelime kökü gerekir
  // (19 Ekim: Anthropic çalışan profili iki kez, farklı turlarda).
  if (!ayirt.length) {
    const kelime = adlar.length ? ortak(x.kelimeler, y.kelimeler) : [];
    return kelime.length >= 3 ? `${adlar.join(', ')} + ${kelime.join(', ')}` : null;
  }
  // Adın kendi içindeki sayı ("GPT-6.1" ↔ 6.1) ikinci işaret değildir: iki ayrı haber aynı model adını anabilir.
  const adSayilari = new Set(ayirt.flatMap((a) => a.match(/\d+(?:[.,]\d+)?/g) ?? []).map((n) => String(Number(n.replace(',', '.')))));
  const rakam = ortak(x.rakamlar, y.rakamlar).filter((r) => !adSayilari.has(r));
  if (rakam.length) return `${ayirt.join(', ')} + ${rakam.join(', ')}`;
  const kelime = ortak(x.kelimeler, y.kelimeler);
  if (kelime.length >= 2) return `${ayirt.join(', ')} + ${kelime.join(', ')}`;
  return null;
}

/**
 * Yayın belleği kaydı: { slug, zaman, basliklar, metinler }. Kayıttaki iz önbelleğe alınır.
 * Döner: eşleşen kayıt ve gerekçe ({ kayit, neden }) ya da null. Bellek penceresi dışındaki kayıtlara bakılmaz.
 */
export function mukerrerBul(aday, bellek, { simdi = new Date(), saat = BELLEK_SAAT } = {}) {
  const sinir = simdi.getTime() - saat * 3_600_000;
  const iz = aday.iz ?? hikayeIzi(aday);
  for (const kayit of bellek) {
    if (!(new Date(kayit.zaman).getTime() >= sinir)) continue;
    kayit.iz ??= hikayeIzi(kayit);
    const neden = ayniHikaye(iz, kayit.iz);
    if (neden) return { kayit, neden };
  }
  return null;
}

/**
 * Yayın belleğini kurar: son haber dosyaları (her slug için TR/EN başlık + özet) ile durumda saklanan kaynak başlıkları
 * (durum.yayinlanan[slug] = { zaman, basliklar }) slug üzerinden birleşir.
 */
export function bellekKur(haberler, kayitli = {}) {
  const map = new Map();
  const al = (slug, zaman) => {
    let k = map.get(slug);
    if (!k) map.set(slug, (k = { slug, zaman, basliklar: [], metinler: [] }));
    if (zaman && !(new Date(k.zaman) >= new Date(zaman))) k.zaman = zaman;
    return k;
  };
  for (const h of haberler) {
    const k = al(h.slug, h.date);
    if (h.title) k.basliklar.push(h.title);
    if (h.description) k.metinler.push(h.description);
  }
  for (const [slug, v] of Object.entries(kayitli)) {
    const k = al(slug, v.zaman);
    k.basliklar.push(...(v.basliklar ?? []));
    k.metinler.push(...(v.metinler ?? []));
  }
  return [...map.values()].filter((k) => k.zaman);
}

/** Bir olay grubunun adayı: üyelerin başlıkları ve RSS özetleri (etiketsiz, kısaltılmış). */
export function grupAdayi(g) {
  return {
    basliklar: g.uyeler.map((u) => u.baslik),
    metinler: g.uyeler.map((u) => String(u.description ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 600)),
  };
}
