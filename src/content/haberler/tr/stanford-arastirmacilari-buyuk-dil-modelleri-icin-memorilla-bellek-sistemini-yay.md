---
lang: tr
title: "Stanford araştırmacıları büyük dil modelleri için Memorilla bellek sistemini yayınladı"
description: "Stanford Üniversitesi araştırmacıları, büyük dil modellerinin tüm belgeleri okumak yerine 16 bellek jetonuyla çalışmasını sağlayan Memorilla sistemini açık kaynak olarak duyurdu."
category: bilim
date: 2026-11-14T13:50:54.599Z
esId: "stanford-researchers-open-source-memorilla-memory-system-for-large-language-mode"
bolge: "Küresel"
perspektif: "Bu gelişme, büyük dil modellerinin devasa metinleri işlerken karşılaştığı hız ve maliyet sorunlarını aşarak yapay zekânın çok daha büyük veri setlerini verimli ve hızlı bir şekilde analiz etmesini sağlıyor."
why_matters: "Modül, bellek tüketimini ciddi oranda düşürerek donanım maliyetlerini azaltıyor ve çıkarım süreçlerini hızlandırarak kurumsal yapay zekâ altyapılarının ölçeklenebilirliğini güçlendiriyor yaklaşımlarına olanak tanıyor kod tabanlı dağıtımlarda maliyet avantajı yaratıyor. Geleneksel yöntemlerin aksine bellek darboğazlarını ortadan kaldırarak geliştiricilere esneklik kazandırıyor ve uzun bağlamlı görevlerde doğruluk kaybını önlüyor, bu da yapay zekâ ajanlarının performansını doğrudan yükseltiyor."
key_points:
  - "Memorilla, tüm belge koleksiyonlarını donmuş büyük dil modelleri için 16 bellek jetonuna dönüştürüyor."
  - "FactKG testinde Qwen3-8B modeli %84,33 doğruluk oranına ulaştı."
  - "Modül, 194 milyon parametreye sahip olup Apache 2.0 lisansıyla açık kaynak olarak sunuldu."
rakamlar:
  - etiket: "Bellek jetonu"
    deger: "16"
  - etiket: "FactKG puanı"
    deger: "%84,33"
  - etiket: "Parametre sayısı"
    deger: "194 milyon"
kaynakIzi: "v1.Hk6drOJ+1stZBJZI.lijpinPjCujvLKPmdLR97UNta5o2aXUD8ytCDBrf8ed4IFMjjYvHwr9JPZLRjNQOt1G8B6Cz+qg0AJ7lqswHQ6gyyB4IKaI6+1BLlubE8MfZDtyGLWvhUifv9ctcVJwmgEAzVL7mfZH2Ar1Z5Ak8prfmQSfeCSSj+tVfje/0ScjS4OiquKURwm5D"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/14/stanford-memorilla-memory-system-16-memory-tokens/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

Stanford Üniversitesi ekibi, büyük dil modellerinin veri işleme kapasitesini artıran Memorilla adlı yeni bir bellek modülünü açık kaynaklı olarak yayımladı. Geliştirilen bu sistem, devasa belge koleksiyonlarını tarayarak donmuş haldeki yapay zekâ modellerine yalnızca 16 adet bellek jetonu aktarıyor. Böylece modeller, tüm belgeleri doğrudan bağlam penceresine yüklemek zorunda kalmadan çok daha az veriyle yüksek doğruluk oranlarına ulaşabiliyor.

Sistem, Jure Leskovec liderliğindeki SNAP grubu tarafından Toronto, Penn ve MIT üniversitelerinden araştırmacıların katkısıyla geliştirildi. Geleneksel yöntemler tüm metni doğrudan modele verirken veya benzer parçaları ararken zayıf ipuçlarını kaçırabiliyordu. Memorilla ise tüm depolama alanından sorunun neye ihtiyaç duyduğunu öğrenen üçüncü bir yol izliyor. İşlem, belgelerin bir kez kodlanması, soruya göre 16 yuvanın taranması ve bu jetonların modelin girdi alanına eklenmesi şeklinde üç aşamada gerçekleşiyor.

Test sonuçlarına göre, Memorilla kullanan Qwen3-8B modeli FactKG testinde %84,33 başarı elde ederken, tüm belgelerin kullanıldığı tam bağlam yönteminde bu oran %80,43'te kaldı. Sistem ayrıca PersonaMem-v2 testinde %44,60 doğruluk oranı yakaladı. 194 milyon parametreli eğitilebilir bellek modülü, Apache 2.0 lisansıyla kod, eğitim reçeteleri ve kontrol noktaları kamuya açık olacak şekilde paylaşıldı.

Donanım tarafında sistem, Linux ortamında CUDA grafik işlemcileriyle çalışıyor ve hızlı başlangıç için en az 80 gigabayt belleğe sahip bir grafik işlemci gerektiriyor. Araştırma ekibi, Memorilla'nın yanı sıra 149 sentetik kullanıcı içeren PersonalizationV4 veri setini de CC BY 4.0 lisansıyla erişime açtı. Bu yeni bellek modülü, yapay zekânın bilgi işleme verimliliğini artırma yolunda önemli bir adım olarak değerlendiriliyor.
