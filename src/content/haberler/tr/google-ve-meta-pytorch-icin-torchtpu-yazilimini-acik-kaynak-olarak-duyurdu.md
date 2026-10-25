---
lang: tr
title: "Google ve Meta, PyTorch için TorchTPU yazılımını açık kaynak olarak duyurdu"
description: "Google ve Meta, yapay zekâ modellerinin Google Tensor İşleme Birimleri üzerinde doğrudan çalışmasını sağlayan TorchTPU'yu açık kaynaklı hale getirdi."
category: teknoloji
date: 2026-10-25T19:50:57.673Z
esId: "google-and-meta-open-source-torchtpu-for-native-pytorch-on-tpus"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ donanımında tek bir üreticiye bağımlılığı azaltarak yazılımcıların modellerini farklı çipler arasında çok daha kolay taşınmasını sağlıyor."
why_matters: "Bu gelişme, yapay zekâ donanımında tek bir üreticiye bağımlılığı azaltarak yazılımcıların modellerini farklı çipler arasında çok daha kolay taşınmasını sağlıyor."
key_points:
  - "Google ve Meta, TorchTPU'yu açık kaynaklı hale getirdi."
  - "Qwen3 modeli 8.192 adet TPU v7x çipi üzerinde test edildi."
  - "Amazon Web Services, Trainium çipleri için TorchNeuron'u beta aşamasına taşıdı."
rakamlar:
  - etiket: "TPU çip sayısı"
    deger: "8.192"
kaynakIzi: "v1.OpEeHKV/X2lk/lDe.f2dI0RN64E7v9sZUcnpr6kDrMPtoedN6ZgyKQrfEY4Q2Kk1np3W5mEbeOQG9ZD1MoJtepni1z+S4Qa0ioE5cX9zFLbiyflA5+mK1hE0Gal2aKyOUg54MDw0SUDPD0zprQyHSnRndFydExmlz4/jKnsH6H32rSBuWhmUDFODw4lkJjB3W4UgdyqAI/xARHmhh2mTGsvJiHlSonGuaYT4N6XE/PIDrDiMjHwWLOth3JKWFdnFM0NvmbQ5ZmAzQNqD1hwkcVN8J3Q=="
featured: false
breaking: false
draft: false
---

Google ve Meta, San Jose'de düzenlenen PyTorch Konferansı'nda, yapay zekâ modellerinin Google'ın Tensor İşleme Birimleri (TPU) üzerinde yerel olarak çalışmasını sağlayan TorchTPU yazılımını duyurdu. Meta yazılım mühendisi Zongwei Zhou, Meta'nın büyük ölçekli dil modelleri iş yüklerini bu yeni sistemle TPU'lara taşımayı planladığını açıkladı. Yeni arka uç yazılımı, 2020 yılında geliştirilen ve kaynak kodunda karmaşık değişiklikler gerektiren PyTorch/XLA köprüsünün yerini alıyor. Yapılan güncellemeyle birlikte geliştiriciler, bir modeli TPU'ya uyarlamak için kod üzerinde basit bir değişiklik yapabiliyor. Google Cloud mühendislik yöneticisi Bill Jia, bu sayede TPU'ların tıpkı grafik ve merkezi işlem birimleri gibi PyTorch için yerel bir seçenek haline geldiğini belirtti. Konferansta açıklanan verilere göre, yapay zekâ modellerinde çıkarım işlemleri veri merkezlerindeki en büyük iş yükü haline gelirken, ajanların token tüketimi insan tüketimini geride bıraktı. Yeni açık kaynaklı projeler arasında TorchTPU'nun yanı sıra vLLM-TorchTPU, SGLang-TorchTPU ve TorchTitan depoları da yer alıyor. Google, 8.192 adet TPU çipi üzerinde Qwen3 modelini çalıştırarak başarılı sonuçlar elde ettiğini paylaştı. Öte yandan Amazon Web Services de benzer bir hamle yaparak Trainium çipleri için geliştirdiği TorchNeuron yazılımını halka açık beta sürecine soktu. Uzmanlar, bu tür hamlelerin donanım çeşitliliğini artırdığını ancak optimizasyon süreçlerinin hâlâ donanım üreticilerinin kontrolünde kaldığına dikkat çekiyor. Geliştiricilerin bu geçişi yaparken sharding ve çekirdek çalışmaları için bütçe ayırması gerekiyor.
