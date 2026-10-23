---
lang: tr
title: "LiteLLM, Claude Code kaynaklı sızıntı sonrasında yazılımına sızıldığını açıkladı"
description: "Yapay zekâ ağ geçidi LiteLLM, Claude Code tarafından sızdırılan GitHub jetonlarının korsanlar tarafından kullanılmasıyla yazılımının zehirlendiğini duyurdu."
category: teknoloji
date: 2026-10-23T09:50:57.526Z
esId: "litellm-reports-software-compromise-following-github-token-leaks-via-claude-code"
bolge: "Küresel"
perspektif: "Bu olay, yapay zekâ kodlama asistanlarının ve yazılım tedarik zincirlerinin güvenliğinin ne kadar kritik olduğunu ve siber saldırganların yapay zekâ araçlarını nasıl hedef alabildiğini gösteriyor."
why_matters: "Yapay zekâ kodlama araçlarının güvenliği ve tedarik zinciri zafiyetleri, şirketlerin tüm bulut ve API altyapısının ele geçirilmesine yol açabilecek büyük riskler barındırıyor."
key_points:
  - "Zehirli 1.107.0 sürümü PyPI üzerinde yaklaşık iki saat yayında kaldı"
  - "ClickPy verilerine göre zehirli sürüm yaklaşık 49.000 kez indirildi"
  - "Zararlı yazılım tarayıcı şifreleri, bulut anahtarları ve yapay zekâ API anahtarlarını hedef aldı"
rakamlar:
  - etiket: "İndirme sayısı"
    deger: "49.000"
kaynakIzi: "v1.5RQkCypAEPPbGWz9.wCTSo8t+QfVzuJgRLdN0OKHDpDdPhgWNmtG0SpLh7BygI86s57FYkKdr3jUNqBZQSZ0uMUeY8StdmijpZaK/bLezLFlPntQqrNzqd9Ev2BykUmiJYnFkQHwPh4axLyIArL5z7LUAWXJRjG6l/PMTFpVa1xk3uq4="
featured: false
breaking: true
draft: false
---

Açık kaynaklı yapay zekâ ağ geçidi LiteLLM, korsanların kendi loglarından elde ettikleri anahtarları kullanarak yazılımının zararlı bir versiyonunu yayımladığını açıkladı. Şirketin üst düzey yöneticileri tarafından imzalanan olay raporunda, Anthropic’in kodlama asistanı Claude Code’un kullanıcıların GitHub komut satırı giriş jetonlarını yanıtlarına yansıttığı belirtildi. LiteLLM, saldırganların bu dağıtıma erişerek OAuth jetonlarını elde ettiğini ve yayın iş akışını ele geçirdiğini kaydetti.

Zehirli sürüm olan 1.107.0, Python paket indeksi PyPI üzerinde Ekim ayında yaklaşık iki saat boyunca yayında kaldı. Güvenlik firması Wiz, paketin içerisinde bir kimlik bilgisi hırsızı ve arka kapı barındırdığını, bu zararlı yazılımların tarayıcı şifrelerini, bulut anahtarlarını ve yapay zekâ servislerine ait API anahtarlarını hedef aldığını bildirdi. ClickPy verilerine göre zehirli sürüm yaklaşık 49 bin kez indirildi.

Saldırganlar, üç geliştiricinin GitHub kimlik bilgilerini ele geçirerek dal korumasını devre dışı bıraktı ve üretim sürümünü onayladı. Güvenlik araştırmacıları, hırsızlık sonrasında saldırganın Amazon Web Services kimlik bilgilerini test ettiğini ve Amazon Bedrock üzerinde modelleri listelediğini belirtti. Bu durum, çalınan bulut erişimlerinin yapay zekâ modellerini çalıştırmak için kullanıldığı LLMjacking faaliyetleriyle örtüştü.

LiteLLM, kullanıcıların 1.106.2 veya daha eski bir sürümü sabitlemelerini, kötü amaçlı dosyaları silmelerini ve etkilenen makinelerin erişebileceği tüm gizli anahtarları yenilemelerini tavsiye etti. Kurumsal müşterilerin özel kayıt defterinden veri çekenlerin ise bu saldırıdan etkilenmediği açıklandı.
