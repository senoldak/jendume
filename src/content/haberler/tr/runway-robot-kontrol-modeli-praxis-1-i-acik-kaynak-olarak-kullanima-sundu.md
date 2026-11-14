---
lang: tr
title: "Runway, robot kontrol modeli Praxis-1'i açık kaynak olarak kullanıma sundu"
description: "Runway, videolardan öğrendiklerini robot hareketlerine dönüştüren Praxis-1 modelini kaynak kodları ve ağırlıklarıyla birlikte erişime açtı."
category: teknoloji
date: 2026-11-14T09:50:54.981Z
esId: "runway-releases-praxis-1-robot-control-model-with-open-source-code"
bolge: "Küresel"
perspektif: "Bu gelişme, robotların eğitilmesi için gereken maliyetli ve özel veri toplama sürecini azaltarak yapay zekânın fiziksel dünyayla etkileşimini hızlandırıyor."
why_matters: "Bu gelişme, robotların eğitilmesi için gereken maliyetli ve özel veri toplama sürecini azaltarak yapay zekânın fiziksel dünyayla etkileşimini hızlandırıyor."
key_points:
  - "Praxis-1 modeli Apache 2.0 lisansıyla açık kaynak olarak yayımlandı."
  - "Nvidia RoboLab-120 testinde %46,2 başarı oranı elde etti."
  - "Standart model sürümü 80 GB bellekli grafik kartı gerektiriyor."
rakamlar:
  - etiket: "RoboLab-120 başarısı"
    deger: "%46,2"
  - etiket: "Franka test başarısı"
    deger: "88 deneme"
  - etiket: "Standart model VRAM"
    deger: "80 GB"
  - etiket: "Sıkıştırılmış model VRAM"
    deger: "32 GB"
kaynakIzi: "v1.TsD2TyroASbfqWOJ.C1OodfukBdAnH8wgRxCv5GPyx9BQlzwqDtHrKoOxRanVd96p5FLSTWHdZDySGZOk1XFrdZgvuh9ZBPjNH5f2kP2u2Fh28aNclHOBVizfN97JhNzBg/q75GRCnrisO6ubzFDpXldhnqJuwxcbUxWtFJ700o8aDYTVIXmpIxFUhY+C/4kK/mlLrcBjBw=="
kaynakAdlari:
  - ad: "The Decoder"
    url: "https://the-decoder.com/runways-open-source-praxis-1-turns-video-ai-into-a-robot-controller/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

Runway, robotik sistemleri kontrol etmek üzere geliştirdiği Praxis-1 modelini Apache 2.0 lisansı altında açık kaynak olarak yayımladı. Daha önce sınırlı sayıda iş ortağına sunulan bu model, artık kaynak kodu ve ağırlıklarıyla birlikte geliştiricilerin erişimine açıldı. Praxis-1, kamera görüntülerini, metin talimatlarını ve robotun konum verilerini işleyerek çevredeki değişimleri tahmin ediyor ve bu tahminlere dayalı olarak robotun hareketlerini hesaplıyor.

Modelin temelinde, nesnelerin hareketlerini ve etkileşimlerini sıradan video kayıtlarından öğrenen bir video modeli yatıyor. Şirket, bu altyapıyı insan eylemlerini içeren videolar ve robotik verilerle ince ayar yaparak geliştirdi. Bu yöntem, robotik sistemlerin eğitimi için geleneksel olarak ihtiyaç duyulan ve toplanması oldukça maliyetli olan özel veri setlerine olan bağımlılığı azaltmayı hedefliyor. Standard Bots, Noble Machines ve Ultra gibi şirketler, eylül ayından bu yana modeli insansı robotlar, endüstriyel kollar ve depo robotları üzerinde test ediyor.

Performans testlerinde Praxis-1, Nvidia'nın RoboLab-120 simülasyon benchmark'ında %46,2 başarı oranı elde ederek 'Dünya Eylem Modeli' kategorisinde zirveye yerleşti. Franka robot kolu üzerinde gerçekleştirilen on farklı görevde ise model, toplam 88 başarılı deneme kaydetti. Ayrıca Google'ın RT-1 modeli için kullanılan veri setleriyle yapılan testlerde %80 başarı oranına ulaşıldı.

Geliştiriciler, modeli Hugging Face üzerinden indirebiliyor ve GitHub'da yer alan kodlara erişebiliyor. Standart sürümün çalışması için 80 GB bellek kapasitesine sahip bir grafik işlem birimi gerekiyor; ancak sıkıştırılmış bir versiyonun 32 GB VRAM ile çalışabileceği öngörülüyor. Runway, modelin karmaşık görevleri planlama konusunda henüz geliştirilmeye ihtiyaç duyduğunu ve gelecekte genel amaçlı yapay zekâ sistemleriyle entegre çalışabileceğini belirtiyor.
