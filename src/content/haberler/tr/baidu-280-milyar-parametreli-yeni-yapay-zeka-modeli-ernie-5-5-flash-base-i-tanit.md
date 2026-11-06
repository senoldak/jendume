---
lang: tr
title: "Baidu, 280 milyar parametreli yeni yapay zekâ modeli ERNIE 5.5 Flash Base'i tanıttı"
description: "Baidu, toplam 280 milyar parametreye sahip ve token başına 14 milyar aktif parametre kullanan yeni seyreltilmiş MoE tabanlı dil modelini yayınladı."
category: teknoloji
date: 2026-11-06T03:50:49.594Z
esId: "baidu-releases-ernie-5-5-flash-base-a-280-billion-parameter-moe-model"
bolge: "Küresel"
perspektif: "Bu yeni yapay zekâ modeli, geliştiricilere ince ayar yapma ve farklı yöntemleri test etme konusunda temiz bir başlangıç noktası sunarak model verimliliğini artırıyor."
why_matters: "Bu model, geliştiricilere yapay zekâ modellerini eğitmek ve optimize etmek için yüksek performanslı ve esnek yeni bir altyapı sunuyor."
key_points:
  - "Toplam 280B parametre, token başına 14B aktif parametre"
  - "MMLU-Pro testinde 78,4 puan"
  - "Bir milyon token'a kadar bağlam desteği"
rakamlar:
  - etiket: "Toplam parametre"
    deger: "280 milyar"
  - etiket: "Aktif parametre"
    deger: "14 milyar"
  - etiket: "MMLU-Pro puanı"
    deger: "78,4"
kaynakIzi: "v1.3pkit77nA1DjcOJ4.lff/OSO52/yPiOaHnWMDH5II4pF5IXdPpOI5Qa0Ygu7fieSOBM9WCCXpWrDBEBbH0vauktlRyeOR/MgmUeUiTG7nLPYMRmB25ivNQlwaiTo9Pz+T+TVHLvrK4WfOJoxxW+/QlmGK8LhrrYJ4DOoZ2P9rhC8LHxk0RuzYng=="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/05/baidu-ernie-5-5-flash-base-280b-moe/"
haberDegeri: 92
featured: false
breaking: false
draft: false
---

Baidu, yeni seyreltilmiş Karışım Uzmanları dil modelinin ham ön eğitim kontrol noktası olan ERNIE 5.5 Flash Base'i erişime açtı. Toplamda 280 milyar parametre içeren model, her bir token için 14 milyar parametreyi aktif hale getiriyor. Ön eğitimin sonunda ağırlıklar sabitlenirken, herhangi bir ara veya son eğitim uygulanmıyor ve bu durum geliştiricilere ince ayar yöntemlerini karşılaştırmak için temiz bir zemin sağlıyor.

Modelin mimarisinde hesaplama ve uzun bağlam maliyetleri optimize edilirken, eğitim süreci depo ölçeğinde kodlar ve uzun bağlamlı materyaller üzerine kuruldu. 43 katmandan oluşan metin tabanlı model, hibrit dikkat mekanizmaları ve çok yönlü yönlendirici sistemleri kullanıyor. Özellikle son katmanı gelecekteki token'ları tahmin etmek için yeniden kullanan ECHO mekanizması, yerleşik bir taslak model işlevi görüyor.

Baidu tarafından paylaşılan test sonuçlarına göre model, şirketin birleşik değerlendirme boru hattındaki 30 temel model kıstasının 24'ünde en iyi puanı elde etti. MMLU-Pro testinde 78,4 puan alan model, benzer yapılardaki rakiplerini geride bırakmayı başardı. Uzun bağlam ve kodlama testlerinde de yüksek performans sergileyen yapı, çeşitli kıstaslarda öne çıkıyor.

Geliştiriciler model ağırlıklarına Hugging Face ve ModelScope üzerinden erişebilirken, sistem FP8 ve BF16 formatlarında sunuluyor. SGLang ve vLLM sunucuları aracılığıyla dağıtılabilen model, bir milyon token'ın üzerinde bağlam desteği sunuyor. Lisans koşulları ise belirli gelir sınırları ve bölgeler için özel şartlar içeriyor.
