---
lang: tr
title: "Google PageBreak yapay zekâ güvenlik ajanı 500'den fazla açık buldu"
description: "Google, Gemini modelleriyle çalışan ve web uygulamalarında 500'den fazla XSS açığı tespit eden PageBreak güvenlik ajanını açıkladı."
category: teknoloji
date: 2026-10-31T07:51:56.336Z
esId: "google-pagebreak-ai-security-agent-discovers-over-500-xss-bugs"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ destekli güvenlik araçlarının hatalı alarm oranını sıfıra yakın bir seviyeye indirerek yazılım güvenliğini nasıl daha güvenilir kıldığını gösteriyor."
why_matters: "Bu gelişme, yapay zekâ destekli güvenlik araçlarının hatalı alarm oranını sıfıra yakın bir seviyeye indirerek yazılım güvenliğini nasıl daha güvenilir kıldığını gösteriyor."
key_points:
  - "PageBreak, ocak ayından bu yana 500'den fazla XSS açığı buldu."
  - "Sistem incelemeler için Gemini modellerini kullanıyor."
  - "Doğrulamalar çalışan ortamda gerçek istismarlarla test ediliyor."
rakamlar:
  - etiket: "XSS açığı"
    deger: "500'den fazla"
kaynakIzi: "v1.Vmbz+04VtggwQ+fV.EGdcEtnSW0jXCa1foSdRlCpkQSEGisXwZ/z1a1OhtDxcQjM2ntPepqVsmK0FbLxzuebwxbwuJi8c5eNlw1bUajQWFyqTc6ViIE5SNSBula5IOyzcGpQFj3KO4l73hT8rTQIvE8bVnEqCTZYlp2vrpn/ohrSIWYA20bPRjXVtUN6CiVLGKEqcnJeNy2KsyGBm2TE/aCNW53u0TlUwLciDjTvagC3sCF3BZu/Y5ci2zSEZnKfy0vG1fQEcu51oczC9IpXvyR12NWgD3loR+lMY1UfF"
featured: false
breaking: false
draft: false
---

Google, yapay zekâ destekli güvenlik ajanı PageBreak hakkında bir makale yayımladı. Sistem, ocak ayında tam operasyona girmesinden bu yana web uygulamalarında 500'den fazla XSS açığı ortaya çıkardı. Google PageBreak, potansiyel açıkları özerk bir şekilde incelemek için Gemini modellerini kullanıyor ancak bulguları yalnızca deterministik doğrulayıcılar çalışan bir uygulama üzerinde istismarı başarıyla yeniden ürettiğinde rapor ediyor.

Sistem, her açık hipotezini çalışan bir ortamda gerçek bir istismarla test ediyor. Google bilgi güvenliği mühendisi Michał Bentkowski, erken aşamada deterministik doğrulamaya öncelik vermeye karar verdiklerini belirtiyor. Kod kalıplarına dayanarak hata varsaymak yerine sistem, potansiyel kusurları çalışan ortamlarda doğrulayarak sıfıra yakın bir yanlış pozitif oranına ulaşıyor ve ürün ekiplerinin aşırı yüklenmesini önlüyor.

Ayrıca Google, daha derin taramalara ilham vermek için deterministik olmayan bulguları dahili olarak saklıyor. Michał Bentkowski, doğrulayıcıların tüm açık türlerini kapsama yeteneklerinden şu an için yoksun olduğunu ancak bunun gelecekteki geliştirmelere rehberlik ettiğini ifade ediyor. Google kıdemli baş bilgi güvenliği mühendisi Lukas Weichselbaum ise yapay zekâ tarafından oluşturulan birçok hata raporunun inandırıcı görünebildiğini ancak yanlış çıkabildiğini vurguluyor.

PageBreak, Google'ın monorepo uçtan uca kod görünürlüğü ve canlı HTTP trafiğini kaynak koduna bağlayan güvenlik sinyalleri gibi mühendislik ortamından faydalanıyor. Google, ürün ekibi katılımını yapay zekâ tarafından oluşturulan düzeltmeleri doğrulamakla sınırlamak amacıyla PageBreak'i CodeMender gibi diğer ajan tabanlı güvenlik girişimleriyle entegre ediyor.
