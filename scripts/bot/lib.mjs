// JEN DUME — kelimelerin ötesinde
// İki dilli (TR, EN) haber botu ortak yardımcıları.
import { mkdir, readFile, readdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { kullanimEkle, hataEkle, amacBul } from './kullanim.mjs';

export const USER_AGENT = 'jendume-bot/1.0 (+https://github.com/senoldak/jendume)';

export const KATEGORILER = [
  'dunya',
  'yapay-zeka',
  'teknoloji',
  'bilim',
  'ekonomi',
  'perspektif',
];

export const DILLER = ['tr', 'en'];

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function hentTekst(url, headers = {}) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(`Geçersiz protokol: ${parsed.protocol}`);
  }
  const hostname = parsed.hostname.toLowerCase();
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname === '169.254.169.254' ||
    hostname.endsWith('.internal') ||
    hostname.endsWith('.local')
  ) {
    throw new Error(`Yasaklı sunucu adresi: ${hostname}`);
  }
  const ipMatch = hostname.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (ipMatch) {
    const b1 = Number(ipMatch[1]);
    const b2 = Number(ipMatch[2]);
    if (
      b1 === 0 ||
      b1 === 10 ||
      b1 === 127 ||
      (b1 === 169 && b2 === 254) ||
      (b1 === 192 && b2 === 168) ||
      (b1 === 172 && b2 >= 16 && b2 <= 31)
    ) {
      throw new Error(`Yasaklı özel IP adresi: ${hostname}`);
    }
  }

  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 jendume-bot/1.0',
      Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
      ...headers,
    },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return res.text();
}

export function varlikCoz(s = '') {
  const adli = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    shy: '',
    laquo: '«',
    raquo: '»',
    ndash: '–',
    mdash: '—',
    hellip: '…',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    euro: '€',
    ccedil: 'ç',
    Ccedil: 'Ç',
    ouml: 'ö',
    Ouml: 'Ö',
    uuml: 'ü',
    Uuml: 'Ü',
  };
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => adli[n] ?? adli[n.toLowerCase()] ?? m);
}

export function htmlMetin(html = '') {
  return varlikCoz(
    html
      .replace(/<(script|style|figure|figcaption|iframe)[\s\S]*?<\/\1>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|h[1-6]|li|div|blockquote)>/gi, '\n\n')
      .replace(/<li[^>]*>/gi, '- ')
      .replace(/<[^>]+>/g, '')
  )
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function rssOku(xml) {
  const alan = (item, tag) => {
    const m = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
    return m ? varlikCoz(m[1]).trim() : '';
  };

  const items = [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)];
  if (items.length > 0) {
    return items.map(([item]) => ({
      guid: alan(item, 'guid'),
      title: alan(item, 'title'),
      link: alan(item, 'link'),
      description: alan(item, 'description'),
      icerik: alan(item, 'content:encoded') || alan(item, 'content'),
      pubDate: alan(item, 'pubDate') || alan(item, 'dc:date'),
    }));
  }

  const entries = [...xml.matchAll(/<entry[\s>][\s\S]*?<\/entry>/gi)];
  return entries.map(([item]) => {
    const linkMatch = item.match(/<link[^>]+href=["']([^"']+)["']/i);
    return {
      guid: alan(item, 'id'),
      title: alan(item, 'title'),
      link: linkMatch ? linkMatch[1] : alan(item, 'link'),
      description: alan(item, 'summary') || alan(item, 'content'),
      icerik: alan(item, 'content'),
      pubDate: alan(item, 'published') || alan(item, 'updated'),
    };
  });
}

export function slugify(s = '') {
  return String(s)
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '');
}

const GEMINI_ARALIK_MS = Number(process.env.GEMINI_ARALIK_MS || 4500);
// Google "meşgul" (5xx) ya da istek sınırı (429) dönerse ana ve yedek model sırayla, giderek uzayan aralıklarla
// denenir (iki model ayrı kapasite ve ayrı ücretsiz kotadır). Bir çağrı tümüyle düşerse aynı çalışmadaki sonraki
// çağrılar yalnız iki kez dener: Google uzun süre kapalıysa iş zaman aşımına düşmesin. İlk başarı bunu sıfırlar.
const GEMINI_BEKLEMELER_SN = [15, 30, 60, 90, 120];
let geminiKesik = false;
let sonGemini = 0;

// Katman 4 (Gemini kota planı): ücretsiz katmanda Flash günde 20 çağrı, Gemma 26B 14.400 (dakikada 16 bin token).
// Denemede (2026-10-17) Gemma denetim kararlarında Flash Lite kadar isabetliydi, puanlamada çok daha sıkıydı;
// bu yüzden yalnız evet/hayır denetimlerinde yedektir.
export const DENETIM_YEDEK_MODEL = 'gemma-4-26b-a4b-it';

// denetim: evet/hayır denetim çağrısı; yedek model Gemma olur (Katman 4, bkz. DENETIM_YEDEK_MODEL).
export async function gemini({ prompt, schema, dusunme: seviye = 'low', denetim = false }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const bekle = sonGemini + GEMINI_ARALIK_MS - Date.now();
  if (bekle > 0) await sleep(bekle);
  sonGemini = Date.now();
  const yedek = denetim
    ? process.env.GEMINI_DENETIM_YEDEK_MODEL || DENETIM_YEDEK_MODEL
    : process.env.GEMINI_YEDEK_MODEL || 'gemini-flash-latest';
  const modeller = [process.env.GEMINI_MODEL || 'gemini-flash-lite-latest', yedek];
  const carpan = Number(process.env.GEMINI_BEKLE_CARPAN ?? 1);
  const enFazla = geminiKesik ? 2 : GEMINI_BEKLEMELER_SN.length + 1;
  const amac = amacBul(); // Katman 0: çağıran dosya/fonksiyon

  let dusunme = { thinkingLevel: seviye };
  for (let deneme = 1; deneme <= enFazla; deneme++) {
    const model = modeller[(deneme - 1) % modeller.length];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.25,
          responseMimeType: 'application/json',
          responseSchema: schema,
          ...(dusunme && { thinkingConfig: dusunme }),
        },
      }),
      signal: AbortSignal.timeout(180_000),
    });
    if (res.status === 400 && dusunme && /thinking/i.test(await res.clone().text())) {
      dusunme = dusunme.thinkingLevel === 'low' ? null : { thinkingLevel: 'low' };
      deneme--;
      continue;
    }
    if (res.status === 429 || res.status >= 500) {
      hataEkle(model, amac, res.status);
      console.warn(`  Gemini ${res.status} (${model}), ${deneme}. deneme; bekleniyor...`);
      if (deneme < enFazla) await sleep(GEMINI_BEKLEMELER_SN[deneme - 1] * 1000 * carpan);
      continue;
    }
    if (!res.ok) {
      const raw = await res.text();
      const hata = new Error(`Gemini ${res.status}: ${raw.slice(0, 250)}`);
      hata.ayar = [400, 401, 403, 404].includes(res.status);
      throw hata;
    }
    geminiKesik = false;
    const data = await res.json();
    kullanimEkle(data.usageMetadata, { model, amac });
    const metin = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
    return JSON.parse(metin);
  }
  geminiKesik = true;
  throw new Error('Gemini: çok fazla deneme');
}

const yamlStr = (s) => JSON.stringify(String(s ?? '').trim());

export function guvenli(metin = '') {
  return String(metin)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?(?:[a-z0-9_-]+|\/)[^>]*>/gi, '')
    .replace(/!\[([^\]]*)\]\((?:[^()]|\([^()]*\))*\)/g, '$1')
    .replace(/\[([^\]]*)\]\(\s*((?:[^()\s]|\([^()\s]*\))*)[^)]*\)/g, (m, txt, url) =>
      /^https:\/\/[^\s"'<>]+$/i.test(url) ? `[${txt}](${url})` : txt
    );
}

export function tipografi(metin = '', { baslik = false } = {}) {
  let ut = String(metin)
    .split('\n')
    .map((s) => s.replace(/ {2,}/g, ' ').trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (baslik) ut = ut.replace(/\s*\.$/, '').replace(/\s+/g, ' ');
  return ut;
}

export async function sonHaberler(rot, gun = 10) {
  const sinir = Date.now() - gun * 86_400_000;
  const out = [];
  for (const dil of DILLER) {
    const base = path.join(rot, 'src/content/haberler', dil);
    for (const dosya of await readdir(base).catch(() => [])) {
      if (!dosya.endsWith('.md')) continue;
      let md;
      try {
        md = await readFile(path.join(base, dosya), 'utf8');
      } catch {
        continue;
      }
      const fm = md.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const al = (k) =>
        fm
          .match(new RegExp(`^${k}:\\s*(.*)$`, 'm'))?.[1]
          ?.replace(/^"(.*)"$/, '$1')
          .trim();
      const tarih = Date.parse(al('date') ?? '');
      if (!(tarih >= sinir)) continue;
      // Günlük bültenler haber değildir; bot onları yinelenen konu olarak görmesin.
      if (al('category') === 'gunluk-bulten') continue;
      out.push({
        lang: dil,
        slug: dosya.replace(/\.md$/, ''),
        date: new Date(tarih).toISOString(),
        title: al('title') ?? '',
        description: al('description') ?? '',
        bolge: al('bolge'),
      });
    }
  }
  return out;
}

/**
 * İki dilde (tr, en) aynı slug ile haber dosyalarını yazar:
 * src/content/haberler/{tr,en}/<slug>.md
 */
export async function ucDilliHaberYaz(rot, paket) {
  const category = KATEGORILER.includes(paket.category) ? paket.category : 'yapay-zeka';
  const dateIso = paket.date || new Date().toISOString();
  const baseSlug = slugify(paket.tr?.title || paket.en?.title || 'haber') || 'haber';

  const trDir = path.join(rot, 'src/content/haberler/tr');
  let slug = baseSlug;
  for (let i = 2; ; i++) {
    try {
      await access(path.join(trDir, `${slug}.md`));
      slug = `${baseSlug}-${i}`;
    } catch {
      break;
    }
  }

  for (const dil of DILLER) {
    const icerik = paket[dil];
    if (!icerik) continue;
    const title = tipografi(guvenli(icerik.title), { baslik: true });
    const description = tipografi(guvenli(icerik.description)).replace(/\s+/g, ' ');
    const body = tipografi(guvenli(icerik.body));
    const bolge = icerik.bolge || paket.bolge;
    const perspektif = icerik.perspektif || paket.perspektif;
    const why_matters = icerik.why_matters || paket.why_matters;
    const key_points = icerik.key_points || paket.key_points;

    const fm = [
      '---',
      `lang: ${dil}`,
      `title: ${yamlStr(title)}`,
      `description: ${yamlStr(description)}`,
      `category: ${category}`,
      `date: ${dateIso}`,
      bolge ? `bolge: ${yamlStr(guvenli(bolge))}` : null,
      perspektif ? `perspektif: ${yamlStr(guvenli(perspektif))}` : null,
      why_matters ? `why_matters: ${yamlStr(guvenli(why_matters))}` : null,
      Array.isArray(key_points) && key_points.filter(Boolean).length
        ? `key_points:\n${key_points.filter(Boolean).map((p) => `  - ${yamlStr(guvenli(p))}`).join('\n')}`
        : null,
      // Kaynakların şifreli kaydı (bkz. gizli.mjs); sitede gösterilmez.
      paket.kaynakIzi ? `kaynakIzi: ${yamlStr(paket.kaynakIzi)}` : null,
      `featured: ${Boolean(paket.featured)}`,
      `breaking: ${Boolean(paket.breaking)}`,
      `draft: ${Boolean(paket.draft)}`,
      '---',
    ].filter(Boolean);

    const langDir = path.join(rot, 'src/content/haberler', dil);
    await mkdir(langDir, { recursive: true });
    await writeFile(path.join(langDir, `${slug}.md`), `${fm.join('\n')}\n\n${body}\n`, 'utf8');
  }

  return slug;
}

export const yaziKaydet = ucDilliHaberYaz;

export async function jsonOku(dosya, yedek) {
  try {
    return JSON.parse(await readFile(dosya, 'utf8'));
  } catch {
    return yedek;
  }
}
