---
lang: tr
title: "Baidu yüzlerce sayfalık belgeleri işleyen Unlimited OCR 2 modelini çıkardı"
description: "Baidu, yüzlerce sayfalık kitap ve raporları tek istekte işleyebilen yeni açık kaynaklı görsel-dil modeli Unlimited OCR 2'yi MIT lisansıyla yayımladı."
category: teknoloji
date: 2026-10-27T07:50:56.978Z
esId: "baidu-launches-unlimited-ocr-2-for-parsing-hundred-page-documents"
bolge: "Asya"
perspektif: "Bu yapay zekâ modeli, yüzlerce sayfalık devasa belgelerin ve raporların saniyeler içinde yapılandırılmış metne dönüştürülmesini sağlayarak bilgiye erişimi hızlandırıyor ve iş süreçlerini dönüştürüyor."
why_matters: "Yüzlerce sayfalık devasa belgelerin yapay zekâ ile hızlı ve doğru şekilde analiz edilmesi, araştırma ve iş süreçlerinde büyük bir verimlilik sağlıyor."
key_points:
  - "3,34 milyar parametreli açık kaynaklı model"
  - "MarathonDocBench testinde 77,1 puan"
  - "MIT lisansı ile GitHub üzerinde yayımlandı"
rakamlar:
  - etiket: "Parametre"
    deger: "3,34 milyar"
  - etiket: "Test puanı"
    deger: "77,1"
kaynakIzi: "v1.bH4VNVz0sLd+Cb3f.Rdfu+eWPe3oxyNYw8NYjQxAzAdHCXAXtm7mZuLv4ThHZiPNEBDfa7JR4/xoMEelm/mn2+LALWD5P1ZeRlW2+pCc9IV6hAMte1yfjfzbpGKOkkN95yzaB11G3BSl2gQe3u/FlFStOnxpE3g/Tg3a0/yS99F8X5+ipCM32x9/0cMvvkXfC4AY9MP98k/o="
featured: false
breaking: false
draft: false
---

Baidu, yüzlerce sayfalık belgeleri tek seferde işleyebilmek amacıyla geliştirdiği açık kaynaklı yeni yapay zekâ modeli Unlimited OCR 2'yi duyurdu. Model, kitaplar, resmi başvurular ve uzun raporlar gibi devasa dokümanları tek bir istekle metne, formüllere, tablolara ve figürlere dönüştürebiliyor. Sistem, sıralı sayfa görüntülerini yapılandırılmış metne çevirmek için tasarlanmış 3,34 milyar parametreli bir görsel-dil modeli olarak öne çıkıyor.

Modelin arkasındaki en büyük yenilik, uzun metinlerde işlem maliyetini ve bellek tüketimini sabit tutan SR-SWA adlı seyrek dikkat mekanizmasıdır. Tam dikkat maliyeti dizi uzunluğuyla karesel olarak artarken, bu yeni seyrek referans kayan pencere dikkati mekanizması metin-görsel dikkatini sabit bir çalışma referansı kümesine sıkıştırıyor. Bu sayede belge boyutu artsa bile bellek tüketimi ve işlem süresi kararlı kalıyor. Modelin ağırlıkları MIT lisansıyla GitHub üzerinden paylaşılmış durumda.

Teknik detaylara göre model, 3,34 milyar parametreye sahip ve 131.072 token uzunluğuna kadar destek sunuyor. Tek bir CUDA grafik kartı üzerinde BF16 formatında çalışabilen sistem için NVIDIA A800-80GB donanımı kullanıldı ve BF16 ağırlıkları yaklaşık 6,7 gigabayt yer kaplıyor. Model, Transformers ve SGLang ile hızlı testler ve sunumlar için çalıştırılabiliyor.

Baidu tarafından paylaşılan test sonuçlarına göre model, çok sayfalı belge analizlerinde yüksek başarı sergiliyor. Yüzlerce sayfalık MarathonDocBench testinde 77,1 puan alarak rakiplerini geride bırakan sistem; metin, formül, okuma sırası ve tablo çıkarma gibi alanlarda etkileyici sonuçlar veriyor. Başlık hiyerarşisi ise 48,2 puanla modelin en zayıf alt skoru olarak kayıtlara geçiyor.

Bu gelişme, yapay zekânın uzun dokümanları anlama kapasitesinde önemli bir eşiği aştığını gösteriyor. Araştırmacılar ve geliştiriciler modeli Hugging Face ve GitHub üzerinden inceleyebiliyor.
