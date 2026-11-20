---
lang: en
title: "Gemini API introduces Tool Retrieval to manage agent tools efficiently"
description: "Google launched Tool Retrieval in preview for the Gemini API, enabling AI agents to manage large tool libraries more efficiently by loading schemas on demand."
category: teknoloji
date: 2026-11-20T03:50:53.631Z
esId: "gemini-api-yeni-tool-retrieval-ozelligi-ile-arac-yonetimini-kolaylastiriyor"
bolge: "Global"
perspektif: "This feature allows AI agents to load parameter schemas only when needed, reducing input token costs and latency for complex tasks."
why_matters: "It optimizes agent performance and reduces token costs by loading tool schemas only when required during complex tasks."
key_points:
  - "Tool Retrieval is available in preview within the Interactions API."
  - "Parameter schemas are loaded on demand to reduce input token counts and latency."
  - "Supported by Gemini 3.6 and later models, including all Gemini 4 models."
kaynakIzi: "v1.DuQGEoyYcCffH0rt.43MDtVdOg5mwMxwlbeeVtKl9S3VpiSO7HJIQrvms/skjT2ItUPEz16gAefhqONsJJeg64cdE8hcBsoHhOUHO1xnMsca8H2qEdSGe5fLIBRgiOyGWskuy75xSW/NLeLTk90eNUFJPxYyCt5ZxibhDiSX0BDdcdwSQqESbMZ9upHB2uhCRLw2932BDZw1rPw=="
kaynaklar:
  - ad: "Google AI Blog"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tool-retrieval/"
haberDegeri: 80
featured: false
breaking: false
draft: false
---

Google has introduced Tool Retrieval within the Gemini API, currently available in preview inside the Interactions API, to assist developers in governing extensive software tool collections with greater efficiency. Rather than transmitting every tool simultaneously during each prompt, an autonomous agent now maintains a standby library and retrieves precise details exclusively when a specific task demands them.

When an agent establishes connections with dozens or upwards of hundreds of utilities, transmitting complete parameter schemas on every single request inflates input token totals, introduces operational latency, and degrades selection precision. Tool Retrieval resolves this bottleneck by excluding parameter schemas from the active context until the model explicitly requests them. Developers activate this capability by integrating a search mechanism and configuring deferred loading attributes appropriately for designated utilities.

Within a singular interface call, the model queries the required function, the system retrieves its corresponding schema, and the model executes the function call. This entire procedure remains transparent and easily verifiable during diagnostic evaluations. Furthermore, the functionality integrates with prefix caching mechanisms and remote server connections, ensuring conversational prefix consistency across multiple turns.

Tool Retrieval incurs no separate financial surcharges and bills consumption at standard input and output token rates established for the executing model. By omitting unrequested schemas from the initial prompt context, developers preserve token bandwidth when operating extensive utility collections.

The capability remains fully compatible with Gemini 3.6 and subsequent versions, encompassing all Gemini 4 model variants, accessible currently inside the Interactions API for developers engineering responsive software solutions.
