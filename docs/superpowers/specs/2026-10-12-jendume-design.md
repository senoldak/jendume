# jendume — Üç Dilli Yapay Zekâ ve Teknoloji Haber Mecmuası Tasarım Belgesi

**Tarih:** 2026-10-12  
**Alan Adı:** `jendume.com`  
**GitHub Reposu:** `senoldak/jendume`  
**Diller:** Türkçe (`tr`), İngilizce (`en`), Norveççe Bokmål (`no`)

---

## 1. Amaç ve Konumlandırma

**jendume**, yapay zekâ (LLM'ler, üretken yapay zekâ, makine öğrenimi) merkezli olmak üzere çipler/donanım, robotik, yazılım mühendisliği, teknoloji devleri ve yapay zekâ etiği/düzenlemeleri konularında yayın yapan üç dilli (`tr`, `en`, `no`) bağımsız bir teknoloji mecmuasıdır.

- **Kardeş Sitelerle İlişki:** `tidsrost`, `kifobu`, `finfolis` ve `leyum` ile aynı Astro + Cloudflare Workers statik mimarisini paylaşır; ancak görsel kimliği (**Teknik Laboratuvar & Mühendislik Günlüğü**) tamamen kendine özgüdür.
- **Ortak Haber Havuzu:** Haber botu yakaladığı her gelişmeyi aynı anda hem Türkçe, hem İngilizce, hem Norveççe olarak yazar ve ortak `slug` ile kaydeder. Okuyucu herhangi bir haberdeyken dil değiştirdiğinde doğrudan aynı haberin diğer dildeki karşılığına geçer.

---

## 2. İçerik Mimarisi ve Kategoriler

### 2.1. Dil Rotaları
- `/tr/` — Türkçe ana akış, kategori ve haber sayfaları (`tr-TR`, `Europe/Istanbul`)
- `/en/` — İngilizce ana akış, kategori ve haber sayfaları (`en-US`, `UTC`)
- `/no/` — Norveççe ana akış, kategori ve haber sayfaları (`nb-NO`, `Europe/Oslo`)
- `/` — Kök sayfa: Varsayılan olarak Türkçe akışı sunar ve üst barda `🇹🇷 TR | 🇬🇧 EN | 🇳🇴 NO` dil geçişi barındırır.

### 2.2. Kategoriler (6 Ana Bölüm)
Her kategori ortak bir `slug` taşır ve 3 dilde yerelleştirilmiş başlık/açıklamaya sahiptir:
1. `yapay-zeka` — Yapay Zekâ & Modeller / AI & Models / KI & Modeller
2. `cipler-donanim` — Çipler & Donanım / Chips & Hardware / Brikker & Maskinvare
3. `robotik-otonom` — Robotik & Otonom / Robotics & Autonomous / Robotikk & Autonomi
4. `yazilim-gelistirici` — Yazılım & Geliştirici / Software & Dev / Programvare & Utvikling
5. `teknoloji-devleri` — Teknoloji Devleri / Big Tech / Teknogiganter
6. `etik-duzenleme` — Etik & Düzenleme / Policy & Ethics / Etikk & Regulering

### 2.3. İçerik Şeması (`src/content.config.ts`)
Her dil için ayrı koleksiyon (`haberler_tr`, `haberler_en`, `haberler_no`) tanımlanır:
- `lang`: `'tr' | 'en' | 'no'`
- `title`: Haber başlığı
- `description`: Kısa özet (spot)
- `date`: Yayın tarihi (ISO 8601)
- `category`: Kategori slug'ı
- `sirket` (opsiyonel): Özne kurum/şirket/laboratuvar (ör. `OpenAI`, `NVIDIA`, `Anthropic`, `DeepMind`)
- `modelUrun` (opsiyonel): İlgili model, çip veya ürün (ör. `Claude 4`, `Blackwell B300`, `Figure 03`)
- `metrik` (opsiyonel): Haberin kalbindeki teknik sayı/veri (ör. `2M token bağlam`, `%40 enerji tasarrufu`, `3nm mimari`)
- `featured`: Manşet bayrağı (`boolean`)
- `breaking`: Son dakika / kritik gelişme bayrağı (`boolean`)
- `draft`: Taslak (`boolean`)

---

## 3. Görsel Kimlik: "Teknik Laboratuvar & Mühendislik Günlüğü"

### 3.1. Renk Sistemi
- **Açık Tema (Varsayılan):**
  - `--bg-paper`: `#F6F5F0` (Teknik çizim kağıdı)
  - `--bg-panel`: `#ECEAE2` (Künye ve veri kutusu zemini)
  - `--ink`: `#111317` (Ana mürekkep)
  - `--ink-secondary`: `#3E4552` (İkincil metin)
  - `--ink-muted`: `#68707E` (Etiket ve zaman damgası)
  - `--grid-line`: `#D0CEC4` (`1px solid` cetvel çizgisi)
- **Koyu Tema (`prefers-color-scheme: dark`):**
  - `--bg-paper`: `#0E1116` (Karbon grafit)
  - `--bg-panel`: `#161B22` (Koyu teknik panel)
  - `--ink`: `#E6EDF3`
  - `--ink-secondary`: `#9DA7B3`
  - `--ink-muted`: `#6E7681`
  - `--grid-line`: `#2A313C`
- **Vurgu Renkleri:**
  - `--accent-blue`: `#0055FF` (Elektrik mavisi — aktif dil, bağlantılar, birincil teknik vurgu)
  - `--accent-orange`: `#FF4F00` (Sinyal turuncusu — son dakika, önemli metrik)
  - `--accent-green`: `#10B981` (Doğrulama / aktif sistem göstergesi)

### 3.2. Tipografi ve Bileşenler
- **Yazı Tipleri:**
  - Başlık & Gövde: Sistem ve yerel yüksek okunaklı sans/serif kombinasyonu (`Inter` / `system-ui`).
  - Teknik Künye & Metrikler: Monospace (`JetBrains Mono`, `'IBM Plex Mono'`, `monospace`).
- **Teknoloji Künyesi (Tech Spec Card):**
  - Haber satırlarında ve haber detay sayfasında `[ŞİRKET: NVIDIA] · [ÜRÜN: Rubin] · [METRİK: 3nm / 288GB HBM4]` şeklinde teknik etiket şeridi.
- **Görselsiz Tamlık & Otomatik OG Kapak:**
  - Makale sayfaları kapak fotoğrafı olmadan da teknik şema ve künye kartıyla eksiksiz görünür.
  - Sosyal medya ve Telegram paylaşımları için `/kapak/[id].png` uç noktasında otomatik laboratuvar künyesi kapak görseli üretilir.

---

## 4. Üç Dilli Haber Botu ve `mecmua-saat` Entegrasyonu

### 4.1. Haber Botu (`scripts/bot/`)
- `kaynaklar.mjs`: Küresel ve yerel AI/Teknoloji RSS beslemeleri. Laboratuvarların ve kurumların kendi akışları (OpenAI, Google AI, DeepMind, Hugging Face) açık durur; resmi olmayan yayınların listesi `gizli-kaynaklar.sifreli` dosyasında şifrelidir (bkz. `gizli.mjs`).
- `yazar.mjs`: Gemini API kullanarak yakalanan haberi tek akışta `tr`, `en` ve `no` dillerinde özgün olarak yazar; `sirket`, `modelUrun`, `metrik` alanlarını çıkarır.
- `denetci.mjs`: Kaynak metinde yer almayan uydurma sayıları veya alıntıları denetler; 3 dilin de eksiksiz üretildiğini doğrular.
- `calistir.mjs`: Yeni haberleri `src/content/haberler/{tr,en,no}/<slug>.md` olarak kaydeder ve `gorulen.json`'ı günceller.

### 4.2. Zamanlayıcı (`mecmua-saat`)
- `tidsrost/mecmua-saat/worker.js` içine 4. site olarak eklenir:
  - `ad: 'jendume'`, `repo: 'senoldak/jendume'`, `bot: 'bot.yml'`, `dakika: 50`, `site: 'https://jendume.com'`, `onek: '🤖 '`
- Böylece Oslo çift saatlerinde `:00` tidsrost, `:20` kifobu, `:40` finfolis, **`:50` jendume** şeklinde çakışmadan ve ekstra cron hakkı harcamadan çalışır.
