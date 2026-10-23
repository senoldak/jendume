---
lang: en
title: "TinyFish introduces new architecture for agentic search"
description: "TinyFish has published a new technical guide and search architecture to help AI search agents overcome reliability and cost challenges in production."
category: teknoloji
date: 2026-10-23T09:50:57.526Z
esId: "tinyfish-otonom-arama-ajanlari-icin-yeni-mimari-yayinladi"
bolge: "Global"
perspektif: "This development matters because it enables AI search agents to transition from demos to reliable, cost-effective tools in production workloads."
why_matters: "This architecture solves critical reliability and cost issues for AI agents, making them viable for enterprise production workloads."
key_points:
  - "TinyFish achieved a 79.0 percent completion rate on coding tasks."
  - "The system operates via a seven-phase control loop."
  - "Median task cost was kept to 0.050 dollars."
rakamlar:
  - etiket: "Completion rate"
    deger: "79.0%"
  - etiket: "Median task cost"
    deger: "$0.050"
kaynakIzi: "v1.UamnJlPW7k0CPhNv.++dJzpht+Y7k7dZBPw1MxdhXSn5VFCIHxpkbo/IBN3cPXDVaCaxjSuLCbnRmDE8Hi4/6vHc8xlDi/9NPF8jBso6MwWuVMp1zb/+cJF8fJxqyw2SUSCtIPqqyfDNu4qcfeql9Saub4zlYl7y8hiY5Nu2TbaDhETDXZCcDQnDkOaovtaXvO9FZn3sVlg=="
featured: false
breaking: false
draft: false
---

AI search agents often succeed in controlled demos but struggle under production workloads when retrieval returns incomplete evidence or execution exceeds limits. TinyFish, a web infrastructure provider for AI agents, has published two technical guides addressing these challenges and introduced a production agentic search architecture. The system operates through a seven-phase control loop around the base model to manage the boundary between reasoning and execution.

Built on four web primitives including search, fetch, browser, and agent components, the architecture allows autonomous search agents to plan retrieval, access sources, evaluate evidence, and adapt to changing information requirements. A production run is split into seven phases ranging from defining the task into an evidence contract to planning, retrieval, evaluation, recovery, and final validation.

In benchmark evaluations, the system achieved a 79.0 percent completion rate on coding tasks while maintaining low median task costs and token footprints. TinyFish also shared key engineering lessons from building deep research systems, noting that removing standalone planners in favor of unified reasoning loops and replacing subagents with tool calls significantly reduced overhead and latency.

Regarding cost and latency, TinyFish emphasizes budgeting the entire task rather than individual calls, accounting for tokens, tool calls, browser usage, and infrastructure. These engineering practices help autonomous agents handle complex research and enterprise documentation tasks with greater reliability and efficiency.
