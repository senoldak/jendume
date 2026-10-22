// Düzeltmeler sayfasının kayıtları: iki kaynak birleştirilir, yeniden eskiye sıralanır.
//   1) Haberlerin `duzeltme` alanı ("20.10.2026: ne düzeltildi", saat isteğe bağlı) dilin kendi koleksiyonundan.
//   2) Yayından kaldırılan yazılar: src/data/duzeltmeler-kaldirilan.json (elle tutulur, silinmez).
// Kayıt: { tur: 'duzeltme' | 'kaldirildi', tarih: Date, metin: string, baslik?: string, ilkYayin?: Date, yol?: string }
// Kaldırılan kayıtta `konu` haberin başlığıdır; kişi hakları ya da özel kişi nedeniyle kaldırılanlarda başlık/ad yazılmaz,
// konu genel bir tanımdır (docs: Düzeltme Politikası madde 6.3).

const NOT_BICIMI = /^\s*(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s+(\d{1,2}):(\d{2}))?\s*:\s*([\s\S]+)$/;

/** "20.10.2026 14:00: metin" → { tarih, metin }; biçim tutmazsa yedek tarih ve notun tamamı. */
export function notuAyir(not, yedekTarih) {
  const m = NOT_BICIMI.exec(not ?? '');
  if (!m) return { tarih: yedekTarih, metin: (not ?? '').trim() };
  const [, g, a, y, sa, dk, metin] = m;
  const tarih = new Date(Date.UTC(Number(y), Number(a) - 1, Number(g), Number(sa ?? 12), Number(dk ?? 0)));
  return { tarih, metin: metin.trim() };
}

/**
 * @param {{ id: string; data: { title: string; date: Date; updated?: Date; duzeltme?: string } }[]} haberler dilin yayındaki haberleri
 * @param {{ tarih: string; ilkYayin: string; konu: Record<string,string>; neden: Record<string,string> }[]} kaldirilan
 * @param {'tr'|'en'} dil
 * @param {(id: string) => string} yolFn haber yolu üretici
 */
export function duzeltmeKayitlari(haberler, kaldirilan, dil, yolFn) {
  const kayitlar = [];
  for (const h of haberler) {
    const not = h.data.duzeltme;
    if (typeof not !== 'string' || not.length < 10) continue;
    const { tarih, metin } = notuAyir(not, h.data.updated ?? h.data.date);
    kayitlar.push({ tur: 'duzeltme', tarih, metin, baslik: h.data.title, yol: yolFn(h.id) });
  }
  for (const k of kaldirilan) {
    kayitlar.push({
      tur: 'kaldirildi',
      tarih: new Date(`${k.tarih}T12:00:00Z`),
      ilkYayin: new Date(`${k.ilkYayin}T12:00:00Z`),
      baslik: k.konu?.[dil],
      metin: k.neden[dil] ?? k.neden.tr,
    });
  }
  return kayitlar.sort((a, b) => b.tarih.valueOf() - a.tarih.valueOf());
}
