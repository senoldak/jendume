---
lang: en
title: "Vercel Board coordinates tasks between humans and coding agents"
description: "Vercel has launched a new experimental platform that allows humans and AI coding agents to collaborate and manage tasks within a shared workspace."
category: teknoloji
date: 2026-11-25T21:50:52.366Z
esId: "vercel-board-insanlar-ve-kod-yazan-yapay-zeka-ajanlarini-ayni-platformda-bulustu"
bolge: "Global"
perspektif: "This development transitions AI agents from simple code-writing tools to active, manageable participants in software development teams."
why_matters: "Integrating AI agents as fully functional members of software teams accelerates development cycles and improves workflow efficiency."
key_points:
  - "Vercel Board provides a shared task management interface for humans and AI agents."
  - "The system automates over 50% of pull requests in the v0 software factory."
  - "It supports bi-directional integration with Slack, GitHub, and Linear."
rakamlar:
  - etiket: "Automatic merge rate"
    deger: "%50"
kaynakIzi: "v1.kYZhh8s+0y16+wmK.Zwu6MH+Oo3LJjaN/wvwSP0/C9iCzuvdlwpdOvqzQ0T8MHeu6Rai315EVFAQQmLHn88dS8rGMGOTLH7hg3HkV7soTjW+xuhZkWvaKOB6eQcEvR/53dnGUm5dTfB18GP6eCrJz4HgCJ5VEAbHpMJL/Wh/DhfpJm1E2n8aqLkqke4TyclIW1/ZeFTq6YThHOWkPb4RDTpv0Fjdbz2Qy18MYAZ2PDiL0OOV8Nswkm07ZsEUs2YDVA5Ll8Txl0TTUZP6QrG7/YZR0"
kaynakAdlari:
  - ad: "InfoQ"
    url: "https://www.infoq.com/news/2026/11/vercel-board-agents/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering"
haberDegeri: 70
featured: false
breaking: false
draft: false
---

As the collaboration between humans and AI agents in software development becomes more complex, managing these interactions has become a significant challenge. Vercel has launched "Vercel Board," an experimental platform designed to bridge this gap. This system acts as a centralized, headless message board where humans and coding agents can coordinate tasks, effectively working together as if they were members of the same team.

The platform allows developers and agents to communicate, assign tasks, and track workflows through a command-line interface or SDK. Popular coding agents such as Claude Code, Codex, Pi, and LangChain can be integrated into the board. When a task is created, agents can claim it, post updates, and report completion. If multiple agents attempt to claim the same task, the system manages the conflict to ensure workflow integrity. Tasks are assigned via a lease system, which is capped at five minutes; if a worker fails to complete the task within this window, it returns to the queue.

This development allows AI agents to move from simple code-writing tools to active participants in software development teams. Vercel has already rebuilt its "v0" software factory on this infrastructure, reporting that the factory now successfully merges over 50% of its pull requests automatically.

The system also supports integration with widely used tools like Slack, GitHub, and Linear, allowing developers to maintain their existing workflows while interacting with AI agents. Although Vercel Board is currently in an experimental phase, it holds the potential to set a new standard for how autonomous agents are integrated into the software development lifecycle. As similar coordination tools emerge across the industry, Vercel’s initiative aims to bring structure and accountability to the way agents collaborate on complex projects, proving that agent-human synergy is becoming a practical reality.
