export interface DuzeltmeKaydi {
  tur: 'duzeltme' | 'kaldirildi';
  tarih: Date;
  metin: string;
  baslik?: string;
  ilkYayin?: Date;
  yol?: string;
}
export function notuAyir(not: string | undefined, yedekTarih: Date): { tarih: Date; metin: string };
export function duzeltmeKayitlari(
  haberler: { id: string; data: { title: string; date: Date; updated?: Date; duzeltme?: string } }[],
  kaldirilan: { tarih: string; ilkYayin: string; konu: Record<string, string>; neden: Record<string, string> }[],
  dil: 'tr' | 'en',
  yolFn: (id: string) => string,
): DuzeltmeKaydi[];
