// Haftalık bülten verisi: son 7 günün indekslenebilir haberleri (en fazla 10), dil başına.
// Derleme anında üretilir; Worker (worker/gonder.ts) bu JSON'u okuyup e-postayı oluşturur.
import { getPublishedPosts } from './news';
import { BULLETIN_CATEGORY, SITE, type Locale } from './site';
import { haberYolu } from './yollar.mjs';
import { dizinlenir } from './kalite.mjs';

export const HAFTALIK_EN_FAZLA = 10;
const HAFTA_MS = 7 * 86_400_000;

export interface HaftalikHaber {
  baslik: string;
  ozet: string;
  url: string;
  tarih: string;
}

export interface HaftalikVeri {
  dil: Locale;
  uretildi: string;
  haberler: HaftalikHaber[];
}

export async function haftalikVeri(lang: Locale, simdi: Date = new Date()): Promise<HaftalikVeri> {
  const yayinlanan = await getPublishedPosts(lang);
  const haberler = yayinlanan
    .filter((p) => p.data.category !== BULLETIN_CATEGORY)
    .filter((p) => simdi.valueOf() - p.data.date.valueOf() <= HAFTA_MS)
    .filter((p) => dizinlenir(p.body ?? ''))
    .slice(0, HAFTALIK_EN_FAZLA)
    .map((p) => ({
      baslik: p.data.title,
      ozet: p.data.description,
      url: `${SITE.url}${haberYolu(lang, p.id)}`,
      tarih: p.data.date.toISOString(),
    }));
  return { dil: lang, uretildi: simdi.toISOString(), haberler };
}
