---
lang: tr
title: "NVIDIA Nemotron 3.5 Super VL modeli Amazon SageMaker platformuna eklendi"
description: "NVIDIA'nın yeni çok modlu yapay zekâ modeli, metin, görsel ve video verilerini işleme yeteneğiyle SageMaker kullanıcılarına sunuldu."
category: yapay-zeka
date: 2026-11-09T21:50:51.242Z
esId: "nvidia-nemotron-3-5-super-vl-model-arrives-on-amazon-sagemaker-jumpstart"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ ajanlarının sadece metinle değil, görsel dünyayı da anlayarak daha karmaşık görevleri yerine getirmesini kolaylaştırıyor."
why_matters: "Görsel ve metin verilerini birleştiren bu model, yapay zekâ ajanlarının dijital dünyayı daha iyi anlamasını ve daha karmaşık görevleri otonom şekilde yapmasını sağlıyor."
key_points:
  - "120 milyar toplam parametre kapasitesi"
  - "1 milyon tokenlık bağlam penceresi desteği"
  - "Görsel, video ve metin işleme yeteneği"
rakamlar:
  - etiket: "Toplam Parametre"
    deger: "120 milyar"
  - etiket: "Aktif Parametre"
    deger: "12 milyar"
  - etiket: "Bağlam Uzunluğu"
    deger: "1 milyon token"
  - etiket: "NVFP4 Çıkarım Hızı"
    deger: "63,07 token/sn"
kaynakIzi: "v1.SvPXP1TlSNBH4PUz.1cNiBTBQvzhM60r9gFPt8fHIhDNIfF6K9alMYcfWExC/qo3J1F0nK9pskFS7Mp9kwGmcF1nSP4iz+/SVerxOreovURc7hJlDG8sy9m9zTOFdxEcrkEjtAIddSohnhQwqVLCsPNATJKZkf/Jp/oJvCGee0IsWN0b3yhMttadLwkzeu+zEQPazLchKawVX2rbW8lsqK5tsy/UDtcS82Lh4r+I+VFJCLrC8x7ifKB3/UGG2uKzVrw3a"
kaynaklar:
  - ad: "AWS Machine Learning Blog"
    url: "https://aws.amazon.com/blogs/machine-learning/nvidia-nemotron-3-5-super-vl-is-now-available-in-amazon-sagemaker-jumpstart/"
haberDegeri: 70
featured: false
breaking: false
draft: false
---

NVIDIA'nın geliştirdiği Nemotron 3.5 Super VL modeli, artık Amazon SageMaker JumpStart platformu üzerinden geliştiricilerin kullanımına sunuldu. Bu yeni nesil model, metin, görsel ve video verilerini aynı anda işleyebilme yeteneğiyle dikkat çekiyor. Özellikle karmaşık belgeleri anlama, grafik okuma ve bilgisayar arayüzlerini (GUI) yorumlayarak otonom işlemler gerçekleştirme konusunda uzmanlaşmış durumda.

Bu gelişme, yapay zekâ destekli ajanların yeteneklerini bir üst seviyeye taşıyor. Artık modeller sadece metin üretmekle kalmıyor; bir ekranı "görüp" orada gezinebiliyor veya uzun videoları analiz ederek sorulara yanıt verebiliyor. 120 milyar parametreye sahip olan bu model, 1 milyon tokenlık geniş bir bağlam penceresi sunarak çok uzun dokümanların bile tek seferde işlenmesine olanak tanıyor.

Geliştiriciler için iki farklı seçenek sunuluyor: Performans odaklı optimize edilmiş NVFP4 sürümü ve tam hassasiyetli BF16 sürümü. NVFP4 sürümü, daha düşük donanım gereksinimiyle hızlı çıkarım yaparken, BF16 sürümü daha detaylı özelleştirme ve ince ayar süreçleri için uygun bir temel oluşturuyor. Bu çeşitlilik, farklı ölçekteki projelerin ihtiyaçlarına göre esneklik sağlıyor.

Modelin mimarisinde yer alan "Multi-Token Prediction" başlığı, tahmin süreçlerini hızlandırarak daha akıcı bir kullanıcı deneyimi vadediyor. Özellikle belge zekâsı, video analizi ve çok modlu ajan iş akışları gibi alanlarda çalışan ekipler için bu model, karmaşık görsel verileri anlamlandırma sürecini önemli ölçüde kolaylaştırıyor. Geliştiriciler, SageMaker üzerinden bu modeli birkaç adımda devreye alarak kendi uygulamalarına entegre edebiliyor. Bu tür araçların erişilebilir hale gelmesi, yapay zekânın sadece metin tabanlı değil, görsel dünyayı da anlayan bir yardımcıya dönüşme sürecini hızlandırıyor.
