// Eski karma haberlerin (birincil + medya kaynağı) resmî kaynaklarını şifreli kaynak izinden (kaynakIzi) açıp ön bilgiye
// `kaynaklar` olarak yazar (iki dilde aynı liste). 25 Kasım 2026'ya kadar bot karma haberde birincil kaynakları hiç
// yazmıyordu (scripts/bot/resmi-kaynak.mjs). Yalnız RESMI_KAYNAKLAR listesindeki (açık) birincil kaynaklar yazılır;
// medya kaynağı burada hiç yazılmaz. Anahtar (KAYNAK_ANAHTARI) gerekir; yalnız yerelde, elle çalıştırılır. Ekrana
// yalnız sayılar yazılır.
//
//   node scripts/resmi-kaynak-ac.mjs          kuru: kaç haber, kaç kaynak
//   node scripts/resmi-kaynak-ac.mjs --yaz    dosyalara yazar (kaynaklar alanı zaten olan haber atlanır)
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { anahtarVar, coz } from './bot/gizli.mjs';
import { esKimligi } from '../src/lib/es-kimlik.mjs';

const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TR = path.join(ROT, 'src/content/haberler/tr');
const EN = path.join(ROT, 'src/content/haberler/en');

const yamlStr = (v) => JSON.stringify(v);

/** İzdeki { ad, url } listesinden birincil kaynaklar (resmiAdlar: açık birincil kaynak adları); aynı adres bir kez. */
export function izdenResmi(iz, resmiAdlar) {
  const ut = [];
  for (const k of Array.isArray(iz) ? iz : []) {
    if (!k?.ad || !resmiAdlar.has(k.ad) || !/^https:\/\//.test(k.url ?? '') || ut.some((x) => x.url === k.url)) continue;
    ut.push({ ad: String(k.ad), url: k.url });
  }
  return ut;
}

/** kaynakIzi satırının altına kaynaklar bloğunu (ve karmaysa karmaKaynak) ekler; kaynaklar alanı varsa dokunmaz. */
export function onBilgiyeResmiEkle(metin, kaynaklar, karma) {
  if (!kaynaklar.length || /^kaynaklar:/m.test(metin)) return metin;
  const blok = `kaynaklar:\n${kaynaklar.map((k) => `  - ad: ${yamlStr(k.ad)}\n    url: ${yamlStr(k.url)}`).join('\n')}${karma ? '\nkarmaKaynak: true' : ''}`;
  return metin.replace(/^(kaynakIzi: .*)$/m, `$1\n${blok}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  if (!anahtarVar()) {
    console.error('KAYNAK_ANAHTARI yok; çıkılıyor.');
    process.exit(1);
  }
  const YAZ = process.argv.includes('--yaz');
  const { RESMI_KAYNAKLAR } = await import('./bot/kaynaklar.mjs');
  const resmiAdlar = new Set(RESMI_KAYNAKLAR.map((k) => k.ad));
  let haber = 0, kaynak = 0, karmaSay = 0, yazilan = 0;
  for (const f of readdirSync(TR)) {
    const trYol = path.join(TR, f);
    const ham = readFileSync(trYol, 'utf8');
    const iz = /^kaynakIzi: "?([^"\r\n]+)"?\r?$/m.exec(ham)?.[1];
    if (!iz || /^kaynaklar:/m.test(ham)) continue;
    let liste;
    try {
      liste = coz(iz);
    } catch {
      continue;
    }
    const resmi = izdenResmi(liste, resmiAdlar);
    if (!resmi.length) continue;
    const karma = liste.some((k) => !resmiAdlar.has(k?.ad));
    haber++;
    kaynak += resmi.length;
    if (karma) karmaSay++;
    if (!YAZ) continue;
    const enAd = esKimligi(ham) ?? f.replace(/\.md$/, '');
    for (const yol of [trYol, path.join(EN, `${enAd}.md`)]) {
      if (!existsSync(yol)) continue;
      const eski = readFileSync(yol, 'utf8');
      const crlf = eski.includes('\r\n'); // Windows'ta git satır sonlarını CRLF'e çevirebilir
      const yeni = onBilgiyeResmiEkle(crlf ? eski.replace(/\r\n/g, '\n') : eski, resmi, karma);
      if (yeni === (crlf ? eski.replace(/\r\n/g, '\n') : eski)) continue;
      writeFileSync(yol, crlf ? yeni.replace(/\n/g, '\r\n') : yeni, 'utf8');
      yazilan++;
    }
  }
  console.log(`resmî kaynağı eksik haber: ${haber} (karma: ${karmaSay}) | yazılacak kaynak: ${kaynak}${YAZ ? ` | yazılan dosya: ${yazilan}` : ' (kuru çalışma)'}`);
}
