---
lang: tr
title: "Meta Ohio veri merkezindeki Prometheus projesini 1 milyon GPU'ya taşıyor"
description: "Meta, New Albany, Ohio'daki Prometheus veri merkezini yaklaşık 1 milyon Nvidia GPU'ya ulaştırmayı hedefliyor."
category: teknoloji
date: 2026-10-20T21:50:54.756Z
bolge: "ABD"
perspektif: "Bu devasa yapay zekâ altyapı yatırımı, yeni nesil yapay zekâ modellerinin eğitimi için gereken devasa bilgi işlem gücünü, donanım güvenilirliğini ve enerji ihtiyacını gözler önüne seriyor."
why_matters: "Bu devasa yapay zekâ altyapı yatırımı, yeni nesil yapay zekâ modellerinin eğitimi için gereken devasa bilgi işlem gücünü, donanım güvenilirliğini ve enerji ihtiyacını gözler önüne seriyor."
key_points:
  - "Prometheus supercluster yaklaşık 1 milyon GPU'ya ulaşacak."
  - "Muse modelleri bu altyapıda eğitildi."
  - "Kesintilerle mücadele için Dynamo Dimmer yazılımı kullanılıyor."
rakamlar:
  - etiket: "GPU Hedefi"
    deger: "1 milyon"
  - etiket: "Ön Eğitim Verimliliği"
    deger: "%85"
  - etiket: "Pekiştirmeli Öğrenme"
    deger: "%90"
  - etiket: "Güç Dalgalanması"
    deger: "%40"
kaynakIzi: "v1.jafTbxCeqKGAO4SX.xuMWVfFxOAYKPpDSt3lOGEH/ReW/FxukOvO8Doflsh6PCXzkEOPkpCactv2Eyc2yD+5Lmlngz+2ucIgJuQiPXWCKkayOCn5Rzkv9mbtZsvgJXrASSVD+c56SxzU08WlrsLPKPrNzp5INPx9Q6tmU9iul4UBwgViCz+XZ5g=="
featured: false
breaking: true
draft: false
---

Meta, New Albany, Ohio'da yer alan Prometheus veri merkezini büyütme planlarının detaylarını paylaştı. Merkez halihazırda yüz binlerce Nvidia GPU çalıştırırken, şirket bu sayıyı yaklaşık 1 milyona çıkarmayı hedefliyor. Gigawatt ölçeğindeki kümelenmenin ilk aşaması tamamlandı ve Meta bu altyapıyı Muse modellerini eğitmek için kullandı. Eski dönemde web trafiği barındıran bu alan, zaman içinde modern bir tesise dönüştürüldü.

Sistem, her biri tek bir hızlandırıcı gibi çalışan 72 GPU'lu raflar etrafında kurulmuş platformları çalıştırıyor. Catalina platformu GB200 NVL72, Clemente ise daha yeni GB300 NVL72 modellerini kullanıyor. San Miguel adındaki üçüncü bir platform ise Nvidia'nın Vera Rubin raflarını sisteme dahil edecek. GPU'lar geleneksel veri merkezlerinde, yapay zekâ için optimize edilmiş binalarda ve hızlı kurulum yapılabilen yapılarda yer alıyor ve milerce fiber kabloyla birbirine bağlanıyor.

Bu ölçekteki sistemlerde arızalar büyük bir zorluk teşkil ediyor. İlk aşamada kesintiler her 8 bin GPU için günde yaklaşık bin olaya ulaşırken, bir yıllık mühendislik çalışması bu oranı önemli ölçüde azalttı. En büyük erken sorun 600 binin üzerindeki NVLink bağlantısında sinyal kalitesiydi. Bellek hataları da GB300 rafları büyütüldükçe daha büyük bir sorun haline geldi. Muse Wonder eğitimi sırasında küme, ön eğitim süresinin yüzde 85'inden fazlasını, pekiştirmeli öğrenmede ise yüzde 90'ından fazlasını verimli tutmayı başardı.

Sistemin güç tüketimi dalgalanmalarını yönetmek için Meta, Dynamo Dimmer adı verilen yazılımlar ve batarya destek sistemleri kullanıyor. On binlerce GPU hesaplama yaparken güç çekişi yüzde 30 ila yüzde 40 arasında dalgalanabiliyor. Şirket, kullandığı enerjinin tam maliyetini ödediğini ve yeni temiz enerji yatırımlarıyla eşitlediğini belirtiyor. Meta, Prometheus'tan edindiği tecrübeleri Richland Parish, Louisiana'daki Hyperion adlı bir sonraki supercluster projesine aktarıyor.
