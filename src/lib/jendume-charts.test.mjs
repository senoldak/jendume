import test from 'node:test';
import assert from 'node:assert/strict';
import { JENDUME_GRAFİKLER } from './jendume-charts-data.ts';

test('JENDUME_GRAFİKLER: tam 62 mebius grafik bileşeni jendume için tanımlı', () => {
  assert.equal(JENDUME_GRAFİKLER.length, 62, 'Tam 62 grafik tanımlı olmalı');
});

test('JENDUME_GRAFİKLER: her grafiğin id değeri tekil ve geçerli formatta', () => {
  const idler = new Set();
  for (const g of JENDUME_GRAFİKLER) {
    assert.ok(g.id.startsWith('charts-'), `${g.id} charts- ile başlamalı`);
    assert.ok(!idler.has(g.id), `${g.id} tekil olmalı`);
    idler.add(g.id);
  }
  assert.equal(idler.size, 62);
});

test('JENDUME_GRAFİKLER: jendume iki dilli (TR/EN) kimliğe tam uygunluk', () => {
  const GECERLI_KATEGORILER_TR = new Set([
    'DİL MODELLERİ & LLM',
    'YAPAY ZEKÂ ÇİPLERİ & DONANIM',
    'AB MEVZUATI & AI ACT',
    'VERİ MERKEZİ & ENERJİ',
    'YAPAY ZEKÂ YATIRIMLARI',
    'AÇIK KAYNAK EKOSİSTEMİ',
  ]);

  const GECERLI_KATEGORILER_EN = new Set([
    'LANGUAGE MODELS & LLM',
    'AI CHIPS & HARDWARE',
    'EU REGULATION & AI ACT',
    'DATA CENTERS & ENERGY',
    'AI VENTURE & INVESTMENTS',
    'OPEN SOURCE ECOSYSTEM',
  ]);

  for (const g of JENDUME_GRAFİKLER) {
    assert.ok(GECERLI_KATEGORILER_TR.has(g.kategoriTr), `${g.id} TR kategorisi geçerli olmalı: ${g.kategoriTr}`);
    assert.ok(GECERLI_KATEGORILER_EN.has(g.kategoriEn), `${g.id} EN kategorisi geçerli olmalı: ${g.kategoriEn}`);

    assert.ok(g.baslikTr && g.baslikTr.trim().length > 3, `${g.id} Türkçe başlığı olmalı`);
    assert.ok(g.baslikEn && g.baslikEn.trim().length > 3, `${g.id} İngilizce başlığı olmalı`);

    assert.ok(g.aciklamaTr && g.aciklamaTr.trim().length > 10, `${g.id} Türkçe açıklaması olmalı`);
    assert.ok(g.aciklamaEn && g.aciklamaEn.trim().length > 10, `${g.id} İngilizce açıklaması olmalı`);

    assert.ok(g.metrikTr && g.metrikTr.trim().length > 0, `${g.id} TR metrik değeri olmalı`);
    assert.ok(g.metrikEn && g.metrikEn.trim().length > 0, `${g.id} EN metrik değeri olmalı`);

    assert.ok(typeof g.degisim === 'number' && !Number.isNaN(g.degisim), `${g.id} sayısal değişim taşımalı`);
    assert.ok(g.degisimEtiketTr && g.degisimEtiketTr.trim().length > 0, `${g.id} TR değişim etiketi taşımalı`);
    assert.ok(g.degisimEtiketEn && g.degisimEtiketEn.trim().length > 0, `${g.id} EN değişim etiketi taşımalı`);

    assert.ok(g.kaynakTr && g.kaynakTr.trim().length > 0, `${g.id} TR kaynak taşımalı`);
    assert.ok(g.kaynakEn && g.kaynakEn.trim().length > 0, `${g.id} EN kaynak taşımalı`);
    assert.ok(g.tarih && g.tarih.trim().length > 0, `${g.id} tarih taşımalı`);
  }
});

test('JENDUME_GRAFİKLER: mebius kaynak metadata izlenebilirliği', () => {
  for (const g of JENDUME_GRAFİKLER) {
    assert.ok(g.mebiusTitle, `${g.id} mebiusTitle taşımalı`);
    assert.ok(g.exportName, `${g.id} exportName taşımalı`);
    assert.ok(g.mebiusFile.endsWith('.tsx'), `${g.id} mebiusFile .tsx ile bitmeli`);
    assert.ok(g.previewImage.endsWith('.webp'), `${g.id} previewImage .webp olmalı`);
  }
});

test('JENDUME_GRAFİKLER: her grafik türünün çizim veri bütünlüğü', () => {
  for (const g of JENDUME_GRAFİKLER) {
    switch (g.tur) {
      case 'alan':
      case 'sutun':
        assert.ok(Array.isArray(g.seri) && g.seri.length >= 3, `${g.id} (${g.tur}) en az 3 noktalı seri taşımalı`);
        for (const pt of g.seri) {
          assert.ok(typeof pt.deger === 'number' && !Number.isNaN(pt.deger));
          assert.ok(typeof pt.etiket === 'string' && pt.etiket.length > 0);
        }
        break;
      case 'halka-pay':
        assert.ok(Array.isArray(g.dilimler) && g.dilimler.length >= 3, `${g.id} en az 3 dilim taşımalı`);
        const toplamOran = g.dilimler.reduce((acc, d) => acc + d.oran, 0);
        assert.equal(toplamOran, 100, `${g.id} dilim oranları toplamı %100 olmalı`);
        break;
      case 'aralik-bant':
        assert.ok(Array.isArray(g.araliklar) && g.araliklar.length >= 3, `${g.id} aralık listesi taşımalı`);
        for (const a of g.araliklar) {
          assert.ok(a.min <= a.mevcut && a.mevcut <= a.max, `${g.id} min <= mevcut <= max olmalı`);
        }
        break;
      case 'yigilmis-sutun':
        assert.ok(Array.isArray(g.gruplar) && g.gruplar.length >= 3, `${g.id} gruplar taşımalı`);
        for (const gr of g.gruplar) {
          assert.ok(typeof gr.varlik === 'number' && typeof gr.yukumluluk === 'number');
        }
        break;
      case 'coklu-karma':
        assert.ok(Array.isArray(g.seriler) && g.seriler.length >= 3, `${g.id} seriler taşımalı`);
        for (const s of g.seriler) {
          assert.ok(typeof s.cubuk === 'number' && typeof s.cizgi === 'number');
        }
        break;
      case 'siralama-cubuk':
        assert.ok(Array.isArray(g.ogeler) && g.ogeler.length >= 3, `${g.id} öğeler taşımalı`);
        for (const o of g.ogeler) {
          assert.ok(typeof o.deger === 'number' && o.etiket.length > 0);
        }
        break;
      case 'akis-selale':
        assert.ok(Array.isArray(g.adimlari) && g.adimlari.length >= 3, `${g.id} adımlar taşımalı`);
        for (const a of g.adimlari) {
          assert.ok(['artis', 'azalis', 'net'].includes(a.tur));
        }
        break;
      case 'radyal-hedef':
        assert.ok(typeof g.oran === 'number' && g.oran >= 0 && g.oran <= 100);
        assert.ok(typeof g.hedef === 'number');
        break;
      case 'nokta-dagilim':
        assert.ok(Array.isArray(g.noktalar) && g.noktalar.length >= 4, `${g.id} saçılım noktaları taşımalı`);
        for (const p of g.noktalar) {
          assert.ok(typeof p.x === 'number' && typeof p.y === 'number');
        }
        break;
    }
  }
});

test('JENDUME_GRAFİKLER: Esperanto yeşili ve levha kare rozet kuralları', () => {
  const GECERLI_DILIM_RENKLERI = new Set(['yesil', 'koyuyesil', 'acikyesil', 'murekkep', 'gri']);
  for (const g of JENDUME_GRAFİKLER) {
    if (g.dilimler) {
      for (const d of g.dilimler) {
        assert.ok(GECERLI_DILIM_RENKLERI.has(d.renk), `${g.id} dilim rengi Esperanto yeşili veya tonu olmalı: ${d.renk}`);
      }
    }
  }
});
