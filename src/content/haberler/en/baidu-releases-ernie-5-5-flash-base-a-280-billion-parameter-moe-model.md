---
lang: en
title: "Baidu releases ERNIE 5.5 Flash Base, a 280-billion parameter MoE model"
description: "Baidu has launched ERNIE 5.5 Flash Base, a sparse Mixture-of-Experts language model featuring 280 billion total parameters and 14 billion active parameters per token."
category: teknoloji
date: 2026-11-06T03:50:49.594Z
esId: "baidu-280-milyar-parametreli-yeni-yapay-zeka-modeli-ernie-5-5-flash-base-i-tanit"
bolge: "Global"
perspektif: "This new base model provides developers with a clean starting point for fine-tuning and comparing various training methods efficiently."
why_matters: "The release gives the AI community a powerful and efficient sparse base model to test, fine-tune, and advance large-scale language applications."
key_points:
  - "280B total parameters, 14B active per token"
  - "Score of 78.4 on MMLU-Pro benchmark"
  - "Context support up to one million tokens for fine-tuning"
rakamlar:
  - etiket: "Total parameters"
    deger: "280B"
  - etiket: "Active parameters"
    deger: "14B"
  - etiket: "MMLU-Pro score"
    deger: "78.4"
kaynakIzi: "v1.3pkit77nA1DjcOJ4.lff/OSO52/yPiOaHnWMDH5II4pF5IXdPpOI5Qa0Ygu7fieSOBM9WCCXpWrDBEBbH0vauktlRyeOR/MgmUeUiTG7nLPYMRmB25ivNQlwaiTo9Pz+T+TVHLvrK4WfOJoxxW+/QlmGK8LhrrYJ4DOoZ2P9rhC8LHxk0RuzYng=="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/05/baidu-ernie-5-5-flash-base-280b-moe/"
haberDegeri: 92
featured: false
breaking: false
draft: false
---

Baidu has introduced an open sparse mixture of experts language model checkpoint known as ERNIE 5.5 Flash Base. The text model contains a total of 280 billion parameters while activating 14 billion parameters per token. The weights stop at the conclusion of pre-training without any intermediate training applied, offering a clean baseline for teams aiming to evaluate fine-tuning or instruction-tuning methods.

The architecture optimizes compute and long-context costs, relying heavily on repository-scale code and extended context material during pre-training. Consisting of 43 layers, the text-only model incorporates hybrid attention mechanisms and multi-router latent experts. Additionally, an innovative mechanism named ECHO reuses the backbone's final layer to function as a built-in draft model for speculative decoding.

According to benchmarks shared by Baidu, the model achieved the best scores across a majority of evaluated base-model tasks in their unified pipeline. It recorded a score of 78.4 on the MMLU-Pro benchmark, outperforming several competitors. The model also demonstrated strong results in coding tasks and long-context evaluations.

Model weights are currently available on Hugging Face and ModelScope in FP8 and BF16 formats. Deployment is supported through SGLang and vLLM frameworks, accepting extensive token contexts for inference and fine-tuning. The release provides an open checkpoint for researchers under specific licensing terms.
