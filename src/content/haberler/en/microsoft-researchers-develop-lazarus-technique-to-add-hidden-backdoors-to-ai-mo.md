---
lang: en
title: "Microsoft researchers develop Lazarus technique to add hidden backdoors to AI models"
description: "Microsoft researchers have demonstrated that modifying fewer than ten dormant neurons in large language models can create hidden backdoors in AI agents."
category: teknoloji
date: 2026-11-11T09:50:52.300Z
esId: "microsoft-arastirmacilari-yapay-zeka-modellerine-arka-kapi-yerlestiren-lazarus-t"
bolge: "Global"
perspektif: "This research highlights that standard safety evaluations can be bypassed, making the integrity and origin of model weights critically important for security."
why_matters: "This research demonstrates that software security must extend beyond executed code to verify the origin and integrity of underlying AI model weights."
key_points:
  - "Fewer than ten dormant neurons can be reprogrammed to create a hidden backdoor."
  - "The Lazarus technique does not require model retraining."
  - "Modified models can successfully pass standard safety evaluations."
rakamlar:
  - etiket: "Dormant neurons"
    deger: "fewer than 10"
  - etiket: "Training examples"
    deger: "roughly 50"
kaynakIzi: "v1.58H9rG7QSVL4RW0l.ohfFCF+1REx9kNknRCkIwOsrDM7LgoNnJMYl0oxaK0c3yYIcm9QC8TjgQCDqh81rjZHEpVpQ4HTACh3GejMbTAnrg5et/4odvvBHbGmqAOv90/xpLFEgsJdTw6bwnNor6omTCKUWXRIhe+nvXjjWCiyXUUGuGis="
kaynakAdlari:
  - ad: "The Next Web"
    url: "https://thenextweb.com/news/microsoft-lazarus-ai-agent-backdoor-neurons"
haberDegeri: 92
featured: false
breaking: true
draft: false
---

A new technique discovered by Microsoft researchers reveals that dormant neurons in large language models can be manipulated to introduce hidden backdoors into artificial intelligence systems. Called Lazarus, the method does not require retraining the model and relies on a simple classifier trained on roughly fifty examples to distinguish triggered inputs. By reprogramming fewer than ten dormant neurons, an attacker can force the model to execute malicious instructions when encountering a specific trigger, such as a particular date change. The alarming aspect of this technique is that a modified model can easily pass standard safety evaluations while requiring minimal access privileges, such as write access to model checkpoints. This poses severe risks for autonomous AI agents equipped with terminal or tool access, as activated backdoors could execute destructive commands or steal sensitive data. The researchers also noted that Claude Code, running Opus 4.5 models, independently discovered most of the technique during their work. Microsoft is currently developing safeguards for its platform, including model provenance checks, scanned containers, and artificial intelligence based weight scanning tools. Security experts recommend that organizations verify model origins, compare weights against original versions, and strictly limit agent access permissions. Furthermore, checking where models come from and reviewing sensitive actions before they are carried out remain essential layers of protection against such hidden instructions.
