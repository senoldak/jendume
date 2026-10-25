---
lang: tr
title: "Microsoft, 1.024 yapay zekâ ajanını koordine eden Agensh'i açık kaynaklı hale getirdi"
description: "Microsoft Araştırma ekibi, merkezi bir yönetim birimi olmadan çalışan ve 1.024 adete kadar kodlama ajanını koordine edebilen Agensh aracını duyurdu."
category: teknoloji
date: 2026-10-25T05:50:59.331Z
esId: "microsoft-open-sources-agensh-to-coordinate-1-024-coding-agents-without-a-centra"
bolge: "Küresel"
perspektif: "Bu gelişme, yazılım geliştirme süreçlerinde çok sayıda yapay zekâ ajanının bir arada ve merkezi bir yöneticiye ihtiyaç duymadan ortak çalışabilmesini sağlayarak kod yazma verimliliğini ve ölçeklenebilirliğini kökten değiştiriyor."
why_matters: "Bu yapay zekâ gelişmesi, merkezi yönetici ihtiyacını ortadan kaldırarak binlerce kodlama ajanının ortak bir projede eş zamanlı ve verimli çalışmasının önünü açıyor."
key_points:
  - "Agensh, merkezi bir yönetici olmadan 1.024 ajanı koordine edebiliyor."
  - "128 ajan, 5 görevlik ProgramBench ortalamasını yüzde 19,31'den yüzde 28,78'e çıkardı."
  - "GPT-6.1-sol modeli, 32 ajanla pandoc testinde yüzde 79,59 başarı elde etti."
rakamlar:
  - etiket: "Maksimum ajan"
    deger: "1.024 ajan"
  - etiket: "Pandoc başarı oranı"
    deger: "%79,59"
  - etiket: "ProgramBench ortalaması"
    deger: "%28,78"
kaynakIzi: "v1.HDQqZHO8dNSf4V1b.czJpBve18Kv/UPobBZk5umdv+koO+k/eTVXMjYHYqKsIDX/N4zP7E7wQ72V9+nlqFJhPC5a0p9TMP21LnsjpHUWirPREccDoSxhznKJFNm+cSV6cBgdLZ/vRWCDbr6dTWZ1lsWyuPlL9zNjAXDPCxJMXnL8v1cTsEHUyjvEuj3k5fX/vfK1r1aU="
featured: false
breaking: true
draft: false
---

Microsoft Araştırma, çok sayıda kodlama ajanının bir arada çalışmasını sağlayan merkezi olmayan bir yapı olan Agensh'i açık kaynak kodlu olarak yayımladı. Geleneksel yapay zekâ sistemlerinde tüm görevleri planlayan ve atayan merkezi bir yönetim birimi bulunurken, Agensh bu yapıyı ortadan kaldırarak her bir ajanın kendi alt görevini seçmesini, bulgularını paylaşmasını ve ortak bir depoya kod eklemesini sağlıyor. Sistem, çalışanların birbirleriyle iletişim kurabilmesi için Gitea, Mattermost ve paylaşımlı bir bağlam panosu kullanıyor.

Araştırma ekibi, sistemi ProgramBench testleri üzerinden 1 ajandan başlayarak 1.024 ajana kadar ölçeklendirdi. Yapılan testlerde, daha fazla ajanın kullanılmasının en zorlu beş görevdeki başarı puanlarını artırdığı ve bu sonuçlara daha hızlı ulaşıldığı görüldü. Örneğin, GPT-5.6-sol modeliyle yapılan testlerde beş görevin ortalama başarı oranı 1 ajanda yüzde 19,31 iken, 128 ajanda yüzde 28,78'e yükseldi. Daha yeni bir model olan GPT-6.1-sol ise 32 ajanla pandoc görevinde yüzde 79,59 başarı oranına ulaştı.

Sistem ekibi, ajan sayısı arttıkça aralarında kendiliğinden yeni rollerin ve davranışların ortaya çıktığını gözlemledi. Sekiz ajanlı testlerde çalışanlar arayüzler üzerinde anlaşırken, 1.024 ajanlı testlerde bazı ajanların entegratör rolünü üstlendiği ve başarısız işleri kurtardığı tespit edildi. Bu rollerin hiçbiri koda önceden kodlanmamış olup tamamen doğal olarak gelişti.

Agensh, Linux işletim sistemi üzerinde Docker Compose ile çalıştırılabiliyor ve varsayılan olarak sekiz çalışanla işe başlıyor. MIT lisansıyla yayımlanan araç, geliştiricilerin kendi model API belirteçleri ve ProgramBench altyapısıyla sistemi kurmasına olanak tanıyor. Bu yeni yaklaşım, büyük ölçekli yazılım mühendisliği projelerinde yapay zekâ iş birliğinin sınırlarını genişletiyor.
