---
lang: en
title: "Google launches ML Drift open-source GPU compute engine for AI workloads"
description: "Google has launched ML Drift, an open-source cross-platform GPU compute engine designed to accelerate on-device artificial intelligence and machine learning workloads."
category: teknoloji
date: 2026-10-25T17:50:59.053Z
esId: "google-yapay-zeka-islemleri-icin-ml-drift-adli-acik-kaynakli-motoru-duyurdu"
bolge: "Global"
perspektif: "This development makes it easier for developers to run advanced AI models efficiently across diverse edge devices, accelerating the deployment of on-device intelligence."
why_matters: "By unifying GPU hardware acceleration for edge devices, ML Drift simplifies on-device machine learning and enables smoother generative AI experiences on mobile and desktop platforms."
key_points:
  - "The framework is licensed under Apache 2.0 as an open-source cross-platform GPU compute engine."
  - "Benchmarks with Gemma models showed a reduced memory overhead."
  - "Supported applications achieve a reduction in average frame latency."
rakamlar:
  - etiket: "Memory overhead reduction"
    deger: "12%"
  - etiket: "Frame latency reduction"
    deger: "40%"
kaynakIzi: "v1.bIXSt3NEh9zx/udj.xUQOOp6xt3qfDo8KdJ1U8lc0L7zS9hDPxy9o5rwDzdxgtRIgLJC8w5cYqr/H70+wX0AgHMRpSS2ZbZVc1IYIbXESUAhJcDUIKYBU19GiJFpoOdnnJnooOpGI66QsH/TP8zm7OgUqYSb6g0eyrNJn0tw62CoiYctjFYhGOVwkwweqgLiRN39xqqQBA55rp/5PZO36kR7OPb/MxBwXVFxCwWaL5PUFTy6f1O5Q9xZWkzQrJE/nN+fEdBkRIGb8z9uwZ9Y="
featured: false
breaking: false
draft: false
---

Google has introduced an open-source and cross-platform graphics processing unit computation framework developed for local machine learning tasks. Available under the Apache 2.0 license, the newly developed architecture hides the complexity of various hardware components and low-level programming interfaces, offering compatibility with multiple graphics standards. Serving as the primary acceleration framework behind LiteRT, the system enables creators to build customized execution pipelines for computer vision, audio analysis, and generative applications.

Engineers building software for edge hardware frequently encounter disparate silicon architectures and proprietary drivers. To address this fragmentation, the new software provides foundational improvements over legacy delegates, featuring virtualized tensor structures, extensible custom operations, and native five-dimensional tensor management. It also integrates specialized optimizations targeted at processors designed by Arm, Intel, and Qualcomm to maximize silicon utilization.

The runtime environment broadens desktop compatibility for Windows and Linux operating systems via Chromium graphics layers, while preserving native backend support for macOS devices. Company benchmarks utilizing Gemma models demonstrated a reduced memory footprint compared to alternative frameworks. Furthermore, the architecture is already deployed across massive consumer populations via popular applications including web browsers, short-form video feeds, image galleries, and communication tools.

Performance metrics indicate substantial improvements across supported platforms, including reduced frame latency for segmentation filters and faster computational photography pipelines. Additional software suites such as professional photo editing programs and messaging applications also register notable speed enhancements. Following this deployment, the organization plans to discontinue updates for its older graphics delegation components, directing developers toward the updated acceleration stack.
