---
lang: en
title: "Dragos research exposes massive data theft by AI inference providers"
description: "Security researchers uncovered that low-cost AI service intermediaries are intercepting user data and stealing cloud credentials."
category: perspektif
date: 2026-11-22T13:50:55.437Z
esId: "dragos-arastirmasi-yapay-zeka-saglayicilarindaki-buyuk-veri-sizintisini-ortaya-c"
bolge: "Global"
perspektif: "This development shows the security risks posed by AI routers and intermediaries. In an ecosystem where the lowest bidder might be harvesting your data, supply chain security is becoming a mandatory requirement for both corporate and personal AI usage."
why_matters: "The failure of AI intermediaries to uphold privacy promises means that corporate secrets and personal data are being leaked globally through the AI supply chain."
key_points:
  - "2 million fake requests revealed active data theft by 3 AI providers"
  - "OpenRouter revoked security approvals for 125 endpoints following the findings"
rakamlar:
  - etiket: "Test Requests"
    deger: "2 million"
  - etiket: "Revoked Endpoints"
    deger: "125"
  - etiket: "Compromised Providers"
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

A study conducted by security firm Dragos has demonstrated the fragility of data security in the AI sector. Between July and November 2026, researchers sent approximately 2 million requests containing fake credentials to various AI providers. The findings revealed that at least three providers were compromised, with attackers actively harvesting user data without the providers' knowledge.

In the most significant incident, attackers were found to have collected hundreds of AWS keys, testing them within hours to scan S3 storage and establish persistent access. The research also showed that some marketplace resellers did not even need to exploit vulnerabilities, as simply listing a model at the lowest price and enabling data logging was sufficient to intercept and read customer requests in plain text.

Privacy promises such as "Zero Data Retention" (ZDR) were frequently ignored. Even when requests were routed through US-based providers, secret test URLs were accessed by external labs in more than half of all cases. Digital traces showed that confidential links appeared in internal chats in Beijing and Shanghai weeks after the initial request, proving that data remains vulnerable throughout the entire supply chain.

Following the disclosure, OpenRouter removed three providers from its platform and revoked ZDR approval for 125 endpoints as a precautionary measure. Experts warn that organizations must strictly control how their AI requests are routed and implement "canary tokens", which are fake credentials that alert owners when used, to detect unauthorized access. Choosing an AI provider based solely on the lowest price may inadvertently lead to data exposure through insecure intermediaries.
