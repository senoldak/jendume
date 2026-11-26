---
lang: en
title: "Meta details AI-powered Your Algorithm system for Facebook and Reels"
description: "Meta has published engineering insights on Your Algorithm, a feature allowing users to shape their Facebook Feed and Reels preferences using plain language."
category: yapay-zeka
date: 2026-11-25T03:50:52.113Z
esId: "meta-facebook-ve-reels-icin-yapay-zeka-tabanli-tercih-sistemini-tanitti"
bolge: "Global"
perspektif: "This development integrates large language models directly into production recommender systems to enhance user control."
why_matters: "The system uses large language models to give users direct, transparent control over algorithmic content recommendations."
key_points:
  - "Meta published engineering details for the Your Algorithm feature."
  - "The system uses LLMs to integrate plain-language user preferences into ranking."
  - "Exclusions are processed through a layered filter including embeddings and fine-tuned models."
kaynakIzi: "v1.F3ngU1LH+1ySaCF6.YvSdwLh+hu2Xg8SdhTDuZc75/E0TbKs+SaLzGV9Fu7mXqfOYZ32RRNwsG9IRM9njKRB//nfMu9W24BcPqq5BxIiCVEKPL2Xtns2kfptJ2FPJNG3wEduMaoLhESjXy2/3OmvuT3kkKqEuPeDNmLUcMia6q8w0L9nA2hRW+dug2nut+opNxK1URIE="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/24/meta-facebook-your-algorithm-llm-recommendations/"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

Meta has released engineering details regarding Your Algorithm, an AI-powered preference system for Facebook Feed and Reels. Announced in October 2026, the feature enables users to articulate what they want to see in plain language, combining implicit engagement signals with explicit user intent. The system integrates large language models (LLMs) directly into the platform's production ranking stack.

The preference lifecycle operates across four main components: profile generation, preference management, ranking, and delivery optimization. LLMs translate viewing signals into readable topic names and validate typed phrases for coherence and duplication. Validated interests are enriched with embeddings and search keywords, feeding into a shared data store accessed by both Feed and Reels.

Each stated interest drives four distinct retrieval sources, including search, topic clusters, the content graph, and item-to-item similarity. A relevance check promotes matching content while a reranking control layer prevents flooding by spacing out repeats and enforcing daily caps. Meanwhile, exclusions are filtered using embedding comparisons, demotion rules, a fine-tuned LLM reranker, and client-side cache invalidation.

Meta reports that utilizing a small, fine-tuned LLM specifically for reranking exclusions outperformed general-purpose models in both speed and reliability. By combining explicit natural language inputs with automated ranking funnels, the system addresses the traditional limitations of adaptability and nuance in algorithmic recommendations.
