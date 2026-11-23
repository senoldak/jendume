---
lang: tr
title: "Netflix yazılım geliştirme süreçlerini yapay zekâ kodlama ajanlarına uyarladı"
description: "Netflix mühendisleri, Claude Code gibi yapay zekâ kodlama ajanlarının güvenle görev yapabilmesi için yazılım geliştirme yaşam döngüsünü yeniden düzenledi."
category: teknoloji
date: 2026-11-23T19:50:53.758Z
esId: "netflix-retrofitted-software-development-lifecycle-for-ai-coding-agents"
bolge: "ABD"
perspektif: "Bu gelişme, yapay zekâ ajanlarının yazılım mühendisliğinde güvenle kullanılabilmesi için dokümantasyon ve bağlam mühendisliğinin ne kadar kritik olduğunu gösteriyor."
why_matters: "Yapay zekâ kodlama ajanlarının büyük ölçekli şirket yazılımlarında güvenle ve verimli bir şekilde kullanılabilmesi için standartların ve bağlam mühendisliğinin önemini kanıtlıyor."
key_points:
  - "Yıl boyunca temel bir serviste birinci seviye olay yaşanmadı"
  - "Çekme istekleri yıldan yıla %32 arttı"
  - "Geliştirici Net Tavsiye Eden Skoru eksi üçten artı yirmi beşe çıktı"
rakamlar:
  - etiket: "Yıllık artış"
    deger: "%32"
  - etiket: "NPS artışı"
    deger: "-3'ten +25'e"
kaynakIzi: "v1.o2iIJUByjTBddXGv.054T0frLJ+uO/srcrLPy+CZUwLOJuw2TyQFOE2DBbej7CCEuI02yErNCZ6lSidNc3ScqzX/dY2CkrizgflN2Dp1RsiHxzHdOld+BXI4D1tuCKwf85j126eI7KzQNeQLw+PAnmZHL3D9Nj84hIjlpkNDQUv1kotd8INUBID2CmQ68koz1NrSZIUMpScEsr1cih5WNj9m3KPps0Bciz1ufrKvphd5PgNJChp64AiiCKA+mKwDFBJjmpUHJoO5tl4YhEe9xQ65l9Jy1AXcXOdSYWQ=="
kaynakAdlari:
  - ad: "InfoQ"
    url: "https://www.infoq.com/news/2026/11/netflix-sdlc-ai-coding-agents/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

Netflix kıdemli yazılım mühendisi Mark Khuzam, San Francisco'daki bir etkinlikte şirketin Ticaret ekibinin yazılım geliştirme yaşam döngüsünü yapay zekâ kodlama ajanlarına göre nasıl güncellediğini anlattı. Khuzam, bu sürecin temel olarak ajanlardan ziyade dokümantasyon, tutarlılık ve gözden geçirme süreçleriyle ilgili olduğunu belirtti. Ekibin ilk denemelerinde ajanların testleri migrate etmekte zorlandığı, dokümanların ise ajanların bağlam penceresine sığmayacak kadar dağınık olduğu görüldü.

Bu sorunu çözmek için ekip 'bağlam mühendisliği' yaklaşımını benimseyerek hem insanların hem de ajanların okuyabileceği 45 mimari karar kaydı kaleme aldı. Proje talimat dosyası olarak AGENTS.md kullanılırken, dokümanların kolayca bulunabilmesi sağlandı. Kod yazıldıktan sonra ise CI boru hattına entegre edilen bir inceleme ajanı, çekme isteklerini dokümanlara göre önceden inceleyerek olası hataları ve anti-pattern'leri raporlamaya başladı.

Değişiklikler sonucunda çekme isteklerinin sayısı yıldan yıla %32 artış gösterirken, temel bir serviste 2026 yılı boyunca birinci seviye olay yaşanmadı. Geliştirici Net Tavsiye Eden Skoru ise eksi üçten artı yirmi beşe yükseldi. Ekip, tüm ajanların ve araçların tutarlı bilgiye erişebilmesi için alan başına GraphRAG modelini benimsedi.

Khuzam sunumunu, ajanların ne yapması gerektiğine karar verilmesi, bu işin nasıl yapılacağının kolaylaştırılması ve insan yargısının her zaman önemli olduğunun unutulması gerektiği yönündeki üç kuralla tamamladı.
