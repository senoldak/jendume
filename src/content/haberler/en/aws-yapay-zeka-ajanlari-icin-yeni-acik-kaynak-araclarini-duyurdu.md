---
lang: en
title: "AWS introduces new open-source tools for AI agent development"
description: "Amazon Web Services has launched Strands Decider 2B and Strands Box, two open-source projects designed to improve decision-making and execution control for AI agents."
category: yapay-zeka
date: 2026-10-17T03:50:54.401Z
bolge: "Global"
perspektif: "These tools address critical security and workflow challenges in AI agent development, enabling safer deployment and more reliable execution in production environments."
why_matters: "It provides developers with essential tools to control agent decision-making and enforce strict security boundaries during execution."
key_points:
  - "Strands Decider 2B is a 2-billion-parameter model designed for fast decision-making in agent workflows."
  - "The decision model achieves a median latency of around 115 milliseconds on an NVIDIA RTX 3090."
  - "Strands Box introduces kernel-enforced isolation and policy layers to secure agent execution environments."
kaynakIzi: "v1.jRSnGhaddycIqq04.si6RuGg+PuCaqhpIvdKQFF0r6jF6L9slDdH8wsw/HvObHzgDAo1lsJv7PXKQY21d6hJJRFTv+I9uorHTXkfvtRFKbXNp0TPenflYCGw1Z786ScCqTsIx/UKSv/IiF4RzKUDl0+vDvppsnqTyA4CEhtF7yoXfpANYM99aPBIPQeK6TaHfN0JkyRCIDA4+pZoIDt8f9qN9TirMB/9MCnvBy46wOpsHXrlyix63BJIIevSLopnqfrWdZoh1PED/ivqS5ErP/Jg="
featured: false
breaking: false
draft: false
---

Amazon Web Services has introduced two open-source projects aimed at advancing AI agent development by addressing workflow decision-making and execution security. The first project, Strands Decider 2B, is a two-billion-parameter model built to select between predefined options rather than generating lengthy text responses. Designed for tasks such as model routing, tool selection, and classification, the model provides developers with structured decisions and confidence scores.

Based on the Qwen3.5-2B architecture, Strands Decider 2B replaces the traditional language-model head with a pointer head that scores candidate responses. According to evaluations, the model achieves a median decision latency of approximately 115 milliseconds on an NVIDIA RTX 3090 and 153 milliseconds on an Apple M3 MacBook. Developers can run and modify the model locally, integrating it directly into their existing agent workflows.

The second project, Strands Box, provides an isolated execution environment for AI agents. It combines operating-system-level isolation with an open-source policy language called Dogwood, allowing developers to define strict rules governing agent actions such as shell commands, Python execution, and network access. This policy layer operates independently of the language model to enforce execution boundaries based on content and execution history.

Together, these projects extend the capabilities of the agent ecosystem beyond simple orchestration into precise decision-making and robust execution control. By allowing developers to enforce security policies and restrict unauthorized actions, AWS is helping bridge the gap between experimental AI agents and production-ready deployments.
