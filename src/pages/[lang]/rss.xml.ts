import type { APIContext } from 'astro';
import { LOCALES, SITE, type Locale } from '../../lib/site';
import { feed } from '../../lib/feed';

export function getStaticPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = (context.params.lang as Locale) ?? 'tr';
  return feed(lang, `${SITE.name} (${lang.toUpperCase()}) — ${SITE.tagline[lang]}`, `/${lang}/rss.xml`);
}
