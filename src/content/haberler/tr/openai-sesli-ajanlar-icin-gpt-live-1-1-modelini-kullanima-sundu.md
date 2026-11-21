---
lang: tr
title: "OpenAI sesli ajanlar için GPT-Live-1.1 modelini kullanıma sundu"
description: "OpenAI, iki yönlü sesli iletişim sunan GPT-Live-1.1 modelini API üzerinden erişime açarak bekleme süresi maliyetini dakikada 0,02 dolara düşürdü."
category: yapay-zeka
date: 2026-11-21T13:50:50.702Z
esId: "openai-launches-gpt-live-1-1-for-voice-agents-and-slashes-idle-costs"
bolge: "ABD"
perspektif: "Sesli yapay zekâ asistanlarının bekleme süresi maliyetlerinin düşmesi ve aksan yeteneklerinin gelişmesi, müşteri hizmetlerinden kişisel asistanlara kadar birçok alanda sesli etkileşimi daha erişilebilir ve doğal hale getiriyor."
why_matters: "API üzerinden sunulan modelin SIP telefon desteği ve bekleme moduyla güncellenmesi, sesli çalışan ajanların harici metin modelleriyle entegre biçimde telefon ağlarına bağlanmasına olanak tanıyor."
key_points:
  - "Bekleme modunda sesli etkileşim maliyeti %60 düşerek dakikada 0,02 dolar oldu."
  - "Varsayılan bağlam penceresi 128.000 token olarak belirlendi."
  - "Bekleme modu zaman aşımı süresi 5 ile 60 saniye arasında ayarlanabiliyor."
rakamlar:
  - etiket: "Bekleme maliyeti"
    deger: "0,02 dolar / dk"
  - etiket: "Aktif maliyet"
    deger: "0,05 dolar / dk"
  - etiket: "Maliyet tasarrufu"
    deger: "%60"
  - etiket: "Bağlam penceresi"
    deger: "128.000 token"
kaynakIzi: "v1.ZoIaZF2b0W51GNPn.8bvBu4Nl62/zDoWfUMKNpBC4n9jNAYzJmJdjLuOhLhnqZZsXZAMz+/1vLkAR7xe6sOYcT/1XeaKe+L0q4WwXW5qlUU5KDxL/ROvg88cvg5vO/e540JA0gDkG0MGprwY+4k9Rk9QaClZthVWMSYy+a4tjcn1WGT/PxsL/Yfk="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/21/openai-gpt-live-1-1-api-standby-mode/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

OpenAI, sesli yapay zekâ uygulamaları geliştiren yazılımcılar için yeni ses modeli GPT-Live-1.1'i API üzerinden gpt-live-1.1 kimliğiyle erişime sundu. Çok dilli konuşmalarda tam çift yönlü (full-duplex) iletişim kurabilen model, konuşurken aynı zamanda dinleme yeteneğine sahip. Şirket, bu yeni sürümün daha doğal ve istikrarlı aksanlar sunduğunu, harf ve rakam aktarımlarını daha hassas işlediğini ve görevleri daha güvenilir tamamladığını belirtiyor.

Güncellemenin getirdiği yeni seçeneklerden biri de "bekleme" (standby) modu oldu. Sesli aramalarda kullanıcının sessiz kaldığı durumlarda bağlantı açık tutulurken çıkarım süreci durduruluyor. Bu sayede aktif kullanımda dakikası 0,05 dolar olan WebRTC sesli oturum ücreti, bekleme modunda dakikada 0,02 dolara iniyor. Bu durum boşta kalma maliyetlerinde %60 tasarruf sağlıyor.

Yeni model varsayılan olarak 128.000 token'lık bir bağlam penceresini destekliyor. Ses ve metin girdileriyle çalışan model; resim, video ve yapılandırılmış çıktı formatlarını ise desteklemiyor. Ağır akıl yürütme veya araç kullanımı gerektiren karmaşık işlevler için arka planda GPT-6 Astra veya Luna gibi metin tabanlı diğer modellere yönlendirme yapılabiliyor.

OpenAI, 2026 sonbaharında çıkardığı ilk GPT-Live modelinin ardından 1.1 sürümüyle performansı artırdığını beyan etse de modele dair resmi bir kıyaslama testi skoru yayınlamadı. Bununla birlikte dışa dönük SIP telefon çağrısı desteğinin tüm kuruluşlara sunulmasıyla çağrı merkezleri ve otonom sesli ajanlar için telefon entegrasyonu sağlandı.
