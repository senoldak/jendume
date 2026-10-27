---
lang: en
title: "Google Research introduces sleep framework for continual learning in LLMs"
description: "Google Research has introduced a sleep framework for large language models to enable continual learning and prevent catastrophic forgetting."
category: yapay-zeka
date: 2026-10-27T17:51:02.057Z
esId: "google-research-buyuk-dil-modelleri-icin-uyku-asamasini-tanitti"
bolge: "Global"
perspektif: "This development allows artificial intelligence models to overcome static knowledge limits, continuously learn new facts, and stabilize their memory similar to the human brain."
why_matters: "This development allows artificial intelligence models to overcome static knowledge limits, continuously learn new facts, and stabilize their memory similar to the human brain."
key_points:
  - "New sleep framework introduced for large language models"
  - "Models can retain long-context knowledge up to 10 million tokens"
  - "Memory consolidation used to prevent catastrophic forgetting"
rakamlar:
  - etiket: "Long context"
    deger: "10 million tokens"
kaynakIzi: "v1.sWVASvz4u7bDf+bF.mh7CeWJUZsjrUIPklVlVGiJGTsL9X8M4ZhaovQdVu/7k9khJ005dvUM+Mj3ZLZE2SJmtWau6rSi7E/x/+wmxTH9qRkcIkUnwg/noj0YfzMx/UfoZGkvp3lccm4aYCar/QBIVwEFgiwZAXzEfJ/dZIRgry05i9z4fo+PbGK3ELaow8q/TwskwvIhRdbOay+jmP5ETdj/GJEJRwVo7qgcR+8o="
kaynaklar:
  - ad: "Google Research"
    url: "https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/"
featured: false
breaking: false
draft: false
---

Google Research researchers Ali Behrouz and Vahab Mirrokni have introduced a sleep framework designed to solve a fundamental problem in continual learning for large language models. Traditional AI models remain static after pre-training with a fixed knowledge cutoff date, and updating them often triggers catastrophic forgetting, where learning new tasks degrades performance on previous ones. Model architectures draw concepts from human cognitive rest patterns to help systems process and stabilize information. During the offline sleep phase, the system unlocks pre-allocated memory structures and updates parameters.

The sleep paradigm consists of two primary stages: memory consolidation and dreaming. During the offline sleep cycle, the model utilizes expanded Mixture-of-Experts memory blocks and updates its numerical weights. This process helps the deployed model absorb new facts and sharpen reasoning accuracy without changing its core codebase. Memory consolidation transforms fragile short-term contexts into long-term parameters, while the dreaming stage implements an autonomous self-improvement loop.

The researchers state that this method enables models to retain long-context knowledge up to 10 million tokens. While traditional machine learning strictly separates training and inference, this framework bridges that gap to allow intelligent agents to learn continuously. The model updates its weights using self-generated practice examples, acquiring new capabilities without losing previously learned skills.

This theoretical and practical approach aims to provide a lasting solution to the static nature of AI models. As artificial intelligence integrates deeper into daily life, such continual learning mechanisms will play a critical role in keeping models updated.
