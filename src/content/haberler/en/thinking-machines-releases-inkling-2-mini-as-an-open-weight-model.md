---
lang: en
title: "Thinking Machines releases Inkling 2 Mini as an open-weight model"
description: "Thinking Machines has released Inkling 2 Mini, which uses a looped transformer architecture to run agentic coding models locally on 32GB systems."
category: yapay-zeka
date: 2026-11-21T13:50:50.702Z
esId: "thinking-machines-inkling-2-mini-modelini-acik-agirlikli-olarak-yayimladi"
bolge: "Global"
perspektif: "This development allows high-performance AI coding agents to run locally on developer hardware rather than relying exclusively on expensive cloud data centers."
why_matters: "It enables software engineers to run advanced agentic AI tools directly on local hardware without sending sensitive code to cloud servers."
key_points:
  - "Features 26.4B total and 3.4B active parameters using middle-layer looping."
  - "Achieves 79.2% on the SWE-bench Verified coding benchmark."
  - "Fits within ~20GB storage for local deployment on 32GB systems."
rakamlar:
  - etiket: "Total parameters"
    deger: "26.4 billion"
  - etiket: "Active parameters"
    deger: "3.4 billion"
  - etiket: "SWE-bench score"
    deger: "79.2%"
  - etiket: "Model size"
    deger: "20GB"
kaynakIzi: "v1.qdV+WR6FOcO4mWjr.1kv0bO+9jMSQhYp7iJnjaa7yyQCnDTsFAG6MgHk11pnik8VEa5liBoCE4Lyy2JwKyaA7jAHuQAijJhdZM3GJ0Ld1yrFmPTBPu8yIJcy8LVZthgloj6p89rWfeG7U0Pgx/xX2LdAwfLfMK3IiDZCEg2hL06rrHYmx3r7RJHIUO28JPjMfCbY+vWrodeE="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/21/thinking-machines-inkling-2-mini-looped-transformer/"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

Thinking Machines Lab has introduced Inkling 2 Mini, an open-weight artificial intelligence model with 26.4 billion total parameters. The architecture uses a looped transformer design, which reuses its middle layers three times for every token processed. This approach allows the model to maintain performance without requiring a massive increase in unique weights. By keeping the checkpoint size around 20GB, the model is accessible for local deployment on hardware such as 32GB Mac systems or a single NVIDIA DGX Spark unit. Available under the Apache 2.0 license on Hugging Face, the model is engineered for agentic coding, tool usage, and document processing tasks. The looped transformer mechanism enhances hardware efficiency.

By organizing 24 stored layers into specific blocks, the system delivers 48 layer applications per token. Testing indicates that looping the middle layers provides a 1.51x to 1.91x gain in compute efficiency. While this architecture requires more compute during the training phase, it offers energy and resource savings during inference compared to unlooped baselines. The model demonstrates capabilities in technical benchmarks.

It achieves a 79.2% success rate on the SWE-bench Verified coding test and records a 20.1 score on the Artificial Analysis Index, positioning it competitively against other models in its class. The model faces limitations in areas such as broad knowledge retrieval and multi-turn instruction following, where the reduced parameter count impacts performance on benchmarks like HLE-Diamond.

This release reflects an industry trend toward compute-efficient architectures that maximize performance on edge devices. By delivering agentic capabilities from a compact footprint, the model enables developers to execute automation workflows on personal hardware, bypassing the need for extensive cloud infrastructure.
