---
lang: tr
title: "Google Research büyük dil modelleri için uyku aşamasını tanıttı"
description: "Google Research, büyük dil modellerinin sürekli öğrenmesini sağlayan ve felaket unutmayı önleyen yeni bir uyku çerçevesi geliştirdi."
category: yapay-zeka
date: 2026-10-27T17:51:02.057Z
esId: "google-research-introduces-sleep-framework-for-continual-learning-in-llms"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ modellerinin sabit bilgi sınırlarını aşarak sürekli yeni bilgiler öğrenmesini ve insan beynine benzer şekilde hafızasını stabilize etmesini sağlıyor."
why_matters: "Bu gelişme, yapay zekâ modellerinin sabit bilgi sınırlarını aşarak sürekli yeni bilgiler öğrenmesini ve insan beynine benzer şekilde hafızasını stabilize etmesini sağlıyor."
key_points:
  - "Büyük dil modelleri için yeni uyku çerçevesi tanıtıldı"
  - "Model, 10 milyon token'a kadar uzun bağlam bilgilerini koruyabiliyor"
  - "Felaket unutma sorununu önlemek için hafıza konsolidasyonu kullanılıyor"
rakamlar:
  - etiket: "Uzun bağlam"
    deger: "10 milyon token"
kaynakIzi: "v1.sWVASvz4u7bDf+bF.mh7CeWJUZsjrUIPklVlVGiJGTsL9X8M4ZhaovQdVu/7k9khJ005dvUM+Mj3ZLZE2SJmtWau6rSi7E/x/+wmxTH9qRkcIkUnwg/noj0YfzMx/UfoZGkvp3lccm4aYCar/QBIVwEFgiwZAXzEfJ/dZIRgry05i9z4fo+PbGK3ELaow8q/TwskwvIhRdbOay+jmP5ETdj/GJEJRwVo7qgcR+8o="
kaynaklar:
  - ad: "Google Research"
    url: "https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/"
featured: false
breaking: false
draft: false
---

Google Research araştırmacıları Ali Behrouz ve Vahab Mirrokni, büyük dil modellerinin sürekli öğrenme sürecinde karşılaştığı temel bir sorunu çözmek için uyku çerçevesini tanıttı. Geleneksel yapay zekâ modelleri, ön eğitim sonrasında sabit bir bilgi tarihiyle kalır ve yeni verilerle güncellendiğinde felaket unutma adı verilen eski bilgileri kaybetme sorunu yaşar. İnsan beyinlerinin dinlenme sırasında hafızayı işlemesinden ilham alan bu yeni yaklaşım, modellerin aktif etkileşim ile çevrimdışı hafıza konsolidasyonu arasında geçiş yapmasını sağlıyor.

Uyku paradigması iki aşamadan oluşur: hafıza konsolidasyonu ve rüya görme. Çevrimdışı uyku aşamasında model, önceden ayrılmış Mixture-of-Experts bellek bloklarını açarak sayısal ağırlıklarını günceller. Bu süreç, modelin çekirdek kodunu değiştirmeden yeni olguları absorbe etmesine ve akıl yürütme doğruluğunu artırmasına yardımcı olur. Hafıza konsolidasyonu, kırık kısa süreli bağlamları uzun vadeli parametrelere dönüştürürken, rüya görme aşaması otonom bir öz geliştirme döngüsü uygular.

Araştırmacılar, bu yöntemin modellerin 10 milyon token'a kadar uzun bağlam bilgilerini korumasını sağladığını belirtiyor. Geleneksel makine öğreniminde eğitim ve çıkarım keskin bir şekilde ayrılırken, bu çerçeve bu ayrımı esneterek akıllı ajanların sürekli öğrenmesine olanak tanıyor. Model, kendi ürettiği pratik örnekleri kullanarak ağırlıklarını günceller ve böylece önceki yeteneklerini kaybetmeden yeni yetenekler kazanır.

Bu teorik ve pratik yaklaşım, yapay zekâ modellerinin statik kalma sorununa kalıcı bir çözüm sunmayı amaçlıyor. Yapay zekânın günlük hayatımıza entegrasyonu arttıkça, bu tür sürekli öğrenme mekanizmaları modellerin güncel kalmasında kritik bir rol oynayacak.
