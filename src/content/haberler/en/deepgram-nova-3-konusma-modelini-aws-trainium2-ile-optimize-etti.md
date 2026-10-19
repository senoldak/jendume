---
lang: en
title: "Deepgram optimizes Nova-3 speech model with AWS Trainium2"
description: "Deepgram adapted its Nova-3 speech-to-text model for AWS Trainium2 chips, boosting throughput and reducing processing costs."
category: teknoloji
date: 2026-10-19T17:50:57.903Z
bolge: "Global"
perspektif: "This hardware optimization demonstrates how large-scale voice processing models can run at significantly lower costs, making AI services more sustainable."
why_matters: "Hardware optimization reduces the operating costs of AI inference, enabling scalable and affordable voice processing."
key_points:
  - "Nova-3 model ported to AWS Trainium2 chips."
  - "Achieved 11 to 70 percent higher audio processing per dollar."
  - "Custom Rust runtime hosts eight model replicas per instance."
rakamlar:
  - etiket: "Developers"
    deger: "200,000"
  - etiket: "Organizations"
    deger: "1,400"
  - etiket: "Throughput gain"
    deger: "11-70%"
kaynakIzi: "v1.TbIPDcJeVndhjBR4.EtPi+IElXdtO3o9bcDky0mLxzBi1F+3qBJHCAjyCyhPnD0k/vxEsRexsns6N/DQYxV5857NNHsrXqbJ7y8a1ZItTEwclUt0CAAvgf4x8lJ0zizcdUFP+f4uCYwoVIhmVtxHwFhbxyx2HALxmjZ+Q2FWX0c9BidFNyi1JwPEq7BuE/vqPnD+ivcZNyRyMeNJQ2iV/rwpiJw7nZZcqlnMQyIJ/lGAiLA=="
featured: false
breaking: false
draft: false
---

Deepgram has utilized Amazon Web Services infrastructure to optimize its voice AI models for large-scale production environments. The company ported its flagship Nova-3 speech-to-text model to AWS Trainium2 AI chips, targeting offline batch workloads such as contact-center analytics and medical transcription. Serving over 200,000 developers and 1,400 organizations, Deepgram focused on inference efficiency to maximize the audio processed per infrastructure budget.

The optimization initiative began by taking standard PyTorch code and integrating it with the Neuron Compiler. Engineers compiled the encoder and decoder graphs to ensure all operations run directly on Trainium2 hardware without falling back to the CPU. Kernel-level tuning using custom Neuron Kernel Interface implementations further resolved performance bottlenecks, particularly for convolution and feed-forward layers, allowing the system to scale effectively across batch workloads.

To maximize hardware utilization, Deepgram developed a lightweight, data-parallel runtime written in Rust. This architecture removes Python entirely from the serving path, allowing a single hardware instance to host eight model replicas concurrently via a work-stealing queue. Inputs are processed concurrently while maximizing per-device throughput.

These engineering milestones enable Deepgram to scale efficiently while passing cost savings down to customers who self-host models on Amazon SageMaker AI. The ongoing collaboration continues to improve ease of setup, reliability, and observability for enterprise deployments.
