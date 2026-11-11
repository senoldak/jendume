---
lang: tr
title: "Microsoft araştırmacıları yapay zekâ modellerine arka kapı yerleştiren Lazarus tekniğini geliştirdi"
description: "Microsoft araştırmacıları, büyük dil modellerinde ondan az uyku halindeki nöronun değiştirilmesiyle yapay zekâ ajanlarına gizli arka kapı eklenebileceğini gösterdi."
category: teknoloji
date: 2026-11-11T09:50:52.300Z
esId: "microsoft-researchers-develop-lazarus-technique-to-add-hidden-backdoors-to-ai-mo"
bolge: "Küresel"
perspektif: "Bu araştırma, yapay zekâ güvenlik testlerinin her zaman yeterli olmadığını ve model ağırlıklarının bütünlüğünün ne kadar kritik olduğunu gözler önüne seriyor."
why_matters: "Bu açık, yazılım güvenliğinin yalnızca kod dosyalarıyla sınırlı olmadığını, yapay zekâ model ağırlıklarının kökeninin ve bütünlüğünün de doğrulanması gerektiğini gösteriyor."
key_points:
  - "Ondan az uyku halindeki nöron değiştirilerek gizli arka kapı oluşturulabiliyor."
  - "Lazarus adı verilen teknik, modelin yeniden eğitilmesini gerektirmiyor."
  - "Yapay zekâ modelleri standart güvenlik testlerini başarıyla geçmeye devam edebiliyor."
rakamlar:
  - etiket: "Nöron sayısı"
    deger: "10'dan az"
  - etiket: "Eğitim örneği"
    deger: "yaklaşık 50"
kaynakIzi: "v1.58H9rG7QSVL4RW0l.ohfFCF+1REx9kNknRCkIwOsrDM7LgoNnJMYl0oxaK0c3yYIcm9QC8TjgQCDqh81rjZHEpVpQ4HTACh3GejMbTAnrg5et/4odvvBHbGmqAOv90/xpLFEgsJdTw6bwnNor6omTCKUWXRIhe+nvXjjWCiyXUUGuGis="
kaynakAdlari:
  - ad: "The Next Web"
    url: "https://thenextweb.com/news/microsoft-lazarus-ai-agent-backdoor-neurons"
haberDegeri: 92
featured: false
breaking: true
draft: false
---

Microsoft araştırmacıları tarafından keşfedilen yeni bir açık, büyük dil modellerindeki nadiren etkinleşen nöronların manipüle edilerek yapay zekâ ajanlarına gizli arka kapı yerleştirilebileceğini ortaya koydu. Lazarus adı verilen bu teknik, modelin yeniden eğitilmesini gerektirmiyor ve yalnızca yaklaşık elli örnekle eğitilen basit bir sınıflandırıcı kullanarak tetiklenen girdileri ayırt edebiliyor. Araştırmacılar, ondan az uyku halindeki nöronu yeniden programlayarak belirli bir tetikleyici ile karşılaşıldığında modelin kötü amaçlı komutlar yürütmesini sağlayabildiklerini gösterdi. Örneğin model, tarih değişene kadar bekleyip ardından saldırgan tarafından sağlanan kodu indirebiliyor. Bu açık, standart güvenlik değerlendirmelerini atlayabildiği için yapay zekâ güvenliğinde yeni bir risk alanı yaratıyor. Özellikle araçlara ve terminallere erişimi olan otonom ajanlar için sonuçlar oldukça ciddi olabilir. Saldırganlar, ele geçirdikleri geliştirme süreçleri veya depolama alanları üzerinden bu değişiklikleri yapabilir. Araştırma ekibi, Opus 4.5 modelini çalıştıran Claude Code aracının da bu tekniğin büyük bir kısmını bağımsız olarak keşfettiğini belirtti. Microsoft, kendi platformu için model kökeni denetimleri, taranmış konteynerler, güvenli yayımcı gereksinimleri ve yapay zekâ tabanlı ağırlık tarama araçları gibi çeşitli güvenlik önlemleri geliştiriyor. Uzmanlar ise kuruluşların model kaynaklarını kontrol etmesini, ağırlıkları orijinal versiyonlarla karşılaştırmasını ve ajanların erişim yetkilerini sınırlandırmasını tavsiye ediyor.
