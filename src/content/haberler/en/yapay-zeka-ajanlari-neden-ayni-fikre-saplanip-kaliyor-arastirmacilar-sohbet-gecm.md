---
lang: en
title: "Why Long-Running AI Research Agents Get Stuck—and How Clearing Chat History Frees Them"
description: "A Microsoft Research study reveals that accumulated conversation history traps autonomous agents in narrow “idea basins,” even when given more compute."
category: bilim
date: 2026-10-12T11:40:00Z
bolge: "United States · Global"
perspektif: "Much like humans fixating on their first hypothesis, autonomous AI agents can become trapped by their own past context; knowing when to reset memory prevents wasted compute and unlocks better discoveries."
featured: false
breaking: false
draft: false
---

A study by researchers at Microsoft Research has uncovered why long-running autonomous research agents often plateau even when given substantial additional computing power: their own accumulated conversation history narrows their search space and prevents them from exploring better alternatives.

Scientists examined “Autoresearch agents” that iteratively propose, test, and refine solutions. Across 8 independent runs of the same agent on an identical task, final performance scores varied widely from 68.3 to 100.0, and adding more compute failed to close the gap.

## Escaping “Idea Basins”

When researchers mapped every proposed solution on a two-dimensional landscape, they found that each individual run remained confined to a small region they termed an “idea basin.” Rather than discovering stronger approaches found in other runs, the agent spent its remaining budget making minor adjustments to its initial direction.

By periodically clearing the agent’s verbose chat history while retaining only concise outcome summaries, researchers enabled the system to break out of unproductive basins and find markedly higher-performing solutions.
