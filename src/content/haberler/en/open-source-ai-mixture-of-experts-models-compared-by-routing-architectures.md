---
lang: en
title: "Open-source AI mixture-of-experts models compared by routing architectures"
description: "An extensive comparison examines the token routing mechanisms of open MoE models including DeepSeek, Qwen, Mixtral, Llama 4, and gpt-oss."
category: teknoloji
date: 2026-11-08T11:50:50.079Z
esId: "acik-kaynakli-yapay-zeka-modelleri-yonlendirme-mimarileriyle-karsilastirildi"
bolge: "Global"
perspektif: "Token routing strategies in artificial intelligence models directly dictate hardware requirements and computational efficiency across the industry."
why_matters: "Token routing strategies in artificial intelligence models directly dictate hardware requirements and computational efficiency across the industry."
key_points:
  - "Expert counts range from 8 to 384"
  - "Top-k values span from 1 to 8"
  - "gpt-oss-120b fits on a single 80 GB GPU"
rakamlar:
  - etiket: "Expert count range"
    deger: "8 to 384"
  - etiket: "Top-k range"
    deger: "1 to 8"
kaynakIzi: "v1.zg5IiEa7KExBU0H9.qafShi4Y2q4/1OBm7mxXsBy1JpI79/b/3Ra2yMzkkjHOTkecV83BpkprYknsRWARXVMBOfz1Z4qWLKJerIgGjjsfHnUnF1kliAAJJ/ewVvTucdQza4HJYqT1INHPzbJondzSEH4HJk0HFAp7zCJDEydsXqES"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/08/moe-model-routing-comparison/"
haberDegeri: 70
featured: false
breaking: false
draft: false
---

Open Mixture-of-Experts (MoE) models share a core architectural concept while diverging significantly in their routing details. A recent comparative analysis evaluated popular models such as DeepSeek, Qwen, Mixtral, Llama 4, and gpt-oss to understand how they process inputs. Expert counts across these systems range from eight to 384, while the top-k parameter determining how many experts each token selects spans from one to eight. Certain models maintain an always-on shared expert, whereas others omit this design entirely.

According to the findings, model scales vary dramatically from the 35-billion parameter Qwen3.6-35B-A3B to the 1.6-trillion parameter DeepSeek-V4-Pro. While the gpt-oss-120b model fits onto a single 80 GB graphics processor using MXFP4 quantization, massive architectures like DeepSeek-V4-Pro and Kimi K2 necessitate multi-GPU expert parallelism. Routed sparsity spans from fourfold in Mixtral up to 128-fold in Llama 4 Maverick. Furthermore, Kimi K2 demonstrated that higher sparsity levels require fewer floating-point operations while maintaining validation loss standards.

Examining individual routing mechanics reveals distinct approaches. DeepSeek-V3 scores 256 routed experts using a sigmoid function, whereas DeepSeek-V4 increases routed experts to 384 while lowering the top-k threshold to six and adopting a sqrtsoftplus scoring function. Qwen3 models deploy 128 experts, while Qwen3.6-35B-A3B shifts to 256 routed experts alongside one shared expert. Meanwhile, Llama 4 Maverick alternates dense and MoE layers, routing each token to one shared expert and one out of 128 routed experts.

These structural variations carry critical implications for hardware deployment and serving costs. Higher expert counts per layer increase memory residency and communication overhead, whereas lower top-k values trim per-token computation. Industry engineers must carefully evaluate these configuration parameters before sizing hardware infrastructure for any modern MoE model deployment.
