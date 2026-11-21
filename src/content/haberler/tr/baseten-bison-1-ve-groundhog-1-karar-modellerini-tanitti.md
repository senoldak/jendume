---
lang: tr
title: "Baseten bison-1 ve groundhog-1 karar modellerini tanıttı"
description: "Baseten, Google altyapısıyla geliştirilen ve metin üretmek yerine olasılık hesaplayan yeni karar modelleri bison-1 ve groundhog-1'i kullanıma sundu."
category: teknoloji
date: 2026-11-21T05:50:53.152Z
esId: "baseten-releases-bison-1-and-groundhog-1-decision-models"
bolge: "Küresel"
perspektif: "Bu karar modelleri, metin üretmek yerine doğrudan olasılık ve skor hesaplayarak yönlendirme, filtreleme ve güvenlik denetimi gibi süreçleri daha hızlı ve güvenilir hale getiriyor."
why_matters: "Bu karar modelleri, şirketlerin yapay zekâ iş akışlarında metin üretimi gerektirmeyen sınıflandırma ve yönlendirme işlemlerini çok daha hızlı ve ekonomik bir şekilde yapmasını sağlıyor."
key_points:
  - "bison-1 modeli 76 puanla Artificial Analysis Decision Index v2.1 listesinde birinci oldu."
  - "Modellerin bağlam kapasitesi 128 bin token'a çıkarıldı."
  - "bison-1 için milyon token başına girdi maliyeti 0,10 dolar olarak belirlendi."
rakamlar:
  - etiket: "bison-1 skor"
    deger: "76"
  - etiket: "Bağlam kapasitesi"
    deger: "128k token"
  - etiket: "bison-1 maliyet"
    deger: "0,10 dolar"
  - etiket: "groundhog-1 maliyet"
    deger: "0,035 dolar"
kaynakIzi: "v1.CgWDlueK1JWtdHAW.aY7PGPOAYe/SMJqeKslOX7gosF7tTy7NMEDocr2gr4sf9vFHT0l3VSRwOa2a9gluL5shXGX7oDTVV7rYCJM88Ciy8oaqq4e/fLDuXUbTXEDmqW5QzWnOa01haILml6oBGPAzOrGSu5vIq4Y3Tdm7i2RDvEE2ObD3IxbTdEWzNQyGOX/sktDPQkLCgME="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/20/baseten-bison-1-groundhog-1-gemma-4-decision-models/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

Baseten, yapay zekâ dünyasında metin üretmeyen ve bunun yerine evet/hayır, seçim ve skor sorularına kalibre edilmiş olasılıklar döndüren iki yeni karar modelini duyurdu. Google'ın altyapısı üzerine inşa edilen bison-1 ve groundhog-1 modelleri, bağlam kapasitesini 128 bin token seviyesine çıkararak görsel girdilerini de kabul etmeye başladı. Geleneksel dil modellerinden farklı olarak çıktı token'ı üretmeyen bu yapılar, yönlendirme, önceliklendirme ve güvenlik denetimi gibi görevlerde tek çağrıda tam politika ve geçmiş analizi yapabiliyor.

Bison-1 modeli, Artificial Analysis Decision Index v2.1 sıralamasında 76 puan alarak 19 model arasında birinci sıraya yerleşti. 31 milyar parametreli yoğun bir yapıya sahip olan bison-1, daha önceki lider modelin bir puan önüne geçmeyi başardı. Ailesinin daha ekonomik üyesi olan groundhog-1 ise token başına yaklaşık 4 milyar aktif parametre çalıştıran bir karışık uzman yapısı olarak tasarlandı ve daha düşük maliyetli işlemler için geliştirildi.

Her iki model de Baseten Model API'leri üzerinden erişime açılırken, açık ağırlıkları da Hugging Face üzerinden paylaşıldı. bison-1 modelinin milyon token başına girdi maliyeti 0,10 dolar olarak belirlenirken, groundhog-1 modeli için bu rakam 0,035 dolar olarak duyuruldu. Eğitim sürecinde bison-1 için 192 adet B200 grafik işlemcisi, groundhog-1 için ise 128 grafik işlemcisi kullanıldı.

Bu yeni modeller, yazılım geliştiricilere karmaşık karar mekanizmalarını daha düşük maliyetle ve yüksek doğrulukla kurma imkânı tanıyor. Özellikle yumuşak etiketleme yöntemiyle eğitilen bison-1, belirsizlik durumlarını doğru şekilde raporlayarak sektörde önemli bir kilometre taşı oluşturuyor.
