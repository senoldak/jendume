---
lang: tr
title: "Amazon Bedrock AgentCore oturum uç noktaları ile canlı web önizlemesi sunuyor"
description: "Amazon, yapay zekâ kodlama ajanlarının ürettiği web uygulamalarının tarayıcıda anlık olarak önizlenmesini sağlayan yeni AgentCore runtime yeteneğini tanıttı."
category: teknoloji
date: 2026-10-30T21:52:07.228Z
esId: "amazon-bedrock-agentcore-introduces-live-web-preview-via-session-endpoints"
bolge: "Küresel"
perspektif: "Bu özellik, yapay zekâ ajanlarının yazdığı kodların test edilme sürecini hızlandırarak geliştiricilerin anında geri bildirim almasını ve hata ayıklamasını kolaylaştırıyor."
why_matters: "Geliştiricilerin yapay zekâ ajanlarıyla etkileşimini hızlandırarak kod test etme ve uygulama geliştirme süreçlerini daha verimli hale getiriyor."
key_points:
  - "AgentCore runtime her ajan oturumunu izole mikro sanal makinelerde çalıştırıyor."
  - "Oturum uç noktaları web uygulamalarının tarayıcıda anlık önizlenmesini sağlıyor."
  - "İstekler AWS IAM imzaları ve JWT yetkilendiricileri ile güvenli hale getiriliyor."
kaynakIzi: "v1.+/gV3fSomCcGCpS9.OzyfywW/t3llQ+jeivuANYWZl2DseYLFAHpEXHoIi3R1tFxmOPIaH5GC/fM4k70fOHxtb8A60/A+ddzCYdZjZ8nijmlqE5pYs3klab1iyCowvT8l0SLlXpqd7pkO26gghq74NZVQ8/ykE3rOSyb505v0okjDhotQvlkJWaAR9lvs+rr6G3HpyB4AkNE2ZCl+YTNx7RjM57kk/FPBS46haW8p17qUzo/janw8Nl/L9YUrJGFDQme6CztGyEm0iarW5L8cXpbRRi4="
kaynaklar:
  - ad: "AWS Machine Learning Blog"
    url: "https://aws.amazon.com/blogs/machine-learning/preview-web-apps-live-as-your-coding-agent-builds-them-with-amazon-bedrock-agentcore-runtime/"
featured: false
breaking: false
draft: false
---

Amazon Bedrock AgentCore platformu, geliştiricilerin yapay zekâ ajanlarını ölçeklenebilir bir şekilde kurmasını ve optimize etmesini sağlayan yeni bir yetenek kazandı. AgentCore runtime, her ajan oturumunu izole edilmiş mikro sanal makinelerde çalıştırırken, yeni oturum uç noktaları özelliği sayesinde kullanıcılar tarayıcı üzerinden uygulamaları canlı olarak takip edebiliyor.

Sistem, kodlama ajanlarının web uygulamaları oluştururken her değişikliği saniyeler içinde tarayıcıya yansıtmasına olanak tanıyor. Geliştiriciler, ajanların arka planda dosyaları düzenlemesini izleyebilirken, Vite geliştirme sunucusu ve sıcak yeniden yükleme WebSocket bağlantıları sayesinde sayfalar yenilenmeden güncelleniyor. Ajanlar, değişiklik yapmak için Amazon Bedrock içindeki modelleri kullanıyor ve dosyaları kaydederek Vite sunucusunun bu değişiklikleri anında tarayıcıya iletmesini sağlıyor.

Yeni özellik, bağlantı noktası yönetimi ve güvenlik katmanlarıyla dikkat çekiyor. Oturum uç noktaları, AWS Kimlik ve Erişim Yönetimi imzaları veya JSON Web Token yetkilendiricileri ile korunuyor. Böylece her istek ve WebSocket bağlantısı güvenli bir şekilde hedeflenen bağlantı noktalarına yönlendiriliyor, izin verilmeyen istekler ise engelleniyor.

Bu yenilik, yapay zekâ destekli yazılım geliştirme süreçlerinde dağıtım ve test adımlarını ortadan kaldırarak döngüyü hızlandırıyor. Geliştiriciler, ajan oturumu içinde çalışan web sitelerini doğrudan kendi makinelerinden yerel uç noktalar aracılığıyla test edebiliyor ve anlık değişiklik taleplerinde bulunabiliyor. Böylece kodlama ajanlarıyla yürütülen çalışmalar, ekstra bir dağıtım sürecine ihtiyaç duyulmadan doğrudan tarayıcı üzerinden incelenebiliyor.
