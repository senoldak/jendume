---
lang: tr
title: "qwenGPU, Qwen3.5-2B modeline derlenmiş GPU katmanları ekleyerek CUDA çalıştırıyor"
description: "Geliştiriciler, Qwen3.5-2B modeline derlenmiş GPU katmanları ekleyerek doğrudan model ağırlıkları içinde gerçek CUDA çalıştırmayı başaran deneysel qwenGPU'yu tanıttı."
category: teknoloji
date: 2026-11-02T09:51:00.411Z
esId: "qwengpu-brings-compiled-cuda-layers-directly-to-qwen3-5-2b-model"
bolge: "Küresel"
perspektif: "Bu gelişme, büyük dil modellerinin hesaplama yeteneklerini sadece yanlarında değil, doğrudan kendi yapıları içinde gerçekleştirebilmesi açısından yapay zekâ mimarilerinde yeni bir araştırma ufku açıyor."
why_matters: "Dil modellerinin kendi ağırlıkları içinde donanım simülasyonu yapabilmesi, gelecekte yapay zekâ mimarilerinin hesaplama kapasitesini kökten değiştirebilir."
key_points:
  - "Qwen3.5-2B modeline 45 derlenmiş GPU katmanı eklendi."
  - "Referans yorumlayıcı 49 test çekirdeğinin tamamında eşleşti."
  - "Apple MPS üzerinde saniyede 10 ila 15 token hız sunuyor."
rakamlar:
  - etiket: "Toplam katman"
    deger: "69"
  - etiket: "Test çekirdeği"
    deger: "49"
  - etiket: "Çalışma hızı"
    deger: "10-15 token/saniye"
  - etiket: "Boş bellek"
    deger: "16 GB"
kaynakIzi: "v1.n176BsJPyfsnawyz.vWxrKgg0JoYWOGosEbZb2GtLOJ6f768RoXe2dqgkqwmjvHL5IX1e8gxQgTgsbulOmV2jLQby9tiEA5AR5yCra9nbq1k9FrXo0C8tVcLF75uWaKQaO/FBELwefnO06M009Vd9Ox77yxFpRyvD+8l5UQJsoIrUVr2G9v1DYK73SdbUPP/6uVX37g1rndyTxMILj0bsUw=="
haberDegeri: 88
featured: false
breaking: false
draft: false
---

Geliştirici Vixhal tarafından GitHub üzerinden MIT lisansıyla yayımlanan qwenGPU, deneysel bir yaklaşım olarak dikkat çekiyor. Sistem, Qwen3.5-2B modelinin önüne 45 derlenmiş transformer katmanı ekleyerek toplamda 69 katmana ulaşıyor ve bu katmanlar eğitilmek yerine bir derleyici tarafından ağırlıklara dönüştürülüyor. Bu yenilikçi yaklaşım, yapay zekâ modellerinin çalışma mekanizmalarında donanım ve yazılım katmanlarının nasıl bir araya gelebileceğine dair yeni bir perspektif sunuyor.

Sistem, Gated DeltaNet yinelemeli durumunu bellek hücresi olarak kullanarak program ROM'unu, yazmaçları ve global belleği saklıyor. Model; tam sayı aritmetiği, mantıksal dallar, döngüler ve paylaşımlı bellek gibi özellikleri destekliyor. Çalışma sırasında ana makine, CUDA kodunu PTX diline derliyor ve girdileri modele token olarak veriyor, böylece model kendi başlatma adımlarını kendisi yönetiyor. Kaynak metinde yer alan bilgilere göre model, normal modda soruların önemli bir kısmını yanıtlayabilirken, gelişmiş modda ise ilk denemede doğru çekirdekler yazabiliyor.

Test sonuçlarına göre modelin referans yorumlayıcısı, 49 test çekirdeğinin tamamında bir NVIDIA Tesla T4 ile tam uyum sağladı. Apple MPS üzerinde saniyede 10 ila 15 token hız sunan bu deneysel proje, üretim ortamından ziyade bir araştırma demosu niteliği taşıyor ve geliştiricilerin doğrudan model içinde kesin hesaplama yapabilme fikrini test etmesini sağlıyor. Geliştiriciler ayrıca normal mod ve gelişmiş mod arasında geçiş yaparak farklı senaryolarda modelin yeteneklerini gözlemleyebiliyor.

Çalıştırmak için Python 3.11 ve yaklaşık 16 GB boş bellek gerektiren proje, önceden eğitilmiş bir kontrol noktası yayımlamıyor. Kullanıcılar betikler aracılığıyla Qwen3.5-2B modelini indirerek GPU katmanlarını entegre edebiliyor ve kurulan bu yapılar Qwen'in orijinal Apache-2.0 lisansı altında yer alıyor. Bu süreç, araştırmacıların kendi yerel ortamlarında deneysel donanım simülasyonları yapmasına olanak tanıyor.
