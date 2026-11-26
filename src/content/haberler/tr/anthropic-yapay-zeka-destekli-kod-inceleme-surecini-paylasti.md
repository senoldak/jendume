---
lang: tr
title: "Anthropic yapay zekâ destekli kod inceleme sürecini paylaştı"
description: "Anthropic, Claude Code ekibinin yapay zekâ ajanları tarafından üretilen kodlar için geliştirdiği çok katmanlı otomatik doğrulama ve inceleme sürecini paylaştı."
category: yapay-zeka
date: 2026-11-15T11:50:52.681Z
esId: "anthropic-details-automated-code-review-system-for-claude-code"
bolge: "Küresel"
perspektif: "Yazılım geliştirme süreçlerinde yapay zekânın rolü artarken, kod kalitesini korumak ve manuel inceleme süresini düşürmek için otomasyon ile insan denetiminin nasıl dengelenmesi gerektiğine ışık tutuyor."
key_points:
  - "Birleştirilen çekme istekleri iki katından fazla arttı."
  - "Tek turda geçen dahili çekme isteklerinin payı %78'e yükseldi."
  - "Beş veya daha fazla tur gerektirenlerin oranı %1,5'e düştü."
rakamlar:
  - etiket: "İç inceleme başarısı"
    deger: "%78"
  - etiket: "Çoklu tur oranı"
    deger: "%1,5"
kaynakIzi: "v1.4tMOa2ev6SXSkDza.5Iq4MnyU6a5eR2EtUlN6RPeEIMxfCZZd5gSuMLAA5+Gk2X7HWpxlvLKygIqLfkakbuzuI420LO+vpSkPD32oqvKKRrVuB9idUZXOjHyL3Jesv9144vTlJDuLSUY7edyv/j26aCpgOyXd3ZE49FYT/JmF4NDRCpaF5q6osjdu3BbD5QXpV2i5CfPcv+CpAy/inoGpINmQ08rFLkUnUBSHRi86ByuiTx/PYXxq8M5YLyibE4NrtUhIZGS1UA749b0fq5whSqY="
kaynakAdlari:
  - ad: "InfoQ"
    url: "https://www.infoq.com/news/2026/11/claude-code-review/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering"
haberDegeri: 80
featured: false
breaking: false
draft: false
---

Anthropic, Claude Code ekibinin kod incelemelerini nasıl yönettiğini ve yapay zekâ ajanlarının kod tabanına katkısının nasıl arttığını açıkladı. Geliştirilen yaklaşım; otomatik doğrulama katmanları, yapay zekâ destekli incelemeler ve riske dayalı insan onayını bir araya getirerek manuel inceleme süresini azaltmayı hedefliyor. Haziran ve eylül ayları arasında Claude Code deposunda birleştirilen çekme istekleri iki katından fazla artarken, geri alınması gereken değişikliklerin oranı %40'tan fazla düştü.

Ekip, geleneksel satır satır incelemeler yerine doğrulama süreçlerini geliştirme aşamasının başlarına taşıdı. Claude, bir çekme isteği açılmadan önce testleri çalıştırıyor, derleme yapıyor ve ayrı bir ajan değişiklikleri yeni bir bağlamda inceliyor. Her çekme isteği daha sonra otomasyon kontrollerinden geçiyor. Yapay zekâ tabanlı inceleyiciler potansiyel hataları denetliyor, güvenlik incelemeleri ise çözülmemiş sorunlar kalması durumunda birleştirmeyi engelleyebiliyor.

İnsan müdahalesi değişikliğin taşıdığı riske göre değişiklik gösteriyor. Belge güncellemeleri gibi düşük riskli değişiklikler insan onayı gerektirmezken, orta riskli değişiklikler bir, yüksek riskli değişiklikler ise iki onay gerektiriyor. CI iş akışları gibi hassas alanlardaki değişiklikler her zaman insan denetimine tabi tutuluyor. Ayrıca inceleme döngüleri en fazla üç turla sınırlandırılıyor.

Bu düzenlemeler inceleme verimliliğini artırdı. Anthropic'e göre, tek bir inceleme ve düzeltme turundan sonra geçen dahili çekme isteklerinin payı %65'ten %78'e yükseldi. Beş veya daha fazla tur gerektirenlerin oranı ise %8,9'dan %1,5'e geriledi.

İnsan inceleyiciler mimari kararlar, ürün yönü ve yüksek riskli değişiklikler için sorumluluğu elinde tutmaya devam ediyor. Anthropic, bir yapay zekâ ajanını yönlendiren kişinin ortaya çıkan koddan sorumlu olduğunu vurguluyor. Bu yaklaşım, mühendislik ekiplerinin otomatik doğrulama ile insan denetimi arasındaki dengeyi yeniden düşünmesini sağlıyor.
