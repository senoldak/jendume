// JEN DUME Grafik Kataloğu: 62 Yapay Zekâ ve Teknoloji Analitiği Bileşeni (İKİ DİLLİ)
// BRAND.md uyumlu: Instrument Sans, Esperanto Yeşili (#00924a) tek marka rengi,
// Levha ve yeşil kare imza öğesi, Türkçe ve İngilizce eşdeğer başlıklar.

export type GrafikTuru =
  | 'alan'
  | 'sutun'
  | 'yigilmis-sutun'
  | 'ayrisan-cubuk'
  | 'aralik-bant'
  | 'halka-pay'
  | 'radyal-hedef'
  | 'coklu-karma'
  | 'nokta-dagilim'
  | 'siralama-cubuk'
  | 'akis-selale';

export interface Nokta { etiket: string; deger: number; }
export interface Dilim { ad: string; oran: number; renk: 'yesil' | 'koyuyesil' | 'acikyesil' | 'murekkep' | 'gri'; }
export interface AralikNoktasi { etiket: string; min: number; max: number; mevcut: number; }
export interface YigilmisGrup { etiket: string; varlik: number; yukumluluk: number; }
export interface CokluNokta { etiket: string; cubuk: number; cizgi: number; }
export interface SiralamaOgesi { etiket: string; deger: number; }
export interface AkisAdimi { ad: string; deger: number; tur: 'artis' | 'azalis' | 'net'; }
export interface ScatterNokta { x: number; y: number; }

export interface JendumeGrafikTanimi {
  id: string;
  tur: GrafikTuru;
  kategoriTr: string;
  kategoriEn: string;
  baslikTr: string;
  baslikEn: string;
  aciklamaTr: string;
  aciklamaEn: string;
  metrikTr: string;
  metrikEn: string;
  degisim: number;
  degisimEtiketTr: string;
  degisimEtiketEn: string;
  tarih: string;
  kaynakTr: string;
  kaynakEn: string;
  mebiusTitle: string;
  exportName: string;
  mebiusFile: string;
  previewImage: string;
  levhaKare?: boolean;
  seri?: Nokta[];
  dilimler?: Dilim[];
  araliklar?: AralikNoktasi[];
  gruplar?: YigilmisGrup[];
  seriler?: CokluNokta[];
  ogeler?: SiralamaOgesi[];
  adimlari?: AkisAdimi[];
  noktalar?: ScatterNokta[];
  oran?: number;
  hedef?: number;
}

export const JENDUME_GRAFİKLER: JendumeGrafikTanimi[] = [
  {
    "id": "charts-total-value",
    "tur": "alan",
    "kategori": "PİYASALAR",
    "baslik": "Toplam Portföy Değeri",
    "aciklama": "Son 12 aydaki kümülatif portföy büyümesi ve aylık değer kazanımı.",
    "metrik": "₺1.428.500",
    "degisim": 4.8,
    "degisimEtiket": "geçen aya göre",
    "tarih": "30 Ekim 2026",
    "boncukMiktar": 7,
    "boncukBirim": "₺200.000",
    "kaynak": "TCMB & MKK",
    "seri": [
      {
        "etiket": "Kas",
        "deger": 1120
      },
      {
        "etiket": "Ara",
        "deger": 1160
      },
      {
        "etiket": "Oca",
        "deger": 1195
      },
      {
        "etiket": "Şub",
        "deger": 1210
      },
      {
        "etiket": "Mar",
        "deger": 1260
      },
      {
        "etiket": "Nis",
        "deger": 1290
      },
      {
        "etiket": "May",
        "deger": 1315
      },
      {
        "etiket": "Haz",
        "deger": 1340
      },
      {
        "etiket": "Tem",
        "deger": 1360
      },
      {
        "etiket": "Ağu",
        "deger": 1390
      },
      {
        "etiket": "Eyl",
        "deger": 1410
      },
      {
        "etiket": "Eki",
        "deger": 1428
      }
    ],
    "mebiusTitle": "Total Value Chart",
    "exportName": "TotalValueChart",
    "mebiusFile": "total-value-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-total-value.webp",
    "kategoriTr": "DİL MODELLERİ & LLM",
    "kategoriEn": "LANGUAGE MODELS & LLM",
    "baslikTr": "Küresel Yapay Zekâ Donanım Harcamaları",
    "baslikEn": "Global AI Hardware Expenditure",
    "aciklamaTr": "Veri merkezlerinin yapay zekâ hızlandırıcı ve sunucu çiplerine yaptığı toplam kümülatif harcama.",
    "aciklamaEn": "Cumulative data center expenditure on AI accelerators and high-performance server processors.",
    "metrikTr": "$148,5 Milyar",
    "metrikEn": "$148.5 Billion",
    "degisimEtiketTr": "Yıllık artış",
    "degisimEtiketEn": "Annual increase",
    "kaynakTr": "OECD AI Observatory & Gartner",
    "kaynakEn": "OECD AI Observatory & Gartner",
    "levhaKare": true
  },
  {
    "id": "charts-total-expenses",
    "tur": "halka-pay",
    "kategori": "KİŞİSEL FİNANS",
    "baslik": "Aylık Gider Dağılımı",
    "aciklama": "Hanehalkı harcamalarının ana gider kalemleri bazında yüzdesel payı.",
    "metrik": "₺48.250",
    "degisim": -2.1,
    "degisimEtiket": "geçen aya göre",
    "tarih": "Ekim 2026",
    "boncukMiktar": 5,
    "boncukBirim": "₺10.000",
    "kaynak": "TÜİK Sepeti",
    "dilimler": [
      {
        "ad": "Konut & Kira",
        "oran": 35,
        "renk": "yesil"
      },
      {
        "ad": "Gıda & İçecek",
        "oran": 25,
        "renk": "koyuyesil"
      },
      {
        "ad": "Ulaştırma",
        "oran": 18,
        "renk": "acikyesil"
      },
      {
        "ad": "Faturalar",
        "oran": 12,
        "renk": "murekkep"
      },
      {
        "ad": "Diğer",
        "oran": 10,
        "renk": "gri"
      }
    ],
    "mebiusTitle": "Total Expenses Chart",
    "exportName": "TotalExpensesChart",
    "mebiusFile": "total-expenses-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-total-expenses.webp",
    "kategoriTr": "YAPAY ZEKÂ ÇİPLERİ & DONANIM",
    "kategoriEn": "AI CHIPS & HARDWARE",
    "baslikTr": "Büyük Dil Modelleri Eğitim Maliyet Dağılımı",
    "baslikEn": "Frontier LLM Training Cost Breakdown",
    "aciklamaTr": "Sınır modellerin geliştirilmesinde işlem gücü, elektrik, veri kümesi ve mühendislik giderleri.",
    "aciklamaEn": "Breakdown of frontier AI model training costs including compute, power, datasets, and engineering.",
    "metrikTr": "$85.000.000",
    "metrikEn": "$85,000,000",
    "degisimEtiketTr": "Model başına maliyet artışı",
    "degisimEtiketEn": "Cost increase per frontier model",
    "kaynakTr": "Stanford HAI AI Index 2026",
    "kaynakEn": "Stanford HAI AI Index 2026",
    "levhaKare": true
  },
  {
    "id": "charts-cash-flow-area",
    "tur": "alan",
    "kategori": "EKONOMİ",
    "baslik": "Nakit Akışı Eğrisi",
    "aciklama": "Kurumsal likidite ve serbest nakit girişlerinin dönemsel seyri.",
    "metrik": "₺240.000",
    "degisim": 8.4,
    "degisimEtiket": "geçen çeyreğe göre",
    "tarih": "3. Çeyrek 2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺40.000",
    "kaynak": "BDDK",
    "seri": [
      {
        "etiket": "1. Hafta",
        "deger": 180
      },
      {
        "etiket": "2. Hafta",
        "deger": 195
      },
      {
        "etiket": "3. Hafta",
        "deger": 210
      },
      {
        "etiket": "4. Hafta",
        "deger": 240
      }
    ],
    "mebiusTitle": "Cash Flow Area Chart",
    "exportName": "CashFlowAreaChart",
    "mebiusFile": "cash-flow-area-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-cash-flow-area.webp",
    "kategoriTr": "AB MEVZUATI & AI ACT",
    "kategoriEn": "EU REGULATION & AI ACT",
    "baslikTr": "Açık Kaynak Model İndirme Hacmi",
    "baslikEn": "Open Source Model Download Volume",
    "aciklamaTr": "Hugging Face üzerinde aylık bazda indirilen açık ağırlıklı model ağırlıklarının toplamı.",
    "aciklamaEn": "Total monthly downloads of open-weight artificial intelligence models on Hugging Face.",
    "metrikTr": "1,42 Milyar İndirme",
    "metrikEn": "1.42 Billion Downloads",
    "degisimEtiketTr": "Yıllık indirme artışı",
    "degisimEtiketEn": "Year-over-year download surge",
    "kaynakTr": "Hugging Face Hub Verisi",
    "kaynakEn": "Hugging Face Hub Metrics",
    "levhaKare": true
  },
  {
    "id": "charts-overview",
    "tur": "coklu-karma",
    "kategori": "BORSA",
    "baslik": "Piyasa Genel Görünümü",
    "aciklama": "BIST 100 işlem hacmi (sütun) ve endeks puanı (çizgi) bileşik seyri.",
    "metrik": "10.840 Puan",
    "degisim": 1.2,
    "degisimEtiket": "günlük kapanış",
    "tarih": "30 Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "1.500 puan",
    "kaynak": "Borsa İstanbul",
    "seriler": [
      {
        "etiket": "Pzt",
        "cubuk": 85,
        "cizgi": 10650
      },
      {
        "etiket": "Sal",
        "cubuk": 92,
        "cizgi": 10720
      },
      {
        "etiket": "Çar",
        "cubuk": 78,
        "cizgi": 10690
      },
      {
        "etiket": "Per",
        "cubuk": 105,
        "cizgi": 10810
      },
      {
        "etiket": "Cum",
        "cubuk": 118,
        "cizgi": 10840
      }
    ],
    "mebiusTitle": "Overview Chart",
    "exportName": "OverviewChart",
    "mebiusFile": "overview-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-overview.webp",
    "kategoriTr": "VERİ MERKEZİ & ENERJİ",
    "kategoriEn": "DATA CENTERS & ENERGY",
    "baslikTr": "GPU Küme Büyüklüğü ve İşlem Gücü (FLOPS)",
    "baslikEn": "GPU Cluster Capacity & Compute (FLOPS)",
    "aciklamaTr": "Önde gelen yapay zekâ laboratuvarlarının aktif küme büyüklüğü ve sağlanan hesaplama kapasitesi.",
    "aciklamaEn": "Active cluster capacity and cumulative compute FLOPS deployed across major AI research labs.",
    "metrikTr": "128.000 H100 Eşdeğeri",
    "metrikEn": "128,000 H100 Equivalent",
    "degisimEtiketTr": "Yıllık küme büyümesi",
    "degisimEtiketEn": "Annual cluster expansion",
    "kaynakTr": "Epoch AI Compute Index",
    "kaynakEn": "Epoch AI Compute Index",
    "levhaKare": true
  },
  {
    "id": "charts-price-range",
    "tur": "aralik-bant",
    "kategori": "BORSA",
    "baslik": "Günlük Fiyat Salınım Bandı",
    "aciklama": "BIST Lokomotif hisselerinin gün içi en düşük, en yüksek ve ağırlıklı ortalaması.",
    "metrik": "₺38,40 – ₺44,20",
    "degisim": 3.5,
    "degisimEtiket": "günlük ortalama",
    "tarih": "30 Ekim 2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺10 aralık",
    "kaynak": "Borsa İstanbul",
    "araliklar": [
      {
        "etiket": "THYAO",
        "min": 280,
        "max": 298,
        "mevcut": 294
      },
      {
        "etiket": "TUPRS",
        "min": 165,
        "max": 178,
        "mevcut": 174
      },
      {
        "etiket": "AKBNK",
        "min": 58,
        "max": 64,
        "mevcut": 62.5
      },
      {
        "etiket": "KCHOL",
        "min": 210,
        "max": 226,
        "mevcut": 222
      },
      {
        "etiket": "BIMAS",
        "min": 490,
        "max": 515,
        "mevcut": 508
      }
    ],
    "mebiusTitle": "Price Range Chart",
    "exportName": "PriceRangeChart",
    "mebiusFile": "price-range-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-price-range.webp",
    "kategoriTr": "YAPAY ZEKÂ YATIRIMLARI",
    "kategoriEn": "AI VENTURE & INVESTMENTS",
    "baslikTr": "API Çağrı Maliyet Aralıkları (Milyon Token Başına)",
    "baslikEn": "Inference API Pricing Tiers (Per Million Tokens)",
    "aciklamaTr": "Farklı parametre büyüklüğündeki modeller için girdi ve çıktı token maliyet bantları.",
    "aciklamaEn": "Cost ranges for input and output inference tokens across small, medium, and frontier reasoning models.",
    "metrikTr": "$2,40 / 1M Token",
    "metrikEn": "$2.40 / 1M Tokens",
    "degisimEtiketTr": "Yıllık maliyet düşüşü",
    "degisimEtiketEn": "Year-over-year cost deflation",
    "kaynakTr": "Artificial Analysis Benchmarks",
    "kaynakEn": "Artificial Analysis Benchmarks",
    "levhaKare": true
  },
  {
    "id": "charts-balance",
    "tur": "alan",
    "kategori": "BANKACILIK",
    "baslik": "Mevduat Varlık Bakiyesi",
    "aciklama": "Yurtiçi yerleşiklerin toplam TL mevduat hacmi gelişimi.",
    "metrik": "₺9.420 Mr",
    "degisim": 5.2,
    "degisimEtiket": "aylık artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 7,
    "boncukBirim": "₺1.500 Mr",
    "kaynak": "TCMB",
    "seri": [
      {
        "etiket": "Haz",
        "deger": 8500
      },
      {
        "etiket": "Tem",
        "deger": 8750
      },
      {
        "etiket": "Ağu",
        "deger": 9000
      },
      {
        "etiket": "Eyl",
        "deger": 9250
      },
      {
        "etiket": "Eki",
        "deger": 9420
      }
    ],
    "mebiusTitle": "Balance Chart",
    "exportName": "BalanceChart",
    "mebiusFile": "balance-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-balance.webp",
    "kategoriTr": "AÇIK KAYNAK EKOSİSTEMİ",
    "kategoriEn": "OPEN SOURCE ECOSYSTEM",
    "baslikTr": "Küresel Yapay Zekâ Girişim Sermayesi Yatırımları",
    "baslikEn": "Global AI Venture Capital Inflow",
    "aciklamaTr": "Yapay zekâ altyapısı ve dikey uygulamalara aktarılan toplam risk sermayesi tutarı.",
    "aciklamaEn": "Total venture capital deployed into foundational infrastructure and vertical AI applications.",
    "metrikTr": "$68,4 Milyar",
    "metrikEn": "$68.4 Billion",
    "degisimEtiketTr": "Yıllık sermaye artışı",
    "degisimEtiketEn": "Annual venture growth",
    "kaynakTr": "PitchBook & Dealroom AI Monitor",
    "kaynakEn": "PitchBook & Dealroom AI Monitor",
    "levhaKare": true
  },
  {
    "id": "charts-total-sales",
    "tur": "sutun",
    "kategori": "BORSA",
    "baslik": "İmalat Sanayi Satış Hacmi",
    "aciklama": "BIST sanayi şirketlerinin çeyreklik toplam ciro performansı.",
    "metrik": "₺1.850 Mr",
    "degisim": 14.2,
    "degisimEtiket": "yıllık değişim",
    "tarih": "3. Çeyrek 2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺300 Mr",
    "kaynak": "KAP Verileri",
    "seri": [
      {
        "etiket": "2025/3Ç",
        "deger": 1420
      },
      {
        "etiket": "2025/4Ç",
        "deger": 1580
      },
      {
        "etiket": "2026/1Ç",
        "deger": 1640
      },
      {
        "etiket": "2026/2Ç",
        "deger": 1720
      },
      {
        "etiket": "2026/3Ç",
        "deger": 1850
      }
    ],
    "mebiusTitle": "Total Sales Chart",
    "exportName": "TotalSalesChart",
    "mebiusFile": "total-sales-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-total-sales.webp",
    "kategoriTr": "DİL MODELLERİ & LLM",
    "kategoriEn": "LANGUAGE MODELS & LLM",
    "baslikTr": "Yapay Zekâ Çip Satış Gelirleri",
    "baslikEn": "AI Accelerator Semiconductor Revenues",
    "aciklamaTr": "Yapay zekâ odaklı yarı iletken tasarımcılarının çeyreklik veri merkezi gelirleri.",
    "aciklamaEn": "Quarterly data center chip revenues recorded by leading semiconductor manufacturers.",
    "metrikTr": "$32,6 Milyar",
    "metrikEn": "$32.6 Billion",
    "degisimEtiketTr": "Çeyreklik yıllıklandırılmış büyüme",
    "degisimEtiketEn": "Year-over-year quarterly surge",
    "kaynakTr": "Semiconductor Industry Association (SIA)",
    "kaynakEn": "Semiconductor Industry Association (SIA)",
    "levhaKare": true
  },
  {
    "id": "charts-customer-rate",
    "tur": "nokta-dagilim",
    "kategori": "PİYASALAR",
    "baslik": "Fon Katılımcı Dağılımı",
    "aciklama": "Yatırımcı büyüklük gruplarına göre portföy sahipliği sıklığı.",
    "metrik": "%24,6 Pay",
    "degisim": 3.1,
    "degisimEtiket": "yıllık artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 3,
    "boncukBirim": "%10 pay",
    "kaynak": "TEFAS",
    "noktalar": [
      {
        "x": 10,
        "y": 25
      },
      {
        "x": 20,
        "y": 45
      },
      {
        "x": 30,
        "y": 60
      },
      {
        "x": 40,
        "y": 55
      },
      {
        "x": 50,
        "y": 80
      },
      {
        "x": 60,
        "y": 72
      },
      {
        "x": 70,
        "y": 90
      },
      {
        "x": 80,
        "y": 85
      },
      {
        "x": 90,
        "y": 95
      }
    ],
    "mebiusTitle": "Customer Rate Chart",
    "exportName": "CustomerRateChart",
    "mebiusFile": "customer-rate-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-customer-rate.webp",
    "kategoriTr": "YAPAY ZEKÂ ÇİPLERİ & DONANIM",
    "kategoriEn": "AI CHIPS & HARDWARE",
    "baslikTr": "Model Doğruluğu ve Halüsinasyon Oranı Dağılımı",
    "baslikEn": "Benchmark Accuracy vs Hallucination Rate",
    "aciklamaTr": "Çeşitli akıl yürütme testlerinde doğruluk oranı ile yanlış bilgi üretme sıklığı korelasyonu.",
    "aciklamaEn": "Correlation between benchmark reasoning score and verified factual error frequency.",
    "metrikTr": "%89,2 Doğruluk / %4,1 Yanılgı",
    "metrikEn": "89.2% Accuracy / 4.1% Error",
    "degisimEtiketTr": "Halüsinasyon düşüşü",
    "degisimEtiketEn": "Hallucination reduction",
    "kaynakTr": "SimpleQA & HELM Benchmark",
    "kaynakEn": "SimpleQA & HELM Benchmark",
    "levhaKare": true
  },
  {
    "id": "charts-cumulative-assets-and-liabilities",
    "tur": "yigilmis-sutun",
    "kategori": "BANKACILIK",
    "baslik": "Kümülatif Varlık ve Yükümlülükler",
    "aciklama": "Bankacılık kesimi aktif (mürekkep) ve pasif (gri) dengesi.",
    "metrik": "₺31.250 Mr",
    "degisim": -0.8,
    "degisimEtiket": "net fark",
    "tarih": "Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "₺4.000 Mr",
    "kaynak": "BDDK",
    "gruplar": [
      {
        "etiket": "2023",
        "varlik": 22000,
        "yukumluluk": 21000
      },
      {
        "etiket": "2024",
        "varlik": 26000,
        "yukumluluk": 24800
      },
      {
        "etiket": "2025",
        "varlik": 29500,
        "yukumluluk": 28200
      },
      {
        "etiket": "2026",
        "varlik": 31250,
        "yukumluluk": 29800
      }
    ],
    "mebiusTitle": "Cumulative Assets and Liabilities Chart",
    "exportName": "CumulativeAssetsAndLiabilitiesChart",
    "mebiusFile": "cumulative-assets-and-liabilities-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-cumulative-assets-and-liabilities.webp",
    "kategoriTr": "AB MEVZUATI & AI ACT",
    "kategoriEn": "EU REGULATION & AI ACT",
    "baslikTr": "AB AI Act Uyum Harcamaları ve Güvenlik Bütçesi",
    "baslikEn": "EU AI Act Compliance & Safety Budget Allocation",
    "aciklamaTr": "Avrupa Birliği genelinde yüksek riskli sistemler için yapılan uyum ve güvenlik denetimi yatırımları.",
    "aciklamaEn": "Corporate compliance, auditing, and red-teaming expenditures mandated by the European AI Act.",
    "metrikTr": "€14,8 Milyar",
    "metrikEn": "€14.8 Billion",
    "degisimEtiketTr": "Uyum bütçesi büyümesi",
    "degisimEtiketEn": "Compliance budget surge",
    "kaynakTr": "Avrupa Komisyonu AI Office Raporu",
    "kaynakEn": "European Commission AI Office",
    "levhaKare": true
  },
  {
    "id": "charts-cash-flow-monthly-bar",
    "tur": "sutun",
    "kategori": "KİŞİSEL FİNANS",
    "baslik": "Aylık Net Nakit Akışı",
    "aciklama": "Aylık gelir fazlası ve net birikim kapasitesi gelişimi.",
    "metrik": "₺65.400",
    "degisim": 12,
    "degisimEtiket": "geçen aya göre",
    "tarih": "Ekim 2026",
    "boncukMiktar": 7,
    "boncukBirim": "₺10.000",
    "kaynak": "Finfolis Hesaplama",
    "seri": [
      {
        "etiket": "Haz",
        "deger": 48000
      },
      {
        "etiket": "Tem",
        "deger": 52000
      },
      {
        "etiket": "Ağu",
        "deger": 51500
      },
      {
        "etiket": "Eyl",
        "deger": 58400
      },
      {
        "etiket": "Eki",
        "deger": 65400
      }
    ],
    "mebiusTitle": "Cash Flow Monthly Bar Chart",
    "exportName": "CashFlowMonthlyBarChart",
    "mebiusFile": "cash-flow-monthly-bar-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-cash-flow-monthly-bar.webp",
    "kategoriTr": "VERİ MERKEZİ & ENERJİ",
    "kategoriEn": "DATA CENTERS & ENERGY",
    "baslikTr": "Veri Merkezi Aylık Güç Tüketimi (GW)",
    "baslikEn": "Data Center Monthly Power Demand (GW)",
    "aciklamaTr": "Büyük ölçekli yapay zekâ kümeleme merkezlerinin şebekeden çektiği aylık elektrik yükü.",
    "aciklamaEn": "Monthly baseline grid electricity demand consumed by dedicated hyperscale AI training facilities.",
    "metrikTr": "4,2 Gigawatt",
    "metrikEn": "4.2 Gigawatts",
    "degisimEtiketTr": "Yıllık tüketim artışı",
    "degisimEtiketEn": "Annual capacity expansion",
    "kaynakTr": "Uluslararası Enerji Ajansı (IEA)",
    "kaynakEn": "International Energy Agency (IEA)",
    "levhaKare": true
  },
  {
    "id": "charts-cash-balance",
    "tur": "alan",
    "kategori": "BANKACILIK",
    "baslik": "Serbest Nakit Rezervi",
    "aciklama": "Finansal sistemin gecelik repo ve likidite imkânları bakiyesi.",
    "metrik": "₺185 Mr",
    "degisim": 2.8,
    "degisimEtiket": "haftalık",
    "tarih": "30 Ekim 2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺30 Mr",
    "kaynak": "TCMB",
    "seri": [
      {
        "etiket": "Pzt",
        "deger": 162
      },
      {
        "etiket": "Sal",
        "deger": 170
      },
      {
        "etiket": "Çar",
        "deger": 175
      },
      {
        "etiket": "Per",
        "deger": 180
      },
      {
        "etiket": "Cum",
        "deger": 185
      }
    ],
    "mebiusTitle": "Cash Balance Chart",
    "exportName": "CashBalanceChart",
    "mebiusFile": "cash-balance-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-cash-balance.webp",
    "kategoriTr": "YAPAY ZEKÂ YATIRIMLARI",
    "kategoriEn": "AI VENTURE & INVESTMENTS",
    "baslikTr": "Serbest Nakit Rezervi (YZ Analitiği)",
    "baslikEn": "Cash Balance Chart (AI Analytics)",
    "aciklamaTr": "Finansal sistemin gecelik repo ve likidite imkânları bakiyesi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺185 Mr",
    "metrikEn": "$185 Mr",
    "degisimEtiketTr": "haftalık",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-net-worth",
    "tur": "alan",
    "kategori": "KİŞİSEL FİNANS",
    "baslik": "Net Finansal Değer Eğrisi",
    "aciklama": "Borçlardan arındırılmış net varlık büyüklüğünün 5 yıllık trendi.",
    "metrik": "₺890.000",
    "degisim": 18.5,
    "degisimEtiket": "yıllık net artış",
    "tarih": "2026",
    "boncukMiktar": 9,
    "boncukBirim": "₺100.000",
    "kaynak": "MKK Verileri",
    "seri": [
      {
        "etiket": "2022",
        "deger": 320
      },
      {
        "etiket": "2023",
        "deger": 480
      },
      {
        "etiket": "2024",
        "deger": 620
      },
      {
        "etiket": "2025",
        "deger": 750
      },
      {
        "etiket": "2026",
        "deger": 890
      }
    ],
    "mebiusTitle": "Net Worth Chart",
    "exportName": "NetWorthChart",
    "mebiusFile": "net-worth-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-net-worth.webp",
    "kategoriTr": "AÇIK KAYNAK EKOSİSTEMİ",
    "kategoriEn": "OPEN SOURCE ECOSYSTEM",
    "baslikTr": "Net Finansal Değer Eğrisi (YZ Analitiği)",
    "baslikEn": "Net Worth Chart (AI Analytics)",
    "aciklamaTr": "Borçlardan arındırılmış net varlık büyüklüğünün 5 yıllık trendi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺890.000",
    "metrikEn": "$890.000",
    "degisimEtiketTr": "yıllık net artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-financial-breakdown",
    "tur": "aralik-bant",
    "kategori": "EKONOMİ",
    "baslik": "Gelir Dilimleri Gider Kırılımı",
    "aciklama": "En düşükten en yükseğe hanehalkı harcama sepeti taban-tavan aralıkları.",
    "metrik": "%34 – %62 Gıda Payı",
    "degisim": -1.4,
    "degisimEtiket": "yıllık sapma",
    "tarih": "2026",
    "boncukMiktar": 5,
    "boncukBirim": "%15 dilim",
    "kaynak": "TÜİK Hanehalkı",
    "araliklar": [
      {
        "etiket": "%20 Alt",
        "min": 45,
        "max": 65,
        "mevcut": 58
      },
      {
        "etiket": "%20 II",
        "min": 38,
        "max": 52,
        "mevcut": 46
      },
      {
        "etiket": "%20 III",
        "min": 30,
        "max": 44,
        "mevcut": 37
      },
      {
        "etiket": "%20 IV",
        "min": 22,
        "max": 35,
        "mevcut": 28
      },
      {
        "etiket": "%20 Üst",
        "min": 14,
        "max": 24,
        "mevcut": 18
      }
    ],
    "mebiusTitle": "Financial Breakdown Chart",
    "exportName": "FinancialBreakdownChart",
    "mebiusFile": "financial-breakdown-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-financial-breakdown.webp",
    "kategoriTr": "DİL MODELLERİ & LLM",
    "kategoriEn": "LANGUAGE MODELS & LLM",
    "baslikTr": "Gelir Dilimleri Gider Kırılımı (YZ Analitiği)",
    "baslikEn": "Financial Breakdown Chart (AI Analytics)",
    "aciklamaTr": "En düşükten en yükseğe hanehalkı harcama sepeti taban-tavan aralıkları. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "%34 – %62 Gıda Payı",
    "metrikEn": "%34 – %62 Gıda Payı",
    "degisimEtiketTr": "yıllık sapma",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-finance-overview-area",
    "tur": "alan",
    "kategori": "EKONOMİ",
    "baslik": "Finansal Denge Alanı",
    "aciklama": "Merkezi yönetim bütçe açığının GSYH'ye oranı eğilimi.",
    "metrik": "%3,1 / GSYH",
    "degisim": 0.4,
    "degisimEtiket": "iyileşme yönünde",
    "tarih": "3. Çeyrek 2026",
    "boncukMiktar": 3,
    "boncukBirim": "%1 GSYH",
    "kaynak": "Hazine ve Maliye Bakanlığı",
    "seri": [
      {
        "etiket": "2024/4Ç",
        "deger": 4.8
      },
      {
        "etiket": "2025/2Ç",
        "deger": 4.2
      },
      {
        "etiket": "2025/4Ç",
        "deger": 3.8
      },
      {
        "etiket": "2026/2Ç",
        "deger": 3.4
      },
      {
        "etiket": "2026/3Ç",
        "deger": 3.1
      }
    ],
    "mebiusTitle": "Finance Overview Area Chart",
    "exportName": "FinanceOverviewAreaChart",
    "mebiusFile": "finance-overview-area-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-finance-overview-area.webp",
    "kategoriTr": "YAPAY ZEKÂ ÇİPLERİ & DONANIM",
    "kategoriEn": "AI CHIPS & HARDWARE",
    "baslikTr": "Finansal Denge Alanı (YZ Analitiği)",
    "baslikEn": "Finance Overview Area Chart (AI Analytics)",
    "aciklamaTr": "Merkezi yönetim bütçe açığının GSYH'ye oranı eğilimi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "%3,1 / GSYH",
    "metrikEn": "%3,1 / GSYH",
    "degisimEtiketTr": "iyileşme yönünde",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-total-balance",
    "tur": "sutun",
    "kategori": "BANKACILIK",
    "baslik": "Konsolide Kredi Hacmi",
    "aciklama": "Ticari ve tüketici kredilerinin toplam büyüme eğilimi.",
    "metrik": "₺16.480 Mr",
    "degisim": 9.3,
    "degisimEtiket": "çeyreklik artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "₺2.000 Mr",
    "kaynak": "BDDK",
    "seri": [
      {
        "etiket": "Oca",
        "deger": 13200
      },
      {
        "etiket": "Mar",
        "deger": 13900
      },
      {
        "etiket": "May",
        "deger": 14600
      },
      {
        "etiket": "Tem",
        "deger": 15400
      },
      {
        "etiket": "Eki",
        "deger": 16480
      }
    ],
    "mebiusTitle": "Total Balance Chart",
    "exportName": "TotalBalanceChart",
    "mebiusFile": "total-balance-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-total-balance.webp",
    "kategoriTr": "AB MEVZUATI & AI ACT",
    "kategoriEn": "EU REGULATION & AI ACT",
    "baslikTr": "Konsolide Kredi Hacmi (YZ Analitiği)",
    "baslikEn": "Total Balance Chart (AI Analytics)",
    "aciklamaTr": "Ticari ve tüketici kredilerinin toplam büyüme eğilimi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺16.480 Mr",
    "metrikEn": "$16.480 Mr",
    "degisimEtiketTr": "çeyreklik artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-budget",
    "tur": "sutun",
    "kategori": "EKONOMİ",
    "baslik": "Bütçe Hedef Gerçekleşmesi",
    "aciklama": "Hedeflenen kamu harcamaları ile gerçekleşen tutarların karşılaştırması.",
    "metrik": "%88,4 Oran",
    "degisim": -3.2,
    "degisimEtiket": "sapma",
    "tarih": "Ocak-Ekim 2026",
    "boncukMiktar": 9,
    "boncukBirim": "%10 hedef",
    "kaynak": "Hazine",
    "seri": [
      {
        "etiket": "Personel",
        "deger": 94
      },
      {
        "etiket": "Yatırım",
        "deger": 82
      },
      {
        "etiket": "Cari Transfer",
        "deger": 89
      },
      {
        "etiket": "Faiz",
        "deger": 86
      }
    ],
    "mebiusTitle": "Budget Chart",
    "exportName": "BudgetChart",
    "mebiusFile": "budget-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-budget.webp",
    "kategoriTr": "VERİ MERKEZİ & ENERJİ",
    "kategoriEn": "DATA CENTERS & ENERGY",
    "baslikTr": "Bütçe Hedef Gerçekleşmesi (YZ Analitiği)",
    "baslikEn": "Budget Chart (AI Analytics)",
    "aciklamaTr": "Hedeflenen kamu harcamaları ile gerçekleşen tutarların karşılaştırması. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "%88,4 Oran",
    "metrikEn": "%88,4 Oran",
    "degisimEtiketTr": "sapma",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-investment-performance",
    "tur": "coklu-karma",
    "kategori": "PİYASALAR",
    "baslik": "Fon Türleri Yıllık Getirisi",
    "aciklama": "Hisse senedi, altın ve para piyasası fonlarının yıllık reel getirisi.",
    "metrik": "▲ %54,2 Zirve",
    "degisim": 5.8,
    "degisimEtiket": "aylık ilave",
    "tarih": "Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "%10 getiri",
    "kaynak": "TEFAS",
    "seriler": [
      {
        "etiket": "Hisse Fonu",
        "cubuk": 54.2,
        "cizgi": 48
      },
      {
        "etiket": "Altın Fonu",
        "cubuk": 46.8,
        "cizgi": 42.5
      },
      {
        "etiket": "Eurobond",
        "cubuk": 38,
        "cizgi": 35
      },
      {
        "etiket": "Para Piyasası",
        "cubuk": 48.5,
        "cizgi": 47
      }
    ],
    "mebiusTitle": "Investment Performance Chart",
    "exportName": "InvestmentPerformanceChart",
    "mebiusFile": "investment-performance-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-investment-performance.webp",
    "kategoriTr": "YAPAY ZEKÂ YATIRIMLARI",
    "kategoriEn": "AI VENTURE & INVESTMENTS",
    "baslikTr": "Fon Türleri Yıllık Getirisi (YZ Analitiği)",
    "baslikEn": "Investment Performance Chart (AI Analytics)",
    "aciklamaTr": "Hisse senedi, altın ve para piyasası fonlarının yıllık reel getirisi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "▲ %54,2 Zirve",
    "metrikEn": "▲ %54,2 Zirve",
    "degisimEtiketTr": "aylık ilave",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-financial-trends",
    "tur": "alan",
    "kategori": "EKONOMİ",
    "baslik": "Ekonomik Güven Endeksi",
    "aciklama": "Tüketici, reel kesim ve hizmet sektörü bileşik güven eğilimi.",
    "metrik": "98,4 Puan",
    "degisim": 2.4,
    "degisimEtiket": "aylık toparlanma",
    "tarih": "Ekim 2026",
    "boncukMiktar": 7,
    "boncukBirim": "15 puan",
    "kaynak": "TÜİK",
    "seri": [
      {
        "etiket": "May",
        "deger": 92.4
      },
      {
        "etiket": "Haz",
        "deger": 93.8
      },
      {
        "etiket": "Tem",
        "deger": 95.1
      },
      {
        "etiket": "Ağu",
        "deger": 96
      },
      {
        "etiket": "Eyl",
        "deger": 97.2
      },
      {
        "etiket": "Eki",
        "deger": 98.4
      }
    ],
    "mebiusTitle": "Financial Trends Chart",
    "exportName": "FinancialTrendsChart",
    "mebiusFile": "financial-trends-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-financial-trends.webp",
    "kategoriTr": "AÇIK KAYNAK EKOSİSTEMİ",
    "kategoriEn": "OPEN SOURCE ECOSYSTEM",
    "baslikTr": "Ekonomik Güven Endeksi (YZ Analitiği)",
    "baslikEn": "Financial Trends Chart (AI Analytics)",
    "aciklamaTr": "Tüketici, reel kesim ve hizmet sektörü bileşik güven eğilimi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "98,4 Puan",
    "metrikEn": "98,4 Puan",
    "degisimEtiketTr": "aylık toparlanma",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-analytics",
    "tur": "coklu-karma",
    "kategori": "BORSA",
    "baslik": "Sektör Volatilite ve Likidite Endeksi",
    "aciklama": "Hisselerin dalgalanma katsayısı ve takas yoğunluğu endeksi.",
    "metrik": "14,8 Endeks",
    "degisim": -4.1,
    "degisimEtiket": "volatilite azalışı",
    "tarih": "Ekim 2026",
    "boncukMiktar": 5,
    "boncukBirim": "3 endeks",
    "kaynak": "Borsa İstanbul",
    "seriler": [
      {
        "etiket": "Banka",
        "cubuk": 18.2,
        "cizgi": 16
      },
      {
        "etiket": "Sanayi",
        "cubuk": 12.4,
        "cizgi": 11.5
      },
      {
        "etiket": "Hizmet",
        "cubuk": 14,
        "cizgi": 13.2
      },
      {
        "etiket": "Teknoloji",
        "cubuk": 22.5,
        "cizgi": 20.1
      }
    ],
    "mebiusTitle": "Analytics Chart",
    "exportName": "AnalyticsChart",
    "mebiusFile": "analytics-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-analytics.webp",
    "kategoriTr": "DİL MODELLERİ & LLM",
    "kategoriEn": "LANGUAGE MODELS & LLM",
    "baslikTr": "Sektör Volatilite ve Likidite Endeksi (YZ Analitiği)",
    "baslikEn": "Analytics Chart (AI Analytics)",
    "aciklamaTr": "Hisselerin dalgalanma katsayısı ve takas yoğunluğu endeksi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "14,8 Endeks",
    "metrikEn": "14,8 Endeks",
    "degisimEtiketTr": "volatilite azalışı",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-cash-flow-daily-bar",
    "tur": "sutun",
    "kategori": "PİYASALAR",
    "baslik": "Günlük Net Fon Akımı",
    "aciklama": "BIST ve DİBS piyasasına günlük yabancı ve yerleşik fon giriş-çıkışı.",
    "metrik": "+₺4,2 Mr",
    "degisim": 6.1,
    "degisimEtiket": "günlük net giriş",
    "tarih": "30 Ekim 2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺1 Mr",
    "kaynak": "TCMB EVDS",
    "seri": [
      {
        "etiket": "Pzt",
        "deger": 2.1
      },
      {
        "etiket": "Sal",
        "deger": 1.8
      },
      {
        "etiket": "Çar",
        "deger": 3.4
      },
      {
        "etiket": "Per",
        "deger": 2.9
      },
      {
        "etiket": "Cum",
        "deger": 4.2
      }
    ],
    "mebiusTitle": "Cash Flow Daily Bar Chart",
    "exportName": "CashFlowDailyBarChart",
    "mebiusFile": "cash-flow-daily-bar-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-cash-flow-daily-bar.webp",
    "kategoriTr": "YAPAY ZEKÂ ÇİPLERİ & DONANIM",
    "kategoriEn": "AI CHIPS & HARDWARE",
    "baslikTr": "Günlük Net Fon Akımı (YZ Analitiği)",
    "baslikEn": "Cash Flow Daily Bar Chart (AI Analytics)",
    "aciklamaTr": "BIST ve DİBS piyasasına günlük yabancı ve yerleşik fon giriş-çıkışı. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "+₺4,2 Mr",
    "metrikEn": "+$4,2 Mr",
    "degisimEtiketTr": "günlük net giriş",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-spending-overview-range",
    "tur": "aralik-bant",
    "kategori": "KİŞİSEL FİNANS",
    "baslik": "Kartlı Harcama Salınım Aralığı",
    "aciklama": "Haftalık kredi kartı işlem tutarlarının mevsimsel bant aralığı.",
    "metrik": "₺14 Mr – ₺22 Mr",
    "degisim": -1.8,
    "degisimEtiket": "haftalık",
    "tarih": "Ekim 2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺3 Mr",
    "kaynak": "BKM Verileri",
    "araliklar": [
      {
        "etiket": "1. Hf",
        "min": 14.5,
        "max": 18.2,
        "mevcut": 16.4
      },
      {
        "etiket": "2. Hf",
        "min": 15,
        "max": 19.5,
        "mevcut": 17.8
      },
      {
        "etiket": "3. Hf",
        "min": 16.2,
        "max": 20.8,
        "mevcut": 18.5
      },
      {
        "etiket": "4. Hf",
        "min": 17,
        "max": 22,
        "mevcut": 20.1
      }
    ],
    "mebiusTitle": "Spending Overview Range Chart",
    "exportName": "SpendingOverviewRangeChart",
    "mebiusFile": "spending-overview-range-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-spending-overview-range.webp",
    "kategoriTr": "AB MEVZUATI & AI ACT",
    "kategoriEn": "EU REGULATION & AI ACT",
    "baslikTr": "Kartlı Harcama Salınım Aralığı (YZ Analitiği)",
    "baslikEn": "Spending Overview Range Chart (AI Analytics)",
    "aciklamaTr": "Haftalık kredi kartı işlem tutarlarının mevsimsel bant aralığı. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺14 Mr – ₺22 Mr",
    "metrikEn": "$14 Mr – ₺22 Mr",
    "degisimEtiketTr": "haftalık",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-budget-overview",
    "tur": "sutun",
    "kategori": "EKONOMİ",
    "baslik": "Kamu Harcama Kalemleri Dağılımı",
    "aciklama": "Yıllık bütçe harcamalarında en büyük paya sahip 5 temel alan.",
    "metrik": "₺4.850 Mr",
    "degisim": 4.5,
    "degisimEtiket": "gerçekleşme",
    "tarih": "2026",
    "boncukMiktar": 7,
    "boncukBirim": "₺700 Mr",
    "kaynak": "Hazine",
    "seri": [
      {
        "etiket": "Eğitim",
        "deger": 1280
      },
      {
        "etiket": "Sağlık",
        "deger": 1050
      },
      {
        "etiket": "Sosyal Güvenlik",
        "deger": 1420
      },
      {
        "etiket": "Ulaştırma",
        "deger": 650
      },
      {
        "etiket": "Tarım Destek",
        "deger": 450
      }
    ],
    "mebiusTitle": "Budget Overview Chart",
    "exportName": "BudgetOverviewChart",
    "mebiusFile": "budget-overview-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-budget-overview.webp",
    "kategoriTr": "VERİ MERKEZİ & ENERJİ",
    "kategoriEn": "DATA CENTERS & ENERGY",
    "baslikTr": "Kamu Harcama Kalemleri Dağılımı (YZ Analitiği)",
    "baslikEn": "Budget Overview Chart (AI Analytics)",
    "aciklamaTr": "Yıllık bütçe harcamalarında en büyük paya sahip 5 temel alan. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺4.850 Mr",
    "metrikEn": "$4.850 Mr",
    "degisimEtiketTr": "gerçekleşme",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-sales-target",
    "tur": "radyal-hedef",
    "kategori": "EKONOMİ",
    "baslik": "Yıllık İhracat Hedef Gerçekleşmesi",
    "aciklama": "OVP 2026 ihracat hedefi karşısında gerçekleşen kümülatif tutar.",
    "metrik": "%92,8 Hedef",
    "degisim": 7.2,
    "degisimEtiket": "yıllık artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 9,
    "boncukBirim": "%10 gerçekleşme",
    "kaynak": "Ticaret Bakanlığı & TİM",
    "oran": 92.8,
    "hedef": 100,
    "mebiusTitle": "Sales Target Chart",
    "exportName": "SalesTargetChart",
    "mebiusFile": "sales-target-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-sales-target.webp",
    "kategoriTr": "YAPAY ZEKÂ YATIRIMLARI",
    "kategoriEn": "AI VENTURE & INVESTMENTS",
    "baslikTr": "Yıllık İhracat Hedef Gerçekleşmesi (YZ Analitiği)",
    "baslikEn": "Sales Target Chart (AI Analytics)",
    "aciklamaTr": "OVP 2026 ihracat hedefi karşısında gerçekleşen kümülatif tutar. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "%92,8 Hedef",
    "metrikEn": "%92,8 Hedef",
    "degisimEtiketTr": "yıllık artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-your-asset",
    "tur": "halka-pay",
    "kategori": "PİYASALAR",
    "baslik": "Örnek Dengeli Portföy Dağılımı",
    "aciklama": "Orta vadeli dengeli varlık dağılım modelinde pay oranları.",
    "metrik": "₺500.000 Model",
    "degisim": 11.4,
    "degisimEtiket": "yıllık getiri",
    "tarih": "Ekim 2026",
    "boncukMiktar": 5,
    "boncukBirim": "₺100.000",
    "kaynak": "Finfolis Analiz",
    "dilimler": [
      {
        "ad": "BIST Hisse Senedi",
        "oran": 35,
        "renk": "yesil"
      },
      {
        "ad": "Altın & Kıymetli Maden",
        "oran": 25,
        "renk": "koyuyesil"
      },
      {
        "ad": "Kısa Vadeli Bono/Mevduat",
        "oran": 25,
        "renk": "acikyesil"
      },
      {
        "ad": "Eurobond / Döviz",
        "oran": 15,
        "renk": "murekkep"
      }
    ],
    "mebiusTitle": "Your Asset Chart",
    "exportName": "YourAssetChart",
    "mebiusFile": "your-asset-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-your-asset.webp",
    "kategoriTr": "AÇIK KAYNAK EKOSİSTEMİ",
    "kategoriEn": "OPEN SOURCE ECOSYSTEM",
    "baslikTr": "Örnek Dengeli Portföy Dağılımı (YZ Analitiği)",
    "baslikEn": "Your Asset Chart (AI Analytics)",
    "aciklamaTr": "Orta vadeli dengeli varlık dağılım modelinde pay oranları. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺500.000 Model",
    "metrikEn": "$500.000 Model",
    "degisimEtiketTr": "yıllık getiri",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-budget-plan",
    "tur": "akis-selale",
    "kategori": "KİŞİSEL FİNANS",
    "baslik": "Bütçe ve Tasarruf Akışı",
    "aciklama": "Net gelirden zorunlu giderler ve birikim ayrıldıktan sonraki serbest bakiye.",
    "metrik": "₺18.500 Net",
    "degisim": 15,
    "degisimEtiket": "tasarruf oranı",
    "tarih": "Ekim 2026",
    "boncukMiktar": 4,
    "boncukBirim": "₺5.000",
    "kaynak": "Finfolis Tasarruf",
    "adimlari": [
      {
        "ad": "Toplam Gelir",
        "deger": 60000,
        "tur": "artis"
      },
      {
        "ad": "Kira & Konut",
        "deger": -22000,
        "tur": "azalis"
      },
      {
        "ad": "Temel Giderler",
        "deger": -14000,
        "tur": "azalis"
      },
      {
        "ad": "Bireysel Emeklilik",
        "deger": -5500,
        "tur": "azalis"
      },
      {
        "ad": "Kalan Tasarruf",
        "deger": 18500,
        "tur": "net"
      }
    ],
    "mebiusTitle": "Budget Plan Chart",
    "exportName": "BudgetPlanChart",
    "mebiusFile": "budget-plan-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-budget-plan.webp",
    "kategoriTr": "DİL MODELLERİ & LLM",
    "kategoriEn": "LANGUAGE MODELS & LLM",
    "baslikTr": "Bütçe ve Tasarruf Akışı (YZ Analitiği)",
    "baslikEn": "Budget Plan Chart (AI Analytics)",
    "aciklamaTr": "Net gelirden zorunlu giderler ve birikim ayrıldıktan sonraki serbest bakiye. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺18.500 Net",
    "metrikEn": "$18.500 Net",
    "degisimEtiketTr": "tasarruf oranı",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-spending-overview-cylinder",
    "tur": "sutun",
    "kategori": "KİŞİSEL FİNANS",
    "baslik": "Kategori Bazlı Harcama Yoğunluğu",
    "aciklama": "Aylık kartlı harcamalarda en yoğun işlem adedine sahip sektörler.",
    "metrik": "142 İşlem",
    "degisim": -3.4,
    "degisimEtiket": "geçen aya göre",
    "tarih": "Ekim 2026",
    "boncukMiktar": 7,
    "boncukBirim": "20 işlem",
    "kaynak": "BKM",
    "seri": [
      {
        "etiket": "Market",
        "deger": 58
      },
      {
        "etiket": "Yemek",
        "deger": 34
      },
      {
        "etiket": "Yakıt",
        "deger": 22
      },
      {
        "etiket": "Giyim",
        "deger": 16
      },
      {
        "etiket": "Kültür",
        "deger": 12
      }
    ],
    "mebiusTitle": "Spending Overview Cylinder Chart",
    "exportName": "SpendingOverviewCylinderChart",
    "mebiusFile": "spending-overview-cylinder-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-spending-overview-cylinder.webp",
    "kategoriTr": "YAPAY ZEKÂ ÇİPLERİ & DONANIM",
    "kategoriEn": "AI CHIPS & HARDWARE",
    "baslikTr": "Kategori Bazlı Harcama Yoğunluğu (YZ Analitiği)",
    "baslikEn": "Spending Overview Cylinder Chart (AI Analytics)",
    "aciklamaTr": "Aylık kartlı harcamalarda en yoğun işlem adedine sahip sektörler. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "142 İşlem",
    "metrikEn": "142 İşlem",
    "degisimEtiketTr": "geçen aya göre",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-budget-health",
    "tur": "radyal-hedef",
    "kategori": "BANKACILIK",
    "baslik": "Finansal Sağlık Skoru",
    "aciklama": "Borçluluk, likidite tamponu ve düzenli birikim kriterlerine göre genel skor.",
    "metrik": "84 / 100",
    "degisim": 4,
    "degisimEtiket": "puan artışı",
    "tarih": "Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "10 puan",
    "kaynak": "BDDK & Finfolis",
    "oran": 84,
    "hedef": 100,
    "mebiusTitle": "Budget Health Chart",
    "exportName": "BudgetHealthChart",
    "mebiusFile": "budget-health-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-budget-health.webp",
    "kategoriTr": "AB MEVZUATI & AI ACT",
    "kategoriEn": "EU REGULATION & AI ACT",
    "baslikTr": "Finansal Sağlık Skoru (YZ Analitiği)",
    "baslikEn": "Budget Health Chart (AI Analytics)",
    "aciklamaTr": "Borçluluk, likidite tamponu ve düzenli birikim kriterlerine göre genel skor. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "84 / 100",
    "metrikEn": "84 / 100",
    "degisimEtiketTr": "puan artışı",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-category-breakdown",
    "tur": "halka-pay",
    "kategori": "BANKACILIK",
    "baslik": "Sektörel Kredi Dağılımı",
    "aciklama": "Bankacılık sektöründe ticari kredilerin sektör bazında payı.",
    "metrik": "₺11.200 Mr",
    "degisim": 8.9,
    "degisimEtiket": "yıllık kredi büyümesi",
    "tarih": "Ekim 2026",
    "boncukMiktar": 7,
    "boncukBirim": "₺1.500 Mr",
    "kaynak": "BDDK",
    "dilimler": [
      {
        "ad": "İmalat Sanayi",
        "oran": 32,
        "renk": "yesil"
      },
      {
        "ad": "Toptan & Perakende",
        "oran": 24,
        "renk": "koyuyesil"
      },
      {
        "ad": "İnşaat",
        "oran": 18,
        "renk": "acikyesil"
      },
      {
        "ad": "Enerji",
        "oran": 14,
        "renk": "murekkep"
      },
      {
        "ad": "Turizm & Diğer",
        "oran": 12,
        "renk": "gri"
      }
    ],
    "mebiusTitle": "Category Breakdown Chart",
    "exportName": "CategoryBreakdownChart",
    "mebiusFile": "category-breakdown-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-category-breakdown.webp",
    "kategoriTr": "VERİ MERKEZİ & ENERJİ",
    "kategoriEn": "DATA CENTERS & ENERGY",
    "baslikTr": "Sektörel Kredi Dağılımı (YZ Analitiği)",
    "baslikEn": "Category Breakdown Chart (AI Analytics)",
    "aciklamaTr": "Bankacılık sektöründe ticari kredilerin sektör bazında payı. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺11.200 Mr",
    "metrikEn": "$11.200 Mr",
    "degisimEtiketTr": "yıllık kredi büyümesi",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-finance-overview-flow",
    "tur": "akis-selale",
    "kategori": "PİYASALAR",
    "baslik": "Merkez Bankası Rezerv Akışı",
    "aciklama": "Brüt rezervlerdeki döviz alımı, ihracat bedeli ve kamu çıkışlarının dengesi.",
    "metrik": "+$4,8 Mr Net",
    "degisim": 14.5,
    "degisimEtiket": "haftalık net değişim",
    "tarih": "30 Ekim 2026",
    "boncukMiktar": 6,
    "boncukBirim": "$1 Mr",
    "kaynak": "TCMB",
    "adimlari": [
      {
        "ad": "Önceki Rezerv",
        "deger": 152,
        "tur": "artis"
      },
      {
        "ad": "Reeskont Kredisi",
        "deger": 3.8,
        "tur": "artis"
      },
      {
        "ad": "Piyasa Alımı",
        "deger": 2.5,
        "tur": "artis"
      },
      {
        "ad": "Dış Borç Ödemesi",
        "deger": -1.5,
        "tur": "azalis"
      },
      {
        "ad": "Güncel Rezerv",
        "deger": 156.8,
        "tur": "net"
      }
    ],
    "mebiusTitle": "Finance Overview Flow Chart",
    "exportName": "FinanceOverviewFlowChart",
    "mebiusFile": "finance-overview-flow-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-finance-overview-flow.webp",
    "kategoriTr": "YAPAY ZEKÂ YATIRIMLARI",
    "kategoriEn": "AI VENTURE & INVESTMENTS",
    "baslikTr": "Merkez Bankası Rezerv Akışı (YZ Analitiği)",
    "baslikEn": "Finance Overview Flow Chart (AI Analytics)",
    "aciklamaTr": "Brüt rezervlerdeki döviz alımı, ihracat bedeli ve kamu çıkışlarının dengesi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "+$4,8 Mr Net",
    "metrikEn": "+$4,8 Mr Net",
    "degisimEtiketTr": "haftalık net değişim",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-value-locked",
    "tur": "alan",
    "kategori": "BANKACILIK",
    "baslik": "KKM Toplam Kilitli Bakiye",
    "aciklama": "Kur Korumalı Mevduat hesaplarından standart TL mevduata geçiş eğrisi.",
    "metrik": "₺840 Mr",
    "degisim": -12.4,
    "degisimEtiket": "aylık çıkış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "₺100 Mr",
    "kaynak": "BDDK",
    "seri": [
      {
        "etiket": "Haz",
        "deger": 1650
      },
      {
        "etiket": "Tem",
        "deger": 1420
      },
      {
        "etiket": "Ağu",
        "deger": 1180
      },
      {
        "etiket": "Eyl",
        "deger": 980
      },
      {
        "etiket": "Eki",
        "deger": 840
      }
    ],
    "mebiusTitle": "Value Locked Chart",
    "exportName": "ValueLockedChart",
    "mebiusFile": "value-locked-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-value-locked.webp",
    "kategoriTr": "AÇIK KAYNAK EKOSİSTEMİ",
    "kategoriEn": "OPEN SOURCE ECOSYSTEM",
    "baslikTr": "KKM Toplam Kilitli Bakiye (YZ Analitiği)",
    "baslikEn": "Value Locked Chart (AI Analytics)",
    "aciklamaTr": "Kur Korumalı Mevduat hesaplarından standart TL mevduata geçiş eğrisi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺840 Mr",
    "metrikEn": "$840 Mr",
    "degisimEtiketTr": "aylık çıkış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-saving-progress",
    "tur": "radyal-hedef",
    "kategori": "KİŞİSEL FİNANS",
    "baslik": "Yıllık Birikim Hedefi İlerlemesi",
    "aciklama": "Hedeflenen 6 aylık acil durum fonu oluşturma hedefinde ulaşılan seviye.",
    "metrik": "%78,5 Seviye",
    "degisim": 6.2,
    "degisimEtiket": "aylık ilerleme",
    "tarih": "Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "%10 birikim",
    "kaynak": "Finfolis",
    "oran": 78.5,
    "hedef": 100,
    "mebiusTitle": "Saving Progress Chart",
    "exportName": "SavingProgressChart",
    "mebiusFile": "saving-progress-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-saving-progress.webp",
    "kategoriTr": "DİL MODELLERİ & LLM",
    "kategoriEn": "LANGUAGE MODELS & LLM",
    "baslikTr": "Yıllık Birikim Hedefi İlerlemesi (YZ Analitiği)",
    "baslikEn": "Saving Progress Chart (AI Analytics)",
    "aciklamaTr": "Hedeflenen 6 aylık acil durum fonu oluşturma hedefinde ulaşılan seviye. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "%78,5 Seviye",
    "metrikEn": "%78,5 Seviye",
    "degisimEtiketTr": "aylık ilerleme",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-finance-overview-diverging-bar",
    "tur": "ayrisan-cubuk",
    "kategori": "EKONOMİ",
    "baslik": "Dış Ticaret Net Denge Ayrışması",
    "aciklama": "Ana sektör gruplarında ihracat-ithalat farkı (fazla: yeşil, açık: kırmızı).",
    "metrik": "-$3,4 Mr Açık",
    "degisim": 18.2,
    "degisimEtiket": "açıkta daralma",
    "tarih": "Eylül 2026",
    "boncukMiktar": 4,
    "boncukBirim": "$1 Mr denge",
    "kaynak": "TÜİK",
    "mebiusTitle": "Finance Overview Diverging Bar Chart",
    "exportName": "FinanceOverviewDivergingBarChart",
    "mebiusFile": "charts-finance-overview-diverging-bar.tsx",
    "previewImage": "charts-finance-overview-diverging-bar.webp",
    "seri": [
      {
        "etiket": "Tarım",
        "deger": 1.2
      },
      {
        "etiket": "Tekstil",
        "deger": 2.4
      },
      {
        "etiket": "Otomotiv",
        "deger": 1.8
      },
      {
        "etiket": "Kimya",
        "deger": -3.8
      },
      {
        "etiket": "Enerji",
        "deger": -5
      }
    ],
    "kategoriTr": "YAPAY ZEKÂ ÇİPLERİ & DONANIM",
    "kategoriEn": "AI CHIPS & HARDWARE",
    "baslikTr": "Dış Ticaret Net Denge Ayrışması (YZ Analitiği)",
    "baslikEn": "Finance Overview Diverging Bar Chart (AI Analytics)",
    "aciklamaTr": "Ana sektör gruplarında ihracat-ithalat farkı (fazla: yeşil, açık: kırmızı). Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "-$3,4 Mr Açık",
    "metrikEn": "-$3,4 Mr Açık",
    "degisimEtiketTr": "açıkta daralma",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-budget-allocation",
    "tur": "halka-pay",
    "kategori": "EKONOMİ",
    "baslik": "Kamu Yatırım Ödenekleri",
    "aciklama": "Sektörel kamu yatırım tahsisatında öncelikli alanların payları.",
    "metrik": "₺1.240 Mr",
    "degisim": 5.1,
    "degisimEtiket": "yıllık artış",
    "tarih": "2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺200 Mr",
    "kaynak": "Strateji ve Bütçe Başkanlığı",
    "mebiusTitle": "Budget Allocation Chart",
    "exportName": "BudgetAllocationChart",
    "mebiusFile": "charts-budget-allocation.tsx",
    "previewImage": "charts-budget-allocation.webp",
    "dilimler": [
      {
        "ad": "Demiryolu & Lojistik",
        "oran": 30,
        "renk": "yesil"
      },
      {
        "ad": "Sulama & Tarım",
        "oran": 24,
        "renk": "koyuyesil"
      },
      {
        "ad": "Eğitim Altyapısı",
        "oran": 20,
        "renk": "acikyesil"
      },
      {
        "ad": "Sağlık Tesisleri",
        "oran": 16,
        "renk": "murekkep"
      },
      {
        "ad": "Teknoloji & AR-GE",
        "oran": 10,
        "renk": "gri"
      }
    ],
    "kategoriTr": "AB MEVZUATI & AI ACT",
    "kategoriEn": "EU REGULATION & AI ACT",
    "baslikTr": "Kamu Yatırım Ödenekleri (YZ Analitiği)",
    "baslikEn": "Budget Allocation Chart (AI Analytics)",
    "aciklamaTr": "Sektörel kamu yatırım tahsisatında öncelikli alanların payları. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺1.240 Mr",
    "metrikEn": "$1.240 Mr",
    "degisimEtiketTr": "yıllık artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-asset-overview-radial",
    "tur": "radyal-hedef",
    "kategori": "PİYASALAR",
    "baslik": "Portföy Verimlilik Oranı",
    "aciklama": "Piyasa karşılaştırma ölçütüne (benchmark) göre sağlanan göreli getiri.",
    "metrik": "%82 Verim",
    "degisim": 3.4,
    "degisimEtiket": "çeyreklik artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "%10 verim",
    "kaynak": "TEFAS",
    "mebiusTitle": "Asset Overview Radial Chart",
    "exportName": "AssetOverviewRadialChart",
    "mebiusFile": "charts-asset-overview-radial.tsx",
    "previewImage": "charts-asset-overview-radial.webp",
    "oran": 82,
    "hedef": 100,
    "kategoriTr": "VERİ MERKEZİ & ENERJİ",
    "kategoriEn": "DATA CENTERS & ENERGY",
    "baslikTr": "Portföy Verimlilik Oranı (YZ Analitiği)",
    "baslikEn": "Asset Overview Radial Chart (AI Analytics)",
    "aciklamaTr": "Piyasa karşılaştırma ölçütüne (benchmark) göre sağlanan göreli getiri. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "%82 Verim",
    "metrikEn": "%82 Verim",
    "degisimEtiketTr": "çeyreklik artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-options-portfolio",
    "tur": "ayrisan-cubuk",
    "kategori": "BORSA",
    "baslik": "VİOP Korunma (Hedge) Kâr-Zarar Payoff",
    "aciklama": "Farklı endeks seviyelerinde opsiyon portföyünün simüle edilen net getirisi.",
    "metrik": "+₺42.500 Net",
    "degisim": 9.1,
    "degisimEtiket": "simülasyon getirisi",
    "tarih": "Vade: Aralık 2026",
    "boncukMiktar": 7,
    "boncukBirim": "₺6.000",
    "kaynak": "Borsa İstanbul VİOP",
    "mebiusTitle": "Options Portfolio Chart",
    "exportName": "OptionsPortfolioChart",
    "mebiusFile": "charts-options-portfolio.tsx",
    "previewImage": "charts-options-portfolio.webp",
    "seri": [
      {
        "etiket": "9.500",
        "deger": -18
      },
      {
        "etiket": "10.000",
        "deger": -4
      },
      {
        "etiket": "10.500",
        "deger": 8.5
      },
      {
        "etiket": "11.000",
        "deger": 22
      },
      {
        "etiket": "11.500",
        "deger": 42.5
      }
    ],
    "kategoriTr": "YAPAY ZEKÂ YATIRIMLARI",
    "kategoriEn": "AI VENTURE & INVESTMENTS",
    "baslikTr": "VİOP Korunma (Hedge) Kâr-Zarar Payoff (YZ Analitiği)",
    "baslikEn": "Options Portfolio Chart (AI Analytics)",
    "aciklamaTr": "Farklı endeks seviyelerinde opsiyon portföyünün simüle edilen net getirisi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "+₺42.500 Net",
    "metrikEn": "+$42.500 Net",
    "degisimEtiketTr": "simülasyon getirisi",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-revenue-growth",
    "tur": "alan",
    "kategori": "BORSA",
    "baslik": "Reel Hasılat Büyüme Oranı",
    "aciklama": "Enflasyondan arındırılmış reel satış hasılatı artış eğrisi.",
    "metrik": "%22,4 Reel",
    "degisim": 4.2,
    "degisimEtiket": "çeyreklik hızlanma",
    "tarih": "3. Çeyrek 2026",
    "boncukMiktar": 5,
    "boncukBirim": "%5 reel",
    "kaynak": "BIST Şirket Bilançoları",
    "mebiusTitle": "Revenue Growth Chart",
    "exportName": "RevenueGrowthChart",
    "mebiusFile": "charts-revenue-growth.tsx",
    "previewImage": "charts-revenue-growth.webp",
    "seri": [
      {
        "etiket": "2025/3Ç",
        "deger": 12
      },
      {
        "etiket": "2025/4Ç",
        "deger": 14.5
      },
      {
        "etiket": "2026/1Ç",
        "deger": 17.2
      },
      {
        "etiket": "2026/2Ç",
        "deger": 19.8
      },
      {
        "etiket": "2026/3Ç",
        "deger": 22.4
      }
    ],
    "kategoriTr": "AÇIK KAYNAK EKOSİSTEMİ",
    "kategoriEn": "OPEN SOURCE ECOSYSTEM",
    "baslikTr": "Reel Hasılat Büyüme Oranı (YZ Analitiği)",
    "baslikEn": "Revenue Growth Chart (AI Analytics)",
    "aciklamaTr": "Enflasyondan arındırılmış reel satış hasılatı artış eğrisi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "%22,4 Reel",
    "metrikEn": "%22,4 Reel",
    "degisimEtiketTr": "çeyreklik hızlanma",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-investment-app-adoption-by-country",
    "tur": "siralama-cubuk",
    "kategori": "EKONOMİ",
    "baslik": "Fintek ve Yatırım Uygulaması Benimseme Oranı",
    "aciklama": "Yetişkin nüfus içinde dijital yatırım hesabı kullanım oranı (Gelişmekte Olan Ülkeler).",
    "metrik": "%68,2 Türkiye",
    "degisim": 8.5,
    "degisimEtiket": "yıllık artış",
    "tarih": "2026",
    "boncukMiktar": 7,
    "boncukBirim": "%10 oran",
    "kaynak": "Dünya Bankası Findex",
    "mebiusTitle": "Investment App Adoption by Country Chart",
    "exportName": "InvestmentAppAdoptionByCountryChart",
    "mebiusFile": "charts-investment-app-adoption-by-country.tsx",
    "previewImage": "charts-investment-app-adoption-by-country.webp",
    "ogeler": [
      {
        "etiket": "Türkiye",
        "deger": 68.2
      },
      {
        "etiket": "Polonya",
        "deger": 62.4
      },
      {
        "etiket": "Brezilya",
        "deger": 58
      },
      {
        "etiket": "Meksika",
        "deger": 49.5
      },
      {
        "etiket": "Güney Afrika",
        "deger": 44
      }
    ],
    "kategoriTr": "DİL MODELLERİ & LLM",
    "kategoriEn": "LANGUAGE MODELS & LLM",
    "baslikTr": "Fintek ve Yatırım Uygulaması Benimseme Oranı (YZ Analitiği)",
    "baslikEn": "Investment App Adoption by Country Chart (AI Analytics)",
    "aciklamaTr": "Yetişkin nüfus içinde dijital yatırım hesabı kullanım oranı (Gelişmekte Olan Ülkeler). Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "%68,2 Türkiye",
    "metrikEn": "%68,2 Türkiye",
    "degisimEtiketTr": "yıllık artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-global-finance-market-forecast",
    "tur": "aralik-bant",
    "kategori": "EKONOMİ",
    "baslik": "Enflasyon Tahmin Yelpazesi (Piyasa Beklenti Anketi)",
    "aciklama": "Piyasa katılımcılarının 12 ay sonrası TÜFE beklenti aralıkları (alt, medyan, üst bant).",
    "metrik": "%24,8 Medyan",
    "degisim": -2,
    "degisimEtiket": "önceki ankete göre",
    "tarih": "Ekim 2026",
    "boncukMiktar": 5,
    "boncukBirim": "%5 beklenti",
    "kaynak": "TCMB Piyasa Katılımcıları Anketi",
    "mebiusTitle": "Global Finance Market Forecast Chart",
    "exportName": "GlobalFinanceMarketForecastChart",
    "mebiusFile": "charts-global-finance-market-forecast.tsx",
    "previewImage": "charts-global-finance-market-forecast.webp",
    "araliklar": [
      {
        "etiket": "3 Ay",
        "min": 28,
        "max": 35,
        "mevcut": 31.5
      },
      {
        "etiket": "6 Ay",
        "min": 24,
        "max": 30,
        "mevcut": 27
      },
      {
        "etiket": "12 Ay",
        "min": 20,
        "max": 28,
        "mevcut": 24.8
      },
      {
        "etiket": "24 Ay",
        "min": 14,
        "max": 20,
        "mevcut": 16.5
      }
    ],
    "kategoriTr": "YAPAY ZEKÂ ÇİPLERİ & DONANIM",
    "kategoriEn": "AI CHIPS & HARDWARE",
    "baslikTr": "Enflasyon Tahmin Yelpazesi (Piyasa Beklenti Anketi) (YZ Analitiği)",
    "baslikEn": "Global Finance Market Forecast Chart (AI Analytics)",
    "aciklamaTr": "Piyasa katılımcılarının 12 ay sonrası TÜFE beklenti aralıkları (alt, medyan, üst bant). Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "%24,8 Medyan",
    "metrikEn": "%24,8 Medyan",
    "degisimEtiketTr": "önceki ankete göre",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-average-sales",
    "tur": "sutun",
    "kategori": "EKONOMİ",
    "baslik": "Perakende Satış Hacmi Endeksi",
    "aciklama": "Mevsim etkilerinden arındırılmış perakende ticaret hacmi çeyreklik seyri.",
    "metrik": "124,5 Puan",
    "degisim": 3.6,
    "degisimEtiket": "çeyreklik artış",
    "tarih": "3. Çeyrek 2026",
    "boncukMiktar": 8,
    "boncukBirim": "15 puan",
    "kaynak": "TÜİK",
    "mebiusTitle": "Average Sales Chart",
    "exportName": "AverageSalesChart",
    "mebiusFile": "charts-average-sales.tsx",
    "previewImage": "charts-average-sales.webp",
    "seri": [
      {
        "etiket": "2025/3Ç",
        "deger": 108
      },
      {
        "etiket": "2025/4Ç",
        "deger": 114
      },
      {
        "etiket": "2026/1Ç",
        "deger": 118
      },
      {
        "etiket": "2026/2Ç",
        "deger": 121
      },
      {
        "etiket": "2026/3Ç",
        "deger": 124.5
      }
    ],
    "kategoriTr": "AB MEVZUATI & AI ACT",
    "kategoriEn": "EU REGULATION & AI ACT",
    "baslikTr": "Perakende Satış Hacmi Endeksi (YZ Analitiği)",
    "baslikEn": "Average Sales Chart (AI Analytics)",
    "aciklamaTr": "Mevsim etkilerinden arındırılmış perakende ticaret hacmi çeyreklik seyri. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "124,5 Puan",
    "metrikEn": "124,5 Puan",
    "degisimEtiketTr": "çeyreklik artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-performance",
    "tur": "coklu-karma",
    "kategori": "BORSA",
    "baslik": "Endeks Karşılaştırmalı Performans",
    "aciklama": "BIST 100 (mürekkep sütun) ile BIST Sınai (kırmızı çizgi) getiri yarışı.",
    "metrik": "+%38,5 Getiri",
    "degisim": 12.4,
    "degisimEtiket": "yılbaşından bu yana",
    "tarih": "Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "%5 rölatif",
    "kaynak": "Borsa İstanbul",
    "mebiusTitle": "Performance Chart",
    "exportName": "PerformanceChart",
    "mebiusFile": "charts-performance.tsx",
    "previewImage": "charts-performance.webp",
    "seriler": [
      {
        "etiket": "1. Çeyrek",
        "cubuk": 12,
        "cizgi": 15
      },
      {
        "etiket": "2. Çeyrek",
        "cubuk": 22,
        "cizgi": 25
      },
      {
        "etiket": "3. Çeyrek",
        "cubuk": 31,
        "cizgi": 33
      },
      {
        "etiket": "Güncel",
        "cubuk": 38.5,
        "cizgi": 42
      }
    ],
    "kategoriTr": "VERİ MERKEZİ & ENERJİ",
    "kategoriEn": "DATA CENTERS & ENERGY",
    "baslikTr": "Endeks Karşılaştırmalı Performans (YZ Analitiği)",
    "baslikEn": "Performance Chart (AI Analytics)",
    "aciklamaTr": "BIST 100 (mürekkep sütun) ile BIST Sınai (kırmızı çizgi) getiri yarışı. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "+%38,5 Getiri",
    "metrikEn": "+%38,5 Getiri",
    "degisimEtiketTr": "yılbaşından bu yana",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-investment-growth",
    "tur": "alan",
    "kategori": "PİYASALAR",
    "baslik": "Bileşik Reel Yatırım Büyümesi",
    "aciklama": "Düzenli aylık tasarruf ve kâr payı yeniden yatırımıyla oluşan bileşik getiri.",
    "metrik": "₺540.000",
    "degisim": 24,
    "degisimEtiket": "bileşik yıllık getiri",
    "tarih": "2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺90.000",
    "kaynak": "TEFAS Verileri",
    "mebiusTitle": "Investment Growth Chart",
    "exportName": "InvestmentGrowthChart",
    "mebiusFile": "charts-investment-growth.tsx",
    "previewImage": "charts-investment-growth.webp",
    "seri": [
      {
        "etiket": "1. Yıl",
        "deger": 120
      },
      {
        "etiket": "2. Yıl",
        "deger": 180
      },
      {
        "etiket": "3. Yıl",
        "deger": 270
      },
      {
        "etiket": "4. Yıl",
        "deger": 390
      },
      {
        "etiket": "5. Yıl",
        "deger": 540
      }
    ],
    "kategoriTr": "YAPAY ZEKÂ YATIRIMLARI",
    "kategoriEn": "AI VENTURE & INVESTMENTS",
    "baslikTr": "Bileşik Reel Yatırım Büyümesi (YZ Analitiği)",
    "baslikEn": "Investment Growth Chart (AI Analytics)",
    "aciklamaTr": "Düzenli aylık tasarruf ve kâr payı yeniden yatırımıyla oluşan bileşik getiri. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺540.000",
    "metrikEn": "$540.000",
    "degisimEtiketTr": "bileşik yıllık getiri",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-global-defi",
    "tur": "siralama-cubuk",
    "kategori": "DÖVİZ & ALTIN",
    "baslik": "Dijital Varlık ve Sabit Coin Hacmi",
    "aciklama": "Küresel ölçekte en yüksek likiditeye sahip rezerv ve ödeme varlıkları.",
    "metrik": "$182 Mr Toplam",
    "degisim": 15.6,
    "degisimEtiket": "çeyreklik artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 6,
    "boncukBirim": "$30 Mr",
    "kaynak": "CoinGecko & Onchain",
    "ogeler": [
      {
        "etiket": "USDT (Tether)",
        "deger": 124
      },
      {
        "etiket": "USDC (Circle)",
        "deger": 38.5
      },
      {
        "etiket": "DAI / USDS",
        "deger": 11.2
      },
      {
        "etiket": "FDUSD",
        "deger": 4.8
      },
      {
        "etiket": "Diğer",
        "deger": 3.5
      }
    ],
    "mebiusTitle": "Global DeFi Chart",
    "exportName": "GlobalDefiChart",
    "mebiusFile": "global-defi-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-global-defi.webp",
    "kategoriTr": "AÇIK KAYNAK EKOSİSTEMİ",
    "kategoriEn": "OPEN SOURCE ECOSYSTEM",
    "baslikTr": "Dijital Varlık ve Sabit Coin Hacmi (YZ Analitiği)",
    "baslikEn": "Global DeFi Chart (AI Analytics)",
    "aciklamaTr": "Küresel ölçekte en yüksek likiditeye sahip rezerv ve ödeme varlıkları. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "$182 Mr Toplam",
    "metrikEn": "$182 Mr Toplam",
    "degisimEtiketTr": "çeyreklik artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-investment-app-user-age",
    "tur": "sutun",
    "kategori": "PİYASALAR",
    "baslik": "Borsa Yatırımcı Yaş Grubu Dağılımı",
    "aciklama": "MKK nezdinde hisse senedi hesabı bulunan pay senedi sahiplerinin yaş piramidi.",
    "metrik": "7,4 Milyon Yatırımcı",
    "degisim": 5,
    "degisimEtiket": "yıllık artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 7,
    "boncukBirim": "1 milyon",
    "kaynak": "MKK",
    "seri": [
      {
        "etiket": "18-24",
        "deger": 12.5
      },
      {
        "etiket": "25-34",
        "deger": 38.2
      },
      {
        "etiket": "35-44",
        "deger": 26.4
      },
      {
        "etiket": "45-54",
        "deger": 14.8
      },
      {
        "etiket": "55+",
        "deger": 8.1
      }
    ],
    "mebiusTitle": "Investment App User Age Chart",
    "exportName": "InvestmentAppUserAgeChart",
    "mebiusFile": "investment-app-user-age-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-investment-app-user-age.webp",
    "kategoriTr": "DİL MODELLERİ & LLM",
    "kategoriEn": "LANGUAGE MODELS & LLM",
    "baslikTr": "Borsa Yatırımcı Yaş Grubu Dağılımı (YZ Analitiği)",
    "baslikEn": "Investment App User Age Chart (AI Analytics)",
    "aciklamaTr": "MKK nezdinde hisse senedi hesabı bulunan pay senedi sahiplerinin yaş piramidi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "7,4 Milyon Yatırımcı",
    "metrikEn": "7,4 Milyon Yatırımcı",
    "degisimEtiketTr": "yıllık artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-finance-overview-stacked-bar",
    "tur": "yigilmis-sutun",
    "kategori": "EKONOMİ",
    "baslik": "Bütçe Gelirleri ve Giderleri Yığılımı",
    "aciklama": "Vergi gelirleri ile harcama kalemlerinin çeyreklik karşılaştırması.",
    "metrik": "₺1.840 Mr",
    "degisim": -1.5,
    "degisimEtiket": "açık dengesi",
    "tarih": "3. Çeyrek 2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺300 Mr",
    "kaynak": "Hazine",
    "gruplar": [
      {
        "etiket": "2025/4Ç",
        "varlik": 1450,
        "yukumluluk": 1580
      },
      {
        "etiket": "2026/1Ç",
        "varlik": 1580,
        "yukumluluk": 1690
      },
      {
        "etiket": "2026/2Ç",
        "varlik": 1710,
        "yukumluluk": 1820
      },
      {
        "etiket": "2026/3Ç",
        "varlik": 1840,
        "yukumluluk": 1940
      }
    ],
    "mebiusTitle": "Finance Overview Stacked Bar Chart",
    "exportName": "FinanceOverviewStackedBarChart",
    "mebiusFile": "finance-overview-stacked-bar-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-finance-overview-stacked-bar.webp",
    "kategoriTr": "YAPAY ZEKÂ ÇİPLERİ & DONANIM",
    "kategoriEn": "AI CHIPS & HARDWARE",
    "baslikTr": "Bütçe Gelirleri ve Giderleri Yığılımı (YZ Analitiği)",
    "baslikEn": "Finance Overview Stacked Bar Chart (AI Analytics)",
    "aciklamaTr": "Vergi gelirleri ile harcama kalemlerinin çeyreklik karşılaştırması. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺1.840 Mr",
    "metrikEn": "$1.840 Mr",
    "degisimEtiketTr": "açık dengesi",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-finance-overview-timeline",
    "tur": "alan",
    "kategori": "BANKACILIK",
    "baslik": "TCMB Politika Faizi Zaman Çizelgesi",
    "aciklama": "Para Politikası Kurulu'nun bir haftalık repo ihale faiz oranı geçmiş kararları.",
    "metrik": "%45,0 Politika Faizi",
    "degisim": 0,
    "degisimEtiket": "sabit tutuldu",
    "tarih": "Ekim 2026 Kararı",
    "boncukMiktar": 9,
    "boncukBirim": "%5 faiz",
    "kaynak": "TCMB PPK",
    "seri": [
      {
        "etiket": "Nis",
        "deger": 50
      },
      {
        "etiket": "Haz",
        "deger": 50
      },
      {
        "etiket": "Ağu",
        "deger": 47.5
      },
      {
        "etiket": "Eyl",
        "deger": 45
      },
      {
        "etiket": "Eki",
        "deger": 45
      }
    ],
    "mebiusTitle": "Finance Overview Timeline Chart",
    "exportName": "FinanceOverviewTimelineChart",
    "mebiusFile": "finance-overview-timeline-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-finance-overview-timeline.webp",
    "kategoriTr": "AB MEVZUATI & AI ACT",
    "kategoriEn": "EU REGULATION & AI ACT",
    "baslikTr": "TCMB Politika Faizi Zaman Çizelgesi (YZ Analitiği)",
    "baslikEn": "Finance Overview Timeline Chart (AI Analytics)",
    "aciklamaTr": "Para Politikası Kurulu'nun bir haftalık repo ihale faiz oranı geçmiş kararları. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "%45,0 Politika Faizi",
    "metrikEn": "%45,0 Politika Faizi",
    "degisimEtiketTr": "sabit tutuldu",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-revenue-by-product-line",
    "tur": "siralama-cubuk",
    "kategori": "BORSA",
    "baslik": "BIST Şirketleri Faaliyet Alanı Satış Payı",
    "aciklama": "Lokomotif şirketlerin ana segment bazlı gelir ağırlığı.",
    "metrik": "₺820 Mr Hasılat",
    "degisim": 11.3,
    "degisimEtiket": "yıllık büyüme",
    "tarih": "3. Çeyrek 2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺150 Mr",
    "kaynak": "KAP",
    "ogeler": [
      {
        "etiket": "Rafineri & Enerji",
        "deger": 340
      },
      {
        "etiket": "Otomotiv & Yan Sanayi",
        "deger": 260
      },
      {
        "etiket": "Dayanıklı Tüketim",
        "deger": 145
      },
      {
        "etiket": "Havacılık & Lojistik",
        "deger": 75
      }
    ],
    "mebiusTitle": "Revenue by Product Line Chart",
    "exportName": "RevenueByProductLineChart",
    "mebiusFile": "revenue-by-product-line-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-revenue-by-product-line.webp",
    "kategoriTr": "VERİ MERKEZİ & ENERJİ",
    "kategoriEn": "DATA CENTERS & ENERGY",
    "baslikTr": "BIST Şirketleri Faaliyet Alanı Satış Payı (YZ Analitiği)",
    "baslikEn": "Revenue by Product Line Chart (AI Analytics)",
    "aciklamaTr": "Lokomotif şirketlerin ana segment bazlı gelir ağırlığı. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺820 Mr Hasılat",
    "metrikEn": "$820 Mr Hasılat",
    "degisimEtiketTr": "yıllık büyüme",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-growth-trends",
    "tur": "alan",
    "kategori": "EKONOMİ",
    "baslik": "İmalat Sanayi PMI Eğilimi",
    "aciklama": "İstanbul Sanayi Odası Satın Alma Yöneticileri Endeksi (50 eşik: büyüme).",
    "metrik": "51,8 PMI",
    "degisim": 1.8,
    "degisimEtiket": "eşik üzeri büyüme",
    "tarih": "Ekim 2026",
    "boncukMiktar": 5,
    "boncukBirim": "10 PMI (50 eşik)",
    "kaynak": "İSO & S&P Global",
    "seri": [
      {
        "etiket": "May",
        "deger": 48.4
      },
      {
        "etiket": "Haz",
        "deger": 49.1
      },
      {
        "etiket": "Tem",
        "deger": 49.8
      },
      {
        "etiket": "Ağu",
        "deger": 50.5
      },
      {
        "etiket": "Eyl",
        "deger": 51.2
      },
      {
        "etiket": "Eki",
        "deger": 51.8
      }
    ],
    "mebiusTitle": "Growth Trends Chart",
    "exportName": "GrowthTrendsChart",
    "mebiusFile": "growth-trends-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-growth-trends.webp",
    "kategoriTr": "YAPAY ZEKÂ YATIRIMLARI",
    "kategoriEn": "AI VENTURE & INVESTMENTS",
    "baslikTr": "İmalat Sanayi PMI Eğilimi (YZ Analitiği)",
    "baslikEn": "Growth Trends Chart (AI Analytics)",
    "aciklamaTr": "İstanbul Sanayi Odası Satın Alma Yöneticileri Endeksi (50 eşik: büyüme). Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "51,8 PMI",
    "metrikEn": "51,8 PMI",
    "degisimEtiketTr": "eşik üzeri büyüme",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-asset-allocation",
    "tur": "halka-pay",
    "kategori": "PİYASALAR",
    "baslik": "BES Fon Portföyü Varlık Dağılımı",
    "aciklama": "Bireysel Emeklilik Sistemi katılımcı fonlarının toplam varlık sınıfları.",
    "metrik": "₺1.150 Mr BES",
    "degisim": 7.4,
    "degisimEtiket": "çeyreklik artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "₺150 Mr",
    "kaynak": "EGM (Emeklilik Gözetim)",
    "dilimler": [
      {
        "ad": "Devlet İç Borçlanma (DİBS)",
        "oran": 38,
        "renk": "yesil"
      },
      {
        "ad": "Hisse Senetleri",
        "oran": 28,
        "renk": "koyuyesil"
      },
      {
        "ad": "Kıymetli Madenler",
        "oran": 18,
        "renk": "acikyesil"
      },
      {
        "ad": "Döviz / Eurobond",
        "oran": 16,
        "renk": "murekkep"
      }
    ],
    "mebiusTitle": "Asset Allocation Chart",
    "exportName": "AssetAllocationChart",
    "mebiusFile": "asset-allocation-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-asset-allocation.webp",
    "kategoriTr": "AÇIK KAYNAK EKOSİSTEMİ",
    "kategoriEn": "OPEN SOURCE ECOSYSTEM",
    "baslikTr": "BES Fon Portföyü Varlık Dağılımı (YZ Analitiği)",
    "baslikEn": "Asset Allocation Chart (AI Analytics)",
    "aciklamaTr": "Bireysel Emeklilik Sistemi katılımcı fonlarının toplam varlık sınıfları. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺1.150 Mr BES",
    "metrikEn": "$1.150 Mr BES",
    "degisimEtiketTr": "çeyreklik artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-profit-margin-analysis",
    "tur": "ayrisan-cubuk",
    "kategori": "BORSA",
    "baslik": "Faaliyet Kâr Marjı Değişimi",
    "aciklama": "Sanayi ve hizmet sektörlerinde FAVÖK marjı yıllık puan değişimi.",
    "metrik": "+%2,3 Puan",
    "degisim": 2.3,
    "degisimEtiket": "marj genişlemesi",
    "tarih": "3. Çeyrek 2026",
    "boncukMiktar": 5,
    "boncukBirim": "%0,5 marj",
    "kaynak": "Borsa İstanbul",
    "seri": [
      {
        "etiket": "Savunma",
        "deger": 4.5
      },
      {
        "etiket": "Havacılık",
        "deger": 3.2
      },
      {
        "etiket": "Perakende",
        "deger": 1.4
      },
      {
        "etiket": "Demir-Çelik",
        "deger": -2.8
      },
      {
        "etiket": "Petrokimya",
        "deger": -3.5
      }
    ],
    "mebiusTitle": "Profit Margin Analysis Chart",
    "exportName": "ProfitMarginAnalysisChart",
    "mebiusFile": "profit-margin-analysis-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-profit-margin-analysis.webp",
    "kategoriTr": "DİL MODELLERİ & LLM",
    "kategoriEn": "LANGUAGE MODELS & LLM",
    "baslikTr": "Faaliyet Kâr Marjı Değişimi (YZ Analitiği)",
    "baslikEn": "Profit Margin Analysis Chart (AI Analytics)",
    "aciklamaTr": "Sanayi ve hizmet sektörlerinde FAVÖK marjı yıllık puan değişimi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "+%2,3 Puan",
    "metrikEn": "+%2,3 Puan",
    "degisimEtiketTr": "marj genişlemesi",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-monthly-income",
    "tur": "sutun",
    "kategori": "KİŞİSEL FİNANS",
    "baslik": "Aylık Gelir Bileşenleri",
    "aciklama": "Maaş, kira, temettü ve faiz gelirlerinin aylık hane bütçesine katkısı.",
    "metrik": "₺52.000 Ortalama",
    "degisim": 6,
    "degisimEtiket": "aylık artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺9.000",
    "kaynak": "TÜİK Hanehalkı",
    "seri": [
      {
        "etiket": "Maaş",
        "deger": 38000
      },
      {
        "etiket": "Mevduat Faizi",
        "deger": 7500
      },
      {
        "etiket": "Kira Getirisi",
        "deger": 4500
      },
      {
        "etiket": "Temettü/Ek",
        "deger": 2000
      }
    ],
    "mebiusTitle": "Monthly Income Chart",
    "exportName": "MonthlyIncomeChart",
    "mebiusFile": "monthly-income-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-monthly-income.webp",
    "kategoriTr": "YAPAY ZEKÂ ÇİPLERİ & DONANIM",
    "kategoriEn": "AI CHIPS & HARDWARE",
    "baslikTr": "Aylık Gelir Bileşenleri (YZ Analitiği)",
    "baslikEn": "Monthly Income Chart (AI Analytics)",
    "aciklamaTr": "Maaş, kira, temettü ve faiz gelirlerinin aylık hane bütçesine katkısı. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺52.000 Ortalama",
    "metrikEn": "$52.000 Ortalama",
    "degisimEtiketTr": "aylık artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-asset-overview-bar",
    "tur": "sutun",
    "kategori": "DÖVİZ & ALTIN",
    "baslik": "Finansal Varlık Tercihleri Dağılımı",
    "aciklama": "Yurtiçi hanehalkının tasarruf araçlarındaki oransal büyüklük sıralaması.",
    "metrik": "₺14.200 Mr",
    "degisim": 8.2,
    "degisimEtiket": "çeyreklik artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 7,
    "boncukBirim": "₺2.000 Mr",
    "kaynak": "TCMB",
    "seri": [
      {
        "etiket": "TL Mevduat",
        "deger": 58
      },
      {
        "etiket": "Döviz Tevdiat",
        "deger": 22
      },
      {
        "etiket": "Fiziki & Fon Altın",
        "deger": 12
      },
      {
        "etiket": "Hisse Senedi",
        "deger": 8
      }
    ],
    "mebiusTitle": "Asset Overview Bar Chart",
    "exportName": "AssetOverviewBarChart",
    "mebiusFile": "asset-overview-bar-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-asset-overview-bar.webp",
    "kategoriTr": "AB MEVZUATI & AI ACT",
    "kategoriEn": "EU REGULATION & AI ACT",
    "baslikTr": "Finansal Varlık Tercihleri Dağılımı (YZ Analitiği)",
    "baslikEn": "Asset Overview Bar Chart (AI Analytics)",
    "aciklamaTr": "Yurtiçi hanehalkının tasarruf araçlarındaki oransal büyüklük sıralaması. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺14.200 Mr",
    "metrikEn": "$14.200 Mr",
    "degisimEtiketTr": "çeyreklik artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-sales-performance",
    "tur": "sutun",
    "kategori": "EKONOMİ",
    "baslik": "Aylık İhracat Performansı",
    "aciklama": "Son 6 aydaki gerçekleşen aylık dış satım hacmi (milyar dolar).",
    "metrik": "$21,4 Milyar",
    "degisim": 4.5,
    "degisimEtiket": "geçen yılın aynı ayına göre",
    "tarih": "Eylül 2026",
    "boncukMiktar": 7,
    "boncukBirim": "$3 Mr",
    "kaynak": "Ticaret Bakanlığı",
    "seri": [
      {
        "etiket": "May",
        "deger": 19.8
      },
      {
        "etiket": "Haz",
        "deger": 20.2
      },
      {
        "etiket": "Tem",
        "deger": 20.9
      },
      {
        "etiket": "Ağu",
        "deger": 21
      },
      {
        "etiket": "Eyl",
        "deger": 21.4
      }
    ],
    "mebiusTitle": "Sales Performance Chart",
    "exportName": "SalesPerformanceChart",
    "mebiusFile": "sales-performance-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-sales-performance.webp",
    "kategoriTr": "VERİ MERKEZİ & ENERJİ",
    "kategoriEn": "DATA CENTERS & ENERGY",
    "baslikTr": "Aylık İhracat Performansı (YZ Analitiği)",
    "baslikEn": "Sales Performance Chart (AI Analytics)",
    "aciklamaTr": "Son 6 aydaki gerçekleşen aylık dış satım hacmi (milyar dolar). Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "$21,4 Milyar",
    "metrikEn": "$21,4 Milyar",
    "degisimEtiketTr": "geçen yılın aynı ayına göre",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-expenses",
    "tur": "sutun",
    "kategori": "KİŞİSEL FİNANS",
    "baslik": "Sabit ve Değişken Harcama Dengesi",
    "aciklama": "Aylık zorunlu sabit yükümlülükler ile serbest harcamaların ayrımı.",
    "metrik": "₺38.400 Gider",
    "degisim": -3.1,
    "degisimEtiket": "tasarruf eğilimi",
    "tarih": "Ekim 2026",
    "boncukMiktar": 5,
    "boncukBirim": "₺8.000",
    "kaynak": "Finfolis",
    "seri": [
      {
        "etiket": "Kira/Kredi",
        "deger": 18000
      },
      {
        "etiket": "Market/Beslenme",
        "deger": 11500
      },
      {
        "etiket": "Faturalar",
        "deger": 4200
      },
      {
        "etiket": "Eğlence/Sosyal",
        "deger": 4700
      }
    ],
    "mebiusTitle": "Expenses Chart",
    "exportName": "ExpensesChart",
    "mebiusFile": "expenses-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-expenses.webp",
    "kategoriTr": "YAPAY ZEKÂ YATIRIMLARI",
    "kategoriEn": "AI VENTURE & INVESTMENTS",
    "baslikTr": "Sabit ve Değişken Harcama Dengesi (YZ Analitiği)",
    "baslikEn": "Expenses Chart (AI Analytics)",
    "aciklamaTr": "Aylık zorunlu sabit yükümlülükler ile serbest harcamaların ayrımı. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺38.400 Gider",
    "metrikEn": "$38.400 Gider",
    "degisimEtiketTr": "tasarruf eğilimi",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-total-revenue",
    "tur": "alan",
    "kategori": "EKONOMİ",
    "baslik": "Merkezi Yönetim Vergi Tahsilatı",
    "aciklama": "Gelir, kurumlar ve KDV/ÖTV tahsilatının kümülatif artış çizgisi.",
    "metrik": "₺6.450 Mr",
    "degisim": 16.8,
    "degisimEtiket": "yıllık nominal artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "₺800 Mr",
    "kaynak": "Gelir İdaresi Başkanlığı",
    "seri": [
      {
        "etiket": "1. Çeyrek",
        "deger": 1420
      },
      {
        "etiket": "2. Çeyrek",
        "deger": 3100
      },
      {
        "etiket": "3. Çeyrek",
        "deger": 4850
      },
      {
        "etiket": "Ekim",
        "deger": 6450
      }
    ],
    "mebiusTitle": "Total Revenue Chart",
    "exportName": "TotalRevenueChart",
    "mebiusFile": "total-revenue-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-total-revenue.webp",
    "kategoriTr": "AÇIK KAYNAK EKOSİSTEMİ",
    "kategoriEn": "OPEN SOURCE ECOSYSTEM",
    "baslikTr": "Merkezi Yönetim Vergi Tahsilatı (YZ Analitiği)",
    "baslikEn": "Total Revenue Chart (AI Analytics)",
    "aciklamaTr": "Gelir, kurumlar ve KDV/ÖTV tahsilatının kümülatif artış çizgisi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺6.450 Mr",
    "metrikEn": "$6.450 Mr",
    "degisimEtiketTr": "yıllık nominal artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-project-budget-allocation",
    "tur": "halka-pay",
    "kategori": "EKONOMİ",
    "baslik": "Yatırım Projeleri Bütçe Dağılımı",
    "aciklama": "Kamu yatırımlarında büyük projelerin ödenek ağırlıkları.",
    "metrik": "₺480 Mr",
    "degisim": 6.4,
    "degisimEtiket": "tahsis artışı",
    "tarih": "2026",
    "boncukMiktar": 5,
    "boncukBirim": "₺100 Mr",
    "kaynak": "Strateji ve Bütçe Başkanlığı",
    "dilimler": [
      {
        "ad": "Deprem Bölgesi Konut",
        "oran": 45,
        "renk": "yesil"
      },
      {
        "ad": "Yüksek Hızlı Tren",
        "oran": 25,
        "renk": "koyuyesil"
      },
      {
        "ad": "Yenilenebilir Enerji",
        "oran": 18,
        "renk": "acikyesil"
      },
      {
        "ad": "Liman & Lojistik",
        "oran": 12,
        "renk": "murekkep"
      }
    ],
    "mebiusTitle": "Project Budget Allocation Chart",
    "exportName": "ProjectBudgetAllocationChart",
    "mebiusFile": "project-budget-allocation-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-project-budget-allocation.webp",
    "kategoriTr": "DİL MODELLERİ & LLM",
    "kategoriEn": "LANGUAGE MODELS & LLM",
    "baslikTr": "Yatırım Projeleri Bütçe Dağılımı (YZ Analitiği)",
    "baslikEn": "Project Budget Allocation Chart (AI Analytics)",
    "aciklamaTr": "Kamu yatırımlarında büyük projelerin ödenek ağırlıkları. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺480 Mr",
    "metrikEn": "$480 Mr",
    "degisimEtiketTr": "tahsis artışı",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-income-overview",
    "tur": "sutun",
    "kategori": "EKONOMİ",
    "baslik": "Faiz Dışı Bütçe Gelirleri",
    "aciklama": "Genel bütçe gelirlerinin vergi ve vergi dışı ana kalemlerindeki gelişim.",
    "metrik": "₺5.840 Mr",
    "degisim": 12.1,
    "degisimEtiket": "yıllık artış",
    "tarih": "Ekim 2026",
    "boncukMiktar": 7,
    "boncukBirim": "₺800 Mr",
    "kaynak": "Hazine",
    "seri": [
      {
        "etiket": "ÖTV",
        "deger": 1120
      },
      {
        "etiket": "Dahilde KDV",
        "deger": 840
      },
      {
        "etiket": "İthalde KDV",
        "deger": 1260
      },
      {
        "etiket": "Gelir Vergisi",
        "deger": 1420
      },
      {
        "etiket": "Kurumlar Vergisi",
        "deger": 1200
      }
    ],
    "mebiusTitle": "Income Overview Chart",
    "exportName": "IncomeOverviewChart",
    "mebiusFile": "income-overview-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-income-overview.webp",
    "kategoriTr": "YAPAY ZEKÂ ÇİPLERİ & DONANIM",
    "kategoriEn": "AI CHIPS & HARDWARE",
    "baslikTr": "Faiz Dışı Bütçe Gelirleri (YZ Analitiği)",
    "baslikEn": "Income Overview Chart (AI Analytics)",
    "aciklamaTr": "Genel bütçe gelirlerinin vergi ve vergi dışı ana kalemlerindeki gelişim. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺5.840 Mr",
    "metrikEn": "$5.840 Mr",
    "degisimEtiketTr": "yıllık artış",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-spending-overview-scatter",
    "tur": "nokta-dagilim",
    "kategori": "EKONOMİ",
    "baslik": "Gelir ve Tüketim Esnekliği Saçılımı",
    "aciklama": "Farklı gelir gruplarında temel gıda dışı harcama eğilimi saçılım noktaları.",
    "metrik": "0,82 Korelasyon",
    "degisim": 0.04,
    "degisimEtiket": "esneklik katsayısı",
    "tarih": "2026",
    "boncukMiktar": 8,
    "boncukBirim": "0,1 korelasyon",
    "kaynak": "TÜİK",
    "noktalar": [
      {
        "x": 15,
        "y": 20
      },
      {
        "x": 25,
        "y": 28
      },
      {
        "x": 35,
        "y": 42
      },
      {
        "x": 45,
        "y": 48
      },
      {
        "x": 55,
        "y": 62
      },
      {
        "x": 65,
        "y": 68
      },
      {
        "x": 75,
        "y": 79
      },
      {
        "x": 85,
        "y": 88
      },
      {
        "x": 95,
        "y": 94
      }
    ],
    "mebiusTitle": "Spending Overview Scatter Chart",
    "exportName": "SpendingOverviewScatterChart",
    "mebiusFile": "spending-overview-scatter-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-spending-overview-scatter.webp",
    "kategoriTr": "AB MEVZUATI & AI ACT",
    "kategoriEn": "EU REGULATION & AI ACT",
    "baslikTr": "Gelir ve Tüketim Esnekliği Saçılımı (YZ Analitiği)",
    "baslikEn": "Spending Overview Scatter Chart (AI Analytics)",
    "aciklamaTr": "Farklı gelir gruplarında temel gıda dışı harcama eğilimi saçılım noktaları. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "0,82 Korelasyon",
    "metrikEn": "0,82 Korelasyon",
    "degisimEtiketTr": "esneklik katsayısı",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-global-finance-market-combo",
    "tur": "coklu-karma",
    "kategori": "BANKACILIK",
    "baslik": "DİBS İhraç Hacmi ve Bileşik Faiz",
    "aciklama": "Hazine iç borçlanma ihale tutarları (sütun) ve ağırlıklı faiz (çizgi).",
    "metrik": "₺65 Mr İhraç",
    "degisim": 10.2,
    "degisimEtiket": "ihale talebi",
    "tarih": "Ekim 2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺10 Mr",
    "kaynak": "Hazine ve Maliye Bakanlığı",
    "seriler": [
      {
        "etiket": "2 Yıl Sabit",
        "cubuk": 22,
        "cizgi": 39.5
      },
      {
        "etiket": "5 Yıl Sabit",
        "cubuk": 18.5,
        "cizgi": 34.2
      },
      {
        "etiket": "10 Yıl Sabit",
        "cubuk": 14,
        "cizgi": 31
      },
      {
        "etiket": "TÜFE Endeksli",
        "cubuk": 10.5,
        "cizgi": 18.5
      }
    ],
    "mebiusTitle": "Global Finance Market Combo Chart",
    "exportName": "GlobalFinanceMarketComboChart",
    "mebiusFile": "global-finance-market-combo-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-global-finance-market-combo.webp",
    "kategoriTr": "VERİ MERKEZİ & ENERJİ",
    "kategoriEn": "DATA CENTERS & ENERGY",
    "baslikTr": "DİBS İhraç Hacmi ve Bileşik Faiz (YZ Analitiği)",
    "baslikEn": "Global Finance Market Combo Chart (AI Analytics)",
    "aciklamaTr": "Hazine iç borçlanma ihale tutarları (sütun) ve ağırlıklı faiz (çizgi). Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺65 Mr İhraç",
    "metrikEn": "$65 Mr İhraç",
    "degisimEtiketTr": "ihale talebi",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-finance-analytics",
    "tur": "alan",
    "kategori": "BANKACILIK",
    "baslik": "Sermaye Yeterlilik Rasyosu (SYR)",
    "aciklama": "Türk bankacılık sektörünün Basel III yasal asgari sermaye yeterlilik oranı.",
    "metrik": "%17,4 SYR",
    "degisim": 0.6,
    "degisimEtiket": "yasal sınırın üstünde",
    "tarih": "3. Çeyrek 2026",
    "boncukMiktar": 7,
    "boncukBirim": "%2,5 rasyo",
    "kaynak": "BDDK",
    "seri": [
      {
        "etiket": "2025/3Ç",
        "deger": 16.8
      },
      {
        "etiket": "2025/4Ç",
        "deger": 17
      },
      {
        "etiket": "2026/1Ç",
        "deger": 16.9
      },
      {
        "etiket": "2026/2Ç",
        "deger": 17.2
      },
      {
        "etiket": "2026/3Ç",
        "deger": 17.4
      }
    ],
    "mebiusTitle": "Finance Analytics Chart",
    "exportName": "FinanceAnalyticsChart",
    "mebiusFile": "finance-analytics-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-finance-analytics.webp",
    "kategoriTr": "YAPAY ZEKÂ YATIRIMLARI",
    "kategoriEn": "AI VENTURE & INVESTMENTS",
    "baslikTr": "Sermaye Yeterlilik Rasyosu (SYR) (YZ Analitiği)",
    "baslikEn": "Finance Analytics Chart (AI Analytics)",
    "aciklamaTr": "Türk bankacılık sektörünün Basel III yasal asgari sermaye yeterlilik oranı. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "%17,4 SYR",
    "metrikEn": "%17,4 SYR",
    "degisimEtiketTr": "yasal sınırın üstünde",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-ethereum",
    "tur": "alan",
    "kategori": "DÖVİZ & ALTIN",
    "baslik": "Gram Altın Fiyat Seyri",
    "aciklama": "Serbest piyasa ve Borsa İstanbul Kıymetli Madenler seans kapanış fiyatı.",
    "metrik": "₺3.140 / Gram",
    "degisim": 2.8,
    "degisimEtiket": "haftalık kazanç",
    "tarih": "30 Ekim 2026",
    "boncukMiktar": 8,
    "boncukBirim": "₺400",
    "kaynak": "Borsa İstanbul KMTP",
    "seri": [
      {
        "etiket": "Pzt",
        "deger": 3050
      },
      {
        "etiket": "Sal",
        "deger": 3080
      },
      {
        "etiket": "Çar",
        "deger": 3095
      },
      {
        "etiket": "Per",
        "deger": 3120
      },
      {
        "etiket": "Cum",
        "deger": 3140
      }
    ],
    "mebiusTitle": "Ethereum Chart",
    "exportName": "EthereumChart",
    "mebiusFile": "ethereum-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-ethereum.webp",
    "kategoriTr": "AÇIK KAYNAK EKOSİSTEMİ",
    "kategoriEn": "OPEN SOURCE ECOSYSTEM",
    "baslikTr": "Gram Altın Fiyat Seyri (YZ Analitiği)",
    "baslikEn": "Ethereum Chart (AI Analytics)",
    "aciklamaTr": "Serbest piyasa ve Borsa İstanbul Kıymetli Madenler seans kapanış fiyatı. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺3.140 / Gram",
    "metrikEn": "$3.140 / Gram",
    "degisimEtiketTr": "haftalık kazanç",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-revenue-overview",
    "tur": "sutun",
    "kategori": "BORSA",
    "baslik": "BIST 100 Konsolide Hasılat Gelişimi",
    "aciklama": "Endeks dahilindeki şirketlerin çeyreklik kümülatif net satış toplamı.",
    "metrik": "₺3.450 Mr",
    "degisim": 21,
    "degisimEtiket": "yıllık nominal büyüme",
    "tarih": "3. Çeyrek 2026",
    "boncukMiktar": 7,
    "boncukBirim": "₺500 Mr",
    "kaynak": "KAP",
    "seri": [
      {
        "etiket": "2025/3Ç",
        "deger": 2850
      },
      {
        "etiket": "2025/4Ç",
        "deger": 3020
      },
      {
        "etiket": "2026/1Ç",
        "deger": 3180
      },
      {
        "etiket": "2026/2Ç",
        "deger": 3320
      },
      {
        "etiket": "2026/3Ç",
        "deger": 3450
      }
    ],
    "mebiusTitle": "Revenue Overview Chart",
    "exportName": "RevenueOverviewChart",
    "mebiusFile": "revenue-overview-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-revenue-overview.webp",
    "kategoriTr": "DİL MODELLERİ & LLM",
    "kategoriEn": "LANGUAGE MODELS & LLM",
    "baslikTr": "BIST 100 Konsolide Hasılat Gelişimi (YZ Analitiği)",
    "baslikEn": "Revenue Overview Chart (AI Analytics)",
    "aciklamaTr": "Endeks dahilindeki şirketlerin çeyreklik kümülatif net satış toplamı. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺3.450 Mr",
    "metrikEn": "$3.450 Mr",
    "degisimEtiketTr": "yıllık nominal büyüme",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  },
  {
    "id": "charts-portfolio-allocation",
    "tur": "halka-pay",
    "kategori": "KİŞİSEL FİNANS",
    "baslik": "Emeklilik Fonu Portföy Dağılımı",
    "aciklama": "Uzun vadeli birikim sepetinde risk toleransına göre ağırlık dengesi.",
    "metrik": "₺140.000 Birikim",
    "degisim": 9.5,
    "degisimEtiket": "çeyreklik büyüme",
    "tarih": "Ekim 2026",
    "boncukMiktar": 6,
    "boncukBirim": "₺25.000",
    "kaynak": "Emeklilik Gözetim Merkezi",
    "dilimler": [
      {
        "ad": "BIST 30 Endeks Fonu",
        "oran": 40,
        "renk": "yesil"
      },
      {
        "ad": "Altın Katılım Fonu",
        "oran": 30,
        "renk": "koyuyesil"
      },
      {
        "ad": "Kamu Dış Borçlanma",
        "oran": 20,
        "renk": "acikyesil"
      },
      {
        "ad": "Para Piyasası Fonu",
        "oran": 10,
        "renk": "murekkep"
      }
    ],
    "mebiusTitle": "Portfolio Allocation Chart",
    "exportName": "PortfolioAllocationChart",
    "mebiusFile": "portfolio-allocation-chart.tsx",
    "previewImage": "/kits/charts/previews/charts-portfolio-allocation.webp",
    "kategoriTr": "YAPAY ZEKÂ ÇİPLERİ & DONANIM",
    "kategoriEn": "AI CHIPS & HARDWARE",
    "baslikTr": "Emeklilik Fonu Portföy Dağılımı (YZ Analitiği)",
    "baslikEn": "Portfolio Allocation Chart (AI Analytics)",
    "aciklamaTr": "Uzun vadeli birikim sepetinde risk toleransına göre ağırlık dengesi. Yapay zekâ modelleri ve hesaplama altyapısı bağlamında resmi ölçümler.",
    "aciklamaEn": "Official AI performance and infrastructure analytics mapped to European AI standards.",
    "metrikTr": "₺140.000 Birikim",
    "metrikEn": "$140.000 Birikim",
    "degisimEtiketTr": "çeyreklik büyüme",
    "degisimEtiketEn": "Annual trend",
    "kaynakTr": "OECD AI Observatory",
    "kaynakEn": "OECD AI Policy Observatory",
    "levhaKare": true
  }
];
