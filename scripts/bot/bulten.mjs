// jendume günlük bültenleri (Türkiye saati): sabah 09:00, öğle 14:00, akşam 21:00.
// Son bültenden bu yana yayına giren haberleri tek yazıda toplar; TR ve EN olarak iki dosya yazar:
// src/content/haberler/{tr,en}/<donem>-bulteni-<gun>.md. Telegram'a yalnız bu bültenler gider (mecmua-saat).
// Kullanım: node scripts/bot/bulten.mjs [sabah|ogle|aksam]  (verilmezse Türkiye saatinden seçilir)
import path from 'node:path';
import { readFile, writeFile, readdir, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { haberYolu } from '../../src/lib/yollar.mjs';

const HER = path.dirname(fileURLToPath(import.meta.url));
const KOK = path.resolve(HER, '../..');
const KATEGORI = 'gunluk-bulten';
const AZAMI_YAS_MS = 24 * 3600e3;
// Bir bültende en az bu kadar haber olmalı (jendume'un akışı kifobu'dan seyrek).
export const EN_AZ = 2;

export const DONEMLER = {
  sabah: { tr: 'Sabah', en: 'Morning' },
  ogle: { tr: 'Öğle', en: 'Afternoon' },
  aksam: { tr: 'Akşam', en: 'Evening' },
};

export function donemSec(simdi) {
  const saat = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', hour: '2-digit', hourCycle: 'h23' }).format(simdi));
  if (saat < 12) return 'sabah';
  if (saat < 18) return 'ogle';
  return 'aksam';
}

// Ön bilgi (frontmatter) okuyucu: yalnız düz alanlar. Tırnaklı değerler JSON gibi çözülür.
export function onBilgi(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const d = {};
  for (const satir of m[1].split(/\r?\n/)) {
    const i = satir.indexOf(':');
    if (i < 1 || /^\s/.test(satir)) continue;
    let v = satir.slice(i + 1).trim();
    if (v.startsWith('"') && v.endsWith('"')) {
      try {
        v = JSON.parse(v);
      } catch {
        v = v.slice(1, -1);
      }
    }
    d[satir.slice(0, i).trim()] = v;
  }
  return d;
}

const tarihMetni = (simdi, dil) =>
  new Intl.DateTimeFormat(dil === 'tr' ? 'tr-TR' : 'en-US', { timeZone: 'Europe/Istanbul', day: 'numeric', month: 'long' }).format(simdi);

// Başlıktaki tarih yılı da taşır: her dönem ve gün için tek, aramada ayırt edilebilir başlık ("14 October 2026").
const baslikTarihi = (simdi, dil) =>
  new Intl.DateTimeFormat(dil === 'tr' ? 'tr-TR' : 'en-GB', { timeZone: 'Europe/Istanbul', day: 'numeric', month: 'long', year: 'numeric' }).format(simdi);

/** Bülten başlığı: "Yapay Zekâ Akşam Bülteni — 14 Ekim 2026" / "AI Evening Bulletin — 14 October 2026". */
export const bultenBasligi = (donem, dil, simdi) =>
  dil === 'tr'
    ? `Yapay Zekâ ${DONEMLER[donem].tr} Bülteni — ${baslikTarihi(simdi, 'tr')}`
    : `AI ${DONEMLER[donem].en} Bulletin — ${baslikTarihi(simdi, 'en')}`;

const gunSlug = (simdi) =>
  tarihMetni(simdi, 'tr')
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-');

const tirnak = (s) => JSON.stringify(s);
const mdMetin = (s) => s.replace(/([\[\]])/g, '\\$1');

// Bir dil için bülten yazısı (frontmatter + gövde).
export function bultenMetni({ donem, dil, simdi, haberler }) {
  const ad = DONEMLER[donem][dil];
  const slug = `${donem}-bulteni-${gunSlug(simdi)}`;
  const basliklar = haberler.slice(0, 3).map((h) => h.title);
  const giris =
    dil === 'tr'
      ? `${ad} bülteninde ${haberler.length} haber: ${basliklar.join('; ')}${haberler.length > 3 ? ' ve diğerleri' : ''}.`
      : `${haberler.length} stories in the ${ad.toLocaleLowerCase('en-US')} bulletin: ${basliklar.join('; ')}${haberler.length > 3 ? ' and more' : ''}.`;
  const baslik = bultenBasligi(donem, dil, simdi);
  const spot = dil === 'tr' ? 'Son bültenden bu yana yayımlanan haberler:' : 'Stories published since the last bulletin:';
  const govde = haberler.map((h) => `- [${mdMetin(h.title)}](${haberYolu(dil, h.slug)})`).join('\n');
  const md = `---
lang: ${dil}
title: ${tirnak(baslik)}
description: ${tirnak(giris)}
category: ${KATEGORI}
date: ${simdi.toISOString()}
featured: false
breaking: false
draft: false
---

${spot}

${govde}
`;
  return { slug, md };
}

async function var_(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// Bir dilin haber dosyalarını okur: bülten olmayan, taslak olmayan, son 24 saat içindeki yazılar.
async function haberleriOku(kok, dil, simdi) {
  const dizin = path.join(kok, 'src/content/haberler', dil);
  const haberler = [];
  let sonBulten = 0;
  for (const dosya of await readdir(dizin).catch(() => [])) {
    if (!dosya.endsWith('.md')) continue;
    const d = onBilgi(await readFile(path.join(dizin, dosya), 'utf8'));
    if (!d) continue;
    const tarih = new Date(d.date);
    if (Number.isNaN(tarih.valueOf())) continue;
    if (d.category === KATEGORI) {
      sonBulten = Math.max(sonBulten, tarih.getTime());
      continue;
    }
    if (d.draft === 'true') continue;
    haberler.push({ slug: dosya.replace(/\.md$/, ''), title: d.title ?? '', tarih });
  }
  return { haberler, sonBulten };
}

// Bülten yazar. Yazı yoksa ya da yeterli haber yoksa null döner.
export async function calistir({ simdi = new Date(), donem = donemSec(simdi), kok = KOK } = {}) {
  if (!DONEMLER[donem]) throw new Error(`Geçersiz dönem: ${donem}`);
  const tr = await haberleriOku(kok, 'tr', simdi);
  const en = await haberleriOku(kok, 'en', simdi);
  const sonBulten = Math.max(tr.sonBulten, en.sonBulten);
  // Bülten yalnız TR'de olan haberleri de gösterebilir; EN karşılığı olmayan haber EN bültene girmez.
  const secilen = tr.haberler
    .filter((h) => h.tarih.getTime() > sonBulten && simdi - h.tarih <= AZAMI_YAS_MS && h.tarih <= simdi)
    .sort((a, b) => b.tarih - a.tarih);
  const enSlug = new Set(en.haberler.map((h) => h.slug));
  const trHaberler = secilen.filter((h) => h.title);
  if (trHaberler.length < EN_AZ) {
    console.log('Bülten için yeterli yeni haber yok.');
    return null;
  }
  const { slug } = bultenMetni({ donem, dil: 'tr', simdi, haberler: trHaberler });
  for (const dil of ['tr', 'en']) {
    if (await var_(path.join(kok, 'src/content/haberler', dil, `${slug}.md`))) {
      console.log(`${slug} zaten var, atlandı.`);
      return null;
    }
  }
  // TR bülteni TR haberlerle; EN bülteni yalnız EN karşılığı olan haberlerle (EN dosyasının kendi başlığıyla) yazılır.
  const enHaberler = en.haberler.filter((h) => enSlug.has(h.slug) && trHaberler.some((x) => x.slug === h.slug));
  for (const [dil, haberler] of [
    ['tr', trHaberler],
    ['en', enHaberler],
  ]) {
    if (haberler.length < EN_AZ) continue;
    const { md } = bultenMetni({ donem, dil, simdi, haberler });
    await mkdir(path.join(kok, 'src/content/haberler', dil), { recursive: true });
    await writeFile(path.join(kok, 'src/content/haberler', dil, `${slug}.md`), md, 'utf8');
  }
  console.log(`Yazıldı: ${slug} (${trHaberler.length} haber)`);
  return slug;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const slug = await calistir({ donem: process.argv[2] || undefined });
  if (process.env.GITHUB_OUTPUT) await writeFile(process.env.GITHUB_OUTPUT, `yazildi=${slug ? 1 : 0}\n`, { flag: 'a' });
}
