export type Dil = 'tr' | 'en';
export interface KuralSatiri { kod: string; ad: string; n: number }
export interface RaporJson {
  ceyrek: string;
  bas: string;
  son: string;
  defterBaslangici?: string;
  yazildi: number;
  elendi: number;
  kirmizi: number;
  sari: number;
  kurallar?: { kirmizi?: Record<string, number>; sari?: Record<string, number> };
  geminiCagri: number;
  kuralDegisiklikleri: string[] | null;
  uretim?: string;
}
export interface Sikayet { alindi: string; karar: string; sonuc: 'yerinde' | 'kismen' | 'yerinde-degil' }
type HaberGirdisi = { id?: string; data: { date: Date; title?: string; updated?: Date; duzeltme?: string; uretim?: string; yaziTuru?: string } };
type Kaldirilan = { tarih: string; ilkYayin: string; konu: Record<string, string>; neden: Record<string, string> };
export const sikayetYolu: (dil: Dil) => string;
export const standartlarRaporuYolu: (dil: Dil) => string;
export const istanbulGunu: (t: Date | string | number) => string;
export const aralikta: (gun: string, bas: string, son: string) => boolean;
export const KURAL_ADLARI: Record<Dil, Record<string, string>>;
export const kuralAdi: (kod: string, dil: Dil) => string;
export function kuralSatirlari(kurallar: Record<string, number> | undefined, dil: Dil): KuralSatiri[];
export const kalanElenen: (elendi: number, kirmizi: number) => number;
export function yayinSayilari(haberler: HaberGirdisi[], bas: string, son: string): { otomatik: number; yayinci: number; zincir: number };
export function duzeltmeSayilari(haberler: HaberGirdisi[], kaldirilan: Kaldirilan[], bas: string, son: string): { duzeltme: number; kaldirilan: number };
export function sikayetSayilari(sikayetler: Sikayet[], bas: string, son: string): { toplam: number; yerinde: number; kismen: number; yerindeDegil: number };
export function raporlariSirala<T extends { bas: string }>(raporlar: T[]): T[];
export function ceyrekVerisi(
  rapor: RaporJson,
  kaynak: { haberler: HaberGirdisi[]; kaldirilan: Kaldirilan[]; sikayetler: Sikayet[] },
  dil?: Dil,
): RaporJson & {
  defterNotu: boolean;
  yayin: { otomatik: number; yayinci: number; zincir: number };
  duzeltme: { duzeltme: number; kaldirilan: number };
  sikayet: { toplam: number; yerinde: number; kismen: number; yerindeDegil: number };
  kalan: number;
  kirmiziSatirlari: KuralSatiri[];
  sariSatirlari: KuralSatiri[];
};
