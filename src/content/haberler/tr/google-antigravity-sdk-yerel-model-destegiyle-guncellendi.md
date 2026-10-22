---
lang: tr
title: "Google Antigravity SDK yerel model desteğiyle güncellendi"
description: "Google, Antigravity SDK'ya yerel model desteği ekleyerek geliştiricilerin bulut ve yerel altyapıyı birlikte kullanmasını sağlayan hibrit bir yapı sundu."
category: teknoloji
date: 2026-10-17T07:50:57.459Z
bolge: "Küresel"
perspektif: "Bu gelişme, geliştiricilerin veri gizliliğini korumasını ve yapay zekâ maliyetlerini düşürmesini sağlarken kod güvenliğini artırıyor."
why_matters: "Geliştiricilerin veri gizliliğini korurken bulut maliyetlerini büyük ölçüde azaltmasını sağlıyor."
key_points:
  - "Antigravity SDK artık yerel model desteği sunuyor."
  - "Güvenlik testlerinde token tüketiminin yüzde 97,2'si yerelde gerçekleşti."
  - "Gemma 4 modelinin yanı sıra Ollama, LM Studio ve vLLM desteği de bulunuyor."
kaynakIzi: "v1.g8fAij7q4IWFndeK.IspdsZr79qWKhIOpX8BfTQdxjOjZ03G65MQYazjQqVKRiTrvgNveoJWb9DVTwIIyMqE96bZL30H+sGbhe2PsWzwNczZKPzijhzaJLbH3WJ4oXX3e607+8zoLd01AJnEUUHcS5GJf0rxvu3bIc67L9y9JGXYkz6dNu9l+siGFWH3LYEUSWwYJ/j5WF6wbhX2mfbfArP4bPCKS+c2sd+UsIvouwC3egjCwulkSRF1OWOlHd/IeGdKAy3Wpjh/WxCEPHQxjlFC1Yn2HYnwmvUIC"
featured: false
breaking: false
draft: false
---

Google, yazılım geliştirme süreçlerini yerel makinelerle bulut altyapısını birleştirerek optimize eden Antigravity SDK için yeni bir güncelleme duyurdu. Bu yenilik sayesinde geliştiriciler, yapay zekâ tabanlı iş akışlarını kendi donanımları üzerinde çalıştırırken ihtiyaç duyduklarında bulut tabanlı modellerden de destek alabiliyor. Hibrit ajan düzenlemesi olarak adlandırılan bu yaklaşım, sistemin mimarını bulutta tutarken kod yazma, güvenlik açıklarını onarma ve test etme gibi detaylı işlemleri yerel cihazlarda gerçekleştiriyor. Mimar rolündeki yüksek bağlamlı yapay zekâ ajanı, kaynak koduna erişmeden strateji belirliyor ve görevi daha küçük birimlere ayırarak bulutta çalışıyor. Yapıcı rolündeki diğer uzman ajanlar ise yerel donanımda izole ortamlarda çalışarak güvenlik açıklarını yeniden üretiyor, kod düzeltmeleri öneriyor ve regresyon testlerini koşturuyor.

Google tarafından paylaşılan bilgilere göre, üç savunmasız Python modülünün denetlenmesi ve onarılması sürecini içeren örnek bir güvenlik denetimi testinde bulut kullanımı toplam 3400 token içinden sadece 95 token ile sınırlı kalırken, işlemlerin yüzde 97,2'si yerel cihazlarda tamamlandı. Bu yöntem, hassas kaynak kodlarının buluta yüklenmesine gerek kalmadan yapay zekâ ajanlarının güvenli bir şekilde çalışmasına imkân tanıyor ve geliştiricilere veri gizliliği ile maliyet yönetimi konusunda büyük avantaj sağlıyor.

SDK ilk aşamada LiteRT teknolojisi üzerinden Gemma 4 26B A4B modelini desteklerken, Ollama, LM Studio ve vLLM gibi OpenAI uyumlu yerel sunucularla da uyumlu çalışabiliyor. Geliştiriciler bu sayede çıkarım maliyetlerini, donanım gereksinimlerini ve ağ bağımlılıklarını daha iyi yönetebiliyor. Topluluk tartışmalarında uzmanlar yerel donanım için önerilen bellek gereksinimlerinin önemine dikkat çekerken, bu yaklaşımın maliyet, hız ve kalite dengesini iyileştirdiğini ifade ediyor.

Ayrıca Antigravity SDK ile Antigravity IDE araçlarının farklı amaçlara hizmet ettiği, SDK'nın geliştiricilere kendi yapay zekâ ajanlarını programatik olarak inşa etme imkânı tanıdığı belirtiliyor. Her iki araç da aynı temel ajan altyapısını paylaşıyor ancak SDK doğrudan özelleştirilmiş iş akışları kurmak isteyenlere hitap ediyor.
