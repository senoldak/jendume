---
lang: en
title: "Nous Research retrains Alibaba model with Western values"
description: "Nous Research has introduced Arete-27B, a retrained version of Alibaba's Qwen model aimed at reinforcing Western values."
category: yapay-zeka
date: 2026-11-09T15:50:50.985Z
esId: "nous-research-alibaba-modelini-batili-degerlerle-yeniden-egitti"
bolge: "Global"
perspektif: "This development demonstrates that open-weight AI models can be reshaped according to different value systems with relatively small amounts of additional training."
why_matters: "It shows that open-weight AI models can be adapted to different value systems and ideological tendencies can be shifted with limited additional training."
key_points:
  - "Arete-27B was developed with 52.8 million tokens of additional training."
  - "The rate of responses adopting official discourse dropped from 22% to 0.9%."
  - "Model weights and training data were released on Hugging Face."
rakamlar:
  - etiket: "Parameters"
    deger: "27 billion"
  - etiket: "Additional data"
    deger: "52.8 million tokens"
  - etiket: "Training steps"
    deger: "1,202 steps"
  - etiket: "Official discourse rate"
    deger: "0.9%"
kaynakIzi: "v1.k5cnsyxZGI6lByyJ.4x/VCOakVeQBZnETzyXc/0+iFQcKL4LfmTXCUUGg2Euojrho3fmoycOWaa6CBpkfgtJgswHkHTeNw1xHuMJB4LdFRTZVe+q96XGUc5QYUSZdIVYieO8YW8Um1KhhBDTQeSzgmgtaVl/HyyKKqYqF6ZhDNLcePfsfBItBB84vudSacvLASViHq6ujlbNSeDhsRHsfT/V5dBmSPonqUQprrF5p4MhSD34WY0MhyuSdQA=="
kaynakAdlari:
  - ad: "Webrazzi"
    url: "https://webrazzi.com/2026/11/09/nous-research-un-batili-degerlerle-yeniden-egittigi-cin-merkezli-qwen-modeli-arete-27b/"
haberDegeri: 90
featured: false
breaking: false
draft: false
---

Nous Research, an organization working on open-source artificial intelligence systems, has introduced Arete-27B, a modified version of the Qwen3.8-27B model created by Alibaba. The company states that Arete-27B was built to reinforce Western values within an artificial intelligence model originating from China. Based on the 27-billion-parameter architecture, Arete-27B did not require an entirely new base structure from scratch. Instead, the team performed approximately 52.8 million tokens of additional training on the existing model. The dataset was processed twice from start to finish, completing the procedure in a total of 1,202 steps.

During this training phase, reinforcement learning or preference optimization methods were not utilized. While all weights of the language model were retrained, the visual encoder was frozen since text-based data was employed. Nous Research prepared an evaluation set consisting of 803 questions across categories such as freedom of expression and state ideology. According to the company's tests, the rate at which Qwen3.8-27B adopted the official approach of the government as its own view was 22 percent, whereas this rate dropped to 0.9 percent in Arete-27B.

It was also tested whether the additional training altering political responses negatively affected the model's overall capabilities. In the company's internal Hermes Bench evaluation, the base model achieved a score of 65.77 percent, while Arete-27B remained at 65.60 percent. Nous Research stated that the minor difference could be considered within the scope of measurement deviation. In the Terminal Bench test, Arete-27B achieved a score of 70 percent.

Inkling was utilized as the teacher model during the training of Arete-27B. The organization generated approximately 20,000 different prompts across the designated categories to create a training dataset from the teacher model's outputs. The final dataset contains approximately 28,000 training examples. Nous Research subsequently published the model weights and training data on the Hugging Face platform.
