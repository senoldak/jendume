// POST /api/yarar doğrulaması ("Bu haber işine yaradı mı?"; testi dogrula.test.mjs). tidsrost worker/valider.mjs'in eşi.
export const EN_COK_BAYT = 1024;
const KIMLIK = /^(tr|en)\/[a-z0-9-]{1,160}$/;

/** { ok: true, kimlik, cevap } ya da { ok: false }. */
export function cevapDogrula(metin, icerikTuru) {
  if (!/^application\/json(\s*;|$)/i.test(String(icerikTuru || ''))) return { ok: false };
  if (typeof metin !== 'string' || new TextEncoder().encode(metin).length > EN_COK_BAYT) return { ok: false };
  let d;
  try {
    d = JSON.parse(metin);
  } catch {
    return { ok: false };
  }
  if (!d || typeof d !== 'object' || Array.isArray(d)) return { ok: false };
  if (typeof d.kimlik !== 'string' || !KIMLIK.test(d.kimlik)) return { ok: false };
  if (d.cevap !== 'evet' && d.cevap !== 'hayir') return { ok: false };
  return { ok: true, kimlik: d.kimlik, cevap: d.cevap };
}

/** İstanbul günü, YYYY-AA-GG. */
export function istanbulGunu(tarih = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(tarih);
}
