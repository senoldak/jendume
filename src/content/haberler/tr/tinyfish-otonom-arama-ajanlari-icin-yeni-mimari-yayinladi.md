---
lang: tr
title: "TinyFish otonom arama ajanları için yeni mimari yayınladı"
description: "TinyFish, yapay zekâ arama ajanlarının üretim ortamlarında karşılaştığı zorlukları aşmak için yeni bir arama mimarisi ve derin araştırma kılavuzları yayınladı."
category: teknoloji
date: 2026-10-23T09:50:57.526Z
esId: "tinyfish-introduces-new-architecture-for-agentic-search"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ ajanlarının demo ortamından çıkarak gerçek dünya iş yüklerinde güvenilir ve maliyet etkin bir şekilde çalışmasını sağladığı için önemlidir."
why_matters: "Bu mimari, yapay zekâ ajanlarının üretim ortamlarında karşılaştığı maliyet ve güvenilirlik sorunlarını çözerek gerçek dünya uygulamalarını yaygınlaştırır."
key_points:
  - "TinyFish kodlama görevlerinde %79 tamamlama oranına ulaştı."
  - "Sistem yedi aşamalı bir kontrol döngüsüyle çalışıyor."
  - "Ortalama görev maliyeti 0,050 dolar olarak gerçekleşti."
rakamlar:
  - etiket: "Tamamlama oranı"
    deger: "%79,0"
  - etiket: "Medyan görev maliyeti"
    deger: "0,050 dolar"
kaynakIzi: "v1.UamnJlPW7k0CPhNv.++dJzpht+Y7k7dZBPw1MxdhXSn5VFCIHxpkbo/IBN3cPXDVaCaxjSuLCbnRmDE8Hi4/6vHc8xlDi/9NPF8jBso6MwWuVMp1zb/+cJF8fJxqyw2SUSCtIPqqyfDNu4qcfeql9Saub4zlYl7y8hiY5Nu2TbaDhETDXZCcDQnDkOaovtaXvO9FZn3sVlg=="
featured: false
breaking: false
draft: false
---

Yapay zekâ arama ajanları genellikle demo ortamlarında başarılı olurken, eksik veri veya zaman aşımı gibi üretim iş yüklerinde başarısız olabiliyor. Web altyapısı sağlayan TinyFish, bu sorunların üstesinden gelmek amacıyla iki teknik kılavuz yayınladı ve yeni bir arama mimarisi tanıttı. Sistem, temel model etrafında yedi aşamalı bir kontrol döngüsüyle çalışarak model akıl yürütmesi ile deterministik yürütme arasındaki dengeyi yönetiyor.

Sistem; arama, getirme, tarama ve ajan olmak üzere dört temel web bileşeni üzerine kurulmuştur. Bu mimari, yapay zekâ ajanlarının bilgi aramalarını planlamasını, kanıtları değerlendirmesini ve eksik sonuçlar ile kurtarılabilir hatalarla başa çıkmasını sağlıyor. Süreç, hedefin kanıt sözleşmesine dönüştürülmesiyle başlar ve planlama, rota seçimi, getirme, değerlendirme, kurtarma ve doğrulama aşamalarıyla devam eder.

Yapılan testlerde sistem, kodlama görevlerinde yüzde 79 tamamlama oranına ulaşırken düşük görev maliyeti ve token ayak izi sağladı. TinyFish, derin araştırma sistemleri geliştirirken edindiği mühendislik derslerini de paylaştı. Buna göre, ayrı bir planlayıcı kaldırılarak planlama süreci düzenleyicinin kendi akıl yürütme döngüsüne taşındı ve alt ajanlar yerine tekrarlanabilir görevler için araç çağrıları kullanıldı.

Maliyet ve gecikme yönetimi konusunda şirket, tek bir çağrı yerine tüm görevin bütçelendirilmesi gerektiğini vurguluyor. Task gecikmesi planlama, arama, getirme, değerlendirme ve yeniden deneme adımlarının toplamından oluşurken maliyet ise token, araç çağrıları ve tarayıcı kullanımını kapsıyor. Bu gelişmeler, yapay zekâ arama ajanlarının endüstriyel ölçekte daha verimli ve güvenilir çalışmasına olanak tanıyor.
