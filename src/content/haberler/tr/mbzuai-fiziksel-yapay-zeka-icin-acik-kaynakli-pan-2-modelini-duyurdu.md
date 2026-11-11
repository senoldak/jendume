---
lang: tr
title: "MBZUAI, fiziksel yapay zekâ için açık kaynaklı PAN 2 modelini duyurdu"
description: "MBZUAI bünyesindeki Vakıf Modelleri Enstitüsü, robotik ve akıllı ajan geliştiricileri için simülasyon yapabilen açık kaynaklı PAN 2 modelini yayımladı."
category: yapay-zeka
date: 2026-11-11T07:50:52.763Z
esId: "mbzuai-releases-pan-2-as-an-open-world-model-for-physical-ai"
bolge: "Küresel"
perspektif: "Bu gelişme, robotik ve otonom sistemlerin gerçek dünyada harekete geçmeden önce karmaşık planları güvenli bir şekilde simüle etmesini sağlayarak yapay zekânın fiziksel dünyayla etkileşimini güçlendiriyor."
why_matters: "Bu gelişme, robotik sistemlerin ve otonom ajanların karmaşık görevleri güvenli bir sanal ortamda test etmesine olanak tanıyarak fiziksel yapay zekâ uygulamalarının gelişimini hızlandırıyor."
key_points:
  - "PAN 2, 29 milyar parametreli açık kaynaklı bir fiziksel yapay zekâ modelidir."
  - "Çok adımlı plan tamamlama testlerinde yüzde 34 başarı oranına ulaştı."
  - "Modelin tüm ağırlıkları ve kodları Apache 2.0 lisansıyla yayımlandı."
rakamlar:
  - etiket: "Model boyutu"
    deger: "29 milyar parametre"
  - etiket: "Plan tamamlama"
    deger: "%34"
kaynakIzi: "v1.L8kCff8S7l33tYDJ.mqVebz24T4b7W0X0i5wWG0Ul1B4coMwW3ewb0GUqOeEF/EvBOfmT2EujG/H20Get2J0CtcUy5qv7CKRux+m2x9Hl/FBWLifh92YEIVBXRscpjcIN9lTqN/ShIO10kJX4TKxZaUvw1ngupLr2r+22kSjraQ=="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/10/ifm-pan-2-open-world-model/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

MBZUAI bünyesindeki Vakıf Modelleri Enstitüsü, fiziksel yapay zekâ odaklı açık dünya modeli PAN 2'yi duyurdu. Yeni model, bir sahne ve metin tabanlı eylemi girdi olarak alarak sonucu video formatında simüle edebiliyor. Apache 2.0 lisansıyla yayımlanan modelin ağırlıkları, eğitim ve çıkarım kodları geliştiricilerin erişimine sunuldu. Robotik ve ajan geliştiricileri, bu sistem sayesinde karmaşık planları fiziksel dünyada uygulamadan önce simülasyon ortamında test edebiliyor.

PAN 2 modeli, simülasyon sürecini kavramsal ve algısal olmak üzere iki farklı akıl yürütme aşamasına ayırıyor. Kavramsal akıl yürütmede bir dil modeli gözlemleri okuyarak sonraki dünya durumunu yapılandırılmış veri olarak yazarken, algısal akıl yürütme aşamasında ise 29 milyar parametreli bir difüzyon modeli video latentlerini tahmin ediyor. Yapılan testlerde, dil modelinin kullanılmadığı durumlarda tam plan tamamlama oranının sıfıra düştüğü görüldü; bu da iki sistemin birlikte çalışmasının önemini ortaya koyuyor.

Modelin performans testleri, çok adımlı görevlerde öne çıktığını gösteriyor. Yüz çok adımlı görev üzerinde gerçekleştirilen testlerde yüzde 34 oranında tam plan tamamlama başarısı elde eden model, bu alanda test edilen diğer modelleri geride bıraktı. Bununla birlikte, tekli eylemlerde ve insan tercihlerinde bazı rakip modellerin gerisinde kaldığı da raporda yer alıyor. Sistem ayrıca zararlı içerikleri engellemek için özel bir koruma katmanıyla birlikte geliyor.

PAN 2, metinden video ve görselden video üretimi desteğiyle Hugging Face Diffusers ve vLLM gibi popüler araçlar üzerinden çalıştırılabiliyor. Donanım tarafında ise veri merkezi sınıfı grafik işlemcilerine ihtiyaç duyuluyor. Tamamen açık kaynaklı olması, araştırmacıların ve geliştiricilerin modeli kendi projelerine entegre etmesini ve fiziksel yapay zekâ alanındaki simülasyon yeteneklerini geliştirmesini kolaylaştırıyor.
