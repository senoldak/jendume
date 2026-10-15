---
name: JEN DUME
description: Bilingual world-news publication rendered as international airport wayfinding; black sign panels and signal yellow frame a calm reading column.
colors:
  sign: "#16181d"
  sign-2: "#262a32"
  sign-text: "#ffffff"
  sign-muted: "#a7adb7"
  sign-soft: "#d4d8de"
  signal: "#ffc72c"
  signal-deep: "#f0b000"
  signal-ink: "#4a3a00"
  alert: "#c8102e"
  ground: "#f3f4f1"
  paper: "#ffffff"
  ink: "#16181d"
  ink-2: "#3a3f48"
  muted: "#5a606b"
  hair: "#c9ccc4"
typography:
  wordmark:
    fontFamily: "Signika, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "0.03em"
  display:
    fontFamily: "Signika, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.7vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.012em"
  display-page:
    fontFamily: "Signika, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Signika, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 1.8vw, 1.6rem)"
    fontWeight: 700
    lineHeight: 1.1
  headline-secondary:
    fontFamily: "Signika, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.3vw, 1.2rem)"
    fontWeight: 300
  title:
    fontFamily: "Signika, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.6vw, 1.45rem)"
    fontWeight: 600
    lineHeight: 1.22
  title-compact:
    fontFamily: "Signika, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.25
  quote:
    fontFamily: "Signika, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 400
    lineHeight: 1.38
  deck:
    fontFamily: "'Atkinson Hyperlegible Next', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.5
  prose:
    fontFamily: "'Atkinson Hyperlegible Next', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.72
  body:
    fontFamily: "'Atkinson Hyperlegible Next', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Signika, 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.3
  label-secondary:
    fontFamily: "Signika, 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 300
    lineHeight: 1.12
rounded:
  none: "0"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  container: "1320px"
  measure: "68ch"
  rule: "4px"
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "28px"
  section: "clamp(56px, 7vw, 96px)"
components:
  read-plate:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.sign}"
    typography: "{typography.title-compact}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
  read-plate-hover:
    backgroundColor: "{colors.signal-deep}"
    textColor: "{colors.sign}"
  gate:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.sign}"
    rounded: "{rounded.none}"
    padding: "14px"
  gate-active:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.signal}"
  lang-plate:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.sign-muted}"
    padding: "8px 14px"
  lang-plate-active:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.sign}"
  code-square:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.signal}"
    rounded: "{rounded.none}"
    size: "1.75em"
  why-block:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.sign-text}"
    padding: "22px 26px"
  bridge:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "8px 14px"
  alert-tag:
    backgroundColor: "{colors.alert}"
    textColor: "{colors.sign-text}"
    padding: "2px 8px"
---

# Design System: JEN DUME

## Overview

**Creative North Star: "The International Concourse"**

Reading the world's news is like finding your way through an international airport. Every frame element (masthead, navigation, section headings, labels, the "why it matters" block) is a bilingual wayfinding sign: the reading language set bold, the other language set light beside or beneath it. Between the signs, the reading column stays quiet: a cool off-white ground, a white article panel, a hyperlegible text face at a comfortable measure.

The system is flat, square and high-contrast. Depth comes from the black sign panel against the light ground, never from shadow. Signal yellow owns a full-width band on every screen (the section gate band under the overhead sign, the footer's top rule) and is otherwise spent on action plates, code squares and hover highlights. Pages are complete without imagery; structure and type carry everything. The only image is the drawn cover (src/kapak/ciz.ts → /kapak/<lang>/<id>.png, 1200×675): itself a sign (black panel, wordmark and bilingual motto, code square with bilingual section name, Signika 700 headline, full-width yellow gate band with region · date and jendume.com). It appears on the home lead and the article page and is the og:image that the Telegram queue sends. Text is drawn as glyph paths from static Signika TTFs in src/kapak/fontlar, so the build needs no installed fonts; outside photos (frontmatter cover) are not used. The world is light-only.

It deliberately rejects the broadsheet default (hairline rules plus a serif display face) and the dark tech-lab look of the previous jendume identity.

**Key Characteristics:**
- Black sign panels (overhead, "why it matters", section directory, footer) on a cool light reading ground.
- A signal-yellow gate band at full page width on every page.
- Six permanent section codes (1 to 6) in numbered squares, always paired with drawn SVG direction arrows.
- Both languages visible in every sign; the active one struck forward.
- Square corners everywhere, 1px / 2px / 4px rules, no shadows.

## Colors

Transit-signage palette: one near-black sign color, one signal yellow, one emergency red, and a cool neutral reading set.

### Primary
- **Sign Black** (sign): the panel color for the overhead sign, the "why it matters" block, the section directory board, the footer, and code squares on yellow. Also the color of every 4px rule and focus outline on light ground.
- **Signal Yellow** (signal): the full-width gate band, the read-story action plate, the active language plate, code squares on black, the motto, text-selection, and the hover highlight bar that grows under linked headlines.

### Secondary
- **Deep Signal** (signal-deep): hover state of yellow plates and the underline color of prose links.
- **Signal Ink** (signal-ink): the secondary-language text on yellow surfaces (gate band, read plate); dark enough to stay legible on yellow while reading as subordinate.

### Tertiary
- **Alert Red** (alert): the "key development" tag in the story label line only. Never a surface or a border.

### Neutral
- **Concourse Ground** (ground): page background.
- **Paper White** (paper): the article panel and white text on sign panels (sign-text shares the value).
- **Ink** (ink): body and heading text on light ground; identical value to Sign Black.
- **Ink Two** (ink-2): decks, descriptions, section intros.
- **Muted Slate** (muted): label-line metadata (region, date, reading time) and the secondary language on light ground.
- **Hairline** (hair): 1px dividers between list rows and story cards on light ground.
- **Panel Two** (sign-2): 1px row dividers and the language-switch border inside black panels; hover fill of language plates.
- **Sign Muted** (sign-muted): secondary-language text and quiet metadata on black panels.
- **Sign Soft** (sign-soft): headline previews inside the directory board.

### Named Rules
**The Band Rule.** Signal yellow occupies one full-width band on every screen (the section gate band); elsewhere it appears only as bounded plates, code squares, short bars and hover marks, never as a second large field.

**The Two Surfaces Rule.** There are exactly two surface families: black signs and light reading ground. A new component is either a sign (sign / signal / sign-text / sign-muted) or reading matter (ground / paper / ink / muted); it never blends them or introduces a mid-grey panel.

## Typography

**Display / Sign Font:** Signika, self-hosted variable 300 to 700 (with Segoe UI, system-ui, sans-serif)
**Body / Reading Font:** Atkinson Hyperlegible Next, self-hosted variable 200 to 800 with italics (with Segoe UI, system-ui, sans-serif)

**Character:** Signika is the signage voice: compact, humanist, built for wayfinding, used for every heading, nav item, label and number. Atkinson Hyperlegible Next is the calm reading voice for decks, descriptions, "why it matters" text and article prose.

### Hierarchy
- **Wordmark** (Signika 700, clamp(2rem, 3.6vw, 3.25rem), line-height 0.9, +0.03em): "JEN DUME" in the overhead sign and footer only. The about page enlarges it to clamp(2.6rem, 6vw, 5rem) at line-height 0.95.
- **Display** (Signika 700, clamp(2rem, 3.7vw, 3.5rem), 1.05, -0.012em, max 24ch): the home lead headline. Article titles use clamp(2rem, 4vw, 3.4rem) / 1.06 / -0.01em; section page titles clamp(2rem, 4.4vw, 3.6rem) / 1.02; 404 title clamp(2rem, 4vw, 3.2rem).
- **Headline** (Signika 700, clamp(1.3rem, 1.8vw, 1.6rem), 1.1): bilingual sign headings for page blocks, paired with a 300-weight secondary language at clamp(1rem, 1.3vw, 1.2rem). Prose h2 is 1.55rem and h3 1.25rem, both 700 / 1.2.
- **Title** (Signika 600, clamp(1.25rem, 1.6vw, 1.45rem), 1.22): story card titles. Compact title (600, 1.15rem, 1.25) for the latest list and directory section names.
- **Deck** (Atkinson, clamp(1.1rem, 1.4vw, 1.3rem), 1.5, max 60 to 62ch): lead description and article deck, in Ink Two.
- **Prose** (Atkinson, 1.125rem, 1.72, max 68ch): article body; 1.0625rem under 640px.
- **Body** (Atkinson, 1.0625rem, 1.6): page default; 1rem under 640px. Story descriptions 1rem / 1.55; "why it matters" text 1.05rem / 1.6.
- **Quote** (Signika 400, 1.4rem, 1.38): prose blockquotes, opened by a 56 x 8px yellow bar; 1.2rem on mobile.
- **Label** (Signika 400, 0.95rem, 1.3): the story label line (section code and name at 600, region, date, reading time). 1rem on lead and article headers; 0.88rem for latest-list meta.
- **Secondary language** (Signika 300, roughly 0.8 to 0.9em of its partner): every second-language line in signs.

### Named Rules
**The Bilingual Sign Rule.** Every sign-level label shows both languages: reading language in Signika 600 or 700, the other language in Signika 300 in a muted color, beside or directly beneath it, marked with its `lang` attribute. Reading text (prose, decks, descriptions) is monolingual.

**The Signika for Signs Rule.** Signika sets everything that orients; Atkinson sets everything that is read. Fact (prose) and interpretation ("why it matters") stay typographically separated by surface, not by face alone.

## Layout

A single centered container (max 1320px) with a fluid gutter of clamp(16px, 4vw, 56px). Page frame, top to bottom: black overhead sign (wordmark left, bilingual links and language switch right), the yellow gate band of six equal section plates with a 4px black bottom rule, then main content with clamp(32px, 5vw, 64px) top and clamp(56px, 8vw, 104px) bottom padding, then the black footer under a 10px yellow top rule.

The home page is a two-column grid (fluid lead, 300 to 400px latest column, gap clamp(32px, 5vw, 72px)) that collapses to one column at 1320px. Story lists use an auto-fill grid of min 340px cards with clamp(24px, 3vw, 40px) column gaps and no row gap; cards separate by bottom hairlines. Major blocks are spaced clamp(56px, 7vw, 96px) apart. Articles sit in a white panel max 920px wide with clamp(24px, 4vw, 56px) padding; prose runs at 68ch.

Responsive behavior: at 1320px and below the overhead wraps (wordmark full width) and the gate band becomes a horizontally scrolling row with snap points; at 640px and below the language names hide (codes remain), the "why it matters" block stacks, and the footer and directory rows go to one column.

Spacing rhythm is small and tight inside signs (6, 8, 10, 12, 14px) and generous between blocks (22 to 28px card padding, section-level clamps).

## Elevation & Depth

The system is fully flat. There are no box shadows anywhere. Depth and grouping come from the contrast between black sign panels and the light ground, from heavy black rules (4px) under headings and above the article panel, and from the 10px yellow rule on the footer. State changes are fills and color swaps, never lift.

### Named Rules
**The No-Lift Rule.** Nothing casts a shadow or translates upward on hover. Hover is a fill change (yellow to deep yellow, black to panel two), a growing yellow highlight bar, or an arrow nudging 4px in its direction.

## Shapes

Square corners throughout (radius 0): plates, code squares, panels, tags, the favicon. Rules come in three weights with fixed meanings: 4px Sign Black for structural edges (heading underlines, gate band base, article panel top, section header base, prose hr at 80px wide), 2px for borders of interactive outlines (language switch, bridge button, table heads, gate dividers at 22% black), and 1px hairlines for list separation. The recurring silhouette is the numbered code square (1.75em, tabular figures) beside a solid drawn arrow (12.6-unit shaft, triangular head) rotated by class to point right, down (current location) or up-right.

## Components

### Buttons: Read Plate
Signage you can press: flat, square, yellow.
- **Shape:** square (0).
- **Primary:** Signal Yellow fill, Sign Black text, Signika 600 at 1.05rem, padding 12px 18px, reading-language label then a 300-weight secondary label in Signal Ink, then a right arrow.
- **Hover / Focus:** fill shifts to Deep Signal, arrow nudges 4px right (0.35s, cubic-bezier(0.16, 1, 0.3, 1)). Focus is a 3px Sign Black outline offset 3px.
- **Bridge (secondary):** transparent with a 2px Sign Black border, padding 8px 14px, a small black language-code chip in yellow text; hover fills Signal Yellow. Used to switch an article to its other-language twin.

### Chips / Tags
- **Code square:** 1.75em square, Sign Black with Signal Yellow numeral on light ground; inverted (yellow with black numeral) on black panels and in the latest list.
- **Alert tag:** Alert Red fill, white Signika 600 at 0.85rem, padding 2px 8px, only for key developments in the label line.

### Cards / Containers
- **Story card:** no fill, no border box; title, label line, description, separated by a 1px hairline at the bottom. Padding 22px top, 28px bottom, 12px internal gap.
- **Why It Matters block:** Sign Black panel, padding 22px 26px (18px 20px mobile), max 820px, a bilingual label column (yellow 700 / muted 300) beside the Atkinson text. Always appears before the prose or the read action.
- **Article panel:** Paper White, 4px Sign Black top rule, no shadow.
- **Section directory board:** Sign Black panel with yellow-ruled sign heading; rows of code square + bilingual name, latest headline in Sign Soft, and a yellow tabular count.

### Navigation
- **Overhead sign:** Sign Black, bilingual Signika links with a 3px yellow underline on hover and current page.
- **Language switch:** two adjacent plates inside a 2px Panel Two border; both languages always shown (code + name), the active plate in Signal Yellow with black text, the inactive in Sign Muted with Panel Two hover fill.
- **Gate band:** six plates on Signal Yellow: code square, reading-language name (600, 1.12rem), other language (0.9rem, Signal Ink), arrow pointing right. The current section inverts to a black plate with yellow text and a down arrow. Scrolls horizontally with snap at 1320px and below.

### Label Line (signature)
A fixed two-row label grid under every story title: row one is code square + section name (+ alert tag); row two is region · date (· reading time) in Muted Slate. It replaces any eyebrow or kicker above titles.

## Do's and Don'ts

### Do:
- **Do** show both languages on every sign-level element, the reading language bold and the other in Signika 300, muted.
- **Do** pair every section reference with its permanent numbered code square (1 Dünya/World through 6 Perspektif/Perspective).
- **Do** use the drawn SVG arrow for direction (right for go, down for "you are here", up-right for outward), never a text glyph.
- **Do** keep corners square (0) and separate with 4px / 2px / 1px rules according to their meaning.
- **Do** place region and the "why it matters" block before the prose on articles.
- **Do** use the yellow highlight bar (0.32em tall, grows from 0 to 100% width) as the hover state for linked headlines.

### Don't:
- **Don't** add box shadows, raised cards or hover lift; the system is flat.
- **Don't** round corners or use pills.
- **Don't** put eyebrows or kickers above headlines; metadata belongs in the label line under the title.
- **Don't** introduce a dark mode or a second accent hue; Alert Red is reserved for the key-development tag.
- **Don't** set headings, nav or labels in Atkinson, or reading text in Signika (blockquotes excepted).
- **Don't** load fonts from third-party hosts; both families are self-hosted woff2 under the site CSP.
