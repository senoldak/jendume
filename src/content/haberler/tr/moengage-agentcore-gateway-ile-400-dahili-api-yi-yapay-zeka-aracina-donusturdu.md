---
lang: tr
title: "MoEngage, AgentCore Gateway ile 400 dahili API'yi yapay zekâ aracına dönüştürdü"
description: "Müşteri etkileşim platformu MoEngage, yüzlerce özel API'yi güvenli bir şekilde yapay zekâ ajanlarına açmak için Amazon Bedrock AgentCore Gateway teknolojisini kullanmaya başladı."
category: teknoloji
date: 2026-10-29T17:52:11.586Z
esId: "moengage-transforms-400-internal-apis-into-agent-tools-via-agentcore-gateway"
bolge: "Küresel"
perspektif: "Bu gelişme, şirketlerin ellerindeki devasa veri ve işlem kapasitesini, güvenlikten ödün vermeden yapay zekâ sistemlerine nasıl entegre edebileceğini gösteriyor. Karmaşık mühendislik süreçlerini basitleştirerek yapay zekâ ajanlarının gerçek iş operasyonlarında daha hızlı ve güvenli kullanılmasını sağlıyor."
why_matters: "Şirketlerin özel verilerini ve operasyonel yeteneklerini, internete sızdırmadan yapay zekâ ajanlarına güvenle bağlamasına olanak tanır."
key_points:
  - "400'den fazla dahili API yapay zekâ ajanları için erişilebilir hale getirildi."
  - "Yeni bir API'nin sisteme entegrasyon süresi günlerden saatlere düştü."
  - "Platform mühendisliği tarafında yaklaşık 6 aylık iş gücü tasarrufu sağlandı."
rakamlar:
  - etiket: "Dahili API sayısı"
    deger: "400"
  - etiket: "Kullanıcı marka sayısı"
    deger: "1.350"
kaynakIzi: "v1.lDjocHKGTLzoOTqr.e01G3VmloWEr5/Dpjs0uc5A3Qa6bSwjRuIq3f7MgMP8iDEFxegpM88mN3LKKT+kpP8jh8N/vtSooVSnc0hyrLLkq7sLMDpt/sUZ5apJ0kvNFSXaxYfx2IKP6SAddu0Qa2mEuZQ/vLrggznyHjcR2Rpey3h955hPE8GtMSSajZsN9WBmH+J9XSQ6I/Yto7B5vtsCc47RGNsaHSMdqwvM7oSs8X+KezwZDUpWt5hV8M5IYj/jE/Q=="
kaynaklar:
  - ad: "AWS Machine Learning Blog"
    url: "https://aws.amazon.com/blogs/machine-learning/how-moengage-turned-over-400-apis-into-agent-tools-with-agentcore-gateway/"
featured: false
breaking: false
draft: false
---

Müşteri etkileşim platformu MoEngage, bünyesindeki 400'den fazla dahili uygulama programlama arayüzünü (API) yapay zekâ ajanlarının kullanımına sunduğunu duyurdu. Şirket, bu dönüşümü gerçekleştirmek için Amazon Bedrock AgentCore Gateway çözümünü tercih etti. Bu hamle, 1.350'den fazla markaya hizmet veren platformun, mevcut yeteneklerini yapay zekâ modellerine güvenli bir şekilde aktarmasını sağlıyor.

MoEngage mühendislik ekipleri, başlangıçta her birimin kendi Model Bağlam Protokolü (MCP) sunucusunu kurmasını değerlendirdi ancak bu yöntemin operasyonel yükü nedeniyle vazgeçti. Bunun yerine, tüm ekiplerin mevcut REST API'lerini ve OpenAPI belgelerini kullanan merkezi bir yapı kuruldu. Bu sayede, yeni bir API'nin yapay zekâ aracına dönüştürülmesi süreci günlerden saatlere indirildi ve yaklaşık altı aylık bir mühendislik emeğinden tasarruf sağlandı.

Sistemin en kritik özelliği, dahili API'lerin kamuya açık internete açılmadan, özel bulut ağları (VPC) içinde kalmaya devam etmesidir. Güvenlik katmanında kullanılan Cedar politikaları sayesinde, her yapay zekâ ajanı yalnızca yetkisi dahilindeki araçları görebiliyor ve çağırabiliyor. Örneğin, bir kampanya denetim botu verileri okuyabilirken, yazma veya silme işlemlerine erişemiyor. Bu yöntem, 400 aracın tamamının yapay zekâ modelinin bağlam penceresini (hafızasını) doldurmasını da engelliyor.

Bu mimari yapı, yapay zekâ modellerinin kimlik bilgilerini veya kullanıcı rollerini kendi başlarına değiştirmesinin de önüne geçiyor. Kimlik doğrulama işlemleri modelin erişemeyeceği bir katmanda yapıldığı için, modellerin hata yapma veya manipüle edilme riski minimize ediliyor. MoEngage'in bu stratejisi, büyük ölçekli şirketlerin karmaşık altyapılarını yapay zekâ çağına nasıl uyarlayabileceğine dair somut bir örnek teşkil ediyor.
