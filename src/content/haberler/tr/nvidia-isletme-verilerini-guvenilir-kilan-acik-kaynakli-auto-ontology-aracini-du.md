---
lang: tr
title: "NVIDIA işletme verilerini güvenilir kılan açık kaynaklı Auto Ontology aracını duyurdu"
description: "NVIDIA, yapay zekâ ajanlarının veri ambarlarında doğru SQL sorguları yazmasını sağlayan açık kaynaklı Auto Ontology kütüphanesini yayımladı."
category: teknoloji
date: 2026-11-02T09:51:00.411Z
esId: "nvidia-releases-auto-ontology-to-help-ai-agents-generate-reliable-sql-queries"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ ajanlarının kurumsal verileri işlerken yaptığı hata payını azaltarak güvenilir kararlar almasını sağlıyor."
why_matters: "Bu gelişme, yapay zekâ ajanlarının kurumsal verileri işlerken yaptığı hata payını azaltarak güvenilir kararlar almasını sağlıyor."
key_points:
  - "Auto Ontology, açık kaynaklı Apache 2.0 lisansıyla yayımlandı."
  - "Sistem, NVIDIA testlerinde ontoloji oluşturma süresini yüzde 90 azalttı."
  - "Ajanlar verileri dokuz salt okunur MCP aracı üzerinden sorguluyor."
rakamlar:
  - etiket: "Süre kısalması"
    deger: "%90"
  - etiket: "Model parametresi"
    deger: "30B"
kaynakIzi: "v1.qUFo1145Sb1oFcF9.Z/zUJpehBI44EUcc32j1FNH3iGLcoZIsY11vYXAu4rMEFST0w7s6bYg4SDSdEMaJQuggZOIaJZku3k5d4LGKzMEiOtxhR2RwsHBhYytzXhBZD4gq52sh7kjtEsWIS9ZRwwl6W2gXKiu6SREIY+45DHi2lorTdjU1FhF1aNTK16AvQ46nR8mIlEr8OAecHUPgsW8="
haberDegeri: 85
featured: false
breaking: false
draft: false
---

NVIDIA, kurumsal verilerin yapay zekâ ajanları tarafından doğru anlaşılmasını ve güvenle sorgulanmasını sağlayan açık kaynaklı Auto Ontology kütüphanesini tanıttı. Apache 2.0 lisansıyla yayımlanan bu araç, işletmelerin meta verilerinden bağlamsal bir katman oluşturarak ajanların yanlış veri üretme riskini en aza indirmeyi amaçlıyor.

Yapay zekâ ajanlarının veri tabanlarıyla sağlıklı iletişim kurabilmesi için geliştirilen sistem, veri tabanındaki alanların anlamını ve nasıl kullanılacağını ajana aktarıyor. Böylece hızlı ancak hatalı finansal veya operasyonel yanıtların önüne geçiliyor. Sistem, işletme verilerini keşfetme, anlamlandırma, doğrulama ve sunma gibi temel işlevleri yerine getiriyor.

Teknik altyapı olarak Next.js, FastAPI ve pgvector destekli PostgreSQL kullanan yapı, Docker Compose ve Kubernetes üzerinden kolayca kurulabiliyor. Varsayılan dil modeli olarak NVIDIA Nemotron kullanan sistem, OpenAI uyumlu diğer uç noktalarla da çalışabiliyor. Ayrıca model, sunduğu dokuz salt okunur araçla ajanların doğrudan ham şemalara erişmek yerine güvenli katman üzerinden bilgi almasını sağlıyor.

NVIDIA'nın paylaştığı verilere göre araç, şirket içi testlerde ontoloji oluşturma süresini yüzde 90 oranında azalttı. Ancak henüz bağımsız metin-SQL doğruluk skorları yayımlanmış değil. Geliştiriciler, sistemin performansını test etmek için ayrı bir değerlendirme aracı kullanabiliyor.

Bu açık kaynaklı katman, yapay zekâ ajanlarının iş dünyasındaki veri analitiği süreçlerini daha güvenli ve standart hale getirmeyi hedefliyor. Kurumlar, kendi verilerini bu katmanla entegre ederek yapay zekâ destekli karar mekanizmalarını güçlendirebiliyor.
