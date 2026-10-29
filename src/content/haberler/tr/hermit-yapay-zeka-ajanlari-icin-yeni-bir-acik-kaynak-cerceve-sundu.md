---
lang: tr
title: "Hermit, yapay zekâ ajanları için yeni bir açık kaynak çerçeve sundu"
description: "Infini-AI-Lab, yapay zekâ ajanlarının modellerini değiştirmeden yeni görevlere uyarlanmasını sağlayan açık kaynaklı Hermit çerçevesini yayımladı."
category: yapay-zeka
date: 2026-10-29T09:51:34.726Z
esId: "hermit-launches-as-an-open-source-harness-adapter-framework-for-ai-agents"
bolge: "Küresel"
perspektif: "Bu çerçeve, yapay zekâ ajanlarının mevcut yapıları bozulmadan farklı görevlere kolayca adapte edilmesini sağlayarak geliştirme süreçlerini hızlandırıyor ve verimliliği artırıyor."
why_matters: "Bu araç, yapay zekâ ajanlarının yeniden yapılandırılmadan yeni görevlere uyarlanmasını kolaylaştırarak geliştirici verimliliğini artırıyor."
key_points:
  - "Hermit, model ve ajan yapısı sabit kalırken dış adaptör eğitilmesini sağlar."
  - "MetaWorld Model adaptörü CL-Bench veritabanı testinde 0,795 doğruluk elde etti."
  - "Sistem Apache-2.0 lisansıyla açık kaynak olarak yayımlandı."
rakamlar:
  - etiket: "CL-Bench doğruluk"
    deger: "0,795"
  - etiket: "Temel çizgi doğruluk"
    deger: "0,580"
kaynakIzi: "v1.YDrBww0eEH7Os68A.PovRwnZLT7MnEd+oh5bv0zn5WVwXD8UPboiEeRE5SWOU/BJXTQtDXmQ/fG6o8Tg085tQ6OaY5DXMnjLkpbQGHyk2JK54MFO2AG1TSLbpAJ/+ocQ/EEl9cs+TdzI7mfcsSsuYUJav0vnlOKrOWPpPDhqHdWchdvuVpI24YaszIDXZYKO4bKC4"
featured: false
breaking: false
draft: false
---

Infini-AI-Lab, yapay zekâ ajanları için geliştirilen açık kaynaklı Hermit çerçevesinin ilk sürümünü duyurdu. Bu yeni araç, ajanların temel modellerini ve sistem yapılarını değiştirmeden dışarıdan eğitilebilen bir adaptör mekanizması sunuyor. Geliştiriciler bu sayede mevcut sistemleri sıfırdan düzenlemeden yeni görevler için eğitebiliyor ve farklı modellere uyumlu hale getirebiliyor.

Sistem, pekiştirmeli öğrenme döngüsüne benzer bir yapı kullanarak çalışıyor. Bir eğitici model görevleri çalıştırırken, değerlendirici çıktıları puanlıyor ve evrimci bileşen yeni adaptör sürümleri öneriyor. Tüm sürümler bir git ağacında saklanarak gerektiğinde kolayca denetlenip geri alınabiliyor veya dağıtılabiliyor. Ayrıca yazılım, Linux ortamında bubblewrap gerektiren korumalı alan özellikleri de sunuyor.

İlk sürümle birlikte GEPA, SkillOpt, MetaWorld Model, Harness ve Continual Harness olmak üzere beş farklı evrim yöntemi kullanıma sunuldu. Yapılan ilk testlerde, MetaWorld Model adaptörünün CL-Bench veritabanı keşfinde 0,795 doğruluk oranına ulaştığı, bağlam içi temel çizginin ise 0,580 seviyesinde kaldığı rapor edildi. OfficeQA testlerinde ise Harness² modeli referans çalışmaya göre artı 7,6 puanlık kazanç bildirdi.

Python tabanlı olan ve Apache-2.0 lisansıyla gelen bu araç, PyPI üzerinden pip komutuyla kolayca kurulabiliyor. Çevrimdışı başlangıç aşamasında herhangi bir grafik işlemciye ihtiyaç duymayan sistem, gerçek çalışmalarda çeşitli API arka uçları veya yerel sunucularla birlikte kullanılabiliyor.
