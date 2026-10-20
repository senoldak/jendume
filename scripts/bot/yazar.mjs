// JEN DUME — kelimelerin ötesinde
// İki dilli (TR, EN) yapay zekâ anlamlandırma ve haber yazarı.
import { gemini, KATEGORILER } from './lib.mjs';
import { ilgiliKisim, kelimeSayisi } from './denetci.mjs';
import { derlemeHedefi } from './havuz.mjs';

export const DIL_BLOK_SEMASI = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'En fazla 90 karakter, sade ve anlaşılır başlık. Okurun arayacağı anahtar sözcükle (şirket, model, ürün, kurum, kişi ya da konu adı) başlar ve olayı açıkça söyler. "Kurum: …" gibi iki noktalı etiketle açılmaz; "Bu…", "İşte…", "This…", "Here’s…" gibi belirsiz başlık olmaz; "Yapay zekâ" / "AI" ifadesiyle BAŞLAMAZ' },
    description: { type: 'string', description: '1-2 cümlelik akıcı ve anlaşılır özet / spot' },
    bolge: { type: 'string', description: 'Olayın geçtiği coğrafya veya odak (örn. Avrupa, ABD, Asya, Küresel, Türkiye)' },
    perspektif: { type: 'string', description: '1-2 cümleyle: Bu yapay zekâ gelişmesi neden önemli? İnsanların hayatını veya dünyayı nasıl etkiliyor?' },
    body: {
      type: 'string',
      description:
        'Markdown formatında 250-400 kelimelik (en az 200), 4-6 paragraflık, halka yakın ve anlaşılır haber metni. Sıra: ne oldu; neden önemli; temel rakamlar; bağlam. Yalnızca kaynaktaki olgular',
    },
    why_matters: { type: 'string', description: '1-2 cümleyle: Bu yapay zekâ gelişmesi neden önemli?' },
    key_points: { type: 'array', maxItems: 3, items: { type: 'string' }, description: 'Haberden en fazla 3 kritik somut madde / rakam' },
    rakamlar: {
      type: 'array',
      maxItems: 4,
      items: {
        type: 'object',
        properties: {
          etiket: { type: 'string', description: 'Kısa etiket, 1-3 kelime (örn. "Yatırım", "Parametre", "Test puanı")' },
          deger: { type: 'string', description: 'Rakam ve birimi (örn. "2 milyar dolar", "%87,5")' },
        },
        required: ['etiket', 'deger'],
      },
      description: 'Rakam şeridi (kural 8); en fazla 4, yalnızca kaynakta aynen geçen rakamlar. Emin değilsen boş bırak',
    },
  },
  required: ['title', 'description', 'bolge', 'perspektif', 'body'],
};

export const TASLAK_SEMASI = {
  type: 'object',
  properties: {
    ayniOlay: { type: 'boolean', description: 'Kaynakların hepsi aynı olayı mı anlatıyor?' },
    uygun: { type: 'boolean', description: 'Haber doğrudan yapay zekâ temasına ve JEN DUME felsefesine uygun mu?' },
    neden: { type: 'string', description: 'Uygun değilse veya aynı olay değilse kısa gerekçe' },
    category: { type: 'string', enum: KATEGORILER },
    breaking: { type: 'boolean', description: 'Yapay zekâ dünyasında çok önemli bir kırılma veya gelişme mi?' },
    tr: DIL_BLOK_SEMASI,
    en: DIL_BLOK_SEMASI,
  },
  required: ['ayniOlay', 'uygun', 'neden', 'category', 'breaking', 'tr', 'en'],
};

export const KAPSAM = `JEN DUME Felsefesi ("kelimelerin ötesinde") — Tema: Yapay Zekâ:
JEN DUME, yapay zekâ çağında dünyada neler olup bittiğini hem Türkçe hem İngilizce olarak sade, duru ve anlaşılır bir dille anlatan iki dilli bir yayındır. Amacımız yapay zekâ alanındaki gelişmeleri soğuk mühendislik jargonuna boğmadan herkes için anlaşılır kılmak ve her haberde "bu neden önemli?" sorusuna yanıt aramaktır.

Uygun konular (yalnızca yapay zekâ odaklı gelişmeler):
- Küresel yapay zekâ politikaları, ülkelerin yapay zekâ stratejileri, uluslararası anlaşmalar, kamu güvenliği ve yasal düzenlemeler ("dunya")
- Yeni yapay zekâ modelleri, otonom ajanlar ve yapay zekânın insan hayatına, eğitime, iletişime, sanata ve topluma etkisi ("yapay-zeka")
- Günlük hayata dokunan yapay zekâ araçları, yazılım mühendisliği, yapay zekâ çipleri, veri merkezleri ve insansı/otonom robotlar ("teknoloji")
- Yapay zekânın tıp, sağlık, biyoloji, iklim, doğa ve uzay araştırmalarındaki bilimsel keşifleri ile temel yapay zekâ araştırmaları ("bilim")
- Yapay zekâ yatırımları, şirket ortaklıkları, enerji/altyapı ekonomisi ve yapay zekânın iş gücüne, mesleklere ve ekonomiye etkisi ("ekonomi")
- Yapay zekâ etiği, hizalama ve güvenlik tartışmaları, telif hakları, bilgi doğruluğu, dil/kültür temsili ve derinlikli analizler ("perspektif")

Uygun olmayanlar (kesinlikle elenir, uygun=false verilir):
- Yapay zekâ ile doğrudan ilgisi olmayan genel dünya siyaseti, savaş, çatışma, seçim ve diplomasi haberleri
- Yapay zekâ içermeyen genel ekonomi, petrol/enerji fiyatları, borsa, otomobil, havacılık veya genel şirket haberleri
- Sıradan tüketici elektroniği, telefon/oyun/uygulama indirimleri, kupon ve reklam duyuruları, polis/adliye/magazin ve spor haberleri.`;

export const YAZIM_KURALLARI = `Yazım İlkeleri:
1. Halka yakın, sade, duru ve anlaşılır bir dil kullan. Karmaşık bir yapay zekâ, algoritma veya donanım kavramı geçiyorsa onu günlük hayattan anlaşılır bir dille açıkla; okuyucuyu teknik terimlere boğma.
2. Yalnızca kaynaklardaki gerçek ve doğrulanabilir olguları kullan; kaynakta olmayan hiçbir bilgi, rakam veya iddiayı uydurma.
3. Kaynak haber sitelerinin ve yayın kuruluşlarının (haber sitesi, ajans, dergi, blog) adını metin içinde kesinlikle anma; doğrudan olayı ve ilgili araştırma kurumunu, üniversiteyi veya şirketi anlat.
4. Her haberde "perspektif" alanında şu soruyu yanıtla: "Bu yapay zekâ gelişmesi neden önemli ve insanların hayatını nasıl etkiliyor?"
5. "bugün", "dün", "yarın", "bu hafta", "today", "yesterday", "this week" gibi göreli zaman ifadeleri yerine somut bağlam veya tarih kullan.
6. Başlık (her iki dilde) okurun arama motoruna yazacağı anahtar sözcükle başlar: olayın öznesi olan şirket, model, ürün, kurum ya da kişinin adı veya somut konu (örn. "OpenAI …", "Claude …", "AB Yapay Zekâ Yasası …", "Meme kanseri taraması …"). Başlık olayı açıkça söyler: kim, ne yaptı ya da ne oldu.
   - İki noktalı etiketle AÇILMAZ ve ilk beş sözcükte iki nokta üst üste (:) kullanılmaz: "OpenAI: Yeni model tanıtıldı", "Analiz: …", "Son dakika: …", "Open-Source AI Models: Freedom and Safety" yerine "OpenAI yeni modeli … tanıttı", "Open-source AI models pit openness against safety".
   - Belirsiz ya da merak tuzağı kuran başlık yazılmaz: "Bu…", "Şu…", "İşte…", "Şok…", "Neler oluyor?", "This…", "Here’s…", "You won’t believe…", "Everything you need to know…" gibi açılışlar ve dört sözcükten kısa başlıklar yasaktır.
   - "Yapay zekâ", "Yapay zeka", "AI" veya "Artificial intelligence" ile başlamaz; okur zaten bunun bir yapay zekâ yayını olduğunu biliyor. Örn. "Yapay zekâ mimarlık projelerini dakikalar içinde üretiyor" yerine "Mimarlık projeleri artık dakikalar içinde çiziliyor".
   - İngilizce başlık da aynı kurallara uyar ve aynı anahtar sözcükle başlar (örn. TR "Anthropic, Claude için …", EN "Anthropic gives Claude …").
7. Uzunluk ve yapı: her dilde gövde (body) 250-400 kelime olmalı; 200 kelimenin altındaki metin yayımlanmaz. Gövde şu sırayla ilerler:
   (a) ne oldu: kim, ne yaptı, ne zaman, nerede; (b) neden önemli: okur, sektör veya toplum için sonucu;
   (c) temel rakamlar: kaynaktaki tutar, oran, tarih ve ölçümler; (d) bağlam: önceki gelişmeler, rakipler, düzenleme veya araştırma geçmişi.
   Bu bölümlerin hepsi YALNIZCA kaynak metinlerdeki olgulardan kurulur. Uzunluğu doldurmak için tekrar, genel geçer yorum, tahmin
   veya kaynakta olmayan bağlam ekleme; kaynak 250 kelimelik bir haberi taşımıyorsa uygun=false ver ve nedenine "kaynak yetersiz" yaz.
8. Rakam şeridi (rakamlar): haberin başında gösterilen en fazla 4 kilit rakam ({etiket, deger}): yatırım tutarı, değerleme,
   parametre sayısı, test puanı, fiyat, kullanıcı sayısı gibi. Yalnızca kaynakta aynen geçen rakamlar; hesaplama, yuvarlama,
   tahmin yok. İki dilde aynı rakamlar aynı sırayla: TR'de Türkçe biçim ("2,5 milyar dolar", "%87,5"), EN'de İngilizce
   ("$2.5 billion", "87.5%"). Haberde anlamlı rakam yoksa ya da emin değilsen boş bırak; yalnız tarih şeride girmez.`;

export async function taslakYaz(kaynaklar) {
  const metinler = kaynaklar
    .map(
      (k, i) =>
        `### Kaynak ${i + 1} (${k.tarih})\nBaşlık: ${k.baslik}\n"""\n${k.metin.slice(0, 7000)}\n"""`
    )
    .join('\n\n');

  const prompt = `Sen JEN DUME ("kelimelerin ötesinde") yayınının editörüsün.
JEN DUME yalnızca YAPAY ZEKÂ (artificial intelligence) temalı haber ve analizler yayımlar. Görevin, yapay zekâ dünyasında neler olduğunu ve bunların insanlık için neden önemli olduğunu hem Türkçe (tr) hem İngilizce (en) olarak halka yakın, berrak ve anlamlı bir dille anlatmak.

Haber doğrudan yapay zekâ ile ilgili değilse uygun=false ver ve nedenini kısaca yaz.

${KAPSAM}

${YAZIM_KURALLARI}

${
  kaynaklar.length > 1
    ? `Aşağıda ${kaynaklar.length} kaynak metin bulunuyor. Önce hepsinin aynı olayı anlatıp anlatmadığını (ayniOlay) belirle.`
    : 'Aşağıda bir kaynak metin bulunuyor (ayniOlay=true ver).'
}

${metinler}`;

  return gemini({ prompt, schema: TASLAK_SEMASI });
}

export async function duzelt(taslak, kaynakMetni, sorunlar, ayrinti = '') {
  // Kaynak baştan kesilmez; iki dildeki taslakla örtüşen paragraflar seçilir.
  const taslakMetni = ['tr', 'en']
    .map((d) => [taslak[d]?.title, taslak[d]?.description, taslak[d]?.perspektif, taslak[d]?.body].filter(Boolean).join('\n'))
    .join('\n');
  const prompt = `Sen JEN DUME ("kelimelerin ötesinde") yayınının editörüsün.
Aşağıdaki iki dilli (TR/EN) yapay zekâ haber taslağında denetim sırasında sorunlar tespit edildi (aşağıda SORUNLAR).
Kaynak metne sıkı sıkıya bağlı kalarak bu sorunları düzelt:
- Kaynakta doğrulanamayan rakamları çıkar veya kaynaktaki gerçek rakamla değiştir.
- Geçen medya/haber kuruluşu (haber sitesi, ajans, dergi, blog) adlarını çıkar; doğrudan ilgili kurumu/şirketi yaz.
- Göreli zaman ifadelerini (bugün, dün, bu hafta, today, yesterday, this week vb.) kaldır.
- Kopya cümle uyarısı varsa olguları koruyarak cümleleri kendi kelimelerinle yeniden kur.
- Başlık uyarısı varsa başlığı kural 6'ya göre yeniden yaz: anahtar sözcükle (şirket, model, ürün, kurum, kişi, konu) başlat, iki noktalı etiketi ve belirsiz açılışı kaldır; olguları değiştirme.
- "Metin çok kısa" uyarısı varsa gövdeyi uyarıda yazan kelime aralığına genişlet: kaynakta geçen ama taslağa girmemiş olguları, rakamları ve bağlamı ekle
  (ne oldu, neden önemli, temel rakamlar, bağlam). Kaynakta olmayan hiçbir bilgi, rakam ya da yorum ekleme.

${YAZIM_KURALLARI}

SORUNLAR:
${sorunlar.map((s) => `- ${s}`).join('\n')}
${ayrinti ? `\nAYRINTI (sorunların tam yeri):\n${ayrinti}\n` : ''}

KAYNAKLAR:
${ilgiliKisim(kaynakMetni, taslakMetni, 12000)}

MEVCUT TASLAK (JSON):
${JSON.stringify(taslak, null, 2)}`;

  return gemini({ prompt, schema: TASLAK_SEMASI });
}

// Dilim derlemesi (havuz.mjs): aynı dilimde tek başına uzunluk denetimini geçemeyen kısa haberler, kategori aranmadan tek
// bir iki dilli yazıda toplanır; yazıda her kategori ara başlık olur. kaynak: havuz.mjs → derlemeKaynagi (her haber kendi
// bölümünde); grup kategoriye göre sıralı gelir (kategoriyeSirala), ara başlıklar bu sırayı izler.
const KATEGORI_ADLARI = {
  dunya: { tr: 'Dünya', en: 'World' },
  'yapay-zeka': { tr: 'Yapay Zekâ', en: 'AI' },
  teknoloji: { tr: 'Teknoloji', en: 'Technology' },
  bilim: { tr: 'Bilim', en: 'Science' },
  ekonomi: { tr: 'Ekonomi', en: 'Economy' },
  perspektif: { tr: 'Perspektif', en: 'Perspective' },
};
const kategoriAdi = (k, dil) => KATEGORI_ADLARI[k]?.[dil] ?? k ?? '';

// Haber numarası -> kategori adı (TR / EN) listesi: ara başlıklar ve her paragrafın kaynağı bundan okunur.
const haberKategorileri = (grup) => grup.map((o, i) => `${i + 1}. haber: tr "${kategoriAdi(o.kategori, 'tr')}", en "${kategoriAdi(o.kategori, 'en')}"`).join('\n');

// Derlemenin kategorisi: en çok haberi olan kategori; eşitlikte gruptaki ilk haberinki.
export function derlemeKategorisi(grup) {
  const sayi = new Map();
  for (const o of grup) sayi.set(o.kategori, (sayi.get(o.kategori) ?? 0) + 1);
  return grup.reduce((en, o) => (sayi.get(o.kategori) > sayi.get(en) ? o.kategori : en), grup[0]?.kategori ?? 'yapay-zeka');
}

export function derlemeIstemi(grup, kaynak) {
  const { alt, ust } = derlemeHedefi(grup.length);
  return `Sen JEN DUME ("kelimelerin ötesinde") yayınının editörüsün.
Aşağıda aynı zaman diliminden ${grup.length} kısa yapay zekâ haberi var; her biri tek başına tam bir haber taşıyacak kadar kaynak içermiyor.
Bunları hem Türkçe (tr) hem İngilizce (en) TEK bir derleme haberinde topla:
- title: dilimin öne çıkan konularını anlatan başlık; kural 6'ya uyar (anahtar sözcükle başlar, iki noktalı etiket yok). Tek bir haberi öne çıkarmaz. En fazla 70 karakter: sonuna ~22 karakterlik dilim eki eklenir; tarih ve saat yazma.
- description: derlemenin ana noktası, 1-2 cümle.
- body: Markdown, her dilde ${alt}-${ust} kelime. Her kategori için bir ara başlık ("## Kategori adı"; HABER KATEGORİLERİ'ndeki sırayla, tr gövdede tr adı, en gövdede en adı), altında o kategorideki her haber için TEK paragraf. Her paragraf 50-80 kelime (3-4 cümle): haberin öznesiyle (şirket, model, kurum, konu) başlar; ne olduğunu, ana rakamı ve kimin açıkladığını anlatır. Tek cümlelik özet yazma.
  Her paragraf YALNIZCA o haberin kendi bölümündeki kaynak olgularla yazılır; bir haberin kaynağında yetmeyen bilgi için başka haberin kaynağını kullanma, uydurma ve dolgu cümlesi ekleme.
- perspektif ve why_matters: bu gelişmelerin birlikte ne anlattığı.
- ayniOlay=true, uygun=true, breaking=false.

${YAZIM_KURALLARI}

HABER KATEGORİLERİ:
${haberKategorileri(grup)}

HABERLER:
${kaynak}`;
}

// Döner: iki dilli derleme taslağı ya da null. Kategori derlemeKategorisi'dir (model başka kategori seçse de).
export async function derlemeYaz(grup, kaynak) {
  const t = await gemini({ prompt: derlemeIstemi(grup, kaynak), schema: TASLAK_SEMASI });
  if (!t?.tr?.body || !t?.en?.body) return null;
  return { ...t, ayniOlay: true, uygun: true, breaking: false, category: derlemeKategorisi(grup) };
}

// Kısa kalan derlemeyi genişletir: başlık, ara başlıklar ve sıra korunur, her paragraf yalnız kendi haberinin kaynağıyla
// uzar. Tek haber düzeltmesinden (duzelt) farkı budur; o gövdeyi baştan kurabilir. Yalnız gövdeler (tr/en) değişir ve
// yalnız uzarsa alınır; başarısızsa taslak aynen döner. gemini: test için enjekte edilebilir.
export async function derlemeUzat(taslak, grup, kaynak, enAz, { kall = gemini } = {}) {
  const { alt, ust } = derlemeHedefi(grup.length);
  const kelime = (d) => kelimeSayisi(taslak[d]?.body);
  const r = await kall({
    schema: TASLAK_SEMASI,
    prompt: `Bu iki dilli derleme haberinin gövdeleri çok kısa: tr ${kelime('tr')} kelime, en ${kelime('en')} kelime; her dilde ${alt}-${ust} kelime olmalı (en az tr ${enAz.tr}, en ${enAz.en}). Her haber paragrafını 50-80 kelimeye (3-4 cümle) genişlet: ne olduğu, ana rakam, kimin açıkladığı, kaynaktaki bağlam.
Her paragrafı yalnızca HABERLER'de o haberin kendi bölümündeki bilgilerle genişlet; başka haberin kaynağını kullanma. Kaynakta olmayan bilgi, rakam, tahmin ya da yorum ekleme; aynı bilgiyi tekrar etme, dolgu cümlesi yazma. Ara başlıkları ("## ..."), paragraf sırasını, başlıkları ve spotları değiştirme; iki dilde aynı haberler aynı sırada olsun.

${YAZIM_KURALLARI}

HABER KATEGORİLERİ:
${haberKategorileri(grup)}

HABERLER:
${kaynak}

TASLAK (JSON):
${JSON.stringify({ tr: { title: taslak.tr?.title, description: taslak.tr?.description, body: taslak.tr?.body }, en: { title: taslak.en?.title, description: taslak.en?.description, body: taslak.en?.body } }, null, 2)}`,
  });
  const yeni = { ...taslak };
  for (const d of ['tr', 'en']) {
    const govde = r?.[d]?.body;
    if (govde && kelimeSayisi(govde) > kelime(d)) yeni[d] = { ...taslak[d], body: govde };
  }
  return yeni;
}

// Ön eleme ve haber değeri tek çağrıda: 0 = kapsam dışı, 1–100 = haber değeri.
// 2026-10-17 site sahibinin kararıyla ölçek 0–5'ten 0–100'e geçti ve eşik 3/5'ten 3,5/5'e, yani 70/100'e çıktı
// (tam sayılı 0–5'te 3,5 pratikte 4 olurdu). Amaç: sıradan haberle siteyi doldurmamak.
export const MIN_DEGER = 70;
export const OLCEK = 100;
const ELEME_SEMASI = {
  type: 'object',
  properties: {
    puanlar: {
      type: 'array',
      items: { type: 'object', properties: { nr: { type: 'integer' }, puan: { type: 'integer' } }, required: ['nr', 'puan'] },
    },
  },
  required: ['puanlar'],
};

/**
 * Her başlığa puan verir (0 kapsam dışı, 1–100 haber değeri). Döner: indeksle hizalı puan dizisi; modelin atladığı
 * (puanlamadığı) başlık null olur: emin değilsek yayımlamayız (standartlar Faz 0, fail-closed). Gemini cevap vermezse null.
 */
export async function onEle(basliklar, { kall = gemini } = {}) {
  if (!basliklar.length) return [];
  const r = await kall({
    schema: ELEME_SEMASI,
    dusunme: 'minimal',
    prompt: `Sen JEN DUME ("kelimelerin ötesinde") yapay zekâ yayınının editörüsün. Aşağıdaki her başlığa 0–100 arası bir puan ver.
Kapsam YALNIZCA yapay zekâdır (modeller, ajanlar, yapay zekâ çipleri/altyapısı, robotik, bilimde/toplumda/ekonomide yapay zekâ, yapay zekâ etiği ve düzenlemeleri). Yapay zekâ ile ilgisi olmayan genel siyaset, savaş, spor veya sıradan tüketici haberleri 0 alır.

${KAPSAM}

Puanlar:
0 = kapsam dışı.
90–100 = alanda çok konuşulacak gelişme: büyük model/ürün çıkışı, önemli düzenleme ya da mahkeme kararı, büyük satın alma veya yatırım, çığır açan araştırma.
70–89 = önemli gelişme: kayda değer model, araştırma sonucu, şirket ya da politika haberi.
50–69 = okura yeni bilgi veren sıradan yapay zekâ haberi.
30–49 = zayıf: küçük özellik güncellemesi, tanıtım kokan duyuru, etkinlik.
1–29 = okura neredeyse hiçbir şey söylemiyor (liste, rehber, yorum).
Aralığın içinde ince ayar yap. 70 ve üstü yayımlanır: yalnız okurun gerçekten bilmesi gereken haberlere ver, emin değilsen 70 verme.

Başlıklar:
${basliklar.map((b, i) => `${i}. ${b}`).join('\n')}`,
  });
  if (!r?.puanlar) return null;
  const puan = basliklar.map(() => null);
  for (const { nr, puan: p } of r.puanlar) if (Number.isInteger(nr) && nr >= 0 && nr < basliklar.length && Number.isInteger(p)) puan[nr] = Math.min(100, Math.max(0, p));
  return puan;
}


/**
 * Önbellekli puanlama: önceki turlarda puanlanmış olay (kayit[anahtar] = { puan, olcek: 100, zaman }) yeniden sorulmaz.
 * Eski 0–5 ölçekli kayıtlar (olcek yok) yok sayılır, yeniden puanlanır.
 * Döner: basliklar ile hizalı puan dizisi; yeni puanlar kayda yazılır. Bir parça cevapsız kalırsa null; modelin puanlamadığı
 * başlığın puanı null kalır ve kayda yazılmaz (sonraki turda yeniden sorulur).
 */
export async function onbellekliPuanla(basliklar, anahtarlar, kayit, { kall = gemini, parca = 60, zaman = new Date().toISOString() } = {}) {
  const puan = anahtarlar.map((k) => (kayit[k]?.olcek === OLCEK ? kayit[k].puan : undefined));
  const sor = puan.map((p, i) => (p === undefined ? i : -1)).filter((i) => i >= 0);
  for (let i = 0; i < sor.length; i += parca) {
    const dilim = sor.slice(i, i + parca);
    const sonuc = await onEle(dilim.map((n) => basliklar[n]), { kall });
    if (sonuc === null) return null;
    sonuc.forEach((p, j) => {
      if (p === null) return;
      puan[dilim[j]] = p;
      kayit[anahtarlar[dilim[j]]] = { puan: p, olcek: OLCEK, zaman };
    });
  }
  return puan;
}
