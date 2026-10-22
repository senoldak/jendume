import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { VARSAYILAN_YAZI_TURU, YAZI_TURLERI } from './lib/yazi-turu.mjs';

// Düzeltme notları 1 Kasım 2026'dan önce gösterilmez (yapım aşaması; sahibinin kararı, 22 Ekim 2026).
// Zincir de bu tarihten önce not yazmaz (mecmua yazi-isleri/guncelleme/icerik.mjs DUZELTME_ACILIS).
const DUZELTME_ACILIS = Date.parse('2026-11-01T00:00:00+03:00');
const duzeltmeKapisi = (v: string | undefined) => (Date.now() < DUZELTME_ACILIS ? undefined : v);
const categoryEnum = z.enum([
  'dunya',
  'yapay-zeka',
  'teknoloji',
  'bilim',
  'ekonomi',
  'perspektif',
  'gunluk-bulten',
]);

const haberSchema = z.object({
  lang: z.enum(['tr', 'en']),
  title: z.string().min(5),
  description: z.string().min(15),
  category: categoryEnum,
  date: z.coerce.date(),
  // Öteki dildeki dosyanın adı (.md'siz); yalnız iki dilin adresi farklıysa dolu (src/lib/es-kimlik.mjs). Yoksa kimlik aynıdır.
  esId: z.string().optional(),
  updated: z.coerce.date().optional(),
  // Yayından sonra yapılan düzeltmenin notu ("<tarih saat>: <ne düzeltildi>"); boşsa makalede hiçbir şey görünmez.
  // Not `updated`'ı değiştirmez; sahibi elle günceller.
  duzeltme: z.string().min(10).optional().transform(duzeltmeKapisi),
  // Yazı türü (bkz. src/lib/yazi-turu): haber, açıklayıcı ya da referans; yoksa haber.
  yaziTuru: z.enum(YAZI_TURLERI).default(VARSAYILAN_YAZI_TURU),
  // 'yazi-isleri': yazı işleri zincirinin yazısı (yerleştirme yazar); sayfa sonunda zincir notunu alır (src/lib/yapayzeka-notu.mjs).
  uretim: z.enum(['yazi-isleri']).optional(),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  bolge: z.string().optional(),
  perspektif: z.string().optional(),
  why_matters: z.string().optional(),
  key_points: z.array(z.string()).optional(),
  // Rakam şeridi: haberin başında en çok 4 kilit rakam; bot yalnız kaynakta doğrulananları yazar (denetci.mjs).
  rakamlar: z.array(z.object({ etiket: z.string(), deger: z.string() })).max(4).default([]),
  // Kaynakların şifreli kaydı; sitede gösterilmez (bkz. scripts/bot/gizli.mjs).
  kaynakIzi: z.string().optional(),
  // Birincil (resmî) kaynaklar: yalnız bütün kaynakları birincil olan haberde dolu; sayfanın altında gösterilir.
  kaynaklar: z.array(z.object({ ad: z.string(), url: z.string().url() })).default([]),
  featured: z.boolean().default(false),
  breaking: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export const collections = {
  haberler_tr: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/haberler/tr' }),
    schema: haberSchema,
  }),
  haberler_en: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/haberler/en' }),
    schema: haberSchema,
  }),
};
