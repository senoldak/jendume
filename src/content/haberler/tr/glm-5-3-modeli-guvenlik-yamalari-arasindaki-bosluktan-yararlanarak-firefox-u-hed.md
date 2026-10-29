---
lang: tr
title: "GLM 5.3 modeli güvenlik yamaları arasındaki boşluktan yararlanarak Firefox'u hedef aldı"
description: "Araştırmacılar, açık ağırlıklı GLM 5.3 modelinin Firefox tarayıcısındaki güvenlik açığı aralığını kullanarak saldırı düzenleyebildiğini gösterdi."
category: perspektif
date: 2026-10-29T21:51:39.618Z
esId: "glm-5-3-model-exploits-the-patch-gap-to-target-recent-firefox-browser-releases"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ modellerinin siber güvenlik açıklarını istismar etme kapasitesinin ne denli arttığını ve yazılım güncelleme süreçlerindeki boşlukların risk oluşturduğunu gösteriyor."
why_matters: "Açık ağırlıklı yapay zekâ modellerinin siber güvenlik açıklarını otomatik olarak istismar edebilmesi, yazılım güncelleme süreçlerinin ne kadar kritik olduğunu gözler önüne seriyor."
key_points:
  - "GLM 5.3 açık ağırlıklı modeli Firefox açıklarını hedef aldı"
  - "Saldırıların maliyeti sürüm başına yaklaşık 1.000 dolar oldu"
  - "Mozilla 159.0 sürümü ile yeni zafiyeti kapattı"
rakamlar:
  - etiket: "Maliyet"
    deger: "1.000 dolar"
  - etiket: "Sürüm"
    deger: "159.0"
kaynakIzi: "v1.dBfKslxX6NmZfc6T.sEjE+auF8lYWAxD+z21OudVDs0GMRyJrEpulRLcQ1/PHguXBiizpHeepU1zSND9yGebJcj3YBnR/n+DbOXrtdMa0YnEpgTkwUsPoYCJRee0dts/SZScde05JNjOSLBcAMlRigwsx"
kaynaklar:
  - ad: "Epoch AI"
    url: "https://epoch.ai/publications/open-weight-models-patch-gap"
featured: false
breaking: false
draft: false
---

Son yapılan araştırmalar, yapay zekâ modellerinin yazılım güvenliğindeki zafiyetleri nasıl manipüle edebileceğini gözler önüne serdi. Z.ai tarafından Ağustos ayında yayımlanan açık ağırlıklı GLM 5.3 modeli, Mozilla Firefox tarayıcısının son sürümlerindeki güvenlik açıklarını tespit edip bunlardan yararlanabildi. Yama aralığı olarak bilinen ve bir düzeltmenin yayımlanması ile kullanıcılara ulaşması arasında geçen süre, saldırganlar için bir fırsat penceresi oluşturuyor.

Deneylerde GLM 5.3 modeli, bu zaman aralığını kullanarak bir web sayfası oluşturdu ve kullanıcılar bu sayfayı ziyaret ettiğinde bilgisayarlarındaki bir dosyayı okuyup saldırgana göndermeyi başardı. Eylül ve Ekim ayındaki Firefox sürümleri bu yöntemle tehlikeye açık hale geldi. Bu tür siber saldırıları gerçekleştirmek geçmişte büyük uzmanlık ve zaman gerektirirken, artık geniş kitlelerin erişebildiği açık ağırlıklı modeller bu süreci daha düşük maliyetle gerçekleştirebiliyor.

Araştırmacılar, bu tür saldırıların maliyetinin her bir Firefox sürümü için yaklaşık 1.000 dolar civarında olduğunu belirtti. Süreç boyunca model, yayımlanmamış ek bir güvenlik açığını da tespit edip kullandı. Araştırma ekibi bulguları Mozilla ile paylaştı ve şirket ekim ayında yayımladığı 159.0 sürümü ile bu zafiyeti kapattı.

Bu durum, özellikle açık kaynaklı projelerin ve kod tabanları halka açık yazılımların ne kadar büyük bir risk altında olduğunu bir kez daha gösterdi. Yapay zekâ yeteneklerinin gelişmesiyle birlikte bu tür siber tehdit vektörlerinin gelecekte daha da artması bekleniyor.
