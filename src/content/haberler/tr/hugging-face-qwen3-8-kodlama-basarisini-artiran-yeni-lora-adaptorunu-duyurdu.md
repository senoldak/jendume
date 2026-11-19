---
lang: tr
title: "Hugging Face, Qwen3.8 kodlama başarısını artıran yeni LoRA adaptörünü duyurdu"
description: "Hugging Face ekibi, Qwen3.8-27B modeli için geliştirilen ve kodlama ajanlarının başarısını %39'dan %65'e çıkaran yeni LoRA adaptörünü yayımladı."
category: teknoloji
date: 2026-11-19T03:50:54.087Z
esId: "hugging-face-releases-new-lora-adapter-boosting-qwen3-8-coding-accuracy"
bolge: "Küresel"
perspektif: "Bu yeni adaptör, yapay zekâ modellerinin uzun ve maliyetli düşünme süreçlerine gerek kalmadan yüksek doğrulukla ve daha az token harcayarak kodlama yapmasını sağlıyor. Bu durum, geliştiricilerin yerel sistemlerde daha verimli ve hızlı çalışan yapay zekâ ajanları çalıştırmasının önünü açıyor."
why_matters: "Kaynak tüketimini önemli ölçüde azaltan bu yaklaşım, donanım maliyetlerini düşürerek yapay zekâ destekli yazılım geliştirme süreçlerinin yerel bilgisayarlarda yaygınlaşmasını hızlandırıyor."
key_points:
  - "SWE-bench Pro başarı oranı %39,2'den %64,7'ye yükseldi."
  - "Model, yaklaşık 4,5 kat daha az token üreterek aynı doğruluk seviyesini sağlıyor."
  - "Eğitim sürecinde 2 adet NVIDIA B200 işlemci kullanıldı."
rakamlar:
  - etiket: "SWE-bench başarı"
    deger: "%64,7"
  - etiket: "Token tasarrufu"
    deger: "4,5 kat"
kaynakIzi: "v1.XorYVI3W1BzTPlyx.xuvOWmF+OAW9tElGbkbjegfJ+c5ppFkvwuIEqI0Kl1fOJBkw93vS876q4DjYH7+yGOTjN7sa7Q0xwc0qiz73V7Duamj+Evb9XQEZvi24pCGKptK/VFuggIfZ/BgBXYeblK+qvt4bEjMQcGy633eFfv89Bm/qfIFf1PEj+OUTDDjR"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/18/hugging-face-qwen3-8-27b-pi-adapted-lora/"
haberDegeri: 78
featured: false
breaking: false
draft: false
---

Hugging Face bünyesindeki bir ekip, Qwen3.8-27B modeli için tasarlanan yeni bir PEFT LoRA adaptörünü kullanıma sundu. Qwen3.8-27B-pi-adapted adı verilen bu özel adaptör, açık kaynaklı pi kodlama ajanı içinde çalışmak üzere pekiştirmeli öğrenme yöntemiyle eğitildi. Genel sohbet yerine doğrudan belirli bir kodlama aracı hedeflenerek geliştirilen yapı, yerel kodlama ajanları çalıştıran geliştiriciler için büyük bir kolaylık sunuyor.

Elde edilen performans ölçümleri, adaptörün sağladığı somut iyileştirmeleri gözler önüne seriyor. SWE-bench Pro testlerinde daha önce %39,2 olan başarı oranı, adaptör sayesinde %64,7 seviyesine yükseldi. Benzer şekilde, Terminal-Bench 2.1 testlerinde de önemli başarı artışları kaydedildi. En dikkat çekici noktalardan biri ise verimlilik tarafında yaşandı; ortak çözülen görevlerde medyan tur sayıları çarpıcı biçimde düştü.

Adaptörün en büyük avantajı, temel modelin uzun düşünme modunu aktif etmeden benzer bir doğruluk seviyesini yakalayabilmesi. Bu sayede model, yaklaşık 4,5 kat daha az token üreterek aynı sonucu verebiliyor. Eğitim sürecinde iki adet NVIDIA B200 grafik işlemcisi kullanılırken, modelin eğitildiği yöntem açık kaynak dünyasında şeffaf bir şekilde paylaşıldı.

Dağıtım ve kullanım açısından geliştiricilere vLLM, llama.cpp ve macOS üzerinde Llama.app gibi çeşitli alternatifler sunuluyor. Aynı temel modeli paylaşan adaptörler sayesinde tek bir sunucu üzerinden farklı ajanların adaptörleri yan yana barındırılabiliyor. Apache-2.0 lisansıyla yayımlanan bu gelişme, açık kaynaklı kodlama araçlarının verimliliğini artırma yolunda önemli bir adım olarak değerlendiriliyor.
