import test from 'node:test';
import assert from 'node:assert/strict';
import { haritaSvg, haritaUlkesi } from './harita.mjs';

test('haritaUlkesi: tek ülke ve başlıkta adı geçiyorsa', () => {
  assert.deepEqual(haritaUlkesi({ bolge: 'Avustralya', title: "Avustralya'da yeni yapay zekâ yasası" }, 'tr'), { id: '036', ad: 'Avustralya' });
  assert.deepEqual(haritaUlkesi({ bolge: 'ABD', title: "ABD'de eyaletler kuralları sıkılaştırıyor" }, 'tr'), { id: '840', ad: 'ABD' });
  assert.deepEqual(haritaUlkesi({ bolge: 'USA', title: 'US states tighten AI rules' }, 'en'), { id: '840', ad: 'United States' });
  assert.deepEqual(haritaUlkesi({ bolge: 'İngiltere', title: 'İngiltere çocuklar için kural koydu' }, 'tr'), { id: '826', ad: 'Birleşik Krallık' });
});

test('haritaUlkesi: küresel, bölge, çok ülke, başlıkta yok, analiz ve bülten çizilmez', () => {
  assert.equal(haritaUlkesi({ bolge: 'Küresel', title: 'Küresel bir şey' }, 'tr'), null);
  assert.equal(haritaUlkesi({ bolge: 'Avrupa', title: 'Avrupa kararı' }, 'tr'), null);
  assert.equal(haritaUlkesi({ bolge: 'ABD · Küresel', title: 'ABD kararı' }, 'tr'), null);
  assert.equal(haritaUlkesi({ bolge: 'ABD', title: 'Michigan cezaevleri yapay zekâ kullanacak' }, 'tr'), null);
  assert.equal(haritaUlkesi({ bolge: 'Çin', title: 'Çin kararı', yaziTuru: 'analiz' }, 'tr'), null);
  assert.equal(haritaUlkesi({ bolge: 'Çin', title: 'Çin kararı', category: 'gunluk-bulten' }, 'tr'), null);
  assert.equal(haritaUlkesi({ bolge: 'USA', title: 'Business leaders discuss AI' }, 'en'), null);
});

test('haritaSvg: hedef ülke işaretli, bilinmeyen ülke null', () => {
  const svg = haritaSvg('036', 'Avustralya');
  assert.match(svg, /^<svg viewBox="0 0 840 400"/);
  assert.equal((svg.match(/class="hedef"/g) ?? []).length, 1);
  assert.equal(haritaSvg('999', 'Yok'), null);
});
