---
lang: tr
title: "Nous Research Alibaba modelini Batılı değerlerle yeniden eğitti"
description: "Nous Research, Alibaba'nın Qwen modelini temel alarak Batılı değerleri güçlendirmeyi amaçlayan Arete-27B modelini duyurdu."
category: yapay-zeka
date: 2026-11-09T15:50:50.985Z
esId: "nous-research-retrains-alibaba-model-with-western-values"
bolge: "Küresel"
perspektif: "Bu gelişme, açık ağırlıklı yapay zekâ modellerinin görece az ek veriyle farklı değer sistemlerine göre yeniden şekillendirilebileceğini gösteriyor."
why_matters: "Açık ağırlıklı yapay zekâ modellerinin sınırlı ek eğitimle farklı değer sistemlerine uyarlanabileceğini ve ideolojik eğilimlerin değiştirilebileceğini gösteriyor."
key_points:
  - "Arete-27B modeli 52,8 milyon tokenlık ek eğitimle geliştirildi."
  - "Resmi söylemi benimseyen yanıt oranı yüzde 22'den yüzde 0,9'a düştü."
  - "Model ağırlıkları ve eğitim verileri Hugging Face üzerinden yayınlandı."
rakamlar:
  - etiket: "Parametre"
    deger: "27 milyar"
  - etiket: "Ek eğitim verisi"
    deger: "52,8 milyon token"
  - etiket: "Eğitim adımı"
    deger: "1.202 adım"
  - etiket: "Resmi söylem oranı"
    deger: "%0,9"
kaynakIzi: "v1.k5cnsyxZGI6lByyJ.4x/VCOakVeQBZnETzyXc/0+iFQcKL4LfmTXCUUGg2Euojrho3fmoycOWaa6CBpkfgtJgswHkHTeNw1xHuMJB4LdFRTZVe+q96XGUc5QYUSZdIVYieO8YW8Um1KhhBDTQeSzgmgtaVl/HyyKKqYqF6ZhDNLcePfsfBItBB84vudSacvLASViHq6ujlbNSeDhsRHsfT/V5dBmSPonqUQprrF5p4MhSD34WY0MhyuSdQA=="
kaynakAdlari:
  - ad: "Webrazzi"
    url: "https://webrazzi.com/2026/11/09/nous-research-un-batili-degerlerle-yeniden-egittigi-cin-merkezli-qwen-modeli-arete-27b/"
haberDegeri: 90
featured: false
breaking: false
draft: false
---

Açık kaynak yapay zekâ modelleri üzerinde çalışan Nous Research, Alibaba tarafından geliştirilen Qwen3.8-27B modelinin elden geçirilmiş bir versiyonu olan Arete-27B'yi tanıttı. Kurum, Arete-27B'yi Çin menşeli bir yapay zekâ modelinde Batılı değerleri öne çıkarmak amacıyla oluşturduğunu ifade ediyor. Yirmi yedi milyar parametreli yapıyı temel alan Arete-27B için sıfırdan yeni bir temel yapı kurulmadı. Ekip, var olan model üstünde yaklaşık 52,8 milyon tokenlık ek bir öğrenme süreci işletmeyi tercih etti. Veri seti iki kez baştan sona ele alınarak işlem toplam 1.202 adımda bitirildi.

Çalışma sırasında pekiştirmeli öğrenme veya tercih optimizasyonu teknikleri kullanılmadı. Modelin tüm ağırlıkları yeniden ele alınırken metin tabanlı veriler tercih edildiği için görsel kodlayıcı donduruldu. Nous Research, modeldeki zihniyet değişimini görmek amacıyla ifade özgürlüğü, devlet ideolojisi ve serbest piyasa gibi başlıkların yer aldığı 803 soruluk bir test seti hazırladı. Yapılan ölçümlere göre Qwen3.8-27B modelinin Çin yönetiminin resmî yaklaşımını kendi görüşü gibi benimseme oranı yüzde 22 iken, Arete-27B modelinde bu oran yüzde 0,9 seviyesine geriledi.

Politik konulardaki tutumu değiştiren bu ek sürecin modelin genel yeteneklerini zayıflatıp zayıflatmadığı da sınandı. Kurumun iç testlerinden olan Hermes Bench ölçümünde temel model yüzde 65,77 alırken Arete-27B yüzde 65,60 oranında kaldı. Nous Research, aradaki küçük farkın ölçüm sapması olarak değerlendirilebileceğini aktarıyor. Öte yandan, yapay zekâ ajanlarının becerilerini sınayan Terminal Bench testinde Arete-27B yüzde 70 başarı gösterdi.

Eğitim sürecinde öğretmen model olarak Inkling tercih edildi. Şirket, ilgili kategoriler kapsamında yaklaşık 20 bin farklı istem üreterek öğretmen modelin çıktılarından yeni bir veri tabanı elde etti. Ortaya çıkan nihai veri tabanı yaklaşık 28 bin örnek barındırıyor. Nous Research, modelin ağırlıklarını ve çalışma verilerini Hugging Face platformu üzerinden paylaştı.
