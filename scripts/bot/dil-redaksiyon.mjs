// TR dil redaksiyonu + yayın öncesi dil kapısı (12 Kasım 2026).
// Taslak (yazar.mjs) ve denetim (denetci.mjs) geçtikten sonra Türkçe alanlar ayrı bir Gemini çağrısıyla dil masasından geçer,
// ardından dil-tr.mjs ile kodla denetlenir. EN alanlarına hiç dokunulmaz.
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
  return `Aşağıdaki Türkçe haber alanlarının dilini düzelt. Olguları değiştirme; metni kısaltma.
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

/**
 * Ana giriş. t denetimi geçmiş iki dilli taslak; kaynak: birleşik kaynak metni.
 * Döner: { t } (TR alanları düzeltilmiş, EN aynen) ya da { t, elendi: 'dil: ...' } (yayımlanmamalı).
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
  return { t: cur };
}
