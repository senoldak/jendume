---
lang: tr
title: "Cisco, yapay zekâ ajanlarını denetleyen Project Quarry aracını açık kaynaklı yaptı"
description: "Cisco, otonom yapay zekâ ajanlarının siber saldırılardaki davranışlarını tespit etmek ve veri sızıntılarını engellemek için geliştirdiği Project Quarry motorunu paylaştı."
category: teknoloji
date: 2026-10-28T13:51:34.689Z
esId: "cisco-open-sources-project-quarry-to-monitor-autonomous-ai-agent-behaviors"
bolge: "Küresel"
perspektif: "Yapay zekâ ajanları daha fazla yetki aldıkça, bu sistemlerin kontrolden çıkmasını veya kötü niyetli kullanılmasını engellemek kritik hale geliyor. Bu araç, dijital asistanlarımızın güvenliğini sağlamak için standart bir denetim mekanizması sunuyor."
why_matters: "Otonom yapay zekâ ajanlarının yaygınlaşmasıyla birlikte, bu sistemlerin siber saldırılarda birer araç olarak kullanılmasını engelleyecek standart denetim mekanizmalarına ihtiyaç duyuluyor."
key_points:
  - "Project Quarry, yapay zekâ ajanlarının tekil eylemleri yerine tüm oturum bağlamını analiz ediyor."
  - "Araç, Snort ve YARA benzeri standart bir kural yapısıyla güvenlik ekiplerine sunuldu."
  - "Sistem, veri sızıntılarını ve yetkisiz sunucu erişimlerini anında tespit edebiliyor."
kaynakIzi: "v1.LuNSVvVEH46QOI8/.TryVRUjSODlVepsGMGO4toGLbP4XtXnOwCLwTs2CSoElK26Zy4hOgLqXY69p1FJOro4ebdlpnNyUMWu59m8Z45RR/Q3uOHAJWuBesAk+ycsk/FbX0ULDq0gpGfsZYhX6irDYJgp1dDqNE5ODQwfKus98tqAYwYr4ccxmNhguVGz2Zd0WIVw3CESuInc="
featured: false
breaking: false
draft: false
---

Cisco, yapay zekâ ajanlarının siber güvenlik tehditlerini ve şüpheli davranışlarını izlemek amacıyla geliştirdiği Project Quarry adlı yeni motorunu açık kaynaklı olarak kullanıma sundu. Bu teknoloji, özellikle otonom hareket eden yapay zekâ sistemlerinin Hugging Face gibi platformlarda görülen saldırılara benzer şekilde kötüye kullanılmasını veya kontrolden çıkmasını engellemeyi hedefliyor. Şirketin güvenlik araştırmacıları, yapay zekâ ajanlarının artık sadece basit komutları yerine getirmediğini, karmaşık görev dizilerini yürüttüğünü belirterek bu yeni denetim mekanizmasının gerekliliğini vurguluyor.

Project Quarry, geleneksel güvenlik araçlarından farklı olarak tekil işlemlere değil, bir ajanın tüm oturum bağlamına odaklanıyor. Mevcut sistemler genellikle sadece tek bir komutu (prompt) kontrol ederken, Cisco’nun yaklaşımı bir ajanın attığı tüm adımları bir dizi olarak kaydediyor. Bu yöntem, kredi kartı dolandırıcılığı tespitine benzer bir mantıkla çalışıyor; tek başına zararsız görünen küçük bir işlem, ardından gelen veri transferiyle birleştiğinde bir güvenlik ihlali olarak tanımlanabiliyor. Böylece bir dosyanın okunması ve ardından bu verinin yetkisiz bir sunucuya gönderilmesi gibi şüpheli ilişkiler anında yakalanabiliyor.

Sistem, güvenlik dünyasında yaygın olarak kullanılan Snort ve YARA kurallarına benzer bir yapı sunarak uzmanlara tanıdık bir çalışma ortamı sağlıyor. Güvenlik ekipleri, Project Quarry üzerinden kendi savunma stratejilerini oluşturabiliyor ve belirli senaryolar için özel tetikleyiciler tanımlayabiliyor. Örneğin, izin verilmeyen sunuculara erişim sağlandığında veya şüpheli kodlamalar tespit edildiğinde sistem otomatik olarak müdahale edebiliyor. Bu esneklik, özellikle Model Context Protocol (MCP) gibi karmaşık yapılar üzerinden yürütülen işlemlerin güvenliğini sağlamak için kritik bir avantaj sunuyor.

Cisco, bu aracı açık kaynaklı hale getirerek sektör genelinde kolektif bir savunma hattı kurmayı amaçlıyor. Şirket yetkilileri, hiçbir aracın tek başına insan denetiminin yerini tutamayacağını ancak Project Quarry’nin ekiplerin kendi yapay zekâ ajanlarını test etmeleri için güçlü bir temel oluşturduğunu ifade ediyor. Farklı güvenlik ekiplerinin karşılaştıkları tehditleri bu platform üzerinden paylaşmasıyla, yapay zekâ güvenliğinin küresel ölçekte standartlaşması ve güçlenmesi hedefleniyor.
