---
lang: tr
title: "Cloudflare metin ve görsellerden veri çıkaran Clairic modelini tanıttı"
description: "Cloudflare, metin ve görsellerden doğrudan veri çıkışı sağlayan yeni yapay zekâ modeli Clairic'i Workers AI üzerinde önizlemeye açtı."
category: teknoloji
date: 2026-10-20T09:50:56.012Z
bolge: "Küresel"
perspektif: "Bu model, yapay zekânın metin üretmek yerine doğrudan yapılandırılmış veri sağlamasını hızlandırarak geliştiricilerin maliyet ve hız sorunlarını çözüyor ve otomasyon süreçlerini güvenilir hale getiriyor."
why_matters: "Geliştiricilerin veri işleme süreçlerini hızlandırarak maliyetleri düşürüyor ve yapay zekânın metin üretmek yerine doğrudan veri sağlamasına odaklanıyor."
key_points:
  - "Clairic, Workers AI üzerinde önizleme olarak yayınlandı."
  - "Milyon token başına girdi maliyeti 0,10 dolar olarak belirlendi."
  - "Çıkarma adımı 0,46 saniyede tamamlandı."
rakamlar:
  - etiket: "Girdi maliyeti"
    deger: "0,10 dolar"
  - etiket: "Bağlam penceresi"
    deger: "65.536 token"
  - etiket: "Çıkarma süresi"
    deger: "0,46 saniye"
kaynakIzi: "v1.l2mvZV479sVE1iHY.bfTHlGPto1i3JNb+YsdMSgRjXbYYrSQDpHj187CJfDd65Xu8ZBlnBzdTTXou0LviZyIB1wyffVm7yKH4zVvOWDUtqU5aWkt13YjVeYYBffS6KQmeaORzJx8bakNaOlD60EgBJoFi25noPohtutPexo7tVyHPIoQ87tCZmSKJxK8KFFpjJWBSyr/+7qMOIRU0fVKb6i/Nr5hgNG4V/hL8bQ=="
featured: false
breaking: false
draft: false
---

Cloudflare, yapay zekâ altyapısını genişleterek metin veya görsellerden doğrudan yapılandırılmış veri çıkışı sağlayan Clairic modelini duyurdu. Workers AI platformu üzerinden erişime açılan bu yeni sistem, geleneksel dil modellerinin aksine metin üretmek yerine fatura tutarları, tarihler ve kimlik numaraları gibi belirli alanları tek geçişte dolduruyor. Geliştiricilerin sıklıkla büyük dil modellerine verdiği veri çıkarma görevlerini hedefleyen Clairic, üretim aşamasında çıkış token'ı kullanmıyor ve tek bir ileri yönlü geçişle yanıt veriyor.

Sistem, metin ile birlikte en fazla 4 görseli işleyebiliyor ve 65.536 tokenlık geniş bir bağlam penceresi sunuyor. Model, her yanıt için güven skoru ve eksik veri olasılığı gibi ek metrikler sunarak verilerin güvenilirliğini artırıyor. Şirket tarafından paylaşılan test sonuçlarına göre Clairic, hasarlı ürün talep süreçlerinde geleneksel modellere kıyasla yaklaşık 3,2 kat daha hızlı sonuç verdi. İşlem maliyetlerini de önemli ölçüde düşüren sistem, milyon token başına girdi maliyeti olarak rekabetçi bir fiyatlandırma sunuyor.

Test sürecinde destek e-postaları ve makbuz fotoğrafları üzerinde denenen model, eksik veriler için doğru bir şekilde boş değer döndürdü ve öngörü görevlerinde belirli bir hata payıyla çalıştı. Hasarlı ürün talep hattında yapılan karşılaştırmalarda çıkarma adımı 0,46 saniyede tamamlanırken, karar aşaması ve diğer adımlarla birlikte toplam süreç süresi ve maliyetler önemli ölçüde azaldı.

Modelin maliyeti milyon token başına 0,10 dolar olarak belirlenirken, çıkış token'ları için herhangi bir ücret alınmıyor. Şu an için önizleme aşamasında olan model, geliştiricilerin kullanımına sunulmuş durumda ancak henüz model ağırlıkları paylaşılmış değil.
