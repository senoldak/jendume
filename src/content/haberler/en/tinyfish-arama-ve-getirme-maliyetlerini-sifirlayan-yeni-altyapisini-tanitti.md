---
lang: en
title: "TinyFish introduces infrastructure making web search free for AI agents"
description: "Web infrastructure company TinyFish has made search and fetch operations free within specific limits for AI agents."
category: teknoloji
date: 2026-10-18T19:50:59.763Z
bolge: "Global"
perspektif: "The retrieval and processing costs faced by AI agents while reading the web constitute a major budget item for developers. This move directly impacts the cost structure of autonomous agents."
why_matters: "Eliminating retrieval costs lowers development barriers for AI agents, accelerating the deployment of autonomous web systems."
key_points:
  - "TinyFish offers search and fetch operations for free within published limits."
  - "Search is free at 30 requests per minute and 500 per hour."
  - "Model cost is recorded at $9.30 per 1,000 benchmark tasks."
rakamlar:
  - etiket: "Search limit"
    deger: "30 requests/min"
  - etiket: "Model cost"
    deger: "$9.30"
  - etiket: "Task time"
    deger: "59 seconds"
kaynakIzi: "v1.z1xNAWvfggpHyehJ.y5kwc0ey9fX1XsOXgfa0zT4AuI4YmaW11oCnZavdd9ZeAVlz+KPUiaheHuNN/nA3bLJAI2kuP6sKj5iF5So59Ciu0Qs+Zkx+bZH8vtbzUcio4BTn+zRgDTkXgy4r2NRssl9fjAQYDyClRIsFW7IdSEC3eNP8FWm666XE1TDPLkBK"
featured: false
breaking: false
draft: false
---

AI agents reading the web face two main types of costs. The first is the retrieval charge billed per request by search or fetch APIs, and the second is the model processing cost consumed by tokens passed into the AI model. TinyFish notes that teams often budget for the model while underestimating how much retrieved content drives downstream token consumption.

The company has started offering search and fetch operations for web-native AI agents for free within published limits. According to the pricing structure, search remains free at 30 requests per minute and 500 per hour, while fetch is free at 150 URLs per minute and 1,000 per day. This allows developers to avoid retrieval charges while only incurring inference costs for the downstream model.

Data from the September 2026 benchmark snapshot shows that the TinyFish Search configuration posts a model cost of $9.30 per 1,000 benchmark tasks, achieving the lowest total cost among displayed configurations. The time per task was recorded at approximately 59 seconds. The company attributes its free retrieval pricing to its shared browser fleet and specialized web-native AI models.

Agent loops and context windows directly increase the token consumption of extracted web pages. While free search and retrieval provide cost advantages to developers, large web pages still occupy significant context space, keeping token management a crucial technical factor for agent efficiency.
