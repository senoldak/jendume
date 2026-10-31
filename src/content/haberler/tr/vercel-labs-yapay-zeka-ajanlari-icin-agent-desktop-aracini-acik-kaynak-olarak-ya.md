---
lang: tr
title: "Vercel Labs yapay zekâ ajanları için agent-desktop aracını açık kaynak olarak yayımladı"
description: "Vercel Labs, yapay zekâ ajanlarının ekran görüntüsü yerine işletim sisteminin erişilebilirlik katmanını kullanarak masaüstü uygulamalarını yönetmesini sağlayan agent-desktop aracını açık kaynaklı olarak kullanıma sundu."
category: teknoloji
date: 2026-10-31T11:51:55.401Z
esId: "vercel-labs-open-sources-agent-desktop-for-ai-agent-computer-use"
bolge: "Küresel"
perspektif: "Bu araç, yapay zekâ ajanlarının bilgisayar kullanımını çok daha az veri tüketerek ve daha kararlı bir şekilde gerçekleştirmesini sağlayarak yazılım geliştirme süreçlerini hızlandırıyor."
why_matters: "Yapay zekâ ajanlarının bilgisayar kullanımında ekran görüntüleri yerine yapısal veri kullanması, maliyetleri büyük ölçüde düşürürken ajanların arka planda daha verimli çalışmasını sağlıyor."
key_points:
  - "agent-desktop, işletim sisteminin erişilebilirlik ağacını kullanarak ekran görüntüsü gereksinimini ortadan kaldırır."
  - "İskelet tarama yöntemi sayesinde token tüketiminde yüzde 78 ila 96 oranında tasarruf sağlandığı bildirildi."
  - "Araç; macOS, Windows ve Linux işletim sistemlerinde x64 ve ARM64 mimarilerini desteklemektedir."
rakamlar:
  - etiket: "Token tasarrufu"
    deger: "%78 - %96"
  - etiket: "Lisans"
    deger: "Apache-2.0"
kaynakIzi: "v1.bKYE8anXnhSJFyP1.Re20nlzkE0azsEYq5woOOx/e+LPDtPKL1RkgDMtv/lyzo5D8HJ1irjYmTPOoej04+mIhll/IE242IEBEBV+ohc57yCdvChZu3NfMVxwnhLzEFBpt7kzPyPolJYPEZ/u6gdYyepebXhWWCIWI86WBMjFXAi10dJ4Oxd/iWXcCtw=="
featured: false
breaking: false
draft: false
---

Vercel Labs, macOS, Windows ve Linux işletim sistemlerinde yapay zekâ ajanlarının bilgisayar kullanımını destekleyen agent-desktop adlı açık kaynaklı komut satırı arayüzünü yayımladı. Apache-2.0 lisansıyla duyurulan bu araç, kodlama yapan herhangi bir ajan modelinin görsel bir modele ihtiyaç duyulmaksızın yerel uygulamaları yönetmesine imkan tanıyor.

Geleneksel yapay zekâ ekran kontrolü araçları ekran görüntülerine dayanırken, agent-desktop doğrudan işletim sisteminin erişilebilirlik ağacını okuyor. macOS için AX API, Windows için UI Automation ve Linux için AT-SPI kullanan yapı, ajanların her öğe için JSON anlık görüntüleri almasını sağlıyor. Bu yöntem sayesinde ajanlar, fare imlecini hareket ettirmeden ve odağı çalmadan arka planda çalışabiliyor.

Yapılan testlerde, iskelet tarama yöntemiyle yoğun uygulamalarda token tüketiminde yüzde 78 ile yüzde 96 arasında bir azalma sağlandığı bildirildi. Örneğin Apple Maps uygulamasındaki bir işlemin token maliyeti düşerken, simüle edilmiş 52 adımlık bir görevde harcanan token miktarı da ciddi oranda azaldı.

Rust programlama diliyle geliştirilen ve C kütüphanesi de sunan araç; npm, Bun, Yarn ve pnpm üzerinden kurulabiliyor. Saf işlemci gücüyle çalışan ve grafik işlemci gerektirmeyen sistem, x64 ve ARM64 mimarilerini destekliyor. Bu gelişme, yapay zekâ ajanlarının masaüstü ortamlarıyla etkileşim kurma biçimini daha verimli hale getirmeyi hedefliyor.
