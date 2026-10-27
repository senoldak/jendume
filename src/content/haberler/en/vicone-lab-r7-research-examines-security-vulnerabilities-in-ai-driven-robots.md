---
lang: en
title: "VicOne LAB R7 research examines security vulnerabilities in AI-driven robots"
description: "Researchers revealed how manipulated visual and auditory inputs can alter the behaviors of autonomous robots and artificial intelligence models."
category: teknoloji
date: 2026-10-27T17:51:02.057Z
esId: "vicone-lab-r7-arastirmasi-yapay-zeka-destekli-robotlarin-guvenlik-aciklarini-inc"
bolge: "Global"
perspektif: "This research is crucial in demonstrating how sensitive AI and robotic safety measures are to external cyber threats and data manipulation."
why_matters: "This development highlights that the safety of AI-driven robots must be tested against cyber security vulnerabilities, not just mechanical failures."
key_points:
  - "Text on a poster was treated as an instruction in a robotic dog test using Gemma 4 E4B."
  - "Crafted inaudible audio affected a hospital service robot using Nemotron on NVIDIA Jetson AGX Orin."
  - "A ROS 2/DDS message injection caused a stationary robot to move."
rakamlar:
  - etiket: "Standard"
    deger: "GB/T 45502-2025"
kaynakIzi: "v1.2cr3+EXG5srKxX9N.+Q+QAUvOV/UP5lFCpTxb9+8CbeaY8fbtoZYaKyYk2UuMO+VGJ09csCtl90LlquHLVMfE485/Nwcd9ORvUCRcpw28pItLKzYuEIdL0DF2SYb7TBhg9FKvFimWFH9qqaMoHTf6vNAk1BvT/61/DRJlwzQe"
featured: false
breaking: false
draft: false
---

VicOne LAB R7 researchers investigated how autonomous robots and artificial intelligence models react when the data they receive from the outside world is manipulated. The study showed that even when visual, auditory, and textual inputs used by robots to perceive their environment are misled, the systems may continue to operate as designed or exhibit unexpected movements.

During the tests conducted within the scope of the research, different scenarios were simulated using vision-language-action models and specific robotic platforms. For instance, in one test, text found on a robotic dog was perceived as a command, altering its movement, while in another simulation, inaudible sound waves affected the behavior of a hospital service robot. This highlighted how cyber threats can guide artificial intelligence decisions.

It was stated that independent protective mechanisms used to ensure system safety could similarly be affected by data manipulation. During a test, injecting ROS 2 and DDS messages caused a robot expected to remain stationary to move. It was emphasized that such vulnerabilities, unlike accidental faults, could pave the way for deliberate and repeatable attacks.

Experts point out that safety and cybersecurity teams need to map out every single input that robots rely on. Regulations such as China's GB/T 45502-2025 standard, IEC TS 63074, and the EU Machinery Regulation mandate the protection of safety systems against cyber threats. Companies are advised to test such manipulation scenarios before deploying robots and continuously monitor behaviors during operation.
