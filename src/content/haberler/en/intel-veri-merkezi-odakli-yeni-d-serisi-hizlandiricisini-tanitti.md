---
lang: en
title: "Intel introduces new D series data center accelerator with high capacity"
description: "Intel has shared technical details about its new data center accelerator codenamed Crescent Island."
category: teknoloji
date: 2026-10-19T11:50:54.213Z
bolge: "Global"
perspektif: "This hardware development enables large-scale artificial intelligence models to operate more efficiently in data centers, supporting scalable AI services."
why_matters: "This hardware development enables large-scale artificial intelligence models to operate more efficiently in data centers, supporting scalable AI services."
key_points:
  - "D series cards support up to 480 GB LPDDR5X memory"
  - "Memory bandwidth reaches 1.5 TB per second"
  - "Single card targets models up to 300 billion parameters"
rakamlar:
  - etiket: "Memory"
    deger: "480 GB"
  - etiket: "Power limit"
    deger: "350 W"
  - etiket: "Bandwidth"
    deger: "1.5 TB"
  - etiket: "Processing power"
    deger: "1.3 petaflops"
kaynakIzi: "v1.8tsrzMcMB2uhNTHn.QI1UuJxbr5v8EZTp2t9bVe2xirgQWcpLAw8k8WeIx3ZmB7K8AdhzTzn0IA2DltA8CCJ1BSstLz8wu70oLO7ZSmfZ+HELmbAYc7ymkONEXonMtcZat/ijB01TqmRbjYwU0Hb5qHPMHzEJ5bNGd4Vic6fAeQ=="
featured: false
breaking: false
draft: false
---

Intel has shared technical details regarding its data center accelerator developed under the code name Crescent Island, designated as the D series. During the OCP Global Summit 2026 events, the company introduced the design featuring up to 480 GB of LPDDR5X memory, a 350 W power limit, and an air-cooled PCIe card form factor. However, this high capacity does not represent standard equipment for every card, as the Intel-branded version carries 160 GB of memory while partner manufacturers can expand the design up to 480 GB.

The new graphics unit utilizes the Xe3P architecture. Among the technical values announced by Intel are 1.5 TB per second of memory bandwidth and 1.3 petaflops of peak processing power in FP8 calculations. The company positions these features for inference services that run large models and handle numerous requests simultaneously. Inference refers to the process where a trained artificial intelligence model processes a user request to generate a result.

In addition, Intel targets models with up to 300 billion parameters on a single card. The scale announced for a system containing eight graphics units exceeds one trillion parameters. These figures represent the manufacturer's support and capacity statements. The target audience for the D series includes cloud service providers, enterprise artificial intelligence teams, and latency-sensitive applications, with customer sampling currently underway.

Examining the technical specifications, the card includes 32 Xe3P cores and 256 XMX matrix engines. Intel states that it has redirected the space normally allocated for graphics and ray tracing functions toward computing units. For long-context tasks, prompts and growing caches during processing occupy memory space, and the high capacity is utilized to keep this data on the card and increase concurrent session numbers.
