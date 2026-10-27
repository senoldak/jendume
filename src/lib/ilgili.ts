// "İlgili haberler": ortak varlıklara (şirket, laboratuvar, model türü; src/lib/entities.ts) göre puanlanır,
// aynı bölüm ek puan alır; ortak varlık yoksa aynı bölümün en yenileri gelir. Bültenler, dizine girmeyen kısa
// haberler (src/lib/kalite.mjs) ve haberin kendisi listeye girmez.
import { AI_ENTITIES } from './entities.ts';
import { dizinlenir } from './kalite.mjs';
import { BULLETIN_CATEGORY } from './site.ts';
import { anlamBenzerligi, anlamPuani, vektorleriOku } from './anlam.mjs';

export interface IlgiliAday {
  id: string;
  body?: string;
  data: { title: string; description: string; category: string; date: Date; key_points?: string[]; lang?: string };
}

// Gemini Faz 2 (27 Ekim): anlam benzerliği; vektör dosyasında kimlik "<dil>/<slug>" (iki dilin slug'ları ayrı).
export type Anlam = (a: IlgiliAday, b: IlgiliAday) => number | null;
const anahtar = (p: IlgiliAday) => `${p.data.lang ?? 'tr'}/${p.id}`;
const varsayilanAnlam: Anlam = (a, b) => anlamBenzerligi(vektorleriOku(), anahtar(a), anahtar(b));

// "Yapay Zekâ" neredeyse her haberde geçer; ilgi ölçüsü olarak ayırt edici değildir.
const GENEL = new Set(['https://www.wikidata.org/wiki/Q11660']);

function kalip(kw: string) {
  const k = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return kw.length <= 5
    ? new RegExp(`(?<![\\p{L}\\p{N}])${k}(?![\\p{L}\\p{N}])`, 'u')
    : new RegExp(`(?<![\\p{L}\\p{N}])${k}`, 'ui');
}
const KALIPLAR = AI_ENTITIES.filter((e) => !GENEL.has(e.sameAs)).map((e) => ({
  kimlik: e.sameAs,
  kaliplar: e.keywords.map(kalip),
}));

/** Haberin başlık, özet, maddeler ve gövdesinde geçen (ayırt edici) varlıkların kimlikleri. */
const onbellek = new Map<string, Set<string>>();
export function varliklar(post: IlgiliAday): Set<string> {
  // Her sayfa bütün adayları tarar; aynı haber (dil + kimlik + başlık) bir kez ölçülür.
  const anahtar = `${post.id}|${post.data.title}|${post.body?.length ?? 0}`;
  const kayitli = onbellek.get(anahtar);
  if (kayitli) return kayitli;
  const sonuc = olc(post);
  onbellek.set(anahtar, sonuc);
  return sonuc;
}

function olc(post: IlgiliAday): Set<string> {
  const metin = [post.data.title, post.data.description, ...(post.data.key_points ?? []), post.body ?? ''].join('\n');
  return new Set(KALIPLAR.filter((v) => v.kaliplar.some((r) => r.test(metin))).map((v) => v.kimlik));
}

const uygun = (p: IlgiliAday) => p.data.category !== BULLETIN_CATEGORY && dizinlenir(p.body);

/**
 * @param post  sayfadaki haber
 * @param adaylar  aynı dildeki yayımlanmış haberler (yeniden eskiye sıralı)
 */
export function ilgiliHaberler<T extends IlgiliAday>(post: T, adaylar: T[], adet = 3, anlam: Anlam = varsayilanAnlam): T[] {
  const havuz = adaylar.filter((p) => p.id !== post.id && uygun(p));
  const benim = varliklar(post);
  const puanli = havuz
    .map((p, sira) => {
      let ortak = 0;
      if (benim.size > 0) for (const v of varliklar(p)) if (benim.has(v)) ortak++;
      return { p, sira, puan: ortak + anlamPuani(anlam(post, p)), ayniBolum: p.data.category === post.data.category };
    })
    // Önce ortak varlık + anlam puanı, sonra aynı bölüm, sonra yenilik (havuz sırası).
    .sort((a, b) => b.puan - a.puan || Number(b.ayniBolum) - Number(a.ayniBolum) || a.sira - b.sira);
  const secilen = puanli.filter((x) => x.puan > 0 || x.ayniBolum).slice(0, adet).map((x) => x.p);
  // Ne ortak varlık ne aynı bölüm varsa en yeni uygun haberlerle tamamlanır.
  if (secilen.length < adet) {
    for (const x of puanli) {
      if (secilen.length >= adet) break;
      if (!secilen.includes(x.p)) secilen.push(x.p);
    }
  }
  return secilen;
}
