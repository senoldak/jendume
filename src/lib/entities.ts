import type { Locale } from './site';

export interface EntityMapping {
  name: Record<Locale, string>;
  type: 'Organization' | 'Thing';
  sameAs: string;
  keywords: string[];
}

export const AI_ENTITIES: EntityMapping[] = [
  {
    name: { tr: 'OpenAI', en: 'OpenAI' },
    type: 'Organization',
    sameAs: 'https://www.wikidata.org/wiki/Q58936952',
    keywords: ['OpenAI', 'Open AI'],
  },
  {
    name: { tr: 'Google DeepMind', en: 'Google DeepMind' },
    type: 'Organization',
    sameAs: 'https://www.wikidata.org/wiki/Q15732152',
    keywords: ['Google DeepMind', 'DeepMind'],
  },
  {
    name: { tr: 'Anthropic', en: 'Anthropic' },
    type: 'Organization',
    sameAs: 'https://www.wikidata.org/wiki/Q111666683',
    keywords: ['Anthropic'],
  },
  {
    name: { tr: 'Büyük Dil Modeli', en: 'Large Language Model' },
    type: 'Thing',
    sameAs: 'https://www.wikidata.org/wiki/Q115305900',
    keywords: [
      'Large Language Model',
      'Large Language Models',
      'Büyük Dil Modeli',
      'Büyük Dil Modelleri',
      'LLM',
      'LLMs',
      'dil modeli',
      'dil modelleri',
    ],
  },
  {
    name: { tr: 'Yapay Genel Zekâ', en: 'Artificial General Intelligence' },
    type: 'Thing',
    sameAs: 'https://www.wikidata.org/wiki/Q1055745',
    keywords: [
      'Artificial General Intelligence',
      'Yapay Genel Zekâ',
      'Yapay Genel Zeka',
      'AGI',
    ],
  },
  {
    name: { tr: 'NVIDIA', en: 'NVIDIA' },
    type: 'Organization',
    sameAs: 'https://www.wikidata.org/wiki/Q182477',
    keywords: ['NVIDIA', 'Nvidia'],
  },
  {
    name: { tr: 'Kuantum Hesaplama', en: 'Quantum Computing' },
    type: 'Thing',
    sameAs: 'https://www.wikidata.org/wiki/Q11190',
    keywords: [
      'Quantum Computing',
      'Kuantum Hesaplama',
      'kuantum bilgisayar',
      'kuantum bilgisayarları',
      'quantum computer',
      'quantum computers',
    ],
  },
  {
    name: { tr: 'Yapay Zekâ', en: 'Artificial Intelligence' },
    type: 'Thing',
    sameAs: 'https://www.wikidata.org/wiki/Q11660',
    keywords: [
      'Artificial Intelligence',
      'Yapay Zekâ',
      'Yapay Zeka',
      'AI',
    ],
  },
];

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function matchEntities(
  text: string,
  lang: Locale = 'tr'
): Array<{ '@type': string; name: string; sameAs: string }> {
  if (!text) return [];
  const about: Array<{ '@type': string; name: string; sameAs: string }> = [];

  for (const ent of AI_ENTITIES) {
    const matched = ent.keywords.some((kw) => {
      const escaped = escapeRegex(kw);
      // For short acronyms (e.g. AI, AGI, LLM), strictly enforce start and end word-boundary
      // assertions to prevent substring false positives (e.g. 'email', 'chain', 'aging', 'claim').
      // Turkish apostrophes/suffixes like "AGI'ye" or "LLM'ler" will match cleanly because
      // the apostrophe is not a letter/number Unicode character.
      const isShortAcronym = kw.length <= 5;
      const pattern = isShortAcronym
        ? new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'ui')
        : new RegExp(`(?<![\\p{L}\\p{N}])${escaped}`, 'ui');
      return pattern.test(text);
    });

    if (matched) {
      about.push({
        '@type': ent.type,
        name: ent.name[lang] || ent.name.en,
        sameAs: ent.sameAs,
      });
    }
  }

  return about.slice(0, 4);
}

export function findEntities(text: string, lang: Locale = 'tr') {
  const matched = matchEntities(text, lang);
  return {
    about: matched.slice(0, 2),
    mentions: matched.slice(2),
  };
}
