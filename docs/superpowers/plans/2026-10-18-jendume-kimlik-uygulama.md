# JEN DUME Kimlik v2 Uygulama Planı

> Yöntem kifobu ve finfolis planlarıyla aynı. Spec: `BRAND.md` (sürüm 2).

**Goal:** `BRAND.md` kararlarını sitede, kapaklarda ve marka dosyalarında uygulamak; içerik, yapı, iki dillilik ve
veri akışı değişmeden.

**Architecture:** Yön levhası teması `global.css` belirteçleri üzerine kurulu. Kimlik v2 belirteçleri yeniden
tanımlar (yazı Instrument Sans, sarı → yeşil, koyu levha alanları yerel belirteçlerle kâğıda döner), yön levhası
öğelerini (1–6 kodları, kapı okları) gizler, üst kısma yeni logoyu koyar. Kapaklar derlemede çizildiği için
`src/kapak/ciz.ts` değişince bütün kapaklar kendiliğinden yenilenir.

## Global Constraints

- Yazı: yalnız **Instrument Sans** (OFL), genişlik 100'e sabit; kendi sunucumuzda; CSP değişmez.
- Renk: kâğıt `#f4f5f2`, mürekkep `#16181d`, Esperanto yeşili `#00924a` (tek marka rengi), yeşil yazı `#00783d`,
  gri `#5a5d63`, çizgi `#c9ccc4`. Sarı, kırmızı, pişmiş toprak, fiyort mavisi yok.
- Mevcut sayfalarda yeni blok yok; iki dilli TR/EN etiketler kalır; 1–6 numaraları, oklar, siyah bant, sarı kutular kalkar.
- Resmî olmayan haber kaynaklarının adı hiçbir dosyaya yazılmaz (`AGENTS.md`). Windows'ta `npm install` yok.

## Görevler

1. **Yazı tipi:** Instrument Sans değişken TTF → wdth 100 sabit; site için latin / latin-ext woff2 (`-v1`), kapaklar
   için TTF (`src/kapak/fontlar/`). Signika ve Atkinson dosyaları kalkar.
2. **İşaret ve logo:** `src/lib/kimlik.ts` — levha SVG'si (BRAND §5 geometrisi, J glif yolu), "jen dume" logotipi
   (noktasız j + yeşil nokta). Favicon (levha), apple-touch, manifest; yayıncı logosu (`logoSvg`).
3. **Site:** `global.css` belirteçleri ve koyu alanların yerel belirteçleri; `.code` ve kapı okları gizlenir; üst kısımda
   ve altta yeni logo; "Önemli gelişme" etiketi mürekkep.
4. **Kapaklar:** `ciz.ts` yeni dil — kâğıt zemin, sağ üstten taşan büyük yeşil daire, sol üstte kategori (yeşil, büyük
   harf, "TR · EN"), sayfa dilinde başlık 700, öteki dilde başlık 400 gri, sol altta logo. Testler güncellenir.
5. **Sosyal ve logo paketi:** `scripts/marka/` — profil (levha), X / Facebook / LinkedIn kapakları, logo paketi.
6. **Belgeler:** `DESIGN.md`, `PRODUCT.md` marka satırları.

## Yayın

Hepsi tek yayında; itişten önce `git pull --rebase`, sonra `yayinla.yml` kontrol edilir.
