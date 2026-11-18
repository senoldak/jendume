---
lang: tr
title: "Anthropic, Claude Code'a Code Mode özelliğini ekledi"
description: "Anthropic, Claude Code aracına JavaScript kullanarak çoklu araç çağrılarını tek adımda zincirleme imkânı tanıyan deneysel Code Mode özelliğini getirdi."
category: teknoloji
date: 2026-11-18T07:51:00.288Z
esId: "anthropic-adds-code-mode-to-claude-code-for-javascript-tool-chaining"
bolge: "Küresel"
perspektif: "Bu yeni özellik, geliştiricilerin yapay zekâ ajanlarıyla çok adımlı kodlama görevlerinde daha az etkileşim kurmasını sağlayarak iş akışlarını hızlandırıyor."
why_matters: "Araç çağrılarının tek bir programda birleştirilmesi, karmaşık araştırma ve düzenleme görevlerinde işlem süresini kısaltarak geliştirici verimliliğini artırıyor."
key_points:
  - "Claude, JavaScript yazarak birden fazla araç çağrısını tek adımda zincirleyebiliyor."
  - "Özellik, Claude Code v2.1.323 ve sonraki sürümlerde deneysel olarak sunuluyor."
  - "Arka planda çalışan kodlar 2 saate kadar aktif kalabiliyor."
rakamlar:
  - etiket: "Sürüm"
    deger: "v2.1.323"
  - etiket: "Bekleme süresi"
    deger: "10 dakika"
  - etiket: "Arka plan süresi"
    deger: "2 saat"
kaynakIzi: "v1.auDW6hHAz0QDZPcX.rWhNDW8zLrhVNGjxqhrpmDpgXfGewn3CmPQj6lAZMcoEfem8SbraVONq8D4ep2O8RcIm0uz9GahXYRXTQA9Wn6p4kAUUfNFv/Wqyi8Vylz7N/P024th29bT18Pna+6XzHfFQG2xtQThvQxkIb8H1VxgF4M54T0eOjHIiCB2BlFr0kIa0xv2AZNOhBIDSIA=="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/17/anthropic-claude-code-code-mode-javascript-tool-calls/"
haberDegeri: 90
featured: false
breaking: false
draft: false
---

Anthropic, geliştiricilerin terminal üzerinden kod yazma süreçlerini dönüştüren yeni bir özelliği kullanıma sundu. Claude Code v2.1.323 sürümüyle birlikte gelen ve deneysel olarak sunulan Code Mode, yapay zekânın birden fazla araç çağrısını tek bir JavaScript programı içinde çalıştırmasına olanak tanıyor. Bu sayede sistem, her adımı tek tek okumak yerine işlemleri daha toplu bir şekilde yürütüyor.

Normal şartlarda yapay zekâ; dosya okuma veya düzenleme gibi komutları tekil isteklerle yapar ve sonraki adıma geçmeden önce her sonucu ayrı ayrı inceler. Yeni özellikle birlikte ise Claude, bir JavaScript kodu yazar ve bu kod oturum içinde çalıştırılır. Kod; eş zamanlı komut çalıştırma, sonuçları bir sonraki çağrıya aktarma ve yalnızca okunması gereken çıktıyı döndürme gibi avantajlar sunuyor.

Özelliği etkinleştirmek için kullanıcıların kabuk ortamında veya ayar dosyasında belirli bir değişkeni tanımlaması gerekiyor. İlk oturum açılışında sistem kullanıcıdan onay istiyor ve özellik devreye giriyor. Anthropic, bu yeniliğin özellikle birden fazla dosyada tekrarlanan değişiklikler veya filtrelenmesi gereken aramalar gibi çoklu araç çağrısı gerektiren görevlerde kullanılmasını öneriyor.

Sistem, izinler ve güvenlik açısından mevcut kurallara uyum sağlamayı sürdürüyor. Otomatik modda kodun tamamı bir sınıflandırıcı tarafından incelenirken, diğer modlarda geleneksel onay süreçleri geçerliliğini koruyor. Arka planda çalışan kodlar 2 saate kadar işlem yapabilirken, kullanıcının yanıt beklediği durumlarda süre 10 dakikayla sınırlı tutuluyor.

Yeni özellik şimdilik yalnızca terminal oturumlarında, Claude abonelikleri veya konsol hesapları üzerinden kullanılabiliyor. Amazon Bedrock, Google Cloud veya çeşitli SDK entegrasyonlarında ise henüz desteklenmiyor.
