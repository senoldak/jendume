---
lang: tr
title: "Google yapay zekâ işlemleri için ML Drift adlı açık kaynaklı motoru duyurdu"
description: "Google, farklı grafik işlemciler üzerinde yapay zekâ ve makine öğrenimi modellerini çalıştırmayı hızlandıran ML Drift motorunu açık kaynak olarak yayımladı."
category: teknoloji
date: 2026-10-25T17:50:59.053Z
esId: "google-launches-ml-drift-open-source-gpu-compute-engine-for-ai-workloads"
bolge: "Küresel"
perspektif: "Bu gelişme, geliştiricilerin farklı cihazlarda yapay zekâ modellerini çok daha hızlı ve verimli çalıştırmasını sağlayarak yapay zekâ uygulamalarının yaygınlaşmasını hızlandırıyor."
why_matters: "Farklı donanımlarda yapay zekâ performansını artıran bu motor, geliştiricilerin uç cihazlarda daha karmaşık yapay zekâ modellerini verimli şekilde çalıştırmasının önünü açıyor."
key_points:
  - "ML Drift, LiteRT'ye güç veren çekirdek GPU hızlandırma motoru olarak yayımlandı."
  - "Gemma modelleriyle yapılan testlerde diğer çerçevelere göre yüzde 12 daha düşük bellek yükü rapor edildi."
  - "YouTube Shorts uygulamasında kare gecikmesinde yüzde 40'a varan azalma sağlandı."
rakamlar:
  - etiket: "Bellek yükü azalması"
    deger: "%12"
  - etiket: "Gecikme azalması"
    deger: "%40"
kaynakIzi: "v1.bIXSt3NEh9zx/udj.xUQOOp6xt3qfDo8KdJ1U8lc0L7zS9hDPxy9o5rwDzdxgtRIgLJC8w5cYqr/H70+wX0AgHMRpSS2ZbZVc1IYIbXESUAhJcDUIKYBU19GiJFpoOdnnJnooOpGI66QsH/TP8zm7OgUqYSb6g0eyrNJn0tw62CoiYctjFYhGOVwkwweqgLiRN39xqqQBA55rp/5PZO36kR7OPb/MxBwXVFxCwWaL5PUFTy6f1O5Q9xZWkzQrJE/nN+fEdBkRIGb8z9uwZ9Y="
featured: false
breaking: false
draft: false
---

Google, cihaz üstü yapay zekâ ve makine öğrenimi çıkarımı için tasarlanan açık kaynaklı ve platformlar arası bir grafik işlemci hesaplama motoru olan ML Drift'i duyurdu. Apache 2.0 lisansıyla yayımlanan bu motor, farklı donanım ve düşük seviyeli programlama arayüzlerinin karmaşıklığını ortadan kaldırarak OpenGL ES, OpenCL, Metal ve WebGPU desteği sunuyor. ML Drift, LiteRT'ye güç veren çekirdek hızlandırma motoru olarak görev yapıyor ve geliştiricilerin bilgisayarla görü, ses işleme ve üretken yapay zekâ uygulamaları için özel altyapılar kurmasını sağlıyor.

Geliştiriciler, uç cihazlar için uygulama geliştirirken çok çeşitli donanım mimarileri ve sürücü sürümleriyle karşılaşıyor. ML Drift, bu çeşitlilik karşısında taşınabilirlik ve performans için yeni bir temel oluşturmayı hedefliyor. Geleneksel TensorFlow Lite grafik işlemci temsilcisine kıyasla önemli teknik iyileştirmeler sunan motor; tensor sanallaştırma, genişletilebilir özel işlemler ve beş boyutlu tensor desteği gibi özellikler barındırıyor. Ayrıca Arm, Intel ve Qualcomm grafik işlemcileri için donanıma özel optimizasyonlar içeriyor.

Motor, Windows ve Linux'ta WebGPU tabanlı Dawn aracılığıyla masaüstü desteğini genişletirken macOS'te Metal arka uç desteğini koruyor. Google, Gemma modelleriyle yaptığı testlerde diğer çerçevelere kıyasla yüzde 12 daha düşük bellek yükü rapor etti. Şirket, motorun Chrome, YouTube Shorts, Google Photos ve Google Meet gibi uygulamalar aracılığıyla halihazırda milyonlarca cihazda çalıştığını vurguladı.

YouTube Shorts uygulamasında segmentasyon tabanlı efektlerde ortalama kare gecikmesinde yüzde 40'a varan azalma sağlanırken Google Photos'ta hesaplamalı fotoğrafçılık boru hatları iki saniyeye kadar hızlanıyor. Adobe Lightroom ve Photoshop ile Snapchat gibi platformlar da bu yenilikten performans artışı sağlıyor. Google, bu duyurunun ardından eski TensorFlow Lite grafik işlemci temsilcisini güncellemeyi durduracağını açıkladı.
