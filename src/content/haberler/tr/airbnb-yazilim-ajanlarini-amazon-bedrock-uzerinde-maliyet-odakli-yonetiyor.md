---
lang: tr
title: "Airbnb yazılım ajanlarını Amazon Bedrock üzerinde maliyet odaklı yönetiyor"
description: "Airbnb, mühendislerinin kullandığı yapay zekâ kodlama ajanlarını optimize etmek için Amazon Bedrock üzerinde görev başına maliyet ölçüm sistemi kurdu."
category: teknoloji
date: 2026-11-19T07:50:52.701Z
esId: "airbnb-manages-coding-agents-on-amazon-bedrock-using-cost-per-task-metrics"
bolge: "Küresel"
perspektif: "Yapay zekâ kodlama ajanlarının şirketlerde yaygınlaşması, model maliyetleri ve performansın dengelenmesini kritik hale getiriyor. Bu yaklaşım, şirketlerin yapay zekâ altyapı bütçelerini verimli yönetmesini sağlıyor."
why_matters: "Yapay zekâ kodlama ajanlarının yaygınlaşması, şirketlerin model maliyetlerini ve performansını hassas bir şekilde yönetmesini zorunlu kılıyor."
key_points:
  - "Airbnb, binlerce mühendisin kullandığı AirChat aracında Amazon Bedrock kullanıyor."
  - "Şirket, modelleri test etmek için görev başına maliyet metni uyguluyor."
  - "Üretim performansları CloudWatch üzerinden izleniyor."
kaynakIzi: "v1.A2A8XtXK/30aOBf7.I4HFKHtm4yBj0zCwHEcUIeTebzQ2eunBxikHobuwF+B+tJFOLQNjCrjYAZutQvjQd8joeuedapeo10HANETCMbEH9BW159qgy/AelOTye3miUucbOJ9X6Bj33bqKEeXV+OdE3Yzg6r+rjSE7H70JeK+RQA0YkW8+6hE5tQ6YSojuyqTPOiVte62k4PZBulpy6ALnWZp7mZH1Udt/SUMafdNqFJUM+v1N6TLI1OgWilgUE3tz"
kaynaklar:
  - ad: "AWS Machine Learning Blog"
    url: "https://aws.amazon.com/blogs/machine-learning/how-airbnb-uses-cost-per-task-to-operate-coding-agents-on-amazon-bedrock/"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

Yazılım geliştirme süreçlerinde yapay zekâ ajanlarının kullanımı hızla yaygınlaşırken, model seçimleri ve maliyet yönetimi şirketler için öncelikli hale geliyor. Airbnb, binlerce mühendisin her hafta kullandığı dahili yapay zekâ aracı AirChat için Amazon Bedrock altyapısını tercih ettiğini duyurdu. Şirket, kısa süre içinde piyasaya sürülen yeni yapay zekâ modellerini sisteme entegre ederken karşılaştığı maliyet ve performans dalgalanmalarını yönetmek adına yeni bir yöntem geliştirdi.

Genel benchmark testleri her şirketin kendi iş yükünü tam olarak yansıtmadığı için Airbnb, modelleri kendi görev setleri üzerinden önceden test etmeye başladı. Şirket, bir yapay zekâ ajanının tek bir görevi tamamlayana kadar harcadığı tüm tokenlerin liste fiyatı üzerinden hesaplanan görev başına maliyet metriğini kullanıyor. Bu sayede her modelin hem başarı puanı hem de maliyeti net bir şekilde ölçülebiliyor.

Üretime alınan modellerin performansı Amazon CloudWatch üzerinden anlık olarak izleniyor. Gecikme süreleri, token tüketimleri ve kapasite sınırlamaları düzenli olarak takip edilerek sistemin verimliliği artırılıyor. Üretim verileri ile test sonuçları uyuşmadığında ise gerekli model güncellemeleri hızla yapılıyor.

Bu sistem, şirketlerin yapay zekâ maliyetlerini kontrol altında tutmasını ve en uygun modeli seçmesini kolaylaştırıyor. Yapay zekânın yazılım mühendisliğinde kalıcı hale gelmesiyle birlikte, bu tür operasyonel optimizasyon araçları sektörde standart haline geliyor.
