---
lang: tr
title: "Linus Torvalds Linux çekirdeği kodlamasında yapay zekâ kullanmaya başladı"
description: "Linux yaratıcısı Linus Torvalds, bellek önbelleği darboğazını çözmek için Anthropic’in Claude Code aracını kullanarak ilk yama serisini yayımladı."
category: teknoloji
date: 2026-10-17T09:50:58.218Z
bolge: "Küresel"
perspektif: "Yazılım dünyasının en önemli isimlerinden birinin yapay zekâ araçlarını doğrudan çekirdek kod yazımında benimsemesi, geliştirici alışkanlıklarında ve endüstri standartlarında büyük bir kırılma noktası oluşturuyor."
why_matters: "Linux çekirdeğinin geliştirilmesinde yapay zekâ kullanımının başlaması, yazılım mühendisliği dünyasında yapay zekânın rolünü kökten değiştiren tarihi bir eşiktir."
key_points:
  - "Sekiz iş parçacıklı testlerde okuma hızı saniyede 33 milyona çıktı."
  - "Okuma başına çekirdek döngüsü 2.950'den 725'e düştü."
  - "Çalışma, Anthropic’in Claude Code aracı kullanılarak gerçekleştirildi."
kaynakIzi: "v1.246BNLFo46XFP1iy.QL+A/z+cgCswGSOG+k/IY2kAGDLly/79rBZJ3FWgyGjrqNVrRXeaEFFsX5FGTlSxwzuJpPWpyNKP0m+bVw1iOGm13A9kuh+EAsFmS9xQOdRwTHTxg2xYXuIcryZOuI8nRzKJjprWS7gJhcnoqtR/0Hv7F9MFeMOhJWlEy2YmcsE="
featured: false
breaking: true
draft: false
---

Yazılım dünyasında çığır açan bir gelişme olarak, Linux çekirdeğinin yaratıcısı Linus Torvalds, yapay zekâ destekli kodlama asistanlarını ilk kez ana çekirdek geliştirmesinde kullandığını açıkladı. Torvalds, Anthropic tarafından geliştirilen Claude Code aracının yönlendirmesiyle, çoklu çekirdek ve işlemci kullanımında ortaya çıkan bellek önbelleği yavaşlama sorununu çözen sekiz yamalık bir seri yayımladı.

Söz konusu sorun, birden fazla iş parçacığının aynı önbelleğe alınmış dosyadan küçük okumalar yapması durumunda paylaşılan önbellek hattı üzerinde işlemci çekirdeklerinin rekabet etmesine yol açıyordu. Bu durum, özellikle belirli iş yüklerinde performansı ciddi ölçüde düşürüyordu. Torvalds ve yapay zekâ aracının geliştirdiği yamalar, bellek yeniden kullanımını bir RCU geçiş süresine kadar erteleyerek bu darboğazı ortadan kaldırmayı hedefliyor.

Gerçekleştirilen testlerde elde edilen performans artışları oldukça dikkat çekici seviyelere ulaştı. Sekiz iş parçacıklı testlerde okuma verimliliği saniyede yaklaşık 10 milyondan 33 milyon seviyesine yükselirken, okuma başına düşen çekirdek döngüsü sayısı 2.950'den 725'e geriledi. Buna rağmen, bellek yönetimi ve henüz çözülemeyen bazı istisna durumları nedeniyle kodun ana Linux 7.3-rc6 sürümüne dahil edilip edilmeyeceği henüz netlik kazanmadı.

Geçmiş yıllarda yapay zekâya karşı temkinli yaklaşan Torvalds, son dönemdeki açıklamalarında teknolojinin doğru kullanıldığında yazılım geliştirmeyi çok daha keyifli hale getiren harika bir araç olduğunu belirtti. Dünyanın en bilinen yazılım yöneticilerinden birinin kritik çekirdek kodları için yapay zekâ desteğine başvurması, yapay zekâ araçlarının yazılım mühendisliğindeki yerini kalıcı olarak sorgulatıyor ve dönüştürüyor.
