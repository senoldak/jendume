---
lang: tr
title: "Amazon, SageMaker HyperPod Global Inference Gateway ile bölgeler arası yönlendirme başlattı"
description: "Amazon Web Services, farklı bölgelerdeki yapay zekâ kümelerini tek bir uç noktada buluşturan yeni bir yönlendirme ağ geçidi tanıttı."
category: teknoloji
date: 2026-11-21T03:50:51.800Z
esId: "amazon-launches-sagemaker-hyperpod-global-inference-gateway-for-cross-region-rou"
bolge: "Küresel"
perspektif: "Bu gelişme, büyük yapay zekâ modellerini çalıştıran şirketlerin donanım kapasitesini daha verimli kullanmasını sağlayarak operasyonel yükü azaltıyor."
why_matters: "Bu sistem, şirketlerin farklı bölgelerdeki GPU kapasitelerini tek bir uç nokta üzerinden yönetmesine imkân tanıyarak altyapı maliyetlerini ve yönetim karmaşıklığını düşürüyor."
key_points:
  - "Tek bir yönetilen uç nokta üzerinden bölgeler arası yönlendirme yapılıyor."
  - "Sistem kapasite, kuyruk derinliği ve hata sinyallerine göre otomatik yönlendirme sağlıyor."
  - "Bir küme arızalandığında trafik otomatik olarak diğer kümelere devrediliyor."
rakamlar:
  - etiket: "Bölge sayısı"
    deger: "13"
kaynakIzi: "v1.w09nnA1GGlkf8qau.TZpW13YR/+g1Mf8/SY+kxcWNjTOXbUHDePF95WmcuCn0LZuMhroDPPTv1j4lwfZOZBWQhl42zQqnVYJvMvu0ZJU6wYwKZCc+FNckmvfhF1Pk7v0zJmwT7vD4lNfPcq4F7hv/vKDLAxyYNdKasbYQU70GvznS1AP1ZhW+Pcw/yNvMnbWzi9hNdz4bkFwzgDtC22fyYBrFRsODfH5jZ2pOTzmISeEszYMhulXajmYNomNnS4sbjXXWlc1KNCdWP1d7U6AWWmorudQxgzMzrkn8p7v2Z+8Kcs1whs7KGO8S4k19C+BvjEueANsPgpDf/7v2QhP0rn/4RdLIipMjR9MnqR9pJ1+v+NuJr4AN53wxmWTysmMN2bmV0EhYcb4M0qMAi3tjuzcibnJaHnHin3PiEIz8Kc/w2zsaK2tPkIdQRTs1JA=="
kaynakAdlari:
  - ad: "Unite.AI"
    url: "https://www.unite.ai/aws-routes-hyperpod-inference-across-regions-from-one-endpoint/"
haberDegeri: 82
featured: false
breaking: false
draft: false
---

Amazon Web Services, yapay zekâ iş yüklerini optimize etmek amacıyla Amazon SageMaker HyperPod Global Inference Gateway sistemini 20 Kasım 2026 tarihinde duyurdu. Yeni servis, farklı AWS bölgelerinde veya aynı bölge içinde yer alan birden fazla yapay zekâ kümesini tek bir yönetilen uç nokta altında birleştiriyor. Büyük dil modellerinin yaygınlaşmasıyla birlikte donanım kapasitesini verimli yönetmek önem kazandı. Şirketler, iş yüklerini farklı kümelere dağıttıklarında yoğunluk anlarında bazı grafik işlemciler boşta kalırken diğer kuyruklar dolabiliyor. Yeni ağ geçidi, kapasite, kuyruk derinliği, bölge yakınlığı ve hata sinyallerini gerçek zamanlı değerlendirerek istekleri en uygun kümeye yönlendiriyor.

Sistem, bir kümenin devre dışı kalması durumunda trafiği otomatik olarak çalışan diğer kümelere aktarıyor. Bu sayede mühendislerin manuel yapılandırma yapmasına gerek kalmıyor ve kesintisiz hizmet sağlanıyor. Altyapı, AWS Identity and Access Management ve Signature Version 4 protokolleriyle güvence altına alınıyor. İstekler, bulut altyapısı üzerinden özel bağlantılar aracılığıyla taşınıyor ve ağ geçidi istemcilerin kimlik doğrulama süreçlerini denetliyor. Şirketler, küme ağ geçidi yapılandırmaları üzerinden kendi hesaplarında ağ yük dengeleyicileri oluşturabiliyor.

Gerçekleştirilen beta testlerinde Bagelcode gibi şirketler, çoklu bölge yedekliliğini ek bir yönlendirme katmanı kurmadan başarıyla test etti. Servis küresel çapta 13 farklı bölgede kullanıma sunuldu. Şirket, yönlendirme filosunu ve özel bağlantıları yönetirken kullanıcılar hangi kümelerin havuza dahil edileceğini belirliyor. Geliştiriciler, istekleri imzalayarak standart uç noktaya iletebiliyor ve sistem kapasite yönetimi ile hata toleransını otomatik olarak optimize ediyor.
