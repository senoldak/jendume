---
lang: en
title: "qwenGPU brings compiled CUDA layers directly to Qwen3.5-2B model"
description: "Developers have released qwenGPU, an experimental model that integrates compiled GPU layers into Qwen3.5-2B to execute real CUDA instructions within model weights."
category: teknoloji
date: 2026-11-02T09:51:00.411Z
esId: "qwengpu-qwen3-5-2b-modeline-derlenmis-gpu-katmanlari-ekleyerek-cuda-calistiriyor"
bolge: "Global"
perspektif: "This development opens a new research frontier in AI architecture by enabling large language models to perform exact computations directly within their pretrained weights rather than alongside them."
why_matters: "Enabling language models to run hardware simulations within their own weights could fundamentally transform future AI computing paradigms."
key_points:
  - "45 compiled GPU layers added to Qwen3.5-2B."
  - "Reference interpreter matched Tesla T4 on 49 kernels."
  - "Runs at 10 to 15 tokens per second on Apple MPS."
rakamlar:
  - etiket: "Total layers"
    deger: "69"
  - etiket: "Test kernels"
    deger: "49"
  - etiket: "Token speed"
    deger: "10-15 tokens/second"
  - etiket: "Free memory"
    deger: "16 GB"
kaynakIzi: "v1.n176BsJPyfsnawyz.vWxrKgg0JoYWOGosEbZb2GtLOJ6f768RoXe2dqgkqwmjvHL5IX1e8gxQgTgsbulOmV2jLQby9tiEA5AR5yCra9nbq1k9FrXo0C8tVcLF75uWaKQaO/FBELwefnO06M009Vd9Ox77yxFpRyvD+8l5UQJsoIrUVr2G9v1DYK73SdbUPP/6uVX37g1rndyTxMILj0bsUw=="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/01/qwengpu-simt-gpu-compiled-into-qwen3-5-2b-weights-runs-cuda/"
haberDegeri: 88
featured: false
breaking: false
draft: false
---

Developed by Vixhal and released on GitHub under the MIT license, qwenGPU introduces an experimental approach to model computation. The system places 45 compiled transformer layers in front of Qwen3.5-2B's native 24 layers, totaling 69 layers where none of the added layers are trained and a compiler computes every weight directly into the structure. This innovative approach provides a fresh perspective on how hardware and software layers can merge within artificial intelligence models.

The system utilizes the Gated DeltaNet recurrent state as memory cells to hold program ROM, registers, and global memory. During execution, the host compiles CUDA code to PTX and feeds inputs into the model as tokens, allowing the model itself to handle launch steps while the recurrent state maintains necessary program data without relying on external runtimes for those operations. According to the source material, the model can answer questions using GPU-computed numbers in normal mode and write correct kernels in advanced mode.

According to test results, the reference interpreter matched a real NVIDIA Tesla T4 on all 49 test kernels. Running at 10 to 15 tokens per second on Apple MPS, the project serves as a research demonstration rather than a production runtime, allowing developers to test exact computation inside a pretrained large language model. Developers can also switch between normal and advanced modes to observe the model capabilities across different scenarios.

Running the quickstart requires Python 3.11 and approximately 16 GB of free memory along with tools like uv and just. The repository does not publish prebuilt checkpoints, requiring users to compile the GPU directly into the base model during setup under Qwen's Apache-2.0 license. This process enables researchers to conduct experimental hardware simulations within their own local environments.
