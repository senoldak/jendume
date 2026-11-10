---
lang: en
title: "ZONOS3-Mini brings real-time voice synthesis to local devices"
description: "Zyphra has released an open-source text-to-speech model capable of running on browsers and personal devices with a low active parameter count."
category: yapay-zeka
date: 2026-11-10T17:50:51.161Z
esId: "zonos3-mini-yerel-cihazlarda-gercek-zamanli-ses-sentezi-sunuyor"
bolge: "Global"
perspektif: "This development enables high-quality voice technology to move from cloud servers directly to user devices, paving the way for privacy-focused applications that do not require an internet connection."
why_matters: "It enables high-quality voice technology to move from cloud servers directly to user devices, paving the way for privacy-focused applications that do not require an internet connection."
key_points:
  - "Real-time operation with 100M active parameters"
  - "Browser-based usage via WebGPU without installation"
  - "Open-source access under Apache 2.0 license"
rakamlar:
  - etiket: "Active Parameters"
    deger: "100 million"
  - etiket: "Total Parameters"
    deger: "800 million"
  - etiket: "Training Time"
    deger: "2.5 days"
  - etiket: "Time to First Audio"
    deger: "80 ms"
kaynakIzi: "v1.mFVP3vI/ShrPXyDI.szS5j1ftU5GHJF88OE3llfAo+Uj0D8GZgu8xP3C1gh3xfJ2ObVZ4h4w+BSts01B+IcbPtwmTyIkIffdCwGIOw1mUI3iHNiDEaZ5gRSKW8OvH3+1oVKT9AldWDl2u4FQppYeBQbX8W3JIf3PMThXHSonzBUAp0NytD7oF"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/10/zyphra-zonos3-mini-open-source-tts/"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

Zyphra has taken a significant step in text-to-speech (TTS) technology with the release of its ZONOS3-Mini model as an open-source project. This model is specifically optimized to operate in real-time on local devices and within web browsers. Unlike traditional, resource-heavy models, it utilizes a sparse Mixture of Experts (MoE) architecture. While it contains 800 million total parameters, it uses only 100 million active parameters per token during inference. This efficient design allows the model to generate fluent speech on laptops or smartphones without requiring high-end server infrastructure.

One of the most notable features of the model is its zero-shot voice cloning capability and word-level delivery control. Users can manage the tone, emphasis, and speaking pace of the generated audio with high precision. Released under the Apache 2.0 license, this technology provides developers with a flexible infrastructure to integrate into their own applications. Its ability to run directly in a browser via WebGPU, without requiring complex installations, significantly lowers the barrier to entry for developers and end-users alike.

Regarding technical performance, the model's efficiency is a standout metric. On an NVIDIA H100 GPU, the time to first audio output is as low as 80 milliseconds. On the mobile front, it can respond in under 570 milliseconds within a browser on a Pixel 9 device. This speed is a critical threshold for applications requiring real-time interaction, such as live voice assistants or interactive media tools.

Zyphra trained this model using 112 NVIDIA H100 GPUs over a period of 2.5 days. The previous generation, ZONOS2, relied on an 8 billion parameter architecture, which limited its deployment options. By drastically reducing the size while maintaining quality, ZONOS3-Mini enables AI-powered voice technology to move from centralized cloud servers directly to user devices. This shift opens new possibilities for privacy-focused applications and scenarios where internet connectivity is limited or unavailable.
