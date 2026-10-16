---
lang: en
title: "Liquid AI launches the d1-ultra multimodal decision model"
description: "Liquid AI has introduced d1-ultra, a new multimodal decision model that processes text and images to provide probability-based answers without generating output tokens."
category: teknoloji
date: 2026-10-16T08:50:53.507Z
bolge: "Global"
perspektif: "Decision models reduce costs in routing and classification tasks, significantly improving the efficiency of automated workflows."
why_matters: "Decision models enable faster, cheaper, and more precise automation by bypassing traditional text generation overhead."
key_points:
  - "Achieved a top score of 65 on the Artificial Analysis Decision Index."
  - "Priced at 0.042 dollars per million input tokens."
  - "Operates with zero output tokens by generating direct probability metrics."
kaynakIzi: "v1.CAeADstRVx+y55xc.T1fWKkOjGJaidcbBhMCqMnySqhkTCMWiRhosdtWSBtaF18PWXD98GrUUJgzMlDigcL45+PFVwSq1UWYxzGvrCrAS99hQcIhVY7fLn+mr/fcnb/oB9zlzcAlVs/qY7QFIVqogfg8j+MdkhDKLlL24q6nGx5VoRqTMVks="
featured: false
breaking: false
draft: false
---

Liquid AI has released its most capable decision model to date, d1-ultra, designed for developers and enterprise applications. The system reads text, images, or both, answering questions with a probability for each possible outcome in a single forward pass without generating output tokens. This architecture allows developers to handle classification, routing, and scoring tasks without paying for generated text. According to the company, the model is built on a larger open-weight backbone with custom modifications.

The model is currently available via the Liquid API at a rate of 0.042 dollars per million input tokens, with billing covering input data only. Image billing is calculated based on pixel patches where each patch of 32 by 32 pixels incurs a specific cost. According to company evaluations and independent benchmarks, d1-ultra scores 65 on the Artificial Analysis Decision Index, ranking first in its category. The model is built to tackle complex scenarios such as detecting circuit board defects or validating customer damage claims against submitted photographs.

While the underlying parameters and model weights remain undisclosed, d1-ultra can be accessed through specific API endpoints with upcoming support planned for platforms like OpenRouter and Vercel AI Gateway. Request limits cap inputs at eight images and 10,000 image patches, requiring the total JSON body to remain under 4.5 megabytes.

This release highlights the shift toward specialized decision models that optimize automated systems by delivering exact probabilities rather than costly free-form text generations.
