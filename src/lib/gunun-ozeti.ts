// Telegram Günün Özeti: Türkçe gün sayfası (/tr/gunun-ozeti/YYYY-AA-GG/) ve kapağı. Paragrafı 20:45 işi yazar
// (scripts/bot/gunun-ozeti-is.mjs → src/data/gunun-ozeti/<tarih>.json); sayfa yalnız kaydı olan günler için üretilir.
import { istanbulGunu, kapakSirasi, trTarih } from '../../scripts/bot/gunun-ozeti.mjs';

const BULTEN = 'gunluk-bulten'; // site.ts BULLETIN_CATEGORY (testler Astro'suz çalışsın diye burada)

export interface OzetKaydi {
  tarih: string;
  paragraf: string;
  kimlikler: string[];
  yazan: 'gemini' | 'yedek';
  olusturma: string;
}

interface Aday {
  id: string;
  data: { title: string; date: Date; category: string };
}

/** import.meta.glob(…, { eager: true, import: 'default' }) çıktısı → en yeni gün önce. */
export function ozetKayitlari(modul: Record<string, unknown>): OzetKaydi[] {
  return (Object.values(modul) as OzetKaydi[]).sort((a, b) => (a.tarih < b.tarih ? 1 : -1));
}

/** O günün (İstanbul) haberleri (en yeniden eskiye), bültenleri (saat sırasıyla) ve kapak verisi. */
export function ozetGunu<T extends Aday>(posts: T[], kayit: OzetKaydi) {
  const gunun = posts.filter((p) => istanbulGunu(p.data.date) === kayit.tarih);
  const zaman = (p: T) => p.data.date.valueOf();
  const haberler = gunun.filter((p) => p.data.category !== BULTEN).sort((a, b) => zaman(b) - zaman(a));
  const bultenler = gunun.filter((p) => p.data.category === BULTEN).sort((a, b) => zaman(a) - zaman(b));
  const tarihAd = trTarih(kayit.tarih);
  return {
    tarihAd,
    baslik: `Günün Özeti · ${tarihAd}`,
    haberler,
    bultenler,
    kapakBasliklari: kapakSirasi([...haberler].reverse(), kayit.kimlikler).map((p: T) => p.data.title),
    toplam: haberler.length,
  };
}

export const ozetYolu = (tarih: string) => `/tr/gunun-ozeti/${tarih}/`;
export const ozetKapakYolu = (tarih: string) => `/kapak/tr/gunun-ozeti/${tarih}.png`;
