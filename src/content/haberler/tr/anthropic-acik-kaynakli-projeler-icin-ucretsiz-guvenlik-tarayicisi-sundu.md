---
lang: tr
title: "Anthropic açık kaynaklı projeler için ücretsiz güvenlik tarayıcısı sundu"
description: "Anthropic, kritik açık kaynaklı projeler için Claude modellerini kullanan ücretsiz ve isteğe bağlı bir güvenlik tarayıcısı olan OSS Scanner aracını duyurdu."
category: teknoloji
date: 2026-10-25T13:50:57.227Z
esId: "anthropic-launches-free-ai-vulnerability-scanner-for-open-source-projects"
bolge: "Küresel"
perspektif: "Açık kaynaklı projelerdeki güvenlik açıklarının yapay zekâ ile otomatik olarak taranması, dijital altyapının güvenliğini hızla artırırken geliştirici ekiplerin iş yükünü de dönüştürüyor."
why_matters: "Açık kaynaklı yazılımların yapay zekâ ile otomatik taranması, kritik dijital altyapıların güvenliğini hızla artırırken yazılım geliştirme süreçlerini yeniden şekillendiriyor."
key_points:
  - "OSS Scanner, Anthropic'in en güçlü modelleriyle açık kaynak projelerini tarıyor."
  - "İlk 11 günde 77 kritik ve 803 yüksek seviyeli bulgu raporlandı."
  - "İncelenen bulguların yüzde 88'i geçerli güvenlik kriterlerini karşıladı."
rakamlar:
  - etiket: "Kritik bulgu"
    deger: "77"
  - etiket: "Yüksek bulgu"
    deger: "803"
  - etiket: "Doğruluk oranı"
    deger: "%88"
kaynakIzi: "v1.vonCJRhdvVIzdMG4.ltYH4VDy6nZ+mDjZoPht6Mf3UBt2e7nUv/4l+gUJbH84KWEsafz45r4tKStjv5vcQMoo4awNUWikg/JMCXdBMFaCJZNh52qAjO3o8HUHhl8aEhWP+CAXEV+QoAmWcwLH8IcL+WS9v5vrIIYC0yimuOKQj1ibsuC7cs/xaVDLvZGivCICLey9ULLdY2+G7/EWJrt4CxNgcA=="
featured: false
breaking: false
draft: false
---

Anthropic, kritik açık kaynaklı yazılım projeleri için geliştirilen ve Claude modellerini kullanan ücretsiz bir güvenlik tarayıcısı olan OSS Scanner'ı kullanıma sundu. Sistem, projelerin kod tabanlarını otomatik olarak tarayarak güvenlik açıklarını tespit ediyor ve raporları insan incelemesinden geçmeden doğrudan proje yöneticilerine iletiyor. Bu yaklaşım raporlama sürecini hızlandırırken, filtreleme yükünü doğrudan yazılım ekiplerine bırakıyor. Aracın duyurulduğu dönemi takip eden ilk 11 gün içinde model tarafından 77 kritik ve 803 yüksek seviyeli bulgu raporlandı. Sistem, Anthropic'in en güçlü modellerini kullanarak açık kaynak ekosistemindeki projelere otomatik denetim desteği sağlıyor.

Sistemin arkasındaki altyapı tamamen Anthropic tarafından ücretsiz olarak sağlanıyor. Proje yöneticileri bir Dockerfile sağlayarak sisteme katılabiliyor ve denetimler internet erişimi olmayan izole sanal makinelerde gerçekleştiriliyor. Yapay zekâ ajanları hataları iki kez kontrol ederek kök neden analizleri yapıyor ve mümkün olduğunca yama önerileri sunuyor. Yapılan testlerde, incelenen 97 kritik ve yüksek bulgunun yüzde 88'inin şirketin güvenlik kriterlerini karşıladığı ve yalnızca 1 bulgunun hatalı pozitif çıktı verdiği belirlendi. Tasarım sürecinde Google'ın OSS-Fuzz projesinden ilham alınırken, geleneksel test araçlarının yerini dil modelleri aldı.

Açık kaynak ekosisteminde geniş yankı uyandıran bu araç, wolfSSL ve curl gibi popüler projeler tarafından da kullanılmaya başlandı. Örneğin curl ekibi, bu tarayıcı sayesinde kritik bir güvenlik açığını yamayarak yeni sürümünü yayımladı. Anthropic, siber güvenlik alanındaki bu tür otomasyon araçlarının açık kaynak güvenliğini dönüştürmede önemli bir eşik olduğunu vurguluyor. Şirket, güvenlik açıklarının tespiti ve koordineli açıklama süreçlerinde elde edilen bu başarıların, yapay zekâ modellerinin siber güvenlik yeteneklerindeki ilerlemeyi doğrudan yansıttığını belirtiyor.
