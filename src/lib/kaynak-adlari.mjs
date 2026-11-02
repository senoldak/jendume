// Kaynak adları (2 Kasım 2026, hukuki değerlendirme mecmua/docs/kaynak-adi-hukuki-degerlendirme-2026-11-02.md):
// haberin altında dayandığı yayının adı ve o habere bağlantı. Yalnız gerçekten kaynak olan haber gösterilir (konu
// uyumu), gösterilmeyecek yayın (KHK, erişim engeli, örgüt bağlantısı; kaldırma isteği) hiç yazılmaz. Botun besleme
// listesi gizli kalır; yalnız o haberin kaynağı görünür. Hikâye metninde yayın adı yine geçmez (denetci.mjs).

// Görünen ad: besleme adındaki parantez içi açıklama ve " AI" / " Yapay Zekâ" eki atılır (gizli.mjs gizliMedyaAdlari ile aynı kural).
const EK = /\s*\([^)]*\)\s*$|\s+(AI|Yapay Zek[aâ])$/i;
export const gorunenAd = (ad) => String(ad ?? '').replace(EK, '').trim();

const DURAK = new Set(
  'the a an of and or to in on for with by from at as is are was were be its it this that new says said will can after over into how why what ai www com html htm php amp news haber haberler bir ve ile icin bu da de'.split(' '),
);
/** Karşılaştırma sözcükleri: küçük harf, aksansız, en az 3 harf, sık sözcükler hariç. */
export function sozcukler(metin) {
  const s = String(metin ?? '')
    .replace(/[ıİ]/g, 'i')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ');
  return new Set(s.split(' ').filter((w) => w.length > 2 && !DURAK.has(w)));
}

/**
 * Kaynak haberin konusu bizim haberle tutuyor mu? Kaynağın başlığı (bot bilir) ya da adresindeki sözcükler ile haberin
 * başlık ve özetleri arasında en az iki ortak sözcük. Ölçülemeyen (sözcüksüz adres) kaynak tutmuyor sayılır.
 */
export function konuTutar({ url, baslik }, metinler) {
  let yol = '';
  try {
    yol = decodeURIComponent(new URL(url).pathname);
  } catch {
    return false;
  }
  const kaynak = sozcukler(`${baslik ?? ''} ${yol}`);
  if (kaynak.size < 3) return false;
  const bizim = sozcukler(metinler.join(' '));
  let ortak = 0;
  for (const w of kaynak) if (bizim.has(w) && ++ortak >= 2) return true;
  return false;
}

/**
 * Gösterilecek kaynaklar: { ad, url } listesi (aynı adres bir kez). Resmî kaynaklar ayrı alanda (kaynaklar) durur.
 * @param {{ ad: string, url: string, baslik?: string, resmi?: boolean }[]} liste
 * @param {string[]} metinler haberin başlık ve özetleri (iki dil)
 * @param {{ gosterilmez?: string[] }} [secenek] gösterilmeyecek yayın adları (şifreli listeden)
 */
export function gosterilecekKaynaklar(liste, metinler, { gosterilmez = [] } = {}) {
  const yasak = new Set(gosterilmez.map((a) => gorunenAd(a).toLocaleLowerCase('tr')));
  const out = [];
  for (const k of liste ?? []) {
    if (!k?.url || !/^https?:\/\//i.test(k.url) || k.resmi) continue;
    const ad = gorunenAd(k.ad);
    if (!ad || yasak.has(ad.toLocaleLowerCase('tr'))) continue;
    if (out.some((x) => x.url === k.url)) continue;
    if (!konuTutar(k, metinler)) continue;
    out.push({ ad, url: k.url });
  }
  return out;
}
