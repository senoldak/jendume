// jendume iki dilli teknik doğrulama ve kalite denetçisi.
import { adresiSil, gizliMedyaAdlari } from './gizli.mjs';

const RAKAM = /\d+(?:[.,]\d+)*/g;

function degerler(raw) {
  const out = new Set();
  const ayraclar = raw.match(/[.,]/g) ?? [];
  if (!ayraclar.length) return new Set([Number(raw)]);
  const gruplar = raw.split(/[.,]/);
  const ucluGrup = gruplar.slice(1).every((g) => g.length === 3);
  if (ucluGrup) out.add(Number(gruplar.join('')));
  const son = Math.max(raw.lastIndexOf('.'), raw.lastIndexOf(','));
  out.add(Number(raw.slice(0, son).replace(/[.,]/g, '') + '.' + raw.slice(son + 1)));
  return out;
}

const OLCEK = [1, 1e3, 1e6, 1e9, 1e-3, 1e-6, 1e-9];

function kaynakDegerleri(kaynak) {
  const s = new Set();
  for (const m of String(kaynak).matchAll(RAKAM)) {
    for (const d of degerler(m[0])) s.add(d);
  }
  return s;
}

const uyar = (n, bilinen) =>
  [...bilinen].some(
    (k) => k && OLCEK.some((o) => Math.abs(k - n * o) / Math.abs(k) <= 0.015)
  );

export function rakamKontrol(metin, kaynak) {
  const bilinen = kaynakDegerleri(kaynak);
  const bakildi = new Set();
  const sorunlar = [];
  for (const m of String(metin).matchAll(RAKAM)) {
    const raw = m[0];
    if (bakildi.has(raw)) continue;
    bakildi.add(raw);
    const adaylar = [...degerler(raw)];
    if (adaylar.every((n) => Number.isInteger(n) && n <= 16)) continue;
    if (adaylar.some((n) => bilinen.has(n) || uyar(n, bilinen))) continue;
    sorunlar.push(`"${raw}" rakamı kaynakta doğrulanamadı`);
  }
  return sorunlar;
}

// Rakam şeridi (haberin başında en çok 4 rakam): metindeki denetimden daha sıkı, küçük tam sayılar da kaynakta aranır.
// Kaynakta doğrulanamayan öğe düşer, haber durmaz. Rakam içermeyen öğe (ör. yalnız ad) şeride girmez.
export const RAKAM_SERIDI_EN_COK = 4;
export function rakamSeridiSuz(rakamlar, kaynak) {
  if (!Array.isArray(rakamlar)) return [];
  const bilinen = kaynakDegerleri(kaynak);
  const dogru = (deger) => {
    const sayilar = [...String(deger).matchAll(RAKAM)].map((m) => [...degerler(m[0])]);
    return sayilar.length > 0 && sayilar.every((a) => a.some((n) => bilinen.has(n) || uyar(n, bilinen)));
  };
  return rakamlar
    .filter((r) => r?.etiket && r?.deger && dogru(r.deger))
    .map((r) => ({ etiket: String(r.etiket).trim(), deger: String(r.deger).trim() }))
    .slice(0, RAKAM_SERIDI_EN_COK);
}

/** Paketin iki dil bloğundaki şeritleri süzer; şeridi boş kalan dilde alan silinir. */
export function rakamSeritleriniSuz(paket, kaynak) {
  const out = { ...paket };
  for (const dil of ['tr', 'en']) {
    if (!out[dil]) continue;
    const { rakamlar, ...blok } = out[dil];
    const iyi = rakamSeridiSuz(rakamlar, kaynak);
    out[dil] = iyi.length ? { ...blok, rakamlar: iyi } : blok;
  }
  return out;
}

// Resmi kurumlar dışında hiçbir yayın kuruluşu (haber sitesi, dergi, ajans, blog) metinde anılmaz.
// Adlar repoda açık durmaz: şifreli kaynak listesinden çalışma anında okunur (bkz. gizli.mjs). En uzun ad önce denenir.
// Liste boşsa (anahtar yok) desenler hiçbir şeyle eşleşmez; testler medyaAdlariniKur() ile uydurma adlar verir.
const regexKacis = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const AY = "['’]";
let MEDYA;
let ATIF_KALIPLARI;
export function medyaAdlariniKur(adlar = gizliMedyaAdlari()) {
  const liste = [...new Set(adlar)].filter(Boolean).sort((a, b) => b.length - a.length).map(regexKacis);
  const ADLAR = liste.length ? liste.join('|') : '(?!)';
  MEDYA = new RegExp(String.raw`(?<![\p{L}\d])(${ADLAR})(?![\p{L}\d])`, 'giu');
  ATIF_KALIPLARI = {
    tr: [
      new RegExp(String.raw`(?<![\p{L}\d])(?:${ADLAR})${AY}(?:n?[ıiuü]n|y?[ae])\s+(?:haberine|aktardığına|bildirdiğine|göre)(?:\s+göre)?\s*,?\s*`, 'giu'),
    ],
    en: [
      new RegExp(String.raw`(?<![\p{L}\d])according to (?:the )?(?:${ADLAR})\s*,?\s*`, 'giu'),
      new RegExp(String.raw`,?\s*(?:the )?(?:${ADLAR}) reported(?: that)?(?=[\s.,;])`, 'giu'),
    ],
  };
}
medyaAdlariniKur();

// Actions günlükleri ve özeti herkese açık: oraya giden satırda yayın adları "[yayın]", adresler "[adres]" olur.
// medyaKontrol mesajı adı taşımaya devam eder (Gemini düzeltme isteği adı bilmeli); gizleme yalnız çıktıda yapılır.
export const medyaGizle = (metin) => String(metin).replace(MEDYA, '[yayın]');
export const gunlukSatiri = (metin) => medyaGizle(adresiSil(metin));

export function medyaKontrol(metin) {
  const bulunan = [...new Set(String(metin).match(MEDYA) ?? [])];
  return bulunan.length
    ? [`Yayın kuruluşu adı geçiyor (${bulunan.join(', ')}); kaynak site adı anılmamalı`]
    : [];
}

const ZAMAN_TR = /(?<!\p{L})(bugün|dün|yarın|bu sabah|bu akşam|geçen hafta|bu hafta)(?!\p{L})/giu;
const ZAMAN_EN = /(?<!\p{L})(today|yesterday|tomorrow|this morning|this evening|last week|this week)(?!\p{L})/giu;

export function zamanKontrol(metin, dil = 'tr') {
  const alintisiz = String(metin).replace(/[“"][^”"]*[”"]/g, ' ');
  const kalip = dil === 'en' ? ZAMAN_EN : ZAMAN_TR;
  const bulunan = [...new Set((alintisiz.match(kalip) ?? []).map((w) => w.toLowerCase()))];
  return bulunan.length
    ? [`Göreli zaman ifadesi (${bulunan.join(', ')}) kullanılmamalı`]
    : [];
}

const norm = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^\p{L}\d\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function kopyaKontrol(metin, kaynak, n = 11) {
  const kk = norm(kaynak).split(' ').filter(Boolean);
  const seritler = new Set();
  for (let i = 0; i + n <= kk.length; i++) {
    seritler.add(kk.slice(i, i + n).join(' '));
  }
  const alintisiz = String(metin).replace(/[“"][^”"]*[”"]/g, ' ');
  const mk = norm(alintisiz).split(' ').filter(Boolean);
  const kopyalar = [];
  for (let i = 0; i + n <= mk.length; i++) {
    const s = mk.slice(i, i + n).join(' ');
    if (seritler.has(s)) {
      kopyalar.push(s);
      i += n - 1;
    }
  }
  return kopyalar.length >= 2
    ? [`Metin kaynağın cümlelerini doğrudan kopyalıyor (${kopyalar.length} parça)`]
    : [];
}

export function kesinKontroller(paket, kaynak) {
  const sorunlar = [];
  for (const dil of ['tr', 'en']) {
    const blok = paket[dil];
    if (!blok || !blok.title || !blok.description || !blok.body) {
      sorunlar.push(`${dil.toUpperCase()} dil bloğu eksik`);
      continue;
    }
    const birlesik = `${blok.title}\n${blok.description}\n${blok.perspektif ?? ''}\n${blok.body}`;
    sorunlar.push(
      ...rakamKontrol(birlesik, kaynak).map((s) => `[${dil.toUpperCase()}] ${s}`),
      ...medyaKontrol(birlesik).map((s) => `[${dil.toUpperCase()}] ${s}`),
      ...zamanKontrol(birlesik, dil).map((s) => `[${dil.toUpperCase()}] ${s}`),
      ...kopyaKontrol(blok.body, kaynak).map((s) => `[${dil.toUpperCase()}] ${s}`)
    );
  }
  return sorunlar;
}

// --- Uzunluk: ~140 kelimelik ince haberler kalite sinyalini düşürüyordu (Ekim 2026). Hedef 250–400 kelime;
// 200 kelimenin altındaki gövde yayımlanmaz, düzeltme turunda kaynaktaki olgularla genişletilir.
// Türkçe sondan eklemeli olduğundan aynı içerik daha az kelimeyle yazılır; eşik dile göre ayrı.
export const EN_AZ_KELIME = { tr: 180, en: 200 };

/** Markdown gövdedeki kelime sayısı (bağlantı adresleri ve biçim işaretleri sayılmaz). */
export function kelimeSayisi(metin = '') {
  return String(metin)
    .replace(/\]\([^)]*\)/g, ']')
    .split(/\s+/)
    .filter((w) => /[\p{L}\d]/u.test(w)).length;
}

export function uzunlukKontrol(paket, enAz = EN_AZ_KELIME) {
  const sorunlar = [];
  for (const dil of ['tr', 'en']) {
    const n = kelimeSayisi(paket?.[dil]?.body);
    if (n < enAz[dil]) {
      sorunlar.push(
        `[${dil.toUpperCase()}] Metin çok kısa (${n} kelime, en az ${enAz[dil]}); yalnız kaynaktaki olgularla 250–400 kelimeye genişlet`,
      );
    }
  }
  return sorunlar;
}

// --- Başlık: arama sonucunda okunan ilk şey. Anahtar sözcükle (şirket, model, ürün, kurum, konu) başlar;
// "Kurum: …" gibi iki noktalı etiket, belirsiz/merak tuzağı açılış ve "Yapay zekâ …" açılışı kabul edilmez (Ekim 2026).
// Mevcut başlıklar değiştirilmez; kural yalnız yeni taslaklara uygulanır.
const AI_ACILIS = /^(?:yapay\s+zek[âa]|artificial\s+intelligence|ai)(?![\p{L}\p{N}])(?!\s+(?:act|yasas))/iu;
const BELIRSIZ_ACILIS = {
  tr: /^(?:bu|şu|bunlar|işte|şok|flaş|son\s+dakika|neler|ne\s+oluyor|herkes|kimse)(?![\p{L}\p{N}])/iu,
  en: /^(?:this|that|these|those|here['’]?s|here\s+is|breaking|you\s+won['’]?t|everything\s+you|what\s+you\s+need|it['’]?s|they|nobody|everyone)(?![\p{L}\p{N}])/iu,
};

/** Başlıkta ilk beş sözcükte iki nokta üst üste var mı? (Saat gibi rakam:rakam sayılmaz.) */
export function ikiNoktaliAcilis(baslik = '') {
  const ilk = String(baslik).replace(/\d:\d/g, '').split(/\s+/).filter(Boolean).slice(0, 5).join(' ');
  return ilk.includes(':');
}

export function baslikKontrol(paket) {
  const sorunlar = [];
  for (const dil of ['tr', 'en']) {
    const baslik = String(paket?.[dil]?.title ?? '').trim().replace(/^["“'‘]+/, '');
    if (!baslik) continue;
    const D = `[${dil.toUpperCase()}]`;
    if (ikiNoktaliAcilis(baslik)) {
      sorunlar.push(`${D} Başlık iki noktalı etiketle açılıyor ("Kurum: …"); anahtar sözcükle başlayan düz bir cümle yaz`);
    }
    if (AI_ACILIS.test(baslik)) {
      sorunlar.push(`${D} Başlık "Yapay zekâ/AI" ile başlıyor; olayın öznesi olan şirket, model, ürün ya da konuyla başlat`);
    }
    if (BELIRSIZ_ACILIS[dil].test(baslik) || baslik.split(/\s+/).length < 4) {
      sorunlar.push(`${D} Başlık belirsiz; ne olduğunu söyleyen, anahtar sözcükle başlayan bir başlık yaz`);
    }
  }
  return sorunlar;
}

// --- Yerel düzeltme: göreli zaman ve kaynak-atıf kalıplarını Gemini'ye gitmeden temizler ---
const ALINTI = /[“"][^”"]*[”"]/g;
function tekParca(parca, dil) {
  let s = parca;
  for (const k of ATIF_KALIPLARI[dil]) s = s.replace(k, IZ);
  s = s.replace(dil === 'en' ? ZAMAN_EN : ZAMAN_TR, IZ);
  return s;
}

// Toparlama yalnız silme izlerinin (IZ) çevresinde yapılır; metnin geri kalanına dokunulmaz.
const IZ = '\u0001';
function toparla(s, dil) {
  const yerel = dil === 'en' ? 'en' : 'tr';
  return s
    .replace(/[ \t]*\u0001[ \t]*/g, '\u0001')
    .replace(/\u0001+/g, '\u0001')
    .replace(/,?\u0001([.;:!?])/g, '$1')
    .replace(/(^|\n)\u0001[,;:]?[ \t]*(\p{L})/gu, (_, a, h) => a + h.toLocaleUpperCase(yerel))
    .replace(/([.!?])\u0001[,;:]?[ \t]*(\p{L})/gu, (_, a, h) => `${a} ${h.toLocaleUpperCase(yerel)}`)
    .replace(/(^|\n)\u0001[,;:]?[ \t]*/g, '$1')
    .replace(/([.!?])\u0001[,;:]?[ \t]*/g, '$1 ')
    .replace(/\u0001(?=[,;:])/g, '')
    .replace(/\u0001$/gm, '')
    .replace(/\u0001/g, ' ');
}

export function yerelDuzeltMetin(metin, dil = 'tr') {
  const m = String(metin);
  if (!m) return m;
  // Alıntılar korunur: metni alıntı/dışı parçalarına böl, yalnız dışını işle.
  const parcalar = [];
  let son = 0;
  for (const a of m.matchAll(ALINTI)) {
    parcalar.push({ s: m.slice(son, a.index), alinti: false }, { s: a[0], alinti: true });
    son = a.index + a[0].length;
  }
  parcalar.push({ s: m.slice(son), alinti: false });
  const once = parcalar.map((p) => (p.alinti ? p.s : tekParca(p.s, dil)));
  if (once.every((s, i) => s === parcalar[i].s)) return m;
  // Toparlamayı alıntıları yer tutucuyla koruyarak tüm metne uygula.
  const yer = [];
  const birlesik = once
    .map((s, i) => (parcalar[i].alinti ? `\u0000${yer.push(s) - 1}\u0000` : s))
    .join('');
  return toparla(birlesik, dil).replace(/\u0000(\d+)\u0000/g, (_, i) => yer[Number(i)]);
}

export function yerelDuzelt(paket) {
  const out = { ...paket };
  for (const dil of ['tr', 'en']) {
    if (!paket?.[dil] || typeof paket[dil] !== 'object') continue;
    out[dil] = { ...paket[dil] };
    for (const [k, v] of Object.entries(out[dil])) {
      if (typeof v === 'string') out[dil][k] = yerelDuzeltMetin(v, dil);
    }
  }
  return out;
}

// --- İlgili kısım: taslaktan sonraki istemlerde kaynağı baştan kesmek yerine taslakla örtüşen paragrafları seçer ---
const rakamNorm = (r) => r.replace(/[.,](?=\d{3}(?!\d))/g, '').replace(',', '.');

function ipuclari(taslak) {
  const t = String(taslak);
  const rakamlar = new Set((t.match(/\d+(?:[.,]\d+)*/g) ?? []).filter((r) => r.length > 1).map(rakamNorm));
  const adlar = new Set(t.match(/(?<![\p{L}])\p{Lu}[\p{L}\d-]{2,}/gu) ?? []);
  const alintilar = (t.match(ALINTI) ?? []).map((a) => norm(a)).filter((a) => a.length >= 8);
  const kelimeler = new Set(norm(t).split(' ').filter((w) => w.length >= 7));
  return { rakamlar, adlar, alintilar, kelimeler };
}

function puanla(parca, ip) {
  let p = 0;
  for (const r of parca.match(/\d+(?:[.,]\d+)*/g) ?? []) if (ip.rakamlar.has(rakamNorm(r))) p += 5;
  for (const a of new Set(parca.match(/(?<![\p{L}])\p{Lu}[\p{L}\d-]{2,}/gu) ?? [])) if (ip.adlar.has(a)) p += 2;
  const np = norm(parca);
  for (const a of ip.alintilar) if (np.includes(a.slice(0, 40))) p += 8;
  for (const w of new Set(np.split(' '))) if (ip.kelimeler.has(w)) p += 1;
  return p;
}

export function ilgiliKisim(kaynak, taslakMetni, sinir, bas = 1500) {
  const k = String(kaynak);
  if (k.length <= sinir) return k;
  const parcalar = [];
  for (const p of k.split(/\n\s*\n/)) {
    if (p.length <= 2500) parcalar.push(p);
    else parcalar.push(...(p.match(/[^.!?]+[.!?]+["”’)]*\s*|[^.!?]+$/g) ?? [p]).map((c) => c.trim()));
  }
  const ip = ipuclari(taslakMetni);
  const secili = new Set();
  let uzunluk = 0;
  for (let i = 0; i < parcalar.length && uzunluk < bas; i++) {
    secili.add(i);
    uzunluk += parcalar[i].length + 2;
  }
  const adaylar = parcalar
    .map((p, i) => ({ i, p: puanla(p, ip) }))
    .filter((a) => !secili.has(a.i) && a.p > 0)
    .sort((a, b) => b.p - a.p || a.i - b.i);
  for (const a of adaylar) {
    const ek = parcalar[a.i].length + 7;
    if (uzunluk + ek > sinir) continue;
    secili.add(a.i);
    uzunluk += ek;
  }
  const sirali = [...secili].sort((a, b) => a - b);
  let out = '';
  sirali.forEach((i, j) => {
    if (j > 0) out += i === sirali[j - 1] + 1 ? '\n\n' : '\n\n[…]\n\n';
    out += parcalar[i];
  });
  return out.length > sinir ? out.slice(0, sinir) : out;
}
