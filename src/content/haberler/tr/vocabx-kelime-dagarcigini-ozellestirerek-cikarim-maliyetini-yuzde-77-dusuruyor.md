---
lang: tr
title: "VocabX kelime dağarcığını özelleştirerek çıkarım maliyetini yüzde 77 düşürüyor"
description: "Dharma-AI ekibi, açık kaynaklı dil modellerinde kelime dağarcığını göreve özel olarak yeniden düzenleyen VocabX yöntemini geliştirdi. Bu yaklaşım, taban modeli değiştirmeden çıkarım maliyetini önemli ölçüde azaltıyor."
category: teknoloji
date: 2026-10-21T17:50:58.201Z
bolge: "Küresel"
perspektif: "Bu gelişme, küçük dil modellerinin operasyonel maliyetlerini düşürerek yapay zekâ teknolojilerinin şirketler ve geliştiriciler için çok daha ekonomik ve sürdürülebilir olmasını sağlıyor."
why_matters: "Bu teknik, yapay zekâ modellerinin çalışma maliyetlerini büyük ölçüde azaltarak teknolojinin daha geniş kitleler tarafından erişilebilir ve sürdürülebilir olmasını sağlar."
key_points:
  - "Çıkarım maliyeti yüzde 77 oranında azaldı"
  - "Model, Qwen3-4B altyapısını kullanıyor"
  - "Sözlük boyutu yaklaşık 152 binden 65 bine düştü"
rakamlar:
  - etiket: "Maliyet düşüşü"
    deger: "%77"
  - etiket: "Model parametresi"
    deger: "4 milyar"
  - etiket: "Orijinal sözlük"
    deger: "151.669"
kaynakIzi: "v1.s3sIkln5+vtOv0Db.9HAU/Q6bGfgASaAV2qeEfSP0GZZUn/IwNkbbqOQ9g2s6tBFnt1tCV0R+eL9E8MhYUyerphSp3n0CprmoXxyPdpJM1qdOh0U/MMj98aqwCnkdc8L1MUrE020t1OyEbut3KufLP+ZGddhzD/i42izgPHxpLT5mmTtePaVO"
featured: false
breaking: false
draft: false
---

Yapay zekâ alanında faaliyet gösteren Dharma-AI araştırmacıları, açık kaynaklı dil modellerinin maliyetini düşürmek amacıyla yeni bir yöntem geliştirdi. Genel amaçlı modeller, pek çok farklı dil ve alan için tasarlanmış geniş kelime dağarcıklarıyla çalışır. Ancak bu durum, belirli bir alana odaklanan uygulamalarda gereksiz maliyetlere ve token israfına yol açar.

Araştırma ekibi, Portekizce kompozisyonları değerlendiren otomatik bir sınav okuma sisteminde Qwen3-4B modelini kullandı. Mevcut sistem, binlerce kelimeden oluşan devasa bir sözlükle çalışırken, sadece tek bir dil ve belirli bir yanıt formatına ihtiyaç duyuyordu. Bu uyumsuzluk, hem üretilen metinlerin daha fazla token harcamasına neden oluyor hem de modelin her adımda kullanılmayan binlerce kelimeyi hesaplamasına yol açıyordu.

Geliştirilen VocabX yöntemi, taban modeli, verileri ve eğitim sürecini değiştirmeden kelime dağarcığını yeniden yapılandırıyor. Yapılan ölçümlere göre bu yaklaşım, metin üretim maliyetlerini yüzde 77 oranında düşürmeyi başardı. Ayrıca modelin çıkış katmanındaki satır sayısı önemli ölçüde azaltıldı.

Dil modellerinde metin üretimi, bellek bant genişliği sınırlamaları nedeniyle okuma işlemine göre çok daha maliyetlidir. VocabX, hem girdi ve çıktı süreçlerindeki token verimliliğini artırıyor hem de modelin son katmanındaki gereksiz yükü ortadan kaldırıyor. Bu teknik, özellikle küçük modellerin gerçek dünya uygulamalarındaki verimliliğini artırmak için yeni bir yol sunuyor.
