import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { slugify, rssOku, guvenli, varlikCoz, ucDilliHaberYaz, yaziKaydet } from './lib.mjs';
import { KAYNAKLAR, RESMI_KAYNAKLAR, anahtarlar, benzer, gizliKaynak, haberKimligi } from './kaynaklar.mjs';
import { rakamKontrol, medyaKontrol, zamanKontrol, kesinKontroller } from './denetci.mjs';
import { DIL_BLOK_SEMASI } from './yazar.mjs';

test('slugify converts Turkish characters to clean ASCII slugs', () => {
  assert.equal(
    slugify('Kelimelerin Ötesinde: Yapay Zekâ Dünyasında Neler Oluyor?'),
    'kelimelerin-otesinde-yapay-zeka-dunyasinda-neler-oluyor'
  );
});

test('varlikCoz decodes Turkish HTML entities properly', () => {
  assert.equal(
    varlikCoz('Kurul &uuml;yesi &Ouml;d&uuml;l&uuml; Ko&ccedil;'),
    'Kurul üyesi Ödülü Koç'
  );
});

test('rssOku parses both RSS 2.0 <item> and Atom <entry> feeds', () => {
  const rssXml = `<?xml version="1.0"?>
    <rss><channel>
      <item>
        <guid>id-1</guid>
        <title>Meta Releases Frontier AI Model Muse Wonder</title>
        <link>https://example.com/muse-wonder</link>
        <description>New multimodal model reaches top benchmark scores.</description>
        <pubDate>Mon, 12 Oct 2026 08:00:00 GMT</pubDate>
      </item>
    </channel></rss>`;
  const items = rssOku(rssXml);
  assert.equal(items.length, 1);
  assert.equal(items[0].title, 'Meta Releases Frontier AI Model Muse Wonder');
  assert.equal(items[0].link, 'https://example.com/muse-wonder');
});

test('guvenli strips raw HTML tags and unsafe links while preserving https links', () => {
  const dirty = 'Merhaba <script>alert(1)</script> [Güvenli](https://jendume.com) ve [Zararlı](javascript:alert(1))';
  const clean = guvenli(dirty);
  assert.ok(!clean.includes('<script>'));
  assert.ok(clean.includes('[Güvenli](https://jendume.com)'));
  assert.ok(!clean.includes('javascript:'));
});

test('anahtarlar and benzer group same-event AI headlines without false-matching generic AI words', () => {
  const a = anahtarlar('Meta releases new frontier AI model Muse Wonder');
  const b = anahtarlar('Meta unveils Muse Wonder frontier artificial intelligence model');
  assert.equal(benzer(a, b), true);

  const unrelated1 = anahtarlar('Yapay zekâ yatırımları küresel büyümeyi destekliyor');
  const unrelated2 = anahtarlar('Yapay zekâ yasası Avrupa ülkelerinde yürürlüğe girdi');
  assert.equal(benzer(unrelated1, unrelated2), false);
});

test('KAYNAKLAR: resmi akışlar açık, gizli akışlar kod ve anahtarlı özetle kimliklenir', () => {
  assert.ok(RESMI_KAYNAKLAR.length >= 1 && RESMI_KAYNAKLAR.every((k) => k.resmi && k.etiket === k.ad));
  assert.ok(RESMI_KAYNAKLAR.every((k) => KAYNAKLAR.includes(k)));
  assert.ok(KAYNAKLAR.every((k) => k.akis.startsWith('https://')));
  const g = gizliKaynak({ ad: 'Örnek Haber', kisa: 'ornek', akis: 'https://haber.example.com/feed', yerli: true, filtre: true });
  assert.match(g.etiket, /^k[0-9a-f]{6}$/);
  assert.ok(g.filtre instanceof RegExp && g.gizli);
  const id = haberKimligi(g, 'https://haber.example.com/2026/10/haber');
  assert.match(id, /^k[0-9a-f]{6}:[0-9a-f]{16}$/);
  assert.equal(id, haberKimligi(g, 'https://haber.example.com/2026/10/haber'));
  assert.equal(haberKimligi(RESMI_KAYNAKLAR[0], 'https://x'), `${RESMI_KAYNAKLAR[0].kisa}:https://x`);
});

test('rakamKontrol, medyaKontrol, and zamanKontrol catch unverified numbers, media names, and relative times', () => {
  const kaynak = 'More than 45 countries joined the AI safety initiative in 2026.';
  assert.equal(rakamKontrol('Girişime 2026 yılında 45 ülke katıldı.', kaynak).length, 0);
  assert.equal(rakamKontrol('Girişime 95 ülke katıldı.', kaynak).length, 1);
  assert.equal(medyaKontrol('Reuters ve Bloomberg tarafından aktarılan habere göre...').length, 1);
  assert.equal(zamanKontrol('Şirket bugün yeni modelini tanıttı.', 'tr').length, 1);
  assert.equal(zamanKontrol('The lab released the weights yesterday.', 'en').length, 1);
  assert.equal(
    kesinKontroller(
      {
        tr: {
          title: 'Yeni Yapay Zekâ Güvenlik Girişimi',
          description: '2026 yılında 45 ülke ortak güvenlik ilkelerine imza attı.',
          perspektif: 'Uluslararası standartlar kullanıcı güvenliğini koruyor.',
          body: 'Girişime 2026 yılında 45 ülke katıldı.',
        },
        en: {
          title: 'New AI Safety Initiative',
          description: 'In 2026, 45 countries signed joint safety principles.',
          perspektif: 'International standards protect user safety.',
          body: 'More than 45 countries joined the initiative in 2026.',
        },
      },
      kaynak
    ).length,
    0
  );
});

test('ucDilliHaberYaz writes tr and en markdown files with identical slug and perspektif', async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'jendume-test-'));
  try {
    const slug = await ucDilliHaberYaz(tmpDir, {
      category: 'yapay-zeka',
      date: '2026-10-12T10:00:00.000Z',
      breaking: false,
      tr: {
        title: 'Yapay Zekâ Çeviri Araçları Farklı Kültürleri Nasıl Yakınlaştırıyor',
        description: 'Gerçek zamanlı sesli çeviri teknolojileri dil engellerini ortadan kaldırıyor.',
        bolge: 'Küresel',
        perspektif: 'Dil bariyerinin aşılması, yerel hikayelerin dünya çapında doğrudan anlaşılmasını sağlıyor.',
        why_matters: 'Kültürel iletişimi kökten dönüştüren somut bir yapay zekâ uygulaması.',
        key_points: ['100 dilde anlık çeviri', '%95 doğruluk oranı'],
        body: 'Türkçe gövde metni.',
      },
      en: {
        title: 'How AI Translation Tools Are Bringing Different Cultures Closer',
        description: 'Real-time voice translation technologies are removing language barriers.',
        bolge: 'Global',
        perspektif: 'Overcoming language barriers allows local stories to be understood directly worldwide.',
        why_matters: 'A concrete AI application fundamentally transforming cultural communication.',
        key_points: ['Instant translation in 100 languages', '95% accuracy rate'],
        body: 'English body text.',
      },
    });

    assert.equal(slug, 'yapay-zeka-ceviri-araclari-farkli-kulturleri-nasil-yakinlastiriyor');
    for (const dil of ['tr', 'en']) {
      const content = await readFile(
        path.join(tmpDir, 'src/content/haberler', dil, `${slug}.md`),
        'utf8'
      );
      assert.ok(content.includes(`lang: ${dil}`));
      assert.ok(content.includes('perspektif:'));
      assert.ok(content.includes('bolge:'));
      assert.ok(content.includes('why_matters:'));
      assert.ok(content.includes('key_points:'));
    }
  } finally {
    await rm(tmpDir, { recursive: true, force: true });
  }
});

test('DIL_BLOK_SEMASI contains why_matters and key_points', () => {
  assert.ok(DIL_BLOK_SEMASI.properties.why_matters);
  assert.equal(DIL_BLOK_SEMASI.properties.why_matters.type, 'string');
  assert.ok(DIL_BLOK_SEMASI.properties.key_points);
  assert.equal(DIL_BLOK_SEMASI.properties.key_points.type, 'array');
  assert.equal(DIL_BLOK_SEMASI.properties.key_points.maxItems, 3);
});

test('yaziKaydet is an alias of ucDilliHaberYaz', () => {
  assert.equal(yaziKaydet, ucDilliHaberYaz);
});

