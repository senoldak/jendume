# jendume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `jendume` trilingual (`tr`, `en`, `no`) AI & technology news magazine in `c:\DEPO\KOD DEPOSU\mecmua\jendume` with Astro 5, automated trilingual news bot (`scripts/bot/`), technical laboratory editorial aesthetic, and `mecmua-saat` scheduler integration.

**Architecture:** Astro 5 static site with Content Layer collections (`haberler_tr`, `haberler_en`, `haberler_no`) sharing unified slugs across `/tr/`, `/en/`, and `/no/` routes. Automated Node.js ESM news bot (`scripts/bot/`) fetches AI/tech RSS feeds, groups events, generates verified trilingual articles with structured technical metadata (`sirket`, `modelUrun`, `metrik`), and integrates with Cloudflare Workers (`wrangler.jsonc` and `mecmua-saat`).

**Tech Stack:** Astro 5, TypeScript, Node.js ESM (`node:test`), Cloudflare Workers Static Assets, Gemini API.

## Global Constraints

- Brand name is always lowercase `jendume`.
- Supported languages: `tr` (Turkish), `en` (English), `no` (Norwegian Bokmål).
- Strict CSP in `public/_headers` (`default-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'`).
- Every story must look complete without images and include structured tech metadata (`sirket`, `modelUrun`, `metrik`).

---

### Task 1: Project Scaffolding, Documentation & Configuration

**Files:**
- Create: `jendume/package.json`
- Create: `jendume/tsconfig.json`
- Create: `jendume/astro.config.mjs`
- Create: `jendume/wrangler.jsonc`
- Create: `jendume/.gitignore`
- Create: `jendume/.node-version`
- Create: `jendume/PRODUCT.md`
- Create: `jendume/DESIGN.md`
- Create: `jendume/AGENTS.md`
- Create: `jendume/README.md`
- Create: `jendume/public/_headers`
- Create: `jendume/public/robots.txt`
- Create: `jendume/public/favicon.svg`
- Create: `jendume/public/admin/index.html`
- Create: `jendume/public/admin/config.yml`

- [x] **Step 1: Create configuration, metadata, and public security files**
- [x] **Step 2: Link or install dependencies so Astro and Node tests run cleanly**

---

### Task 2: Core Site Library, Localization & Content Schema

**Files:**
- Create: `jendume/src/lib/site.ts`
- Create: `jendume/src/content.config.ts`
- Create: `jendume/src/lib/news.ts`

- [x] **Step 1: Define trilingual (`tr`, `en`, `no`) locales, UI dictionary, 6 AI/tech categories, and date formatters in `src/lib/site.ts`**
- [x] **Step 2: Define Astro 5 content collections (`haberler_tr`, `haberler_en`, `haberler_no`) in `src/content.config.ts`**
- [x] **Step 3: Create helper functions in `src/lib/news.ts` to query posts by locale, category, and shared slug**

---

### Task 3: Seed Content in 3 Languages (`tr`, `en`, `no`)

**Files:**
- Create: `jendume/src/content/haberler/tr/*.md` (6 initial stories across categories)
- Create: `jendume/src/content/haberler/en/*.md` (6 matching English stories with identical slugs)
- Create: `jendume/src/content/haberler/no/*.md` (6 matching Norwegian stories with identical slugs)

- [x] **Step 1: Create initial trilingual seed articles with realistic AI & tech facts and `sirket` / `modelUrun` / `metrik` metadata**

---

### Task 4: Technical Laboratory Design System, Layouts & Pages

**Files:**
- Create: `jendume/src/styles/global.css`
- Create: `jendume/src/components/TechKunye.astro`
- Create: `jendume/src/components/StoryCard.astro`
- Create: `jendume/src/layouts/Base.astro`
- Create: `jendume/src/pages/index.astro`
- Create: `jendume/src/pages/404.astro`
- Create: `jendume/src/pages/[lang]/index.astro`
- Create: `jendume/src/pages/[lang]/kategori/[slug].astro`
- Create: `jendume/src/pages/[lang]/haber/[id].astro`
- Create: `jendume/src/pages/[lang]/hakkimizda.astro`
- Create: `jendume/src/pages/[lang]/rss.xml.ts`
- Create: `jendume/src/pages/rss.xml.ts`

- [x] **Step 1: Implement Technical Laboratory CSS (`global.css`) with light/dark theme tokens and blueprint grid**
- [x] **Step 2: Implement `Base.astro`, `TechKunye.astro`, `StoryCard.astro` with language switcher (`TR | EN | NO`) that preserves current route/article**
- [x] **Step 3: Implement all pages and RSS endpoints and verify `npx astro build` succeeds**

---

### Task 5: Trilingual Automated News Bot (`scripts/bot/`) & GitHub Actions

**Files:**
- Create: `jendume/scripts/bot/lib.mjs`
- Create: `jendume/scripts/bot/kaynaklar.mjs`
- Create: `jendume/scripts/bot/yazar.mjs`
- Create: `jendume/scripts/bot/denetci.mjs`
- Create: `jendume/scripts/bot/calistir.mjs`
- Create: `jendume/scripts/bot/gorulen.json`
- Create: `jendume/scripts/bot/bot.test.mjs`
- Create: `jendume/.github/workflows/bot.yml`
- Modify: `tidsrost/mecmua-saat/worker.js`

- [x] **Step 1: Implement RSS parser, event grouping, trilingual Gemini writer, and fact verifier (`scripts/bot/`)**
- [x] **Step 2: Write and run unit tests (`node --test scripts/bot/bot.test.mjs`)**
- [x] **Step 3: Create `.github/workflows/bot.yml` and register `jendume` at `:50` in `tidsrost/mecmua-saat/worker.js`**
