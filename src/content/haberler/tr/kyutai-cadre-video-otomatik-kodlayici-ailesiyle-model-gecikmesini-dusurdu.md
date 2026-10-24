---
lang: tr
title: "Kyutai, CADRE video otomatik kodlayıcı ailesiyle model gecikmesini düşürdü"
description: "Kyutai, interaktif dünya modelleri için geliştirdiği CADRE adlı açık kaynaklı video otomatik kodlayıcı ailesini duyurdu."
category: yapay-zeka
date: 2026-10-24T03:50:57.892Z
esId: "kyutai-introduces-cadre-video-autoencoders-to-reduce-model-lag"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zeka modellerinin insan tepki süresinin altına inmesini sağlayarak interaktif uygulamalarda daha akıcı ve gerçekçi bir deneyim sunuyor."
why_matters: "CADRE, yapay zeka modellerinin gecikme süresini insan algı sınırının altına çekerek robotik ve simülasyon alanlarında gerçek zamanlı etkileşimi mümkün kılıyor."
key_points:
  - "Dünya modellerinde gecikme 230 milisaniyenin altına indirildi"
  - "Sistem tek bir H100 üzerinde saniyede 20 kare hızla çalışıyor"
  - "Kodlar MIT lisansıyla, ağırlıklar ise CC BY-NC 4.0 ile yayımlandı"
rakamlar:
  - etiket: "Tepki süresi"
    deger: "230 ms"
  - etiket: "Kare hızı"
    deger: "20 fps"
  - etiket: "Parametre sayısı"
    deger: "1,2 milyar"
kaynakIzi: "v1.l5LyjvyOrqMVxumj.XvO2TagSmXhQEZ0FWFBQzZqbrKuyLtZqktNa4/bQzydP5/HQ03oCADtK3v6kA3kWhBYDa1KWFLfonASEMRiReXUigD2Xsv/1NeC9zuiOplnQbfLqy0seOapAEA8jCS/2SwBM4Ge02J2wsB3BXs+8kq9TZ7Qq0H02SvtXppZw7EVLgOsA5krBEoQGlz36+htHSg=="
featured: false
breaking: false
draft: false
---

Kyutai araştırma ekibi, interaktif dünya modellerinde yaşanan gecikme sorununu çözmek amacıyla CADRE adlı yeni video otomatik kodlayıcı ailesini tanıttı. Geliştirilen bu sistem, video tabanlı yapay zeka modellerindeki eylem gecikmesini 230 milisaniyenin altına indirerek insan tepki süresiyle uyumlu hale getiriyor. Geleneksel modeller metin-video dönüştürücülerden ödünç aldıkları kodlayıcılar nedeniyle yüksek gecikmelere yol açarken, CADRE tek bir H100 grafik işlemcisi üzerinde saniyede 20 kare hızla çalışabiliyor.

Sistem, yedi farklı otomatik kodlayıcı modelinden ve 1,2 milyar parametreli bir dünya modelinden oluşuyor. Otomatik kodlayıcılar, interaktif dünya modellerinin sıkıştırma oranını ve işlem maliyetini belirlerken, CADRE mimarisi zamansal ve uzaysal sıkıştırmayı optimize ediyor. Eğitilen modeller robotik manipülasyon, insan manipülasyonu, sürüş ve iç mekan navigasyonu gibi farklı ortamlarda test edildi.

Eğitim sürecinde yirmi üç halka açık video kaynağı kullanıldı ve toplamda yaklaşık yetmiş altı bin saatlik veri işlendi. Yapılan değerlendirmelerde CADRE, özellikle hareketli kameralar ve sürüş simülasyonlarında rakiplerine kıyasla daha düşük hareket bozulması ve yüksek performans sergiledi. Örnek vermek gerekirse sürüş testlerinde CADRE, tek adımda bir yüz altmış iki virgül altı puanlık sürüş FVD skoru elde etti.

Bununla birlikte sistemin bazı eksik yönleri de bulunuyor. Robotik manipülasyon görevlerinde bazı rakip modeller daha iyi sonuçlar verebiliyor. Kodlar MIT lisansıyla paylaşılırken, ağırlıklar ticari olmayan kullanım için CC BY-NC 4.0 lisansıyla sunuldu ve araştırmacılar projeye yönelik bir canlı demo da hazırladı.
