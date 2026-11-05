---
lang: en
title: "Seoul National University develops tools to slash AI data traffic and response delays"
description: "Researchers introduced TACToC and mzCache, technologies designed to reduce data transmission costs and eliminate memory bottlenecks for AI on mobile devices."
category: teknoloji
date: 2026-11-05T17:50:52.539Z
esId: "seoul-ulusal-universitesi-yapay-zeka-veri-trafigini-ve-gecikmeleri-azaltan-siste"
bolge: "Asia"
perspektif: "This development enables AI to run much faster and more efficiently on resource-constrained devices like smartphones and autonomous vehicles. For users, this translates to longer battery life, lower data usage, and near-instant responses when switching between apps."
why_matters: "It enables AI to run faster and with less data consumption on everyday devices, enhancing the efficiency of autonomous systems and personal assistants."
key_points:
  - "TACToC system reduces communication costs by up to 14.5x."
  - "mzCache technology speeds up AI response times by 5.5x."
rakamlar:
  - etiket: "Data Savings"
    deger: "14.5x"
  - etiket: "Response Speedup"
    deger: "5.5x"
  - etiket: "Accuracy Loss"
    deger: "< 3%"
  - etiket: "Memory Usage"
    deger: "5-7 GB"
kaynakIzi: "v1.zKzPIn5TZW03eSRj.Ykt/PHkSP3hRkygrL9yLGxGnIsJ0atFHNC8Rp0rJ8SFeoiA0yu6LWG6lZaMDpOPPo6AeAayda6qTMPq1oe7TeoZIBQ1YC7VSszHvLS2/gRJxycNueWiMUMPttUXgxFz+AZ4P4cYFOGUqV3ZU7pBIOy9AGXmAYZwR2+y7p067MA=="
kaynakAdlari:
  - ad: "TechXplore"
    url: "https://techxplore.com/news/2026-11-communication-memory-tools-ai-traffic.html"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

A research team led by Professor Kyunghan Lee at Seoul National University has developed two groundbreaking technologies to address the primary hurdles of AI systems: high data traffic and memory bottlenecks. Named TACToC and mzCache, these systems aim to fundamentally transform AI performance on edge devices such as smartphones, autonomous vehicles, and robots.

The TACToC system optimizes video data sent to servers for AI analysis. While conventional methods transmit entire images, TACToC selectively identifies and transmits only the critical features required for specific AI tasks. For instance, when an autonomous vehicle's camera is used for both object recognition and distance estimation, the system extracts only the visual details necessary for each task. This approach reduces communication costs by up to 14.5 times while keeping accuracy loss within 3 percentage points.

mzCache focuses on memory management within smartphones. Currently, an AI model and its conversation history can consume between 5 to 7 GB of memory. When a user switches to another app, the operating system reclaims this memory, leading to response delays of up to 16 seconds upon return. mzCache divides memory into small units and restores data in a layered sequence, reducing the initial response time by up to 5.5 times.

Research results indicate that these technologies can be deployed without modifying existing communication infrastructures. Tests conducted on devices like the NVIDIA Jetson AGX Orin achieved processing speeds of 21 frames per second. These innovations represent a critical milestone for the expansion of on-device AI applications, where keeping data on the device is preferred for privacy reasons.
