---
lang: en
title: "Runway releases Praxis-1 robot control model with open source code"
description: "Runway has released its robot control model Praxis-1 with open weights and source code, translating video learning into physical actions."
category: teknoloji
date: 2026-11-14T09:50:54.981Z
esId: "runway-robot-kontrol-modeli-praxis-1-i-acik-kaynak-olarak-kullanima-sundu"
bolge: "Global"
perspektif: "This development reduces the need for expensive, robot-specific datasets, accelerating how artificial intelligence interacts with the physical world."
why_matters: "This development reduces the need for expensive, robot-specific datasets, accelerating how artificial intelligence interacts with the physical world."
key_points:
  - "Praxis-1 released open-source under the Apache 2.0 license."
  - "Achieved a 46.2 percent success rate on the RoboLab-120 benchmark."
  - "Standard model version requires an 80 GB GPU."
rakamlar:
  - etiket: "RoboLab-120 success"
    deger: "46.2%"
  - etiket: "Franka test success"
    deger: "88 trials"
  - etiket: "Standard model VRAM"
    deger: "80 GB"
  - etiket: "Compressed model VRAM"
    deger: "32 GB"
kaynakIzi: "v1.TsD2TyroASbfqWOJ.C1OodfukBdAnH8wgRxCv5GPyx9BQlzwqDtHrKoOxRanVd96p5FLSTWHdZDySGZOk1XFrdZgvuh9ZBPjNH5f2kP2u2Fh28aNclHOBVizfN97JhNzBg/q75GRCnrisO6ubzFDpXldhnqJuwxcbUxWtFJ700o8aDYTVIXmpIxFUhY+C/4kK/mlLrcBjBw=="
kaynakAdlari:
  - ad: "The Decoder"
    url: "https://the-decoder.com/runways-open-source-praxis-1-turns-video-ai-into-a-robot-controller/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

Runway has released its robot control model, Praxis-1, under the Apache 2.0 license, making both the source code and model weights available to the public. Initially introduced to select partners in late September, the system is now accessible to the broader developer community. Praxis-1 operates by ingesting camera images, text instructions, and robot position data to predict environmental changes, subsequently calculating the precise movements required for the robot to interact with its surroundings.

The model is built upon a foundational video architecture that learned object movement and interaction patterns from ordinary video footage. Runway fine-tuned this system using human action videos and specific robot data. This approach aims to mitigate the reliance on expensive, specialized datasets that have historically been required to train robotic systems. Since September, robotics firms including Standard Bots, Noble Machines, and Ultra have been evaluating Praxis-1 across various platforms, such as humanoid robots, industrial arms, and dual-arm warehouse systems.

In performance benchmarks, Praxis-1 achieved a 46.2 percent success rate on Nvidia's RoboLab-120 simulation, placing it at the top of the 'World Action Model' category. During physical tests using a Franka robot arm, the model successfully completed 88 trials across ten distinct tasks. Furthermore, when tested with data from a mobile robot platform, the model reached an 80 percent success rate.

Developers can download the model via Hugging Face and access the code on GitHub. The standard version requires a GPU with 80 GB of memory, while a compressed version is estimated to function on hardware with 32 GB of VRAM. Runway notes that while the model is effective for fast execution, it currently struggles with complex planning and vague instructions, envisioning it as a component that could eventually work alongside general-purpose AI systems.
