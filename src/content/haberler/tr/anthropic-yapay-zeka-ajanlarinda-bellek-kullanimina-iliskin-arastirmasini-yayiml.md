---
lang: tr
title: "Anthropic yapay zekâ ajanlarında bellek kullanımına ilişkin araştırmasını yayımladı"
description: "Anthropic tarafından yayımlanan araştırma, yapay zekâ ajanlarının geçmiş oturumlardan bilgi taşırken her şeyi kaydetmek yerine doğru bilgileri seçip yanlışları ayıklamasının daha başarılı sonuç verdiğini ortaya koyuyor."
category: yapay-zeka
date: 2026-11-16T15:50:52.618Z
esId: "anthropic-details-memory-retention-research-for-claude-ai-agents"
bolge: "ABD"
perspektif: "Yapay zekâ ajanlarının uzun vadeli görevlerde hafıza kaybetmesi veya yanlış verilere takılması, iş süreçlerinde aksamalara yol açıyor. Yapay zekânın \"Rüya Görme\" (Dreaming) yöntemiyle kendi belleğini düzenlemesi, daha güvenilir ve verimli bir çalışma arkadaşına dönüşmesini sağlıyor."
why_matters: "Ajanların her oturuma sıfırdan başlaması sorununu çözen bu yaklaşım, karmaşık bellek dokümanlarında doğruluk oranını yükseltirken veri yığılmasının getirdiği ek maliyet ve bağlam kayıplarını en aza indiriyor."
key_points:
  - "Not tutan ve kendi belleğini \"Dreaming\" yöntemiyle düzenleyen yapay zekâ hukuki testlerde %87 doğruluk oranına ulaştı."
  - "Gereksiz veri depolayan eski model oyunda 1 rozet alabilirken, sadece stratejik not alan yeni model 4 rozet kazandı."
  - "Dreaming süreci için Stainless şirketine ait 350.000 dahili belgeden yararlanıldı."
rakamlar:
  - etiket: "Hukuk testi başarısı"
    deger: "%87"
  - etiket: "Oyun adımı"
    deger: "10.000"
  - etiket: "Oluşturulan dosya"
    deger: "413"
  - etiket: "İncelenen belge"
    deger: "350.000"
kaynakIzi: "v1.WMq9U/XqqSrLGl1F.QYRxTa+12rfyDCpRzlw967gd4obL/gDL5YMVjg12puwi/JciQQF7zauBg2JJFiEiyKwUs5wevhhKloTNuVE7eHwaHdnNDYKeRiokL7BZLCWL5HO8EI5O0hRm1gjctV63Cje/HX7H2WN4XH0RNeAZE5mVmay+Dr/bavoD7w/vlfTwFenPZWQA2H0ShRb4aMU1YToaV/M5XcSh9mCQcWI="
kaynakAdlari:
  - ad: "The Decoder"
    url: "https://the-decoder.com/anthropic-says-the-key-to-agent-memory-is-knowing-what-to-forget-not-how-much-to-store/"
haberDegeri: 80
featured: false
breaking: false
draft: false
---

Anthropic, yapay zekâ ajanı Claude'un farklı oturumlar arasında bilgiyi nasıl koruduğunu inceleyen yeni araştırma sonuçlarını açıkladı. Yapılan testler, ajanın tüm bilgileri biriktirmek yerine sadece stratejik notlar almasının ve geçmiş verilerini sonradan gözden geçirerek hatalarını düzeltmesinin performans artışı sağladığını gösterdi.

Araştırmadaki Pokémon Red oyun testinde, eski Claude Sonnet 3.7 modeli her adımı kaydetmeye çalışarak 10.000 adımda 225 klasör içinde 413 dosya oluşturdu ve veri yoğunluğundan oyunu tamamlayamayarak sadece 1 rozet kazanabildi. Buna karşın Claude Fable 5 modeli yalnızca temel plan ve kuralları not ederek 4 rozet elde etti. Hukuki testlerde ise bellek dokümanlarını arama motoruyla birleştiren model, tek başına aramada %73 başarı gösterirken bellek desteğiyle %87 doğruluk oranına ulaştı.

Anthropic, hatalı notların elenmesi için "Dreaming" (Rüya Görme) adı verilen yöntemi öne çıkarıyor. Bu yöntemde yapay zekâ, insan beyninin uykuda deneyimleri işlemesine benzer şekilde, çalışma saatleri dışındaki molalarda geçmiş oturum kayıtlarını inceleyip çelişkili veya güncelliğini yitirmiş notları düzeltiyor. Şirket, Stainless şirketinden alınan 350.000 dahili belgeden bağlantılı bir wiki oluşturularak bu yöntemin başarısını sınadı.

Bununla birlikte şirket, işlem sırasında not almanın ajanın dikkatini dağıttığını, rüya görme sürecinin ek bilgi işlem maliyeti getirdiğini ve her oturuma çok fazla bellek yüklemenin bağlam pencerelerini doldurma riski taşıdığını vurguluyor. OpenAI ve Google DeepMind da benzer şekilde ajanlarının hafıza doğruluk oranlarını artırmak için "rüyaya yatma" ve katmanlı hafıza mimarilerinden yararlanıyor.
