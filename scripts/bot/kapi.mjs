// Standartlar Faz 0: jendume yayın kapısı. standart.mjs (tek kaynaktan kopya) üstünde, sitenin iki dilli yapısına
// uyarlanan ince katman: iki dil ayrı denetlenir, en ağır karar geçerlidir (biri kırmızıysa ikisi de yayımlanmaz).
// Belirsizlikte kapalı kalır: denetim hata verirse çağıran yayımlamaz.
import { standartDenetle, standartBirlestir, yayinDurduMu } from './standart.mjs';
import { DERLEME_EN_AZ, derlemeKaynagi } from './havuz.mjs';

const metinler = (x) => (Array.isArray(x) ? x : [x]).filter((s) => typeof s === 'string' && s.trim());

// Bir dilin okura görünen öteki alanları (perspektif, neden önemli, ana maddeler, rakam şeridi).
function ekler(b, t) {
  const rakamlar = (Array.isArray(b.rakamlar) ? b.rakamlar : []).flatMap((r) => [r?.etiket, r?.deger]);
  return metinler([b.perspektif ?? t.perspektif, b.why_matters ?? t.why_matters, ...(b.key_points ?? t.key_points ?? []), ...rakamlar]);
}

/** Yayın kapısının ikinci okumasına giden metinler: standart süzgecine verilenin aynı alanları, iki dil. */
export const kapiMetinleri = (t) => ['tr', 'en'].map((d) => ({ dil: d, baslik: t[d].title, ozet: t[d].description, metin: t[d].body, ekler: ekler(t[d], t) }));

/** Sarı gerekçe ile kapının gerekçesini boşlukla birleştirir (boşlar atlanır, 300 karakter). */
export const gerekceBirlestir = (...p) => p.filter((x) => typeof x === 'string' && x.trim()).join(' ').slice(0, 300);

/** İki dilli taslak (tr + en) için birleşik karar. İki dilden biri yoksa hata fırlatır (emin değiliz: yayımlanmaz). */
export function haberStandardi(t, kaynakMetni = '') {
  if (!t?.tr || !t?.en) throw new Error('standart: iki dilli taslak (tr ve en) gerekli');
  const dil = (d) =>
    standartDenetle({ dil: d, baslik: t[d].title, ozet: t[d].description, metin: t[d].body, ekler: ekler(t[d], t), kaynakMetni });
  return standartBirlestir(dil('tr'), dil('en'));
}

// Gövdeyi bloklara ayırır: { baslik: true, m } ara başlıklar, { baslik: false, m } haber paragrafları.
function bloklar(govde = '') {
  const cikti = [];
  for (const blok of String(govde).split(/\n{2,}/)) {
    const satirlar = blok.split('\n');
    if (/^#{1,6}\s/.test(satirlar[0])) {
      cikti.push({ baslik: true, m: satirlar[0] });
      const kalan = satirlar.slice(1).join('\n').trim();
      if (kalan) cikti.push({ baslik: false, m: kalan });
    } else if (blok.trim()) cikti.push({ baslik: false, m: blok.trim() });
  }
  return cikti;
}

// Haber paragraflarından yalnız tutulanlar kalır; altında haber kalmayan ara başlık da düşer.
function govdeKur(bl, tut) {
  let i = 0;
  const parcalar = [];
  let bekleyen = null;
  for (const b of bl) {
    if (b.baslik) {
      bekleyen = b.m;
      continue;
    }
    if (tut[i++]) {
      if (bekleyen) parcalar.push(bekleyen);
      bekleyen = null;
      parcalar.push(b.m);
    }
  }
  return parcalar.join('\n\n');
}

const KIRMIZI_BOS = { karar: 'kirmizi', kirmizi: [], sari: [] };

/**
 * Dilim derlemesi için kapı. Derleme kırmızıysa yalnız kırmızı çıkan madde (haber paragrafı, iki dilde de) atlanır;
 * yazı bütünüyle düşmez. Madde ayrıştırılamıyorsa (paragraf sayısı haber sayısını tutmuyor, kırmızı ortak alanda
 * ya da kalan haber DERLEME_EN_AZ'ın altında) yazı yayımlanmaz.
 * Döner: { yayin, t, grup, s, atlanan: [{ o, s }] } (yayin false ise atlanan = yazıyı düşüren maddeler/haberlerin hepsi).
 */
export function derlemeStandardi(t, grup) {
  const tam = haberStandardi(t, derlemeKaynagi(grup));
  if (tam.karar !== 'kirmizi') return { yayin: true, t, grup, s: tam, atlanan: [] };
  const hepsi = (s) => ({ yayin: false, t, grup, s, atlanan: grup.map((o) => ({ o, s })) });
  const bt = bloklar(t.tr.body);
  const be = bloklar(t.en.body);
  const pt = bt.filter((b) => !b.baslik);
  const pe = be.filter((b) => !b.baslik);
  if (pt.length !== grup.length || pe.length !== grup.length) return hepsi({ ...KIRMIZI_BOS, gerekce: `${tam.gerekce},derleme-ayrisamadi` });
  // Ortak alanlar (başlık, spot, perspektif...): kırmızı burada ise tek madde ayrılamaz.
  const ortak = haberStandardi({ ...t, tr: { ...t.tr, body: '' }, en: { ...t.en, body: '' } });
  if (ortak.karar === 'kirmizi') return hepsi(ortak);
  const tut = [];
  const atlanan = [];
  grup.forEach((o, i) => {
    const kaynak = derlemeKaynagi([o]);
    const s = standartBirlestir(
      standartDenetle({ dil: 'tr', metin: pt[i].m, kaynakMetni: kaynak }),
      standartDenetle({ dil: 'en', metin: pe[i].m, kaynakMetni: kaynak }),
    );
    const at = s.karar === 'kirmizi';
    tut.push(!at);
    if (at) atlanan.push({ o, s });
  });
  if (!atlanan.length) return hepsi(tam); // kırmızı hiçbir tek maddede yok: sınırdan geçen bütünlük, yayımlanmaz
  const kalan = grup.filter((_, i) => tut[i]);
  if (kalan.length < DERLEME_EN_AZ) return hepsi(atlanan[0].s);
  const yeni = { ...t, tr: { ...t.tr, body: govdeKur(bt, tut) }, en: { ...t.en, body: govdeKur(be, tut) } };
  const son = haberStandardi(yeni, derlemeKaynagi(kalan));
  if (son.karar === 'kirmizi') return hepsi(son);
  return { yayin: true, t: yeni, grup: kalan, s: son, atlanan };
}

/** Acil durdurma: true ise tur hiçbir şey yapmadan biter. Saate ulaşılamazsa tur sürer (standart.mjs). */
export async function acilDurdurma({ site = 'jendume', env = process.env, durduMu = yayinDurduMu, log = console.log } = {}) {
  const d = await durduMu({ url: env.MOTOR_URL, anahtar: env.MOTOR_ANAHTARI, site });
  if (d.durdu) {
    log(`Acil durdurma açık: ${d.neden}`);
    return true;
  }
  log(`Acil durdurma kapalı: ${d.neden}`);
  return false;
}

/**
 * Puanlama kapısı (fail-closed). puanla() olayların puan dizisini (olaylarla hizalı) döndürür; null dönerse ya da hata
 * fırlatırsa hiçbir olay geçmez (bekleyen = hepsi). Puansız (null) kalan olay da bekler. minDeger altı düşer.
 * Döner: { gecen: olaylar, dusen: [{ g, puan }], bekleyen: olaylar, hata?: string, puanlar: Map }
 * Bekleyen olaylar görüldü işaretlenmez: sonraki turda yeniden denenir.
 */
export async function puanKapisi(olaylar, puanla, minDeger) {
  const puanlar = new Map();
  try {
    const sonuc = await puanla();
    if (!Array.isArray(sonuc) || sonuc.length !== olaylar.length) throw new Error('cevap yok');
    sonuc.forEach((p, n) => puanlar.set(olaylar[n], p));
  } catch (e) {
    return { gecen: [], dusen: [], bekleyen: [...olaylar], hata: String(e?.message ?? e), puanlar: new Map() };
  }
  const gecen = [];
  const dusen = [];
  const bekleyen = [];
  for (const g of olaylar) {
    const p = puanlar.get(g);
    if (!Number.isInteger(p)) bekleyen.push(g);
    else if (p < minDeger) dusen.push({ g, puan: p });
    else gecen.push(g);
  }
  return { gecen, dusen, bekleyen, puanlar };
}
