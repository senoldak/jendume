// Grafik altındaki kaynak yazısında (TR ve EN) uluslararası kurum ve veri sistemi adlarını bağlantıya çevirir
// ("tonla veri kaynağı kullanıyoruz ama link vermiyoruz", 25 Kasım 2026). Yalnız bu listedeki resmî kurumlar
// bağlanır; medya kuruluşu adı bu listeye girmez (yayın adları yalnız haberin kaynak listesinde,
// src/lib/kaynak-adlari.mjs). Bağlantı kurumun veri portalına gider; yazının "Kaynaklar" bölümü veri setinin kendisine.
//
// kaynakParcalari(metin) -> [{ metin, url? }]: metnin tamamı sırayla; aynı adres bir kez bağlanır.

// Uzun ad önce: "TCMB EVDS" "TCMB"den, "Federal Reserve" "Fed"den önce denenir.
export const KURUMLAR = [
  ['United Nations, Department of Economic and Social Affairs, Population Division', 'https://population.un.org/wpp/'],
  ['International Monetary Fund', 'https://www.imf.org/en/Data'],
  ['International Labour Organization', 'https://ilostat.ilo.org/'],
  ['World Bank WDI', 'https://databank.worldbank.org/source/world-development-indicators'],
  ['World Bank', 'https://data.worldbank.org/'],
  ['Dünya Bankası WDI', 'https://databank.worldbank.org/source/world-development-indicators'],
  ['Dünya Bankası', 'https://data.worldbank.org/'],
  ['Avrupa Komisyonu', 'https://commission.europa.eu/'],
  ['European Commission', 'https://commission.europa.eu/'],
  ['Eurostat', 'https://ec.europa.eu/eurostat/data/database'],
  ['OECD', 'https://data-explorer.oecd.org/'],
  ['IMF', 'https://www.imf.org/en/Data'],
  ['ILO', 'https://ilostat.ilo.org/'],
  ['ITU', 'https://datahub.itu.int/'],
  ['NSF', 'https://ncses.nsf.gov/'],
  ['UNESCO', 'https://uis.unesco.org/'],
  ['TÜİK', 'https://data.tuik.gov.tr/'],
  ['TCMB', 'https://www.tcmb.gov.tr/'],
];

const kac = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Ad sözcük olarak geçmeli: "Fed" "Federal"in, "SEC" "SECTOR"ün içinde eşleşmez. Türkçe harfler sözcük harfi sayılır.
const HARF = 'A-Za-z0-9ÇĞİÖŞÜçğıöşü';
const DESEN = new RegExp(`(?<![${HARF}])(${KURUMLAR.map(([ad]) => kac(ad)).join('|')})(?![${HARF}])`, 'g');
const ADRES = new Map(KURUMLAR);

export function kaynakParcalari(metin) {
  const s = String(metin ?? '');
  const parcalar = [];
  const bagli = new Set();
  let son = 0;
  for (const m of s.matchAll(DESEN)) {
    const url = ADRES.get(m[1]);
    if (bagli.has(url)) continue;
    bagli.add(url);
    if (m.index > son) parcalar.push({ metin: s.slice(son, m.index) });
    parcalar.push({ metin: m[1], url });
    son = m.index + m[1].length;
  }
  if (son < s.length) parcalar.push({ metin: s.slice(son) });
  return parcalar;
}

/** Kaynak yazısının HTML'i: metin kaçışlı, kurum adları bağlantılı. esc: HTML kaçış işlevi. */
export const kaynakHtml = (metin, esc) =>
  kaynakParcalari(metin).map((p) => (p.url ? `<a href="${esc(p.url)}" rel="noopener">${esc(p.metin)}</a>` : esc(p.metin))).join('');
