import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { alan, adaylar, baglanti, calistir, frontmatter, paylasimMetni } from './telegram.mjs';

const GOVDE = 'Kelime '.repeat(140);

function haberMd({ baslik, tarih, kategori = 'yapay-zeka', draft = 'false', govde = GOVDE }) {
  return `---\nlang: tr\ntitle: "${baslik}"\ndescription: "Kısa özet metni."\ncategory: ${kategori}\ndate: ${tarih}\ndraft: ${draft}\n---\n\n${govde}\n`;
}

async function kokTemizle() {
  const kok = await mkdtemp(path.join(os.tmpdir(), 'jendume-tg-'));
  await mkdir(path.join(kok, 'src/content/haberler/tr'), { recursive: true });
  await mkdir(path.join(kok, 'src/content/haberler/en'), { recursive: true });
  return kok;
}

test('frontmatter ve alan: çift tırnaklı, tek tırnaklı ve düz değerler', () => {
  const fm = frontmatter(`---\ntitle: "Ön \\"alıntı\\" başlık"\nx: 'It''s'\ndraft: false\n---\ngövde`);
  assert.equal(alan(fm, 'title'), 'Ön "alıntı" başlık');
  assert.equal(alan(fm, 'x'), "It's");
  assert.equal(alan(fm, 'draft'), 'false');
  assert.equal(alan(fm, 'yok'), undefined);
});

test('baglanti: UTM telegram/social, kampanya haber ya da bülten; EN yol /en/news/', () => {
  const haber = baglanti({ dil: 'tr', slug: 'ornek', kategori: 'yapay-zeka' });
  assert.equal(haber, 'https://jendume.com/tr/haber/ornek/?utm_source=telegram&utm_medium=social&utm_campaign=haber');
  const bulten = baglanti({ dil: 'en', slug: 'gun', kategori: 'gunluk-bulten' });
  assert.equal(bulten, 'https://jendume.com/en/news/gun/?utm_source=telegram&utm_medium=social&utm_campaign=bulten');
});

test('paylasimMetni: başlık, özet ve bağlantı; metin 4096 karakteri aşmaz', () => {
  const metin = paylasimMetni({ dil: 'tr', slug: 'ornek', kategori: 'yapay-zeka', baslik: 'Başlık', ozet: 'Özet', tarih: new Date() });
  assert.equal(metin, 'Başlık\n\nÖzet\n\nhttps://jendume.com/tr/haber/ornek/?utm_source=telegram&utm_medium=social&utm_campaign=haber');
  const uzun = paylasimMetni({ dil: 'tr', slug: 'u', kategori: 'x', baslik: 'B', ozet: 'ö'.repeat(10_000), tarih: new Date() });
  assert.ok(uzun.length <= 4096);
  assert.ok(uzun.endsWith('utm_campaign=haber'));
});

test('adaylar: taslak ve kısa haberler alınmaz', async () => {
  const kok = await kokTemizle();
  try {
    await writeFile(path.join(kok, 'src/content/haberler/tr/iyi.md'), haberMd({ baslik: 'İyi haber', tarih: '2026-10-18T06:00:00.000Z' }));
    await writeFile(path.join(kok, 'src/content/haberler/tr/taslak.md'), haberMd({ baslik: 'Taslak', tarih: '2026-10-18T06:00:00.000Z', draft: 'true' }));
    await writeFile(path.join(kok, 'src/content/haberler/tr/kisa.md'), haberMd({ baslik: 'Kısa haber', tarih: '2026-10-18T06:00:00.000Z', govde: 'az kelime' }));
    const liste = await adaylar(kok);
    assert.deepEqual(liste.map((a) => a.slug), ['iyi']);
  } finally {
    await rm(kok, { recursive: true, force: true });
  }
});

test('calistir: anahtar yoksa hiçbir istek yapılmaz', async () => {
  const kok = await kokTemizle();
  try {
    let cagri = 0;
    const sonuc = await calistir({ env: {}, rot: kok, durumDosyasi: path.join(kok, 'd.json'), fetchFn: async () => { cagri++; return new Response('{}'); } });
    assert.equal(sonuc.atlandi, true);
    assert.equal(cagri, 0);
  } finally {
    await rm(kok, { recursive: true, force: true });
  }
});

test('calistir: ilk çalıştırma yalnız kaydeder; sonra yeni haber bir kez gönderilir, EN sohbeti yoksa EN atlanır', async () => {
  const kok = await kokTemizle();
  const durumDosyasi = path.join(kok, 'durum.json');
  const simdi = new Date('2026-10-19T06:00:00.000Z');
  try {
    await writeFile(path.join(kok, 'src/content/haberler/tr/eski.md'), haberMd({ baslik: 'Eski haber', tarih: '2026-10-18T06:00:00.000Z' }));
    const cagrilar = [];
    const fetchFn = async (url, init) => {
      cagrilar.push({ url: String(url), govde: JSON.parse(init.body) });
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    };
    const env = { TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: '@kanal_tr', TELEGRAM_CHAT_ID_EN: '' };
    const ilk = await calistir({ env, rot: kok, durumDosyasi, fetchFn, bekle: async () => {}, simdi });
    assert.equal(ilk.gonderilen, 0);
    assert.equal(cagrilar.length, 0);

    await writeFile(path.join(kok, 'src/content/haberler/tr/yeni.md'), haberMd({ baslik: 'Yeni haber', tarih: '2026-10-19T05:00:00.000Z' }));
    await writeFile(path.join(kok, 'src/content/haberler/en/yeni-en.md'), haberMd({ baslik: 'New story', tarih: '2026-10-19T05:00:00.000Z' }));
    const ikinci = await calistir({ env, rot: kok, durumDosyasi, fetchFn, bekle: async () => {}, simdi: new Date('2026-10-19T07:00:00.000Z') });
    assert.equal(ikinci.gonderilen, 1);
    assert.equal(cagrilar.length, 1);
    assert.equal(cagrilar[0].url, 'https://api.telegram.org/bottest-token/sendMessage');
    assert.equal(cagrilar[0].govde.chat_id, '@kanal_tr');
    assert.match(cagrilar[0].govde.text, /utm_source=telegram&utm_medium=social&utm_campaign=haber/);
    assert.doesNotMatch(cagrilar[0].govde.text, /Eski haber/);

    const ucuncu = await calistir({ env, rot: kok, durumDosyasi, fetchFn, bekle: async () => {}, simdi: new Date('2026-10-19T08:00:00.000Z') });
    assert.equal(ucuncu.gonderilen, 0);
    const durum = JSON.parse(await readFile(durumDosyasi, 'utf8'));
    assert.ok(durum.paylasilan['tr:yeni']);
    assert.ok(durum.paylasilan['tr:eski']);
  } finally {
    await rm(kok, { recursive: true, force: true });
  }
});

test('calistir: 48 saatten eski yayımlanmış haber gönderilmez', async () => {
  const kok = await kokTemizle();
  const durumDosyasi = path.join(kok, 'durum.json');
  try {
    await writeFile(path.join(kok, 'src/content/haberler/tr/ilk.md'), haberMd({ baslik: 'İlk', tarih: '2026-10-19T00:00:00.000Z' }));
    await calistir({ env: { TELEGRAM_BOT_TOKEN: 't', TELEGRAM_CHAT_ID: 'c' }, rot: kok, durumDosyasi, fetchFn: async () => new Response('{}'), simdi: new Date('2026-10-19T01:00:00.000Z') });
    await writeFile(path.join(kok, 'src/content/haberler/tr/gec.md'), haberMd({ baslik: 'Gec', tarih: '2026-10-10T00:00:00.000Z' }));
    let cagri = 0;
    const sonuc = await calistir({ env: { TELEGRAM_BOT_TOKEN: 't', TELEGRAM_CHAT_ID: 'c' }, rot: kok, durumDosyasi, fetchFn: async () => { cagri++; return new Response('{}'); }, bekle: async () => {}, simdi: new Date('2026-10-19T02:00:00.000Z') });
    assert.equal(sonuc.gonderilen, 0);
    assert.equal(cagri, 0);
  } finally {
    await rm(kok, { recursive: true, force: true });
  }
});
