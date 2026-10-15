import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
  updated: z.coerce.date().optional(),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  bolge: z.string().optional(),
  perspektif: z.string().optional(),
  why_matters: z.string().optional(),
  key_points: z.array(z.string()).optional(),
  // Kaynakların şifreli kaydı; sitede gösterilmez (bkz. scripts/bot/gizli.mjs).
  kaynakIzi: z.string().optional(),
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
