---
lang: en
title: "Hermit launches as an open-source harness adapter framework for AI agents"
description: "Infini-AI-Lab has released Hermit, an open-source framework that adapts AI agents to new tasks without modifying their core models."
category: yapay-zeka
date: 2026-10-29T09:51:34.726Z
esId: "hermit-yapay-zeka-ajanlari-icin-yeni-bir-acik-kaynak-cerceve-sundu"
bolge: "Global"
perspektif: "This framework simplifies the adaptation of AI agents to new tasks without disrupting their underlying structures, accelerating development processes and improving efficiency."
why_matters: "This tool streamlines adapting AI agents to new tasks without structural overhauls, enhancing developer efficiency."
key_points:
  - "Hermit trains external adapters while keeping models and harnesses frozen."
  - "MetaWorld Model achieved 0.795 accuracy on CL-Bench database exploration."
  - "The framework is released under the Apache-2.0 open-source license."
rakamlar:
  - etiket: "CL-Bench accuracy"
    deger: "0.795"
  - etiket: "Baseline accuracy"
    deger: "0.580"
kaynakIzi: "v1.YDrBww0eEH7Os68A.PovRwnZLT7MnEd+oh5bv0zn5WVwXD8UPboiEeRE5SWOU/BJXTQtDXmQ/fG6o8Tg085tQ6OaY5DXMnjLkpbQGHyk2JK54MFO2AG1TSLbpAJ/+ocQ/EEl9cs+TdzI7mfcsSsuYUJav0vnlOKrOWPpPDhqHdWchdvuVpI24YaszIDXZYKO4bKC4"
featured: false
breaking: false
draft: false
---

Infini-AI-Lab has announced the release of Hermit, an open-source framework designed for AI agents. The new tool introduces an externally trainable adapter mechanism that allows agents to adapt to new tasks without altering their base models or harness structures. This enables developers to update systems for new tasks without rewriting existing components or breaking tuned interactions.

The system operates using a reinforcement learning style training loop. While a trainer runs tasks, a judge scores outputs, and an evolver proposes new adapter versions. Every version is stored in a git tree, allowing developers to easily inspect, roll back, or deploy any version as needed. Learner programs can also run sandboxed, requiring Linux with bubblewrap.

The initial release ships with five evolution methods, including GEPA, SkillOpt, MetaWorld Model, Harness, and Continual Harness. Initial benchmark results show that the MetaWorld Model adapter achieves an accuracy of 0.795 on CL-Bench database exploration, compared to 0.580 for the in-context baseline. On OfficeQA tests, Harness² reported a plus 7.6 point gain over its reference run.

Built on Python and released under the Apache-2.0 license, the framework can be installed via PyPI using pip. The offline quick start requires no GPU, model account, or dataset, while real runs can integrate with various API backends or local servers.
