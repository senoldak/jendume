---
lang: en
title: "Microsoft open-sources Agensh to coordinate 1,024 coding agents without a central orchestrator"
description: "Microsoft Research has released Agensh as an open-source, decentralized harness capable of coordinating up to 1,024 coding agents."
category: teknoloji
date: 2026-10-25T05:50:59.331Z
esId: "microsoft-1-024-yapay-zeka-ajanini-koordine-eden-agensh-i-acik-kaynakli-hale-get"
bolge: "Global"
perspektif: "This development fundamentally transforms software engineering by allowing large teams of AI agents to collaborate autonomously without relying on a central management bottleneck, significantly scaling up problem-solving capabilities."
why_matters: "This AI advancement eliminates central orchestration bottlenecks, enabling thousands of coding agents to collaborate simultaneously and effectively on complex software projects."
key_points:
  - "Agensh coordinates up to 1,024 agents without a central orchestrator."
  - "128 agents lifted the 5-task ProgramBench mean from 19.31% to 28.78%."
  - "GPT-6.1-sol with 32 agents hit 79.59% on the pandoc task."
rakamlar:
  - etiket: "Maximum agents"
    deger: "1,024 agents"
  - etiket: "Pandoc pass rate"
    deger: "79.59%"
  - etiket: "ProgramBench mean"
    deger: "28.78%"
kaynakIzi: "v1.HDQqZHO8dNSf4V1b.czJpBve18Kv/UPobBZk5umdv+koO+k/eTVXMjYHYqKsIDX/N4zP7E7wQ72V9+nlqFJhPC5a0p9TMP21LnsjpHUWirPREccDoSxhznKJFNm+cSV6cBgdLZ/vRWCDbr6dTWZ1lsWyuPlL9zNjAXDPCxJMXnL8v1cTsEHUyjvEuj3k5fX/vfK1r1aU="
featured: false
breaking: true
draft: false
---

Microsoft Research has open-sourced Agensh, a decentralized framework designed to coordinate large teams of coding agents. Traditional multi-agent setups rely on a central orchestrator to plan, assign, and merge all work. Agensh removes this limitation by allowing every worker to independently pick sub-tasks, share findings, and merge code directly into a common repository. The system connects workers using Gitea for workspaces, Mattermost for communication, and a shared context board for tracking notes.

The research team scaled the system from 1 agent up to 1,024 agents on ProgramBench tasks. Tests showed that increasing the number of agents raised scores across the hardest tasks and accelerated completion times. For instance, using GPT-5.6-sol, the mean test-pass rate for five rigorous tasks moved from 19.31% with a single agent to 28.78% with 128 agents. With a newer model, GPT-6.1-sol, 32 agents achieved a 79.59% pass rate on the pandoc task.

As the agent population grew, spontaneous behaviors emerged among the workers without being hard-coded. At smaller scales, peers resolved overlapping claims, while at the 1,024-agent scale, several workers naturally acted as integrators and recovered failed work. The release runs on Linux using Docker Compose and is available under an MIT license, providing a powerful new foundation for large-scale multi-agent software engineering.
