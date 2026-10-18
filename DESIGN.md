---
name: JEN DUME
description: Kimlik v2 — iki dilli yapay zekâ yayını; kâğıt ve mürekkep, tek marka rengi Esperanto yeşili, levha işareti, Instrument Sans.
colors:
  ground: "#f4f5f2"
  paper: "#ffffff"
  ink: "#16181d"
  ink-2: "#3a3f48"
  muted: "#5a606b"
  hair: "#c9ccc4"
  yesil: "#00924a"
  yesil-yazi: "#00783d"
  signal: "#d3ecdd"
typography:
  family: "Instrument Sans (wght 400–700, wdth sabit 100), tek aile"
rounded:
  none: "0px"
---

# Design System: JEN DUME

> Kimliğin tek kaynağı `BRAND.md`; bu belge sitedeki ve kapaklardaki uygulamasını anlatır. Plan:
> `docs/superpowers/plans/2026-10-18-jendume-kimlik-uygulama.md`.

## Overview

Meraklı ve düşünceli, iki dilli bir yapay zekâ yayını. Kâğıt zemin, mürekkep yazı, tek marka rengi Esperanto yeşili.
Eski "İki Dilli Yön Levhası" temasının seçicileri `global.css`'te duruyor; renkler belirteçlerle, koyu levha alanları
(üst kısım, "Neden önemli?", bölüm panosu, altlık) yerel belirteçlerle kâğıda döndü ve dosyanın sonundaki
"Kimlik v2" bölümü yön levhası öğelerini (1–6 numaraları, kapı okları) gizler. İki dilli TR/EN etiket çiftleri kalır.

## Colors

- Kâğıt `#f4f5f2`, mürekkep `#16181d`, Esperanto yeşili `#00924a` (üst bant, levhadaki kare, j noktası, etkin menü
  çizgisi, kapaktaki büyük daire), küçük yeşil yazı `#00783d`, vurgu zemini açık yeşil `#d3ecdd`.
- "Önemli gelişme" etiketi mürekkep dolgulu; kırmızı ve sarı yok.

## Typography

**Instrument Sans**, kendi sunucumuzda (`public/fonts/instrument-{latin,latin-ext}-v1.woff2`; kapaklar
`src/kapak/fontlar/InstrumentSans.ttf`; üretici `scripts/marka/yazi-tipi.py`). Başlık 700, logo ve ara başlık 600, metin
400. Yazı tipinde ₺ yok; gerekirse TCMB çizimiyle eklenir.

## Components

- **Logo** (`src/components/Logo.astro`): levha + "jen dume", `src/lib/kimlik.ts` glif yollarından.
- **Levha** (`levhaSvg`): koyu kare, beyaz J, sağ üstte yeşil kare; favicon ve uygulama simgeleri de budur.

## Covers

`src/kapak/ciz.ts`, 1200×675, derlemede çizilir: kâğıt zemin, sağ üst köşeden taşan büyük yeşil daire, sol üstte kategori
(yeşil, büyük harf), başlık 700, sol altta logo. **Tek dilli** (yalnız sayfanın dili).

## Don'ts

Sarı, kırmızı, levha bandı, 1–6 numaraları, kapı okları; ikinci yazı ailesi; fotoğraf, doku, gölge, degrade; mevcut
sayfalara sorulmadan yeni blok.
