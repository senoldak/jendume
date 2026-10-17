import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { rakamSeridiSuz, rakamSeritleriniSuz } from './denetci.mjs';
import { ucDilliHaberYaz } from './lib.mjs';
import { DIL_BLOK_SEMASI } from './yazar.mjs';

const KAYNAK = 'Lab raised $2.5 billion at a valuation of 61 billion dollars. The model scored 87.5% and has 7 billion parameters.';

test('rakamSeridiSuz: kaynakta geçen rakam kalır; uydurma, rakamsız ve küçük sayılı uydurma öğe düşer; en çok 4', () => {
  const r = rakamSeridiSuz(
    [
      { etiket: 'Yatırım', deger: '2,5 milyar dolar' },
      { etiket: 'Değerleme', deger: '61 milyar dolar' },
      { etiket: 'Test puanı', deger: '%87,5' },
      { etiket: 'Çalışan', deger: '12' }, // kaynakta yok: küçük sayı da aranır
      { etiket: 'Gelir', deger: '900 milyon dolar' }, // kaynakta yok
      { etiket: 'Şirket', deger: 'Örnek Lab' }, // rakam yok
      { etiket: 'Parametre', deger: '7 milyar' },
      { etiket: 'Fazla', deger: '2,5 milyar' },
    ],
    KAYNAK,
  );
  assert.deepEqual(r.map((x) => x.etiket), ['Yatırım', 'Değerleme', 'Test puanı', 'Parametre']);
  assert.deepEqual(rakamSeridiSuz(undefined, KAYNAK), []);
});

test('rakamSeritleriniSuz: iki dil ayrı süzülür; boş kalan dilde alan silinir', () => {
  const p = rakamSeritleriniSuz(
    { category: 'ekonomi', tr: { title: 'a', rakamlar: [{ etiket: 'Yatırım', deger: '2,5 milyar dolar' }] }, en: { title: 'b', rakamlar: [{ etiket: 'Revenue', deger: '$900 million' }] } },
    KAYNAK,
  );
  assert.deepEqual(p.tr.rakamlar, [{ etiket: 'Yatırım', deger: '2,5 milyar dolar' }]);
  assert.equal('rakamlar' in p.en, false);
  assert.equal(p.category, 'ekonomi');
});

test('DIL_BLOK_SEMASI: rakamlar en çok 4, zorunlu değil', () => {
  assert.equal(DIL_BLOK_SEMASI.properties.rakamlar.maxItems, 4);
  assert.ok(!DIL_BLOK_SEMASI.required.includes('rakamlar'));
});

test('ucDilliHaberYaz: rakam şeridi frontmatter\'a yazılır', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'jendume-serit-'));
  try {
    const blok = (title, rakamlar) => ({ title, description: 'Özet.', bolge: 'ABD', perspektif: 'P.', body: 'Gövde.', rakamlar });
    const slug = await ucDilliHaberYaz(dir, {
      category: 'ekonomi',
      tr: blok('Örnek Lab 2,5 milyar dolar topladı', [{ etiket: 'Yatırım', deger: '2,5 milyar dolar' }]),
      en: blok('Example Lab raises $2.5 billion', []),
    });
    const tr = await readFile(path.join(dir, 'src/content/haberler/tr', `${slug}.md`), 'utf8');
    const en = await readFile(path.join(dir, 'src/content/haberler/en', `${slug}.md`), 'utf8');
    assert.match(tr, /rakamlar:\n  - etiket: "?Yatırım"?\n    deger: "?2,5 milyar dolar"?\n/);
    assert.ok(!en.includes('rakamlar:'));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
