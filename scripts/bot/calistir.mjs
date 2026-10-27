// jendume iki dilli (TR, EN) yapay zekâ haber botu çalıştırıcısı.
// Kuru çalışma: node scripts/bot/calistir.mjs --kuru
// Canlı çalışma: GEMINI_API_KEY=... node scripts/bot/calistir.mjs
import { writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gommeTurSonu } from './vektorler.mjs';
import { gunlukSatiri } from './denetci.mjs';
import { BELLEK_SAAT } from './mukerrer.mjs';
import { jsonOku } from './lib.mjs';
import { butceYukle, geminiPayiBitti } from './butce.mjs';
import { adresiSil, anahtarVar, yayinlananAc, yayinlananKapat } from './gizli.mjs';
import { havuzAc, havuzKapat } from './havuz.mjs';
import { acilDurdurma } from './kapi.mjs';
import { gorulmeyen, uyarlayiciKur, yerelTur } from './uyarlayici.mjs';
import { turSec } from './motor-modu.mjs';

const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const DURUM_DOSYASI = path.join(ROT, 'scripts/bot/gorulen.json');
const KURU = process.argv.includes('--kuru');
// Ortam değişkeni pozitif tam sayı değilse varsayılan kullanılır (yanlış değer sınırları kaldırmasın).
const sayiAyar = (ad, varsayilan) => {
  const n = Number(process.env[ad]);
  return Number.isInteger(n) && n > 0 ? n : varsayilan;
};
const EN_FAZLA = sayiAyar('EN_FAZLA', 6);
const TEYIT = sayiAyar('TEYIT', 1);
const SURE_MS = sayiAyar('SURE_DK', 18) * 60_000;
const BASLANGIC = Date.now();

// Actions günlükleri herkese açık: kaynak başlıkları, model gerekçeleri ve denetim mesajları yayın adı,
// hata mesajları adres taşıyabilir. Bütün modüllerin günlük satırları gunlukSatiri'ndan geçer.
for (const tur of ['log', 'warn', 'error']) {
  const asil = console[tur].bind(console);
  console[tur] = (...x) => asil(...x.map((p) => (typeof p === 'string' ? gunlukSatiri(p) : p)));
}

// Standartlar Faz 0, acil durdurma: bayrak açıksa tur hiçbir şey yazmadan ve commit etmeden biter (Gemini'ye ilk çağrıdan önce).
if (!KURU && (await acilDurdurma())) process.exit(0);
// Medya adı denetimi şifreli listeye bağlı: anahtar yoksa o denetim yapılamaz, emin olamadığımız için hiçbir şey yayımlanmaz.
if (!KURU && !anahtarVar()) {
  console.warn('KAYNAK_ANAHTARI yok; medya adı denetimi yapılamaz, bu tur yayımlanmıyor.');
  process.exit(0);
}

// Katman 3 (Gemini kota planı): bu turun Gemini payı; yeni habere başlamadan önce geminiPayiBitti() sorulur.
if (!KURU) console.log(await butceYukle({ url: process.env.MOTOR_URL, anahtar: process.env.MOTOR_ANAHTARI, site: 'jendume' }));
const YAS_GUN = sayiAyar('YAS_GUN', 5);

const durum = await jsonOku(DURUM_DOSYASI, { gorulen: {}, hatalar: {}, ayrik: {} });
durum.gorulen ??= {};
// Şeffaflık sayfası için taranan her aday (gorulen yalnız karar verilenleri tutar), 30 gün. İlk turda
// gorulen'den tohumlanır, böylece geçmiş günler boş kalmaz.
durum.taranan ??= { ...durum.gorulen };
durum.hatalar ??= {};
durum.ayrik ??= {};
// Önceki turların "aynı olay" kararları ve olay puanları: aynı soru Gemini'ye ikinci kez gitmez.
durum.ayni ??= {};
durum.puan ??= {};
// Son 72 saatte yayımlanan haberlerin kaynak başlıkları (mukerrer.mjs): yeni kaynak aynı olayı başka kelimelerle anlatsa da yakalanır.
// Kaynak başlıkları durum dosyasında kayıt başına şifreli durur (gizli.mjs); burada açılır, yazarken kapanır.
durum.yayinlanan = yayinlananAc(durum.yayinlanan ?? {});
// Uzunluk yüzünden yayımlanmayan, eş bekleyen kısa haberler (havuz.mjs); kayıt başına şifreli. Açık hali durum.havuz'da durur.
durum.havuz = havuzAc(durum.havuz ?? []);

const simdi = new Date();
// Akış gövdesi uyarlayıcıdadır (uyarlayici.mjs); burası giriş noktası: durum, mod seçimi, kuru çalışma, özet.
const uyarlayici = uyarlayiciKur({
  rot: ROT,
  durum,
  simdi,
  ayar: { enFazla: EN_FAZLA, teyit: TEYIT, yasGun: YAS_GUN, sureMs: SURE_MS, baslangic: BASLANGIC },
});

if (KURU) {
  await uyarlayici.kuru(gorulmeyen(await uyarlayici.adaylar(), durum));
  process.exit(0);
}

if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY tanımlı değil; çıkılıyor.');
  process.exit(0);
}

// MOTOR_TUR=1: tur ortak motorla (MOTOR_DIZIN), aksi hâlde yerel tur. Motor modunda hata yerel tura düşmez; hatada da durum
// aşağıda yazılır (yerel durum kaybolmasın) ve süreç sonunda hata koduyla çıkar.
let turHatasi = null;
try {
  await turSec({
    env: process.env,
    uyarlayici,
    durum,
    simdi,
    rot: ROT,
    yerel: yerelTur,
    // Motor surVar'ı varsayılan olarak hep true sayar; süre ve Gemini payı sınırı burada verilir.
    surVar: () => Date.now() - BASLANGIC <= SURE_MS && !geminiPayiBitti(),
  });
} catch (e) {
  turHatasi = e;
  console.error(`Tur hatayla bitti: ${adresiSil(e?.message ?? e)}`);
}
const { ozet } = uyarlayici;

// Yayın belleği 72 saat, puanlar yalnızca aday yaşı boyunca gerekir.
for (const [k, v] of Object.entries(durum.yayinlanan)) if (simdi - new Date(v.zaman) > BELLEK_SAAT * 3_600_000) delete durum.yayinlanan[k];
for (const [k, v] of Object.entries(durum.puan)) if (simdi - new Date(v.zaman) > (YAS_GUN + 1) * 86_400_000) delete durum.puan[k];
for (const kayit of [durum.gorulen, durum.taranan, durum.ayrik, durum.ayni]) {
  for (const [id, t] of Object.entries(kayit)) {
    if (simdi - new Date(t) > 30 * 86_400_000) delete kayit[id];
  }
}
// Gemini Faz 2: yayımlanan haberlerin vektör dosyası (GOMME_VEKTOR=1) ve gömme önbelleği; hata turu düşürmez.
await gommeTurSonu({ kok: ROT, icerik: 'src/content/haberler/tr', onbellekDosyasi: path.join(ROT, 'scripts/bot/gomme-onbellek.json') });
await writeFile(DURUM_DOSYASI, `${JSON.stringify({ ...durum, yayinlanan: yayinlananKapat(durum.yayinlanan), havuz: havuzKapat(durum.havuz) }, null, 2)}\n`, 'utf8');

const sayi = ozet.yazilan.length;
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `sayi=${sayi}\n`);
if (process.env.GITHUB_STEP_SUMMARY) {
  const liste = (b, x) => (x.length ? `\n### ${b}\n${x.map((s) => `- ${s}`).join('\n')}\n` : '');
  await appendFile(
    process.env.GITHUB_STEP_SUMMARY,
    gunlukSatiri(`## jendume botu\n${liste('Yayımlandı (TR/EN)', ozet.yazilan)}${liste('Denetimden geçemedi', ozet.elenen)}${liste('Atlandı', ozet.atlanan)}${liste('Hata', ozet.hata)}`)
  );
}

if (turHatasi) process.exitCode = 1;
