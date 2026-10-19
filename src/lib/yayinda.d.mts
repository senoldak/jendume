export function yayinda(veri: { draft?: boolean; date: Date | string }, simdi?: number): boolean;
export function onyuzMaddesiYayinda(metin: string, simdi?: number): boolean;
export function yayindakiDiller(
  diller: Partial<Record<'tr' | 'en', { draft?: boolean; date: Date | string } | null | undefined>>,
  simdi?: number,
): ('tr' | 'en')[];
