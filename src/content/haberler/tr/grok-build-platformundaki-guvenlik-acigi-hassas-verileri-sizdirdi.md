---
lang: tr
title: "Grok Build platformundaki güvenlik açığı hassas verileri sızdırdı"
description: "SpaceX ve xAI iş birliğiyle geliştirilen platformdaki yapılandırma hatası, binlerce özel belge ve kişisel verinin internette erişilebilir kalmasına yol açtı."
category: yapay-zeka
date: 2026-11-12T09:50:49.333Z
esId: "grok-build-platform-security-flaw-exposes-sensitive-data"
bolge: "Küresel"
perspektif: "Bu olay, yapay zekâ geliştirme araçlarının altyapı güvenliğinin, model yetenekleri kadar kritik olduğunu ve kullanıcı verilerinin korunmasında varsayılan ayarların hayati önem taşıdığını gösteriyor."
why_matters: "Yapay zekâ geliştirme platformlarındaki güvenlik açıkları, kurumsal ve kişisel verilerin korunmasız kalmasına yol açarak ciddi bir gizlilik riski oluşturuyor."
key_points:
  - "24 uygulama üzerinden hassas veriler sızdı"
  - "3.500 kişilik personel rehberi erişime açıldı"
  - "18 yönetici şifresi açık metin olarak bulundu"
rakamlar:
  - etiket: "Sızan uygulama"
    deger: "24"
  - etiket: "Personel kaydı"
    deger: "3.500"
  - etiket: "Yönetici şifresi"
    deger: "18"
kaynakIzi: "v1.EaIlgyVe7qDLxkda.Ri/C/ZRx36bjZlt1MNcE7sxPEvxS5n5V4XnvhFtM3+CQH8+cYkPrBWx6dr6XA9Iolp4OrE0MyKtFINEYWyu+vh66nHeQ1vbE76173hqzHj8BePKybBO/tUJLolgPTtrerySDe4TQPZVH/9/MSK1WkaZ08UEZcDgGkZWl5Owz"
kaynakAdlari:
  - ad: "Webtekno"
    url: "https://www.webtekno.com/elon-musk-grok-build-veri-sizintisi-skandali-h228847.html"
haberDegeri: 78
featured: false
breaking: true
draft: false
---

SpaceX ve xAI iş birliğiyle geliştirilen Grok Build platformunda tespit edilen bir güvenlik açığı, binlerce özel belge ve hassas bilginin internet üzerinden erişilebilir hale gelmesine neden oldu. Güvenlik araştırmacıları tarafından ortaya çıkarılan bu durum, platformun varsayılan paylaşım ayarlarının "bağlantıya sahip olan herkes" şeklinde yapılandırılmasından ve URL oluşturma sistemindeki bir zafiyetten kaynaklandı. Platform, rastgele dört kelimeden oluşan bir URL yapısı kullandığı için, bu adresler pasif DNS hizmetleri üzerinden kolayca listelenebiliyordu.

Bu olay, yapay zekâ geliştirme araçlarının ve platformlarının güvenlik standartlarının ne kadar kritik olduğunu bir kez daha gözler önüne seriyor. Kullanıcıların, platform üzerinde oluşturdukları uygulamaların varsayılan ayarlarını değiştirmemesi veya sistemin bu ayarları otomatik olarak herkese açık yapması, kurumsal verilerin ve kişisel bilgilerin korunmasız kalmasına yol açıyor. Özellikle sağlık verileri ve şirket içi stratejik planlar gibi kritik bilgilerin bu şekilde sızması, yapay zekâ ekosisteminde veri güvenliği konusundaki endişeleri artırıyor.

Araştırmalar, sızan veriler arasında 3.500 kişilik bir hastane personel rehberinin, yoğun bakım hastalarına ait laboratuvar sonuçlarının ve Tesla teknisyenlerine ait performans karnelerinin bulunduğunu gösteriyor. Ayrıca, bir şirketin dijital zaman çizelgesinin arka plan kodlarında 18 yöneticiye ait şifrelerin açık metin olarak yer aldığı tespit edildi. Güvenlik açığı 8 Kasım tarihinde bildirilmesine rağmen, platformun kendi iç verilerini birkaç saat içinde korumaya alması ancak diğer kullanıcıların verilerinin günlerce açık kalması dikkat çekti. Bu durum, yapay zekâ platformlarının sadece model yeteneklerine değil, aynı zamanda altyapı güvenliğine de odaklanması gerektiğini hatırlatıyor.
