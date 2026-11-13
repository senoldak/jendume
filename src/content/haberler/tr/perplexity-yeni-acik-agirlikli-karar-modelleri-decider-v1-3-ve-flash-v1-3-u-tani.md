---
lang: tr
title: "Perplexity yeni açık ağırlıklı karar modelleri Decider v1.3 ve Flash v1.3'ü tanıttı"
description: "Perplexity, metin üretmek yerine olasılık döndüren yeni açık ağırlıklı karar modelleri Decider v1.3 ve Flash v1.3 sürümlerini yayımladı."
category: yapay-zeka
date: 2026-11-13T17:50:54.274Z
esId: "perplexity-introduces-open-weight-decision-models-decider-v1-3-and-flash-v1-3"
bolge: "Küresel"
perspektif: "Bu karar modelleri, yapay zekânın klasik metin üretimi yerine doğrudan olasılık ve sınıflandırma yapmasını sağlayarak veri işleme süreçlerini daha güvenilir ve hızlı hâle getiriyor."
why_matters: "Bu karar modelleri, yapay zekânın klasik metin üretimi yerine doğrudan olasılık ve sınıflandırma yapmasını sağlayarak veri işleme süreçlerini daha güvenilir ve hızlı hâle getiriyor."
key_points:
  - "Decider v1.3, 63 sorgu sınıflandırma görevinde %91,6 ortalama doğruluk elde etti."
  - "Modeller Apache 2.0 lisansıyla Hugging Face üzerinde yayımlandı."
  - "API girdi fiyatlandırması 1 milyon token başına v1.3 için 0,02 dolar, Flash için 0,01 dolar."
rakamlar:
  - etiket: "Doğruluk oranı"
    deger: "%91,6"
  - etiket: "API fiyatı v1.3"
    deger: "0,02 dolar"
  - etiket: "API fiyatı Flash"
    deger: "0,01 dolar"
  - etiket: "GPU gereksinimi v1.3"
    deger: "49 GiB"
kaynakIzi: "v1.KcF5GUHrZPJ8zLIj.zdcdBhXV/p7DMbQv1vT+EA/7W/bwXSmvVKjLHv6gwQBFp8mtca3FDFQQYMKu7crpbn0M5tKgmvxz6fiCYbr2E7EJZ/eIGYrAZNHvPoG9oILieZOvDleqCve+OHlA4zRedcarPk7mgCsMV9PnCtEACGil8yJV/fxL/j5bmDT6d8SEz4D0xAEPGJ8fNmKaub11v1E5"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/13/perplexity-decider-v1-3-open-weight-decision-models-locate/"
haberDegeri: 78
featured: false
breaking: false
draft: false
---

Perplexity, yapay zekâ dünyasında metin üretmek yerine olasılık döndüren yeni karar modelleri Decider v1.3 ve Flash v1.3 sürümlerini duyurdu. Apache 2.0 lisansıyla Hugging Face üzerinden paylaşılan modeller, metin veya görsel girdiler üzerinde evet/hayır, çoktan seçmeli ve puanlama sorularını yanıtlıyor. Yeni sürümle birlikte gelen Locate özelliği ise belirli tür veya talimatlara göre tam metin kesitlerini çıkarabiliyor.

Sistem, üretken bir büyük dil modelini sınıflandırıcıya dönüştürerek çalışıyor. Model, temel modelin dil modeli başlığından türetilen bir yapı kullanılarak seçenek olasılıklarını hesaplıyor. v1.3 sürümünde sorular arasındaki dikkat mekanizması değiştirilerek her sorunun yalnızca durumu ve kendisini görmesi sağlanıyor. Eğitim süreci ise yüzlerce kamu veri setinde tam ince ayar, LoRA uzmanlaşma ve görsel adaptör aşamalarından oluşuyor.

Perplexity'nin paylaştığı öz değerlendirme sonuçlarına göre model, 63 sorgu sınıflandırma görevinde %91,6 ortalama doğruluk oranı elde etti. Çok dilli görevlerde ise 19 testte %88,16 başarı sağladı. Donanım tarafında v1.3 modeli yaklaşık 49 GiB BF16 ağırlık barındırabilen bir CUDA GPU gerektirirken, Flash sürümü yaklaşık 8,5 GiB gerektiriyor.

Geliştiriciler bu modelleri Perplexity Decisions API üzerinden veya yerel olarak kullanabiliyor. API fiyatlandırması 1 milyon girdi tokeni başına v1.3 için 0,02 dolar, Flash için ise 0,01 dolar olarak belirlenirken çıktı tokenleri için ücret alınmıyor. Bu gelişmeler, yapay zekâ modellerinin sınıflandırma ve karar verme görevlerindeki verimliliğini artırmayı hedefliyor.
