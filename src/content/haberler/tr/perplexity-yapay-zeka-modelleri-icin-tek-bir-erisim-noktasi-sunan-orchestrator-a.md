---
lang: tr
title: "Perplexity, yapay zekâ modelleri için tek bir erişim noktası sunan Orchestrator API'yi başlattı"
description: "Geliştiriciler artık OpenAI, Anthropic ve Google gibi farklı sağlayıcıların modellerine tek bir arayüz üzerinden erişebilecek."
category: teknoloji
date: 2026-11-19T21:51:00.183Z
esId: "perplexity-launches-orchestrator-api-to-unify-access-to-frontier-and-open-weight"
bolge: "Küresel"
perspektif: "Bu gelişme, geliştiricilerin tek bir sağlayıcıya bağımlı kalmadan daha esnek ve kesintisiz yapay zekâ uygulamaları geliştirmesine olanak tanıyor."
why_matters: "Geliştiricilerin farklı yapay zekâ modellerini tek bir noktadan yönetmesini sağlayarak sistem hatalarını azaltır ve uygulama geliştirme sürecini hızlandırır."
key_points:
  - "85'ten fazla model tek bir API üzerinden erişilebilir hale geldi."
  - "Otomatik geçiş (failover) özelliği ile kesintisiz hizmet sağlanıyor."
  - "Doğal dil yönlendirmesi ile görev tamamlama başarısı artırıldı."
rakamlar:
  - etiket: "Desteklenen model"
    deger: "85+"
  - etiket: "Test başarısı"
    deger: "41/63"
kaynakIzi: "v1.as8Pogd62nZ3mR1g.EBQQs6Mz9HEggZy9MaGww3+O0i8zDCYgMEg/xr95eg6WBzYLam6xrAqhPo0VfEzIdy5jAklI5tgBgW2t2n+9K1bi/ovWCE/ZFgauityGRcSqwineTqMTyZ2ic2BA60YDIpxZi5UKKxFxlxAWPDi1DKN0wqXiuujsYrz/+RcWncZeOkhQJeO0EWQeAg=="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/19/perplexity-orchestrator-api-failover-model-routing/"
haberDegeri: 80
featured: false
breaking: false
draft: false
---

Perplexity, geliştiricilerin farklı yapay zekâ modellerine tek bir noktadan erişmesini sağlayan Orchestrator API'yi kullanıma sundu. Bu yeni sistem, OpenAI, Anthropic, Google ve xAI gibi sektör devlerinin modellerinin yanı sıra açık ağırlıklı (open-weight) modelleri de tek bir URL altında topluyor. Geliştiriciler için en büyük zorluklardan biri, farklı sağlayıcıların sunduğu modelleri entegre ederken yaşanan kesintiler ve karmaşık faturalandırma süreçleridir. Bu yeni API, bir sağlayıcıda sorun yaşandığında otomatik olarak başka bir sağlayıcıya geçiş yaparak (failover) sistemin sürekliliğini sağlıyor.

Sistem, 85'ten fazla modeli ve 12'den fazla sağlayıcıyı destekliyor. Ayrıca, "perplexity/auto" özelliği sayesinde, geliştiriciler modelleri doğal dille tanımlanan görevlere göre otomatik olarak yönlendirebiliyor. Terminal-Bench 4.1 testlerinde, bu yönlendirme mekanizmasının model reddetme oranlarını düşürdüğü ve görev tamamlama başarısını 38/63'ten 41/63'e çıkardığı gözlemlendi. Bu özellik, özellikle karmaşık iş akışlarında modelin reddetme eğilimini aşmak için kritik bir çözüm sunuyor.

Fiyatlandırma, kullanılan modelin standart token ücreti üzerinden yapılıyor ve ekstra bir platform ücreti alınmıyor. Erişim, yapılan kredi satın alımlarına göre üç farklı seviyeye ayrılmış durumda. Bu gelişme, yapay zekâ uygulamalarının güvenilirliğini artırarak, geliştiricilerin tek bir sağlayıcıya bağımlı kalmadan daha esnek ve dayanıklı sistemler kurmasına olanak tanıyor. Artık geliştiriciler, altyapı yönetimiyle uğraşmak yerine, modellerin performansına ve ürün geliştirmeye daha fazla odaklanabilecek.
