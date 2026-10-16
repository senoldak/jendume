// Şeffaflık sayfasının verisi: haber botu ne kadar içerik taradı, kaç haber yayımlandı, hangi kaynak türlerinden.
// Resmi olmayan kaynakların adı geçmez: kimlikleri zaten kısa koddur (k1a2b3c, bkz. scripts/bot/gizli.mjs) ve yalnız
// sayı olarak görünürler. Laboratuvar/kurum akışları (RESMI_KAYNAKLAR) kısa adlarıyla sayılır.
// Değerlendirilen adaylar scripts/bot/gorulen.json'dan gelir: bot bir adayı ancak hakkında karar verince (yazıldı ya da
// elendi) işaretler, bu yüzden sayı "taranan" değil "değerlendirilen" adaydır. Yayımlananlar Türkçe koleksiyondan gelir.
// BOT_BASLANGIC: bu botun ilk sürümü; öncesindeki haberler eski sistemden taşındı, pencereye girmez.
export const BOT_BASLANGIC = '2026-10-15';

const GUN_MS = 86400000;

/** İstanbul takvim günü (YYYY-AA-GG). */
export const istanbulGunu = (t) => new Date(t).toLocaleDateString('sv-SE', { timeZone: 'Europe/Istanbul' });

const onek = (id) => String(id).split(':')[0];
/** Kaynak türü: gizli kod → yayin (haber siteleri, dergiler, bloglar), diğerleri → resmi (laboratuvar, kurum). */
export const kaynakTuru = (id) => (/^k[0-9a-f]{6}$/.test(onek(id)) ? 'yayin' : 'resmi');

/**
 * @param haberler {{ date: Date }[]}
 * @param gorulen {Record<string, string>} kimlik → zaman (ISO)
 */
export function seffaflikVerisi(haberler, gorulen, { simdi = new Date(), gun = 30, baslangic = BOT_BASLANGIC } = {}) {
  const kayitlar = Object.entries(gorulen ?? {}).map(([id, t]) => ({ id, gun: istanbulGunu(t) }));
  const ilk = kayitlar.map((k) => k.gun).sort()[0];
  const bugun = istanbulGunu(simdi);
  const gunler = [];
  for (let i = gun - 1; i >= 0; i--) {
    const g = istanbulGunu(simdi.valueOf() - i * GUN_MS);
    if ((!ilk || g >= ilk) && g >= baslangic) gunler.push(g);
  }
  const bas = gunler[0] ?? bugun;
  const pencere = (g) => g >= bas && g <= bugun;
  const yayinlanan = haberler.filter((h) => pencere(istanbulGunu(h.date)));
  const taranan = kayitlar.filter((k) => pencere(k.gun));
  const tur = (t) => {
    const k = taranan.filter((x) => kaynakTuru(x.id) === t);
    return { taranan: k.length, kaynak: new Set(k.map((x) => onek(x.id))).size };
  };
  const yayin = tur('yayin');
  const resmi = tur('resmi');
  return {
    ilkGun: bas,
    sonGun: bugun,
    gunSayisi: gunler.length,
    taranan: taranan.length,
    yayinlanan: yayinlanan.length,
    kaynakSayisi: yayin.kaynak + resmi.kaynak,
    yayin,
    resmi,
    gunluk: gunler.map((g) => ({
      gun: g,
      taranan: taranan.filter((k) => k.gun === g).length,
      yayinlanan: yayinlanan.filter((h) => istanbulGunu(h.date) === g).length,
    })),
  };
}
