---
lang: tr
title: "IBM ses tanıma ve çeviri için geliştirdiği Granite Speech 5.0 2B modelini duyurdu"
description: "IBM, altı farklı dilde sesli içerikleri metne dönüştüren ve Apache 2.0 lisansıyla yayımlanan yeni açık kaynaklı ses dil modeli Granite Speech 5.0 2B'yi tanıttı."
category: yapay-zeka
date: 2026-10-22T07:31:36.476Z
bolge: "Küresel"
perspektif: "Bu yeni yapay zekâ modeli, sesli verilerin metne dönüştürülmesi ve çok dilli çeviri süreçlerinde geliştiricilere yüksek doğruluk ve yerel cihazlarda çalışabilme esnekliği sunarak erişilebilirliği artırıyor."
why_matters: "Bu yapay zekâ modeli, ses tanıma ve çeviri işlemlerinde sunduğu yüksek doğruluk ve yerel donanımda çalışabilme özelliğiyle geliştiricilerin işini kolaylaştırıyor."
key_points:
  - "Model 2 milyar parametreye sahip ve 6 dili destekliyor"
  - "Açık ASR Liderlik Tablosu'nda yüzde 5,68 hata oranıyla ikinci sırada yer alıyor"
  - "Eğitimi 8 adet H100 grafik işlemcisinde 40 gün sürdü"
rakamlar:
  - etiket: "Parametre"
    deger: "2 milyar"
  - etiket: "Ortalama hata oranı"
    deger: "%5,68"
  - etiket: "Eğitim süresi"
    deger: "40 gün"
kaynakIzi: "v1.542xWcs1JBKFnd1e.s6QaPpTBXmuF6jwkKnpjN/rFJCoEyFMUf021Jn1jJAzh2xvCrDgv7apyGQj+EHPlGztHkLzsRLVcs0ciYwVyZKyMD07pIswDbe+nJ1U8T3/d2ElvrEHUEnDK/mM/q3DTo+2EK7oievkvQvtp/7KPUZPBrbh3L4ms4us="
featured: false
breaking: false
draft: false
---

IBM, ses tanıma ve çeviri alanındaki çalışmalarını yeni bir açık kaynaklı modelle genişletti. Şirket, altı farklı dilde sesli verileri metne dönüştürebilen ve Apache 2.0 lisansıyla kullanıma sunulan Granite Speech 5.0 2B modelini duyurdu. Geliştiriciler için hazırlanan bu yeni sistem, doğru transkripsiyon, hızlı cihaz içi dönüştürme ve konuşmacı etiketleme gibi özellikler barındırıyor.

Modelin temel mimarisi, YaRN uzantısı kullanılarak 16 bin konuma çıkarılan bir dil modeli omurgasına dayanıyor. Eğitim sürecinde 390 bin saatlik halka açık ses verisi ve sentetik veri setleri kullanılırken, modelin eğitimi sekiz adet H100 grafik işlemcisi üzerinde kırk gün sürdü. Ayrıca sistem, GPU, Apple Silicon ve yerel CPU ortamlarında çalışabilme yeteneğiyle dikkat çekiyor.

Performans testlerinde Açık ASR Liderlik Tablosu'nda ikinci sırada yer alan model, ortalama yüzde 5,68 İngilizce kelime hata oranına ulaşıyor. LibriSpeech Clean testinde yüzde 0,99 gibi düşük bir hata oranı yakalayan sistem, kelime önyükleme listeleri sayesinde özel ürün adları ve kısaltmalarda da yüksek başarı gösteriyor.

IBM bu duyuruyla birlikte Turbo CTC ve Granite Speech 4.1 2B Plus modellerini de güncelledi. Turbo CTC modeli performansını artırarak saniyede işlenen gerçek zamanlı işlem hızını yükseltirken, 4.1 2B Plus sürümü ise zaman damgası kaymalarını ve uzun metin hata oranlarını düşürdü. Geliştiriciler bu modellere Transformers, vLLM, llama.cpp ve mlx-audio üzerinden erişebiliyor.
