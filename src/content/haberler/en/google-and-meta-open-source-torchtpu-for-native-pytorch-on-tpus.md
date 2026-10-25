---
lang: en
title: "Google and Meta open-source TorchTPU for native PyTorch on TPUs"
description: "Google and Meta have open-sourced TorchTPU, enabling native PyTorch execution on Google Tensor Processing Units."
category: teknoloji
date: 2026-10-25T19:50:57.673Z
esId: "google-ve-meta-pytorch-icin-torchtpu-yazilimini-acik-kaynak-olarak-duyurdu"
bolge: "Global"
perspektif: "This development reduces reliance on a single hardware vendor, making it much easier for developers to run and port AI models across different chips."
why_matters: "This development reduces reliance on a single hardware vendor, making it much easier for developers to run and port AI models across different chips."
key_points:
  - "Google and Meta open-sourced TorchTPU at the PyTorch Conference."
  - "A Qwen3 model was successfully run on 8,192 TPU v7x chips."
  - "Amazon Web Services released TorchNeuron for Trainium chips in public beta."
rakamlar:
  - etiket: "TPU chips"
    deger: "8,192"
kaynakIzi: "v1.OpEeHKV/X2lk/lDe.f2dI0RN64E7v9sZUcnpr6kDrMPtoedN6ZgyKQrfEY4Q2Kk1np3W5mEbeOQG9ZD1MoJtepni1z+S4Qa0ioE5cX9zFLbiyflA5+mK1hE0Gal2aKyOUg54MDw0SUDPD0zprQyHSnRndFydExmlz4/jKnsH6H32rSBuWhmUDFODw4lkJjB3W4UgdyqAI/xARHmhh2mTGsvJiHlSonGuaYT4N6XE/PIDrDiMjHwWLOth3JKWFdnFM0NvmbQ5ZmAzQNqD1hwkcVN8J3Q=="
featured: false
breaking: false
draft: false
---

At the PyTorch Conference in San Jose, Google and Meta open-sourced TorchTPU, a native backend that allows PyTorch models to run directly on Google's Tensor Processing Units (TPUs). Meta software engineer Zongwei Zhou stated that Meta plans to move large-scale language model workloads onto TPUs using the new system to achieve higher performance, reliability, and maintainability across diverse hardware architectures. The new backend replaces an older bridge from 2020 that required complex source-code modifications. With the update, developers can port a model with a simple code change from model.to('cuda') to model.to('tpu'). Bill Jia, VP of engineering for Core ML/AI at Google Cloud, noted that TPUs now join GPUs and CPUs as a native option for PyTorch. Conference data highlighted that inference has overtaken training as the largest data center workload, while agent token consumption has surpassed human consumption significantly. Alongside TorchTPU, four repositories were open-sourced, including vLLM-TorchTPU, SGLang-TorchTPU, and TorchTitan. Google demonstrated successful runs using a Qwen3 model across 8,192 TPU chips, achieving notable model FLOPs utilization. Meanwhile, Amazon Web Services launched its TorchNeuron backend for Trainium chips into public beta with similar code change capabilities. Analysts point out that while these extensions provide a common language through PyTorch extension points, optimization layers remain under vendor control, meaning developers must still account for tuning, sharding, kernel work, and capacity planning before achieving peak hardware performance.
