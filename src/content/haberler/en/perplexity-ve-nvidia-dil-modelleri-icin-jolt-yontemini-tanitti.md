---
lang: en
title: "Perplexity and NVIDIA introduce JOLT method for language models"
description: "Perplexity and NVIDIA researchers have introduced JOLT, a joint teacher-student reinforcement learning method designed to improve language model training."
category: yapay-zeka
date: 2026-10-22T07:25:44.497Z
bolge: "Global"
perspektif: "This new method significantly reduces the compute power required for reinforcement learning in AI models, enabling more efficient and faster development."
why_matters: "This method substantially decreases the compute required for AI reinforcement training, paving the way for more efficient and accessible model development."
key_points:
  - "JOLT trains a single model as both teacher and student."
  - "It achieved a 6.5x reduction in processed tokens on MATH compared to GRPO."
  - "It reached a 72.09% pass rate on the AppWorld benchmark."
rakamlar:
  - etiket: "Token reduction"
    deger: "6.5x"
  - etiket: "AppWorld score"
    deger: "72.09%"
kaynakIzi: "v1.BVQ1VbCEjWJ3YXcd.TwVJKpa4jU7EL69JPQi8c+J4tBljwPlHP1597MfBczeYtr2KmWpxsjcc9FsNhOT608DjtW6l1oHJansbgWKQ37O3QtNMEbQrhBlRgZZ/CuZUS6nTqCXbtiw3z0nhEMvMYeruZUaITTur1VXkpqse3zvSe3eLRL2EFJuBwB4dlm1zngacD4tIV568"
featured: false
breaking: false
draft: false
---

Perplexity and NVIDIA research teams have introduced a new post-training method called JOLT (Joint On-policy Learning and Teaching) to optimize language model training. Addressing the limitations of sparse reward signals in traditional reinforcement learning, this approach trains a single shared model to perform in both teacher and student roles simultaneously. In this setup, the teacher role accesses privileged information while the student focuses solely on the task.

Designed to prevent the teacher model from drifting away from the student over time, JOLT relies on training both roles concurrently. The research team notes that training the teacher ensures its feedback remains usable throughout the process. Through this joint training loop, the model continues learning via trajectories generated under its own context, achieving more consistent results on complex tasks.

In benchmark evaluations, JOLT matched the accuracy of the GRPO method on MATH while using 6.5 times fewer processed training tokens. On AppWorld, the JOLT+ variant achieved a success rate of 72.09%, outperforming competing methods. Various base models were evaluated across benchmark suites including GSM8K, MATH, LiveCodeBench v6, AppWorld, and Terminal-Bench 2.1 during the research.

These findings represent a significant step toward lowering training costs and improving data efficiency for AI models. Given that computational expenses are critical for AI developers and researchers, the JOLT method offers a notable efficiency advantage in training workflows.
