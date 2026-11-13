---
lang: en
title: "Perplexity introduces open-weight decision models Decider v1.3 and Flash v1.3"
description: "Perplexity has launched Decider v1.3 and Flash v1.3, the latest open-weight decision models that return probabilities instead of generated text."
category: yapay-zeka
date: 2026-11-13T17:50:54.274Z
esId: "perplexity-yeni-acik-agirlikli-karar-modelleri-decider-v1-3-ve-flash-v1-3-u-tani"
bolge: "Global"
perspektif: "These decision models enable AI systems to perform probability and classification tasks directly instead of generating text, making data processing more reliable and efficient."
why_matters: "These decision models enable AI systems to perform probability and classification tasks directly instead of generating text, making data processing more reliable and efficient."
key_points:
  - "Decider v1.3 achieved 91.6% mean accuracy across 63 query-classification tasks."
  - "Models are released under Apache 2.0 on Hugging Face."
  - "API input pricing is $0.02 for v1.3 and $0.01 for Flash per 1M tokens."
rakamlar:
  - etiket: "Mean accuracy"
    deger: "91.6%"
  - etiket: "API price v1.3"
    deger: "$0.02"
  - etiket: "API price Flash"
    deger: "$0.01"
  - etiket: "GPU requirement v1.3"
    deger: "49 GiB"
kaynakIzi: "v1.KcF5GUHrZPJ8zLIj.zdcdBhXV/p7DMbQv1vT+EA/7W/bwXSmvVKjLHv6gwQBFp8mtca3FDFQQYMKu7crpbn0M5tKgmvxz6fiCYbr2E7EJZ/eIGYrAZNHvPoG9oILieZOvDleqCve+OHlA4zRedcarPk7mgCsMV9PnCtEACGil8yJV/fxL/j5bmDT6d8SEz4D0xAEPGJ8fNmKaub11v1E5"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/13/perplexity-decider-v1-3-open-weight-decision-models-locate/"
haberDegeri: 78
featured: false
breaking: false
draft: false
---

Perplexity has rolled out its advanced open-weight decision models, designated as version 1.3 alongside a flash variant. These specialized models are engineered to output statistical probabilities rather than traditional generated text, successfully addressing yes or no queries, multiple-choice dilemmas, and scoring assessments for both textual and visual inputs. A notable addition in this deployment is the Locate function, designed to isolate precise text intervals based on specific instructions or classifications. Source weights are made publicly accessible under the Apache 2.0 license via Hugging Face repositories.

The system functions by transforming a standard generative large language model framework into a classification instrument. The architecture utilizes a pruned base model output layer to compute specific option probabilities. Within the primary 1.3 architecture, inter-question attention mechanisms are adjusted so that individual inquiries reference only the shared global state and themselves. Training pipelines encompass three distinct phases, incorporating extensive fine-tuning across public datasets alongside specialized adaptation layers.

Evaluation metrics published by the organization indicate a mean accuracy of 91.6 percent across sixty-three distinct query classification benchmarks. Regarding hardware specifications, the primary version necessitates a CUDA graphics processing unit capable of accommodating roughly 49 GiB of numerical weights, whereas the lighter flash alternative demands about 8.5 GiB.

Engineers and developers can integrate these architectures through designated application programming interfaces or execute them locally. Interface pricing is structured at 0.02 dollars for the primary model and 0.01 dollars for the flash version per million incoming tokens, with outgoing tokens provided without charge. These updates are intended to advance classification reliability within automated workflows.
