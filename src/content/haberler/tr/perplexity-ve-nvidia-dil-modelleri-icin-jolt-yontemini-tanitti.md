---
lang: tr
title: "Perplexity ve NVIDIA, dil modelleri için JOLT yöntemini tanıttı"
description: "Perplexity ve NVIDIA araştırmacıkları, dil modellerinin pekiştirmeli öğrenme sürecini geliştiren JOLT adlı yeni bir ortak öğretmen-öğrenci yöntemi geliştirdi."
category: yapay-zeka
date: 2026-10-22T07:25:44.497Z
bolge: "Küresel"
perspektif: "Bu yeni yöntem, yapay zekâ modellerinin eğitiminde gereken işlem gücünü önemli ölçüde azaltarak daha verimli ve hızlı modellerin geliştirilmesini sağlıyor."
why_matters: "Bu yöntem, yapay zekâ modellerinin pekiştirmeli öğrenme eğitiminde gereken işlem gücünü ciddi oranda azaltarak daha verimli ve hızlı geliştirme süreçlerinin önünü açıyor."
key_points:
  - "JOLT, tek bir modeli hem öğretmen hem öğrenci olarak eğitiyor."
  - "MATH testinde GRPO'ya kıyasla 6,5 kat daha az işlenmiş token harcandı."
  - "AppWorld testinde yüzde 72,09 başarı oranına ulaşıldı."
rakamlar:
  - etiket: "İşlem gücü tasarrufu"
    deger: "6,5 kat"
  - etiket: "AppWorld başarı oranı"
    deger: "%72,09"
kaynakIzi: "v1.BVQ1VbCEjWJ3YXcd.TwVJKpa4jU7EL69JPQi8c+J4tBljwPlHP1597MfBczeYtr2KmWpxsjcc9FsNhOT608DjtW6l1oHJansbgWKQ37O3QtNMEbQrhBlRgZZ/CuZUS6nTqCXbtiw3z0nhEMvMYeruZUaITTur1VXkpqse3zvSe3eLRL2EFJuBwB4dlm1zngacD4tIV568"
featured: false
breaking: false
draft: false
---

Perplexity ve NVIDIA araştırma ekipleri, dil modellerinin eğitim sonrası aşamasını optimize etmek için JOLT (Joint On-policy Learning and Teaching) adı verilen yeni bir yöntem tanıttı. Geleneksel pekiştirmeli öğrenme yöntemlerinde tek bir ödül sinyalinin yetersiz kalması ve sürecin yavaşlaması sorununa çözüm arayan bu yaklaşım, tek bir modelin aynı anda hem öğretmen hem de öğrenci rollerini üstlenmesini sağlıyor. Sistemde öğretmen rolü ayrıcalıklı bilgilere erişirken, öğrenci rolü ise yalnızca göreve odaklanıyor.

Geleneksel yöntemlerde öğretmen modelin zamanla öğrenciden uzaklaşabilmesi dezavantajını ortadan kaldırmayı amaçlayan JOLT, her iki rolün eş zamanlı olarak eğitilmesine dayanıyor. Araştırma ekibi, öğretmen modelin de eğitilmesi sayesinde geri bildirimlerin işlevselliğini koruduğunu belirtiyor. Bu ortak eğitim döngüsü sayesinde model, kendi ürettiği yörüngeler üzerinden öğrenme sürecini sürdürüyor ve karmaşık görevlerde daha tutarlı sonuçlar elde ediyor.

Yeni yöntem, MATH kıyaslama testinde GRPO yöntemiyle aynı doğruluk oranına ulaşırken, işlenen eğitim token sayısında 6,5 kat daha az kaynak harcadı. AppWorld testinde ise JOLT+ varyantı yüzde 72,09 başarı oranına ulaşarak diğer yöntemlerin önüne geçmeyi başardı. Araştırma kapsamında GSM8K, MATH, LiveCodeBench v6, AppWorld ve Terminal-Bench 2.1 gibi farklı test setlerinde çeşitli taban modeller değerlendirildi.

Elde edilen bu sonuçlar, yapay zekâ modellerinin eğitim maliyetlerini düşürme ve veri verimliliğini artırma yönünde önemli bir adım olarak değerlendiriliyor. Özellikle yapay zekâ geliştiricileri ve araştırmacılar için hesaplama maliyetlerinin kritik olduğu göz önüne alındığında, JOLT yöntemi eğitim süreçlerinde önemli bir verimlilik avantajı sunuyor.
