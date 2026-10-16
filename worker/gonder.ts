// Haftalık gönderim (cron: pazartesi 06:00 UTC). Her dil için ayrı: aynı hafta ve dil iki kez gönderilmez.
import {
  DILLER,
  EN_FAZLA_HABER,
  GONDEREN_VARSAYILAN,
  HAFTA_PENCERESI_MS,
  PARTI_BOYU,
  SITE,
  bultenEpostasi,
  ayrilUrl,
  isoHafta,
  type Dil,
  type HaberOgesi,
} from './saf.ts';
import type { Env } from './tipler.ts';

export interface GonderimSonucu {
  dil: Dil;
  durum: 'gonderildi' | 'zaten' | 'veri-yok' | 'haber-yok' | 'alici-yok';
  adet?: number;
}

/** Resend batch: her alıcıya ayrı e-posta; alıcılar birbirini görmez. */
export function batchGovdesi(args: {
  gonderen: string;
  dil: Dil;
  hafta: string;
  haberler: HaberOgesi[];
  alicilar: { eposta: string; belirtec: string }[];
  origin?: string;
}) {
  return args.alicilar.map((a) => {
    const ayrilmaLinki = ayrilUrl(args.origin ?? SITE, a.belirtec);
    const e = bultenEpostasi({
      dil: args.dil,
      hafta: args.hafta,
      haberler: args.haberler,
      ayrilmaLinki,
      origin: args.origin,
    });
    return {
      from: args.gonderen,
      to: [a.eposta],
      subject: e.subject,
      html: e.html,
      text: e.text,
      headers: {
        'List-Unsubscribe': `<${ayrilmaLinki}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    };
  });
}

/** Son 7 günün haberleri, en yeni en fazla EN_FAZLA_HABER tane. Geçersiz kayıtlar elenir. */
export function haberleriSec(ham: unknown, simdi: Date): HaberOgesi[] {
  const liste = (ham as { haberler?: unknown })?.haberler;
  if (!Array.isArray(liste)) return [];
  return liste
    .filter((h): h is HaberOgesi => {
      if (!h || typeof h !== 'object') return false;
      const o = h as HaberOgesi;
      const t = new Date(o.tarih).valueOf();
      return typeof o.baslik === 'string' && typeof o.ozet === 'string'
        && typeof o.url === 'string' && o.url.startsWith('https://')
        && !Number.isNaN(t) && simdi.valueOf() - t <= HAFTA_PENCERESI_MS && simdi.valueOf() - t >= -86_400_000;
    })
    .sort((a, b) => new Date(b.tarih).valueOf() - new Date(a.tarih).valueOf())
    .slice(0, EN_FAZLA_HABER);
}

export async function dilGonder(
  env: Env,
  dil: Dil,
  simdi: Date,
  fetchFn: typeof fetch,
): Promise<GonderimSonucu> {
  const hafta = isoHafta(simdi);
  const onceki = await env.DB.prepare('SELECT hafta FROM gonderim WHERE hafta = ? AND dil = ?').bind(hafta, dil).first();
  if (onceki) return { dil, durum: 'zaten' };

  const veri = await env.ASSETS.fetch(new Request(`${SITE}/bulten/haftalik-${dil}.json`));
  if (!veri.ok) return { dil, durum: 'veri-yok' };
  const haberler = haberleriSec(await veri.json().catch(() => null), simdi);
  if (haberler.length === 0) return { dil, durum: 'haber-yok' };

  const { results } = await env.DB.prepare(
    "SELECT eposta, belirtec FROM abone WHERE durum = 'onayli' AND dil = ? ORDER BY id",
  ).bind(dil).all<{ eposta: string; belirtec: string }>();
  if (!results || results.length === 0) return { dil, durum: 'alici-yok' };

  const gonderen = env.BULTEN_GONDEREN ?? GONDEREN_VARSAYILAN;
  let basarili = 0;
  for (let i = 0; i < results.length; i += PARTI_BOYU) {
    const parti = results.slice(i, i + PARTI_BOYU);
    const govde = batchGovdesi({ gonderen, dil, hafta, haberler, alicilar: parti });
    const yanit = await fetchFn('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(govde),
    });
    if (yanit.ok) basarili += parti.length;
    else console.error(`bülten ${dil}: Resend parti hatası ${yanit.status}`);
  }

  // Gönderim denendikten sonra kaydedilir: yarım kalan bir hafta yeniden denenip çift gönderilmez.
  await env.DB.prepare('INSERT INTO gonderim (hafta, dil, zaman, adet) VALUES (?, ?, ?, ?)')
    .bind(hafta, dil, simdi.toISOString(), basarili).run();
  return { dil, durum: 'gonderildi', adet: basarili };
}

/** Süresi dolan onaylanmamış kayıtları siler (7 gün). */
export async function eskiKayitlariSil(env: Env, simdi: Date): Promise<void> {
  const sinir = new Date(simdi.valueOf() - 7 * 86_400_000).toISOString();
  await env.DB.prepare("DELETE FROM abone WHERE durum = 'bekliyor' AND olusturma < ?").bind(sinir).run();
}

export async function haftalikGonder(
  env: Env,
  simdi: Date = new Date(),
  fetchFn: typeof fetch = fetch,
): Promise<GonderimSonucu[]> {
  await eskiKayitlariSil(env, simdi);
  if (!env.RESEND_API_KEY) {
    console.warn('bülten: RESEND_API_KEY yok; haftalık gönderim atlandı.');
    return [];
  }
  const sonuclar: GonderimSonucu[] = [];
  for (const dil of DILLER) sonuclar.push(await dilGonder(env, dil, simdi, fetchFn));
  return sonuclar;
}
