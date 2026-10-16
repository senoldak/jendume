// Konu sayfaları: haberlerde sık geçen şirketler ve model aileleri (TR /tr/konu/<slug>/, EN /en/topic/<slug>/).
// Bir konunun sayfası yalnız o dilde en az KONU_EN_AZ haberi varsa üretilir; hreflang yalnız iki dilde de sayfa
// varsa verilir. Eşleşme büyük/küçük harfe DUYARLIDIR ("Meta" şirket, "meta" değil) ve sözcük sınırı arar;
// Türkçe ekler (OpenAI'ın, Claude'un) eşleşir. Bültenler (gunluk-bulten) konu sayfalarına girmez.
//
// Giriş metinleri kalıcı, doğrulanabilir olgularla sınırlıdır: kuruluş yılı, merkez, bilinen ürünler. Değişken bilgi
// (değerleme, pazar payı, en yeni sürüm, çalışan sayısı) yazılmaz; şirket övgüsü ya da yergisi yoktur.
import { BULLETIN_CATEGORY, type Locale } from './site.ts';

export const KONU_EN_AZ = 3;

export interface Konu {
  slug: string;
  ad: string;
  tur: 'sirket' | 'model';
  /** Büyük/küçük harf duyarlı anahtar sözcükler; sol ve sağda harf/rakam olmamalı (Türkçe ek kesme işaretinden sonra gelir). */
  anahtarlar: string[];
  /** Tam sözcük gerekmeyen önek kalıpları (ör. "GPT-" → GPT-4, GPT-5). */
  onekler?: string[];
  /** Konuyla ilgisiz eş adlı kullanımlar; eşleşmeden önce metinden çıkarılır (ör. "Amazon ormanları"). */
  haric?: string[];
  giris: Record<Locale, string>;
  /** İlgili konular (ör. model → geliştiren şirket). */
  ilgili?: string[];
}

export const KONULAR: Konu[] = [
  {
    slug: 'openai',
    ad: 'OpenAI',
    tur: 'sirket',
    anahtarlar: ['OpenAI'],
    giris: {
      tr: 'OpenAI, 2015’te San Francisco’da kurulan bir yapay zekâ araştırma ve ürün şirketidir. GPT model ailesi, ChatGPT sohbet asistanı ve görsel üretim modelleriyle tanınır. Bu sayfada OpenAI’ın adının geçtiği JEN DUME haberleri en yeniden eskiye sıralanır.',
      en: 'OpenAI is an AI research and product company founded in San Francisco in 2015. It is known for the GPT family of models, the ChatGPT assistant and its image-generation models. This page collects every JEN DUME story that mentions OpenAI, newest first.',
    },
    ilgili: ['chatgpt', 'gpt', 'microsoft'],
  },
  {
    slug: 'anthropic',
    ad: 'Anthropic',
    tur: 'sirket',
    anahtarlar: ['Anthropic'],
    giris: {
      tr: 'Anthropic, 2021’de kurulan ve merkezi San Francisco’da bulunan bir yapay zekâ güvenliği ve araştırma şirketidir. Claude model ailesini ve Claude asistanını geliştirir. Bu sayfada Anthropic’in adının geçtiği JEN DUME haberleri yer alır.',
      en: 'Anthropic is an AI safety and research company founded in 2021 and based in San Francisco. It develops the Claude family of models and the Claude assistant. This page gathers the JEN DUME stories that mention Anthropic.',
    },
    ilgili: ['claude'],
  },
  {
    slug: 'google-deepmind',
    ad: 'Google DeepMind',
    tur: 'sirket',
    anahtarlar: ['DeepMind'],
    giris: {
      tr: 'Google DeepMind, Google’ın yapay zekâ araştırma laboratuvarıdır; 2023’te DeepMind ile Google Brain ekiplerinin birleşmesiyle bugünkü adını aldı. AlphaGo ve protein yapısı tahmin eden AlphaFold gibi çalışmalarla bilinir ve Gemini modellerini geliştirir.',
      en: 'Google DeepMind is Google’s AI research lab, formed under its current name in 2023 when DeepMind and the Google Brain team merged. It is known for work such as AlphaGo and the protein-structure predictor AlphaFold, and it develops the Gemini models.',
    },
    ilgili: ['google', 'gemini'],
  },
  {
    slug: 'google',
    ad: 'Google',
    tur: 'sirket',
    anahtarlar: ['Google'],
    giris: {
      tr: 'Google, arama motoru, Android, YouTube ve bulut hizmetleriyle bilinen ABD’li teknoloji şirketidir; Alphabet çatısı altında faaliyet gösterir. Yapay zekâ alanında Gemini modelleri, kendi tasarladığı TPU çipleri ve Google DeepMind laboratuvarıyla öne çıkar.',
      en: 'Google is the US technology company behind Search, Android, YouTube and Google Cloud, operating under its parent Alphabet. In AI it is known for the Gemini models, its own TPU chips and the Google DeepMind research lab.',
    },
    ilgili: ['google-deepmind', 'gemini', 'gemma'],
  },
  {
    slug: 'meta',
    ad: 'Meta',
    tur: 'sirket',
    anahtarlar: ['Meta'],
    giris: {
      tr: 'Meta, Facebook, Instagram ve WhatsApp’ın sahibi olan ABD’li teknoloji şirketidir. Yapay zekâ alanında, ağırlıkları indirilebilen Llama model ailesiyle ve ürünlerine yerleştirdiği Meta AI asistanıyla tanınır.',
      en: 'Meta is the US technology company that owns Facebook, Instagram and WhatsApp. In AI it is known for the Llama family of downloadable open-weight models and for the Meta AI assistant built into its apps.',
    },
    ilgili: ['llama'],
  },
  {
    slug: 'mistral-ai',
    ad: 'Mistral AI',
    tur: 'sirket',
    anahtarlar: ['Mistral AI', 'Mistral'],
    giris: {
      tr: 'Mistral AI, 2023’te Paris’te kurulan bir yapay zekâ şirketidir. Bir kısmının ağırlıkları açık olarak yayımlanan dil modelleri ve Le Chat asistanıyla tanınır; Avrupa’nın öne çıkan yapay zekâ girişimleri arasında anılır.',
      en: 'Mistral AI is an AI company founded in Paris in 2023. It is known for language models, several of them released with open weights, and for its Le Chat assistant, and it is often cited among Europe’s leading AI start-ups.',
    },
  },
  {
    slug: 'nvidia',
    ad: 'Nvidia',
    tur: 'sirket',
    anahtarlar: ['Nvidia', 'NVIDIA'],
    giris: {
      tr: 'Nvidia, merkezi Kaliforniya’da bulunan ABD’li çip şirketidir. Grafik işlem birimleri (GPU) ve CUDA yazılım platformu, büyük yapay zekâ modellerinin eğitiminde ve çalıştırılmasında yaygın olarak kullanılır.',
      en: 'Nvidia is a US chipmaker headquartered in California. Its graphics processing units (GPUs) and the CUDA software platform are widely used to train and run large AI models.',
    },
  },
  {
    slug: 'microsoft',
    ad: 'Microsoft',
    tur: 'sirket',
    anahtarlar: ['Microsoft'],
    giris: {
      tr: 'Microsoft, Windows, Office ve Azure bulut hizmetleriyle bilinen ABD’li yazılım şirketidir. Yapay zekâ alanında Copilot asistanları, Azure üzerindeki yapay zekâ altyapısı ve OpenAI ile uzun süreli ortaklığıyla gündeme gelir.',
      en: 'Microsoft is the US software company behind Windows, Office and the Azure cloud. In AI it is known for its Copilot assistants, the AI infrastructure it runs on Azure and its long-running partnership with OpenAI.',
    },
    ilgili: ['copilot', 'openai'],
  },
  {
    slug: 'apple',
    ad: 'Apple',
    tur: 'sirket',
    anahtarlar: ['Apple'],
    giris: {
      tr: 'Apple, iPhone, Mac ve iPad’in üreticisi ABD’li teknoloji şirketidir. Yapay zekâ özelliklerini 2024’te tanıttığı Apple Intelligence adı altında toplar ve bu özelliklerin önemli bir kısmını doğrudan cihaz üzerinde çalıştırır.',
      en: 'Apple is the US technology company behind the iPhone, Mac and iPad. It groups its AI features under Apple Intelligence, introduced in 2024, and runs a large share of them directly on the device.',
    },
  },
  {
    slug: 'amazon',
    ad: 'Amazon',
    tur: 'sirket',
    anahtarlar: ['Amazon', 'AWS'],
    haric: ['Amazon orman', 'Amazon yağmur', 'Amazon havza', 'Amazon Nehri', 'Amazon rainforest', 'Amazon basin', 'Amazon River'],
    giris: {
      tr: 'Amazon, e-ticaret ve Amazon Web Services (AWS) bulut hizmetleriyle bilinen ABD’li teknoloji şirketidir. Yapay zekâ alanında AWS üzerindeki model ve çip altyapısı, Alexa sesli asistanı ve Anthropic’e yaptığı yatırımla gündeme gelir.',
      en: 'Amazon is the US technology company known for e-commerce and its Amazon Web Services (AWS) cloud. In AI it features through the model and chip infrastructure on AWS, the Alexa voice assistant and its investment in Anthropic.',
    },
  },
  {
    slug: 'alibaba',
    ad: 'Alibaba',
    tur: 'sirket',
    anahtarlar: ['Alibaba'],
    giris: {
      tr: 'Alibaba, merkezi Hangzhou’da bulunan Çinli e-ticaret ve bulut şirketidir. Bulut birimi Alibaba Cloud, bir kısmı açık ağırlıklı olarak yayımlanan Qwen dil modeli ailesini geliştirir.',
      en: 'Alibaba is a Chinese e-commerce and cloud company based in Hangzhou. Its cloud arm, Alibaba Cloud, develops the Qwen family of language models, many of which are released with open weights.',
    },
    ilgili: ['qwen'],
  },
  {
    slug: 'deepseek',
    ad: 'DeepSeek',
    tur: 'sirket',
    anahtarlar: ['DeepSeek'],
    giris: {
      tr: 'DeepSeek, Hangzhou merkezli Çinli bir yapay zekâ şirketidir. Ağırlıkları açık olarak yayımladığı dil ve akıl yürütme modelleriyle tanınır.',
      en: 'DeepSeek is a Chinese AI company based in Hangzhou. It is known for language and reasoning models released with open weights.',
    },
  },
  {
    slug: 'xai',
    ad: 'xAI',
    tur: 'sirket',
    anahtarlar: ['xAI'],
    giris: {
      tr: 'xAI, Elon Musk’ın 2023’te kurduğu yapay zekâ şirketidir. Grok sohbet asistanını ve Grok model ailesini geliştirir.',
      en: 'xAI is the AI company Elon Musk founded in 2023. It develops the Grok assistant and the Grok family of models.',
    },
    ilgili: ['grok'],
  },
  {
    slug: 'hugging-face',
    ad: 'Hugging Face',
    tur: 'sirket',
    anahtarlar: ['Hugging Face'],
    giris: {
      tr: 'Hugging Face, açık yapay zekâ modellerinin, veri kümelerinin ve tanıtım uygulamalarının paylaşıldığı bir platform ve bu platformu işleten şirkettir. Transformers gibi yaygın açık kaynak kütüphaneleri de geliştirir.',
      en: 'Hugging Face is a platform where open AI models, datasets and demo apps are shared, and the company that runs it. It also maintains widely used open-source libraries such as Transformers.',
    },
  },
  {
    slug: 'intel',
    ad: 'Intel',
    tur: 'sirket',
    anahtarlar: ['Intel'],
    giris: {
      tr: 'Intel, bilgisayar işlemcileri ve çip üretimiyle bilinen ABD’li yarı iletken şirketidir. Yapay zekâ alanında veri merkezi işlemcileri, yapay zekâ hızlandırıcıları ve çip üretim kapasitesiyle gündeme gelir.',
      en: 'Intel is a US semiconductor company known for computer processors and chip manufacturing. In AI it features through its data-centre processors, AI accelerators and chipmaking capacity.',
    },
  },
  {
    slug: 'amd',
    ad: 'AMD',
    tur: 'sirket',
    anahtarlar: ['AMD'],
    giris: {
      tr: 'AMD, işlemci ve grafik çipleri tasarlayan ABD’li yarı iletken şirketidir. Yapay zekâ alanında veri merkezleri için geliştirdiği Instinct hızlandırıcıları ve ROCm yazılım platformuyla gündeme gelir.',
      en: 'AMD is a US semiconductor company that designs processors and graphics chips. In AI it features through its Instinct accelerators for data centres and the ROCm software platform.',
    },
  },
  {
    slug: 'samsung',
    ad: 'Samsung',
    tur: 'sirket',
    anahtarlar: ['Samsung'],
    giris: {
      tr: 'Samsung, Güney Kore merkezli elektronik ve yarı iletken şirketidir. Yapay zekâ alanında hem Galaxy cihazlarındaki yapay zekâ özellikleriyle hem de yapay zekâ çiplerinde kullanılan bellek üretimiyle gündeme gelir.',
      en: 'Samsung is a South Korean electronics and semiconductor company. In AI it features both through the AI features on its Galaxy devices and through the memory chips used in AI hardware.',
    },
  },
  {
    slug: 'ibm',
    ad: 'IBM',
    tur: 'sirket',
    anahtarlar: ['IBM'],
    giris: {
      tr: 'IBM, kurumsal yazılım, danışmanlık ve donanım alanlarında çalışan köklü ABD’li teknoloji şirketidir. Yapay zekâ alanında kurumlara yönelik watsonx platformu ve Granite modelleriyle, ayrıca kuantum bilgisayar araştırmalarıyla gündeme gelir.',
      en: 'IBM is a long-established US technology company working in enterprise software, consulting and hardware. In AI it features through its watsonx platform and Granite models for businesses, as well as its quantum computing research.',
    },
  },
  {
    slug: 'chatgpt',
    ad: 'ChatGPT',
    tur: 'model',
    anahtarlar: ['ChatGPT'],
    giris: {
      tr: 'ChatGPT, OpenAI’ın Kasım 2022’de kullanıma açtığı sohbet asistanıdır. OpenAI’ın GPT modelleri üzerinde çalışır; üretken yapay zekânın geniş kitlelere ulaşmasında belirleyici rol oynadı.',
      en: 'ChatGPT is the conversational assistant OpenAI launched in November 2022. It runs on OpenAI’s GPT models and played a defining role in bringing generative AI to a mass audience.',
    },
    ilgili: ['openai', 'gpt'],
  },
  {
    slug: 'gpt',
    ad: 'GPT',
    tur: 'model',
    anahtarlar: [],
    onekler: ['GPT-'],
    giris: {
      tr: 'GPT (Generative Pre-trained Transformer), OpenAI’ın büyük dil modeli ailesidir. Sürümler GPT-4, GPT-5 gibi numaralarla anılır; ChatGPT ve OpenAI’ın geliştirici hizmetleri bu modeller üzerinde çalışır.',
      en: 'GPT (Generative Pre-trained Transformer) is OpenAI’s family of large language models. Versions are referred to by number, such as GPT-4 and GPT-5, and they power ChatGPT and OpenAI’s developer services.',
    },
    ilgili: ['openai', 'chatgpt'],
  },
  {
    slug: 'claude',
    ad: 'Claude',
    tur: 'model',
    anahtarlar: ['Claude'],
    haric: ['Claude Shannon', 'Claude Monet', 'Claude Debussy'],
    giris: {
      tr: 'Claude, Anthropic’in geliştirdiği büyük dil modeli ailesi ve aynı adı taşıyan yapay zekâ asistanıdır. İlk sürümü 2023’te yayımlandı; yazma, analiz ve yazılım geliştirme gibi işlerde kullanılır.',
      en: 'Claude is the family of large language models developed by Anthropic, and the AI assistant of the same name. It was first released in 2023 and is used for tasks such as writing, analysis and software development.',
    },
    ilgili: ['anthropic'],
  },
  {
    slug: 'gemini',
    ad: 'Gemini',
    tur: 'model',
    anahtarlar: ['Gemini'],
    giris: {
      tr: 'Gemini, Google’ın Aralık 2023’te tanıttığı çok kipli yapay zekâ model ailesidir; Google’ın sohbet asistanı da 2024’ten beri bu adı taşır. Modeller Google DeepMind tarafından geliştirilir ve Google ürünlerine yerleştirilir.',
      en: 'Gemini is the multimodal model family Google introduced in December 2023; Google’s chat assistant has also carried the name since 2024. The models are developed by Google DeepMind and built into Google’s products.',
    },
    ilgili: ['google', 'google-deepmind'],
  },
  {
    slug: 'gemma',
    ad: 'Gemma',
    tur: 'model',
    anahtarlar: ['Gemma'],
    giris: {
      tr: 'Gemma, Google’ın 2024’ten bu yana yayımladığı, ağırlıkları indirilebilen hafif model ailesidir. Gemini çalışmalarında kullanılan araştırma ve teknolojiye dayanır; geliştiricilerin kendi donanımlarında çalıştırabilmesi için tasarlanmıştır.',
      en: 'Gemma is a family of lightweight, downloadable open-weight models that Google has released since 2024. It draws on the research and technology behind Gemini and is designed to run on developers’ own hardware.',
    },
    ilgili: ['google', 'gemini'],
  },
  {
    slug: 'llama',
    ad: 'Llama',
    tur: 'model',
    anahtarlar: ['Llama'],
    giris: {
      tr: 'Llama, Meta’nın 2023’ten bu yana yayımladığı büyük dil modeli ailesidir. Ağırlıklarının indirilebilmesi sayesinde araştırmacılar ve şirketler tarafından yaygın biçimde uyarlanır.',
      en: 'Llama is the family of large language models Meta has released since 2023. Because its weights can be downloaded, it is widely adapted by researchers and companies.',
    },
    ilgili: ['meta'],
  },
  {
    slug: 'grok',
    ad: 'Grok',
    tur: 'model',
    anahtarlar: ['Grok'],
    giris: {
      tr: 'Grok, xAI’ın geliştirdiği sohbet asistanı ve model ailesidir. 2023’te tanıtıldı ve X sosyal ağıyla bütünleşik olarak sunulur.',
      en: 'Grok is the assistant and model family developed by xAI. It was introduced in 2023 and is offered in close integration with the social network X.',
    },
    ilgili: ['xai'],
  },
  {
    slug: 'copilot',
    ad: 'Copilot',
    tur: 'model',
    anahtarlar: ['Copilot'],
    giris: {
      tr: 'Copilot, Microsoft’un yapay zekâ asistanlarının ortak adıdır; Windows, Office uygulamaları ve Edge gibi ürünlerde yer alır. GitHub Copilot ise yazılımcılara kod önerileri sunan ayrı bir üründür.',
      en: 'Copilot is the umbrella name for Microsoft’s AI assistants, found in products such as Windows, the Office apps and Edge. GitHub Copilot is a separate product that suggests code to developers.',
    },
    ilgili: ['microsoft'],
  },
  {
    slug: 'qwen',
    ad: 'Qwen',
    tur: 'model',
    anahtarlar: ['Qwen'],
    giris: {
      tr: 'Qwen, Alibaba Cloud’un geliştirdiği büyük dil modeli ailesidir. Pek çok sürümü açık ağırlıklı olarak yayımlanır ve dünya genelinde geliştiriciler tarafından uyarlanır.',
      en: 'Qwen is the family of large language models developed by Alibaba Cloud. Many versions are released with open weights and adapted by developers around the world.',
    },
    ilgili: ['alibaba'],
  },
];

const kacis = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const KALIPLAR = new Map(
  KONULAR.map((k) => [
    k.slug,
    [
      ...k.anahtarlar.map((a) => new RegExp(`(?<![\\p{L}\\p{N}])${kacis(a)}(?![\\p{L}\\p{N}])`, 'u')),
      ...(k.onekler ?? []).map((o) => new RegExp(`(?<![\\p{L}\\p{N}])${kacis(o)}[\\p{N}\\p{L}]`, 'u')),
    ],
  ]),
);

export interface KonuAday {
  id: string;
  body?: string;
  data: { title: string; description: string; category: string; key_points?: string[] };
}

/** Haberin başlık, özet, maddeler ve gövdesinde geçen konuların slug'ları (KONULAR sırasıyla). */
export function haberKonulari(post: KonuAday): string[] {
  if (post.data.category === BULLETIN_CATEGORY) return [];
  const metin = [post.data.title, post.data.description, ...(post.data.key_points ?? []), post.body ?? ''].join('\n');
  return KONULAR.filter((k) => {
    let m = metin;
    for (const h of k.haric ?? []) m = m.split(h).join(' ');
    return KALIPLAR.get(k.slug)!.some((r) => r.test(m));
  }).map((k) => k.slug);
}

/** Konu → o konudaki haberler (gelen sırayla). Yalnız en az `enAz` haberi olan konular döner. */
export function konuHaberleri<T extends KonuAday>(posts: T[], enAz = KONU_EN_AZ): Map<string, T[]> {
  const harita = new Map<string, T[]>();
  for (const p of posts) {
    for (const s of haberKonulari(p)) {
      if (!harita.has(s)) harita.set(s, []);
      harita.get(s)!.push(p);
    }
  }
  return new Map(KONULAR.filter((k) => (harita.get(k.slug)?.length ?? 0) >= enAz).map((k) => [k.slug, harita.get(k.slug)!]));
}

export const konuBul = (slug: string) => KONULAR.find((k) => k.slug === slug);
