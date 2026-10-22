---
lang: en
title: "IBM releases Granite Speech 5.0 2B model for multilingual speech transcription"
description: "IBM has launched Granite Speech 5.0 2B, an open-source speech-language model designed for transcription and translation across six languages under the Apache 2.0 license."
category: yapay-zeka
date: 2026-10-22T07:31:36.476Z
bolge: "Global"
perspektif: "This new artificial intelligence model enhances transcription accuracy and provides developers with local deployment flexibility across various hardware platforms."
why_matters: "This AI model empowers developers with high-accuracy speech transcription and translation capabilities that run efficiently on local hardware."
key_points:
  - "The model has 2 billion parameters and supports 6 languages"
  - "Ranks #2 on the Open ASR Leaderboard with 5.68% WER"
  - "Training took 40 days on 8 H100 GPUs"
rakamlar:
  - etiket: "Parameters"
    deger: "2B"
  - etiket: "Average WER"
    deger: "5.68%"
  - etiket: "Training time"
    deger: "40 days"
kaynakIzi: "v1.542xWcs1JBKFnd1e.s6QaPpTBXmuF6jwkKnpjN/rFJCoEyFMUf021Jn1jJAzh2xvCrDgv7apyGQj+EHPlGztHkLzsRLVcs0ciYwVyZKyMD07pIswDbe+nJ1U8T3/d2ElvrEHUEnDK/mM/q3DTo+2EK7oievkvQvtp/7KPUZPBrbh3L4ms4us="
featured: false
breaking: false
draft: false
---

IBM has expanded its audio processing capabilities by releasing a new open speech-language model named Granite Speech 5.0 2B. The model is capable of converting speech into text across six languages and is released under the Apache 2.0 license. Designed for developers, it provides accurate transcription, fast on-device processing, and speaker attribution features.

The model features a dense 2 billion parameter architecture with an LLM backbone extended to 16k positions using YaRN. Its training utilized 390,000 hours of public audio and synthetic datasets, taking forty days across eight H100 GPUs. The system is compatible with various hardware environments, including GPUs, Apple Silicon, and local CPUs.

In performance evaluations, it ranks as the number two open-weight model on the Open ASR Leaderboard with an average English word error rate of 5.68 percent. It achieves a 0.99 percent error rate on LibriSpeech Clean and demonstrates strong performance in keyword biasing for specialized terms and acronyms.

Alongside this release, IBM updated its Turbo CTC and Granite Speech 4.1 2B Plus models. The Turbo CTC model increased its processing throughput, while the 4.1 version improved timestamp accuracy and reduced long-form error rates. Developers can deploy these models using standard frameworks like Transformers, vLLM, llama.cpp, and mlx-audio.
