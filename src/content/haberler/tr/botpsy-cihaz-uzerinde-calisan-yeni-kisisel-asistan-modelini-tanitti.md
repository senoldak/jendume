---
lang: tr
title: "BotPsy, cihaz üzerinde çalışan yeni kişisel asistan modelini tanıttı"
description: "Tether AI Research, internet bağlantısına ihtiyaç duymadan cihaz üzerinde çalışan ve 0,8 milyar parametreye sahip yeni ajan modelini duyurdu."
category: yapay-zeka
date: 2026-11-11T05:50:53.134Z
esId: "botpsy-introduces-on-device-personal-assistant-model"
bolge: "Küresel"
perspektif: "Bu gelişme, kişisel asistanların bulut sunucularına bağımlılığını azaltarak gizliliği artırıyor ve yapay zekânın akıllı telefonlardan araç içi sistemlere kadar her yerde güvenle çalışmasını sağlıyor."
why_matters: "Kullanıcı verilerinin buluta gönderilmeden cihazda işlenmesi, gizlilik ve güvenlik endişelerini azaltırken, yapay zekânın her türlü donanımda çalışabilmesini sağlıyor."
key_points:
  - "0,8 milyar parametreli kompakt mimari"
  - "Cihaz üzerinde (on-device) çalışma yeteneği"
  - "Çok adımlı görevlerde yüksek performans"
rakamlar:
  - etiket: "Parametre sayısı"
    deger: "0,8 milyar"
  - etiket: "BFCL v4 skoru"
    deger: "44,0"
  - etiket: "ACEBench skoru"
    deger: "58,7"
  - etiket: "τ-bench skoru"
    deger: "51,5"
kaynakIzi: "v1.rRgD4XHDo18pjNfu.SO9U0yY0n4fkmosgOK+POHtEsat6hFGKaEcAL2Ko/Cdft+lVvt/Y9bfW/BmhtMAPoIH1LUvJ5+0NvjZK4uEomFD0B7GQNpelpc/LoWi7Yk3vCToJYimZ870GfhI="
kaynaklar:
  - ad: "Hugging Face Blog"
    url: "https://huggingface.co/blog/qvac/botpsy"
haberDegeri: 80
featured: false
breaking: false
draft: false
---

Tether AI Research, cihaz üzerinde çalışabilen ve 0,8 milyar parametreye sahip yeni modeli BotPsy’ı duyurdu. Bu model, internet bağlantısına veya devasa bulut sunucularına ihtiyaç duymadan, doğrudan kullanıcıların kendi cihazlarında çalışacak şekilde tasarlandı. Qwen3.5-0.8B temel alınarak geliştirilen BotPsy, özellikle "ajan" olarak adlandırılan, yani belirli görevleri yerine getirmek için araç kullanabilen bir yapıya sahip.

Günümüzde çoğu gelişmiş model, devasa veri merkezlerinde çalışıyor ve bu durum hem maliyetli hem de gizlilik açısından riskli olabiliyor. BotPsy ise bu sorunu, cihaz üzerinde çalışan küçük ama yetenekli bir mimariyle çözmeyi hedefliyor. Web araması, seyahat planlama, finansal işlemler ve cihaz yönetimi gibi günlük görevleri yerine getirebilen bu model, kendi boyutundaki (1,2 milyar parametreye kadar) rakiplerini geride bırakarak dikkat çekiyor.

Modelin başarısı, özellikle çok adımlı görevlerde kendini gösteriyor. Test sonuçlarına göre BotPsy, temel aldığı modele kıyasla performansını iki katına çıkarıyor. Örneğin, BFCL v4 benchmark testinde puanını 23,4'ten 44,0'a, ACEBench testinde ise 30,1'den 58,7'ye yükseltti. Bu sonuçlar, modelin sadece küçük olmadığını, aynı zamanda kendisinden 2,5 kat daha büyük olan modellerle bile rekabet edebildiğini kanıtlıyor.

Bu gelişme, kişisel asistanların geleceği için kritik bir dönemeç. Kullanıcı verilerinin buluta gönderilmeden, cihazın kendi içinde işlenmesi, gizlilik ve güvenlik endişelerini büyük ölçüde azaltıyor. Ayrıca, düşük işlem gücü gerektiren bu tür modeller, akıllı telefonlardan araç içi sistemlere kadar geniş bir yelpazede yapay zekâ kullanımını demokratikleştiriyor. BotPsy, karmaşık bulut altyapılarına bağımlılığı azaltarak, yapay zekânın daha erişilebilir ve güvenli bir şekilde günlük hayatımıza entegre olabileceğini gösteriyor.
