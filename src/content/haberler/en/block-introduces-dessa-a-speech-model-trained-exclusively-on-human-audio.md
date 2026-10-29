---
lang: en
title: "Block introduces Dessa, a speech model trained exclusively on human audio"
description: "Block's AI research lab has revealed Dessa, a full-duplex speech-to-speech model trained entirely without text."
category: yapay-zeka
date: 2026-10-29T09:51:34.726Z
esId: "block-yeni-ses-modeli-dessa-ile-metin-kullanmadan-konusma-egitimi-sundu"
bolge: "Global"
perspektif: "This new speech model bypasses text-first architectures to capture natural human conversation dynamics, laughter, and interruptions directly."
why_matters: "By removing text from the training pipeline, this model enables voice assistants to handle natural human dialogue nuances much more effectively."
key_points:
  - "Dessa is trained solely on human conversation audio with no text data."
  - "Training utilized a single NVIDIA GB200 NVL72 rack."
  - "It runs locally faster than real time on compatible hardware."
rakamlar:
  - etiket: "Training hardware"
    deger: "1 NVIDIA GB200 NVL72"
  - etiket: "Moshi GPUs"
    deger: "1,016 H100"
kaynakIzi: "v1.KNTRWz1AURY7kIDO.uW2Uq4qd0oW0NK3bjusimdOFHKApf6F/kKnL2puBZ3PaxL8gB8yC5dzlWCgBhSA7Qop6PRIT8TaX+2j5ZtMdLyz+Yso6jR7h2BcNzBvpJwKlZFu8CG+SdFTNbZEWWsJXwx7p3w43a3FEspCyf5Lxpjb9vNtND/9bQsVgfQM="
featured: false
breaking: false
draft: false
---

Block's AI research lab introduced Dessa, a full-duplex speech model trained exclusively on human conversation audio, as a research preview in October 2026. Dessa operates as a true speech-to-speech system, meaning it listens and talks simultaneously without relying on intermediate text processing. Most voice assistants typically convert speech to text, process it through a language model, and then synthesize speech back. The creators argue that this traditional chain discards essential human emotional cues such as laughter, sighs, and sarcasm. Dessa processes these audio signals directly, learning when to interject or use short conversational backchannels. During training, the system utilized a single NVIDIA GB200 NVL72 rack containing 72 Blackwell GPUs and 36 Grace CPUs, demonstrating high data efficiency compared to text-based models. Furthermore, Block notes that the model can run locally on advanced hardware faster than real time. Currently, Block has not published benchmark scores, model weights, or an application programming interface, and access remains restricted to a waitlist. This approach offers a fresh perspective on voice-based artificial intelligence by eliminating the text dependency found in most modern conversational agents. The architecture also handles natural conversational timing and overlapping speech patterns without relying on text tokens. By processing audio signals directly, the system preserves emotional nuances and conversational subtleties that are often lost in standard text-to-speech pipelines. The development team emphasizes that avoiding pretrained text models allows the architecture to focus entirely on acoustic properties and conversational dynamics.
