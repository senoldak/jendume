---
lang: en
title: "Google develops virtual computer infrastructure for artificial intelligence agents"
description: "Google Cloud has announced Agent Compute Engine, a new infrastructure designed to run AI agents in isolated virtual machines."
category: teknoloji
date: 2026-10-24T05:51:05.193Z
esId: "google-yapay-zeka-ajanlari-icin-sanal-bilgisayar-altyapisi-gelistirdi"
bolge: "Global"
perspektif: "Providing AI agents with dedicated computing environments enables them to execute complex workflows more securely and efficiently."
why_matters: "Giving AI agents dedicated virtual computer infrastructure allows for more controlled, secure, and resource-efficient execution of advanced automation tasks."
key_points:
  - "Agent Compute Engine assigns isolated micro-virtual machines to AI agents"
  - "The system pauses idle environments to reduce resource overhead"
  - "Credentials are managed externally and governed via a dedicated gateway"
kaynakIzi: "v1.ZikbiE9OqvcIbLRx.omJbt4S0jV8NNJJXexxovfDn3kNrPNU0ExBgaXZyrQjyxIAMWlNMi14sLWFD2N4GmUwg+0s6otUm8lAvXCIZOnAkGwmpmKkYkH+A+oUfRG+/YGJ3yu2OKDclZYpLlPS38FLEZqndasCXgIqjKgCCb8/Etxmfaec="
featured: false
breaking: false
draft: false
---

Google Cloud has introduced a new infrastructure that enables artificial intelligence agents to operate on dedicated virtual computers while executing code, browsing the web, and processing institutional documents. The system assigns an isolated micro-virtual machine to each individual agent, keeping working environments entirely separate from one another. A preview version of the service is planned for release in the upcoming period.

Unlike standard conversational bots that merely answer inquiries, these agents can generate files, install applications, and manage digital operations, requiring a dedicated workspace to function effectively. With this new framework, the operating system, file directories, and network connections of the environment can be managed on a per-agent basis. The company notes that it already utilizes this technology within its proprietary Gemini services.

The system is engineered with a strong emphasis on resource efficiency. When agents are idle, the working environment is temporarily paused and its current state is safely stored. Upon receiving a new task, operations resume seamlessly from where they left off. This mechanism significantly reduces the infrastructural overhead of maintaining constantly running computers for every single agent. Furthermore, working files are preserved across sessions, enabling agents to utilize existing workspaces without regenerating data.

Regarding security architecture, long-term account credentials and access keys are not stored internally within the virtual machine. User credentials are managed externally, and outbound requests are routed through a dedicated gateway that enforces strict access controls. Unique identities assigned to each agent allow administrators to precisely regulate resource permissions.
