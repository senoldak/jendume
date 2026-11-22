---
lang: en
title: "Perplexity launches Monitor API to wake agents on web changes"
description: "Perplexity introduced a new Monitor API that watches the web on a schedule to wake agents and apps only when relevant changes occur."
category: teknoloji
date: 2026-11-22T15:50:51.019Z
esId: "perplexity-yapay-zeka-ajanlari-icin-yeni-monitor-api-yi-duyurdu"
bolge: "Global"
perspektif: "This tool simplifies how developers track web updates, enabling autonomous agents to react to real-time information without manual query management."
why_matters: "Automating web tracking for AI agents reduces engineering overhead and empowers automated workflows to act on timely information."
key_points:
  - "The Monitor API sends webhooks to agents when relevant changes occur."
  - "Web monitors cost $1 per 1,000 successful runs."
  - "Internal tests showed 63 relevant pages delivered in the first eight hours."
rakamlar:
  - etiket: "Web monitor cost"
    deger: "$1 per 1,000 runs"
  - etiket: "Page monitor cost"
    deger: "$1 per 1,000 URLs"
kaynakIzi: "v1.gK9SFLYMnPxM2Ef0.yOH+I9FxTssnuIiANm0aYiAgXWBr/NVUf3Tdd8q07W19DCtDkk/cbAMgFpL5tGaaw/5kByBx2iVUBfdbUS2+d5KgVWPfGYk42OitRTYP70qz5tm2wOKZ9ywha+HoPK5zoqyBbDbRNCg9VA/6Ck1ckYFEs6luFQKInlyIIw5rmYBnJGvgdSPCmjWd1I0QwHOVTV3pJO8RNqlkbM0R8MsNl5U="
kaynakAdlari:
  - ad: "The Decoder"
    url: "https://the-decoder.com/perplexitys-new-monitor-api-turns-web-search-from-a-one-off-query-into-a-nonstop-watchdog/"
haberDegeri: 82
featured: false
breaking: false
draft: false
---

Perplexity is expanding its developer ecosystem with a new Monitor API designed to watch the web and notify applications and agents via webhook. Previously, engineering teams had to handle recurring searches and custom duplicate-removal code manually, a method that becomes impractical across large scales.

The API features two distinct modes. Web monitors run regular queries to catch developments such as funding rounds, while page monitors track specific URLs for pricing changes or policy updates. Perplexity evaluates the results using its own decision model against natural language goals, ensuring updates are sent only when relevance and confidence thresholds are met.

Monitors can be scheduled from every fifteen minutes to weekly intervals. In early internal tests across sixty topics over the first eight hours, Perplexity delivered sixty-three fresh and relevant pages compared to lower numbers from competitors like Firecrawl and Exa. Pricing is set at one dollar per one thousand successful runs for web monitors and one dollar per one thousand fetched URLs for page monitors.

The service targets use cases such as sales teams tracking target accounts, compliance officers monitoring regulatory updates, and financial analysts reviewing corporate changes. As search engines evolve to feature advanced chatbot and agent capabilities, developer-focused tools play a crucial role in commercial sustainability.
