---
lang: tr
title: "TensorLean yapısı GPU çekirdeklerini biçimsel olarak doğruluyor"
description: "Araştırmacılar, GPU çekirdeklerinin biçimsel doğrulasyonunu PTX seviyesinde gerçekleştiren yeni bir çerçeve olan TensorLean'i tanıttı."
category: bilim
date: 2026-11-22T03:50:52.079Z
esId: "tensorlean-framework-formally-verifies-gpu-kernels-at-ptx-level"
bolge: "Küresel"
perspektif: "Bu gelişme, büyük yapay zekâ modellerinin çalışmasını sağlayan GPU donanımlarının hatasız ve güvenli çalışmasını sağlayarak yapay zekâ altyapısının güvenilirliğini artırıyor."
why_matters: "Bu gelişme, yapay zekâ modellerinin belkemiği olan GPU donanımlarının yazılımsal hatalardan arındırılmasını sağlayarak sistem güvenilirliğini artırıyor."
key_points:
  - "TensorLean, GPU çekirdeklerini PTX seviyesinde doğruluyor."
  - "149 çekirdek örneğinden 83'ü doğru kanıtlandı, 38 hata bulundu."
  - "FlashAttention-4'te testlerde görünmeyen bir veri yarışı yakalandı."
rakamlar:
  - etiket: "İncelenen örnek"
    deger: "149"
  - etiket: "Doğru kanıtlanan"
    deger: "83"
  - etiket: "Bulunan hata"
    deger: "38"
kaynakIzi: "v1.7BxBduP90VSpCCcN.RumK9yoB4Z3wPL8H62TPi5N0lHmV2coL2RWw1jVQs8czybEBjlJcbBUJnIGP/jysOcGryF5xGmZ4ZdVX7oSJdtI8x14v18BJ0lCEWrkjvwj/QSzUEwNwDKtwr0T4uvH/NvW7HegccD767zSALiEjxh/1rDJ6zL2Q3Bsvfco3HgrscLLD3d1IILBnm1bDuo3eVhqA"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/21/columbia-certik-tensorlean-formal-verification-gpu-kernels/"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

Columbia Üniversitesi ve CertiK'ten araştırmacılar, GPU çekirdeklerinin biçimsel doğrulasyonunu PTX seviyesinde yapan TensorLean adlı yeni bir çerçeve tanıttı. TensorLean, derlenmiş çekirdeklerin bir tensör seviyesi matematik şartnamesiyle eşleştiğini kanıtlayan Lean tabanlı bir doğrulayıcı olarak öne çıkıyor. Ekip, FlashAttention-2, -3 ve -4 ile DeepGEMM dahil olmak üzere 149 çekirdek örneğini inceledi ve bunlardan 83'ünün doğru olduğunu kanıtladı.

Kalan örnekler üzerinde yapılan incelemelerde ise toplam 38 doğruluk hatası tespit edildi. Yapının en önemli yönlerinden biri, yapay zekâ donanım yazılımlarında gizli kalan ve geleneksel testlerle kaçabilecek kritik hataları yakalayabilmesi. Örneğin sistem, FlashAttention-4'te daha önce standart testlerde görünmemiş bir veri yarışını tespit etmeyi başardı.

Bu durum, yapay zekâ hesaplamalarının temelini oluşturan donanım ve yazılım katmanlarının güvenliği açısından büyük bir önem taşıyor. Sistem, 16 çekirdekli bir iş istasyonunda çalışarak A100, H100 ve B200 GPU'ları için derlenen PTX kodlarını kontrol ediyor. Şartnameler, çekirdek kaynak kodunun yaklaşık 15 kat daha küçük bir oranına sahip. Toplamda 149 çekirdek örneğinin 83'ü doğru kanıtlanırken, 6 projede toplam 38 hata bulundu. Bu hataların 23 tanesi FlashAttention sürümlerinde yer alıyor.

TensorLean, yapay zekâ altyapısının hızla büyüdüğü bu dönemde donanım optimizasyonlarının güvenliğini artırmak için yeni bir yaklaşım sunuyor. Geleneksel eşdeğerlik denetleyicileri döngüleri tek bir somut kurulum için açarken, TensorLean sembolik parametreler kullanarak daha geniş bir kapsam sağlıyor. Bu teknoloji, yapay zekâ modellerinin çalıştığı altyapının daha kararlı ve güvenli olmasına katkıda bulunuyor.
