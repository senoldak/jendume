---
lang: en
title: "Factory releases Droid 1.0 coding agent harness with script mode"
description: "Factory has launched Droid 1.0, featuring programmatic tool calling by default and model-independent coding support."
category: teknoloji
date: 2026-10-31T13:52:04.963Z
esId: "factory-yeni-yazilim-asistani-droid-1-0-surumunu-duyurdu"
bolge: "Global"
perspektif: "This update improves software development efficiency by enabling AI coding assistants to run hundreds of tool calls per request while reducing costs."
why_matters: "It enhances AI coding workflows by enabling efficient tool execution and lower operational costs for software developers."
key_points:
  - "Droid 1.0 introduces default programmatic tool calling"
  - "Achieved 65.2% on Terminal-Bench 4 with Claude Opus 5.5"
  - "Base prompt shrank by 37% to 13,055 tokens"
rakamlar:
  - etiket: "Base prompt"
    deger: "13,055 tokens"
  - etiket: "Terminal-Bench score"
    deger: "65.2%"
  - etiket: "Paid plans"
    deger: "$20"
kaynakIzi: "v1.d6SVqGys4zyjMnC4.a9yZ+WwiNYdxfrhtSwo2EeG5Ox4fMOrAkVoNfzm178NyaqVQ9LQUYxA0thWQf8xm5AA8rBHWH/R3JBpiSKgzGHmt7X4IVg1nu3Y5JwfQquqI5E6MjJQcQ+tlqpoOteG/u0BghAXS6lkbsQqbUnn6K0ab7lF1nwrnsCKR"
featured: false
breaking: false
draft: false
---

Factory has released Droid 1.0, the largest update yet to its coding agent harness, introducing programmatic tool calling as a default feature. The new system allows the model to write a program that runs its tools, enabling a single model request to drive hundreds of tool calls efficiently. The implementation relies on a sandboxed script tool where raw files, search results, and logs remain inside the program, ensuring only printed output returns to the model.

The base prompt size has been reduced by 37 percent down to 13,055 input tokens. Droid 1.0 runs on macOS and Windows desktop applications, terminal interfaces, and through the Node SDK. It achieved the highest pass rate among tested harnesses, scoring 65.2 percent on Terminal-Bench 4 using Claude Opus 5.5. Initial tool definitions were significantly trimmed to load rare tools only on demand.

By leveraging script mode, raw files, search results, and logs remain inside the sandboxed program, meaning only printed output returns to the model's context. This approach cuts Droid's cost by 15 percent compared to direct tool calling on Claude Opus 5.5 and reduces execution time. Bounded autonomy features also monitor repetitive tool calls to keep agent loops stable and efficient.

Additional improvements include lower app latency, reducing first paint time from 1,839 milliseconds to 488 milliseconds. Extra session memory consumption was also optimized to maintain performance across multiple workspaces. Paid plans for Droid 1.0 start at 20 dollars per month, providing developers with a flexible and cost-effective coding agent harness.
