---
lang: en
title: "Kyutai introduces REKI vision-language-action model for robots"
description: "Kyutai, alongside Inria and École des Ponts, has released REKI, a 2.4B vision-language-action model for robot manipulation."
category: yapay-zeka
date: 2026-10-17T21:50:56.220Z
bolge: "Global"
perspektif: "This model equips robots with efficient memory of recent frames, helping them avoid oscillation and perform manipulation tasks more reliably."
why_matters: "Adding memory to robotic action models significantly reduces movement oscillations and improves precision in complex physical tasks."
key_points:
  - "REKI is a 2.4B vision-language-action model pretrained on public data."
  - "It achieved 90.4% on the LIBERO-Plus benchmark."
  - "Built-in memory reduces pose oscillations during robot manipulation."
rakamlar:
  - etiket: "Model size"
    deger: "2.4 billion parameters"
  - etiket: "LIBERO-Plus score"
    deger: "90.4%"
kaynakIzi: "v1.ISQA+7gBgC8G1sDY.7LsgLQZGYejpJTMb6gCTiLBv4l7nxCAhDq60LqbXWxLILtN3bwJJKfWtcDiYbtW6DvChcm4xWYHfXBAxvsUTf25Pv4XvcIOqSMNQ44UxuiofH2N563ojJSWRyusPdpaR8xCuRRZqZSeBVo1AApCdu7EZ1ulgxeHhkQRYPoTC7dc9hM0RnUofRbBro47WLFS3j65ze9ss6jhrFp03Y+FrmFbFfoKWcasz9jPfHQ=="
featured: false
breaking: false
draft: false
---

Kyutai, in collaboration with Inria and École des Ponts, has released REKI, a 2.4-billion-parameter vision-language-action model designed for robot manipulation. The model maps camera views and instructions directly to robot actions, integrating a lightweight memory mechanism inside its action expert. This approach helps robotic arms execute tasks with greater stability and less oscillation.

Pretrained exclusively on public data, REKI was trained on a mixture containing one billion frames and over twelve million vision-language samples. The model demonstrates strong performance across standard robotics benchmarks, achieving a top score of 90.4 percent on LIBERO-Plus. Its memory mechanism relies on cached register tokens that process past frames with minimal computational overhead.

By incorporating memory, REKI addresses a common failure mode in robotic manipulation where arms oscillate between poses due to perceptual aliasing. Testing showed that memory reduced oscillating episodes significantly on benchmarks like RoboTwin. The added memory cache consumes only a small amount of GPU memory per past frame and adds negligible processing time.

All model weights are publicly available on Hugging Face, with multiple checkpoints provided for fine-tuning across different simulation suites and real-world robot arms. The release offers an efficient open tool for researchers working on robot control and embodied artificial intelligence.
