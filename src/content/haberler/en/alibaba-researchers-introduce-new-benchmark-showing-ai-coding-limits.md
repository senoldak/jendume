---
lang: en
title: "Alibaba researchers introduce new benchmark showing AI coding limits"
description: "Researchers from Alibaba and Asian universities developed a new real-world benchmark showing that AI coding agents still require human cleanup on nearly three out of four tasks."
category: teknoloji
date: 2026-11-08T11:50:50.079Z
esId: "alibaba-arastirmacilari-yeni-test-ile-yapay-zeka-kod-ajanlarinin-eksiklerini-ort"
bolge: "Global"
perspektif: "This study highlights the gap between synthetic benchmark scores and real-world software engineering capabilities, reminding organizations that human oversight remains essential for AI coding tools."
why_matters: "Revealing the real-world limitations of AI coding agents, this benchmark proves that human oversight is still mandatory for effective software development."
key_points:
  - "Top model fully completes only 26.4 percent of real-world coding tasks."
  - "New benchmark uses actual user requests instead of saturated legacy tests."
  - "Extra compute does little to resolve underlying execution weaknesses."
rakamlar:
  - etiket: "Fully correct tasks"
    deger: "26.4 percent"
  - etiket: "Requirement fulfillment"
    deger: "70 percent"
kaynakIzi: "v1.GLblx1HRoXJN0h3w.SFCY1SAWJHJAoNZ3+rSmX8Go8iJDSP81q0hup9rrNI4TZ2j5EFutbezPJY224jz+hqKASdp+mPOSM3J9bR6vo+AllifQz30etc4DgGitFvcE2OX/E92yXK1tOZ6EoE5mWsHgoqjUUO3wtkuJo/X6FuIiTDiDi4cfm17RY6UEG/cQYOREPismOGHGLoMlLyMW4WjXV2xRe2bL0ZhFegoGv7XbNwSRsJqR"
kaynakAdlari:
  - ad: "The Decoder"
    url: "https://the-decoder.com/ai-coding-agents-still-need-human-cleanup-on-nearly-three-out-of-four-tasks-in-a-real-world-test/"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

Researchers from Alibaba and several Asian universities have introduced a new benchmark designed to evaluate coding agents against real-world user requests. Named Co-Design Bench, the test addresses the limitation of older benchmarks where top models frequently achieved near-perfect scores above 99 percent by executing and checking their own code.

The new test utilizes actual requests from real coding sessions, incorporating scenarios where users revised requests multiple times or rolled back changes. The evaluation process is strict, utilizing two AI judges to test finished applications in browsers and verify that features genuinely work without hardcoded mock-ups.

According to the findings, the top-performing model fulfills approximately seventy percent of project criteria on average, yet delivers a fully correct solution in only 26.4 percent of evaluated instances. In the majority of situations, the automated system manages the primary workload but leaves at least one specific component incomplete, meaning that software engineers almost always need to perform manual corrections. Following the leading model, Claude Opus 5 and Qwen3.8-Max secured subsequent positions, while Grok 4.6 placed last in the evaluation.

The study also demonstrated that throwing extra compute at tasks does not automatically fix underlying weaknesses. Certain models consumed significantly more resources yet scored notably lower. Furthermore, the environment in which an agent reads and writes code heavily influenced performance, leading authors to recommend evaluating models and working environments as a paired unit rather than relying solely on standard leaderboards.
