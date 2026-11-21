---
lang: tr
title: "Thinking Machines, Inkling 2 Mini modelini açık ağırlıklı olarak yayımladı"
description: "Thinking Machines, orta katmanlarını döngüsel olarak yeniden kullanarak 32 GB bellekli bilgisayarlarda yüksek kodlama performansı sunan Inkling 2 Mini modelini kullanıma sundu."
category: yapay-zeka
date: 2026-11-21T13:50:50.702Z
esId: "thinking-machines-releases-inkling-2-mini-as-an-open-weight-model"
bolge: "Küresel"
perspektif: "Bu gelişme, yüksek performanslı yapay zekâ yazılım ajanlarının pahalı sunucu çiftlikleri yerine bireysel geliştiricilerin yerel bilgisayarlarında çalışabilmesinin önünü açıyor."
why_matters: "Geliştiricilerin güçlü yapay zekâ kodlama ajanlarını bulut sunucularına bağımlı kalmadan kendi bilgisayarlarında yerel olarak çalıştırmalarına olanak tanır."
key_points:
  - "26,4 milyar toplam ve 3,4 milyar aktif parametreli döngüsel mimari kullanıyor."
  - "SWE-bench Verified kodlama testinde %79,2 başarı oranına ulaştı."
  - "Yaklaşık 20 GB boyutuyla 32 GB bellekli bilgisayarlarda yerel olarak çalışabiliyor."
rakamlar:
  - etiket: "Toplam parametre"
    deger: "26,4 milyar"
  - etiket: "Aktif parametre"
    deger: "3,4 milyar"
  - etiket: "SWE-bench skoru"
    deger: "%79,2"
  - etiket: "Model boyutu"
    deger: "20 GB"
kaynakIzi: "v1.qdV+WR6FOcO4mWjr.1kv0bO+9jMSQhYp7iJnjaa7yyQCnDTsFAG6MgHk11pnik8VEa5liBoCE4Lyy2JwKyaA7jAHuQAijJhdZM3GJ0Ld1yrFmPTBPu8yIJcy8LVZthgloj6p89rWfeG7U0Pgx/xX2LdAwfLfMK3IiDZCEg2hL06rrHYmx3r7RJHIUO28JPjMfCbY+vWrodeE="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/21/thinking-machines-inkling-2-mini-looped-transformer/"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

Thinking Machines Lab, 26,4 milyar toplam parametreye sahip açık ağırlıklı yeni yapay zekâ modeli Inkling 2 Mini'yi kullanıma sundu. Model, geleneksel yöntemlerin aksine orta katmanlarını jeton başına üç kez yeniden kullanan döngüsel bir transformer mimarisiyle çalışıyor. Bu yenilikçi yaklaşım, modelin toplam ağırlık miktarını artırmadan kapasitesini genişletmesine olanak tanıyor. Tasarım, modelin dosya boyutunu yaklaşık 20 GB seviyesinde tutarak, 32 GB belleğe sahip Mac bilgisayarlar veya tek bir NVIDIA DGX Spark gibi donanımlarda yerel olarak çalıştırılabilmesini sağlıyor. Apache 2.0 lisansıyla Hugging Face üzerinden erişilebilen model, özellikle yazılım geliştirme, araç kullanımı ve belge işleme gibi otonom görevler için optimize edildi.

Döngüsel katman yapısı, donanım kaynaklarının verimliliğini artırıyor. Model bünyesindeki 24 depolanmış katman, token başına 48 katman uygulaması üretecek şekilde işletiliyor. Test sonuçlarına göre, orta katmanların döngüye sokulması, bilgi işlem verimliliğinde 1,51 ila 1,91 katlık bir kazanç sağladı. Şirket, bu yöntemin eğitim aşamasında ek hesaplama yükü getirse de, çıkarım aşamasında enerji ve kaynak tasarrufu sağladığını belirtiyor.

Inkling 2 Mini, otonom kodlama alanındaki yetenekleriyle dikkat çekiyor. Model, SWE-bench Verified testinde %79,2 başarı oranına ulaşırken, Artificial Analysis endeksinde 20,1 puan alarak benzer ölçekteki açık kaynaklı modellerle rekabet ediyor. Ancak modelin zayıf yönleri de mevcut; parametre sayısının sınırlandırılmış olması nedeniyle genel bilgi çağırma ve çok turlu karmaşık sohbet senaryolarında daha düşük performans sergiliyor.

Bu hamle, yapay zekâ sektöründe devasa modellerin yanı sıra, yerel cihazlarda yüksek verimle çalışabilen kompakt mimarilerin önem kazandığını gösteriyor. Geliştiriciler, verilerini bulut sunucularına göndermeden karmaşık kodlama ajanlarını kendi yerel sistemlerinde çalıştırma imkânına kavuşuyor.
