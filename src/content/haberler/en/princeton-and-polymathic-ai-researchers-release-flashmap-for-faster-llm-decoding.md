---
lang: en
title: "Princeton and Polymathic AI researchers release FlashMap for faster LLM decoding"
description: "Researchers from Princeton University and Polymathic AI have introduced FlashMap, a new method that accelerates large language model decoding by up to 6.14x."
category: teknoloji
date: 2026-10-28T09:51:33.510Z
esId: "princeton-ve-polymathic-ai-arastirmaciklari-flashmap-ile-yapay-zeka-hizini-artir"
bolge: "Global"
perspektif: "This new decoding method significantly boosts the processing speed and efficiency of large language models, reducing operational costs and improving user experience."
why_matters: "By drastically improving the inference speed of large language models, this technique lowers server costs and minimizes response latency for end-users."
key_points:
  - "Achieves up to 6.14x speedup on Qwen3-8B"
  - "Uses a 0.5-billion-parameter drafter"
  - "Available on Hugging Face with vLLM and SGLang plugins"
rakamlar:
  - etiket: "Speedup"
    deger: "6.14x"
  - etiket: "Parameters"
    deger: "0.5B"
  - etiket: "Compute"
    deger: "4,600 GPU hours"
kaynakIzi: "v1.3dSVRSCNB/aR6ITs.UyYLyFqAdEbS0kuyFii14gwgfdFFpMAIdbUdTnJvLCm0OAk0cF9ff7wGku7qfpZidRKdwNZY7SwAQhj5SzaTzWFeqViJ2PzXV9KmXTPL+tzhNw/K6glfvaRM4A6UdrLAMOaZwsE8biBUbyGYbx+hK0sm/rk63fbu5jNYcv563Q=="
featured: false
breaking: false
draft: false
---

Researchers from Princeton University, Polymathic AI, and partner institutions have released FlashMap, a novel tool designed to accelerate the decoding speed of large language models. FlashMap replaces discrete diffusion drafters with a continuous flow map in speculative decoding, generating a full block of tokens in a single forward pass. Tests on the Qwen3-8B model demonstrated up to 6.14x lossless speedup on benchmark tasks such as GSM8K.

According to the research team, FlashMap operates using a 0.5-billion-parameter drafter running on the same GPU as the target model. By mapping Gaussian noise directly to a token block, the system resolves consistency issues found in traditional independent drafters, ensuring that generated tokens remain coherent. The drafter weights for Qwen3-8B and Qwen3-4B models have been published on Hugging Face, alongside plugins for vLLM and SGLang.

Trained over approximately 4,600 GPU hours, the models were evaluated across nine benchmarks covering mathematics, coding, and chat tasks. The results show that FlashMap outperforms baseline methods in acceptance length and processing speed across various temperatures. Developers can easily integrate the tool using standard Python packages and deployment frameworks.

This development is crucial for reducing latency in AI applications, making models more responsive and cost-effective to run in production environments. By providing open-source weights and seamless framework integration, the research team aims to accelerate the broader adoption of efficient speculative decoding techniques across the industry.
