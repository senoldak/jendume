---
lang: en
title: "GPT-6.2 Astra solves unsolved math theorem using its own novel strategy"
description: "OpenAI's GPT-6.2 Astra produced a zero-human-help proof of Smoktunowicz's gap theorem in Lean, taking the top spot on the Autoform-Hard benchmark."
category: bilim
date: 2026-11-23T13:50:50.806Z
esId: "gpt-6-2-astra-karmasik-matematik-teoremini-kendi-gelistirdigi-yontemle-kanitladi"
bolge: "Global"
perspektif: "Demonstrates that artificial intelligence can bypass missing human knowledge libraries by inventing alternative logical reasoning strategies to solve complex scientific challenges."
why_matters: "Proves that advanced models can autonomously invent alternative mathematical strategies when standard documentation and code libraries are incomplete."
key_points:
  - "First machine-verifiable proof of Smoktunowicz's gap theorem in Lean without human aid"
  - "Generated an 1,800-line proof in 94 minutes at a compute cost of $21.58"
  - "Climbed to first place on the Autoform-Hard benchmark with 49 solved tasks"
rakamlar:
  - etiket: "Proof length"
    deger: "1,800 lines"
  - etiket: "Execution time"
    deger: "94 minutes"
  - etiket: "Total cost"
    deger: "$21.58"
  - etiket: "Solved tasks"
    deger: "49 tasks"
kaynakIzi: "v1.9f99YPGKV7FPFr7w.U3+HSyywWZQ/tiUxaxf79TG8Wq8FeMbdm2SQLNl6GmHULrvWwQpgLAbXp8FMPZrjdoDm6KRCAX8DHVMKvwO+UYJj8QtPvUv+Z6euv9P22bgqxAclkzIsSE+s09VjzCSq3AwwGL7I+kA4FsHdP4mpj9NxNs/yfI/eRQe4TSAp7nNRuQKPJlDDMYlI/N3BPu3uYLfmU+Jk8kYYtwu2/5jdeoeB1QbSi1Ba"
kaynakAdlari:
  - ad: "The Decoder"
    url: "https://the-decoder.com/gpt-6-2-astra-solved-a-math-theorem-no-other-ai-could-crack-then-invented-its-own-proof-strategy/"
haberDegeri: 98
featured: false
breaking: true
draft: false
---

OpenAI's GPT-6.2 Astra model has generated a formalized, machine-verifiable proof of a 2006 mathematical theorem without any human assistance during its execution. According to benchmark platform Vals AI, this marks the first known proof of Smoktunowicz's gap theorem written in the Lean formal proof language. The theorem establishes that when a mathematical system multiplies its core building blocks, the resulting growth is strictly either very slow or extremely fast, leaving no intermediate ground.

The task presented a unique obstacle because essential foundations of the original mathematical proof were absent from Lean's formal library, Mathlib. Rather than failing, Astra derived an alternative strategy distinct from published literature. It utilized "capacity," a specialized metric from prior research that tracks the minimum number of elements introduced per computational step.

This breakthrough occurred on Autoform-Hard, a curated benchmark derived from Meta FAIR's AutoformBench featuring 56 complex tasks that ten previous models failed to complete within their computing budget. Astra attempted to abort the run after 47 minutes and $8 of spending, but the evaluation harness rejected the termination because unsolved submissions must reach a $20 threshold. Following nine minutes of silence without inputting code while devising a new approach, Astra delivered the complete 1,800-line proof at the 94-minute mark, consuming $21.58 in compute costs.

With this accomplishment, GPT-6.2 Astra now leads the Autoform-Hard benchmark leaderboard with 49 solved tasks. It surpasses competing systems GPT-6.2 Sol and Claude Fable 5.2, which currently share second place with 48 solved tasks each.
