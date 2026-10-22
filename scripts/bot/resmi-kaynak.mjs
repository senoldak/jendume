// Haberin altındaki "Resmî kaynak" satırının verisi. Yalnız metni kullanılan kaynakların hepsi birincil (kaynaklar.mjs
// RESMI_KAYNAKLAR: kurumların ve şirketlerin kendi duyuru akışları) ise ad ve bağlantı yazılır; içlerinde bir tane bile
// gizli (medya) kaynak varsa ya da bayrak bilinmiyorsa hiçbiri yazılmaz. Medya kaynağının adı ve adresi yalnız şifreli
// kaynakIzi'nde durur.
export function resmiKaynakListesi(kullanilan) {
  const liste = Array.isArray(kullanilan) ? kullanilan : [];
  if (!liste.length || !liste.every((k) => k?.resmi === true && /^https:\/\//.test(k?.url ?? '') && k?.ad)) return [];
  const tekil = [];
  for (const k of liste) if (!tekil.some((x) => x.url === k.url)) tekil.push({ ad: String(k.ad), url: k.url });
  return tekil;
}
