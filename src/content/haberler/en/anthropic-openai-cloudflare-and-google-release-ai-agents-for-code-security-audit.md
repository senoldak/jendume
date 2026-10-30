---
lang: en
title: "Anthropic, OpenAI, Cloudflare and Google release AI agents for code security auditing"
description: "Four major technology labs have introduced multi-agent AI tools designed to hunt, validate, and patch security vulnerabilities in source code."
category: teknoloji
date: 2026-10-30T19:51:35.637Z
esId: "anthropic-openai-cloudflare-ve-google-guvenlik-taramasi-icin-yapay-zeka-ajanlari"
bolge: "Global"
perspektif: "AI-powered security auditing tools automatically detect vulnerabilities in software development, strengthening defenses against cyber threats and reducing the workload for human engineers."
why_matters: "AI-based security agents automatically detect and validate vulnerabilities in codebases, enhancing software security and providing proactive defense against cyber attacks."
key_points:
  - "Four major labs implemented a design pattern based on independent discovery and validation for security bugs."
  - "Cloudflare reported thousands of actionable findings through its open-source security audit skill."
  - "Google's Mantis system reduced token overhead by over eighty-five percent using hierarchical summaries."
rakamlar:
  - etiket: "True-positive rate"
    deger: "7%"
  - etiket: "Token reduction"
    deger: "85%"
kaynakIzi: "v1.FF9g1WQQx2R82a/m.1ByaONFcawudr7mF5cnf90Acz4TmF+xwQTYeP/Zm/VwG1gDxNkyZGqrinwl+0kQIaX/JEx6snWWwkH+uyx8PgGKSr9xNL85QQsOtNeo8irqNabwFa1MUnvnRiCBS95mwbyifF1gsCQlbFpUjRzbBtnIm9S6rgt8ruk5htrSOIhsJ24rpTDfC8EX0"
featured: false
breaking: true
draft: false
---

AI-based security auditing in software development has reached a new milestone as Anthropic, OpenAI, Cloudflare, and Google unveil specialized artificial intelligence agents to find and fix vulnerabilities in source code. All four tools converge on a shared design pattern: one agent discovers a potential bug, an independent agent attempts to disprove it, and only the findings that survive validation move forward to a patch.

The primary driver behind these releases is the reduction of noise and false positives in automated code scanning. Early AI code scanners frequently suffered from true-positive rates below seven percent, creating heavy review burdens for engineering teams. By enforcing a strict separation of duties where the reporting agent never confirms its own finding, the technology significantly improves reliability. Additionally, the increasing use of AI models by malicious actors to discover exploits has pushed labs to accelerate their defensive capabilities.

Anthropic's security agent runs directly within Claude Code sessions, mapping architecture and verifying findings independently. OpenAI introduced its security command-line interface and SDK, while Cloudflare published an open-source, model-agnostic security audit skill. Meanwhile, Google presented Mantis, a system that learns from historical security fixes and reproduces bugs within sandbox environments. These tools provide structured outputs such as SARIF reports to help developers secure codebases efficiently.

The widespread adoption of these multi-agent systems sets a new standard for software security through human-machine collaboration. By catching vulnerabilities during the development phase and utilizing automated validation loops, these technologies play a crucial role in safeguarding digital infrastructure against evolving cyber threats.
