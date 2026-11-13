// Telegram Günün Özeti kapağı (1200×675 SVG), /tr/gunun-ozeti/<gün>/ sayfasının paylaşım görseli. Haber kapağının
// dili (ciz.ts): kâğıt zemin, sağ üstte yeşil daire, sol altta levha + "jen dume". kifobu kartı örnek alındı (sahibi):
// tek başlık "Günün Özeti", altında en çok dört haber başlığı (yeşil nokta imleç), sağ altta tarih ve yeşil çizgi.
// Başlık en çok iki satır olur; sığmayan başlık kesilmez ("…" yok), kapağa girmez, "+N haber daha"ya eklenir.
import { KIMLIK, genislik, logo, metin, type MetinAyar } from '../lib/kimlik.ts';
import { listeSigdir } from '../../scripts/bot/gunun-ozeti.mjs';
import { KAPAK_G as G, KAPAK_Y as Y } from './ciz.ts';

const KENAR = 80;
const DAIRE = { cx: 1130, cy: 40, r: 230 };
const LISTE_G = 760;
const IMLEC = 26;

/** Sözcük sınırında satırlara böler; hiçbir zaman kısaltmaz. */
function satirla(s: string, maks: number, ayar: MetinAyar) {
  const out: string[] = [];
  let satir = '';
  for (const k of s.split(/\s+/).filter(Boolean)) {
    const aday = satir ? `${satir} ${k}` : k;
    if (satir && genislik(aday, ayar) > maks) {
      out.push(satir);
      satir = k;
    } else satir = aday;
  }
  if (satir) out.push(satir);
  return out;
}

const ozAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function ozetKapakSvg({ tarih, basliklar, toplam }: { tarih: string; basliklar: string[]; toplam: number }) {
  const bb = 80;
  const baslikTaban = 88 + bb * 0.72;
  let svg = metin('Günün Özeti', KENAR - 2, baslikTaban, { wght: 700, boyut: bb, renk: KIMLIK.murekkep, aralik: -0.02 });

  const mb = 29;
  const satirAdim = mb * 1.2;
  // Maddeler arasında ince çizgi (kifobu kartı gibi): her maddenin üstünde ve altında ara/2 boşluk.
  const ara = 26;
  const ayar: MetinAyar = { wght: 500, boyut: mb, renk: KIMLIK.murekkep };
  const dahaAyar: MetinAyar = { wght: 500, boyut: 24, renk: KIMLIK.gri };
  const ustCizgi = baslikTaban + 40; // listenin üst çizgisi
  const ilk = ustCizgi + ara / 2 + mb * 0.72; // ilk maddenin taban çizgisi
  const altUst = Y - 62 - 56; // logo satırının üstü
  const sonraki = (y: number, n: number) => y + (n - 1) * satirAdim + mb + ara; // bir sonraki maddenin taban çizgisi
  const altCizgi = (y: number) => y - mb * 0.72 - ara / 2; // y: listeden sonraki (çizilmeyen) maddenin taban çizgisi
  // Listenin en alt noktası (çizimle aynı hesap): alt çizgi ya da "+N haber daha" satırının inişi.
  const listeAlti = (satirSayilari: number[], kalanVar: boolean) => {
    const c = altCizgi(satirSayilari.reduce(sonraki, ilk));
    return kalanVar ? c + 14 + 24 : c;
  };
  const { ogeler, kalan } = listeSigdir({
    basliklar,
    toplam,
    satirla: (b: string) => satirla(b, LISTE_G - IMLEC, ayar),
    sigar: (o: { satirlar: string[] }[]) => listeAlti(o.map((x) => x.satirlar.length), toplam > o.length) + 30 <= altUst,
  });
  const cizgi = (cy: number) => `<rect x="${KENAR}" y="${cy.toFixed(1)}" width="${LISTE_G}" height="1.5" fill="${KIMLIK.cizgi}"/>`;
  let y = ilk;
  if (ogeler.length) svg += cizgi(ustCizgi);
  for (const og of ogeler) {
    svg += `<circle cx="${KENAR + 5.5}" cy="${(y - mb * 0.36).toFixed(1)}" r="5.5" fill="${KIMLIK.yesil}"/>`;
    og.satirlar.forEach((s: string, i: number) => {
      svg += metin(s, KENAR + IMLEC, y + i * satirAdim, ayar);
    });
    y = sonraki(y, og.satirlar.length);
    svg += cizgi(altCizgi(y));
  }
  let maddeAlt = altCizgi(y);
  if (kalan > 0) {
    const taban = maddeAlt + 14 + 24 * 0.72;
    svg += metin(`+${kalan} haber daha`, KENAR + IMLEC, taban, dahaAyar);
    maddeAlt = taban + 24 * 0.28;
  }

  const tarihAyar: MetinAyar = { wght: 700, boyut: 22, renk: KIMLIK.murekkep, aralik: 0.06 };
  const tarihYazi = tarih.toLocaleUpperCase('tr-TR');
  const tg = genislik(tarihYazi, tarihAyar);
  const tTaban = Y - 62 - 20;
  svg += metin(tarihYazi, G - KENAR - tg, tTaban, tarihAyar);
  svg += `<rect x="${(G - KENAR - tg).toFixed(1)}" y="${(tTaban + 8).toFixed(1)}" width="${tg.toFixed(1)}" height="4" fill="${KIMLIK.yesil}"/>`;
  const veri = `data-basliklar="${ozAttr(JSON.stringify(ogeler.map((o: { baslik: string }) => o.baslik)))}" data-kalan="${kalan}" data-madde-alt="${maddeAlt.toFixed(1)}" data-alt-ust="${altUst}"`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${G}" height="${Y}" viewBox="0 0 ${G} ${Y}" ${veri}>` +
    `<rect width="${G}" height="${Y}" fill="${KIMLIK.kagit}"/><circle cx="${DAIRE.cx}" cy="${DAIRE.cy}" r="${DAIRE.r}" fill="${KIMLIK.yesil}"/>` +
    `${svg}${logo(KENAR, Y - 62, 56).svg}</svg>`
  );
}
