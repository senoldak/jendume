---
lang: en
title: "Perplexity launches Orchestrator API to unify access to frontier and open-weight models"
description: "Developers can now access models from OpenAI, Anthropic, and Google through a single interface with automatic failover."
category: teknoloji
date: 2026-11-19T21:51:00.183Z
esId: "perplexity-yapay-zeka-modelleri-icin-tek-bir-erisim-noktasi-sunan-orchestrator-a"
bolge: "Global"
perspektif: "This development allows developers to build more flexible and resilient AI applications without being locked into a single provider."
why_matters: "It simplifies AI infrastructure by allowing developers to manage multiple models through one endpoint, reducing downtime and integration complexity."
key_points:
  - "Unified access to over 85 models via a single API."
  - "Automatic failover ensures service continuity across providers."
  - "Natural language routing improves task completion rates."
rakamlar:
  - etiket: "Supported models"
    deger: "85+"
  - etiket: "Test success"
    deger: "41/63"
kaynakIzi: "v1.as8Pogd62nZ3mR1g.EBQQs6Mz9HEggZy9MaGww3+O0i8zDCYgMEg/xr95eg6WBzYLam6xrAqhPo0VfEzIdy5jAklI5tgBgW2t2n+9K1bi/ovWCE/ZFgauityGRcSqwineTqMTyZ2ic2BA60YDIpxZi5UKKxFxlxAWPDi1DKN0wqXiuujsYrz/+RcWncZeOkhQJeO0EWQeAg=="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/19/perplexity-orchestrator-api-failover-model-routing/"
haberDegeri: 80
featured: false
breaking: false
draft: false
---

Perplexity has launched the Orchestrator API, a unified gateway that allows developers to access a wide range of frontier and open-weight models through a single endpoint. This system aggregates models from major providers like OpenAI, Anthropic, Google, and xAI under one base URL. A primary challenge for developers is managing the reliability and integration of various AI models. This new API addresses this by providing automatic failover, meaning if one provider experiences an outage or rate limit, the system switches to another, ensuring continuous service.

The platform supports over 85 models across more than a dozen providers. A key feature is the "perplexity/auto" routing, which allows developers to route requests based on natural language descriptions. In tests using Terminal-Bench 4.1, this routing mechanism improved task completion rates, increasing successful outcomes from 38/63 to 41/63 by bypassing model refusals. This capability is useful for complex workflows where model constraints might otherwise block legitimate requests.

Pricing is based on the underlying model's standard per-token rate, with no additional platform fees. Access is tiered based on cumulative credit purchases. By simplifying the infrastructure layer, this tool enables developers to build more resilient applications without being locked into a single provider's ecosystem. Instead of managing multiple API integrations, teams can now focus on product development and model performance, using the best available technology for each specific task.
