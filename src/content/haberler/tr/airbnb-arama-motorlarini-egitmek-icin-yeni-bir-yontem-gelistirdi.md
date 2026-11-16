---
lang: tr
title: "Airbnb arama motorlarını eğitmek için yeni bir yöntem geliştirdi"
description: "Airbnb, doğal dil arama modellerindeki veri eksikliği sorununu çözmek için yapay zekâ destekli yeni bir çerçeve kullanmaya başladı."
category: teknoloji
date: 2026-11-16T13:50:53.047Z
esId: "airbnb-introduces-new-framework-to-train-search-models"
bolge: "Küresel"
perspektif: "Bu gelişme, büyük dil modellerinin sadece metin üretmekle kalmayıp, arama motorlarının verimliliğini artırarak kullanıcıların aradıklarını daha hızlı bulmasını sağlayan kritik bir araç haline geldiğini gösteriyor."
why_matters: "Bu gelişme, büyük dil modellerinin arama motorlarının verimliliğini artırarak kullanıcıların aradıklarını daha hızlı bulmasını sağlayan kritik bir araç haline geldiğini gösteriyor."
key_points:
  - "Sistem, arama modellerindeki veri eksikliği sorununu sentetik verilerle çözüyor."
  - "Önceki yöntemlere göre 9,2 kat daha iyi performans gösterdi."
  - "İnsan uzmanlar sistemin kararlarını %91 ile %93 oranında doğruladı."
rakamlar:
  - etiket: "Performans artışı"
    deger: "9,2 kat"
  - etiket: "İnsan doğrulama oranı"
    deger: "%91 - %93"
  - etiket: "KL sapması (CASTLE)"
    deger: "1,01"
  - etiket: "KL sapması (Promptagator)"
    deger: "9,33"
kaynakIzi: "v1.DDmUf//IVR4fe9J+.mXXuZFkOnVo2LChCNU7UUrXCuFhrepGavxFflcg9beoov7/IG29N+ZIB3nmEI3JU5cV8qdccrds5zEbnU0B7qO3b8iTP7NvnLLzxnyXHmPVWifCSPHXC+grbqk5kTnurlfJ/3mxE8j38rsuJ+cCtHSvR24zwOfL/azHRqinp4YlD44hytvNVXjzno4YPln5SceGf5BPZQudJcwcduqFR0Wvd6TDVni/mbFl1s6VBMZt8Cw/cx8z9qusJ+va/XjYy"
kaynakAdlari:
  - ad: "InfoQ"
    url: "https://www.infoq.com/news/2026/11/airbnb-castle/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering"
haberDegeri: 70
featured: false
breaking: false
draft: false
---

Airbnb, doğal dil arama modellerini eğitmek için CASTLE adını verdiği yeni bir çerçeve geliştirdi. Bu sistem, özellikle yeni eklenen mülkler gibi yeterli kullanıcı verisi bulunmayan durumlarda yaşanan ve "soğuk başlangıç" olarak adlandırılan sorunu çözmeyi hedefliyor. Kullanıcılar artık "deniz kenarında evcil hayvan dostu ev" gibi günlük dille arama yapmayı tercih ediyor. Ancak bu sistemlerin doğru sonuç vermesi için çok fazla veriye ihtiyaç var. CASTLE, gerçek kullanıcı verisi yerine büyük dil modelleri tarafından üretilen sentetik verileri kullanarak bu süreci hızlandırıyor.

Sistem, daha önceki yöntemlerden farklı olarak sorgu oluşturma ve alaka düzeyi etiketlemeyi tek bir adımda birleştiriyor. Bu entegrasyon, hata payını önemli ölçüde düşürüyor. Yapılan testlerde, sistemin gerçek kullanıcı sorgularıyla uyumu, önceki yöntemlere göre 9,2 kat daha başarılı sonuç verdi. Daha önce kullanılan yöntemler, sorgu üretimi ve etiketlemeyi ayrı ayrı yapıyordu, bu da hatalara yol açabiliyordu. CASTLE ise rezervasyon geçmişlerinden elde edilen verileri kullanarak, bir mülkün neden seçildiğini ve diğerinin neden seçilmediğini analiz ediyor.

İnsan uzmanlar tarafından yapılan değerlendirmelerde, sistemin kararları %91 ile %93 arasında bir doğrulukla onaylandı. Bu teknoloji, arama motorlarının sadece anahtar kelimelere değil, kullanıcı niyetine odaklanmasını sağlıyor. Yeni geliştirilen bu yöntem, büyük dil modellerinin karmaşık arama altyapılarını optimize etmede nasıl kritik bir rol oynayabileceğini kanıtlıyor.
