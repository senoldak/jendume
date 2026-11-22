---
lang: tr
title: "AWS Lambda artık GPU desteğiyle yapay zekâ modellerini çalıştırıyor"
description: "AWS, sunucusuz bilgi işlem platformuna GPU desteği ekleyerek yapay zekâ modellerinin devreye alınmasını kolaylaştırdı."
category: teknoloji
date: 2026-11-22T07:50:47.978Z
esId: "aws-lambda-now-supports-gpu-accelerated-ai-model-inference"
bolge: "Küresel"
perspektif: "Bu gelişme, karmaşık altyapı yönetimi gerektirmeden yapay zekâ modellerini çalıştırmayı mümkün kılarak geliştiricilerin iş yükünü azaltıyor ve yapay zekâ uygulamalarının yaygınlaşmasını hızlandırıyor."
why_matters: "Lambda'nın GPU desteği, sunucusuz mimaride model dağıtımını standart EC2 süreçlerine göre daha yönetilebilir ve ölçeklenebilir bir yapıya kavuşturuyor, bu da geliştiricilerin operasyonel yükünü hafifletiyor."
key_points:
  - "Tek GPU üzerinde 48 eşzamanlı çağrı desteği"
  - "Ortam başlatma sürelerinde %70'e varan azalma"
  - "Konteyner görüntüleri için 32 GB sınır"
rakamlar:
  - etiket: "Eşzamanlı çağrı"
    deger: "48"
  - etiket: "Yönetim ücreti"
    deger: "%9,75"
  - etiket: "Başlatma süresi iyileştirmesi"
    deger: "%70"
  - etiket: "Konteyner sınırı"
    deger: "32 GB"
kaynakIzi: "v1.+uhOVIHbS3h6qbgX.TlZHjHAAK0v0XSHlTyH/MAHtS85ID4eR5oJCdQ9ub2wVxwrkvXbDTFSF0GUxhJXRX7+sG7j9f+8sd+hSOQxocVIBrZZEHDY6oBLUUvu0r3fkaC5t7av4eUNd+iZcHPpfCQ2v3wEh6CgzhZaOXSUmoHTunLbC5gePhLqBRwjoIum2LS7KKyzuxeWbswcnvYxzOfcIWHfZy+0OtHCFPbOxQ2rD/mGmcVaccjGIKqDzKWa74lhEQ0+NTk1KdURd4P+/lBqJwtm+OjLKJjEBC8NtYx3tsQ=="
kaynakAdlari:
  - ad: "InfoQ"
    url: "https://www.infoq.com/news/2026/11/aws-lambda-gpu-managed-instances/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

AWS, sunucusuz bilgi işlem platformu Lambda'ya GPU desteği ekledi. Geliştiriciler, karmaşık altyapı yönetimi, sürücü güncellemeleri veya küme yapılandırmalarıyla uğraşmadan doğrudan EC2 G-serisi örnekleri üzerinde yapay zekâ modellerini devreye alabiliyor. Bu özellik, Managed Instances ve G-serisi örneklerinin bulunduğu ticari bölgelerde kullanıma sunuldu. Fiyatlandırma, EC2 isteğe bağlı oranına ek olarak %9,75 yönetim ücreti ve milyon istek başına 0,20 dolar standart ücret üzerinden hesaplanıyor.

Tek bir GPU üzerinde 48 eşzamanlı çağrı aynı model kopyasını paylaşıyor. Bu yapı kaynak verimliliğini artırıyor. Geliştiriciler konteyner görüntülerini kullanarak modellerini Lambda ortamına taşıyor; sistem ölçeklendirme ile provizyon işlemlerini otomatik yönetiyor. Özel yükleme teknolojileri sayesinde ortam başlatma süreleri %70'e kadar kısalıyor. AWS; CUDA, PyTorch, vLLM ve SGLang gibi araçları içeren beş temel GPU görüntüsü sunuyor.

Yapay zekâ uygulamalarının yaygınlaşması önündeki teknik engeller azalıyor. Daha önce GPU tabanlı bir model çalıştırmak için karmaşık sunucu yönetimi gerekirken, şimdi bir yapılandırma değişikliği yeterli oluyor. Konteyner görüntüleri 32 GB, 32 GB geçici depolama, 2 ila 32 GB bellek ve 3 ila 48 GB hızlandırıcı bellek sınırlarına sahip. Asenkron çağrılar için 90 dakikaya kadar zaman aşımı süresi uygulanıyor.

Sistemde yalnızca olay tabanlı fonksiyonlar destekleniyor; web tabanlı HTTP sunucuları için henüz bir çözüm sunulmuyor. Yeni bir hesapta GPU vCPU kotası başlangıçta sıfır tanımlandığı için kullanıcıların bu kotayı artırması gerekiyor. Sunucusuz mimaride GPU gücüne erişim, yapay zekâ projelerinin geliştirilme hızını artırıyor.
