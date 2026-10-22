---
lang: tr
title: "Google araştırmacılarından otonom ajanların öğrenmesini hızlandıran EnvHarness çatısı"
description: "Google tarafından geliştirilen EnvHarness, yapay zekâ ajanlarının zayıf yönlerine göre eğitim ortamlarını dinamik olarak uyarlayarak sürekli gelişim sağlamalarını mümkün kılıyor."
category: yapay-zeka
date: 2026-10-16T23:20:56.430Z
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ ajanlarının sabit test ortamlarında takılıp kalmasını önleyerek sürekli ve daha verimli bir şekilde öğrenmelerini sağlıyor, bu da otonom sistemlerin gerçek dünya görevlerindeki başarısını artırıyor."
why_matters: "Ajanların sabit test ortamlarında öğrenme sınırına takılmasını önleyerek yapay zekânın sürekli ve ölçeklenebilir bir şekilde gelişmesinin önünü açar."
key_points:
  - "EnvHarness, yapay zekâ ajanlarının zayıf yönlerine göre eğitim ortamlarını dinamik olarak uyarlar."
  - "Test edilen modellerde (Gemini, Qwen, Claude) 2.9 ile 3.7 yüzde puanı arasında performans artışı sağlandı."
  - "Sistem; WebArena, SWE-bench Verified ve ALFWorld gibi benchmark testlerinde başarıyla denendi."
kaynakIzi: "v1.euYNyvx0GExWf1oo.rmWxXUfI9z7EAuYVvs4enRjTy0Mefv3Yyk5MMbaQpYvV1bACv6mEl02kMH0jOTnBasPt3y44Dtfu+lCLbiUjDgBWHpljTU8qBy/YkOqw6DYUld6wTqRrnrDiOU5hnqhAZehN6E2puK6IU+zb1I+t3rQNCXXJVPzvCWqMfoyL4patJ0g5J8blezo0dpAucr9WZ2qz4C6GpPu8RFfZowecXVedueQBTD/QcJxUbZ9UkUA2cGyo8jkNxC56Zu5vh88fazAXQF6qXLEIQBWrf/EsjGCk"
featured: false
breaking: false
draft: false
---

Google araştırmacıları, yapay zekâ ajanlarının eğitim ortamlarını dinamik olarak uyarlayan EnvHarness adlı açık kaynaklı bir çerçeve geliştirdi. Geleneksel olarak yapay zekâ ajanları kendilerini geliştirirken istemlerini yeniden yazar ancak operasyonel ortamlar genellikle sabit kalır. Sabit kriterler ve aynı kurallar bir süre sonra ajanların öğrenme kapasitesini sınırlar ve yeni bir şey öğretemez hale gelir. Bu sorunu çözmek için tasarlanan EnvHarness, mevcut ortamların yapısını bozmadan arayüze programlanabilir eklentiler yerleştirerek ortam davranışlarını dinamik olarak değiştirir.

Sistem, ortamın başlangıç ​​durumunu özelleştiren, durum geçişlerini kısıtlayan ve ajana sunulan gözlemleri özelleştiren üç ana bileşen üzerine kuruludur. Ayrıca EnvRigger bileşeni sayesinde ajanların davranışlarını analiz ederek tekrarlayan zayıflıkları tespit eder ve hedefe yönelik modifikasyonlar üretir. Bu döngü, ajan ile ortam arasında sürekli bir ortak evrim sağlayarak performans artışına katkıda bulunur.

Araştırmacılar, EnvHarness çerçevesini WebArena, SWE-bench Verified ve ALFWorld gibi çeşitli benchmark testlerinde değerlendirdi. Gemini 3.1 Flash-Lite, Qwen3.6 27B, Gemini 3.5 Flash ve Claude Sonnet 4.6 dahil olmak üzere test edilen modellerin tamamında ana mantıkları değiştirilmeden 2.9 ile 3.7 yüzde puanı arasında performans artışı görüldü.

Bu çerçeve, statik ortamların yetersiz kaldığı alanlarda tutarlı kazanımlar sunuyor ve etki alanından bağımsız arayüzü sayesinde farklı alanlara uyum sağlıyor. Geliştiriciler, orijinal görevleri ve insan yapısı doğrulayıcıları koruyarak ajanların eksikliklerini gidermenin yeni bir yolunu elde etmiş oluyor.
