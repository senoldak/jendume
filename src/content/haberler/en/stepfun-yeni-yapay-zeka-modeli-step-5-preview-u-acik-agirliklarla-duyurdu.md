---
lang: en
title: "StepFun releases Step 5 Preview open-weight model with 1M context"
description: "StepFun has made its 600-billion parameter model available as open weights, offering a 1-million token context window for agentic workflows."
category: yapay-zeka
date: 2026-10-17T07:50:57.459Z
bolge: "Global"
perspektif: "This open-weight release provides developers with a powerful tool for self-hosted coding agents and complex financial workflows."
why_matters: "The open-weight release allows developers to self-host advanced agentic models for coding and finance while maintaining data control."
key_points:
  - "600B total parameters with 27B active per token"
  - "Supports up to 1 million tokens of context"
  - "API priced at 1.00 dollar per 1M input tokens"
kaynakIzi: "v1.YLIG/hpriCOfuTSl.wD001WIn1O63LvdKi1wJOTNRSHY5PVbqT/7cKCkPc/oZAsEeIkLV3g6XpC6iUWkt/F5k2zxOAG2xsGDfFtqDbadoypMa1p9sVk6a8A8Eem2KFXR8eVeqjA7qiNrOauXEsG37Zj2h2FK87QaT3uTb+qmhshJ0l8Jmgqa2CahMQH8gBijXfb7PhdtVq9HmSb11GilQXVeDA+enAhE9VneNOuA4Yws="
featured: false
breaking: false
draft: false
---

StepFun has released Step 5 Preview as open weights, introducing a large language model built specifically for long-horizon agentic work. The FP8 and BF16 checkpoints are now live on Hugging Face and ModelScope, giving developers new self-hostable options for software engineering, document analysis, and finance operations.

The model features a sparse Mixture-of-Experts architecture with 600 billion total parameters, while activating 27 billion parameters per token. It supports up to 1 million tokens of context, enabling it to navigate large codebases, coordinate multi-file changes, and process extensive documents to produce structured reports. The API version launched earlier, followed closely by the weight release.

Due to its massive scale, the model is designed strictly for data-center hardware. Running the FP8 checkpoint requires configurations such as four B300 GPUs or eight H200 GPUs, whereas the BF16 version demands even higher resources. Dedicated Docker images with OpenAI-compatible APIs are provided to facilitate deployment on vLLM and SGLang backends.

On the economic side, the API is priced at 1.00 dollar per million input tokens and 2.70 dollar per million output tokens, with cache hits reducing the cost significantly. As the ecosystem of open-weight models expands, this release strengthens the options available for enterprises looking to deploy advanced reasoning agents on their own infrastructure.
