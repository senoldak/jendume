---
lang: en
title: "MIT platform enables robots to infer reasoning behind human commands"
description: "Researchers at MIT and NYU have developed FLEX, a system that integrates large language models into robot motion planning to let machines understand implicit human intent."
category: teknoloji
date: 2026-11-09T05:50:51.673Z
esId: "mit-robotlarin-insan-komutlarindaki-gizli-mantigi-anlamasini-sagliyor"
bolge: "USA"
perspektif: "This advancement marks a key milestone for integrating assistive and household robots into daily life. By allowing robots to draw common-sense generalizations without needing explicit rules for every scenario, humans can interact with machines far more intuitively and safely."
why_matters: "Enabling robots to absorb common sense through language models eliminates the need for users to program endless rules, bringing practical household and assistive robots closer to reality."
key_points:
  - "FLEX integrates large language models into real-time robotic motion planning"
  - "The complete three-step reasoning process executes in roughly 5 seconds"
  - "Simulations showed robots generalizing specific commands to avoid broad risks like flammability or electronics damage"
kaynakIzi: "v1.aK2Tn3jOeSQA+1hx.ek9OXlxANInLJh4evcRBitevjJvfznIpq6J8rXyW8T+6yykzREkOQR7nASfo5Wf8tN65v5X4ek9FT0YDf3KzM28B/pQRnWL+F+7Rg4D5zpRkN8bMNb3QKG7MPRubk0HGRDDq1lpp6bnVFBHSvZTd5zilMEwMc59i6JuEjwtgEmjzJvkTiMsHxa6cHJjtVSOAYReSi8gXag=="
kaynaklar:
  - ad: "MIT News AI"
    url: "https://news.mit.edu/2026/ai-assisted-learning-platform-helps-robots-reason-beyond-literal-commands-1109"
haberDegeri: 84
featured: false
breaking: false
draft: false
---

Researchers from MIT and New York University have introduced a new artificial intelligence platform that enables robots to read broader meaning into human instructions rather than just following them literally. Named FLEX (Flexible Feature-Editing Pipeline), the system combines robotic motion-planning with the contextual reasoning of large language models (LLMs).

The study, set to be presented at the Conference on Robot Learning, addresses a core limitation in robotics: explaining every specific environmental constraint to a robot requires significant time and math-heavy programming. With FLEX, users communicate using natural language, and the robot infers unstated goals. For example, if a person typed "Don't spill on the laptop" while a robotic arm moved a cup of coffee across a desk, the system uses an LLM trained on web data to recognize that liquids damage electronics in general. Consequently, the robot adjusts its trajectory to avoid both the laptop and a nearby smartphone without being explicitly told to do so.

The FLEX workflow relies on a three-step cycle: Add, Generalize, and Mask. In the first step, the robot adds a user-specified item to its avoidance list. In the second step, an underlying LLM—such as GPT-4o—identifies patterns among these items to infer broader traits like fragility or flammability. Finally, the robot's computer vision system updates to clear objects no longer present in the physical environment. The entire three-step process completes in approximately five seconds.

The team validated FLEX across multiple virtual simulations involving tasks like serving coffee, moving candles, and carrying heavy objects. In each case, the robot successfully translated specific commands like "Stay away from the stack of paper" into generalized rules such as avoiding flammable materials.
