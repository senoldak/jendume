---
lang: en
title: "Meta details Prometheus supercluster in Ohio aiming for 1 million GPUs"
description: "Meta detailed plans to grow its Prometheus data centre cluster in New Albany, Ohio, to about 1 million Nvidia GPUs."
category: teknoloji
date: 2026-10-20T21:50:54.756Z
bolge: "USA"
perspektif: "This massive AI infrastructure investment highlights the immense computing power, hardware reliability, and energy required to train next-generation artificial intelligence models."
why_matters: "This massive AI infrastructure investment highlights the immense computing power, hardware reliability, and energy required to train next-generation artificial intelligence models."
key_points:
  - "Prometheus supercluster will scale to about 1 million GPUs."
  - "Muse models were trained using this infrastructure."
  - "Dynamo Dimmer software helps manage power spikes."
rakamlar:
  - etiket: "GPU Target"
    deger: "1 million"
  - etiket: "Pre-training Productivity"
    deger: "85%"
  - etiket: "Reinforcement Learning"
    deger: "90%"
  - etiket: "Power Swing"
    deger: "40%"
kaynakIzi: "v1.jafTbxCeqKGAO4SX.xuMWVfFxOAYKPpDSt3lOGEH/ReW/FxukOvO8Doflsh6PCXzkEOPkpCactv2Eyc2yD+5Lmlngz+2ucIgJuQiPXWCKkayOCn5Rzkv9mbtZsvgJXrASSVD+c56SxzU08WlrsLPKPrNzp5INPx9Q6tmU9iul4UBwgViCz+XZ5g=="
featured: false
breaking: true
draft: false
---

Meta has shared the engineering details of its Prometheus supercluster located in New Albany, Ohio. The facility already runs hundreds of thousands of Nvidia GPUs across multiple buildings, and the company plans to scale it up to approximately 1 million. The first phase of the gigawatt-scale cluster is complete, which Meta used to train its Muse family of models. Previously functioning as a facility handling conventional web traffic, the location has evolved into a specialized hub.

The cluster runs platforms built around groups of 72 processors acting as a single accelerator. Catalina uses the GB200 NVL72, Clemente uses the newer GB300 NVL72, and an upcoming San Miguel platform will introduce Nvidia's Vera Rubin hardware. The units are housed across traditional facilities, structures optimized specifically for machine learning workloads, and rapid-deployment buildings linked by extensive fiber networks.

At this scale, hardware faults and signal quality present significant engineering challenges. During the initial deployment phase, system interruptions reached substantial peaks across thousands of units, which a year of engineering work successfully reduced by a massive margin. Early challenges involved maintaining signal integrity across vast arrays of high-speed interconnects. During the training of Muse Wonder, the cluster maintained over 85% pre-training productivity and over 90% for reinforcement learning.

To handle power draw swings of 30% to 40% when starting or pausing large workloads, Meta uses software called Dynamo Dimmer alongside battery systems at rack, facility, and grid levels. Meta states it pays the full cost of its energy and matches it with clean and renewable sources, while applying lessons learned to its next supercluster, Hyperion, in Louisiana.
