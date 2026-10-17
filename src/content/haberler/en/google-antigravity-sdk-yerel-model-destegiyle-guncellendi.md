---
lang: en
title: "Google Antigravity SDK adds local model support"
description: "Google has updated its Antigravity SDK with local model support, enabling developers to build hybrid workflows combining local execution and cloud models."
category: teknoloji
date: 2026-10-17T07:50:57.459Z
bolge: "Global"
perspektif: "This update gives developers greater control over data privacy, inference costs, and computational workloads by keeping code-intensive tasks on-device."
why_matters: "It allows developers to maintain strict code privacy and reduce cloud compute costs."
key_points:
  - "Antigravity SDK now supports local model execution."
  - "Demonstrations showed 97.2 percent of tokens processed locally."
  - "Supports Gemma 4 alongside Ollama, LM Studio, and vLLM."
kaynakIzi: "v1.g8fAij7q4IWFndeK.IspdsZr79qWKhIOpX8BfTQdxjOjZ03G65MQYazjQqVKRiTrvgNveoJWb9DVTwIIyMqE96bZL30H+sGbhe2PsWzwNczZKPzijhzaJLbH3WJ4oXX3e607+8zoLd01AJnEUUHcS5GJf0rxvu3bIc67L9y9JGXYkz6dNu9l+siGFWH3LYEUSWwYJ/j5WF6wbhX2mfbfArP4bPCKS+c2sd+UsIvouwC3egjCwulkSRF1OWOlHd/IeGdKAy3Wpjh/WxCEPHQxjlFC1Yn2HYnwmvUIC"
featured: false
breaking: false
draft: false
---

Google has introduced local model support to the Antigravity SDK, allowing developers to execute agentic workflows directly on their local machines while maintaining the flexibility to integrate cloud-based models for high-level tasks. This hybrid approach adapts an architect-builder pattern where a primary high-context AI agent operates in the cloud for macroscopic planning, while specialized local agents handle code execution, vulnerability replication, and regression testing on-device. The architect agent manages the macro-level system view and breaks tasks into smaller units using filenames and descriptions without requiring direct access to the source code itself.

According to Google's demonstrations involving the auditing and patching of three vulnerable Python modules, only 95 out of approximately 3400 tokens were used on the cloud for planning, while the remaining 97.2 percent of the tokens were processed locally. This architecture ensures that sensitive source code does not need to be uploaded to the cloud, giving developers robust control over data privacy, inference expenses, network dependencies, and overall computational workload distribution.

The initial release focuses on running Gemma 4 26B A4B through LiteRT technology while also supporting OpenAI-compatible local inference servers such as Ollama, LM Studio, and vLLM. Community discussions highlight that while local execution token metrics are impressive, developers must also consider factors such as hardware requirements, including recommended unified memory or VRAM, along with patch acceptance rates and overall performance.

Furthermore, the Antigravity SDK is distinct from the Antigravity IDE, as the SDK specifically allows developers to build their own AI agents programmatically rather than simply using them for standard coding tasks. Both tools share the underlying agent infrastructure, but the SDK empowers developers to construct customized agentic workflows tailored to their specific local environments.
