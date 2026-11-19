// TR dil redaksiyonu + yayın öncesi dil kapısı (12 Kasım 2026).
// Taslak (yazar.mjs) ve denetim (denetci.mjs) geçtikten sonra Türkçe alanlar ayrı bir Gemini çağrısıyla dil masasından geçer,
// ardından dil-tr.mjs ile kodla denetlenir. 19 Kasım 2026'dan beri EN alanları da ayrı bir çağrıyla redakte edilir (enRedakte).
//   dilRedakte(t, kaynak, { kall, log }) → { t, elendi?: 'dil: ...' }
// kall: ({ sistem, prompt, schema, dusunme, sicaklik }) → JSON | null (test için enjekte edilir; varsayılan lib.mjs gemini).
import { gemini } from './lib.mjs';
import { baslikKontrol, kelimeSayisi, kesinKontroller, uzunlukKontrol, yerelDuzelt, ilgiliKisim } from './denetci.mjs';
import { dilDuzeltTr, dilSorunlariTr, kesinSorunlar, sorunListesi, REDAKSIYON_KURALLARI_TR } from './dil-tr.mjs';

// Redaksiyondan geçen TR alanlar (olanlar).
export const TR_ALANLAR = ['title', 'description', 'body', 'perspektif', 'why_matters', 'key_points'];
const DUZYAZI = ['title', 'description', 'body', 'perspektif', 'why_matters'];

// Sitede yüzde için çoğunlukla "%" işareti kullanılıyor (rakam şeridi örneği de "%87,5"); kural kitabındaki "yüzde 10"
// örneği bu yüzden istemde geçersiz kılınır ve kod "yüzde 5" yazımını "%5"e çevirir (dilDuzeltTr yuzde: 'isaret').
export const YUZDE_BICIMI = 'isaret';

export const SISTEM_TR = `${REDAKSIYON_KURALLARI_TR}

Ek kurallar:
- Yüzde için % işareti kullan (%8,6); yukarıdaki "yüzde 8,6" örnekleri bu konuda geçersiz.
- Yapay zekâ terimlerinde yerleşik Türkçe karşılığı varsa onu kullan, ürün ve model adlarını olduğu gibi bırak: agent → ajan, benchmark → kıyaslama testi, reward hacking → ödül istismarı, pipeline → işlem hattı. Yerleşik karşılığı olmayan terimi ilk geçtiği yerde kısa bir açıklamayla ver.
- "yapay zekâ" her yerde aynı yazılır (TDK: zekâ).
- why_matters alanı perspektif alanıyla aynıysa ya da onu tekrar ediyorsa, why_matters'ı farklı bir açıdan yeniden yaz; yalnızca metindeki olguları kullan.
- Yalnızca verilen alanları döndür; başka alan, başka dil ekleme.`;

export const REDAKSIYON_SEMASI = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    body: { type: 'string' },
    perspektif: { type: 'string' },
    why_matters: { type: 'string' },
    key_points: { type: 'array', items: { type: 'string' } },
  },
  required: ['title', 'description', 'body'],
};

const sadelestir = (s) => String(s ?? '').replace(/\s+/g, ' ').trim().toLocaleLowerCase('tr').replace(/[^\p{L}\p{N} ]/gu, '');

// Güvenli kod düzeltmeleri: yalnız TR düzyazı alanları.
export function trDuzelt(t) {
  const tr = { ...t.tr };
  const d = (x) => dilDuzeltTr(x, { yuzde: YUZDE_BICIMI });
  for (const k of DUZYAZI) if (typeof tr[k] === 'string') tr[k] = d(tr[k]);
  if (Array.isArray(tr.key_points)) tr.key_points = tr.key_points.map((x) => (typeof x === 'string' ? d(x) : x));
  return { ...t, tr };
}

// Redaksiyonun görebileceği bütün TR sorunları (kesin olmayanlar dahil).
export function trSorunlari(tr) {
  const s = [];
  for (const k of ['title', 'description', 'perspektif', 'why_matters']) s.push(...dilSorunlariTr(tr[k] ?? ''));
  s.push(...dilSorunlariTr(tr.body ?? '', { govde: true, araBaslikYasak: true }));
  return s;
}

// Yayın kapısının baktığı sorunlar: gövde + başlık + spot.
export function trKapiSorunlari(tr) {
  return [
    ...dilSorunlariTr(tr.title ?? ''),
    ...dilSorunlariTr(tr.description ?? ''),
    ...dilSorunlariTr(tr.body ?? '', { govde: true, araBaslikYasak: true }),
  ];
}

function istem(tr, kaynak, sorunMetni, ek = '') {
  const alanlar = {};
  for (const k of TR_ALANLAR) {
    const v = tr[k];
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) continue;
    alanlar[k] = v;
  }
  const tekrar = sadelestir(tr.why_matters) && sadelestir(tr.why_matters) === sadelestir(tr.perspektif);
  // Kelime aralığı açıkça verilir (19 Kasım 2026): "metni kısaltma" tek başına yetmiyordu, redaksiyon gövdeyi %20 kısaltıp atılıyordu.
  const n = kelimeSayisi(tr.body);
  return `Aşağıdaki Türkçe haber alanlarının dilini düzelt. Olguları değiştirme; metni kısaltma.
Gövde ${n} kelime; senin gövden ${Math.ceil(n * 0.95)} ile ${Math.floor(n * 1.1)} kelime arasında olmalı. Cümle silme: cümleleri yerinde düzelt.
${tekrar ? "\nUYARI: why_matters perspektif ile aynı. why_matters'ı farklı bir açıdan, yalnızca KAYNAK METİN'deki olgularla yeniden yaz.\n" : ''}${ek ? `\n${ek}\n` : ''}
KAYNAK METİN (olgu doğrulaması için; kaynaktan yeni bilgi ekleme):
${kaynak}

SORUNLAR (kodla bulundu):
${sorunMetni || '(kodla bulunan sorun yok; yine de kural kitabına göre gözden geçir)'}

TÜRKÇE ALANLAR (JSON):
${JSON.stringify(alanlar, null, 2)}`;
}

// Yeni TR alanlarını eskinin üstüne koyar; model döndürmediği alan eski kalır.
function birlestir(t, r) {
  const tr = { ...t.tr };
  for (const k of TR_ALANLAR) {
    if (r?.[k] === undefined || r[k] === null) continue;
    if (k === 'key_points') {
      if (Array.isArray(r[k]) && r[k].every((x) => typeof x === 'string') && r[k].length === (t.tr.key_points?.length ?? 0)) tr[k] = r[k];
    } else if (typeof r[k] === 'string' && r[k].trim()) tr[k] = r[k];
  }
  return { ...t, tr };
}

// Kabul: kesin kontroller (rakam, ad, kopya...), uzunluk ve başlık kuralları temiz, gövde %90–115. Döner: neden dizisi (boş = kabul).
export function kabulSorunlari(onceki, yeni, kaynak) {
  const s = [];
  const once = kelimeSayisi(onceki.tr.body);
  const sonra = kelimeSayisi(yeni.tr.body);
  if (once && (sonra < once * 0.9 || sonra > once * 1.15)) s.push(`gövde uzunluğu ${once} → ${sonra} kelime (izin verilen %90–115)`);
  s.push(...kesinKontroller(yeni, kaynak), ...uzunlukKontrol(yeni), ...baslikKontrol(yeni));
  return s;
}

// Tek redaksiyon turu. Döner: { t } kabul, { neden } red.
async function tur(t, kaynak, sorunMetni, ek, kall) {
  let r;
  try {
    r = await kall({ sistem: SISTEM_TR, prompt: istem(t.tr, kaynak, sorunMetni, ek), schema: REDAKSIYON_SEMASI, dusunme: 'medium', sicaklik: 0.2 });
  } catch (e) {
    if (e?.ayar || e?.kota) throw e;
    return { neden: `çağrı başarısız (${e?.message ?? e})` };
  }
  if (!r || typeof r !== 'object') return { neden: 'cevap yok' };
  const yeni = trDuzelt(yerelDuzelt(birlestir(t, r)));
  const nedenler = kabulSorunlari(t, yeni, kaynak);
  return nedenler.length ? { neden: nedenler.join(' | ') } : { t: yeni };
}

// Redaksiyon turu + gerekirse tek yeniden deneme (kesin red nedenleriyle). Döner: yeni taslak ya da null (atıldı).
async function redaksiyonla(t, kaynak, sorunMetni, kall, log, ad) {
  const a = await tur(t, kaynak, sorunMetni, '', kall);
  if (a.t) return a.t;
  log(`  ${ad} reddedildi, yeniden deneniyor: ${a.neden}`);
  const b = await tur(t, kaynak, sorunMetni, `ÖNCEKİ DENEME REDDEDİLDİ. Nedenler aynen:\n${a.neden}`, kall);
  if (b.t) return b.t;
  log(`  dil redaksiyonu atıldı: ${b.neden}`);
  return null;
}

// --- EN redaksiyonu (19 Kasım 2026). Önceden EN alanlarına hiç dokunulmuyordu; yapay zekâ kalıpları (humanizer, stop-slop
// ilkeleri) İngilizce metinde kalıyordu. TR ile aynı kabul: rakam/ad/kopya/medya kontrolleri (kesinKontroller iki dili
// birden tarar), EN gövdesi %90–115, başlık ve uzunluk kuralları. Kabul edilmezse EN metin olduğu gibi kalır; haber düşmez.
export const EN_ALANLAR = TR_ALANLAR;

export const SISTEM_EN = `You are a senior copy editor at an English-language news agency. You correct the language of the news story you are given; you do not rewrite the story.

Do not change:
- Facts, figures, dates, names of people and organisations, and the content of quotations. Add no information and remove none.
- Length: keep it the same (it may shrink by at most 10%). Keep the number of paragraphs.
- Quotations: keep every pair of quotation marks and the words inside them exactly as they are, including single quoted terms.
- Additions: add no words, details or explanations that are not already in the text.

Correct:
- Grammar, spelling and punctuation in standard English. Use one spelling convention consistently throughout the story.
- Phrasing translated word for word from Turkish; replace it with the wording an English-language news agency would use.
- Numbers, currencies and units: keep them exactly as written ($81 billion stays $81 billion; 27 percent stays 27 percent). Write a number in figures only where the story spells it out in words.
- Two sentences that give the same information: merge them.

Remove typical AI writing patterns:
- False contrasts ("not only X but also Y", "it is not X, it is Y") written in the story's own voice: state both facts plainly. When the contrast reports what a person or the source says, denies or corrects ("Nadella said the plan is not about replacing staff"), it is a fact: keep it.
- Inflated significance ("a pivotal moment", "marks a major step", "a new era", "game-changer", "underscores the importance", "a testament to"): write the fact itself (figure, date, name).
- Overused words used for effect: pivotal, crucial, landmark, robust, seamless, vibrant, landscape, delve, showcase, highlight (as a verb), underscore.
- Words such as record, first, largest or only are facts when the story attributes them or the source states them: keep them.
- Closing commentary ("This development signals ...", "It remains to be seen ..."): end with a concrete fact from the source instead. A sentence that reports a fact stated by the source stays.
- Lists of three used out of habit: if the source gives two items, write two.
- Em dashes (—) and spaced en dashes ( – ) used to join clauses: use commas, full stops, colons or parentheses. A closed range dash (2015–2025) stays.
- Consecutive sentences that open with the same word or name; vary sentence length.
- Addressing the reader or asking questions.
- When you remove a phrase, do not put an empty substitute in its place. If the story has a concrete fact for that spot, use it; otherwise delete the clause or merge the sentence with its neighbour. Add no new facts.
- None of these rules justifies changing the meaning, a fact or the emphasis of the source. If you are unsure about a sentence, leave it as it is.

Return only the fields you were given; add no other field or language.`;

const EN_KALIPLAR = [
  { re: /—|―|(?<=\S)\s–\s(?=\S)/g, mesaj: 'Dash used to join clauses: use a comma, full stop, colon or parentheses' },
  { re: /\bnot only\b[^.!?\n]{1,80}?\bbut (also\b)?/gi, mesaj: 'False contrast ("not only X but also Y"): state both facts plainly' },
  {
    re: /\b(pivotal|game[- ]changer|landmark|testament to|underscor(e|es|ed|ing)|a new era|marks? a (major|significant|key) (step|milestone|shift)|delv(e|es|ed|ing)|showcas(e|es|ed|ing)|seamless(ly)?|vibrant)\b/gi,
    mesaj: 'Inflated or overused wording: replace it with the concrete fact from the source',
  },
  {
    re: /(^|[.!?]\s+)This (development|move|deal|step|decision|investment)[^.!?\n]{0,120}\b(signals|underscores|highlights|reflects|marks|shows)\b/g,
    mesaj: 'Possible commentary sentence ("This development signals ..."): keep it if it reports a fact from the source; otherwise replace it with a concrete fact',
  },
];

/** EN alanlarındaki yapay zekâ kalıpları (kesin değil: yalnız redaksiyon istemine girer). */
export function enSorunlari(en = {}) {
  const metin = ['title', 'description', 'body', 'perspektif', 'why_matters'].map((k) => en[k] ?? '').join('\n');
  const s = [];
  for (const k of EN_KALIPLAR) {
    const m = metin.match(k.re);
    if (m) s.push(`- ${k.mesaj} (example: «${m[0].trim().slice(0, 80)}»)`);
  }
  return s.join('\n');
}

function enIstem(en, kaynak, sorunMetni, ek = '') {
  const alanlar = {};
  for (const k of EN_ALANLAR) {
    const v = en[k];
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) continue;
    alanlar[k] = v;
  }
  const n = kelimeSayisi(en.body);
  return `Correct the language of the English news fields below. Do not change the facts; do not shorten the text.
The body has ${n} words; your body must have between ${Math.ceil(n * 0.95)} and ${Math.floor(n * 1.1)} words. Do not delete sentences: edit them in place.
${ek ? `\n${ek}\n` : ''}
ISSUES FOUND BY CODE:
${sorunMetni || '(none found by code; still review the text against the rules)'}

ENGLISH FIELDS (JSON):
${JSON.stringify(alanlar, null, 2)}`;
}

function enBirlestir(t, r) {
  const en = { ...t.en };
  for (const k of EN_ALANLAR) {
    if (r?.[k] === undefined || r[k] === null) continue;
    if (k === 'key_points') {
      if (Array.isArray(r[k]) && r[k].every((x) => typeof x === 'string') && r[k].length === (t.en.key_points?.length ?? 0)) en[k] = r[k];
    } else if (typeof r[k] === 'string' && r[k].trim()) en[k] = r[k].replace(/\\n/g, '\n');
  }
  return { ...t, en };
}

// EN gövdesi Türkçeye dönmüş mü: Türkçeye özgü harfler (ğ, ı, ş) ya da sık Türkçe işlev sözcükleri. Özel adlar (Türkiye,
// İstanbul) tek tük geçer; eşik bunları sayık tutar.
export function turkceGibi(metin = '') {
  const harf = (String(metin).match(/[ğışĞŞ]/g) ?? []).length;
  const sozcuk = (String(metin).match(/(?<![\p{L}])(ve|bir|için|ile|olarak|olan|gibi|daha)(?![\p{L}])/giu) ?? []).length;
  return harf >= 8 || sozcuk >= 5;
}

// İki gövdenin sözcük örtüşmesi (0–1): EN alanına TR metni konmuşsa 1'e yaklaşır.
export function ortusme(a = '', b = '') {
  const k = (s) => new Set(String(s).toLocaleLowerCase('tr').match(/[\p{L}\p{N}]+/gu) ?? []);
  const A = k(a), B = k(b);
  if (!A.size || !B.size) return 0;
  let ortak = 0;
  for (const w of A) if (B.has(w)) ortak++;
  return ortak / A.size;
}

// Tırnak içindeki sözler (“…”, "…") ve rakamlar EN redaksiyonunda aynen kalmalı (19 Kasım denemesi: model
// "software factory" tırnağını kaldırdı, "$81 billion" yazımını değiştirdi).
const ALINTI_EN = /["“]([^"”\n]{2,400})["”]/g;
export const enAlintilari = (m = '') => [...String(m).matchAll(ALINTI_EN)].map((x) => x[1].trim());
const rakamlar = (m = '') => (String(m).match(/\d+(?:[.,]\d+)*/g) ?? []).map((x) => x.replace(/[.,](?=\d{3}\b)/g, '')).sort();
// Kaynağın söylediği olgu sözcükleri (rekor, ilk, en büyük, yalnız, kalıcı …) redaksiyonda silinmemeli (19 Kasım denemesi:
// "record-breaking" ve Nadella'nın "permanently"si silindi). Alan başına sayı azalırsa red.
const OLGU_SOZCUKLERI = /\b(record(?:-breaking)?|first|largest|biggest|smallest|highest|lowest|only|all-time|permanent(?:ly)?|never|always|unprecedented)\b/gi;
const olguSayisi = (m = '') => (String(m).match(OLGU_SOZCUKLERI) ?? []).length;

export function enKabulSorunlari(onceki, yeni, kaynak) {
  const s = [];
  for (const k of ['title', 'description', 'body']) {
    const kayip = enAlintilari(onceki.en[k]).filter((q) => !String(yeni.en[k] ?? '').includes(q));
    if (kayip.length) s.push(`EN ${k}: quotation changed or removed («${kayip[0].slice(0, 80)}»); keep quotations word for word`);
    const once = rakamlar(onceki.en[k]).join(' ');
    if (once !== rakamlar(yeni.en[k]).join(' ')) s.push(`EN ${k}: numbers changed; keep every number exactly as written`);
    if (olguSayisi(yeni.en[k]) < olguSayisi(onceki.en[k])) s.push(`EN ${k}: a factual word (record, first, largest, only, permanently …) was removed; keep it`);
  }
  const once = kelimeSayisi(onceki.en.body);
  const sonra = kelimeSayisi(yeni.en.body);
  if (once && (sonra < once * 0.9 || sonra > once * 1.15)) s.push(`EN body length ${once} → ${sonra} words (allowed 90–115%)`);
  if ((turkceGibi(yeni.en.body) && !turkceGibi(onceki.en.body)) || ortusme(yeni.en.body, yeni.tr.body) > 0.5) s.push('EN body is not in English: return the English text');
  s.push(...kesinKontroller(yeni, kaynak), ...uzunlukKontrol(yeni), ...baslikKontrol(yeni));
  return s;
}

async function enTur(t, kaynak, sorunMetni, ek, kall) {
  let r;
  try {
    // Düşünme 'low': 'medium' denemede çağrı başına ~12K düşünme token'ı harcadı (16K çıkış tavanına yakın).
    r = await kall({ sistem: SISTEM_EN, prompt: enIstem(t.en, kaynak, sorunMetni, ek), schema: REDAKSIYON_SEMASI, dusunme: 'low', sicaklik: 0.2 });
  } catch (e) {
    if (e?.ayar || e?.kota) throw e;
    return { neden: `çağrı başarısız (${e?.message ?? e})` };
  }
  if (!r || typeof r !== 'object') return { neden: 'cevap yok' };
  const yeni = yerelDuzelt(enBirlestir(t, r));
  const nedenler = enKabulSorunlari(t, yeni, kaynak);
  return nedenler.length ? { neden: nedenler.join(' | ') } : { t: yeni };
}

/** EN redaksiyonu + tek yeniden deneme. Döner: yeni taslak ya da null (EN olduğu gibi kalır). */
export async function enRedakte(t, kaynak, { kall = gemini, log = () => {} } = {}) {
  if (!t?.en?.body) return null;
  const sorun = enSorunlari(t.en);
  // Yalnız kod bir kalıp bulduysa çalışır: sorunsuz EN metne dokunulmaz (anlam kayması riski ve maliyet).
  if (!sorun) return null;
  const a = await enTur(t, kaynak, sorun, '', kall);
  if (a.t) return a.t;
  log(`  EN redaksiyonu reddedildi, yeniden deneniyor: ${a.neden}`);
  const b = await enTur(t, kaynak, sorun, `THE PREVIOUS ATTEMPT WAS REJECTED. Reasons:\n${a.neden}`, kall);
  if (b.t) return b.t;
  log(`  EN redaksiyonu atıldı: ${b.neden}`);
  return null;
}

/**
 * Ana giriş. t denetimi geçmiş iki dilli taslak; kaynak: birleşik kaynak metni.
 * Döner: { t } (TR ve EN alanları düzeltilmiş) ya da { t, elendi: 'dil: ...' } (yayımlanmamalı).
 */
export async function dilRedakte(t, kaynak, { kall = gemini, log = () => {} } = {}) {
  if (!t?.tr) return { t };
  const kisa = ilgiliKisim(kaynak, [t.tr.title, t.tr.description, t.tr.body].filter(Boolean).join('\n'), 9000);
  let cur = trDuzelt(t);

  // 1) Redaksiyon: kodla bulunan bütün sorunlar + kural kitabı.
  const ilk = await redaksiyonla(cur, kisa, sorunListesi(trSorunlari(cur.tr)), kall, log, 'dil redaksiyonu');
  if (ilk) cur = ilk;

  // 2) Kapı: kesin sorun kaldıysa yalnız onlarla bir tur daha.
  let kesin = kesinSorunlar(trKapiSorunlari(cur.tr));
  if (kesin.length) {
    log(`  dil kapısı: kesin sorun kaldı, ikinci tur: ${kesin.map((s) => s.kod).join(', ')}`);
    const ikinci = await redaksiyonla(cur, kisa, sorunListesi(kesin), kall, log, 'dil kapısı turu');
    if (ikinci) cur = ikinci;
    kesin = kesinSorunlar(trKapiSorunlari(cur.tr));
  }
  if (kesin.length) {
    const neden = `dil: ${kesin.map((s) => `${s.mesaj}${s.ornek ? ` («${s.ornek}»)` : ''}`).join('; ')}`;
    log(`  dil kapısı yayını durdurdu: ${neden}`);
    return { t: cur, elendi: neden };
  }

  // 3) EN redaksiyonu: TR yayına uygunsa. Başarısız olursa EN olduğu gibi kalır.
  const en = await enRedakte(cur, kisa, { kall, log });
  if (en) cur = en;
  return { t: cur };
}
