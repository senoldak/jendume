---
lang: en
title: "Kyutai introduces CADRE video autoencoders to reduce model lag"
description: "Kyutai has released CADRE, an open-source family of video autoencoders designed to reduce action lag in interactive world models."
category: yapay-zeka
date: 2026-10-24T03:50:57.892Z
esId: "kyutai-cadre-video-otomatik-kodlayici-ailesiyle-model-gecikmesini-dusurdu"
bolge: "Global"
perspektif: "This development brings AI model response times below human perception limits, enabling smoother and more realistic real-time interactive experiences."
why_matters: "CADRE pushes AI response latency below the threshold of human perception, enabling real-time interaction in robotics and simulation."
key_points:
  - "World model lag reduced below 230 milliseconds"
  - "System runs at 20 frames per second on a single H100"
  - "Code released under MIT license and weights under CC BY-NC 4.0"
rakamlar:
  - etiket: "Response lag"
    deger: "230 ms"
  - etiket: "Frame rate"
    deger: "20 fps"
  - etiket: "Parameters"
    deger: "1.2B"
kaynakIzi: "v1.l5LyjvyOrqMVxumj.XvO2TagSmXhQEZ0FWFBQzZqbrKuyLtZqktNa4/bQzydP5/HQ03oCADtK3v6kA3kWhBYDa1KWFLfonASEMRiReXUigD2Xsv/1NeC9zuiOplnQbfLqy0seOapAEA8jCS/2SwBM4Ge02J2wsB3BXs+8kq9TZ7Qq0H02SvtXppZw7EVLgOsA5krBEoQGlz36+htHSg=="
featured: false
breaking: false
draft: false
---

Kyutai research team has introduced CADRE, a new family of video autoencoders aimed at solving the action lag problem in interactive world models. The newly developed system reduces video-based AI model action lag to under 230 milliseconds, matching human reaction times. While traditional models suffer from high latencies due to autoencoders borrowed from text-to-video generators, CADRE runs at 20 frames per second on a single H100 GPU.

The system consists of seven different autoencoder models alongside a 1.2 billion parameter world model. These autoencoders optimize temporal and spatial compression rates to reduce frame generation costs and action delays. The trained models were rigorously evaluated across diverse environments including robotic manipulation, human manipulation, driving, and indoor navigation.

The training process utilized twenty-three public video sources spanning approximately seventy-six thousand hours of data. Evaluations show that CADRE exhibits lower motion distortion and superior performance compared to competitors, particularly in moving camera and driving simulations. For instance, in driving evaluations, CADRE achieved an FVD score of 162.6 in a single decoding step.

Despite its strong performance, CADRE has certain limitations where other models outperform it in specific robotic manipulation tasks. The source code is released under the MIT license, while the model weights are made available for non-commercial use under the CC BY-NC 4.0 license alongside a live demo.
