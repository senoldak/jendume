---
lang: en
title: "MBZUAI releases PAN 2 as an open world model for physical AI"
description: "The Institute of Foundation Models at MBZUAI has launched PAN 2, an open-source world model designed to simulate physical actions for robotics and agents."
category: yapay-zeka
date: 2026-11-11T07:50:52.763Z
esId: "mbzuai-fiziksel-yapay-zeka-icin-acik-kaynakli-pan-2-modelini-duyurdu"
bolge: "Global"
perspektif: "This development empowers robotic and autonomous systems to safely simulate complex plans in a virtual environment before taking real-world actions, bridging digital reasoning with physical interaction."
why_matters: "This development enables robotic systems and autonomous agents to test complex tasks in a safe virtual environment, significantly accelerating the advancement of physical AI applications."
key_points:
  - "PAN 2 is a 29B-parameter open-source physical AI world model."
  - "It achieved a 34 percent completion rate on multi-step plans."
  - "All model weights and codes are released under the Apache 2.0 license."
rakamlar:
  - etiket: "Model size"
    deger: "29B parameters"
  - etiket: "Plan completion"
    deger: "34.0%"
kaynakIzi: "v1.L8kCff8S7l33tYDJ.mqVebz24T4b7W0X0i5wWG0Ul1B4coMwW3ewb0GUqOeEF/EvBOfmT2EujG/H20Get2J0CtcUy5qv7CKRux+m2x9Hl/FBWLifh92YEIVBXRscpjcIN9lTqN/ShIO10kJX4TKxZaUvw1ngupLr2r+22kSjraQ=="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/10/ifm-pan-2-open-world-model/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

The Institute of Foundation Models at MBZUAI has released PAN 2, an open world model focused on physical artificial intelligence. The model takes a scene description and a text action as inputs, simulating the resulting outcome as a video. Released under the Apache 2.0 license, its weights, training code, and inference codes are now available to developers, enabling robotics and agent teams to test plans in a simulation environment before executing them.

PAN 2 divides the simulation process into two distinct reasoning types: conceptual and perceptual. During conceptual reasoning, a language model reads observations and requested actions to map out future world states, while perceptual reasoning relies on a 29-billion-parameter diffusion model to predict video latents. Ablation tests show that removing the language model drops full-plan completion rates drastically, highlighting the crucial synergy between the components.

Performance benchmarks indicate strong capabilities in multi-step tasks. In evaluations covering one hundred multi-step tasks, the model achieved a 34 percent full-plan completion rate, outperforming competing models in this specific category. However, it still trails behind certain alternatives in single-action scenarios and human preference ratings. The release also includes a dedicated guardrail system to mitigate unsafe outputs from text-to-video requests.

Supporting both text-to-video and image-to-video generation, PAN 2 can be executed through popular frameworks such as Hugging Face Diffusers and vLLM, though it requires data-center grade GPUs to run the full model. By providing open access to its architecture and weights, the release aims to accelerate research and practical deployment in the field of physical AI simulations.
