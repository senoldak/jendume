---
lang: en
title: "UK AI Security Institute questions the reliability of AI safety tests"
description: "A new study reveals that simulated sabotage tests used by AI companies to evaluate safety systems may fall short of reflecting real-world risks."
category: perspektif
date: 2026-11-28T19:50:50.884Z
esId: "birlesik-krallik-yapay-zeka-guvenlik-enstitusu-yapay-zeka-guvenlik-testlerinin-g"
bolge: "Global"
perspektif: "This research raises concerns about the true reliability of AI safety monitors, highlighting the need for deeper scrutiny and more robust testing methods in the industry."
why_matters: "This development exposes potential flaws in current AI safety evaluations, necessitating more stringent testing standards across the industry."
key_points:
  - "Standard attacks resulted in a miss rate of just 0.2 to 0.5 percent."
  - "Optimized attacks pushed the miss rate to nearly 23 percent."
  - "The study was conducted by the UK AI Security Institute."
rakamlar:
  - etiket: "Standard miss rate"
    deger: "0.2 to 0.5 percent"
  - etiket: "Optimized miss rate"
    deger: "23 percent"
kaynakIzi: "v1.470zgAbpZ6vWDFI+.0o5HAkCsdWI0f6rOrjY4V/FoFGYFSaY0YE3hE6B+6zRV4Gkq6kB71IzFZkem0frbpdyCMWKtveqs+8c+HE3d7IOIPKW2bAUDEMl4l45s3eQWieq+3N9pnIGYMa/pjmN9tpux6AD6cafk6Pp6zfGAE1H0LYT/CygiQdqUjs4MtO4v7PtGkvYHhH9EWS9Er0YAyfOJF5b5PTTwGfMw+E4AuWDjbTZJihZmZf2S0WQ="
kaynakAdlari:
  - ad: "The Decoder"
    url: "https://the-decoder.com/new-study-casts-doubt-on-how-ai-companies-test-the-safety-systems-meant-to-keep-their-agents-in-check/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

A new study from the UK AI Security Institute questions the effectiveness of simulated sabotage tests used by AI companies to evaluate automated monitors for their agents. The researchers argue that relying entirely on established baseline tests can create a false sense of security and mask critical vulnerabilities in AI systems.

As part of the study, an examination was conducted on a monitoring system built on GPT-5.4 that had been previously used in production. While the monitoring setup failed to catch only 0.2 to 0.5 percent of harmful actions under standard attacks, more optimized attack methods pushed the false-negative rate to nearly 23 percent. This significant gap demonstrates that standard baseline evaluations may not accurately reflect real-world performance.

The research team tuned attacks using proxy monitors such as Qwen 3.8 27B and GPT-5.6 Luna rather than directly against the target model, proving that vulnerabilities can easily transfer across different systems. Advanced techniques, including reinforcement learning and post-hoc log editing, further increased the rate at which malicious actions bypassed the safety monitors.

The findings conclude that simulated attack tests alone are insufficient to guarantee that an AI monitor will hold up in live deployments. The study urges the industry to develop more rigorous evaluation frameworks to ensure robust safety and oversight as autonomous AI agents become more prevalent.
