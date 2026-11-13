---
lang: en
title: "Pyramid-JiT image generation model delivers high performance at low cost"
description: "Developed by Linum, Pyramid-JiT sets a new efficiency standard in image generation with a budget of just $21,000."
category: yapay-zeka
date: 2026-11-13T11:50:51.330Z
esId: "pyramid-jit-gorsel-uretim-modeli-dusuk-maliyetle-yuksek-performans-sunuyor"
bolge: "Global"
perspektif: "This development proves that AI training processes, which typically require massive budgets, can be achieved at much lower costs through more efficient architectures."
why_matters: "This development demonstrates that cost efficiency in training AI models can be improved, contributing to the democratization of the technology."
key_points:
  - "$21,000 low training cost"
  - "Efficient architecture operating directly in pixel space"
  - "Open weights for developer access"
rakamlar:
  - etiket: "Training cost"
    deger: "$21,000"
  - etiket: "Parameter count"
    deger: "2.18 billion"
  - etiket: "Training time"
    deger: "8,139 hours"
  - etiket: "Training examples"
    deger: "660 million"
kaynakIzi: "v1.rRKrbHHA6lsIOXU0.NUQvLXDt3uzNZryCkuqQT6vDgH8jU4QMktB7NQOU9fVU+VPUcKX+Ge6i6ARmRN57xmpJiKRGz7W3r/x5qvGGeyhUYG2TzwUqh4dmqnQlTBhXMDFPiQ3N/iyHLk5xqOsw5ViXs5wbNnV8s72ZV6TPynoVQi14o5+ohr1uyeQqOu1cgPz66LtTXiqjq7x6plMz"
kaynakAdlari:
  - ad: "DonanımHaber"
    url: "https://www.donanimhaber.com/iki-arastirmaci-sadece-21-bin-dolara-yapay-zeka-gelistirdi--212866"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

Linum researchers have achieved a breakthrough in the world of image generation by releasing a new model called Pyramid-JiT (P-JiT). Developed with a training cost of just $21,000, this model proves that image generation technologies, which typically require massive budgets, can be made more accessible. By releasing the model's open weights, the team is allowing independent developers and researchers to examine and build upon this technology within their own systems.

The success of P-JiT lies in an architecture that differs from traditional models. While most image generation models convert data into a compressed "latent space" before processing, P-JiT operates directly in pixel space. By dividing images into 32x32 pixel segments, the model uses a pyramid-like approach to first create a low-resolution draft, then gradually upscale it. This method significantly reduces computational complexity, thereby accelerating the training process.

The training process was completed using 8,139 hours of NVIDIA H100 GPU time. The 2.18 billion parameter model, trained on a total of 660 million examples, utilizes the Qwen3.5-4B model for text processing. This efficiency could provide significant advantages in fields that require processing much larger amounts of data, such as video generation.

However, the model still has some limitations. Due to the lack of text-heavy images in its training data, P-JiT struggles with designs containing text, such as posters or infographics. Nevertheless, this work challenges the perception in the AI world that "larger budgets always mean better results," demonstrating that efficient architectures can achieve significant results even with small teams.
