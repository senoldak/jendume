---
lang: tr
title: "Google, yapay zekâ ajanlarındaki hataları tespit eden AQuA aracını açık kaynaklı hale getirdi"
description: "Google, üretim ortamındaki yapay zekâ ajanlarının gizli kalite düşüşlerini ve hatalarını tespit etmek için geliştirdiği AQuA aracını açık kaynak olarak yayımladı."
category: teknoloji
date: 2026-11-13T15:50:53.241Z
esId: "google-open-sources-aqua-to-diagnose-production-ai-agent-failures"
bolge: "Küresel"
perspektif: "Yapay zekâ ajanlarının karmaşık iş akışlarında sessizce yaptığı hataları yakalamak, güvenilir sistemler kurmak ve geliştirici süreçlerini iyileştirmek açısından bu araç büyük önem taşıyor."
why_matters: "AQuA, geliştiricilerin üretim ortamındaki karmaşık hata ayıklama süreçlerini otomatize ederek, yapay zekâ ajanlarının performansını ve kullanıcı deneyimini doğrudan iyileştiriyor."
key_points:
  - "AQuA aracı her çalıştırmada en fazla 1.000 son oturumu örnekliyor."
  - "Google, çok ajanlı seyahat uygulamasında 32 oturumu değerlendirdi."
  - "Geliştiriciler, 14 gün boyunca gözlemlenmeyen bulguları otomatik olarak çözüldü olarak takip edebiliyor."
rakamlar:
  - etiket: "Oturum örnekleme"
    deger: "1.000 oturum"
  - etiket: "Değerlendirilen oturum"
    deger: "32 oturum"
  - etiket: "Tespit edilen bulgu"
    deger: "42 bulgu"
  - etiket: "Çözüm süresi"
    deger: "14 gün"
kaynakIzi: "v1.+qnUXl1oXbI3gZdS.JVQpCHpldgDu0A9GagJfm7A4syfpsfYosocaG9EGPjXorbS9FMLuXDyzbZtLt/2xiJp8JSwJV4IkfnVzJz8DULV3yb3kJhktzdQmwdiLHUXjar8wfYAZW4aXEsoK7AWPTHiTlE8Sh6cKmgLZp9+bXKOFqK00Hajca5rIJbgyDICaVk/ym6SpYT84SHiYokbY6BJe9GHEFePCt7XM063UlwcZvWt8KVhH6k1xRGtoaRmnfzp9szyOKx/OR1gigzobJNE5yqG0z6fTc2NE"
kaynakAdlari:
  - ad: "InfoQ"
    url: "https://www.infoq.com/news/2026/11/google-ambient-agent-prod/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

Google, üretim ortamında çalışan yapay zekâ ajanlarının oturumlarını analiz eden ve tekrarlayan hata kalıplarını inceleyen AQuA (Ambient Quality Agent) adlı referans uygulamasını açık kaynaklı olarak erişime açtı. Geleneksel altyapı izleme araçlarının gözden kaçırabileceği, ajanların kullanıcı tercihlerini görmezden gelmesi veya gerekli araç çağrılarını atlaması gibi sessiz kalite düşüşlerini hedefleyen bu yeni araç, yazılım geliştiricilere önemli bir kolaylık sunuyor. AQuA, Google Cloud üzerinde ajanla birlikte çalışarak istek yolunun dışında kalıyor ve bulut izleme günlüklerinden veri okuyor. Her çalıştırmada en fazla 1.000 oturumu örnekleyen sistem, beş aşamadan oluşan bir süreçle bulguları inceliyor ve kümelendiriyor. Geliştiriciler, hedef dosyaları kullanarak kendi alanlarına özgü kalite kriterleri belirleyebiliyor ve araç, zamanlanmış olarak ya da dağıtımlardan sonra çalıştırılabiliyor. Kök neden analizinde AQuA, hatalı oturumları dağıtım anındaki kaynak anlık görüntüsüyle karşılaştırıyor. Teşhis ajanı ilgili kod veya talimatları belirleyerek dosya aralıklarını sunuyor ve sorun kod deposundan kaynaklandığında değişiklikler öneriyor. Ancak sistem, otomatik olarak düzeltme uygulamıyor veya çekme isteği açmıyor; böylece denetim tamamen geliştiricilerde kalıyor. Gerçekleştirilen ilk değerlendirmelerde çok ajanlı bir seyahat uygulamasının oturumları incelendi ve çeşitli hata kümeleri tespit edildi. Geliştiriciler ipuçlarını güncelledikten sonra yapılan kontrollü testlerde, koltuk seçim atlamaları ve diyet tercihi ihmalleri gibi hataların önemli ölçüde azaldığı görüldü. Google'ın bu açık kaynak hamlesi, üretim aşamasındaki yapay zekâ teşhis süreçlerini geliştirme iş akışlarına entegre etmeyi amaçlıyor.
