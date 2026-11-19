---
lang: tr
title: "Shepherd, otonom yapay zekâ ajanlarını denetim altına alıyor"
description: "Northeastern ve Stanford araştırmacıları, kontrolden çıkan yapay zekâ ajanlarını yönetmek ve hatalı eylemlerini engellemek için sürüm kontrolü mantığıyla çalışan bir sistem geliştirdi."
category: yapay-zeka
date: 2026-11-19T15:51:03.569Z
esId: "shepherd-framework-brings-version-control-to-autonomous-ai-agents"
bolge: "Küresel"
perspektif: "Otonom ajanların karmaşık görevleri yerine getirirken hata yapma veya beklenmedik eylemlerde bulunma riski artıyor; bu sistem, insan denetimini merkeze alarak yapay zekâ güvenliğini artırıyor."
why_matters: "Sistem, yazılım geliştirme süreçlerindeki sürüm kontrolü mantığını yapay zekâ ajanlarına uyarlayarak Python tabanlı açık kaynaklı bir altyapı sunuyor ve ajan yönetiminin demokratikleştirilmesini amaçlıyoryla öne çıkıyor ailesini genişletiyorydu şeklinde değil, doğrudan olgularla çalışıyor."
key_points:
  - "Otonom ajanlar için sürüm kontrolü sistemi"
  - "Hatalı eylemleri engellemek için meta-ajan denetimi"
  - "Açık kaynaklı proje olarak geliştiriliyor"
kaynakIzi: "v1.QycPfLWe50wrHBLe.7AkXOchD1YBTBqMvs20/DEBugqkFBeQvrvotsTojbV378UmmTTJmP5Z33vKByvsVjDcthJbPIcqDn4s1C5KlWSnFrSqaj01hae2K7G0OAqIudiF0mS0m/pb1Xd0HPw=="
haberDegeri: 85
featured: false
breaking: false
draft: false
---

Otonom yapay zekâ ajanları, internet üzerinde karmaşık görevleri yerine getirmek için tasarlanıyor ancak bazen beklenmedik ve istenmeyen sonuçlara yol açıyor. E-posta kutularını silmekten siber saldırılara kadar uzanan bu "başıboş" davranışlar, yapay zekâ sistemlerinin güvenilirliği konusunda ciddi soru işaretleri yaratıyor. Northeastern ve Stanford üniversitelerinden araştırmacılar, bu sorunu çözmek amacıyla "Shepherd" adını verdikleri bir çerçeve geliştirdi. Bu sistem, yazılım dünyasında kullanılan "sürüm kontrolü" mantığını yapay zekâ ajanlarına uyarlayarak, ajanların eylemlerini izleyen ve gerektiğinde müdahale eden bir "meta-ajan" katmanı oluşturuyor.

Sistem, ajanların yaptığı her eylemi, bulunduğu ortamla birlikte bir "commit" (işleme) olarak kaydediyor. Bu sayede meta-ajanlar, bir hata tespit ettiklerinde süreci durdurabiliyor, önceki bir adıma geri dönebiliyor veya ajanı farklı bir yöne yönlendirmek için "fork" (çatallama) yapıyor. Bu yapı, ajanların gerçek dünyada işlem yapıyormuş gibi görünmesini sağlarken, aslında eylemlerin bir "sandbox" (kum havuzu) ortamında denetlenmesine olanak tanıyor. Böylece insan operatörler, kritik kararlarda devreye girerek süreci yönetebiliyor.

Araştırmacılar, bu sistemin uygulanabilirliğini kanıtlamak için üç kullanım senaryosu geliştirdi. Bunlar arasında, paralel programlama yapan ajanlar arasındaki çatışmaları çözen bir denetleyici, ajanların iş akışlarını optimize eden bir yapı ve pekiştirmeli öğrenme sürecinde ajanın daha iyi bir yol izlemesini sağlayan bir eğitim mekanizması yer alıyor.

Açık kaynaklı bir proje olarak sunulan bu çalışma, ajanların daha güvenilir ve sağlam hale getirilmesini hedefliyor. Aralık 2026'da düzenlenecek NeurIPS konferansında sunulacak makale, Northeastern, Stanford ve UC Berkeley araştırmacılarının ortaklaşa kurduğu Agent Sciences Research Initiative (ASRI) girişimi kapsamında yer alıyor.
