import { test } from 'node:test';
import assert from 'node:assert/strict';
import { kaynakHtml, kaynakParcalari } from './kaynak-bagla.mjs';
import { esc } from './graf/felles.mjs';

const baglar = (p) => p.filter((x) => x.url).map((x) => x.metin);

test('TR ve EN alt yazılarında kurum adları bağlanır, metin aynen kalır', () => {
  const m = 'Kaynak: Dünya Bankası, ILO modellenmiş kestirimleri; bizim hesabımız.';
  assert.equal(kaynakParcalari(m).map((x) => x.metin).join(''), m);
  assert.deepEqual(baglar(kaynakParcalari(m)), ['Dünya Bankası', 'ILO']);
  assert.deepEqual(baglar(kaynakParcalari('Source: World Bank WDI (ITU data), IT.NET.USER.ZS.')), ['World Bank WDI', 'ITU']);
  assert.deepEqual(baglar(kaynakParcalari('Source: United Nations, Department of Economic and Social Affairs, Population Division.')).length, 1);
});

test('IMF ve International Monetary Fund aynı adres: bir kez', () => {
  assert.deepEqual(baglar(kaynakParcalari('Source: International Monetary Fund, Eurostat; IMF.')), ['International Monetary Fund', 'Eurostat']);
});

test('HTML kaçışlı', () => {
  assert.equal(kaynakHtml('Kaynak: <b>Eurostat</b>', esc), 'Kaynak: &lt;b&gt;<a href="https://ec.europa.eu/eurostat/data/database" rel="noopener">Eurostat</a>&lt;/b&gt;');
});
