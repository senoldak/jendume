// Eski haberlerin şifreli kaynak izinden (kaynakIzi) gösterilebilecek kaynakları açar ve ön bilgiye kaynakAdlari olarak
// yazar (iki dilde aynı liste). Konu uyumu ve gösterilmez listesi src/lib/kaynak-adlari.mjs'te. Anahtar (KAYNAK_ANAHTARI)
// gerekir; yalnız yerelde, elle çalıştırılır. Ekrana yalnız sayılar yazılır, hiçbir ad ya da adres yazılmaz.
//
//   node scripts/kaynak-adlari-ac.mjs          kuru: kaç haber, kaç kaynak gösterilecek
//   node scripts/kaynak-adlari-ac.mjs --yaz    dosyalara yazar (kaynakAdlari zaten olan haber atlanır)
//   node scripts/kaynak-adlari-ac.mjs --temizle [--yaz]
//        kaldırma isteği: şifreli listenin gosterilmez alanındaki yayınları yayımlanmış haberlerin kaynakAdlari
//        alanından çıkarır (iki dilde; liste boşalırsa alan silinir, sayfada adsız kaynak satırı kalır)
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { anahtarVar, coz, gizliKaynaklar } from './bot/gizli.mjs';
import { esKimligi } from '../src/lib/es-kimlik.mjs';
import { gorunenAd, gosterilecekKaynaklar } from '../src/lib/kaynak-adlari.mjs';
import { medyaKaynakli } from '../src/lib/kaynak-satiri.mjs';

const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TR = path.join(ROT, 'src/content/haberler/tr');
const EN = path.join(ROT, 'src/content/haberler/en');
const YAZ = process.argv.includes('--yaz');
const TEMIZLE = process.argv.includes('--temizle');

const alan = (s, ad) => {
  const m = new RegExp(`^${ad}: (.*)$`, 'm').exec(s)?.[1];
  if (m === undefined) return undefined;
  try {
    return JSON.parse(m);
  } catch {
    return m.replace(/^"|"$/g, '');
  }
};
const yamlStr = (v) => JSON.stringify(v);

/** kaynakIzi satırının hemen altına kaynakAdlari bloğunu ekler. */
export function onBilgiyeEkle(metin, kaynaklar) {
  if (!kaynaklar.length || /^kaynakAdlari:/m.test(metin)) return metin;
  const blok = `kaynakAdlari:\n${kaynaklar.map((k) => `  - ad: ${yamlStr(k.ad)}\n    url: ${yamlStr(k.url)}`).join('\n')}`;
  return metin.replace(/^(kaynakIzi: .*)$/m, `$1\n${blok}`);
}

/** kaynakAdlari bloğundan gösterilmez yayınları çıkarır; blok boşalırsa tümden siler. -> { metin, cikan } */
export function gosterilmezleriCikar(metin, gosterilmez) {
  const yasak = new Set(gosterilmez.map((a) => gorunenAd(a).toLocaleLowerCase('tr')));
  const m = /^kaynakAdlari:\n((?:  - ad: .*\n    url: .*\n)+)/m.exec(metin);
  if (!m || !yasak.size) return { metin, cikan: 0 };
  const ogeler = [...m[1].matchAll(/  - ad: (.*)\n    url: (.*)\n/g)].map((x) => ({ ham: x[0], ad: JSON.parse(x[1]) }));
  const kalan = ogeler.filter((o) => !yasak.has(gorunenAd(o.ad).toLocaleLowerCase('tr')));
  if (kalan.length === ogeler.length) return { metin, cikan: 0 };
  const blok = kalan.length ? `kaynakAdlari:\n${kalan.map((o) => o.ham).join('')}` : '';
  return { metin: metin.replace(m[0], blok), cikan: ogeler.length - kalan.length };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]) && TEMIZLE) {
  if (!anahtarVar()) {
    console.error('KAYNAK_ANAHTARI yok; çıkılıyor.');
    process.exit(1);
  }
  const { gosterilmez } = gizliKaynaklar({ uyar: () => {} });
  let dosya = 0, cikan = 0;
  for (const kok of [TR, EN]) {
    for (const f of readdirSync(kok)) {
      const yol = path.join(kok, f);
      const eski = readFileSync(yol, 'utf8');
      const crlf = eski.includes('\r\n'); // Windows'ta git satır sonlarını CRLF'e çevirebilir
      const r = gosterilmezleriCikar(crlf ? eski.replace(/\r\n/g, '\n') : eski, gosterilmez);
      if (!r.cikan) continue;
      dosya++;
      cikan += r.cikan;
      if (YAZ) writeFileSync(yol, crlf ? r.metin.replace(/\n/g, '\r\n') : r.metin, 'utf8');
    }
  }
  console.log(`gösterilmez yayın: ${gosterilmez.length} | etkilenen dosya: ${dosya} | çıkan kaynak satırı: ${cikan}${YAZ ? '' : ' (kuru çalışma)'}`);
} else if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  if (!anahtarVar()) {
    console.error('KAYNAK_ANAHTARI yok; çıkılıyor.');
    process.exit(1);
  }
  const { gosterilmez } = gizliKaynaklar({ uyar: () => {} });
  let haber = 0, gosterilen = 0, adsiz = 0, kaynakToplam = 0, kaynakGosterilen = 0, yazilan = 0;
  for (const f of readdirSync(TR)) {
    const trYol = path.join(TR, f);
    const tr = readFileSync(trYol, 'utf8');
    const veri = {
      kaynakIzi: alan(tr, 'kaynakIzi'),
      kaynaklar: /^kaynaklar:/m.test(tr) ? [1] : [],
      category: alan(tr, 'category'),
      uretim: alan(tr, 'uretim'),
      yaziTuru: alan(tr, 'yaziTuru'),
    };
    if (!medyaKaynakli(veri)) continue;
    const enAd = esKimligi(tr) ?? f.replace(/\.md$/, '');
    const enYol = path.join(EN, `${enAd}.md`);
    const en = existsSync(enYol) ? readFileSync(enYol, 'utf8') : '';
    haber++;
    const liste = coz(veri.kaynakIzi);
    kaynakToplam += liste.length;
    const metinler = [tr, en].flatMap((s) => [alan(s, 'title') ?? '', alan(s, 'description') ?? '']);
    const goster = gosterilecekKaynaklar(liste, metinler, { gosterilmez });
    kaynakGosterilen += goster.length;
    if (goster.length) gosterilen++;
    else adsiz++;
    if (YAZ && goster.length) {
      const yeniTr = onBilgiyeEkle(tr, goster);
      if (yeniTr !== tr) {
        writeFileSync(trYol, yeniTr, 'utf8');
        yazilan++;
      }
      if (en) {
        const yeniEn = onBilgiyeEkle(en, goster);
        if (yeniEn !== en) writeFileSync(enYol, yeniEn, 'utf8');
      }
    }
  }
  console.log(
    `medya kaynaklı haber: ${haber} | kaynağı gösterilecek: ${gosterilen} | adsız kalacak: ${adsiz} | kaynak kaydı: ${kaynakToplam}, gösterilecek: ${kaynakGosterilen}${YAZ ? ` | yazılan haber: ${yazilan}` : ' (kuru çalışma)'}`,
  );
}
