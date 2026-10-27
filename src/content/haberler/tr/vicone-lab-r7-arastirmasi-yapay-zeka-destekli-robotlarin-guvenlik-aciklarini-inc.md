---
lang: tr
title: "VicOne LAB R7 araştırması yapay zekâ destekli robotların güvenlik açıklarını inceledi"
description: "Araştırmacılar, manipüle edilmiş görsel ve işitsel girdilerin otonom robotların ve yapay zekâ modellerinin hareketlerini nasıl değiştirebileceğini ortaya koydu."
category: teknoloji
date: 2026-10-27T17:51:02.057Z
esId: "vicone-lab-r7-research-examines-security-vulnerabilities-in-ai-driven-robots"
bolge: "Küresel"
perspektif: "Bu araştırma, yapay zekâ ve robot sistemlerinin güvenlik önlemlerinin dışarıdan gelebilecek siber saldırılara ve veri manipülasyonuna karşı ne kadar hassas olduğunu göstermesi açısından kritik önem taşıyor."
why_matters: "Bu gelişme, yapay zekâ destekli robotların güvenliğinin sadece mekanik değil, siber güvenlik açıklarına karşı da test edilmesi gerektiğini ortaya koyuyor."
key_points:
  - "Gemma 4 E4B kullanılan robot köpek testinde metinler komut olarak algılandı."
  - "Nemotron ve NVIDIA Jetson AGX Orin kullanan hastane robotunda işitsel manipülasyon test edildi."
  - "ROS 2/DDS mesajı enjeksiyonu ile hareketsiz kalması gereken robot hareket ettirildi."
rakamlar:
  - etiket: "Standart"
    deger: "GB/T 45502-2025"
kaynakIzi: "v1.2cr3+EXG5srKxX9N.+Q+QAUvOV/UP5lFCpTxb9+8CbeaY8fbtoZYaKyYk2UuMO+VGJ09csCtl90LlquHLVMfE485/Nwcd9ORvUCRcpw28pItLKzYuEIdL0DF2SYb7TBhg9FKvFimWFH9qqaMoHTf6vNAk1BvT/61/DRJlwzQe"
featured: false
breaking: false
draft: false
---

VicOne LAB R7 araştırmacıları, otonom robotların ve yapay zekâ modellerinin dış dünyadan aldıkları verilerin manipüle edilmesi durumunda nasıl tepki verdiklerini inceledi. Çalışmada, robotların çevreyi algılarken kullandıkları görsel, işitsel ve metinsel girdilerin yanıltılması durumunda bile tasarlandıkları gibi çalışmaya devam edebileceği veya beklenmeyen hareketler sergileyebileceği gösterildi.

Araştırma kapsamında yapılan testlerde, vizyon-dil-eylem modelleri ve belirli robot platformları kullanılarak farklı senaryolar simüle edildi. Örneğin bir testte robot köpeğin üzerinde bulunan metinlerin birer komut gibi algılanarak hareketini değiştirdiği, başka bir simülasyonda ise insan kulağının duyamayacağı ses dalgalarının hastane servis robotunun davranışını etkilediği gözlemlendi. Bu durum, siber tehditlerin yapay zekâ kararlarını nasıl yönlendirebileceğini gözler önüne serdi.

Sistemlerin güvenliğini sağlamak için kullanılan bağımsız koruyucu mekanizmaların da benzer şekilde veri manipülasyonundan etkilenebileceği belirtildi. Yapılan bir test sırasında, ROS 2 ve DDS mesajlarının enjekte edilmesiyle hareketsiz kalması beklenen bir robotun hareket ettiği görüldü. Bu tür güvenlik açıklarının, kazara oluşan arızalardan farklı olarak kasıtlı ve tekrarlanabilir saldırılara kapı aralayabileceği vurgulandı.

Uzmanlar, güvenlik ve siber güvenlik ekiplerinin robotların güvendiği tüm girdileri tek tek haritalandırması gerektiğine dikkat çekiyor. Çin'in GB/T 45502-2025 standardı, IEC TS 63074 ve Avrupa Birliği Makine Yönetmeliği gibi düzenlemeler, güvenlik sistemlerinin siber tehditlere karşı korunmasını zorunlu kılıyor. Şirketlerin, robotları sahaya sürmeden önce bu tür manipülasyon senaryolarını test etmesi ve operasyon sırasında davranışları sürekli izlemesi öneriliyor.
