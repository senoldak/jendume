---
lang: tr
title: "Dragos araştırması yapay zekâ sağlayıcılarındaki büyük veri sızıntısını ortaya çıkardı"
description: "Güvenlik araştırmacıları, ucuz yapay zekâ hizmeti sunan aracı kurumların kullanıcı verilerini ve şifrelerini ele geçirdiğini belgeledi."
category: perspektif
date: 2026-11-22T13:50:55.437Z
esId: "dragos-research-exposes-massive-data-theft-by-ai-inference-providers"
bolge: "Küresel"
perspektif: "Bu gelişme, yapay zekâ modellerine erişirken kullanılan aracı kurumların (router) yarattığı güvenlik risklerini gözler önüne seriyor. En ucuz fiyatı sunan sağlayıcının verilerinizi çalabileceği bir ekosistemde, kurumsal ve kişisel verilerin korunması için tedarik zinciri güvenliği artık bir tercih değil zorunluluk haline geliyor."
why_matters: "Yapay zekâ modellerine erişim sağlayan aracı kurumların veri gizliliği vaatlerini ihlal etmesi, kurumsal sırların ve kişisel verilerin küresel çapta sızmasına neden oluyor."
key_points:
  - "2 milyon sahte talep ile yapılan testlerde 3 sağlayıcının verileri çaldığı saptandı"
  - "OpenRouter güvenlik gerekçesiyle 125 farklı uç noktanın onayını iptal etti"
rakamlar:
  - etiket: "Test Talebi"
    deger: "2 milyon"
  - etiket: "İptal Edilen Uç Nokta"
    deger: "125"
  - etiket: "İhlal Edilen Sağlayıcı"
    deger: "3"
kaynakIzi: "v1.xVJTQnb8bo5x7O84.feXQk/G/Idh3oamgesr54aBjGSLhyxAmxVl645gJee6qRpCxvHJwXTDMBjVYFEGNReaoA2HxK7eMcRN/K4KPNbrYSBbNMmSA6jP9oiV9QkNW8ZxaPlCvxu/dr3TlfWZjgIipcXQVipkdgO2yH/TjeRpEWXVscRnf5ImncRgb+WhW9BLFbGuTSkLPvoBlTrkhEDWkzEvcxpeVdpSzLGdJJA=="
kaynakAdlari:
  - ad: "The Decoder"
    url: "https://the-decoder.com/security-researchers-show-how-cheap-ai-inference-providers-steal-keys-and-snoop-on-users/"
haberDegeri: 88
featured: false
breaking: true
draft: false
---

Güvenlik araştırma şirketi Dragos tarafından yürütülen kapsamlı bir çalışma, yapay zekâ dünyasında veri güvenliğinin ne kadar kırılgan olduğunu kanıtladı. Temmuz ve Kasım 2026 tarihleri arasında gerçekleştirilen testlerde araştırmacılar, çeşitli yapay zekâ sağlayıcılarına sahte kimlik bilgileri içeren yaklaşık 2 milyon talep gönderdi. Sonuçlar, en az üç farklı sağlayıcının saldırganlar tarafından ele geçirildiğini ve kullanıcı verilerinin aktif olarak çalındığını ortaya koydu.

Araştırma kapsamında tespit edilen en büyük olayda, saldırganların yüzlerce AWS bulut anahtarını ele geçirdiği belirlendi. Bazı durumlarda çalınan bu anahtarların sadece birkaç saat içinde S3 depolama alanlarını taramak ve kalıcı erişim sağlamak için kullanıldığı görüldü. Daha da endişe verici olanı, bazı aracı kurumların herhangi bir açığa ihtiyaç duymadan, sadece düşük fiyat verip veri kaydı (logging) özelliğini açarak müşteri taleplerini doğrudan okuyabildiklerinin saptanması oldu.

Veri gizliliği vaatlerinin de sahada karşılık bulmadığı anlaşıldı. "Sıfır Veri Tutma" (ZDR) ayarları seçilmesine rağmen, taleplerin yarısından fazlasının Çin merkezli laboratuvarlar tarafından incelendiği görüldü. Hatta bazı gizli test bağlantılarının, talepten haftalar sonra Pekin ve Şanghay'daki bilgisayarlarda açıldığı dijital izlerle kanıtlandı. Bu durum, verilerin sadece işlenirken değil, aracı kurumlar arasındaki aktarım sırasında da savunmasız olduğunu gösteriyor.

Olayın ardından OpenRouter platformu, güvenlik ihlalleri nedeniyle üç sağlayıcıyı sisteminden çıkardı ve 125 uç noktanın veri gizliliği onayını iptal etti. Uzmanlar, şirketlerin yapay zekâ taleplerini nereye gönderdiklerini sıkı bir şekilde kontrol etmelerini ve "canary token" gibi sahte veri tuzakları kullanarak sızıntıları takip etmelerini öneriyor. Yapay zekâ ekosisteminde en düşük fiyatı seçmek, farkında olmadan verilerinizi en yüksek riskli kanala yönlendirmek anlamına gelebilir.
