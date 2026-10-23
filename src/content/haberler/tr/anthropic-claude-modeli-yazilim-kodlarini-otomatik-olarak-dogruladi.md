---
lang: tr
title: "Anthropic Claude modeli yazılım kodlarını otomatik olarak doğruladı"
description: "Anthropic ve Theorem ortaklığıyla gerçekleştirilen projede Claude, mevcut yazılım kodlarını matematiksel olarak doğrulayarak otomatik hata tespiti ve düzeltme yaptı."
category: yapay-zeka
date: 2026-10-23T11:51:02.167Z
esId: "anthropic-claude-automatically-verifies-software-code-using-mathematical-proofs"
bolge: "Küresel"
perspektif: "Yapay zekânın yazdığı kodların güvenilirliğini matematiksel olarak kanıtlaması, yazılım geliştirme süreçlerinde güven sorununu aşarak maliyetleri düşürebilir ve kritik altyapıların güvenliğini artırabilir."
why_matters: "Yapay zekânın kod doğrulaması yapabilmesi, yazılım güvenliğini artırırken geliştirme maliyetlerini ve test sürelerini büyük ölçüde azaltabilir."
key_points:
  - "Claude, kısa süre içinde 180 milyon satırlık matematiksel kanıt kodu üretti."
  - "Projede Google'ın OSS-Fuzz projesindeki 123 açık kaynaklı kütüphaneden yararlanıldı."
  - "Opus 5.5 modeli, benzer kanıtları yaklaşık yüzde 40 daha az token ile çözebiliyor."
rakamlar:
  - etiket: "Matematiksel kanıt"
    deger: "180 milyon satır"
  - etiket: "Açık kaynak kütüphane"
    deger: "123"
  - etiket: "Token tasarrufu"
    deger: "%40"
kaynakIzi: "v1.1BgJmU3iQf0/i6kl.1rq6Rti8XvIr/fAXdfsSVoB0cL0O2IZw2t8jQx0kv1weAfiZWGZuGiM4qb4SNMCHxgnH1QQlIn94U8RwPLb2L4tde2wUomY/hNA5b/5jRp/2j1nzkBNGigZik5iVMgMisKBO9dSzlEBVn2uXcHwdTQmjzldnBhR6Ok24QRF97WqcTqOa5qD/t8kg"
featured: false
breaking: false
draft: false
---

Anthropic bünyesindeki Frontier Red Team, Theorem ortaklığıyla yürüttüğü çalışmada Claude modelini yazılım kodlarının hatasız çalışıp çalışmadığını kanıtlamak için kullandı. Yazılım sektöründe normalde aşırı maliyetli ve insan gücü gerektiren bu resmi doğrulama süreci, modelin kısa sürede yaklaşık 180 milyon satırlık matematiksel kanıt kodu üretmesiyle hız kazandı. Google'ın OSS-Fuzz güvenlik projesindeki 123 açık kaynaklı kütüphaneden yararlanan yapay zekâ, mevcut yazılım kodlarını matematiksel problemlere dönüştürerek inceledi.

Süreç kapsamında Claude, yeni kod yazmak yerine çökme testlerini analiz ederek kapsamlı kanıtlar üretti. Rocq adı verilen bağımsız bir doğrulama programı bu kanıtları otomatik olarak kontrol etti ve araştırmacılar sürecin neredeyse hiç insan incelemesine ihtiyaç duymadığını belirtti. Çalışma sırasında yüzlerce hatayla karşılaşan model, bu hataları kendi başına düzeltti.

Bir PDF okuyucunun doğrulanması sırasında kısa sürede normalde bir yılda rapor edilenden fazla güvenlik hatası bulunurken, başka bir uygulamada ise on yılı aşkın süredir fark edilmeyen mantıksal bir hata tespit edildi. Anthropic, resmi olarak doğrulamanın tamamen hatasız anlamına gelmediğini; kanıtların belirli işlemci mimarileri, tek iş parçacıklı programlar ve belirli veri boyutları gibi sıkı koşullar altında geçerli olduğunu vurguladı.

Yüksek hesaplama maliyetleri ve token tüketimi gibi pratik sınırlamalara rağmen proje, yazılım otomasyonu için önemli bir dönüm noktası oluşturuyor. Yeni modellerin daha verimli çalıştığını belirten şirket, Opus 5.5 modelinin benzer kanıtları yaklaşık yüzde 40 daha az token kullanarak çözebildiğini kaydetti. Theorem'in yol haritası glibc, OpenSSL ve cURL gibi kritik altyapıları hedefliyor.
