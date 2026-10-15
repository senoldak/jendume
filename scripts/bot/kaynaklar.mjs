// JEN DUME — kelimelerin ötesinde
// Haber kaynakları: Türkiye'den ve dünyadan yapay zekâ araştırmalarını, modellerini,
// politikalarını ve toplumsal etkilerini takip eden güvenilir yayın ve araştırma akışları.
import { hentTekst, htmlMetin, varlikCoz } from './lib.mjs';
import { adresiSil, gizliKaynaklar, kaynakKodu, ozet } from './gizli.mjs';

const YZ_FILTRE =
  /(yapay zek[aâ]|\bai\b|\bllm\b|openai|chatgpt|claude|anthropic|gemini|deepmind|nvidia|synthid|algoritma|otonom|robot|dil model|makine öğren|bilişsel|sinir ağı)/i;

// Resmi olmayan kaynaklar (haber siteleri, yayınlar, bloglar) repoda açık durmaz; gizli-kaynaklar.sifreli
// dosyasından okunur (bkz. gizli.mjs). Kimliklerde ve loglarda adları yerine kısa kod (etiket) geçer.
// Burada yalnızca birincil kaynaklar durur: laboratuvarların, şirketlerin ve kurumların kendi duyuru akışları.
export const RESMI_KAYNAKLAR = [
  { ad: 'OpenAI News', kisa: 'openai', akis: 'https://openai.com/news/rss.xml' },
  { ad: 'Google AI Blog', kisa: 'google-ai', akis: 'https://blog.google/technology/ai/rss/' },
  { ad: 'Google DeepMind', kisa: 'deepmind', akis: 'https://deepmind.google/blog/rss.xml' },
  { ad: 'Hugging Face Blog', kisa: 'hf-blog', akis: 'https://huggingface.co/blog/feed.xml' },
  { ad: 'MIT News AI', kisa: 'mit-news-ai', akis: 'https://news.mit.edu/rss/topic/artificial-intelligence2' },
].map((k) => ({ ...k, resmi: true, etiket: k.ad }));

// gizli: true olan kaynağın haber kimliği "<kod>:<adresin anahtarlı özeti>" olur; ad ve adres yalnızca
// şifreli kaynak izine (kaynakIzi) girer.
export const gizliKaynak = (k) => ({ ...k, filtre: k.filtre ? YZ_FILTRE : undefined, gizli: true, etiket: kaynakKodu(k.kisa) });

export const KAYNAKLAR = [...gizliKaynaklar().kaynaklar.map(gizliKaynak), ...RESMI_KAYNAKLAR];

// Haberin durum dosyasındaki kimliği (gorulen, ayrik, ayni, puan, hatalar anahtarları).
export const haberKimligi = (k, adres) => (k.gizli ? `${k.etiket}:${ozet(adres)}` : `${k.kisa}:${adres}`);

function genelGovde(html) {
  const makale =
    html.match(/<article[\s\S]*?<\/article>/gi)?.sort((a, b) => b.length - a.length)[0] ?? html;
  return [...makale.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => htmlMetin(m[1]))
    .filter(
      (p) =>
        p.length > 40 &&
        !/^(Source|Image|Photo|Read more|Subscribe|Sign up|Kaynak|Fotoğraf|Yasal Uyarı)\b/i.test(p)
    )
    .join('\n\n');
}

export async function tamMetin(oge) {
  const akistan = htmlMetin(oge.icerik || '');
  if (akistan.length > 400) return akistan;
  try {
    const html = await hentTekst(oge.link);
    const govde = genelGovde(html);
    if (govde.length > 300) return govde;
  } catch (e) {
    console.warn(`  ${oge.kaynak.etiket} sayfası okunamadı (${adresiSil(e.message)}); özet kullanılıyor`);
  }
  return akistan || htmlMetin(oge.description);
}

export const baslikTemiz = (s) => varlikCoz(s).replace(/\s+/g, ' ').trim();

// Yapay zekâ temalı bültende "yapay", "zeka", "artificial", "intelligence", "model", "yatırım"
// gibi jenerik kelimeler her başlıkta geçebildiği için iki alakasız haberin aynı olay sanılmaması adına durak kelimesi sayılır.
const DURAK = new Set([
  ...'the and for with that this from have has was were are been will would can could about into over after before says said unveils launches reveals releases released announces announced introduces introduced builds built raises raised million billion funding startup company model models agent agents new first more than its their who what when where why how artificial intelligence'.split(
    ' '
  ),
  ...'için ile ve veya bir bu şu o da de ki mi en daha çok yeni ilk olarak olan oldu etti yaptı geliyor geldi açıkladı duyurdu tanıttı yayınladı açtı aldı milyon milyar dolar yatırım turda değerleme üzerinden şirketi girişimi geliştiricisi katıldığı model modeli modelleri modellerini asistanı aracını kullanıcılarına yapay zeka zekâ'.split(
    ' '
  ),
]);

export function anahtarlar(baslik = '') {
  const out = new Set();
  for (let w of String(baslik)
    .replace(/[’'][\p{L}]+/gu, '')
    .split(/[^\p{L}\d.,]+/u)) {
    w = w.replace(/[.,]+$/, '');
    if (!w) continue;
    if (/^\d/.test(w)) {
      out.add(w.replace(',', '.'));
      continue;
    }
    const l = w.toLowerCase().replace(/â/g, 'a').replace(/î/g, 'i');
    if (l.length < 3 || DURAK.has(l)) continue;
    out.add(l.slice(0, 5));
  }
  return out;
}

export function benzer(a, b) {
  let ortak = 0;
  for (const x of a) if (b.has(x)) ortak++;
  return ortak >= 2 && ortak / Math.min(a.size, b.size) >= 0.5;
}
