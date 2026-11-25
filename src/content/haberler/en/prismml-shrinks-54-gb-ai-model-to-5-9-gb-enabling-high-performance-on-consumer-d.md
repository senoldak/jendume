---
lang: en
title: "PrismML shrinks 54 GB AI model to 5.9 GB, enabling high performance on consumer devices"
description: "PrismML has introduced a new compression technique that allows massive AI models to run efficiently on smartphones and personal computers."
category: teknoloji
date: 2026-11-25T13:50:54.850Z
esId: "prismml-54-gb-lik-yapay-zeka-modelini-5-9-gb-a-sikistirarak-telefonlarda-calisir"
bolge: "Global"
perspektif: "This reduces reliance on cloud servers, enabling high-performance AI models to operate locally on personal devices."
why_matters: "Enabling AI models to run on personal devices without massive servers increases accessibility and data privacy."
key_points:
  - "Model size reduced from 54 GB to 5.9 GB"
  - "AppWorld benchmark score jumped from 51.2% to 90.5%"
  - "Compatible with Apple devices and standard GPUs"
rakamlar:
  - etiket: "Model size"
    deger: "5.9 GB"
  - etiket: "SWE-bench score"
    deger: "75.6%"
  - etiket: "AppWorld score"
    deger: "90.5%"
  - etiket: "Generation speed"
    deger: "204 tokens/sec"
kaynakIzi: "v1.CFUjrDebL056bpPz.kjYc7lQIKPhamkbBAlVEaKMHMy0/MvowDFrmOpNylUw112VW2f3o7jY2g3WxdPK6vfMCpvxGZfASgmoqz3t4Lab00FUA6lnk09F/Ebfqe30oZZEYBMMSiZ4mfFfyqE688bCm23XYFjItjjidykKjzzgg3dd7vzdw1L1m9zEaSlWEY2W5WJ2918L4FSTL203P9TvecFqVKCw1XYk="
kaynakAdlari:
  - ad: "The Decoder"
    url: "https://the-decoder.com/prismml-squeezes-an-agent-based-coding-model-with-27-billion-parameters-into-5-9-gb/"
haberDegeri: 90
featured: false
breaking: false
draft: false
---

PrismML has unveiled Ternary Bonsai 2.5 27B, a model compression technology. Built upon the Qwen3.8-27B architecture, this model utilizes a technique known as "ternary quantization." Instead of using standard 16-bit storage, the model reduces every weight to one of three possible values: -1, 0, or +1. This aggressive compression allows a model that would typically require 54 GB of memory to run on just 5.9 GB, making it feasible to operate on consumer hardware like smartphones and personal computers.

This development is crucial for the future of edge computing, as it enables powerful AI models to function locally rather than relying exclusively on massive cloud servers. The model is specifically optimized for "agentic" tasks, or scenarios where the AI autonomously uses tools to execute complex workflows. By requiring fewer passes and tokens than its predecessor, the model is significantly less likely to get stuck in processing loops or spiral into inefficient reasoning phases, leading to more reliable outcomes.

The performance improvements are reflected in standardized benchmarks. On the SWE-bench Verified test, which evaluates software engineering capabilities, the success rate jumped from 60.8% to 75.6%. Performance on AppWorld, an agent-focused benchmark, increased from 51.2% to 90.5%, nearly matching the performance of the much larger base model.

Originating from a research team at Caltech and backed by major industry players including Google, Samsung, and Khosla Ventures, PrismML is releasing these weights under an Apache 2.0 license. The model is compatible with Nvidia and Intel GPUs via llama.cpp, as well as Apple’s Mac, iPhone, and iPad ecosystem through MLX. Capable of generating approximately 204 tokens per second on an RTX 4090, this technology makes high-performance AI accessible on local, everyday devices.
