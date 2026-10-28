---
lang: tr
title: "UC Berkeley Sky Computing Lab, LEANN adlı açık kaynaklı vektör indeksini tanıttı"
description: "UC Berkeley araştırmacılarının geliştirdiği açık kaynaklı LEANN vektör indeksi, RAG sistemlerinde depolama ihtiyacını devasa ölçüde azaltarak kişisel verilerle dizüstü bilgisayarlarda arama yapılmasını sağlıyor."
category: teknoloji
date: 2026-10-28T03:52:26.757Z
esId: "uc-berkeley-sky-computing-lab-introduces-leann-open-source-vector-index"
bolge: "Küresel"
perspektif: "Bu açık kaynaklı gelişme, yapay zekâ uygulamalarının devasa veri merkezi maliyetlerini düşürerek bireysel cihazlarda çalışmasını kolaylaştırıyor ve yapay zekânın erişilebilirliğini artırıyor."
why_matters: "Bu açık kaynaklı gelişme, yapay zekâ uygulamalarının devasa veri merkezi maliyetlerini düşürerek bireysel cihazlarda çalışmasını kolaylaştırıyor ve yapay zekânın erişilebilirliğini artırıyor."
key_points:
  - "60 milyon parçalık Wikipedia indeksi 201 GB'tan 6 GB'a düştü"
  - "MLSys konferansında En İyi Araştırma Makalesi ödülünü kazandı"
  - "MIT lisansıyla açık kaynaklı olarak yayımlandı"
rakamlar:
  - etiket: "İndeks boyutu"
    deger: "6 GB"
  - etiket: "Veri parçası"
    deger: "60 milyon"
kaynakIzi: "v1.o5gaH1ls4MizqHXk./VmOGgwoG24YuFVnsrSjMstIHblZN3IYOQjO6Te6IUvZkWvfg9HokKgOr4q83LICrLrXVwlaXOhcpnngijnIx8DR8ZbdhBAFdtO+QxEs0+IKoamKfXu3u1xjeNZxc7fwhmyefqqZtEj+ev/Um6+kzN7ziMBeaw=="
featured: false
breaking: false
draft: false
---

UC Berkeley bünyesindeki Sky Computing Lab araştırmacıları, yapay zekâ ve bilgi getirme tabanlı üretim sistemlerinde depolama maliyetlerini kökten değiştiren açık kaynaklı LEANN vektör indeksini geliştirdi. Geleneksel vektör indeksleri, taranan verilerden çok daha büyük disk alanlarına ihtiyaç duyarken, bu yeni yaklaşım gömme işlemlerini önceden kaydetmek yerine sorgu anında yeniden hesaplıyor. Geliştirilen bu yöntem sayesinde, milyonlarca parçadan oluşan büyük veri setlerinin kapladığı alan gigabaytlar seviyesine indirilebiliyor.

Araştırma ekibinin paylaştığı test sonuçlarına göre, altmış milyon parçalık bir Wikipedia indeksi iki yüz bir gigabayttan altı gigabayta kadar düşürülebildi. Sistem, geleneksel yöntemlerle benzer doğruluk oranlarını korurken ham veri depolama alanının yüzde beşinden daha azını kullanan bir yapı sunuyor. Bu önemli araştırma, MLSys konferansında en iyi araştırma makalesi ödülüne layık görüldü ve dizüstü bilgisayarlarda kişisel veriler üzerinde semantik arama yapılmasına kapı araladı.

Sistemin temel çalışma mantığı, tam vektörleri saklamak yerine budanmış bir grafik ve sıkıştırılmış bir niceleme tablosu tutmaya dayanıyor. Sorgu anında yalnızca arama yolundaki düğümler yeniden gömülüyor. İki seviyeli arama ve dinamik gruplama gibi teknikler sayesinde performans optimize edilirken, sorgu süresi geleneksel yöntemlere kıyasla bir miktar artsa da elde edilen depolama tasarrufu bu maliyeti fazlasıyla telafi ediyor.

Açık kaynaklı olarak MIT lisansıyla yayımlanan araç, geliştiricilerin belgelerden tarayıcı geçmişine kadar birçok farklı veri kaynağını yerel makinelerinde verimli bir şekilde indekslemesine olanak tanıyor. Ollama, Hugging Face ve çeşitli yapay zekâ arayüzleriyle uyumlu çalışan sistem, Linux, macOS ve Windows platformlarında destekleniyor.
