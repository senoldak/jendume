---
lang: tr
title: "PrismML, 54 GB'lık yapay zekâ modelini 5,9 GB'a sıkıştırarak telefonlarda çalışır hale getirdi"
description: "PrismML, geliştirdiği yeni sıkıştırma tekniğiyle devasa yapay zekâ modellerini akıllı telefonlar ve kişisel bilgisayarlar gibi sınırlı donanımlarda çalışabilir kılıyor."
category: teknoloji
date: 2026-11-25T13:50:54.850Z
esId: "prismml-shrinks-54-gb-ai-model-to-5-9-gb-enabling-high-performance-on-consumer-d"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekânın bulut sunucularına bağımlılığını azaltarak, yüksek performanslı modellerin kişisel cihazlarda yerel olarak çalışmasına olanak tanıyor."
why_matters: "Yapay zekâ modellerinin devasa sunuculara ihtiyaç duymadan kişisel cihazlarda çalışabilmesi, teknolojinin erişilebilirliğini ve gizliliğini artırıyor."
key_points:
  - "Model boyutu 54 GB'tan 5,9 GB'a düşürüldü"
  - "AppWorld test puanı %51,2'den %90,5'e yükseldi"
  - "Apple cihazları ve standart GPU'larda çalışabiliyor"
rakamlar:
  - etiket: "Model boyutu"
    deger: "5,9 GB"
  - etiket: "SWE-bench puanı"
    deger: "%75,6"
  - etiket: "AppWorld puanı"
    deger: "%90,5"
  - etiket: "Üretim hızı"
    deger: "204 token/sn"
kaynakIzi: "v1.CFUjrDebL056bpPz.kjYc7lQIKPhamkbBAlVEaKMHMy0/MvowDFrmOpNylUw112VW2f3o7jY2g3WxdPK6vfMCpvxGZfASgmoqz3t4Lab00FUA6lnk09F/Ebfqe30oZZEYBMMSiZ4mfFfyqE688bCm23XYFjItjjidykKjzzgg3dd7vzdw1L1m9zEaSlWEY2W5WJ2918L4FSTL203P9TvecFqVKCw1XYk="
kaynakAdlari:
  - ad: "The Decoder"
    url: "https://the-decoder.com/prismml-squeezes-an-agent-based-coding-model-with-27-billion-parameters-into-5-9-gb/"
haberDegeri: 90
featured: false
breaking: false
draft: false
---

PrismML, yapay zekâ modellerinin boyutunu dramatik şekilde küçülten yeni teknolojisi Ternary Bonsai 2.5 27B modelini duyurdu. Qwen3.8-27B mimarisi üzerine inşa edilen bu model, "üçlü nicemleme" (ternary quantization) adı verilen özel bir yöntemle, standart 16-bit depolama yerine ağırlıkları sadece -1, 0 ve +1 değerlerine indirgiyor. Bu teknik, normalde 54 GB yer kaplaması gereken devasa bir modeli, sadece 5,9 GB'lık bir boyuta sığdırarak akıllı telefonlar ve kişisel bilgisayarlar gibi sınırlı donanımlarda çalışabilir hale getiriyor.

Bu teknik, yapay zekânın bulut sunucularından çıkıp doğrudan kullanıcı cihazlarında çalışmasını sağlıyor. Özellikle "agentic" yani eylemsel görevlerde, yani yazılımın kendi başına araçları kullanarak karmaşık iş akışlarını yönettiği senaryolarda, modelin daha güvenilir sonuçlar verdiği gözlemleniyor. Önceki sürüme kıyasla daha az işlem adımı ve token gerektiren bu yapı, yapay zekânın döngülere girip takılma riskini de azaltıyor.

Performans testlerinde sıkıştırma yönteminin sonuçları ölçüldü. Yazılım mühendisliği görevlerini ölçen SWE-bench Verified testinde başarı oranı %60,8'den %75,6'ya yükselirken, ajan yeteneklerini ölçen AppWorld testinde %51,2'den %90,5'e çıkarak temel modelin performansına yaklaştı.

Caltech bünyesindeki bir araştırma ekibinden doğan ve Google, Samsung ile Khosla Ventures gibi devlerden destek alan PrismML, bu teknolojiyi Apache 2.0 lisansıyla sunuyor. Model; Nvidia ve Intel grafik kartlarının yanı sıra Apple'ın Mac, iPhone ve iPad cihazlarında da çalışabiliyor. RTX 4090 gibi güçlü bir ekran kartında saniyede 204 token üretebilen bu model, yapay zekânın yerel cihazlarda yüksek performansla çalışabileceği yeni bir dönemin kapısını aralıyor.
