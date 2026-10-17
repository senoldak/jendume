---
lang: tr
title: "Kyutai REKI robot kontrolü için hafıza özellikli modeli tanıttı"
description: "Kyutai, Inria ve École des Ponts ile birlikte robot manipülasyonu için 2,4 milyar parametreli REKI modelini duyurdu."
category: yapay-zeka
date: 2026-10-17T21:50:56.220Z
bolge: "Küresel"
perspektif: "Bu model, robotların geçmiş kareleri hafızasında tutarak daha kararlı hareket etmesini sağlıyor ve robotik çalışmalarında verimliliği artırıyor."
why_matters: "Robotların hafıza yeteneği kazanması, fiziksel görevlerde titreme ve kararsızlık gibi sorunları çözerek otonom sistemleri daha güvenilir kılıyor."
key_points:
  - "REKI, 2,4 milyar parametreye sahip bir görme-dil-eylem modelidir."
  - "LIBERO-Plus testinde %90,4 başarı oranına ulaşmıştır."
  - "Önbelleğe alınan hafıza mekanizması salınımları azaltmaktadır."
rakamlar:
  - etiket: "Model boyutu"
    deger: "2,4 milyar parametre"
  - etiket: "LIBERO-Plus skoru"
    deger: "%90,4"
kaynakIzi: "v1.ISQA+7gBgC8G1sDY.7LsgLQZGYejpJTMb6gCTiLBv4l7nxCAhDq60LqbXWxLILtN3bwJJKfWtcDiYbtW6DvChcm4xWYHfXBAxvsUTf25Pv4XvcIOqSMNQ44UxuiofH2N563ojJSWRyusPdpaR8xCuRRZqZSeBVo1AApCdu7EZ1ulgxeHhkQRYPoTC7dc9hM0RnUofRbBro47WLFS3j65ze9ss6jhrFp03Y+FrmFbFfoKWcasz9jPfHQ=="
featured: false
breaking: false
draft: false
---

Kyutai, Inria ve École des Ponts iş birliğiyle geliştirilen REKI adlı yeni görme-dil-eylem modeli kamuoyuna tanıtıldı. 2,4 milyar parametreye sahip olan bu yapay zekâ modeli, robot kolların nesneleri daha hassas bir şekilde yönlendirmesini amaçlıyor. Modelin temel yeniliği, eylem uzmanının içine yerleştirilen ekonomik bir hafıza mekanizması olmasıyla öne çıkıyor. Bu mekanizma sayesinde robotlar, salınım sorunlarını önemli ölçüde azaltabiliyor.

Modelin geliştirilmesinde yalnızca açık veriler kullanıldı ve eğitim sürecinde toplam 1 milyar kare ile 12,2 milyon görme-dil örneği değerlendirildi. REKI, test edilen çeşitli robotik kıyaslama testlerinde yüksek başarı oranlarına ulaştı. Örneğin LIBERO-Plus testinde yüzde 90,4 oranında skor elde eden model, alanındaki diğer açık kaynaklı çözümlerle rekabet ediyor.

REKI modelinin en büyük teknik avantajlarından biri, geçmiş kareleri önbelleğe alarak çok düşük bir maliyetle hafıza sunabilmesidir. Bellek kullanımı her geçmiş kare için yaklaşık 2 megabayt grafik belleği gerektiriyor ve işlem süresine yalnızca çok az bir gecikme ekliyor. Bu hafıza yeteneği, robotların hareket sırasında kararsız kalmasını ve titremesini büyük ölçüde engelliyor.

Modelin tüm ağırlıkları Hugging Face üzerinden erişime açıldı ve araştırmacılar ile geliştiriciler için altı farklı kontrol noktası sunuldu. Gerçek dünya testlerinde ve simülasyonlarda başarılı sonuçlar veren REKI, robotik alanında yapay zekâ destekli kontrol sistemlerinin gelişimine katkı sunmayı hedefliyor.
