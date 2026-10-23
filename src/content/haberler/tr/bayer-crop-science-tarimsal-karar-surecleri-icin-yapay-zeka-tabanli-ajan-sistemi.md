---
lang: tr
title: "Bayer Crop Science tarımsal karar süreçleri için yapay zekâ tabanlı ajan sistemi geliştirdi"
description: "Bayer, Amazon Bedrock AgentCore altyapısını kullanarak bitki ıslahı ve veri analitiğini kolaylaştıran çoklu ajan mimarisine sahip Agentic Decision Engine sistemini devreye soktu."
category: teknoloji
date: 2026-10-23T17:51:01.150Z
esId: "bayer-crop-science-builds-an-agentic-decision-engine-for-agricultural-data-workf"
bolge: "Küresel"
perspektif: "Bu yapay zekâ gelişmesi, karmaşık veri ve model süreçlerini doğal dil arayüzüyle çözerek uzmanların manuel log inceleme süresini dakikalara indiriyor ve tarımsal Ar-Ge verimliliğini artırıyor."
why_matters: "Karmaşık veri analizlerini doğal dil ile erişilebilir kılan bu sistem, uzmanların zaman kaybını önleyerek araştırma verimliliğini artırıyor."
key_points:
  - "Agentic Decision Engine, kullanıcı sorularının yüzde 80'ini mühendis müdahalesi olmadan yanıtlıyor."
  - "Sistem üretim ortamında 22 farklı uzman ajanla görev yapıyor."
  - "Manuel log inceleme süresi bir saatten 10 dakikanın altına düştü."
rakamlar:
  - etiket: "Soru çözüm oranı"
    deger: "%80"
  - etiket: "Uzman ajan sayısı"
    deger: "22"
kaynakIzi: "v1.6pNql/fo+dOQg0ZI.4MRh69m3Oyjx5lKb16NOyrSfutayyGa2jOYlixygU7ei6DFr2V2FBZTRw4G+QYM6ILNfR8Jl9JSiTWkQ07cKLm4nawdIHiHyccXl5LhKIOIZIWZ3X7MhqsH9pJ8Lx9Y24I6DYy4k8PwLKVDVaevyUVlR9r3wr9U1eeFNO0Gyqq6fcSIpNfFfVs1D9GamkbOKJQ+s+yclX5DepP2UCGAXCUqEbxLxTXKaJjnBORiOpD0mghn0UU0bblQgemoyJ+YJ2kYQ1i6G2cN+Cbcu2kMWMTxDjIoNgD/+KsGw"
kaynaklar:
  - ad: "AWS Machine Learning Blog"
    url: "https://aws.amazon.com/blogs/machine-learning/how-bayer-crop-science-built-an-agentic-decision-engine-on-amazon-bedrock-agentcore-with-aws-unified-operations/"
featured: false
breaking: false
draft: false
---

Bayer Crop Science, bitki ıslahı ve tarımsal veri analitiği süreçlerini hızlandırmak amacıyla yapay zekâ tabanlı yeni bir sistem geliştirdi. Şirket, genomik verilerden saha denemelerine kadar geniş bir yelpazede kullanılan yüzlerce makine öğrenmesi modelini yönetmek için daha önce Connected Decision Engine sistemini kurmuştu. Ancak süreçlerin büyümesiyle birlikte iş akışlarını anlamak ve olası hataları çözmek teknik bir zorluk haline geldi.

Bu sorunu aşmak için geliştirilen Agentic Decision Engine, doğal dil arayüzü sunan çoklu ajan mimarisine sahip bir sistem olarak tasarlandı. Süpervizör ajan, gelen soruları ilgili uzman ajana yönlendiriyor ve kullanıcılar teknik detaylarda kaybolmadan doğrudan yanıt alabiliyor. Sistem ilk aşamada kullanıcı sorularının yaklaşık yüzde 80'ini mühendis müdahalesine gerek kalmadan çözüyor.

Yeni sistem, ölçeklenebilir ajan altyapısı sunan Amazon Bedrock AgentCore üzerinde çalışıyor. Mimaride LangGraph tabanlı iş akışı düzenlemesi kullanılırken, üretim ortamında farklı alanlara odaklanan 22 uzman ajan görev yapıyor. Örneğin sorun giderme ajanı, operasyonel telemetri verilerini analiz ederek arızaları hızla tespit ediyor. AWS Unified Operations ekibi de tasarım aşamasından üretime kadar süreç boyunca teknik destek sağladı.

Eski yöntemlerle bir saatten uzun süren manuel log inceleme ve destek süreçleri, yeni ajan sistemi sayesinde on dakikanın altına iniyor. Bayer, sistemin ilk aşamasında yüzün üzerinde kullanıcıya ulaştığını ve API entegrasyon maliyetlerini önemli ölçüde düşürdüğünü belirtiyor. Bu gelişme, tarımsal Ar-Ge çalışmalarında veri analitiğini daha erişilebilir ve verimli hale getiriyor.
