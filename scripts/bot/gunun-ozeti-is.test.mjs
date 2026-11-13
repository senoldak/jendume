import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { gunHaberleri, ozetYaz } from './gunun-ozeti-is.mjs';

const SIMDI = new Date('2026-11-13T17:45:00Z'); // İstanbul 20:45
const md = ({ title, description = 'Yeterince uzun bir açıklama metni.', category = 'teknoloji', date, extra = '' }) =>
  `---\nlang: tr\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\ncategory: ${category}\ndate: ${date}\n${extra}---\n\nGövde.\n`;

async function kur(haberler) {
  const kok = await mkdtemp(path.join(os.tmpdir(), 'ozet-'));
  await mkdir(path.join(kok, 'src/content/haberler/tr'), { recursive: true });
  await mkdir(path.join(kok, 'src/content/haberler/en'), { recursive: true });
  for (const [slug, h] of Object.entries(haberler)) await writeFile(path.join(kok, 'src/content/haberler/tr', `${slug}.md`), md(h));
  await writeFile(path.join(kok, 'src/content/haberler/en', 'english.md'), md({ title: 'English', date: '2026-11-13T10:00:00.000Z' }));
  return kok;
}

const GUN = {
  daybreak: { title: 'OpenAI, Daybreak markasıyla siber güvenlik pazarına girdi', description: 'OpenAI, Daybreak adını verdiği yeni markasıyla web uygulamaları için siber güvenlik odaklı iki yeni ürün tanıttı.', date: '2026-11-13T15:50:00.000Z' },
  cerebras: { title: 'Cerebras Microsoft ile bulut ortaklığı kurduğunu ve gelir beklentisini artırdığını açıkladı', description: "Yapay zekâ çip üreticisi Cerebras, Microsoft'u yeni bulut müşterisi olarak portföyüne ekledi.", date: '2026-11-13T15:51:00.000Z' },
  llama: { title: 'Llama.cpp ve ggml v1.0.0 sürümleriyle yerel yapay zekâ altyapısını güçlendiriyor', description: 'Yerel yapay zekâ çıkarım projesi llama.cpp ve ggml v1.0.0 sürümüne ulaştı.', date: '2026-11-13T15:52:00.000Z' },
  'sabah-bulteni-13-kasim': { title: 'Yapay Zekâ Sabah Bülteni — 13 Kasım 2026', category: 'gunluk-bulten', date: '2026-11-13T06:00:00.000Z' },
  dun: { title: 'Dün', date: '2026-11-12T20:30:00.000Z' },
  taslak: { title: 'Taslak', date: '2026-11-13T10:00:00.000Z', extra: 'draft: true\n' },
};
const GECERLI = "OpenAI, Daybreak adını verdiği yeni markasıyla web uygulamaları için iki siber güvenlik ürünü tanıttı. Yapay zekâ çip üreticisi Cerebras, Microsoft'u yeni bulut müşterisi olarak portföyüne ekledi. Yerel yapay zekâ çıkarım projesi llama.cpp ve ggml v1.0.0 sürümüne ulaştı.";
const oku = async (kok) => JSON.parse(await readFile(path.join(kok, 'src/data/gunun-ozeti/2026-11-13.json'), 'utf8'));
const sessiz = () => {};

test('gunHaberleri: yalnız Türkçe, bugünün yayımlanmış haberleri; bülten, taslak, dün yok', async () => {
  const kok = await kur(GUN);
  assert.deepEqual((await gunHaberleri({ simdi: SIMDI, kok })).map((h) => h.id), ['daybreak', 'cerebras', 'llama']);
});

test('ozetYaz: geçerli paragraf → yazan gemini; istem jendume konusu', async () => {
  const kok = await kur(GUN);
  let istem;
  const r = await ozetYaz({ simdi: SIMDI, kok, log: sessiz, geminiFn: async (a) => ((istem = a), { paragraf: GECERLI, kimlikler: ['daybreak', 'cerebras', 'llama'] }) });
  assert.deepEqual(r, { tarih: '2026-11-13', yazan: 'gemini' });
  assert.match(istem.sistem, /Konu: yapay zekâ\./);
  assert.ok(istem.schema.required.includes('paragraf'));
  assert.equal((await oku(kok)).paragraf, GECERLI);
});

test('ozetYaz: haber yoksa null; dosya varsa null', async () => {
  assert.equal(await ozetYaz({ simdi: SIMDI, kok: await kur({ dun: GUN.dun }), log: sessiz, geminiFn: async () => null }), null);
  const kok = await kur(GUN);
  await ozetYaz({ simdi: SIMDI, kok, log: sessiz, geminiFn: async () => null });
  assert.equal(await ozetYaz({ simdi: SIMDI, kok, log: sessiz, geminiFn: async () => assert.fail('çağrılmamalı') }), null);
});

test('ozetYaz: uydurma sürüm numarası → yedek', async () => {
  const kok = await kur(GUN);
  const r = await ozetYaz({ simdi: SIMDI, kok, log: sessiz, geminiFn: async () => ({ paragraf: GECERLI.replace('v1.0.0', '1.0'), kimlikler: ['daybreak', 'cerebras', 'llama'] }) });
  assert.equal(r.yazan, 'yedek');
  assert.match((await oku(kok)).paragraf, /^Günün öne çıkanları: OpenAI, Daybreak markasıyla/);
});
