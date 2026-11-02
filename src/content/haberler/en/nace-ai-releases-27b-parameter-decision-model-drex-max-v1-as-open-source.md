---
lang: en
title: "Nace AI releases 27B parameter decision model Drex Max v1 as open source"
description: "Nace AI has released Drex Max v1, a new decision model capable of running on local hardware to manage complex decision-making processes."
category: teknoloji
date: 2026-11-01T09:51:00.812Z
esId: "nace-ai-27-milyar-parametreli-karar-modeli-drex-max-v1-i-acik-kaynak-olarak-sund"
bolge: "Global"
perspektif: "This development enables high-performance decision models to run on local hardware without relying on cloud servers, enhancing data privacy and accessibility."
why_matters: "The ability of high-performance decision models to run on local devices protects data privacy, reduces cloud costs, and provides a more secure environment for developers."
key_points:
  - "27B parameter decision model"
  - "Local support for Apple Silicon devices"
  - "262,144-token context window"
rakamlar:
  - etiket: "Parameter count"
    deger: "27 billion"
  - etiket: "Test score"
    deger: "67.52"
  - etiket: "Context window"
    deger: "262,144 tokens"
  - etiket: "Max options"
    deger: "255"
kaynakIzi: "v1.CU4G306bEfbw9cif.elh9aOoF+c3/jxXVjWdbgG8HNVpOfOIhD6+1Ukmi5NF/bZGe21yCzeWqMUm+eIZV8ym0TZR88wCrq8njSuoi6mM/F+NcAObRpLeI7lTQX00emSMk7e8iwVlhp3wk0yf/fOSn47Ui8pHlJbbmOn795uWn5EwZ9tzNdpx50SF+0BmVp1+QVlZtR8c="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/01/nace-ai-open-sources-drex-max-v1-local-inference/"
featured: false
breaking: true
draft: false
---

Nace AI has released its new decision model, Drex Max v1, as open source. This model features a 27-billion parameter architecture specialized in complex tasks such as routing, classification, and policy checks. The most notable feature for developers is the model's ability to run on local hardware without the need for cloud servers. This allows sensitive data to be processed securely without being sent externally.

The model's performance was recorded at 67.52 on the Decision Index 0.4 benchmark, surpassing the 61.25 score of the previous version, Drex v2.0. Utilizing a dense 64-layer architecture, the model boasts a large context window of 262,144 tokens. This capacity allows the model to analyze long texts or complex visual data in a single pass. Furthermore, its ability to evaluate 255 different options within a single query makes it highly efficient for automation processes.

Drex Max v1 makes decisions by calculating probabilities directly rather than generating text. This distinguishes it from chat-oriented models, making it an ideal candidate for "decision-making" agents such as ticket triage or guardrail checks. Its ability to run on Apple Silicon Macs, particularly those with 24 GB or 48 GB of RAM, significantly increases the accessibility of high-performance models for individual users and local developers.

Developers can use the model weights and necessary tools to run this system on their own local machines. Nace AI states that the Q8_0 GGUF version of the model delivers results with nearly the same accuracy as high-performance H100 GPUs. This development proves that artificial intelligence models can operate with high efficiency not only in massive data centers but also on personal computers.
