---
lang: en
title: "Hugging Face releases new LoRA adapter boosting Qwen3.8 coding accuracy"
description: "Hugging Face has released a new LoRA adapter for the Qwen3.8-27B model, raising its coding agent success rate from 39% to 65%."
category: teknoloji
date: 2026-11-19T03:50:54.087Z
esId: "hugging-face-qwen3-8-kodlama-basarisini-artiran-yeni-lora-adaptorunu-duyurdu"
bolge: "Global"
perspektif: "This new adapter allows AI models to achieve high accuracy in coding tasks without requiring long and costly reasoning traces, enabling developers to run efficient AI agents locally with significantly fewer tokens."
why_matters: "This development enables AI to perform coding tasks with high accuracy while consuming fewer resources, empowering developers to build efficient local agents."
key_points:
  - "SWE-bench Pro accuracy rose from 39.2% to 64.7%."
  - "The adapter generates about 4.5x fewer tokens than the base model with thinking."
  - "Training was performed using 2 NVIDIA B200 GPUs."
rakamlar:
  - etiket: "SWE-bench accuracy"
    deger: "64.7%"
  - etiket: "Token reduction"
    deger: "4.5x"
kaynakIzi: "v1.XorYVI3W1BzTPlyx.xuvOWmF+OAW9tElGbkbjegfJ+c5ppFkvwuIEqI0Kl1fOJBkw93vS876q4DjYH7+yGOTjN7sa7Q0xwc0qiz73V7Duamj+Evb9XQEZvi24pCGKptK/VFuggIfZ/BgBXYeblK+qvt4bEjMQcGy633eFfv89Bm/qfIFf1PEj+OUTDDjR"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/18/hugging-face-qwen3-8-27b-pi-adapted-lora/"
haberDegeri: 78
featured: false
breaking: false
draft: false
---

Hugging Face has introduced a new PEFT LoRA adapter designed for the Qwen3.8-27B model. Named Qwen3.8-27B-pi-adapted, this specialized adapter was trained using reinforcement learning to operate specifically within the pi coding agent toolkit. Rather than focusing on general chat, it targets a specific harness, making it highly valuable for developers running local coding agents.

Performance metrics demonstrate clear improvements brought by the adapter. On SWE-bench Pro, the success rate surged from 39.2% to 64.7%. Similar gains were observed on Terminal-Bench 2.1. Beyond raw accuracy, efficiency stands out as a major breakthrough; median turns on successfully solved tasks dropped significantly compared to the base model.

The key advantage of the adapter is its ability to match the accuracy of the base model's thinking mode without the heavy computational overhead of long reasoning traces. As a result, the model generates roughly 4.5 times fewer tokens while delivering comparable results. The training process utilized two NVIDIA B200 GPUs, and the methodology has been openly shared with the developer community.

For deployment, the model card provides multiple options including vLLM, llama.cpp, and Llama.app on macOS. Because adapters share a single base model, a single server can easily host multiple adapters side by side. Released under the Apache-2.0 license, this development marks a significant step forward in boosting the efficiency of open-source coding tools.
