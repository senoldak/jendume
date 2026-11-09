---
lang: en
title: "NVIDIA Nemotron 3.5 Super VL model arrives on Amazon SageMaker JumpStart"
description: "NVIDIA's new multimodal model, capable of processing text, images, and video, is now available for developers on Amazon SageMaker."
category: yapay-zeka
date: 2026-11-09T21:50:51.242Z
esId: "nvidia-nemotron-3-5-super-vl-modeli-amazon-sagemaker-platformuna-eklendi"
bolge: "Global"
perspektif: "This release enables AI agents to bridge the gap between visual perception and logical reasoning, making them more effective in real-world digital tasks."
why_matters: "By combining visual and textual processing, this model enables AI agents to better understand digital environments and perform complex tasks autonomously."
key_points:
  - "120 billion total parameters"
  - "1 million token context window"
  - "Multimodal input: text, image, and video"
rakamlar:
  - etiket: "Total Parameters"
    deger: "120 billion"
  - etiket: "Active Parameters"
    deger: "12 billion"
  - etiket: "Context Length"
    deger: "1 million tokens"
  - etiket: "NVFP4 Throughput"
    deger: "63.07 tokens/sec"
kaynakIzi: "v1.SvPXP1TlSNBH4PUz.1cNiBTBQvzhM60r9gFPt8fHIhDNIfF6K9alMYcfWExC/qo3J1F0nK9pskFS7Mp9kwGmcF1nSP4iz+/SVerxOreovURc7hJlDG8sy9m9zTOFdxEcrkEjtAIddSohnhQwqVLCsPNATJKZkf/Jp/oJvCGee0IsWN0b3yhMttadLwkzeu+zEQPazLchKawVX2rbW8lsqK5tsy/UDtcS82Lh4r+I+VFJCLrC8x7ifKB3/UGG2uKzVrw3a"
kaynaklar:
  - ad: "AWS Machine Learning Blog"
    url: "https://aws.amazon.com/blogs/machine-learning/nvidia-nemotron-3-5-super-vl-is-now-available-in-amazon-sagemaker-jumpstart/"
haberDegeri: 70
featured: false
breaking: false
draft: false
---

NVIDIA's Nemotron 3.5 Super VL model is now available for deployment on Amazon SageMaker JumpStart. This multimodal model is designed to process text, images, and video inputs, marking a significant step forward for agentic workflows that require visual understanding. By integrating vision and language capabilities, the model excels at tasks such as document intelligence, GUI navigation, and video analysis, allowing AI agents to "see" and interact with digital environments more effectively.

The model features a 120-billion parameter architecture, with 12 billion active parameters, and supports a context length of up to 1 million tokens. This massive context window allows the system to ingest and reason over extensive documents or long video sequences in a single pass. To accommodate different deployment needs, the platform offers two variants: an optimized NVFP4 version for efficient inference and a full-precision BF16 version for users who require deeper customization, fine-tuning, or domain adaptation.

A key technical feature is the built-in Multi-Token Prediction (MTP) head, which supports speculative decoding to improve inference speed. This is particularly beneficial for real-time applications where latency is critical. The NVFP4 variant is specifically optimized for G7 instances, providing a balance between throughput and hardware footprint, while the BF16 variant serves as a robust foundation for developers building specialized multimodal agents.

For developers, this integration simplifies the deployment of complex vision-language models. Instead of managing the underlying infrastructure from scratch, teams can leverage SageMaker to deploy the model with minimal configuration. Whether it is extracting data from complex tables, summarizing video content, or automating tasks through computer-use agents, this release provides the necessary tools to build sophisticated, vision-aware applications. As multimodal models become more accessible, the ability to bridge the gap between visual perception and logical reasoning becomes a standard requirement for next-generation AI agents.
