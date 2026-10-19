---
lang: tr
title: "Deepgram, Nova-3 konuşma modelini AWS Trainium2 ile optimize etti"
description: "Deepgram, Nova-3 konuşmadan metne dönüştürme modelini AWS Trainium2 çiplerine uyarlayarak maliyetleri düşürdü ve işlem verimliliğini artırdı."
category: teknoloji
date: 2026-10-19T17:50:57.903Z
bolge: "Küresel"
perspektif: "Bu gelişme, büyük ölçekli ses işleme modellerinin özel donanım optimizasyonları sayesinde çok daha düşük maliyetlerle çalıştırılabileceğini gösteriyor."
why_matters: "Donanım optimizasyonu, yapay zekâ modellerinin çalıştırma maliyetlerini düşürerek daha geniş kitlelere erişmesini sağlar."
key_points:
  - "Nova-3 modeli AWS Trainium2 çiplerine port edildi."
  - "Maliyet başına yüzde 11 ila yüzde 70 daha fazla ses işlendi."
  - "Tek bir donanım üzerinde sekiz model kopyası çalıştırıldı."
rakamlar:
  - etiket: "Geliştirici sayısı"
    deger: "200.000"
  - etiket: "Kuruluş sayısı"
    deger: "1.400"
  - etiket: "Verimlilik artışı"
    deger: "%11-70"
kaynakIzi: "v1.TbIPDcJeVndhjBR4.EtPi+IElXdtO3o9bcDky0mLxzBi1F+3qBJHCAjyCyhPnD0k/vxEsRexsns6N/DQYxV5857NNHsrXqbJ7y8a1ZItTEwclUt0CAAvgf4x8lJ0zizcdUFP+f4uCYwoVIhmVtxHwFhbxyx2HALxmjZ+Q2FWX0c9BidFNyi1JwPEq7BuE/vqPnD+ivcZNyRyMeNJQ2iV/rwpiJw7nZZcqlnMQyIJ/lGAiLA=="
featured: false
breaking: false
draft: false
---

Deepgram, konuşma yapay zekâsı modellerini ölçeklenebilir hale getirmek amacıyla Amazon Web Services (AWS) altyapısını kullandı. Şirket, Nova-3 konuşmadan metne dönüştürme modelini AWS Trainium2 yapay zekâ çiplerine taşıyarak çevrimdışı toplu iş yüklerinde önemli bir verimlilik elde etti. Yapılan optimizasyon çalışmaları sonucunda, sistem maliyet başına yüzde 11 ile yüzde 70 arasında daha fazla ses verisi işlemeyi başardı. Bu süreç, 200.000'den fazla geliştiriciye ve 1.400 kuruluşa hizmet veren sistemin altyapı bütçesini verimli kullanmasını sağlıyor.

Süreç, standart PyTorch kodunun AWS Neuron yazılım yığınına uyarlanmasıyla başladı. Mühendisler, modelin kodlarını derleyerek tüm işlemlerin CPU yedeklemesi olmadan doğrudan Trainium2 üzerinde çalışmasını sağladı. Ardından çekirdek düzeyinde yapılan özelleştirmelerle katman gecikmeleri azaltıldı ve işlemci kullanımı maksimize edildi. Derleme aşamasında karşılaşılan bazı performans darboğazları, sıfırdan yazılan özel çekirdekler ve Neuron Kernel Interface yardımıyla aşıldı. Bu sayede modelin daha yüksek toplu iş boyutlarında sorunsuz çalışması sağlandı.

Deepgram, Python bağımlılığını tamamen ortadan kaldırarak Rust tabanlı hafif bir çalışma zamanı geliştirdi. Bu yeni mimari sayesinde tek bir donanım birimi üzerinde sekiz model kopyası aynı anda çalıştırılabiliyor. Giriş verileri, her kopya için bir iş parçacığı barındıran çalışma kuyruğu ile eş zamanlı olarak işleniyor.

Elde edilen bu maliyet ve performans kazanımları, şirketlerin ses işleme altyapılarını daha ekonomik yönetmesine olanak tanıyor. Sağlanan bu avantajlar, modelleri Amazon SageMaker AI üzerindeki kendi sanal özel bulutlarında barındıran müşteriler için de geçerliliğini koruyor ve sistemlerin daha düşük fiyatlarla sunulmasının önünü açıyor.
