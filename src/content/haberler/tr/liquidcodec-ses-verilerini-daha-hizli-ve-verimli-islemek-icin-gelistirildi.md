---
lang: tr
title: "LiquidCodec, ses verilerini daha hızlı ve verimli işlemek için geliştirildi"
description: "Liquid AI, ses verilerini dil modellerinin anlayabileceği biçime dönüştüren yeni codec teknolojisi LiquidCodec'i duyurdu. Bu teknoloji, özellikle gerçek zamanlı sesli etkileşimlerde hız ve kaliteyi artırmayı hedefliyor."
category: teknoloji
date: 2026-11-13T03:50:51.222Z
esId: "liquidcodec-launches-to-accelerate-speech-to-token-processing-for-models"
bolge: "Küresel"
perspektif: "Bu gelişme, sesli yapay zekâ sistemlerinin daha az enerjiyle, daha düşük gecikme süresiyle ve daha yüksek kalitede çalışmasını sağlayarak, cihazların insanlarla daha doğal etkileşime girmesine olanak tanıyor."
why_matters: "Sesli yapay zekâ sistemlerinin daha az enerjiyle ve daha düşük gecikme süresiyle çalışmasını sağlayarak, cihazların insanlarla daha doğal etkileşime girmesine olanak tanıyor."
key_points:
  - "74 milyon parametreli ses codec'i"
  - "Tek çekirdekte 361 kat hızlı kodlama"
  - "107 dilde 264 bin saatlik veriyle eğitim"
rakamlar:
  - etiket: "Parametre sayısı"
    deger: "74 milyon"
  - etiket: "Kodlama hızı"
    deger: "361 kat"
  - etiket: "Eğitim verisi"
    deger: "264 bin saat"
kaynakIzi: "v1.uBXdADjxHIT8tQz1.ldxKbGWYG2f9IElxW/Evtufycd6/10ePR+hyWiLATxp48Ex7GZo3h6YjCId3lzmyXyQGNEEtNxfXHtxqC5RaS+xsi4hoxCrejG6t+in9/B9hKv/3IS6aRTtySYruOLw2aUDbwW0+M7D0Kh+CB5Hvl+/7HL7SiFlFdVsbQZvasnzcfr9F"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/12/liquid-ai-liquidcodec-streaming-audio-codec/"
haberDegeri: 78
featured: false
breaking: true
draft: false
---

Liquid AI, kendi geliştirdiği LFM3-Audio-2B ve LFM3-Omni-2B modellerinin temelini oluşturan LiquidCodec teknolojisini kullanıma sundu. Bu yeni ses codec'i, konuşma verilerini dil modellerinin tahmin edebileceği dijital belirteçlere (token) dönüştüren ve ardından bu belirteçleri tekrar sese çeviren yaklaşık 74 milyon parametreli bir sistemdir. Sesli yapay zekâ sistemlerinin başarısı, sesin ne kadar hızlı ve doğru bir şekilde dijital veriye dönüştürüldüğüne bağlıdır. LiquidCodec, özellikle tek bir işlemci çekirdeği üzerinde çalışırken sunduğu yüksek performansla dikkat çekiyor. Bu, cihazların daha az enerji harcayarak daha akıcı ve doğal sesli yanıtlar üretmesini sağlıyor.

Sistem, tek bir işlemci çekirdeği üzerinde gerçek zamanlı kodlamada yaklaşık 361 kat, kod çözmede ise 87 kat hız sunuyor. 24 kHz ses kalitesini 12 kod kitabı (codebook) ile işleyen bu teknoloji, önceki benzer sistemlere kıyasla daha düşük gecikme süreleri ve daha yüksek ses kalitesi vadediyor. Eğitim süreci, 107 dilde 264 bin saatlik konuşma verisiyle başlayıp, 55 bin saatlik yüksek kaliteli ses verisiyle tamamlandı. Bu süreç, sesin işlenmesi sırasında oluşabilecek metalik ses bozulmalarını gidermek için özel olarak tasarlandı.

Yapay zekâ dünyasında sesli asistanların ve gerçek zamanlı çeviri araçlarının gelişimi, bu tür verimli codec teknolojilerine dayanıyor. Daha önce kullanılan Mimi gibi sistemlerin yerini alan LiquidCodec, özellikle uç cihazlarda (edge computing) çalışacak şekilde optimize edildi. Geliştiriciler, Hugging Face üzerinden erişebildikleri bu teknolojiyi, llama.cpp gibi araçlarla kendi projelerine entegre edebiliyorlar. Bu gelişme, sesli yapay zekâ modellerinin sadece bulut sunucularında değil, kişisel bilgisayarlarda ve mobil cihazlarda da yüksek performansla çalışabilmesinin önünü açıyor.
