---
lang: tr
title: "DeepSeek, yapay zekâ modellerini çalıştıran DeepInfer yazılımını açık kaynaklı hale getirdi"
description: "DeepSeek, üretim ortamında yapay zekâ modellerini çalıştırmak için kullandığı DeepInfer yazılımını Apache 2.0 lisansıyla açık kaynak olarak yayımladı."
category: teknoloji
date: 2026-10-20T15:50:57.745Z
bolge: "Küresel"
perspektif: "Bu açık kaynak hamlesi, yapay zekâ maliyetlerini düşürmeyi, enerji tüketimini azaltmayı ve teknolojiyi daha erişilebilir kılmayı amaçlıyor."
why_matters: "Üretim maliyetlerini düşüren ve enerji tasarrufu sağlayan bu tür açık kaynaklı altyapılar, yapay zekâ teknolojilerinin daha geniş kitleler ve şirketler tarafından erişilebilir olmasını sağlıyor."
key_points:
  - "DeepInfer yazılımı Apache 2.0 lisansıyla açık kaynak olarak yayımlandı."
  - "Yazılım şu an yalnızca DeepSeek-V4.1-Flash modelini destekliyor."
  - "Nvidia SM100 ve Huawei Ascend 950 çiplerinde çalışabiliyor."
rakamlar:
  - etiket: "GitHub yıldızı"
    deger: "8.000+"
kaynakIzi: "v1.84H5B3bMaE4WKj30.JgFaNl2c8137stMe5p/GOj7eNq/XjHxKEbKkGCKdr1MogRXumZer5FCefSrLFW9CvSURm9S5m/avVoS59NVJe5RX0agH2W0N97tkzQK2X26zb+DRF28Ed7zxaJgFMouEsUujoB7eF7tICJWY2I8or26Hno2iukSrEN8N"
featured: false
breaking: false
draft: false
---

DeepSeek, yapay zekâ modellerini üretim ortamında çalıştırmak için geliştirdiği DeepInfer yazılımını kamuoyuyla paylaştı. Çin merkezli yapay zekâ laboratuvarı, bu duyuruyu sosyal medya üzerinden yaparken kodu GitHub üzerinde Apache 2.0 lisansıyla erişime açtı. Yazılım, şimdilik yalnızca DeepSeek-V4.1-Flash modelini destekliyor.

Inference olarak bilinen süreç, eğitilmiş bir modelin gelen isteklere yanıt vermesi anlamına geliyor. Aynı model, kullanılan sunucu yazılımına bağlı olarak çok daha düşük veya yüksek maliyetlerle çalıştırılabiliyor. DeepInfer, optimize edilmiş kodları çip dağıtımı ve spekülatif kod çözme gibi tekniklerle birleştirerek işlem maliyetlerini düşürmeyi hedefliyor. Yazılımın sunduğu bu özellikler, çıkışların çalışmadan çalışmaya tutarlı kalmasını sağlıyor ve yanıtları belirli biçimlerde kalıplara sokuyor.

Yazılım, Nvidia'nın SM100 veri merkezi GPU'ları ile Huawei'nin Ascend 950 çiplerinde çalışabiliyor. Şirket, gelecekteki modeller için de kod güncellemelerinin aynı platformda paylaşılacağını belirtti. İlk olarak vLLM, SGLang ve Nvidia TensorRT-LLM altyapılarından yararlanılarak geliştirilen sistem, bulut ve barındırma şirketlerinin maliyetlerini azaltma potansiyeli taşıyor.

Bu hamle, ABD'nin sivil federal kurumlarına DeepSeek ürünlerini sistemlerinden kaldırma talimatı vermesinden bir gün sonra geldi. Yayınlanmasından kısa süre sonra GitHub deposu binlerce yıldız alırken, açık kaynak topluluğu gelişmeyi memnuniyetle karşıladı. Vercel'in yapay zekâ geçidindeki harcamaların önemli bir kısmını açık ağırlıklı modeller oluşturuyor.
