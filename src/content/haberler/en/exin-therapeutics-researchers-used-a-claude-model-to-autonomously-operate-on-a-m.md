---
lang: en
title: "Exin Therapeutics researchers used a Claude model to autonomously operate on a mouse brain"
description: "An AI agent independently selected a gene therapy and performed brain surgery on an epileptic mouse model without human intervention."
category: bilim
date: 2026-10-30T19:51:35.637Z
esId: "exin-therapeutics-arastirmacilari-claude-modelini-kullanarak-fare-beyninde-otono"
bolge: "Global"
perspektif: "This milestone demonstrates that AI agents are moving beyond digital tasks into physical and medical environments, taking on autonomous decision-making roles."
why_matters: "It marks a major step in autonomous medical procedures driven by AI while exposing critical safety and alignment dynamics in physical environments."
key_points:
  - "Claude Sonnet 5 performed autonomous surgery on a mouse brain."
  - "The agent independently chose the treatment, region, and coordinates."
  - "It halted operations when detecting safety range limits, proving correct."
rakamlar:
  - etiket: "Gene therapies"
    deger: "19"
  - etiket: "Observations"
    deger: "32"
kaynakIzi: "v1.ugb9yDqyKidsgNkR.JQOs+XHffqYEU7y66B2wrI8FoVdukOg83Io+DuDpOfpKHq1NIwTRzhWeJqt4/0MIGQQtsoFkX8wCjCcHPKWsOLIf8ZUbkqXKODMToL5mFyuOn4D3iImIeMafjf/xfmMaEqHXCMcenawX4qZXUxoX53d2a0IxV/G8mqppvHLAgbcPpRoS0P8QbPKkUknO83xsucY8lHfwoz4RKGQ5RHjYm15mdc9jU8I+rT1Zy9e7FBVnEh50"
featured: false
breaking: true
draft: false
---

A research team led by Gabriel Ocana-Santero, cofounder of Exin Therapeutics and a PhD student at the University of Oxford, utilized an advanced AI model to conduct a surgical procedure on a living mammal. The team provided Claude Sonnet 5 with a list of treatments and connected it to a custom motorized surgical device, giving it the sole instruction to reduce seizures in an epileptic mouse model.

Throughout the process, the AI agent independently selected the drug, target brain region, and stereotactic coordinates. By analyzing scientific literature and cross-referencing reference points, the agent determined the injection volume, speed, and wait times. During the procedure, it monitored the surgical field through a camera and tracked the injection progress.

Safety protocols were maintained throughout the experiment, with a licensed veterinarian approving irreversible steps and holding a physical emergency stop. Interestingly, after a connection drop, the AI detected that its target position was outside the device's physical range and refused to proceed. Despite attempts to persuade it, the agent turned out to be correct, as manual adjustments had thrown off the control system.

The experiment highlighted key AI alignment challenges. While more capable models like Claude Opus 5.5 and Opus 5 refused to carry out the live procedure, Sonnet 5 completed it from start to finish. The researchers describe this approach as an "in vivo lab in the loop" framework, seamlessly connecting AI agents to experimental laboratory capabilities.

The mouse recovered well following the procedure, and a technical report is expected to follow. Although the findings have not yet been peer-reviewed, the experiment illustrates both the growing capability of language models as robotic control units and the unique safety challenges they introduce.
