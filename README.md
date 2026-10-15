# jendume

JEN DUME — kelimelerin ötesinde / Beyond Words. Yapay zekâ modellerini, bilimsel araştırmaları, teknoloji altyapısını, küresel yapay zekâ politikalarını ve toplumsal etkilerini “neden önemli?” sorusuyla anlatan iki dilli (`tr`, `en`) yayın.

- **Tema:** Yapay Zekâ (Artificial Intelligence)
- **Diller:** Türkçe (`/tr/`), İngilizce (`/` ve `/en/`)
- **Çatı:** Astro statik site + Cloudflare Workers Static Assets (`jendume.com`)
- **Haber Botu:** `scripts/bot/calistir.mjs` — Türkiye ve dünyadaki yapay zekâ laboratuvarlarını, akademik yayınları ve teknoloji akışlarını tarar, aynı olayı anlatan haberleri gruplar, doğrulanmış TR/EN haberler yazar (`bolge`, `perspektif` alanlarıyla).
- **Tasarım:** “İki Dilli Yön Levhası” dünyası; ayrıntılar `DESIGN.md` ve `PRODUCT.md` içinde.

## Komutlar

```bash
npm run dev       # Geliştirme sunucusu
npm run build     # Statik site derlemesi (./dist)
npm test          # Haber botu birim testleri
npm run bot       # Haber botunu çalıştır (GEMINI_API_KEY gerekir)
```
