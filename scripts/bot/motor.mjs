// Standartlar Faz 0: standart süzgecinin kararını mecmua-saat motor defterine yazar (POST /motor/<site>/kaydet).
// Yazılamazsa tur durmaz (kayıt yardımcıdır); hata loga düşer. Kimlik adres olamaz: yalnız [A-Za-z0-9:_-];
// olay kimliği (kaynak adresi içerebilir) tek yönlü özetlenir.
import { createHash } from 'node:crypto';

export const motorKimlik = (id) => `j:${createHash('sha256').update(String(id ?? '')).digest('hex').slice(0, 24)}`;

export async function motorKaydet({ url, anahtar, site = 'jendume', kayit, fetchFn = fetch } = {}) {
  if (!url || !anahtar || !kayit?.kimlik) return false;
  try {
    const res = await fetchFn(`${String(url).replace(/\/$/, '')}/motor/${site}/kaydet`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${anahtar}`, 'content-type': 'application/json' },
      body: JSON.stringify({ haberler: [{ ...kayit, kimlik: motorKimlik(kayit.kimlik) }] }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.warn(`  motor kaydı yazılamadı: saat ${res.status} döndü`);
    return res.ok;
  } catch (e) {
    console.warn(`  motor kaydı yazılamadı: ${String(e?.message ?? e).slice(0, 100)}`);
    return false;
  }
}

// Standart kararından motor kaydı: kırmızı -> elendi; sarı -> yazildi (gerekçe eklenir).
export const kirmiziKayit = (kimlik, s) => ({ kimlik, durum: 'elendi', gerekce: s.gerekce });
export const sariKayit = (kimlik, slug, s) => ({ kimlik, durum: 'yazildi', slug, gerekce: s.gerekce });
