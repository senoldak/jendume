import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { VERI, altBol, bloklar, grafVerisi, jsonMetni, resimler, uret, yilAdi } from './alt-metinden.mjs';
import { bi, setDil } from '../../src/lib/graf/felles.mjs';
import { validerGraf } from '../../src/lib/graf/sema.mjs';

const BASLIK = 'Başlık içinde: iki nokta olabilir';

test('altBol: başlıkta ": " geçse de veri doğru ayrılır', () => {
  const r = altBol(`Çubuk grafik: ${BASLIK}: Pay: A: %1,5, B: %2,5.`, BASLIK, 'tr');
  assert.deepEqual(r, { tur: 'bar', veri: 'Pay: A: %1,5, B: %2,5' });
  assert.throws(() => altBol('Çubuk grafik: Başka: x', BASLIK, 'tr'), /ile başlamıyor/);
});

test('bloklar: etiketinde virgül olan noktalar, yıllı ve aylı biçimler (tr)', () => {
  const [a, b, c] = bloklar('Dünya: Dünya, 2023 yılında: %15,4; Fark: Gıda, alkol, tütün: %1,9, Hizmetler: −4,02; Seri: 1990 yılında 1,44 milyar ton, Oca 2025: 99,6, Ara 2024: 1.849,7', 'tr');
  assert.deepEqual(a.noktalar.map((p) => [p.x, p.y, p.enh, p.des]), [['Dünya, 2023 yılında', 15.4, '%', 1]]);
  assert.deepEqual(b.noktalar.map((p) => [p.x, p.y]), [['Gıda, alkol, tütün', 1.9], ['Hizmetler', -4.02]]);
  assert.deepEqual(c.noktalar.map((p) => [p.x, p.y, p.enh]), [['1990', 1.44, 'milyar ton'], ['Oca 2025', 99.6, ''], ['Ara 2024', 1849.7, '']]);
});

test('bloklar: en biçimleri (değer in yıl, sondaki yüzde, binlik virgül)', () => {
  const [a, b] = bloklar('Seri: 10.2 billion kişi in 2030, 1,849.7 in 2040; in 2000: Japan: 25.6%, Türkiye: 9.1%', 'en');
  assert.deepEqual(a.noktalar.map((p) => [p.x, p.y, p.enh]), [['2030', 10.2, 'billion kişi'], ['2040', 1849.7, '']]);
  assert.deepEqual(b.noktalar.map((p) => [p.x, p.y, p.enh]), [['Japan', 25.6, '%'], ['Türkiye', 9.1, '%']]);
});

test('bloklar: ayrıştırılamayan metin hata verir, sessizce atlamaz', () => {
  assert.throws(() => bloklar('Seri: A: abc', 'tr'), /ayrıştırılamadı/);
});

test('yilAdi', () => {
  assert.deepEqual(['2000 yılında', '2015 yılı', 'in 2000', 'In 2000', 'Year 2015', 'Eylül 2026'].map(yilAdi), ['2000', '2015', '2000', '2000', '2015', 'Eylül 2026']);
});

test('grafVerisi: eşik satırı merknad olur, yüzde yazımı dile göre', () => {
  const tr = grafVerisi({ alt: `Çubuk grafik: ${BASLIK}: Bulut: Küçük: %49,3, Tümü: %52,7, Eşik: %75,0.`, baslik: BASLIK, dil: 'tr', kaynak: 'OECD' });
  assert.equal(tr.form, 'rangering');
  assert.deepEqual(tr.merknader, [{ type: 'mal', y: 75, tekst: 'Eşik' }]);
  assert.deepEqual(tr.valg.toplam, ['Tümü']);
  const en = grafVerisi({ alt: `Bar chart: ${BASLIK}: Cloud: Small: 49.3%, All: 52.7%, Threshold: 75.0%.`, baslik: BASLIK, dil: 'en', kaynak: 'OECD' });
  assert.deepEqual(en.merknader, [{ type: 'mal', y: 75, tekst: 'Threshold' }]);
  setDil('en');
  assert.equal(bi(en.serier[0].punkter[0].y, en.desimaler, en.enhet), '49.3%');
  setDil('tr');
  assert.equal(bi(tr.serier[0].punkter[0].y, tr.desimaler, tr.enhet), '%49,3');
});

test('grafVerisi: değer yazımı alt metinle uyuşmuyorsa üretim durur', () => {
  // İkinci değer iki ondalıklı, ilki bir: ortak ondalıkla yeniden biçimlenince "%1,50" alt metinde yok.
  assert.throws(() => grafVerisi({ alt: `Çubuk grafik: ${BASLIK}: Pay: A: %1,5, B: %2,25.`, baslik: BASLIK, dil: 'tr', kaynak: 'X' }), /yazım uyuşmuyor/);
});

test('tür eşlemesi: bilinmeyen tür hata verir', () => {
  assert.throws(() => grafVerisi({ alt: `Radar grafik: ${BASLIK}: Pay: A: %1,5.`, baslik: BASLIK, dil: 'tr', kaynak: 'X' }), /ile başlamıyor/);
});

// ---- Gerçek içerik: 160 grafik resminin hepsi ------------------------------------------------------------------

const hepsi = resimler();

test('160 grafik resmi bulunur, her tür eşlenir', () => {
  assert.equal(hepsi.length, 160);
  assert.equal(hepsi.filter((r) => r.dil === 'tr').length, 80);
  assert.equal(hepsi.filter((r) => r.dil === 'en').length, 80);
});

test('her resim için src/data/grafik JSON var, alt metinden yeniden üretilince aynı ve şemaya uygun', () => {
  for (const r of hepsi) {
    const ad = `${r.dosya} ${r.yazi}/${r.graf}`;
    const s = uret(r);
    assert.ok(!s.hata, `${ad}: ${s.hata}`);
    const dosya = path.join(VERI, r.yazi, `${r.graf}.json`);
    assert.ok(existsSync(dosya), `${ad}: JSON yok (node scripts/grafik/alt-metinden.mjs)`);
    // Windows'ta git satır sonlarını CRLF'e çevirebilir (core.autocrlf); içerik karşılaştırılır.
    assert.equal(readFileSync(dosya, 'utf8').replace(/\r\n/g, '\n'), jsonMetni(s.veri), `${ad}: JSON alt metinle uyuşmuyor, betiği yeniden çalıştırın`);
    assert.deepEqual(validerGraf(s.veri), [], ad);
    assert.equal(s.veri.dil, r.dil, ad);
  }
});

test('uydurma yok: JSON\'daki her değerin ve etiketin yazımı alt metinde aynen geçer', () => {
  for (const r of hepsi) {
    const d = JSON.parse(readFileSync(path.join(VERI, r.yazi, `${r.graf}.json`), 'utf8'));
    setDil(d.dil);
    for (const s of d.serier) {
      assert.ok(r.alt.includes(s.navn) || r.alt.includes(`${s.navn.replace(/^(\d{4})$/, '$1')}`), `${r.yazi}/${r.graf}: seri adı alt metinde yok: ${s.navn}`);
      for (const p of s.punkter) {
        for (const y of [p.y, p.y2, p.mal]) {
          if (y === undefined) continue;
          const yazim = bi(y, s.desimaler ?? d.desimaler, s.enhet ?? d.enhet);
          assert.ok(r.alt.includes(yazim), `${r.yazi}/${r.graf} ${s.navn}/${p.x}: "${yazim}" alt metinde yok`);
        }
        assert.ok(r.alt.includes(String(p.x)), `${r.yazi}/${r.graf}: etiket alt metinde yok: ${p.x}`);
      }
    }
  }
});
