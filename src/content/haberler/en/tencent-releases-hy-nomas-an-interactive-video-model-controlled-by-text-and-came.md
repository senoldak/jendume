---
lang: en
title: "Tencent releases Hy-Nomas, an interactive video model controlled by text and camera"
description: "Tencent's Hunyuan AI team has launched Hy-Nomas, an open-source video model that users can interactively guide using text prompts and camera trajectories."
category: yapay-zeka
date: 2026-10-23T19:51:05.283Z
esId: "tencent-metin-komutlari-ve-kamera-hareketleriyle-calisan-hy-nomas-modelini-cikar"
bolge: "Global"
perspektif: "This development makes video generation interactive and accessible, opening up new possibilities for content creators and fields like robotics."
why_matters: "Making interactive video generation accessible on a single graphics card democratizes AI-driven content creation."
key_points:
  - "Released as open source"
  - "Capable of running on a single graphics card"
  - "Generates at 720 x 1280 resolution"
rakamlar:
  - etiket: "Resolution"
    deger: "720 x 1280"
  - etiket: "Frame rate"
    deger: "24 fps"
  - etiket: "Test scenarios"
    deger: "280"
  - etiket: "Camera trajectories"
    deger: "220"
kaynakIzi: "v1.hO+60mwQEjfS+b7k.XGM/OvaUoSb13+euFfPWFkDcN7gEnuM+QBYlgr/BWVlpaEpwHiNvtpy70YcJqs2ODdio8aln71CedzwS4XZHqsD42SZ2w/Xu7hxG3hO6Xt51QfVG1YzZGBsvqfGzI5o="
featured: false
breaking: false
draft: false
---

Tencent's Hunyuan team has introduced Hy-Nomas, a new video model that can be guided through user text prompts and camera movements. Instead of generating a video all at once, the model builds it in segments, allowing new instructions to be given at each step. According to the shared details, Hy-Nomas acts as a video world model supporting free-form and multi-step interaction.

Hy-Nomas allows users to add new objects to the scene, change the style or environment, and direct the camera while generation is underway. Information from previous segments is stored in a cache, helping the model maintain context while continuing the same world. The model also supports lightweight adaptations for specialized domains such as robotics.

Technically, the accelerated version of the model utilizes an eight-step process for each video segment and produces twenty-four frames per second at a 720 x 1280 resolution. Utilizing text encoders and video decoders, the system can run on a single graphics card. This configuration uses data compression alongside system memory.

The model's code and weights have been released under an open license, with developers able to access setup steps via the repository. The company also shared a dedicated dataset featuring 280 test scenarios and 220 reference camera trajectories to measure interaction control.
