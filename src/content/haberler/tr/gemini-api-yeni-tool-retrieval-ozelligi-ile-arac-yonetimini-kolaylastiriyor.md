---
lang: tr
title: "Gemini API yeni Tool Retrieval özelliği ile araç yönetimini kolaylaştırıyor"
description: "Google, Gemini API için geliştirdiği Tool Retrieval özelliğini önizlemeye açarak yapay zekâ ajanlarının büyük araç kütüphanelerini daha verimli yönetmesini sağlıyor."
category: teknoloji
date: 2026-11-20T03:50:53.631Z
esId: "gemini-api-introduces-tool-retrieval-to-manage-agent-tools-efficiently"
bolge: "Küresel"
perspektif: "Bu özellik, yapay zekâ ajanlarının yüzlerce aracı aynı anda yüklemek zorunda kalmadan sadece ihtiyaç duyduklarında çağırmasına imkân tanıyarak maliyetleri düşürüyor ve performansı artırıyor."
why_matters: "Geniş yazılım kütüphaneleriyle çalışan uygulamalarda gereksiz veri yükünü ortadan kaldırarak token tüketimini ve gecikme sürelerini azaltıyor, böylece geliştirme süreçlerini optimize ediyor."
key_points:
  - "Tool Retrieval özelliği Interactions API içerisinde önizleme olarak sunuldu."
  - "Parametre şemaları talep anında yüklenerek giriş token maliyetleri düşürülüyor."
  - "Gemini 3.6 ve sonraki modeller ile tüm Gemini 4 modelleri tarafından destekleniyor."
kaynakIzi: "v1.DuQGEoyYcCffH0rt.43MDtVdOg5mwMxwlbeeVtKl9S3VpiSO7HJIQrvms/skjT2ItUPEz16gAefhqONsJJeg64cdE8hcBsoHhOUHO1xnMsca8H2qEdSGe5fLIBRgiOyGWskuy75xSW/NLeLTk90eNUFJPxYyCt5ZxibhDiSX0BDdcdwSQqESbMZ9upHB2uhCRLw2932BDZw1rPw=="
kaynaklar:
  - ad: "Google AI Blog"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tool-retrieval/"
haberDegeri: 80
featured: false
breaking: false
draft: false
---

Google, yazılımcıların yapay zekâ ajanları için geniş yazılım araçları koleksiyonlarını daha etkin yönetebilmesi amacıyla Tool Retrieval sistemini duyurdu. Önizleme aşamasında sunulan bu yenilik vasıtasıyla, ajanlar her istekte tüm araç kütüphanesini aktarmak yerine yalnızca ilgili görev için gereken detayları çekiyor.

Karmaşık görevlerde yapay zekâ ajanları onlarca hatta yüzlerce araca bağlanabiliyor. Her istekte tam parametre şemalarının gönderilmesi giriş token maliyetlerini artırıyor ve gecikmelere yol açıyordu. Yeni mekanizma, ajanların kütüphaneyi bekleme konumunda tutmasını ve parametre şemalarını sadece görev ihtiyaç duyduğunda yüklemesini mümkün kılıyor.

Sistemi faal hale getirmek için geliştiricilerin isteklerine bir arama aracı eklemesi ve ertelenmesini istedikleri unsurlarda ilgili bayrağı doğru biçimde ayarlaması yeterli oluyor. Model, ertelenen araçların adını ve tanımını görmeyi sürdürürken, şemalar ilk aşamada kapsam dışı kalıyor. Model bir araca ihtiyaç duyduğunda adıyla talep ediyor ve arayüz şemayı yüklüyor.

Bu güncelleme, önbellekleme süreçleriyle de uyumlu çalışarak sohbet boyunca verimliliği koruyor. Geliştiriciler ayrıca isterlerse kendi araç kayıt defterlerini veya uzaktan sunucu entegrasyonlarını da bu yapıya dahil edebiliyor. Özellik, standart model oranlarıyla ücretlendiriliyor ve ek bir maliyet getirmiyor.

Tool Retrieval, Gemini 3.6 ve sonrasındaki modeller ile tüm Gemini 4 modelleri tarafından destekleniyor. Bu yenilik, büyük veri setleriyle çalışan geliştiricilerin token maliyetlerini düşürürken ajan yanıt sürelerini iyileştirmeyi hedefliyor.
