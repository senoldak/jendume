---
lang: tr
title: "Mizan Türkçe hukuk modeli Hugging Face üzerinde erişime açıldı"
description: "Alican Kiraz tarafından geliştirilen Mizan-27B-Turkish-Legal-Decision-Model, Türkçe hukuk metinlerindeki soruları sınıflandırarak seçeneklere olasılık atıyor."
category: yapay-zeka
date: 2026-10-31T17:51:40.651Z
esId: "mizan-turkish-legal-model-launched-on-hugging-face"
bolge: "Türkiye"
perspektif: "Bu yapay zekâ modeli, hukuk alanında karar destek süreçlerini hızlandırmayı amaçlasa da, çıktılarının doğrulanması için insan denetiminin şart olduğunu gösteriyor."
why_matters: "Hukuk gibi hassas alanlarda geliştirilen yapay zekâ modellerinin test sınırlarının ve insan denetiminin önemini gözler önüne seriyor."
key_points:
  - "Mizan-27B-Turkish-Legal-Decision-Model Hugging Face'te erişime açıldı."
  - "Genel test sonuçlarında yüzde 94,9 uyum oranı açıklandı."
  - "Yerel çalıştırma için yaklaşık 52 GB grafik belleği gerekiyor."
rakamlar:
  - etiket: "Test uyum oranı"
    deger: "%94,9"
  - etiket: "Zor küme uyumu"
    deger: "%78,2"
  - etiket: "Grafik belleği"
    deger: "52 GB"
  - etiket: "Soru örneği"
    deger: "165.558"
kaynakIzi: "v1.HYrVVn6uGo5rHZGd.SmuRLJHTrg5lzgTy2y83ngQtnjzN3MceXCi/sPLD+6mmlSDNZIZnNsx2AgPqvD6ddzPO4pfagh+1nHC/aS5SsklfVrvQVsxOPCcrU8wLFxScOhIqtvbJmiAXv8FqK1NUYLNKeWPIig=="
featured: false
breaking: false
draft: false
---

Türkçe hukuk metinlerindeki olayları belirli sorular üzerinden sınıflandırmayı hedefleyen yeni yapay zekâ modeli Mizan-27B-Turkish-Legal-Decision-Model, Hugging Face platformunda erişime sunuldu. Geliştirici Alican Kiraz tarafından hazırlanan sistem, klasik sohbet robotları gibi uzun metinler üretmek yerine, önceden tanımlanan seçeneklere olasılık değerleri atıyor. Bu yaklaşım, hukuki metin üretimi ile seçenek puanlama arasında net bir ayrım kuruyor. Sistem, olay özetini ve yapılandırılmış soruları birlikte alarak temel mevzuat, yargı yolu, talep durumu, süre ve karmaşıklık başlıklarında dağılım sunuyor.

Geliştiricinin yayımladığı genel test sonuçlarında yüzde 94,9 oranında bir uyum görülse de, bu sonucun nasıl okunması gerektiği önem taşıyor. Model kartı, test etiketlerinin başka bir yapay zekâ modeli tarafından üretildiğini ve bu oranın gerçek davalardaki kesin başarıyı yansıtmadığını açıkça belirtiyor. Daha zor örnekleri içeren 20 vakadaki 119 sorunun ise 93'ünde tam uyum sağlanarak yaklaşık yüzde 78,2'lik bir başarı elde edildiği görülüyor. Uzmanlar, genel test oranı ile bu zor küme sonuçlarının birbirinin yerine kullanılmaması gerektiğine dikkat çekiyor.

Qwen3.6-27B ailesini temel alan Mizan, hukuk için uyarlanan gövdeye seçenekleri değerlendiren bir karar katmanı ekliyor. Bununla birlikte, çıktılardaki yüksek olasılıklar hukuki sonucun kesinleştiği anlamına gelmiyor. Model kartı, özellikle süre ve istisna içeren örneklerde mutlaka insan hukukçuların incelemesi gerektiğini vurguluyor. Geliştirilen bu araç, mahkeme kararı veren ya da hukukçuların yerini alan bir mekanizma olarak değil, yardımcı bir değerlendirme katmanı olarak konumlandırılıyor.

Kullanım koşulları açısından depo, CC BY-NC 4.0 lisansını taşıyor ve bu durum ticari olmayan kullanım kuralı içeriyor. Yerel olarak çalıştırılabilmesi için yaklaşık 52 GB grafik belleğine ihtiyaç duyan modelin yanı sıra, tarayıcı üzerinden erişilebilen bir deneme alanı da bulunuyor. Eğitim verisi özeti incelendiğinde otuz binin üzerinde kayıt ve yüz binlerce soru örneği barındırdığı, geliştiricinin ise test kümesini bu kayıtlardan ayrı tuttuğu belirtiliyor. Bu gelişmeler, yapay zekânın uzmanlık alanlarındaki entegrasyonunda şeffaflık ve test yöntemlerinin sınırlarının ne kadar kritik olduğunu bir kez daha ortaya koyuyor.
