---
lang: tr
title: "Factory yeni yazılım asistanı Droid 1.0 sürümünü duyurdu"
description: "Factory, programlı araç çağırma özelliğine sahip model bağımsız kodlama asistanı Droid 1.0 sürümünü yayınladı."
category: teknoloji
date: 2026-10-31T13:52:04.963Z
esId: "factory-releases-droid-1-0-coding-agent-harness-with-script-mode"
bolge: "Küresel"
perspektif: "Bu gelişme, yazılım geliştirme süreçlerinde yapay zekânın daha az maliyetle ve daha yüksek başarı oranıyla çalışmasını sağlayarak geliştiricilerin iş yükünü hafifletiyor."
why_matters: "Yazılım geliştirme süreçlerinde yapay zekâ maliyetlerini düşüren ve verimliliği artıran yeni nesil kodlama asistanlarını sunar."
key_points:
  - "Droid 1.0 programlı araç çağırma özelliğini varsayılan yapıyor"
  - "Terminal-Bench 4 testinde Claude Opus 5.5 ile yüzde 65,2 skor elde edildi"
  - "Temel komut istemi boyutu 13.055 tokene düştü"
rakamlar:
  - etiket: "Temel komut istemi"
    deger: "13.055 token"
  - etiket: "Terminal-Bench 4 skoru"
    deger: "%65,2"
  - etiket: "Ücretli planlar"
    deger: "20 dolar"
kaynakIzi: "v1.d6SVqGys4zyjMnC4.a9yZ+WwiNYdxfrhtSwo2EeG5Ox4fMOrAkVoNfzm178NyaqVQ9LQUYxA0thWQf8xm5AA8rBHWH/R3JBpiSKgzGHmt7X4IVg1nu3Y5JwfQquqI5E6MjJQcQ+tlqpoOteG/u0BghAXS6lkbsQqbUnn6K0ab7lF1nwrnsCKR"
featured: false
breaking: false
draft: false
---

Factory, yazılım geliştirme süreçlerini optimize etmek amacıyla geliştirdiği Droid asistanının bugüne kadarki en büyük güncellemesi olan Droid 1.0 sürümünü kullanıcılarla buluşturdu. Yeni sürümle birlikte programlı araç çağırma özelliği varsayılan olarak etkinleştirildi ve modelin kendi araçlarını çalıştıran bir program yazabilmesine olanak tanındı. Bu yenilik sayesinde tek bir model isteğiyle yüzlerce araç çağrısı gerçekleştirilebiliyor. Sistem, JavaScript kullanarak kum havuzu adı verilen güvenli bir alanda çalışan komut dosyaları oluşturuyor ve ham verilerin modelin bağlam penceresini gereksiz yere doldurmasını engelliyor.

Güncellemeyle birlikte temel komut istemi boyutu yüzde 37 oranında küçülerek 13.055 giriş tokenine geriledi. Sistem, macOS ve Windows masaüstü uygulaması, terminal arayüzü ve Node SDK aracılığıyla çalışabiliyor. Yapılan testlerde Droid 1.0, Terminal-Bench 4 testlerinde Claude Opus 5.5 modeliyle yüzde 65,2 başarı oranı elde etti. Bu süreçte önceden yüklenen araç tanımları azaltılırken, nadiren kullanılan araçlar ihtiyaç duyulduğunda yükleniyor.

Programlı araç çağırma yaklaşımı, modelin bağlam penceresini koruyarak ham dosyaların ve günlüklerin program içinde kalmasını sağlıyor. Bu yöntem, maliyetleri düşürürken işlem sürelerini de kısaltıyor. Örneğin Claude Opus 5.5 üzerinde Droid'in maliyetini yüzde 15 oranında düşüren bu sistem, geliştiricilere daha verimli bir çalışma ortamı sunuyor. Ayrıca sınırlı özerklik mekanizması sayesinde arka arkaya yapılan aynı türdeki çağrılar denetleniyor ve döngüler kontrol altında tutuluyor.

Güncelleme ayrıca uygulama gecikmesini önemli ölçüde azaltarak ilk boyama süresini 1.839 milisaniyeden 488 milisaniyeye indirdi. Ek oturumların sistem üzerindeki bellek yükü de optimize edilerek daha kararlı bir yapı elde edildi. Ücretli planları aylık 20 dolardan başlayan Droid 1.0, geliştiricilere esnek ve model bağımsız bir kodlama deneyimi vadediyor.
