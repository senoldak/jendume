---
lang: en
title: "Inception releases Mercury 3 diffusion language model with 1,068 tokens per second"
description: "Inception has introduced Mercury 3, a new diffusion language model that writes answers in parallel. The model achieves 1,068 tokens per second and features a 1-million-token context window."
category: yapay-zeka
date: 2026-10-20T05:50:54.227Z
bolge: "Global"
perspektif: "This diffusion-based approach significantly accelerates response times, offering a major performance boost for developers building voice bots and autonomous agents."
why_matters: "By drastically reducing latency through parallel generation, this model enables real-time voice interactions and responsive autonomous agents."
key_points:
  - "1,068 tokens per second generation speed with a 1M-token context window"
  - "Outperforms rivals in 8 out of 12 self-reported benchmark tests"
  - "Launch pricing set at 0.10 dollars for input and 0.35 dollars per 1M tokens"
rakamlar:
  - etiket: "Generation speed"
    deger: "1,068 tokens/sec"
  - etiket: "Context window"
    deger: "1M tokens"
  - etiket: "Input price"
    deger: "0.10 dollars"
  - etiket: "Output price"
    deger: "0.35 dollars"
kaynakIzi: "v1.rvFq/IJdwznduqph.cIw57iFDgn8KtJBtbbRMqVXzdRpexMb9zoRD3n/L36QQEEZ524EMrGcNlkOBR6/11gDbl6EB4iYThZ2YVE/yRBVr4C2GZYrtq7JuQBO4/8cWAxCZOaRiKiIhMfTpXIfSSor0TSC2u/NpLv/oOZsiYSNFF3oMMAGuVdY="
featured: false
breaking: false
draft: false
---

Inception has announced the release of Mercury 3, the latest version of its diffusion language model designed for high-speed AI applications. Unlike traditional autoregressive models that generate text one token at a time, a diffusion LLM starts from a rough draft and refines all positions in parallel. According to company data, Mercury 3 achieves a speed of 1,068 tokens per second on NVIDIA GPUs while supporting a 1-million-token context window.

In benchmark evaluations provided by Inception, Mercury 3 leads rival models such as GPT-6 Luna and Claude Haiku 5.5 in 8 out of 12 tests under medium settings. The model scores particularly high in instruction following and agentic coding benchmarks, reaching 51.08 on SWE-Bench Atlas and 76.84 on IFBench. However, tests also highlight areas for improvement, as competing models maintain an edge in specific long-context retrieval and advanced coding tasks.

Developers can access Mercury 3 through the Inception API Platform, OpenRouter, Baseten, and Vercel. At launch, list pricing is discounted by 50 percent, offering input tokens at 0.10 dollars per million and output tokens at 0.35 dollars per million, before rising to standard rates. Additionally, new accounts receive 100 million free tokens to encourage adoption across various agent and search applications.

This release highlights the ongoing shift toward alternative architectures that overcome the speed limitations of traditional language models. By enabling faster parallel generation, diffusion models like Mercury 3 pave the way for more responsive voice assistants, smart glasses, and real-time interactive tools that require minimal latency.
