---
lang: en
title: "Baseten releases bison-1 and groundhog-1 decision models"
description: "Baseten has launched bison-1 and groundhog-1, two new decision models built on Google's backbone that return calibrated probabilities instead of generating text."
category: teknoloji
date: 2026-11-21T05:50:53.152Z
esId: "baseten-bison-1-ve-groundhog-1-karar-modellerini-tanitti"
bolge: "Global"
perspektif: "These decision models streamline routing, triage, and guardrail pipelines by returning precise probabilities and scores rather than generating text."
why_matters: "These decision models allow developers to run efficient, calibrated classification and routing tasks without generating costly output tokens."
key_points:
  - "bison-1 ranks #1 on the Artificial Analysis Decision Index v2.1 with a score of 76."
  - "Both models support an expanded context window of 128k tokens."
  - "Input pricing is set at $0.10 per 1M tokens for bison-1 and $0.035 for groundhog-1."
rakamlar:
  - etiket: "bison-1 score"
    deger: "76"
  - etiket: "Context length"
    deger: "128k tokens"
  - etiket: "bison-1 price"
    deger: "$0.10"
  - etiket: "groundhog-1 price"
    deger: "$0.035"
kaynakIzi: "v1.CgWDlueK1JWtdHAW.aY7PGPOAYe/SMJqeKslOX7gosF7tTy7NMEDocr2gr4sf9vFHT0l3VSRwOa2a9gluL5shXGX7oDTVV7rYCJM88Ciy8oaqq4e/fLDuXUbTXEDmqW5QzWnOa01haILml6oBGPAzOrGSu5vIq4Y3Tdm7i2RDvEE2ObD3IxbTdEWzNQyGOX/sktDPQkLCgME="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/20/baseten-bison-1-groundhog-1-gemma-4-decision-models/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

Baseten has introduced bison-1 and groundhog-1, two open-weight decision models designed to return calibrated probabilities for yes or no, choice, and score questions rather than writing text. Built upon Google architecture, both systems expand context capacity to 128k tokens while accepting image inputs simultaneously. By bypassing output token generation entirely, these specialized architectures allow developers to execute comprehensive policy evaluations and historical log reviews within a single API call for routing, triage, and guardrail pipelines.

The flagship bison-1 model achieved a score of 76 on the Artificial Analysis Decision Index v2.1, securing the top ranking out of 19 evaluated models. Featuring a dense 31B parameter construction, bison-1 surpassed prior leading benchmarks. Meanwhile, its companion model groundhog-1 operates as an alternative engineered around roughly 4 billion active parameters per token through an expert routing design, offering reduced operational expenditures for developers.

Both systems are currently accessible via Baseten Model APIs alongside open BF16 weights hosted on Hugging Face. Pricing structures are established at $0.10 per one million input tokens for bison-1, whereas groundhog-1 is priced at $0.035 for an equivalent volume of inputs. The underlying training infrastructure required substantial computational power, deploying 192 B200 accelerators for the primary model and 128 units for its counterpart.

These newly released systems grant engineering teams enhanced probabilistic calibration capabilities and expanded context windows, facilitating more reliable decision-making processes across automated enterprise workflows and intelligent routing infrastructures.
