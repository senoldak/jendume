---
lang: tr
title: "Nace AI, 27 milyar parametreli karar modeli Drex Max v1'i açık kaynak olarak sundu"
description: "Nace AI, yerel cihazlarda çalışabilen ve karmaşık karar süreçlerini yönetebilen yeni modeli Drex Max v1'i erişime açtı."
category: teknoloji
date: 2026-11-01T09:51:00.812Z
esId: "nace-ai-releases-27b-parameter-decision-model-drex-max-v1-as-open-source"
bolge: "Küresel"
perspektif: "Bu gelişme, yüksek performanslı karar modellerinin bulut sunucularına bağımlı kalmadan yerel donanımlarda çalışabilmesini sağlayarak veri gizliliğini ve erişilebilirliği artırıyor."
why_matters: "Yüksek performanslı karar modellerinin yerel cihazlarda çalışabilmesi, veri gizliliğini korurken bulut maliyetlerini düşürür ve geliştiricilere daha güvenli bir çalışma ortamı sunar."
key_points:
  - "27 milyar parametreli karar modeli"
  - "Apple Silicon cihazlarda yerel çalışma desteği"
  - "262.144 tokenlık bağlam penceresi"
rakamlar:
  - etiket: "Parametre sayısı"
    deger: "27 milyar"
  - etiket: "Test skoru"
    deger: "67,52"
  - etiket: "Bağlam penceresi"
    deger: "262.144 token"
  - etiket: "Maksimum seçenek"
    deger: "255"
kaynakIzi: "v1.CU4G306bEfbw9cif.elh9aOoF+c3/jxXVjWdbgG8HNVpOfOIhD6+1Ukmi5NF/bZGe21yCzeWqMUm+eIZV8ym0TZR88wCrq8njSuoi6mM/F+NcAObRpLeI7lTQX00emSMk7e8iwVlhp3wk0yf/fOSn47Ui8pHlJbbmOn795uWn5EwZ9tzNdpx50SF+0BmVp1+QVlZtR8c="
featured: false
breaking: true
draft: false
---

Nace AI, Drex Max v1 adlı yeni karar modelini açık kaynak olarak yayımladı. Bu model, özellikle rota belirleme, sınıflandırma ve politika denetimleri gibi karmaşık görevlerde uzmanlaşmış 27 milyar parametreli bir yapıya sahip. Geliştiriciler için en dikkat çekici özellik, modelin bulut sunucularına ihtiyaç duymadan, yerel donanımlar üzerinde çalışabilmesi. Bu sayede hassas veriler, dışarıya gönderilmeden güvenli bir şekilde işlenebiliyor.

Modelin performansı, Decision Index 0.4 testinde 67,52 puanla tescillendi ve önceki sürüm olan Drex v2.0'ın 61,25'lik skorunu geride bıraktı. Teknik altyapısında 64 katmanlı yoğun bir mimari kullanan model, 262.144 tokenlık geniş bir bağlam penceresine sahip. Bu kapasite, modelin uzun metinleri veya karmaşık görsel verileri tek bir işlemde analiz etmesine olanak tanıyor. Ayrıca, tek bir sorgu içerisinde 255 farklı seçeneği değerlendirebilme yeteneği, onu otomasyon süreçleri için oldukça verimli kılıyor.

Drex Max v1, metin üretmek yerine doğrudan olasılık hesaplamaları yaparak karar veriyor. Bu durum, onu sohbet odaklı modellerden ayırarak, bilet sınıflandırma veya güvenlik denetimi gibi "karar verici" ajanlar için ideal bir aday haline getiriyor. Apple Silicon işlemcili Mac bilgisayarlarda, özellikle 24 GB veya 48 GB RAM kapasitesine sahip cihazlarda çalışabilmesi, yüksek performanslı modellerin bireysel kullanıcılar ve yerel geliştiriciler için erişilebilirliğini önemli ölçüde artırıyor.

Geliştiriciler, modelin ağırlıklarını ve gerekli araçları kullanarak, bu sistemi kendi yerel makinelerinde çalıştırabiliyorlar. Nace AI, modelin Q8_0 GGUF sürümünün, yüksek performanslı H100 GPU'lar ile neredeyse aynı doğrulukta sonuçlar verdiğini belirtiyor. Bu gelişme, yapay zekâ modellerinin sadece devasa veri merkezlerinde değil, kişisel bilgisayarlarda da yüksek verimle çalışabileceğini kanıtlıyor.
