---
lang: tr
title: "Grok Build kodlama aracı kullanıcı verilerini sızdırıyor"
description: "SpaceXSI tarafından geliştirilen Grok Build kodlama aracı, tasarım hatası nedeniyle binlerce kullanıcının özel verilerini ve şirket içi belgelerini erişime açık hale getiriyor."
category: teknoloji
date: 2026-11-10T21:50:53.919Z
esId: "grok-build-coding-agent-exposes-sensitive-user-data"
bolge: "Küresel"
perspektif: "Yapay zekâ destekli kodlama araçlarının güvenliği, kullanıcıların hassas verilerini koruma konusunda kritik bir sınav veriyor. Bu olay, basit tasarım hatalarının bile kurumsal ve kişisel gizlilik için büyük riskler oluşturabileceğini gösteriyor."
why_matters: "Bu gelişme, yapay zekâ araçlarının güvenlik açıklarının hem bireysel hem de kurumsal verileri nasıl tehlikeye atabileceğini gözler önüne seriyor."
key_points:
  - "Grok Build platformunda kritik tasarım hatası"
  - "Şirket içi gizli veriler ve satış haritaları açığa çıktı"
  - "Binlerce kullanıcı projesi erişilebilir durumda"
rakamlar:
  - etiket: "İncelenen uygulama"
    deger: "24"
  - etiket: "Satış hesabı"
    deger: "594"
kaynakIzi: "v1.8zmtZhmxIE+ni4U6.J0Xf1v/FFltrfRgbvN4WcTGg6PRaFx5NVnJtOUxBrdO5Rp4ONQwHB6RSlLRo6fUtx65gAvPiGJdCqjwmEEDzAirQNykOcBAnaEnEumnvbs/u+7+b1UHagwf/3YGzRr0sLtBe2SHJXQ1VqdcixIT5mFH6OpWId21OkITwivwWr2LkdWLFZduOcSzWJyDEQkiEXGnjnMKdEOTOJ4OstK/TWI4oq79jRKnNzdXoZzkL/pkA"
kaynakAdlari:
  - ad: "Ars Technica"
    url: "https://arstechnica.com/security/2026/11/grok-build-coding-agent-leaks-oodles-of-confidential-info-some-belonging-to-spacexsi/"
haberDegeri: 88
featured: false
breaking: true
draft: false
---

SpaceXSI'nın "vibe-coding" olarak adlandırdığı kodlama aracı Grok Build, ciddi bir veri sızıntısı sorunuyla karşı karşıya. Yapılan güvenlik araştırmaları, platformun kullanıcıların oluşturduğu uygulamaları paylaşmak için kullandığı bağlantı yapısında büyük bir tasarım hatası olduğunu ortaya koydu. Normal şartlarda rastgele oluşturulması ve yalnızca bağlantıya sahip kişilerce erişilebilir olması gereken bu URL'ler, tahmin edilebilir bir yapıya sahip. Bu durum, kötü niyetli kişilerin veya meraklı kullanıcıların binlerce canlı projeye kolayca erişmesine olanak tanıyor.

Bu sızıntı, yapay zekâ destekli kodlama araçlarının güvenliği konusunda kritik bir uyarı niteliğinde. Kullanıcılar, bu tür araçlara iş planları, tıbbi sonuçlar veya kişisel veriler gibi hassas bilgiler yükleyebiliyor. Araçların bu verileri koruma konusundaki yetersizliği, hem bireysel gizliliği hem de kurumsal güvenliği doğrudan tehdit ediyor. Güvenlik uzmanları, sızan veriler arasında iş planları, reklam teklifleri, tıbbi sınav sonuçları ve çalışan kimlik numaraları gibi son derece hassas bilgilerin bulunduğunu tespit etti.

İronik bir şekilde, bu sızıntıdan etkilenenler arasında platformun sahibi olan SpaceXSI'nın kendisi de yer alıyor. Şirketin kendi geliştirdiği 24 farklı uygulama üzerinde yapılan incelemelerde, gizli ibareli işe alım planları, 594 hesabı içeren satış bölgesi haritaları ve şirket içi sistem adresleri gibi kritik bilgiler açığa çıktı. Yapay zekâ destekli yazılım geliştirme araçları hızla yaygınlaşırken, bu tür güvenlik açıkları, geliştiricilerin ve şirketlerin bu araçları kullanırken verilerini nasıl koruyacakları konusundaki endişeleri artırıyor. Platformun tasarımındaki bu temel hata, güvenlik önlemlerinin sadece "rastgele URL" oluşturmaktan ibaret olamayacağını, daha derinlemesine bir koruma mekanizmasına ihtiyaç duyulduğunu gösteriyor.
