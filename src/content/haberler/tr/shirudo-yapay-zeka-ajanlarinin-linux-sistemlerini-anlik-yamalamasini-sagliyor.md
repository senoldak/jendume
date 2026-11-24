---
lang: tr
title: "Shirudo, yapay zekâ ajanlarının Linux sistemlerini anlık yamalamasını sağlıyor"
description: "OpenAI ve Cisco, yapay zekâ ajanlarının sistem kesintisi olmadan güvenlik açıkları için kalkanlar oluşturmasına olanak tanıyan açık kaynaklı Shirudo aracını duyurdu."
category: teknoloji
date: 2026-11-24T19:50:52.484Z
esId: "shirudo-enables-ai-agents-to-patch-linux-systems-in-real-time"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ ajanlarının sadece metin üretmekle kalmayıp, işletim sistemi seviyesinde güvenlik mühendisliği yapabildiğini ve sistemleri kendi kendine savunabilir hale getirdiğini gösteriyor."
why_matters: "Sistemleri yeniden başlatmadan anlık güvenlik yamaları uygulanabilmesi, kritik altyapıların kesintisiz çalışmasını sağlarken yapay zekânın otonom güvenlik mühendisi rolünü güçlendiriyor."
key_points:
  - "Yapay zekâ ajanları sistemleri durdurmadan güvenlik kalkanları oluşturuyor"
  - "eBPF teknolojisi ile işletim sistemi seviyesinde anlık koruma sağlanıyor"
  - "TPM 2.0 ile ajanların yazdığı kodlar donanım seviyesinde doğrulanıyor"
rakamlar:
  - etiket: "Güvenlik açığı puanı"
    deger: "9.2"
  - etiket: "TPM sürümü"
    deger: "2.0"
  - etiket: "Satın alma yılı"
    deger: "2024"
kaynakIzi: "v1.wOn9kxbWHUHohUEN.ownVi/oEIxca+BvcOVuR5CkaIfvgEYIHZkl4P/gVI1grxagHVbdp8tA9A4LkEiaC7pJss1e04vtcDvtN81lNSFx+AsaSPZnBpL9J5b215B82KmfVUQOmNNnSG9KqDg8O4QmaSLWcxZPrh0ErM9vMyMU25+uY1FpT19d3btJjpksJIeF1m2uXSvijgpYD3WaDnefHQfLoVLvq2t5HsptxvJ95/Knp0iTZIwmvjl18XWj7e+3TsgBqHssXbSec/DNhH+Menic8p2dFajowYhQKppjcF26m68++kwtfTci4Ep5x"
kaynakAdlari:
  - ad: "TechInside"
    url: "https://www.techinside.com/shirudo-linux-guvenlik-araci-openai-cisco"
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/24/openai-cisco-shirudo-ebpf-linux-runtime/"
haberDegeri: 85
featured: false
breaking: true
draft: false
---

OpenAI ve Cisco, Linux sistemlerinin güvenliğini sağlamak için geliştirilen açık kaynaklı Shirudo aracını duyurdu. Bu teknoloji, yapay zekâ ajanlarının sistemlerdeki açıkları tespit edip, bunları kapatacak "kalkanlar" yazmasına olanak tanıyor. Geleneksel güvenlik yöntemlerinde bir açık bulunduğunda, yazılımın güncellenmesi ve sistemin yeniden başlatılması gerekirken, Shirudo bu süreci tamamen değiştiriyor.

Shirudo'nun temelinde, Linux çekirdeğinde güvenli programların çalışmasını sağlayan eBPF teknolojisi yatıyor. Yapay zekâ ajanları, bir güvenlik açığı tespit ettiğinde, bu açığı hedef alan ancak sistemin geri kalanını etkilemeyen küçük kod parçaları oluşturuyor. Bu kalkanlar, sistem çalışmaya devam ederken devreye alınıyor; böylece kritik servislerin durdurulmasına gerek kalmıyor.

Bu gelişme, yapay zekâ ajanlarının sadece metin üretmekle kalmayıp, işletim sistemi seviyesinde güvenlik mühendisliği yapabildiğini gösteriyor. Özellikle Java4Shell gibi ciddi güvenlik açıklarının, sistem kesintiye uğratılmadan engellenebilmesi, bu teknolojinin kurumsal altyapılar için ne kadar kritik olduğunu kanıtlıyor. Araç, 9.2 puanlı CVSS güvenlik açığı üzerinde başarılı bir şekilde test edildi.

Teknoloji, Cisco'nun 2024 yılında bünyesine kattığı Isovalent ekibinin geliştirdiği Tetragon platformunun bir devamı niteliğinde. Shirudo, güvenlik önlemlerinin kriptografik olarak imzalanmasını ve TPM 2.0 gibi donanım tabanlı güvenlik katmanlarıyla doğrulanmasını şart koşuyor. Bu da ajanların yazdığı kodun güvenilirliğini garanti altına alıyor.

Şu an için belirli bir çekirdek yapısı ve donanım gereksinimleri bulunan Shirudo, kendi kendini savunan sistemler vizyonuna doğru atılmış önemli bir adım. OpenAI, 15 Aralık'ta düzenleyeceği web seminerinde bu teknolojinin teknik detaylarını ve yapay zekâ ile entegrasyonunu daha geniş bir kitleye anlatmayı planlıyor.
