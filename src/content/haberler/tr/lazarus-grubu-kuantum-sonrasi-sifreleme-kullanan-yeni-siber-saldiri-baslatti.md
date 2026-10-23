---
lang: tr
title: "Lazarus grubu kuantum sonrası şifreleme kullanan yeni siber saldırı başlattı"
description: "Lazarus siber casusluk grubu, yapay zekâ destekli sahte siteler ve kuantum sonrası şifreleme mekanizmaları içeren yeni bir saldırı dalgası başlattı."
category: teknoloji
date: 2026-10-23T11:51:02.167Z
esId: "lazarus-group-launches-new-cyber-attack-using-post-quantum-encryption"
bolge: "Küresel"
perspektif: "Saldırganların yapay zekâ ve ileri düzey şifreleme yöntemlerini silah haline getirmesi, geleceğin siber güvenlik tehditlerinin ne kadar karmaşık olacağını gösteriyor."
why_matters: "Saldırganların yapay zekâ ve ileri düzey şifreleme yöntemlerini silah haline getirmesi, geleceğin siber güvenlik tehditlerinin ne kadar karmaşık olacağını gösteriyor."
key_points:
  - "Eylül 2025 tarihinde açılan sahte GitHub Pages sitesinde yapay zekâ ürünü portre kullanıldı."
  - "Saldırılarda TouchHub ve ClientHub adında iki yeni araç devreye sokuldu."
  - "Güncellenen LPEClient aracı ML-KEM-1024 kuantum sonrası şifreleme mekanizmasını kullanıyor."
rakamlar:
  - etiket: "Açılış tarihi"
    deger: "Eylül 2025"
  - etiket: "Şifreleme mekanizması"
    deger: "ML-KEM-1024"
kaynakIzi: "v1.psF16p7BbtC6gfIx.8jheamcOMDDCJkGUojEymuim4nrQXiuWYsFaLsWX+h5LDHbBicSTNhMe2uQaBr67fyrQV7Jpx27YQH8sm5i/wixWBnwWpGtdE/SDna2siJ1pqVQ8wUdgZry3r0eWs6hHmxQ5O33LLyESpqbubuWb26e0f6hyVAVwMS/snZ32"
featured: false
breaking: false
draft: false
---

Araştırmacılar, Lazarus grubunun Operation SyncHole harekâtıyla bağlantılı yeni bir siber saldırı dalgası başlattığını ortaya koydu. Yapılan detaylı analizler, tehdit aktörlerinin yöntemlerini zamana yayarak geliştirdiğini ve bu faaliyetleri çok daha kalıcı bir boyuta taşıdığını ortaya koyuyor. Kampanya çerçevesinde, Eylül 2025 döneminde yayına alınan ve sahte bir öz geçmiş barındıran bir GitHub Pages web sayfası tespit edildi. İlgili sayfada yer alan ve yapay zekâ marifetiyle oluşturulan portre görseli, saldırganların sahte internet sitelerini kurbanlara özel olarak tasarlarken yapay zekâ teknolojisinden faydalandığını kanıtladı.

Söz konusu zararlı faaliyet, hedef alınan kişilere özel olarak hazırlanan portfolyo ile öz geçmiş sayfalarına yönlendiren bağlantıların bulunduğu oltama e-postaları yoluyla hayata geçiriliyor. Elde edilen bulgular, tehlikeli web sitesinin ziyaret edilmesinin Güney Kore sınırları içinde yaygın olarak tercih edilen bir güvenlik eklentisi ile kimlik doğrulama aracı olan CrossWeb EX üzerinden bir bulaşma zincirini tetikleme olasılığının hayli yüksek olduğunu işaret ediyor. Bu doğrultuda, saldırının bahsi geçen yazılımdaki potansiyel bir zafiyetten faydalanılarak gerçekleştirildiği ve bilgisayarlara ilk sızma kapısını araladığı değerlendiriliyor. Daha evvel de ilgili finansal güvenlik yazılımında benzer bir açık bulunduğunu tasdik eden resmi bildirimler kamuoyuyla paylaşılmıştı.

Saldırganlar, ellerindeki mevcut zararlı yazılımların güncel sürümlerini daha önce belgelere yansımayan TouchHub ve ClientHub adındaki iki yeni bileşenle birleştiriyor. Temel gayesi siber casusluk olan bu unsurlar, hedeflenen bilgisayarlara ilave zararlı yazılımlar aktarıyor, çeşitli komutlar koşturuyor ve saldırıyı düzenleyenlerle sürekli bağlantı kuruyor. Bu yeni araçlardan birinin, operatörleriyle veri alışverişi yapmak amacıyla Dropbox altyapısını kullanan bir türevine de ulaşıldı. Operasyonda ayrıca, Lazarus ekibinin uzun süredir ele geçirdiği cihazlardan bilgi toplamak ve ek zararlı yüklemek amacıyla kullandığı LPEClient aracının yenilenen bir versiyonuna da rastlandı.

Güncellenen LPEClient yazılımı, hedef sistemlerde kurulu olan güvenlik programlarını, Windows korumalarını ve diğer donanımsal ile yazanımsal özellikleri titizlikle tarıyor. Akabinde bu bilgileri sıkıştırıp şifreleyerek uzak sunuculara aktarıyor. Sürümün dikkat çeken bir diğer yönü ise ilerleyen dönemde ortaya çıkabilecek kuantum bilgisayarların olası kırılmalarına karşı iletişimi emniyete almak üzere geliştirilen ML-KEM-1024 isimli kuantum sonrası kriptografik algoritmayı barındırmasıdır. Zararlı yazılım, ek araçları sisteme indirip doğrudan bellek üzerinde çalıştırmadan evvel saldırganların sunucusuyla güvenli tünel kurmak için bu şifreleme yöntemine başvuruyor. Güvenlik sistemlerinin dikkatinden kaçmak amacıyla bellek koruma parametrelerini değiştiren ve izleme mekanizmalarını devre dışı bırakan yapılar, saldırının tespit edilmesini zorlaştırıyor.
