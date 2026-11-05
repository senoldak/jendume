---
lang: en
title: "OpenAI’s new text watermarking tool struggles to meet European Union standards"
description: "OpenAI’s textGrain tool, designed to identify AI-generated content, faces challenges with short texts and editing, raising compliance concerns under EU law."
category: dunya
date: 2026-11-05T15:50:54.353Z
esId: "openai-nin-yeni-metin-isaretleme-araci-avrupa-birligi-kurallarini-karsilamakta-z"
bolge: "Europe"
perspektif: "The verifiability of AI content is critical for digital trust and regulatory compliance."
why_matters: "The verifiability of AI content is critical for digital trust and regulatory compliance."
key_points:
  - "Detection struggles with texts under 150 words"
  - "A 25% word change drops detection to 17%"
  - "Non-compliance could lead to fines up to 7% of income"
rakamlar:
  - etiket: "False-positive rate"
    deger: "1%"
  - etiket: "400-token success"
    deger: "95%"
  - etiket: "Potential penalty"
    deger: "7%"
kaynakIzi: "v1.aw3yvJnEVfw/7CfG.A6C917w5aWkZ1kfO91GVGZBNKPql8/w5DsWr9l+kc7ZB8Cc9s4dB2BY87NdqS0aGuzeFx0aYel6fe3408Hz5/DnOihjZldQWZPwg4R2uFE4e3mWbKSdM5bVfQZp1GQcTpPKhUmC1UOsBeLDBCUhPHHbm"
kaynakAdlari:
  - ad: "IEEE Spectrum"
    url: "https://spectrum.ieee.org/ai-watermark-openai-textgrain-europe"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

The European Union has implemented new regulations requiring AI-generated content to be clearly marked for transparency. In response, OpenAI developed a new watermarking technology called "textGrain." However, initial tests indicate that this tool struggles to maintain its detection capabilities, particularly when dealing with short texts or content that has been edited.

AI models function by calculating the probabilities of subsequent words. Watermarking technology inserts a statistical pattern into this process using a secret key, which a detector can then identify to verify if the content was machine-generated. Yet, textGrain faces significant hurdles in maintaining this signal when passages are under 150 words or when as little as 25 percent of the text is altered.

Current regulations mandate that AI systems must be "effective, interoperable, robust, and reliable." If textGrain fails to meet these legal benchmarks, OpenAI could face penalties of up to 7 percent of its annual income. Experts emphasize that the system's efficacy requires independent verification and suggest that the technology should be made open-source to allow for more transparent testing and scrutiny.

According to current test results, the detection rate for 200-token passages is approximately 80 percent, rising to 95 percent for 400-token passages. However, minor edits can drastically reduce these figures. For instance, replacing just 10 percent of the words with synonyms drops the detection rate to 66 percent, while replacing 25 percent of the words causes it to plummet to 17 percent. This highlights the technical complexity of reliably identifying AI-generated content as models become more sophisticated.
