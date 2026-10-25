---
lang: en
title: "OpenMobile-2 sets a new benchmark for open-source smartphone AI agents"
description: "Researchers have released OpenMobile-2, open-source smartphone agent models that rival proprietary systems."
category: teknoloji
date: 2026-10-25T07:50:58.565Z
esId: "openmobile-2-akilli-telefon-ajanlari-icin-acik-kaynakli-yeni-bir-donem-baslatiyo"
bolge: "Global"
perspektif: "This development narrows the gap between open-source models and proprietary AI, making advanced smartphone automation more accessible and transparent."
why_matters: "It advances open-source smartphone automation, allowing researchers and developers to build and test capable agents without relying entirely on closed ecosystems."
key_points:
  - "OpenMobile-2 introduces models with 9 billion and 27 billion parameters."
  - "The larger model scored 59.6 points on SPA-Bench on real Android devices."
  - "The training setup covers simulations of over 110 applications."
rakamlar:
  - etiket: "Parameters"
    deger: "27 billion"
  - etiket: "Applications"
    deger: "110+"
  - etiket: "Workflows"
    deger: "11,600"
  - etiket: "SPA-Bench score"
    deger: "59.6"
kaynakIzi: "v1.40vXKJONPmer6vne.4eSXZaJxc72Mw2CFYjvKgRN94YAg4o6wlMn7yuYxuoHJ0YfjuQhr7cQUmha2sYIpKRTHTsK7IfEeemc4JRtiQQtuaDSwO6Ctfxnb1thz2fuALBIKiVajBl6FYMzVtZmd9S1bN99RqTaM3Wezj5U2MjVhtY1pocESntnWDMvTGhecNFGLeCk4eyyQmhENSSn9/0R3PBmE"
featured: false
breaking: false
draft: false
---

Researchers have developed OpenMobile-2 to improve how open-source AI agents operate smartphone apps. Because training data for autonomous app navigation is often locked inside big tech companies, open models have traditionally lagged behind. To close this gap, the team released two agent models built on Qwen with 9 billion and 27 billion parameters, alongside the complete training environment and data.

Training on real applications is inherently difficult due to login requirements, purchases, and state persistence issues. To solve this, the researchers rebuilt popular apps, combining them with existing simulations and emulator environments to cover more than 110 applications. Using a teacher model, they generated roughly 11,600 example workflows and over 2,000 practice tasks. The agents operate solely by observing screenshots, mimicking human usage without accessing internal app data.

The models show clear performance gains across established benchmarks. On AndroidWorld and MobileWorld, both models improved substantially. Most notably, on real Android devices using the SPA-Bench test, the larger model climbed from 31.9 to 59.6 points, marking the highest score among open models. The study also highlighted that increasing the diversity of apps during training matters more than simply scaling the total volume of data.

Additionally, the researchers experimented with direct command shortcuts, allowing agents to bypass menu navigation. Once specifically trained, agents successfully utilized these shortcuts to solve tasks using fewer steps. This open-source framework provides a transparent and reproducible foundation for future mobile AI agent research.
