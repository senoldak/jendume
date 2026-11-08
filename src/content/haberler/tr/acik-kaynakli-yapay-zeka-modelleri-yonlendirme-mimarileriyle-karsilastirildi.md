---
lang: tr
title: "Açık kaynaklı yapay zekâ modelleri yönlendirme mimarileriyle karşılaştırıldı"
description: "DeepSeek, Qwen, Mixtral, Llama 4 ve gpt-oss gibi açık kaynaklı MoE modellerinin yönlendirme mekanizmaları incelendi."
category: teknoloji
date: 2026-11-08T11:50:50.079Z
esId: "open-source-ai-mixture-of-experts-models-compared-by-routing-architectures"
bolge: "Küresel"
perspektif: "Yapay zekâ modellerinin token yönlendirme stratejileri, donanım gereksinimlerini ve bilgi işlem maliyetlerini doğrudan belirleyerek sektördeki verimliliği etkiliyor."
why_matters: "Yapay zekâ modellerinin token yönlendirme stratejileri, donanım gereksinimlerini ve bilgi işlem maliyetlerini doğrudan belirleyerek sektördeki verimliliği etkiliyor."
key_points:
  - "Uzman sayıları 8 ile 384 arasında değişiyor"
  - "Top-k değerleri 1 ile 8 arasında farklılık gösteriyor"
  - "gpt-oss-120b modeli tek bir 80 GB grafik işlemcisine sığabiliyor"
rakamlar:
  - etiket: "Uzman sayısı aralığı"
    deger: "8 ila 384"
  - etiket: "Top-k aralığı"
    deger: "1 ile 8"
kaynakIzi: "v1.zg5IiEa7KExBU0H9.qafShi4Y2q4/1OBm7mxXsBy1JpI79/b/3Ra2yMzkkjHOTkecV83BpkprYknsRWARXVMBOfz1Z4qWLKJerIgGjjsfHnUnF1kliAAJJ/ewVvTucdQza4HJYqT1INHPzbJondzSEH4HJk0HFAp7zCJDEydsXqES"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/08/moe-model-routing-comparison/"
haberDegeri: 70
featured: false
breaking: false
draft: false
---

Açık kaynaklı Uzmanlar Karışımı (MoE) modelleri, ana fikirleri aynı olsa da yönlendirme detaylarında büyük farklılıklar gösteriyor. Yapılan yeni bir inceleme, DeepSeek, Qwen, Mixtral, Llama 4 ve gpt-oss gibi popüler modellerin yönlendirme mekanizmalarını karşılaştırdı. Uzman sayıları modeline göre sekiz ile 384 arasında değişirken, her token'ın seçtiği uzman sayısı yani top-k değeri bir ile sekiz arasında farklılık gösteriyor. Bazı modeller her zaman aktif paylaşımlı uzmanlar bulundururken, diğerleri bu yapıyı tamamen dışarıda bırakıyor.

İncelemeye göre modellerin büyüklükleri 35 milyar toplam parametreli Qwen3.6-35B-A3B ile 1.6 trilyon toplam parametreli DeepSeek-V4-Pro arasında değişiyor. gpt-oss-120b modeli MXFP4 formatı sayesinde tek bir 80 GB grafik işlemcisine sığabilirken, DeepSeek-V4-Pro ve Kimi K2 gibi devasa modeller birden fazla grafik işlemcisi gerektiriyor. Yönlendirilmiş seyreklik oranı Mixtral modelinde dört kat iken, Llama 4 Maverick modelinde 128 kata kadar çıkabiliyor. Kimi K2 modeli, yüksek seyrkliğin doğrulama kaybını düşürdüğünü ve daha az hesaplama gücü gerektirdiğini ortaya koydu.

Modellerin yönlendirme stratejileri incelendiğinde DeepSeek-V3 modelinin 256 uzmanı sigmoid fonksiyonuyla puanladığı görülüyor. DeepSeek-V4 ise bu sayıyı 384'e çıkarırken top-k değerini altıya düşürüyor ve karekök softplus fonksiyonunu kullanıyor. Qwen3 modelleri 128 uzman kullanırken, Qwen3.6-35B-A3B modeli 256 uzman ve bir paylaşımlı uzman mimarisine geçiş yapıyor. Llama 4 Maverick ise yoğun ve uzman katmanlarını birleştirerek token başına bir paylaşımlı ve 128 uzman içinden bir yönlendirilmiş uzman tercih ediyor.

Bu teknik farklılıklar donanım planlaması ve sunum maliyetleri açısından kritik önem taşıyor. Katman başına daha fazla uzman, bellekte daha fazla ağırlık ve daha yüksek iletişim trafiği anlamına geliyor. Düşük top-k değerleri ise token başına düşen hesaplama yükünü azaltıyor. Uzmanlar, yapay zekâ dağıtımlarında donanım bütçesi yapmadan önce bu yapılandırma dosyalarının ve yönlendirme detaylarının dikkatle incelenmesi gerektiğini vurguluyor.
