# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Turkish- and English-speaking readers who want to understand artificial intelligence and its impact on the world, not only scroll through headlines: curious people in Turkey, Europe and the wider international audience who follow AI models, research, policy, science, technology and the economy, and who want each story to say why it matters.

## Product Purpose

JEN DUME ("Beyond Words") is born from the desire to understand the age of artificial intelligence. It reads primary AI research labs, academic feeds, and Turkish and global AI sources, connects them with the help of AI, and publishes clear bilingual stories that answer not just what happened, but why it matters. Its founding idea comes from Esperanto (Zamenhof, 1887): a shared ground for people who speak different languages.

## Positioning

A bilingual (`tr`, `en`) artificial intelligence publication, not a breaking-news wire or an uncritical AI hype blog. Every story carries a region / focus line (`bolge`) and a short "Why it matters / Neden Önemli?" perspective (`perspektif`) that sits before the prose.

## Operating Context

- Content lives as Markdown files in `src/content/haberler/{tr,en}/<slug>.md`, with identical slugs in both languages so readers can switch language on any article.
- Production: an automated news bot (`scripts/bot/`, GitHub Actions, triggered by the shared Cloudflare cron Worker at Oslo even hours) reads Turkish and international AI research, lab, and technology feeds, groups stories about the same event, and writes verified TR/EN stories.
- Categories: `dunya`, `yapay-zeka`, `teknoloji`, `bilim`, `ekonomi`, `perspektif`, localized in both languages.
- Pages: English home at `/`, language indexes (`/tr/`, `/en/`), category pages, article pages, about page, 404, per-language RSS.

## Capabilities and Constraints

- Astro static site on Cloudflare Workers static assets (`jendume.com`).
- Strict Content Security Policy in `public/_headers` (`inlineStylesheets: 'never'`); no third-party hosts for fonts or scripts.
- Sister sites `tidsrost`, `kifobu`, `finfolis` and `leyum` share operations but each has a fully separate visual identity; jendume must not resemble any of them.
- Stories have no outside photos; every article uses the generated cover (`src/kapak/ciz.ts`, identity v2: paper, big green circle, single-language).
- Never name or link news outlets on the site; only official sources, research institutions, and companies may be cited.

## Brand Commitments

- Name: **JEN DUME**; identity v2 (2026-10-18, `BRAND.md`): plate mark (dark plate, white J, Esperanto-green square), lowercase "jen dume" logotype with a green j dot, Instrument Sans, Esperanto green. `jendume` in URLs and code.
- Motto: "Beyond Words" / "kelimelerin ötesinde".
- Bilingual parity: every published story exists in Turkish and English.
- Voice: calm, curious, humane, precise; no breathless hype, no clickbait.

## Product Principles

1. **Why it matters comes first:** region and perspective are visible before the prose.
2. **Language is a bridge:** switching TR/EN keeps the reader on the same story.
3. **Complete without imagery:** typography and structure carry every page.
4. **Verified facts only:** numbers, media names, and relative times are checked by `denetci.mjs` before publishing.
