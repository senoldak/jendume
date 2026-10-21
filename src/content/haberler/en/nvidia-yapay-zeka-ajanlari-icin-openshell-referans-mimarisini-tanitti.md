---
lang: en
title: "Nvidia introduces OpenShell hardware stack for secure AI agents"
description: "Nvidia has launched the OpenShell Reference Architecture at its GTC Berlin conference, providing a complete hardware and software stack to run AI agents safely."
category: teknoloji
date: 2026-10-21T11:50:54.930Z
bolge: "Global"
perspektif: "This development is crucial for safely deploying autonomous AI agents in enterprise environments by enforcing security at both the hardware and software levels."
why_matters: "It establishes hardware-enforced safety boundaries for autonomous AI agents, paving the way for secure enterprise adoption."
key_points:
  - "OpenShell Reference Architecture released under Apache 2.0 license."
  - "Sentry software increases agent capacity by up to 20%."
  - "System operates on Vera Rubin systems and Vera CPUs."
rakamlar:
  - etiket: "Capacity boost"
    deger: "20%"
  - etiket: "European deals"
    deger: "2 billion dollars"
kaynakIzi: "v1.W7VwBR8H3SIXZVyf.ljLKYU5reQycwQ5d17OPGm5clM0gAiiNRoijhEX/0RbqNbSMGb+P3MhqHS+wsf6hOZpM6Wz5SL3lA30gxwdk2y4UoZHmSEl+2dQ2knuVOm4PAxP+Kk//m9h/qMQXmNi5cHh6X0PilcohOdCqxZN2DfY4BN50SNOKUJPu4VjQ"
featured: false
breaking: true
draft: false
---

Nvidia has released a comprehensive design for running AI agents within fixed limits, spanning from enterprise infrastructure to edge machines. Unveiled at the GTC Berlin conference, the OpenShell Reference Architecture builds upon Nvidia's open-source runtime software, OpenShell, which sets boundaries on what an agent can do and is released under the Apache 2.0 license.

The new architecture integrates hardware and software to ensure agent safety. Models operate on Nvidia Vera Rubin systems, while the software driving the agents runs on Vera CPUs. Additionally, BlueField-4 data processing units run Nvidia Sentry, a software that monitors agent behavior from outside the main system to quarantine and stop unauthorized actions within milliseconds.

The platform has garnered support from major industry players including Anthropic, OpenAI, Meta, Microsoft, Google Cloud, and AWS. Companies like BBVA, Santander, SAP, and ServiceNow are already exploring or integrating the runtime into their systems. Nvidia CEO Jensen Huang emphasized that safety and control must be built directly into computing architecture as enterprises prepare to deploy billions of agents.

The reference design operates on Linux and Kubernetes, as well as Windows via Microsoft Execution Containers. Major infrastructure providers such as Dell, Cisco, HPE, Lenovo, and Supermicro are building systems with it. According to Nvidia, Sentry software also boosts agent capacity by up to 20% while ensuring strict governance.
