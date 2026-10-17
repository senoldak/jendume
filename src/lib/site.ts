export const LOCALES = ['en', 'tr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export function otherLocale(lang: Locale): Locale {
  return lang === 'tr' ? 'en' : 'tr';
}

export function isLocale(value: string | undefined): value is Locale {
  return value === 'tr' || value === 'en';
}

export type CategorySlug =
  | 'dunya'
  | 'yapay-zeka'
  | 'teknoloji'
  | 'bilim'
  | 'ekonomi'
  | 'perspektif'
  | 'gunluk-bulten';

export interface CategoryInfo {
  slug: CategorySlug;
  title: Record<Locale, string>;
  shortTitle: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'dunya',
    title: {
      tr: 'Dünya & Gündem',
      en: 'World & Today',
    },
    shortTitle: {
      tr: 'Dünya',
      en: 'World',
    },
    description: {
      tr: 'Dünyanın farklı ülkelerinde yapay zekâ politikaları, yasal düzenlemeler ve küresel gelişmeler.',
      en: 'Global AI policies, regulations, and developments unfolding simultaneously across different countries.',
    },
  },
  {
    slug: 'yapay-zeka',
    title: {
      tr: 'Yapay Zekâ & İnsan',
      en: 'AI & Humanity',
    },
    shortTitle: {
      tr: 'Yapay Zekâ',
      en: 'AI',
    },
    description: {
      tr: 'Yeni yapay zekâ modelleri ve sistemlerinin iletişimimizi, eğitimi, sanatı ve insanlığı nasıl dönüştürdüğü.',
      en: 'How new AI models and systems are reshaping human communication, learning, creativity, and everyday life.',
    },
  },
  {
    slug: 'teknoloji',
    title: {
      tr: 'Teknoloji & Dijital Yaşam',
      en: 'Tech & Digital Life',
    },
    shortTitle: {
      tr: 'Teknoloji',
      en: 'Technology',
    },
    description: {
      tr: 'Yapay zekâ araçları, çipler, veri merkezleri, robotik ve günlük hayata dokunan dijital yenilikler.',
      en: 'AI tools, chips, data centers, robotics, and digital innovations touching daily life.',
    },
  },
  {
    slug: 'bilim',
    title: {
      tr: 'Bilim & Keşif',
      en: 'Science & Discovery',
    },
    shortTitle: {
      tr: 'Bilim',
      en: 'Science',
    },
    description: {
      tr: 'Sağlıktan iklime, biyolojiden uzaya yapay zekâ destekli bilimsel keşifler ve temel araştırmalar.',
      en: 'AI-driven scientific breakthroughs and foundational research across health, climate, biology, and space.',
    },
  },
  {
    slug: 'ekonomi',
    title: {
      tr: 'Ekonomi & Toplum',
      en: 'Economy & Society',
    },
    shortTitle: {
      tr: 'Ekonomi',
      en: 'Economy',
    },
    description: {
      tr: 'Yapay zekâ yatırımlarının ve otomasyonun çalışma hayatına, mesleklere ve küresel ekonomiye etkisi.',
      en: 'How AI investments and automation affect work, livelihoods, industries, and the global economy.',
    },
  },
  {
    slug: 'perspektif',
    title: {
      tr: 'Anlam & Perspektif',
      en: 'Meaning & Perspective',
    },
    shortTitle: {
      tr: 'Perspektif',
      en: 'Perspective',
    },
    description: {
      tr: 'Yapay zekâ etiği, güvenlik, telif ve “bu gelişme neden önemli?” sorusuna yanıt arayan derinlikli yazılar.',
      en: 'Deep perspectives on AI ethics, safety, copyright, and why each technological shift matters for humanity.',
    },
  },
];

// Günlük bültenler (scripts/bot/bulten.mjs) bir haber bölümü değildir: menüde ve ana sayfa levhasında yer almaz,
// ama kendi arşiv sayfası (/tr/kategori/gunluk-bulten/, /en/category/bulletins/) ve doğru etiketi vardır.
export const BULLETIN_CATEGORY = 'gunluk-bulten' satisfies CategorySlug;
export const BULLETIN: CategoryInfo = {
  slug: BULLETIN_CATEGORY,
  title: {
    tr: 'Yapay Zekâ Bültenleri',
    en: 'AI Bulletins',
  },
  shortTitle: {
    tr: 'Bülten',
    en: 'Bulletin',
  },
  description: {
    tr: 'Günde üç kez (sabah, öğle, akşam) son bültenden bu yana yayımlanan haberlerin listesi.',
    en: 'Three times a day (morning, afternoon, evening): the stories published since the previous bulletin.',
  },
};

/** Menüdeki bölümler ve bülten arşivi: kategori sayfaları ve etiketler bunun üzerinden çözülür. */
export const ALL_CATEGORIES: CategoryInfo[] = [...CATEGORIES, BULLETIN];

export const SITE = {
  name: 'jendume',
  displayName: 'JEN DUME',
  url: 'https://jendume.com',
  localeTag: {
    tr: 'tr-TR',
    en: 'en-US',
  } satisfies Record<Locale, string>,
  tagline: {
    tr: 'kelimelerin ötesinde',
    en: 'Beyond Words',
  } satisfies Record<Locale, string>,
  description: {
    tr: 'JEN DUME — kelimelerin ötesinde. Dünyadan yapay zekâ, teknoloji, bilim ve ekonomi haberleri; sade ve anlaşılır bir dille.',
    en: 'JEN DUME — Beyond Words. AI, technology, science and economy news from around the world, explained clearly.',
  } satisfies Record<Locale, string>,
  ui: {
    tr: {
      home: 'Gündem',
      about: 'Hakkımızda',
      editorialStandards: 'Yayın İlkeleri',
      transparency: 'Şeffaflık',
      search: 'Ara',
      rss: 'RSS',
      allCategories: 'Kategoriler',
      leadBadge: 'Günün Odağı',
      breakingBadge: 'Önemli Gelişme',
      latestDispatch: 'Son Haberler',
      sectorMatrix: 'Bölümler',
      readReport: 'Haberi Oku',
      minRead: 'dk okuma',
      whyItMatters: 'Neden Önemli?',
      keyTakeaways: '3 Maddede Özet',
      regionLabel: 'Coğrafya / Odak',
      availableLangs: 'Dil',
      relatedStories: 'İlgili Haberler',
      backHome: 'Ana Sayfaya Dön',
      emptyCategory: 'Bu bölümde henüz haber bulunmuyor.',
      allStories: 'Tüm Haberler',
      langName: 'Türkçe',
      readIn: 'Bu haberi Türkçe oku',
      youAreHere: 'Buradasınız',
      skipToContent: 'İçeriğe atla',
      notFound: 'Bu kapı yok',
      notFoundText: 'Aradığınız sayfa taşınmış ya da kaldırılmış olabilir. Aşağıdaki levhalardan yolunuzu bulabilirsiniz.',
      productionLabel: 'Nasıl üretildi?',
      productionStory:
        'Bu haber, izlediğimiz yapay zekâ laboratuvarları, araştırma kurumları, resmî kurumlar ve teknoloji yayınlarının kaynak metinlerinden yapay zekâ yardımıyla otomatik olarak yazıldı. Rakamlar, adlar ve göreli zaman ifadeleri yayından önce otomatik olarak denetlendi; yayın öncesinde insan editör okuması yapılmadı.',
      productionBulletin:
        'Bu bülten, son bültenden bu yana yayımlanan haberlerden otomatik olarak derlendi.',
      productionLink: 'Yöntem ve düzeltme talepleri: Yayın İlkeleri',
      breadcrumb: 'Konum',
      page: 'Sayfa',
      pagination: 'Sayfalar',
      prevPage: 'Önceki sayfa',
      nextPage: 'Sonraki sayfa',
      share: 'Paylaş',
      shareOn: 'Şurada paylaş:',
      copyLink: 'Bağlantıyı kopyala',
      copied: 'Bağlantı kopyalandı',
      topics: 'Konular',
      topic: 'Konu',
      topicsDesc: 'Haberlerde sık geçen yapay zekâ şirketleri, modelleri ve asistanları; her konunun haberleri tek sayfada.',
      topicCompanies: 'Şirketler ve Laboratuvarlar',
      topicModels: 'Modeller ve Asistanlar',
      topicsInStory: 'Bu Haberdeki Konular',
      topicStories: 'Haberler',
      glossary: 'Sözlük',
      glossaryDesc: 'Yapay zekâ haberlerinde geçen temel kavramların sade ve kısa açıklamaları: büyük dil modelinden RAG’e, token’dan halüsinasyona.',
      relatedTerms: 'İlgili Terimler',
      termStories: 'Bu Terimin Geçtiği Haberler',
      allTerms: 'Tüm Terimler',
      glossaryNote:
        'Sözlük tanımları JEN DUME tarafından yapay zekâ yardımıyla hazırlandı; yalnız yerleşik, kalıcı bilgileri içerir. Hata bildirimi ve düzeltme talepleri:',
      topicNote:
        'Bu sayfa, adı geçen konuyu içeren haberleri otomatik olarak toplar; giriş metni yalnız yerleşik bilgileri içerir. Düzeltme talepleri:',
      storyUnit: 'haber',
      privacy: 'Gizlilik',
    },
    en: {
      home: 'Today',
      about: 'About Us',
      editorialStandards: 'Editorial Standards',
      transparency: 'Transparency',
      search: 'Search',
      rss: 'RSS',
      allCategories: 'Sections',
      leadBadge: 'In Focus',
      breakingBadge: 'Key Development',
      latestDispatch: 'Latest Stories',
      sectorMatrix: 'Sections',
      readReport: 'Read Story',
      minRead: 'min read',
      whyItMatters: 'Why It Matters',
      keyTakeaways: 'Key Takeaways',
      regionLabel: 'Region / Focus',
      availableLangs: 'Language',
      relatedStories: 'Related Stories',
      backHome: 'Back to Home',
      emptyCategory: 'No stories published in this section yet.',
      allStories: 'All Stories',
      langName: 'English',
      readIn: 'Read this story in English',
      youAreHere: 'You are here',
      skipToContent: 'Skip to content',
      notFound: 'This gate does not exist',
      notFoundText: 'The page you are looking for may have moved or been removed. The signs below will help you find your way.',
      productionLabel: 'How this was made',
      productionStory:
        'This story was written automatically with AI assistance from the source texts of AI labs, research institutions, official bodies and technology publications we monitor. Numbers, names and relative time references were checked automatically before publication; no human editor reviewed it before it went live.',
      productionBulletin:
        'This bulletin was compiled automatically from the stories published since the previous bulletin.',
      productionLink: 'Methods and corrections: Editorial Standards',
      breadcrumb: 'Breadcrumb',
      page: 'Page',
      pagination: 'Pages',
      prevPage: 'Previous page',
      nextPage: 'Next page',
      share: 'Share',
      shareOn: 'Share on',
      copyLink: 'Copy link',
      copied: 'Link copied',
      topics: 'Topics',
      topic: 'Topic',
      topicsDesc: 'The AI companies, models and assistants that come up most often in our stories, each with its own page of coverage.',
      topicCompanies: 'Companies and Labs',
      topicModels: 'Models and Assistants',
      topicsInStory: 'Topics in This Story',
      topicStories: 'Stories',
      glossary: 'Glossary',
      glossaryDesc: 'Plain-language explanations of the core ideas behind AI news, from large language models and RAG to tokens and hallucinations.',
      relatedTerms: 'Related Terms',
      termStories: 'Stories Using This Term',
      allTerms: 'All Terms',
      glossaryNote:
        'Glossary entries were prepared by JEN DUME with AI assistance and stick to settled, long-lived facts. To report an error or request a correction:',
      topicNote:
        'This page gathers every story that mentions the topic automatically; the introduction sticks to settled facts. Corrections:',
      storyUnit: 'stories',
      privacy: 'Privacy',
    },
  } satisfies Record<Locale, Record<string, string>>,
};

export function getCategory(slug: string, lang: Locale = 'tr') {
  const found = ALL_CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[0];
  return {
    code: ALL_CATEGORIES.indexOf(found) + 1,
    slug: found.slug,
    title: found.title[lang],
    shortTitle: found.shortTitle[lang],
    description: found.description[lang],
  };
}

/** Yayın ilkeleri sayfası: İngilizcesi /en/editorial-standards/, Türkçesi /tr/yayin-ilkeleri/. */
export function editorialUrl(lang: Locale): string {
  return lang === 'en' ? '/en/editorial-standards/' : `/${lang}/yayin-ilkeleri/`;
}

export function formatDate(date: Date, lang: Locale = 'tr'): string {
  return new Intl.DateTimeFormat(SITE.localeTag[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Istanbul',
  }).format(date);
}

export function formatTodayHeader(lang: Locale = 'tr'): string {
  return new Intl.DateTimeFormat(SITE.localeTag[lang], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Istanbul',
  }).format(new Date());
}

export function readingMinutes(text: string): number {
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
