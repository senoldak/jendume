export const ELENME_METNI: Record<string, { tr: string; en: string }>;
export function elenmeKodu(k: string): string;
export function istanbulGunu(t: Date): string;
export function topla(gunler: object[]): {
  bulunan: number;
  degerlendirilen: number;
  yazilan: number;
  havuza: number;
  elenen: Record<string, number>;
  elenenToplam: number;
};
export interface ElenmeSatiri { kod: string; metin: string; sayi: number }
type Toplam = ReturnType<typeof topla> & { elenenListe: ElenmeSatiri[] };
export function yayinOdasiVerisi(p: {
  haberler: Array<{ baslik: string; url: string; tarih: Date; uretim?: string }>;
  gunluk?: { guncellendi?: string; gunler?: Record<string, object> };
  dil: 'tr' | 'en';
  simdi?: Date;
}): {
  dil: 'tr' | 'en';
  guncellendi: string | null;
  sonHaberler: Array<{ baslik: string; url: string }>;
  hafta: Array<{ gun: string; yayimlanan: number }>;
  haftaToplam: number;
  gun: (Toplam & { gun: string; bugun: boolean }) | null;
  kayitHafta: (Toplam & { dahil: number }) | null;
  sonZincir: { baslik: string; url: string; tarih: string } | null;
};
