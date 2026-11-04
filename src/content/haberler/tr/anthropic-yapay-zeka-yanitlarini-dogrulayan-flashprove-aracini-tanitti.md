---
lang: tr
title: "Anthropic, yapay zekâ yanıtlarını doğrulayan FlashProve aracını tanıttı"
description: "Anthropic, bir yapay zekâ modelinin yanıtının gerçekten hangi modelden geldiğini kriptografik olarak kanıtlayan FlashProve adlı açık kaynaklı bir araç yayınladı."
category: teknoloji
date: 2026-11-04T03:50:57.540Z
esId: "anthropic-releases-flashprove-to-cryptographically-verify-ai-responses"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ modellerinin güvenilirliği ve şeffaflığı açısından kritik bir boşluğu dolduruyor; kullanıcıların ve düzenleyicilerin hangi modelin yanıt verdiğini kesin olarak doğrulamasını sağlıyor."
why_matters: "Bu sistem, kullanıcıların ve düzenleyicilerin hangi yapay zekâ modeliyle iletişim kurduklarını kriptografik olarak doğrulamasını sağlayarak sektörde şeffaflık eksikliğini gideriyor."
key_points:
  - "Tek H100 üzerinde saniyede yaklaşık 110 token kanıtlama hızı"
  - "18,78 megabayt boyutundaki kanıtlar CPU üzerinde 17 saniyede doğrulanıyor"
  - "Kanıt üretimi normal çıkarım süresinin 70 ila 95 katı GPU süresi gerektiriyor"
rakamlar:
  - etiket: "Model boyutu"
    deger: "400B"
  - etiket: "Kanıt boyutu"
    deger: "18,78 MB"
  - etiket: "Doğrulama süresi"
    deger: "17 saniye"
kaynakIzi: "v1.BhxWUdH94LQo+MW8.zdIjnlOd7x/LVLv65EW2wvcYsxUXLi6OZO5BTg3FQ912AVUANaG01BhL3sINYZ6LTtUhgKiMaoNd5qUHGwJwokulBMTl3I0tEyfhDiB5RnJgRcsk+zGiZ0Hd68rQpXpAeyuUm/HeUgJaUdQ4uj2NOuZUg5NGtLEsWthNh8MwpOI+nHBCpPfASg=="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/03/anthropic-flashprove-provable-inference-zksnark/"
haberDegeri: 88
featured: false
breaking: false
draft: false
---

Anthropic ekibi, yapay zekâ çıkarım süreçlerinde hangi modelin yanıt ürettiğini kanıtlayan açık kaynaklı bir araştırma prototipi olan FlashProve'u duyurdu. FlashProve, zkSNARK teknolojisini kullanarak model ağırlıklarını ifşa etmeden yanıtın belirli bir modelden çıktığını kanıtlıyor. Llama 4 Maverick gibi büyük modeller üzerinde test edilen sistem, tek bir H100 grafik işlemcisi üzerinde saniyede yaklaşık 110 tokenlık bir kanıtlama hızı sunuyor.

Yapay zekâ servislerinde kullanıcılar, gelen yanıtın gerçekten iddia edilen modelden gelip gelmediğini doğrudan denetleyemiyordu. Bu durum, yönlendirme servislerinin daha ucuz modelleri devreye sokması veya akışın manipüle edilmesi gibi riskler doğuruyordu. FlashProve; düzenleyicilerin yapay zekâ kurallarına uyumu denetlemesi, laboratuvarların manipüle edilmiş sunucuları tespit etmesi ve kullanıcıların metin kaynağını doğrulaması gibi kullanım alanları hedefliyor.

Sistem, çevrimdışı ve çevrimiçi olmak üzere iki aşamada çalışıyor. Çevrimdışı aşamada sağlayıcı model ağırlıklarını bağlayan bir imza yayınlıyor, çevrimiçi aşamada ise grafik işlemcisi yanıtın bu modelden çıktığına dair kanıt üretiyor. Yapılan testlerde 24'lü gruplar halinde saniyede 111,23 token hıza ulaşılırken, üretilen kanıtlar 18,78 megabayt boyutunda kalıyor ve merkezi işlem biriminde 17 saniyede doğrulanabiliyor.

Normal çıkarım yöntemlerine kıyasla kanıt üretimi yaklaşık 70 ila 95 kat daha fazla grafik işlemci süresi gerektiriyor. Şu an için 1.024 token sınırı, açgözlü kod çözme ve karışık uzman modelleriyle kısıtlı olan sistem, kriptografik kodun güvenliğini artırmak için Lean dilinde resmi olarak formalize edildi. Bu teknoloji, yapay zekâ şeffaflığında yeni bir dönemin kapısını aralıyor.
