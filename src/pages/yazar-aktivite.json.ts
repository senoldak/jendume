// Sahibin bu sitedeki imzalı yazılarının yayın tarihleri: [{ site, date }]. Diğer üç site yazar sayfasındaki gün ızgarası
// için bunu derlemede çeker (scripts/yazar-aktivite.mjs). Yalnız tarih ve site; başlık ya da adres yok.
// Aynı yazı iki dilde durur; her yazı bir kez sayılsın diye yalnız İngilizce dosyalar alınır.
import { getPublishedPosts } from '../lib/news';
import { kisiYazariMi } from '../lib/yazi-turu.mjs';

export async function GET() {
  const poster = (await getPublishedPosts('en'))
    .filter((p) => kisiYazariMi(p.data))
    .map((p) => ({ site: 'jendume', date: p.data.date.toISOString() }));
  return new Response(JSON.stringify(poster), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
