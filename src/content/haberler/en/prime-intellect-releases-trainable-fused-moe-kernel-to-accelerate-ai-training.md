---
lang: en
title: "Prime Intellect releases trainable fused MoE kernel to accelerate AI training"
description: "Prime Intellect has expanded DeepSeek's Mega MoE kernel to support full model training, significantly boosting processing speeds."
category: teknoloji
date: 2026-10-29T21:51:39.618Z
esId: "prime-intellect-mixture-of-experts-modelleri-icin-yeni-cekirdek-yazilimini-duyur"
bolge: "Global"
perspektif: "This advancement significantly cuts down training times and hardware costs for large artificial intelligence models, making development more efficient."
why_matters: "This artificial intelligence development directly reduces hardware costs and training durations for large language models."
key_points:
  - "Full training steps run 32 to 34 percent faster"
  - "Forward pass achieves up to 3.11x speedup"
  - "Compatible with NVIDIA Hopper and Blackwell GPUs"
rakamlar:
  - etiket: "Forward pass speedup"
    deger: "3.11x"
  - etiket: "Training speed increase"
    deger: "34%"
  - etiket: "Performance gain against baseline"
    deger: "55%"
kaynakIzi: "v1.zomiIlULg6XZ1O1b.INYw2VCVs5XYmHBMugJEtWhYEvOyfydhll2pLuqlUykouMzZiqSTHb0Wq1t91m0oN9vcAwtHVXh9T71LCQA44X1algPfS1bYJEnwH0vQDo0MIgQtRA4WltSuuwHb96QhEGeXyfnCpo36ooXOzVtft+72JFlsDEJ3J1Re18hslD1CbIMU8kHbMroA6z56cxNVIg=="
featured: false
breaking: false
draft: false
---

Prime Intellect has launched a new training extension for Mixture-of-Experts (MoE) architectures, a foundational component in modern artificial intelligence models. Building upon DeepSeek's existing framework which previously handled only inference tasks, the new release introduces an overlapping backward pass. This makes the specialized kernel fully usable for training artificial intelligence models from scratch rather than just running them.

In MoE models, data tokens are routed across multiple specialized processors, creating a communication bottleneck as hardware waits for data transfer between layers. The newly fused kernel architecture minimizes this idle GPU time by processing incoming data groups while others are still in transit. This optimization directly reduces the time processors spend waiting.

According to initial test results, full training steps on Qwen3-based MoE models run 32 to 34 percent faster compared to baseline configurations. Against alternative setups, performance gains reach up to 55 percent. Notably, forward passes achieved up to a 3.11x speedup on specific layers, representing a substantial leap in computational efficiency for large-scale model developers.

Developers can integrate the new backend directly into their workflows using the prime-rl training framework, with support for NVIDIA Hopper and Blackwell graphics processing units. This technological update marks a step forward in optimizing artificial intelligence infrastructure and reducing overall computational overhead.
