---
lang: en
title: "Self-Improving AI Models Get Better at Solving Problems—But Still Can’t See Their Own Blind Spots"
description: "Researchers at Sakana AI and UC Berkeley show that while a model can train and judge itself, shared blind spots risk reinforcing hidden errors."
category: bilim
date: 2026-10-12T10:15:00Z
bolge: "Japan · United States"
perspektif: "When an AI system acts as both problem-solver and judge without external verification, its own blind spots can quietly turn mistakes into accepted facts."
featured: false
breaking: false
draft: false
---

Researchers from Sakana AI and UC Berkeley have introduced Multi-Agent Self-Supervision (MASS), a method that enables a single language model to solve tasks, refine its own workflow, and evaluate the results without relying on a stronger teacher model. Inspired by AI pioneer Marvin Minsky’s book “Society of Mind,” the approach divides complex reasoning into structured sub-agent roles and verification contracts.

At the scientific frontier, independent verification can be prohibitively expensive—a single plasma physics study, the authors note, can require more than 120 million CPU hours. Having the model evaluate its own work offers a practical alternative when external checks are slow or costly.

## The Risk of Shared Blind Spots

While the study found measurable improvements across task solving, workflow optimization, and judging, it also highlighted a fundamental limitation: when the solver and the judge share the same underlying model, they share the same blind spots.

As a result, the model can fail to catch its own subtle mistakes and inadvertently reinforce them in subsequent training cycles, underscoring why independent verification remains essential in high-stakes domains.
