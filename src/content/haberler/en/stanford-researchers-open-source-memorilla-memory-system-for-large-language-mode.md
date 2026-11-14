---
lang: en
title: "Stanford researchers open-source Memorilla memory system for large language models"
description: "Stanford University researchers have released Memorilla, an open-source memory system that allows frozen large language models to process vast document collections using just 16 memory tokens."
category: bilim
date: 2026-11-14T13:50:54.599Z
esId: "stanford-arastirmacilari-buyuk-dil-modelleri-icin-memorilla-bellek-sistemini-yay"
bolge: "Global"
perspektif: "This development overcomes the speed and cost bottlenecks large language models face when processing massive texts, enabling artificial intelligence to analyze huge datasets efficiently and swiftly."
why_matters: "This artificial intelligence advancement improves the efficiency of AI applications by enabling large language models to process massive datasets with minimal memory consumption and high speed."
key_points:
  - "Memorilla condenses whole document collections into 16 memory tokens for frozen large language models."
  - "The Qwen3-8B model achieved an 84.33% accuracy score on FactKG."
  - "The module features 194 million parameters and is released as open source under the Apache 2.0 license."
rakamlar:
  - etiket: "Memory tokens"
    deger: "16"
  - etiket: "FactKG score"
    deger: "84.33%"
  - etiket: "Parameters"
    deger: "194 million"
kaynakIzi: "v1.Hk6drOJ+1stZBJZI.lijpinPjCujvLKPmdLR97UNta5o2aXUD8ytCDBrf8ed4IFMjjYvHwr9JPZLRjNQOt1G8B6Cz+qg0AJ7lqswHQ6gyyB4IKaI6+1BLlubE8MfZDtyGLWvhUifv9ctcVJwmgEAzVL7mfZH2Ar1Z5Ak8prfmQSfeCSSj+tVfje/0ScjS4OiquKURwm5D"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/14/stanford-memorilla-memory-system-16-memory-tokens/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

A team of researchers from Stanford University has released an open-source memory module named Memorilla, designed to enhance the data processing capacity of large language models. The newly developed system scans massive document collections and passes only 16 memory tokens to frozen artificial intelligence models. This approach allows models to achieve high accuracy rates with significantly less data, eliminating the need to load entire documents directly into the context window.

The system was developed by the SNAP group led by Jure Leskovec, with contributions from researchers at Toronto, Penn, and MIT. While traditional methods either feed all text directly to the model or retrieve similar chunks while potentially missing weaker clues, Memorilla takes a third route by learning what each question needs from the entire data store. The pipeline operates in three steps: encoding documents once, reading through 16 learned slots per question, and injecting these tokens into the model's input space.

According to benchmark results, the Qwen3-8B model using Memorilla achieved an 84.33% accuracy rate on FactKG, compared to 80.43% using the full context method. The system also reached a 44.60% accuracy rate on PersonaMem-v2. The 194-million-parameter trainable memory module, along with its code, training recipes, and checkpoints, has been made publicly available under the Apache 2.0 license.

On the hardware side, the system runs on Linux with CUDA GPUs and requires a GPU with at least 80 gigabytes of memory for quickstarts. Alongside Memorilla, the research team also released the PersonalizationV4 dataset containing 149 synthetic users under a CC BY 4.0 license. This new memory module represents a significant step forward in improving the information processing efficiency of artificial intelligence.
