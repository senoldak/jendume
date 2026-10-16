// Bülten Worker'ının saf fonksiyonları: doğrulama, hafta anahtarı, bağlantı ve e-posta derleme.
// Yan etkisi yoktur; testler worker/saf.test.ts içindedir.

export const SITE = 'https://jendume.com';
/** BULTEN_GONDEREN değişkeni yoksa kullanılan gönderen (wrangler.jsonc'de de aynısı tanımlıdır). */
export const GONDEREN_VARSAYILAN = 'JEN DUME <bulten@jendume.com>';
export const DILLER = ['tr', 'en'] as const;
export type Dil = (typeof DILLER)[number];

/** Aynı adrese onay e-postası arası (ms). */
export const ONAY_ARA_MS = 10 * 60_000;
/** Onaylanmayan kaydın yaşam süresi (ms). */
export const ONAY_SURESI_MS = 7 * 86_400_000;
/** Haftalık bültende en fazla haber sayısı. */
export const EN_FAZLA_HABER = 10;
/** Bülten haberleri için pencere (ms). */
export const HAFTA_PENCERESI_MS = 7 * 86_400_000;
/** Resend batch API'si çağrı başına en fazla alıcı. */
export const PARTI_BOYU = 100;

/** Bülten sayfası (durum mesajları burada) ve gizlilik sayfası yolları, dile göre. */
export const BULTEN_YOLU: Record<Dil, string> = { tr: '/tr/bulten/', en: '/en/newsletter/' };
export const GIZLILIK_YOLU: Record<Dil, string> = { tr: '/tr/gizlilik/', en: '/en/privacy/' };

export type Durum = 'kontrol' | 'onaylandi' | 'gecersiz' | 'ayrildi' | 'kapali';

/** E-posta: boşluksuz, küçük harfe çevrilmiş, 254 karakteri geçmeyen. Geçersizse null. */
export function epostaNormalize(ham: unknown): string | null {
  if (typeof ham !== 'string') return null;
  const e = ham.trim().toLowerCase();
  if (e.length < 6 || e.length > 254) return null;
  if (!/^[a-z0-9._%+'-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(e)) return null;
  if (e.split('@')[0].length > 64) return null;
  return e;
}

/** Form alanındaki dil: yalnız 'en' İngilizce, geri kalan her şey Türkçe. */
export function dilSecimi(ham: unknown): Dil {
  return ham === 'en' ? 'en' : 'tr';
}

/** Belirteç biçimi (crypto.randomUUID). Sorgu parametresi için sınırlı, güvenli karakterler. */
export function belirtecGecerli(t: string | null): t is string {
  return typeof t === 'string' && /^[A-Za-z0-9-]{8,64}$/.test(t);
}

/** Durum yönlendirmesi: abonenin dilindeki bülten sayfasına ?durum=… ile. */
export function durumYolu(dil: Dil, durum: Durum): string {
  return `${BULTEN_YOLU[dil]}?durum=${durum}`;
}

/** ISO hafta anahtarı, ör. 2026-10-19 → "2026-W43". */
export function isoHafta(tarih: Date): string {
  const t = new Date(Date.UTC(tarih.getUTCFullYear(), tarih.getUTCMonth(), tarih.getUTCDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const yilBasi = Date.UTC(t.getUTCFullYear(), 0, 1);
  const hafta = Math.ceil((((t.getTime() - yilBasi) / 86_400_000) + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(hafta).padStart(2, '0')}`;
}

/** Bağlantıya UTM parametreleri ekler (mevcut parametreleri korur). */
export function utmEkle(adres: string, parametreler: Record<string, string>): string {
  const u = new URL(adres);
  for (const [anahtar, deger] of Object.entries(parametreler)) u.searchParams.set(anahtar, deger);
  return u.toString();
}

/** Haftalık e-postadaki bağlantılar: utm_source=bulten&utm_medium=email&utm_campaign=haftalik-<hafta>. */
export function bultenUtm(hafta: string): Record<string, string> {
  return { utm_source: 'bulten', utm_medium: 'email', utm_campaign: `haftalik-${hafta}` };
}

export function htmlKacis(metin: string): string {
  return metin
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function onayUrl(origin: string, belirtec: string): string {
  return `${origin}/api/bulten/onay?t=${encodeURIComponent(belirtec)}`;
}

export function ayrilUrl(origin: string, belirtec: string): string {
  return `${origin}/api/bulten/ayril?t=${encodeURIComponent(belirtec)}`;
}

export interface HaberOgesi {
  baslik: string;
  ozet: string;
  url: string;
  tarih: string;
}

const METIN = {
  tr: {
    onayKonu: 'JEN DUME bültenini onaylayın',
    onayGiris: 'Haftalık yapay zekâ bültenine abone olmak için aşağıdaki bağlantıyı açın.',
    onayButon: 'Aboneliği onayla',
    onayNot: 'Bu isteği siz yapmadıysanız bu e-postayı yok sayın. Onaylanmayan adresler 7 gün içinde listeden silinir.',
    bultenKonu: (hafta: string) => `JEN DUME haftalık bülten · ${hafta}`,
    bultenGiris: 'Bu hafta yayımlanan yapay zekâ haberleri:',
    bultenSon: 'Bu e-postayı bülten aboneliğiniz nedeniyle alıyorsunuz.',
    ayrilmaEtiket: 'Bülten aboneliğini bitir',
    gizlilik: 'Gizlilik',
  },
  en: {
    onayKonu: 'Confirm your JEN DUME bulletin subscription',
    onayGiris: 'Open the link below to confirm your subscription to the weekly AI bulletin.',
    onayButon: 'Confirm subscription',
    onayNot: 'If you did not request this, ignore this email. Unconfirmed addresses are removed after 7 days.',
    bultenKonu: (hafta: string) => `JEN DUME weekly bulletin · ${hafta}`,
    bultenGiris: 'AI stories published this week:',
    bultenSon: 'You are receiving this email because you subscribed to the bulletin.',
    ayrilmaEtiket: 'End bulletin subscription',
    gizlilik: 'Privacy',
  },
} as const;

export function onayEpostasi(dil: Dil, link: string): { subject: string; html: string; text: string } {
  const m = METIN[dil];
  const html = `<p>${htmlKacis(m.onayGiris)}</p><p><a href="${htmlKacis(link)}">${htmlKacis(m.onayButon)}</a></p>`
    + `<p>${htmlKacis(m.onayNot)}</p>`;
  const text = `${m.onayGiris}\n\n${m.onayButon}: ${link}\n\n${m.onayNot}\n`;
  return { subject: m.onayKonu, html, text };
}

/** Haftalık bülten e-postası. Bağlantılar UTM'li; ayrılma bağlantısı UTM'siz ve kişiye özeldir. */
export function bultenEpostasi(args: {
  dil: Dil;
  hafta: string;
  haberler: HaberOgesi[];
  ayrilmaLinki: string;
  origin?: string;
}): { subject: string; html: string; text: string } {
  const { dil, hafta, haberler, ayrilmaLinki, origin = SITE } = args;
  const m = METIN[dil];
  const utm = bultenUtm(hafta);
  const ana = utmEkle(`${origin}/${dil}/`, utm);
  const gizlilik = utmEkle(`${origin}${GIZLILIK_YOLU[dil]}`, utm);
  const kartlar = haberler
    .map((h) => {
      const url = utmEkle(h.url, utm);
      return `<tr><td style="padding:16px 0;border-bottom:1px solid #c9ccc4;font-family:Segoe UI,Arial,sans-serif">`
        + `<div style="font-size:12px;color:#5a606b">${htmlKacis(h.tarih.slice(0, 10))}</div>`
        + `<a href="${htmlKacis(url)}" style="font-size:18px;font-weight:700;color:#16181d;text-decoration:none">${htmlKacis(h.baslik)}</a>`
        + `<p style="margin:6px 0 0;font-size:15px;line-height:1.5;color:#3a3f48">${htmlKacis(h.ozet)}</p>`
        + `</td></tr>`;
    })
    .join('');
  const html = `<!doctype html><html lang="${dil}"><body style="margin:0;background:#f3f4f1">`
    + `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f1;padding:24px 12px"><tr><td align="center">`
    + `<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff">`
    + `<tr><td style="background:#16181d;color:#ffffff;padding:18px 24px;font-family:Segoe UI,Arial,sans-serif;font-weight:700;letter-spacing:.03em">`
    + `<a href="${htmlKacis(ana)}" style="color:#ffffff;text-decoration:none">JEN DUME</a></td></tr>`
    + `<tr><td style="height:6px;background:#ffc72c"></td></tr>`
    + `<tr><td style="padding:20px 24px 8px;font-family:Segoe UI,Arial,sans-serif;font-size:16px;color:#16181d">${htmlKacis(m.bultenGiris)}</td></tr>`
    + `<tr><td style="padding:0 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${kartlar}</table></td></tr>`
    + `<tr><td style="padding:20px 24px;font-family:Segoe UI,Arial,sans-serif;font-size:13px;line-height:1.6;color:#5a606b">`
    + `<p style="margin:0 0 8px">${htmlKacis(m.bultenSon)}</p>`
    + `<p style="margin:0 0 8px"><a href="${htmlKacis(ayrilmaLinki)}" style="color:#16181d">${htmlKacis(m.ayrilmaEtiket)}</a> · `
    + `<a href="${htmlKacis(gizlilik)}" style="color:#16181d">${htmlKacis(m.gizlilik)}</a></p>`
    + `</td></tr></table></td></tr></table></body></html>`;
  const satirlar = haberler.map((h) => `- ${h.baslik} (${h.tarih.slice(0, 10)})\n  ${utmEkle(h.url, utm)}`);
  const text = `${m.bultenGiris}\n\n${satirlar.join('\n\n')}\n\n${m.bultenSon}\n`
    + `${m.ayrilmaEtiket}: ${ayrilmaLinki}\n${m.gizlilik}: ${gizlilik}\n${ana}\n`;
  return { subject: m.bultenKonu(hafta), html, text };
}

/** Ayrılma sayfası (GET): tek tuşlu POST formu; bağlantı tarayıcı ön yüklemesi aboneliği silmesin diye. */
export function ayrilmaSayfasi(dil: Dil, belirtec: string): string {
  const m = METIN[dil];
  const baslik = dil === 'tr' ? 'Bülten aboneliğini bitir · JEN DUME' : 'End bulletin subscription · JEN DUME';
  const aciklama = dil === 'tr'
    ? 'Bu işlem e-posta adresinizi bülten listesinden kalıcı olarak siler.'
    : 'This permanently removes your email address from the bulletin list.';
  return `<!doctype html><html lang="${dil}"><head><meta charset="utf-8">`
    + `<meta name="viewport" content="width=device-width, initial-scale=1">`
    + `<meta name="robots" content="noindex, nofollow"><title>${htmlKacis(baslik)}</title>`
    + `<style>body{margin:0;font-family:Segoe UI,Arial,sans-serif;background:#f3f4f1;color:#16181d}`
    + `main{max-width:560px;margin:48px auto;padding:0 16px}h1{font-size:28px;margin:0 0 12px}`
    + `button{background:#ffc72c;color:#16181d;border:0;padding:12px 18px;font:600 16px Segoe UI,Arial,sans-serif;cursor:pointer}`
    + `button:focus-visible{outline:3px solid #16181d;outline-offset:3px}</style></head>`
    + `<body><main><h1>${htmlKacis(m.ayrilmaEtiket)}</h1><p>${htmlKacis(aciklama)}</p>`
    + `<form method="post" action="/api/bulten/ayril?t=${encodeURIComponent(belirtec)}">`
    + `<button type="submit">${htmlKacis(m.ayrilmaEtiket)}</button></form></main></body></html>`;
}
