// Yayından sonra son 48 saatin haberlerini ve ana sayfaları IndexNow'a (Bing, Yandex, Seznam, Naver) bildirir.
// Hiçbir koşulda iş akışını düşürmez: her hata yakalanır, yalnız günlüğe yazılır.
import fs from 'node:fs';

const HOST = 'jendume.com';
const KEY = '6b7c898c92ced17efca8709b6f4fbc73';

try {
  const xml = fs.readFileSync('dist/news-sitemap.xml', 'utf8');
  const recent = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  const urlList = [...new Set([`https://${HOST}/`, `https://${HOST}/en/`, `https://${HOST}/tr/`, ...recent])].slice(0, 10000);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
    signal: AbortSignal.timeout(30_000),
  });
  console.log(`IndexNow: ${urlList.length} URL gönderildi, yanıt ${res.status} ${res.statusText}`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `IndexNow: ${urlList.length} URL, yanıt ${res.status}\n`);
  }
} catch (err) {
  console.log(`IndexNow atlandı: ${err?.message ?? err}`);
}
