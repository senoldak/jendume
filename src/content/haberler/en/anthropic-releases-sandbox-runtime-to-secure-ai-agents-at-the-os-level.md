---
lang: en
title: "Anthropic releases sandbox-runtime to secure AI agents at the OS level"
description: "Anthropic has introduced sandbox-runtime, an open-source, containerless OS-level sandboxing tool designed for AI agents."
category: teknoloji
date: 2026-10-24T13:51:01.006Z
esId: "anthropic-acik-kaynakli-sandbox-runtime-araci-ile-yapay-zeka-ajanlarini-guvene-a"
bolge: "Global"
perspektif: "This tool securely limits AI agents' access to system files and networks, reducing developer fatigue and preventing security breaches."
why_matters: "It allows AI agents to operate securely within strict boundaries, minimizing security risks during automated tasks."
key_points:
  - "Containerless OS-level sandboxing for processes"
  - "Reduced permission prompts by 84 percent in internal usage"
  - "Supports macOS, Linux, and alpha Windows"
rakamlar:
  - etiket: "Package size"
    deger: "11.4 MB"
  - etiket: "Prompt reduction"
    deger: "84%"
kaynakIzi: "v1.Gxif6RletSlVgPha.hbdV0hIWvX9d/RqxJ48635vBJjW8L9DcpW45QsmlZqB8kcjPOi18cZXTk8B9fCiHbIwyhtJedCo62Nt/Sy4G+bye1DaPfM9QcuEns3oyTtAGvrde6O0UJtbU8FUxO5JlwYyaKBJ1nb5s7dIvvghSCOnKZYVqLQQH/1pJBuG5UOrS5PQ="
featured: false
breaking: false
draft: false
---

Anthropic has released sandbox-runtime (srt), an open-source, OS-level sandboxing tool designed for AI agents. Serving as the underlying technology behind Claude Code, the tool wraps any process with filesystem and network restrictions without spinning up containers. Utilizing macOS Seatbelt and Linux bubblewrap, the software monitors the entire process tree. According to internal reports, this sandboxing approach reduced permission prompts by 84 percent.

The system operates on a deny-by-default logic for writes and network access while allowing general reads. Traffic is managed through host-side proxy servers and filtered via domain allowlists. Developers can configure these boundaries for package managers and command-line programs. The tool is available via npm and distributed under the Apache-2.0 license.

The tool operates by leveraging native operating system isolation primitives. Linux deployments rely on bubblewrap with the network namespace removed, while macOS utilizes dynamically generated Seatbelt profiles. Windows support is currently in an alpha stage, utilizing dedicated user accounts and filtering components. This multi-layered architecture ensures that agents cannot alter unauthorized system files or access networks without explicit permission.

Developers can manage network permissions and filesystem access in detail through configuration files. For instance, specific domains can be permitted while critical directories remain protected. This flexibility allows coding agents to perform routine tasks such as installing dependencies or pulling documentation while keeping potential security risks under strict control.
