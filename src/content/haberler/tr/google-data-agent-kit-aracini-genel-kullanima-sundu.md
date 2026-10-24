---
lang: tr
title: "Google Data Agent Kit aracını genel kullanıma sundu"
description: "Google, yapay zekâ kodlama ajanlarının bulut servisleriyle güvenli ve doğrudan çalışmasını sağlayan Data Agent Kit aracını genel erişime açtı."
category: teknoloji
date: 2026-10-24T09:51:02.608Z
esId: "google-data-agent-kit-becomes-generally-available"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ ajanlarının şirket veritabanlarında daha güvenli ve kontrollü işlemler yapabilmesi için kritik bir altyapı sunuyor."
why_matters: "Bu gelişme, yapay zekâ ajanlarının şirket veritabanlarında daha güvenli ve kontrollü işlemler yapabilmesi için kritik bir altyapı sunuyor."
key_points:
  - "Data Agent Kit genel kullanıma sunuldu ve tamamen açık kaynaklı."
  - "Paket içerisinde 37 farklı beceri seti yer alıyor."
  - "Güvenlik önlemleri IAM altyapısı ve kullanıcı onayıyla sağlanıyor."
rakamlar:
  - etiket: "Beceri sayısı"
    deger: "37"
kaynakIzi: "v1.o+KoYi1vWHklM19V.ibqM2BO/xzL7pey1rMSzTT/qGOQ03xWZ18hQw5NhMoiuPgECnI/A5+UifL8QLzJpPQJyjrOLxZbQ3lSiJHYCMF/959duDRyLKTeKIQi7AXwK1bRvISD9vYyoK8jKBIASj+U574Cm/NEE7ytTCj91HDWNhRazmUoDM7e6qWwWarJc0JVj3b4U4x2NpydgLwc+Y9STtMbUsm5ygih6WhpbLWEJjAXfiANl+6YDe303Nm35r7j6I7BiPDkplBzM4VhYv08aVg=="
featured: false
breaking: false
draft: false
---

Google, yazılımcıların kullandığı yapay zekâ ajanlarının bulut verileriyle etkileşim kurmasını sağlayan Data Agent Kit aracını önizleme sürecinden çıkararak genel kullanıma sundu. Tamamen açık kaynaklı ve ücretsiz olan bu araç, kodlama ajanlarının Google Veri Bulutu servisleriyle bağlantı kurmasını ve veritabanı optimizasyonu gibi konularda rehberlik almasını sağlıyor. Antigravity, Claude Code, Codex, Cursor ve VS Code uyumlu editörlerde çalışan araç; Cloud Shell ve Cloud Workstations ortamlarında önceden kurulu olarak geliyor.

Yeni sürümle birlikte BigQuery Graph, Bigtable ve Managed Service for Apache Spark gibi servisler sisteme eklendi. Ürün yöneticileri, yapay zekâ ajanlarının iyi kod yazmasına rağmen hangi tabloların mevcut olduğunu, nasıl bölümlendirildiğini veya geçmiş işlerin neden başarısız olduğunu bilmediği bir boşluğu bu kit ile kapatmayı hedefliyor. Depoda Apache 2.0 lisansıyla 37 farklı beceri seti yer alıyor. Araç için 29 Eylül tarihinde 1.0.0, 13 Ekim tarihinde ise 1.1.0 sürümleri yayınlandı.

Sistem, veri kaybını önlemek için bazı güvenlik önlemleri barındırıyor. Örneğin kazara veri silinmesini engellemek amacıyla ajanların kritik komutları çalıştırmadan önce kullanıcıdan açık onay alması kuralı bulunuyor. Ajanların veri tabanı tablolarını silmesini veya anahtar imha işlemlerini engellemek için bu kurallar sıkı bir şekilde uygulanıyor. Ayrıca erişim kontrolü, Google IAM altyapısı üzerinden sağlanarak yetkilendirme süreçlerinin güvenli bir şekilde yönetilmesine imkân tanıyor.

Uzmanlar, bu tür araçların yapay zekâ ajanlarının üretim ortamlarında daha güvenli kullanılmasını sağladığını belirtiyor. Bununla birlikte, zaman aşımına uğrayan işlemlerin takibi, yeniden deneme mekanizmaları ve geri alınabilirlik gibi bazı alanlarda geliştirilmesi gereken noktalar olduğu da mühendisler tarafından vurgulanıyor. Araç, Google Cloud servislerinin maliyeti dışında ek bir ücret gerektirmiyor.
