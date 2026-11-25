// Haberin altındaki "Resmî kaynak" satırının verisi: metni kullanılan kaynaklardan birincil olanlar (kaynaklar.mjs
// RESMI_KAYNAKLAR: kurumların ve şirketlerin kendi duyuru akışları), adı ve bağlantısıyla. Medya kaynakları burada
// yazılmaz: adları yalnız şifreli kaynakIzi'nde durur ve kaynakAdlari'na hukuki koşullarla girer (src/lib/kaynak-adlari.mjs).
// 25 Kasım 2026'ya kadar karma haberde (içinde bir medya kaynağı da olan) resmî satır hiç yazılmıyordu; resmî kaynak her
// haberde anılabilir olduğundan artık karma haberde de birincil kaynaklar yazılır.
/** Karma haber mi: birincil kaynağın yanında en az bir medya kaynağı da kullanıldı (sayfada adsız medya satırı kalsın diye). */
export function karmaKaynakMi(kullanilan) {
  const liste = Array.isArray(kullanilan) ? kullanilan : [];
  return resmiKaynakListesi(liste).length > 0 && liste.some((k) => k?.resmi !== true);
}

export function resmiKaynakListesi(kullanilan) {
  const liste = Array.isArray(kullanilan) ? kullanilan : [];
  const tekil = [];
  for (const k of liste) {
    if (k?.resmi !== true || !k?.ad || !/^https:\/\//.test(k?.url ?? '')) continue;
    if (!tekil.some((x) => x.url === k.url)) tekil.push({ ad: String(k.ad), url: k.url });
  }
  return tekil;
}
