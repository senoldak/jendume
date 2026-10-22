// Yapay zekâ sözlüğü verisi (TR /tr/sozluk/<slug>/, EN /en/glossary/<slug>/). Alanlar için bkz. ./tip.d.ts.
// Kurallar: tanımlar her dilde özgün yazılır (çeviri değil), 100–250 kelime; değişken bilgi, uydurma rakam ve haber
// kuruluşu adı yoktur. Denetim: src/lib/sozluk.test.ts.
import p1 from './parca-1.mjs';
import p2 from './parca-2.mjs';
import p3 from './parca-3.mjs';
import p4 from './parca-4.mjs';

/** @type {import('./tip').Terim[]} */
export const TERIMLER = [...p1, ...p2, ...p3, ...p4];
