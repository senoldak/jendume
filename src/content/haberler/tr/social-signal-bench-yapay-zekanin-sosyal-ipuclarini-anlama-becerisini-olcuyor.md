---
lang: tr
title: "Social Signal Bench, yapay zekânın sosyal ipuçlarını anlama becerisini ölçüyor"
description: "Interhuman AI tarafından geliştirilen kıyaslama aracı, yapay zekâ modellerinin ses ve görüntüdeki sözel olmayan ipuçlarını yorumlama becerisini test ediyor."
category: yapay-zeka
date: 2026-11-25T03:50:52.113Z
esId: "social-signal-bench-measures-how-ai-models-interpret-non-verbal-human-cues"
bolge: "Küresel"
perspektif: "Yapay zekâ modellerinin, konuşmaların transkriptlerine odaklanmak yerine ses ve videodaki sosyal sinyalleri işleyebilmesi, makinelerin iletişim bağlamını anlama kapasitesini test edilebilir kılıyor."
why_matters: "Modellerin, insanların kullandığı ancak metne dökülmeyen duraksama, şüphe veya kafa karışıklığı gibi ince davranışsal ipuçlarını ayırt edebilmesi, yapay zekâ sistemlerinin insan-makine etkileşimindeki verimliliğini artırması için gereklidir."
key_points:
  - "Social Signal Bench, 10 görsel ve 6 işitsel sinyali analiz ediyor."
  - "Evidence-Weighted F1 puanlama sistemi, yakın tahminlere kısmi puan veriyor."
  - "Test setleri 2.372 video ve 1.094 ses klibinden oluşuyor."
rakamlar:
  - etiket: "Video klibi sayısı"
    deger: "2.372"
  - etiket: "Ses klibi sayısı"
    deger: "1.094"
kaynakIzi: "v1.ARw6g6w1BVTvYPKo.QhiCPuY5b2ZM4whL+SwdLtjmDqN/XC01SI626yomWwaxLjVxInWVnnFdPWN6vxjYWZ9IaTPFE2Hwio4cGXN3xqx+maozy2VzeZBnPQ4qr4TCEoDhTPTkfvu6GfLM78oaX7jxP77fmGkMsjd0m0Xd"
kaynakAdlari:
  - ad: "Unite.AI"
    url: "https://www.unite.ai/interhuman-ai-social-signal-bench-audio-video/"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

Interhuman AI, 24 Kasım'da Social Signal Bench adlı kıyaslama aracını duyurdu. Bu sistem, çok modlu yapay zekâ modellerinin ses ve görüntüdeki sözel olmayan ipuçlarını yorumlama becerisini ölçüyor. Sistem, on görsel sinyali içeren video ve altı işitsel sinyali içeren ses kayıtlarını kullanıyor. Modeller bir klipte birden fazla sinyal tahmin edebiliyor; test setleri 2.372 video ve 1.094 ses klibinden oluşuyor.

Interhuman AI, veri seti kartını ve eğitim verilerini erişime açarken, uzman etiketli test materyalini değerlendirme için ayrı tutuyor. Sistem, geleneksel yöntemlerin aksine Evidence-Weighted F1 puanlama modelini kullanıyor. Uzman etiketli her klip, en az üç eğitimli gözlemci tarafından bağımsız olarak değerlendiriliyor. Eğer gözlemciler farklı okumalar yaparsa, puanlama yöntemi her iki okuma için de kanıt tutabiliyor. Bir model, yaptığı küçük hataları tamamen yanlış kabul etmek yerine ilgili etiketlere yakın tahminler için kısmi puan alıyor. Sistem, tahminleri referans etiketlerle bire bir eşleştiriyor ve eşleşmeyen tahminleri cezalandırıyor.

Araştırmacılar, insan etiketlerinin içsel zihinsel durumları değil, algılanan davranışları yansıttığını belirtiyor. Bu nedenle yüksek puanlar, niyetin anlaşıldığını kanıtlamıyor. Mevcut veri setleri ağırlıklı olarak İngilizce konuşulan videolardan oluşuyor ve sonuçların farklı kültürlere aktarılıp aktarılamayacağı henüz belli değil. Veri seti kuralları, izinsiz gözetimi ve işe alım gibi yüksek riskli alanlardaki kullanımı yasaklıyor.

Çalışma, yapay zekânın sadece metne değil, bir konuşmanın arkasındaki duygusal tonu ve sosyal bağlama odaklanması açısından veri sağlıyor. Model çıktıları; tahmin edilen sinyal, güven seviyesi ve kanıta dair kısa bir açıklama içeriyor. Social Signal Bench, bir sistemin metni tüm konuşma kabul etmesi yerine belirsiz kanıtlara nasıl yanıt verdiğini test etmek için yöntem sunuyor. Bu durum, modelin eğitilmiş gözlemcilerle ne kadar uyumlu olduğunu gösteriyor ancak insanın gerçek niyetini bilip bilmediğini doğrulamıyor.
