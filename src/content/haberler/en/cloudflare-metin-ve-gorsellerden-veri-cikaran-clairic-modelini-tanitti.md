---
lang: en
title: "Cloudflare releases Clairic extraction model on Workers AI"
description: "Cloudflare has launched a preview of Clairic, a new extraction model on Workers AI designed to pull typed values from text and images."
category: teknoloji
date: 2026-10-20T09:50:56.012Z
bolge: "Global"
perspektif: "This model accelerates data extraction workflows by returning typed values instead of generated text, reducing costs and latency for developers while improving reliability."
why_matters: "It improves developer workflows by delivering structured data rapidly and cost-effectively, shifting AI utility from generation to precise data extraction."
key_points:
  - "Clairic is available as a preview on Workers AI."
  - "Input pricing is set at 0.10 dollars per million tokens with no output fees."
  - "The extraction step completed in 0.46 seconds."
rakamlar:
  - etiket: "Input pricing"
    deger: "0.10 dollars"
  - etiket: "Context window"
    deger: "65,536 tokens"
  - etiket: "Extraction time"
    deger: "0.46 seconds"
kaynakIzi: "v1.l2mvZV479sVE1iHY.bfTHlGPto1i3JNb+YsdMSgRjXbYYrSQDpHj187CJfDd65Xu8ZBlnBzdTTXou0LviZyIB1wyffVm7yKH4zVvOWDUtqU5aWkt13YjVeYYBffS6KQmeaORzJx8bakNaOlD60EgBJoFi25noPohtutPexo7tVyHPIoQ87tCZmSKJxK8KFFpjJWBSyr/+7qMOIRU0fVKb6i/Nr5hgNG4V/hL8bQ=="
featured: false
breaking: false
draft: false
---

Cloudflare has expanded its artificial intelligence offerings by releasing a preview of Clairic, a new extraction model hosted on Workers AI. Unlike traditional large language models that generate conversational text, Clairic reads unstructured text or images and returns precise typed values such as totals, dates, and IDs in a single forward pass without generating output tokens. Targeting tasks typically assigned to LLMs, Clairic processes inputs efficiently by avoiding reasoning steps and output generation.

The model supports up to 4 images per request and features a 65,536-token context window. Every scalar answer includes confidence scores and null probabilities, ensuring greater reliability in automated pipelines. According to benchmarks shared by Cloudflare, implementing Clairic in claims processing pipelines significantly outperformed standard full-LLM approaches in speed and cost efficiency, achieving a 3.2x overall speedup in the tested claims pipeline.

During tests involving support emails and receipts, the model successfully extracted required values and returned null for absent data without making plausible guesses. In comparative benchmarks, the extraction step completed in 0.46 seconds, drastically outperforming alternative models while reducing overall pipeline costs per million claims.

Pricing is structured at 0.10 dollars per million input tokens with no charges for output tokens. While currently available in preview through Workers AI bindings and REST APIs, the model weights have not yet been released for local hosting.
