---
lang: en
title: "Anthropic adds Code Mode to Claude Code for JavaScript tool chaining"
description: "Anthropic has introduced an experimental Code Mode feature to Claude Code, allowing Claude to write JavaScript and chain multiple tool calls in a single step."
category: teknoloji
date: 2026-11-18T07:51:00.288Z
esId: "anthropic-claude-code-a-code-mode-ozelligini-ekledi"
bolge: "Global"
perspektif: "This feature streamlines multi-step coding tasks by reducing round-trips between developers and the AI assistant."
why_matters: "It improves efficiency in software development by reducing round-trips for complex multi-step coding tasks."
key_points:
  - "Claude writes JavaScript to chain Bash, read, and edit calls in one step."
  - "Available as an experimental opt-in feature starting from version 2.1.323."
  - "Background code execution can run for up to two hours."
rakamlar:
  - etiket: "Version"
    deger: "v2.1.323"
  - etiket: "Wait limit"
    deger: "10 minutes"
  - etiket: "Background limit"
    deger: "2 hours"
kaynakIzi: "v1.auDW6hHAz0QDZPcX.rWhNDW8zLrhVNGjxqhrpmDpgXfGewn3CmPQj6lAZMcoEfem8SbraVONq8D4ep2O8RcIm0uz9GahXYRXTQA9Wn6p4kAUUfNFv/Wqyi8Vylz7N/P024th29bT18Pna+6XzHfFQG2xtQThvQxkIb8H1VxgF4M54T0eOjHIiCB2BlFr0kIa0xv2AZNOhBIDSIA=="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/17/anthropic-claude-code-code-mode-javascript-tool-calls/"
haberDegeri: 90
featured: false
breaking: false
draft: false
---

Anthropic has rolled out a new experimental feature designed to transform how developers handle multi-step coding workflows through the command line. Shipped in Claude Code version 2.1.323, the new Code Mode enables the AI assistant to write a piece of JavaScript that executes several tool calls in a single step, rather than processing every single command individually.

Without this feature, the system requests each Bash, read, or edit call directly and reads every result before deciding the next move. With Code Mode active, Claude writes executable JavaScript that runs within the user session. This approach allows commands to run in parallel, feeds results directly into subsequent calls, and returns only the necessary output for review.

To enable the capability, developers must configure a specific environment variable in their shell or settings file. Upon the first session, the system prompts for confirmation before starting. Anthropic recommends using this mode for tasks involving repetitive changes across multiple files, complex searches that require filtering, or independent commands that can run simultaneously.

Regarding permissions, the system maintains standard security rules. In auto mode, a classifier reviews the generated code block, while other modes prompt users per tool call as usual. Background code executions can run for up to two hours while users continue chatting, whereas tasks requiring direct user waits will stop after ten minutes if unresponsive.

The feature is currently restricted to interactive terminal sessions using Claude subscriptions or Console accounts. It is not available through cloud gateways, Amazon Bedrock, Google Cloud, or various integrated development environments and software development kits.
