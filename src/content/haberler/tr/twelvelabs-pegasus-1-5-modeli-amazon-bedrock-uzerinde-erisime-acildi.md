---
lang: tr
title: "TwelveLabs Pegasus 1.5 modeli Amazon Bedrock üzerinde erişime açıldı"
description: "TwelveLabs şirketinin geliştirdiği video dil modeli Pegasus 1.5, Amazon Bedrock platformunda kullanıcıların kullanımına sunuldu ve uzun videoların analizini kolaylaştırıyor."
category: teknoloji
date: 2026-10-19T17:50:57.903Z
bolge: "Küresel"
perspektif: "Bu gelişme, uzun uzun videolardan saniyeler içinde yapılandırılmış veri ve zaman damgası elde edilmesini sağlayarak video analitiği süreçlerini hızlandırıyor ve yapay zekâ tabanlı medya yönetimini daha verimli hale getiriyor."
why_matters: "Video verilerinin yapılandırılmasını ve aranmasını kolaylaştırarak yapay zekâ tabanlı medya analizini ve içerik arama süreçlerini daha verimli hale getiriyor."
key_points:
  - "İki saate kadar videoları tek istekte analiz etme kapasitesi"
  - "Ön indeksleme gerektirmeyen doğrudan Amazon S3 entegrasyonu"
  - "Zaman damgalı ve JSON formatında yapılandırılmış meta veri çıktısı"
rakamlar:
  - etiket: "İşleme kapasitesi"
    deger: "2 saat"
kaynakIzi: "v1.090kgB0Dhf/m+nL4.5XqjJBg0hGbMcHKOgPXFANChpfAVV0xSkRL59PYiiF/5kWIamk0Cm97rvxshFyiNYXOB7PkSudU2u76vvSdeTx24q+WtCjgTGrnLmVI8e2wcaSRyHqPz5cZKBAM5rM1yU1WcQ0JlIOrj7lhjb2p92E4pMtA0gyX1dF8XiTiEHmr+Q8gmPP61tStus1hZPhlHBESWuO9rXRZflJ4ylFXODcdRoPCWMqwNAZc="
featured: false
breaking: false
draft: false
---

TwelveLabs tarafından geliştirilen video dil modeli Pegasus 1.5, Amazon Bedrock platformunda erişime açıldı. Bu yeni model, uzun süreli videoları yapılandırılmış ve zaman damgası eklenmiş verilere dönüştürme yeteneğiyle öne çıkıyor. Kullanıcılar kendi iş akışlarına uygun anları tanımlayarak modelden JSON formatında eşleşen segmentler elde edebiliyor. Önceden indeksleme gerektirmeyen bu sistem, videoların doğrudan Amazon S3 üzerinden işlenmesine olanak tanıyor ve verilerin güvenli bir şekilde AWS sınırları içinde kalmasını sağlıyor.

Pegasus 1.5 önceki sürümlere kıyasla önemli yenilikler getiriyor. Model, iki saate kadar olan videoları tek bir istekte analiz edebiliyor. Bu artırılmış kapasite, kullanıcıların uzun kayıtları parçalara ayırmadan doğrudan işlemesine imkan tanıyor. Ayrıca sistem, metin komutlarının yanı sıra referans görsellerle çok modlu yönlendirme yapılmasına da izin veriyor. Böylece belirli nesnelerin, kişilerin veya logoların videolarda hangi dakikalarda geçtiği yüksek bir hassasiyetle tespit edilebiliyor.

Sistem, video düzenleme, spor karşılaşmaları, konuşmacı değişiklikleri veya marka görünümleri gibi alanlarda zamana dayalı meta veri üretimi gerçekleştiriyor. Kullanıcılar belirli segment tanımları göndererek modelin yalnızca aranan kriterlere uyan bölümleri getirmesini sağlayabiliyor. Bu yapı, downstream kodların yanıt doğrudan ayrıştırabilmesine olanak tanıyor.

Modelin sunduğu esnek entegrasyon imkanları sayesinde geliştiriciler, API uç noktaları üzerinden model çağrıları yapabiliyor. AWS ortamında çalışan ekipler, uygulama tabanlı maliyet takibi için özel çıkarım profilleri oluşturabiliyor. Böylece video verilerinin analizi manuel inceleme süreçlerine duyulan ihtiyacı ortadan kaldırarak otomatik ve yapılandırılmış bir yapıya kavuşuyor.
