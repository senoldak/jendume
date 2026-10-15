// node --test scripts/bot/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ayniHikaye, bellekKur, grupAdayi, hikayeIzi, hikayeRakamlari, mukerrerBul } from './mukerrer.mjs';
import { kelimeSayisi, uzunlukKontrol } from './denetci.mjs';

// Yayın belleği kaydı: bir haberin TR ve EN dosyaları (sonHaberler çıktısı biçiminde).
const haber = (slug, date, tr, en) => [
  { lang: 'tr', slug, date, title: tr[0], description: tr[1] },
  { lang: 'en', slug, date, title: en[0], description: en[1] },
];

// Ekim 2026'da yayımlanmış haberler (gerçek başlık ve özetler).
const CHARACTER = haber(
  'character-ai-iflas-basvurusunda-bulundu-varliklarinin-bir-kismi-disney-e-satiliy',
  '2026-10-13T13:02:16.306Z',
  [
    "Character.AI İflas Başvurusunda Bulundu: Varlıklarının Bir Kısmı Disney'e Satılıyor",
    "Yapay zekâ sohbet platformu Character.AI, hukuki ve mali baskılar nedeniyle ABD'de iflas korumasına başvururken varlıklarının satışı için Disney ile 20 milyon dolarlık bir anlaşma yaptı.",
  ],
  [
    'Character.AI Files for Bankruptcy and Agrees to Sell Assets to Disney',
    'Popular AI chatbot platform Character.AI has filed for Chapter 11 bankruptcy protection in the US amidst legal and financial pressures, agreeing to a $20 million asset sale process with Disney.',
  ],
);
const AMBI = haber(
  'kisisel-yapay-zeka-asistani-ambi-26-milyon-dolar-yatirim-aldi',
  '2026-10-13T13:02:16.306Z',
  [
    'Kişisel yapay zekâ asistanı Ambi, 26 milyon dolar yatırım aldı',
    'Mistlabs tarafından geliştirilen yapay zekâ sistemi Ambi, Apple cihazlardaki beta sürecini tamamlayarak 26 milyon dolarlık yatırım eşliğinde kullanıma sunuldu.',
  ],
  [
    'Mistlabs takes its Ambi assistant out of beta with $26M in funding',
    'Mistlabs has brought its ambient intelligence system Ambi out of beta on Apple devices, backed by $26 million in fresh funding.',
  ],
);
const MAIA = haber(
  'microsoft-kendi-urettigi-maia-yapay-zeka-ciplerini-2027-de-gigavat-olcegine-tasi',
  '2026-10-12T17:20:00Z',
  [
    'Microsoft Kendi Ürettiği Maia Yapay Zekâ Çiplerini 2027’de Gigavat Ölçeğine Taşıyor',
    'Microsoft, dışa bağımlılığı azaltmak ve enerji verimliliğini artırmak amacıyla geliştirdiği yeni nesil Maia 300 yapay zekâ çiplerini 2027 yılında devreye alıyor.',
  ],
  [
    'Microsoft Plans to Scale Its Custom Maia AI Chips to Multi-Gigawatt Capacity by 2027',
    'With Maia 200 already powering Copilot across three continents, Microsoft says its upcoming Maia 300 silicon will deliver 40% more tokens per megawatt.',
  ],
);
const TYPESAFE = haber(
  'sohbet-degil-karar-ureten-yapay-zeka-girisimi-typesafe-ai-870-milyon-dolar-yatir',
  '2026-10-12T13:50:00Z',
  [
    'Sohbet Değil Karar Üreten Yapay Zekâ Girişimi TypeSafe AI, 870 Milyon Dolar Yatırım Aldı',
    'Metin üretmek yerine olasılık hesaplayarak kalibre edilmiş kararlar sunan Jev modelinin geliştiricisi TypeSafe AI, 7,5 milyar dolar değerlemeye ulaştı.',
  ],
  [
    'Decision-Focused AI Startup TypeSafe AI Raises $870 Million at a $7.5 Billion Valuation',
    'Backed by Andreessen Horowitz and Sequoia Capital, TypeSafe AI builds models that output calibrated probabilities rather than free-form text.',
  ],
);

const bellek = () => bellekKur([...CHARACTER, ...AMBI, ...MAIA, ...TYPESAFE]);
const grup = (...uyeler) => ({ uyeler: uyeler.map(([baslik, description = '']) => ({ baslik, description })) });
const simdi = new Date('2026-10-13T21:00:00Z');

test('Character.AI iflası ikinci ve üçüncü kez yazılmaz', () => {
  const ikinci = grup([
    'Character.ai files for bankruptcy, puts its platform on the market',
    'The AI chat platform Character.ai filed for bankruptcy protection and started a process to sell its assets.',
  ]);
  assert.equal(mukerrerBul(grupAdayi(ikinci), bellek(), { simdi })?.kayit.slug, CHARACTER[0].slug);
  const ucuncu = grup([
    'Amid bankruptcy, Disney bids $20M for Character.AI chatbot technology',
    'Disney put $20 million on the table for a perpetual license to some intellectual property of struggling chatbot maker Character.AI.',
  ]);
  assert.equal(mukerrerBul(grupAdayi(ucuncu), bellek(), { simdi })?.kayit.slug, CHARACTER[0].slug);
  // Türkçe kaynak da yakalanır.
  const tr = grup(['Character.ai iflas başvurusunda bulundu, satışa çıkıyor']);
  assert.equal(mukerrerBul(grupAdayi(tr), bellek(), { simdi })?.kayit.slug, CHARACTER[0].slug);
});

test('Ambi / Mistlabs 26 milyon dolar yatırımı başka kelimelerle gelse de yakalanır', () => {
  const g = grup([
    'Ambi, an ambient AI startup that listens and helps in the background, raises $26M',
    'Peter Mo, a former Plaud executive, raised $26 million for Ambi, an ambient AI app built to listen continuously.',
  ]);
  const m = mukerrerBul(grupAdayi(g), bellek(), { simdi });
  assert.equal(m?.kayit.slug, AMBI[0].slug);
  assert.match(m.neden, /ambi/);
});

test('Microsoft Maia 300 çipi ikinci kez yazılmaz', () => {
  const g = grup([
    'Microsoft shows Maia 300 AI chip to cut hardware dependence',
    'Microsoft introduced a third-generation custom AI chip for its cloud services.',
  ]);
  assert.equal(mukerrerBul(grupAdayi(g), bellek(), { simdi })?.kayit.slug, MAIA[0].slug);
});

test('aynı şirketin farklı olayı ve yalnız büyük kurum ortaklığı mükerrer sayılmaz', () => {
  // TypeSafe yatırımı ile üç gün sonraki Jev 1.14 sürümü: aynı şirket, farklı olay.
  const jev = grup([
    'Jev 1.14 arrives with image support and a larger context window',
    'TypeSafe AI shipped version 1.14 of its decision model Jev, adding experimental image processing and a 262k token context window.',
  ]);
  assert.equal(mukerrerBul(grupAdayi(jev), bellek(), { simdi }), null);
  // Microsoft'un başka bir modeli: ortak ad yalnız "Microsoft".
  const karar = grup([
    'Microsoft releases a decision-scoring model built for quick choices',
    'Microsoft released Microsoft-Decision-1, a specialized model that returns calibrated probabilities.',
  ]);
  assert.equal(mukerrerBul(grupAdayi(karar), bellek(), { simdi }), null);
  // Disney'in başka bir projesi: Disney tek başına yetmez (ikinci işaret yok).
  const epic = grup(['Epic Games moves to AI-first development on Disney project']);
  assert.equal(mukerrerBul(grupAdayi(epic), bellek(), { simdi }), null);
});

test('72 saatten eski bellek kaydına bakılmaz; çalıştırmada yazılan haber belleğe eklenir', () => {
  const g = grup(['Microsoft shows Maia 300 AI chip to cut hardware dependence']);
  assert.equal(mukerrerBul(grupAdayi(g), bellek(), { simdi: new Date('2026-10-15T18:00:00Z') }), null);
  // durum.yayinlanan kaydı: haberi doğuran kaynak başlıkları.
  const b = bellekKur([], { 'yeni-haber': { zaman: '2026-10-13T20:00:00Z', basliklar: ['Pluto Security raises $42M for AI agent security'] } });
  const tekrar = grup(['Agent security startup Pluto Security secures $42 million']);
  assert.equal(mukerrerBul(grupAdayi(tekrar), b, { simdi })?.kayit.slug, 'yeni-haber');
});

test('iz: Title Case başlıktaki sıradan kelimeler özel ad sayılmaz, tutarlar birimle eşlenir', () => {
  const iz = hikayeIzi({ basliklar: ['Self-Improving AI Models Get Better at Hard Problems'] });
  assert.deepEqual([...iz.adlar], []);
  assert.deepEqual([...hikayeRakamlari(['$26M', '26 milyon dolar', '$26 million'])], ['26000000']);
  assert.deepEqual([...hikayeRakamlari(['10,000 agents', '10.000 ajan', 'in 2026', '5x faster'])], ['10000']);
  assert.ok(ayniHikaye(hikayeIzi({ basliklar: ['Character.AI iflas başvurusu yaptı'] }), hikayeIzi({ basliklar: ['Character.ai iflas başvurusunda'] })));
});

test('uzunlukKontrol 200 kelimenin altındaki gövdeyi reddeder, bağlantı adreslerini saymaz', () => {
  const kelime = (n) => Array.from({ length: n }, (_, i) => `kelime${i}`).join(' ');
  assert.equal(kelimeSayisi('Bir [bağlantı](https://example.com/uzun-adres) ve - işaret'), 4);
  const kisa = { tr: { body: kelime(150) }, en: { body: kelime(150) } };
  assert.equal(uzunlukKontrol(kisa).length, 2);
  const yeterli = { tr: { body: kelime(190) }, en: { body: kelime(260) } };
  assert.deepEqual(uzunlukKontrol(yeterli), []);
});
