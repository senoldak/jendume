---
lang: tr
title: "Anthropic açık kaynaklı sandbox-runtime aracı ile yapay zekâ ajanlarını güvene alıyor"
description: "Anthropic, konteyner gerektirmeyen ve işletim sistemi düzeyinde çalışan açık kaynaklı sandbox-runtime aracını duyurdu."
category: teknoloji
date: 2026-10-24T13:51:01.006Z
esId: "anthropic-releases-sandbox-runtime-to-secure-ai-agents-at-the-os-level"
bolge: "Küresel"
perspektif: "Bu araç, yapay zekâ ajanlarının sistem dosyalarına ve ağa erişimini güvenli bir şekilde sınırlandırarak geliştiricilerin onay yorgunluğunu azaltıyor ve güvenlik açıklarını önlüyor."
why_matters: "Yapay zekâ ajanlarının güvenli bir şekilde dosya düzenlemesine ve ağ işlemleri yapmasına olanak tanıyarak güvenlik risklerini en aza indirir."
key_points:
  - "Konteyner gerektirmeyen işletim sistemi düzeyinde sandbox"
  - "Onay istemlerini yüzde 84 oranında azalttı"
  - "macOS, Linux ve alfa aşamasında Windows desteği"
rakamlar:
  - etiket: "Paket boyutu"
    deger: "11,4 MB"
  - etiket: "İzin azalması"
    deger: "%84"
kaynakIzi: "v1.Gxif6RletSlVgPha.hbdV0hIWvX9d/RqxJ48635vBJjW8L9DcpW45QsmlZqB8kcjPOi18cZXTk8B9fCiHbIwyhtJedCo62Nt/Sy4G+bye1DaPfM9QcuEns3oyTtAGvrde6O0UJtbU8FUxO5JlwYyaKBJ1nb5s7dIvvghSCOnKZYVqLQQH/1pJBuG5UOrS5PQ="
featured: false
breaking: false
draft: false
---

Anthropic, yapay zekâ ajanları için geliştirdiği işletim sistemi düzeyinde çalışan açık kaynaklı sandbox-runtime (srt) aracını kullanıma sundu. Claude Code projesinin arkasındaki teknoloji olan bu araç, herhangi bir süreci konteyner başlatmadan dosya sistemi ve ağ kısıtlamalarıyla sarabiliyor. macOS üzerinde Seatbelt, Linux üzerinde ise bubblewrap altyapısını kullanan yazılım, süreç ağacının tamamını denetliyor. Yapılan açıklamaya göre bu yöntem, dahili testlerde onay bildirimlerini yüzde 84 oranında azalttı.

Sistem, varsayılan olarak okuma işlemlerine izin verirken yazma işlemlerini ve ağ erişimini sıkı kurallarla kısıtlıyor. Trafik, ana makinede çalışan proxy sunucuları üzerinden yönetiliyor ve etki alanı listelerine göre filtreleniyor. Geliştiriciler, paket yöneticileri veya komut satırı programları için bu sınırları yapılandırabiliyor. Araç, npm üzerinden kurulabiliyor ve Apache-2.0 lisansıyla dağıtılıyor.

Araç, işletim sistemlerinin kendi izolasyon bileşenlerini kullanarak çalışıyor. Linux sistemlerinde ağ ad alanı kaldırılmış bubblewrap tercih edilirken, macOS üzerinde dinamik olarak üretilen Seatbelt profilleri kullanılıyor. Windows desteği ise şu anda alfa aşamasında bulunuyor ve özel kullanıcı hesapları ile ağ filtreleme bileşenlerine dayanıyor. Bu çok katmanlı yapı sayesinde ajanların sistem genelinde izinsiz dosya değiştirmesi veya ağa bağlanması engelleniyor.

Geliştiriciler, araç üzerindeki ayar dosyaları aracılığıyla ağ izinlerini ve dosya sistemi erişimlerini detaylı bir şekilde yönetebiliyor. Örneğin belirli alan adlarına izin verilirken kritik dizinler koruma altına alınabiliyor. Bu esneklik, kod yazan ajanların bağımlılık kurması veya belgeleri indirmesi gibi rutin işlemleri yapabilmesini sağlarken olası güvenlik risklerini ortadan kaldırmayı amaçlıyor.
