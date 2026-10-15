// Eski bağlantılar için kökte İngilizce akış.
import { SITE } from '../lib/site';
import { feed } from '../lib/feed';

export async function GET() {
  return feed('en', `${SITE.name} — ${SITE.tagline.en}`, '/rss.xml');
}
