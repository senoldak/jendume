---
lang: tr
title: "AWS yapay zekâ ajanları için yeni açık kaynak araçlarını duyurdu"
description: "Amazon Web Services, yapay zekâ ajanlarının karar süreçlerini yönetmek ve güvenli bir şekilde çalıştırılmasını sağlamak amacıyla Strands Decider 2B ve Strands Box adlı iki açık kaynak projeyi tanıttı."
category: yapay-zeka
date: 2026-10-17T03:50:54.401Z
bolge: "Küresel"
perspektif: "Bu araçlar, yapay zekâ ajanlarının daha güvenli ve kontrollü çalışmasını sağlayarak hatalı veya zararlı eylemlerin önüne geçilmesinde önemli bir rol oynamaktadır."
why_matters: "Yapay zekâ ajanlarının karar süreçlerini hızlandırırken güvenli bir yürütme ortamı sunarak olası hataların ve güvenlik açıklarının önüne geçilmesini sağlar."
key_points:
  - "Strands Decider 2B, iki milyar parametreli açık kaynaklı bir karar verme modelidir."
  - "Model, NVIDIA RTX 3090 üzerinde yaklaşık 115 milisaniye karar gecikme süresi sunmaktadır."
  - "Strands Box, işletim sistemi izolasyonu ve politika katmanı ile ajan güvenliğini sağlamaktadır."
kaynakIzi: "v1.jRSnGhaddycIqq04.si6RuGg+PuCaqhpIvdKQFF0r6jF6L9slDdH8wsw/HvObHzgDAo1lsJv7PXKQY21d6hJJRFTv+I9uorHTXkfvtRFKbXNp0TPenflYCGw1Z786ScCqTsIx/UKSv/IiF4RzKUDl0+vDvppsnqTyA4CEhtF7yoXfpANYM99aPBIPQeK6TaHfN0JkyRCIDA4+pZoIDt8f9qN9TirMB/9MCnvBy46wOpsHXrlyix63BJIIevSLopnqfrWdZoh1PED/ivqS5ErP/Jg="
featured: false
breaking: false
draft: false
---

Amazon Web Services, yapay zekâ ajanlarının geliştirilmesi ve güvenli bir şekilde çalıştırılması için tasarlanan iki yeni açık kaynak projeyi kullanıcıların erişimine sundu. Tanıtılan projelerden biri olan Strands Decider 2B, karmaşık metinler üretmek yerine önceden tanımlanmış seçenekler arasından hızlı kararlar almak üzere geliştirilmiş iki milyar parametreli bir model olarak dikkat çekiyor. Model yönlendirme, araç seçimi ve sınıflandırma gibi görevleri üstlenen bu yapı, geliştiricilerin güven skorlarıyla hızlı kararlar almasını sağlıyor.

Qwen3.5-2B modelini temel alan Strands Decider 2B, dil modeli başlığının yerine aday yanıtları puanlayan bir işaretçi başlığı kullanıyor. Gerçekleştirilen değerlendirmelere göre model, NVIDIA RTX 3090 üzerinde yaklaşık 115 milisaniye, Apple M3 işlemcili cihazlarda ise 153 milisaniye gibi düşük bir karar gecikme süresine ulaşıyor. Geliştiriciler bu modeli yerel olarak çalıştırabiliyor ve kendi iş akışlarına entegre edebiliyor.

İkinci proje olan Strands Box ise yapay zekâ ajanlarının yürütülmesi için izole edilmiş güvenli bir ortam sunuyor. İşletim sistemi düzeyinde izolasyonu Dogwood adı verilen açık kaynaklı bir politika diliyle birleştiren bu kum havuzu ortamı, kabuk komutları, Python yürütme araçları ve dosya sistemi operasyonlarını denetliyor. Geliştiriciler bu katman sayesinde ajanların hangi eylemleri gerçekleştirebileceğini kurallarla sınırlayabiliyor.

Bu gelişmeler, yapay zekâ ajanlarının sadece görevleri yerine getirmekle kalmayıp aynı zamanda sıkı güvenlik politikaları altında çalışmasını hedefliyor. Geleneksel kum havuzu çözümlerinden farklı olarak araç argümanlarına ve geçmiş eylemlere dayalı politikalar sunan sistem, ajanların istenmeyen işlemler yapmasını engelliyor. AWS'nin bu hamlesi, yapay zekâ ajanlarının üretim ortamlarında daha güvenli ve öngörülebilir bir şekilde konumlandırılmasına katkı sağlamayı amaçlıyor.
