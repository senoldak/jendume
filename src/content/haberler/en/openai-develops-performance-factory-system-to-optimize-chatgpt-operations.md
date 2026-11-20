---
lang: en
title: "OpenAI develops Performance Factory system to optimize ChatGPT operations"
description: "OpenAI has unveiled Performance Factory, a Codex-powered system designed to automatically detect and resolve performance issues in ChatGPT."
category: yapay-zeka
date: 2026-11-20T09:50:53.760Z
esId: "openai-chatgpt-hizini-artirmak-amaciyla-performance-factory-sistemini-gelistirdi"
bolge: "USA"
perspektif: "This development demonstrates how artificial intelligence agents are moving beyond simple code generation to actively manage software maintenance and performance optimization."
why_matters: "It highlights the expanding role of AI agents in software maintenance and automated performance optimization."
key_points:
  - "Over 1,700 reviews tracked in just over three months."
  - "Root causes identified for more than 600 performance issues."
  - "Approximately 15 code fixes generated directly by Codex."
rakamlar:
  - etiket: "Total reviews"
    deger: "1,700+"
  - etiket: "Resolved issues"
    deger: "600+"
  - etiket: "Daily average"
    deger: "17 reviews"
kaynakIzi: "v1.B+IadWCXLrz/df6w.MM8wz5gTRMbxaI4vZQndMzE6QPjsNqqdcjkftWA0j38qlfjBsAjZswPLw6ku5ansYW9E7jeQwg8EMaVkBaY/6qH3PvNN6Idr8rWw7vXJP4OLwUod83w7wYIXAl7FLJVy/Yx6c9vXuvzIdEu9rmsLrhenXQ+UpoILPK+C0pF1pVBmJf1di1RT3eAip8WComVQgAbQxrJhPZOUNH/CEATquL1/weIVqDHehHnZhKc="
kaynakAdlari:
  - ad: "Webrazzi"
    url: "https://webrazzi.com/2026/11/20/openai-chatgpt-yi-hizlandirmak-icin-codex-destekli-performance-factory-yi-gelistirdi/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

OpenAI has shared details about its Performance Factory system, developed to detect and resolve performance issues affecting ChatGPT more quickly. The Codex-powered system automates many processes, ranging from researching the causes of performance drops to generating solutions and verifying the results of changes made. According to data shared by OpenAI, the system's first application tracked over 1,700 reviews and identified the root causes of more than 600 performance issues in just over three months. This corresponds to an average of 17 automated reviews per day.

Previously, OpenAI engineers manually inspected system metrics, logs, and code changes to identify performance issues. Over time, more than thirty different tools were created for these tasks. However, as software development accelerated, these investigations began to take up significantly more time. To streamline this process, the company converted engineering review methods into a Codex skill called perf-forensics. This enables the artificial intelligence to independently investigate when performance issues started, which operations they affected, and their potential causes.

Performance Factory consists of four main components that manage tasks, distribute work to Codex agents, and track results. The system allows Codex to operate within cloud infrastructure, granting access to code repositories, performance metrics, and operational logs. The process begins with a performance alert, followed by an examination of relevant code changes and system records to investigate the source of the issue. During initial trials, OpenAI noticed that agents sometimes accepted the first plausible explanation they encountered, leading the company to add a secondary verification agent that questions the initial findings.

Once the source of an issue is identified, Codex can prepare a fix, although engineer approval is required for implementation. Approximately 50 deployed fixes were influenced by Codex suggestions, while the code for about 15 fixes was generated directly by Codex. Looking ahead, OpenAI aims to develop Performance Factory to operate even more independently, planning for agents to autonomously detect minor performance drops and apply low-risk fixes with minimal human intervention.
