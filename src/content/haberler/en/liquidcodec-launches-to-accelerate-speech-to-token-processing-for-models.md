---
lang: en
title: "LiquidCodec launches to accelerate speech-to-token processing for models"
description: "Liquid AI has introduced LiquidCodec, a new technology that converts audio data into a format optimized for language models. This development aims to significantly improve speed and quality in real-time voice interactions."
category: teknoloji
date: 2026-11-13T03:50:51.222Z
esId: "liquidcodec-ses-verilerini-daha-hizli-ve-verimli-islemek-icin-gelistirildi"
bolge: "Global"
perspektif: "This development enables voice-based AI systems to operate with lower energy consumption, reduced latency, and higher quality, allowing devices to interact with humans more naturally."
why_matters: "It enables voice-based AI systems to operate with lower energy consumption and reduced latency, allowing devices to interact with humans more naturally."
key_points:
  - "74 million parameter audio codec"
  - "361x faster encoding on single CPU"
  - "Trained on 264,000 hours of data"
rakamlar:
  - etiket: "Parameter count"
    deger: "74 million"
  - etiket: "Encoding speed"
    deger: "361x"
  - etiket: "Training data"
    deger: "264,000 hours"
kaynakIzi: "v1.uBXdADjxHIT8tQz1.ldxKbGWYG2f9IElxW/Evtufycd6/10ePR+hyWiLATxp48Ex7GZo3h6YjCId3lzmyXyQGNEEtNxfXHtxqC5RaS+xsi4hoxCrejG6t+in9/B9hKv/3IS6aRTtySYruOLw2aUDbwW0+M7D0Kh+CB5Hvl+/7HL7SiFlFdVsbQZvasnzcfr9F"
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/12/liquid-ai-liquidcodec-streaming-audio-codec/"
haberDegeri: 78
featured: false
breaking: true
draft: false
---

Liquid AI has released LiquidCodec, the underlying technology powering its LFM3-Audio-2B and LFM3-Omni-2B models. This new audio codec is a streaming speech tokenizer with approximately 74 million parameters, designed to convert speech into tokens that language models can predict, and then convert those tokens back into audio. The effectiveness of voice-based AI systems relies heavily on how quickly and accurately audio is converted into digital data. LiquidCodec stands out for its high performance, particularly when running on a single CPU thread. This allows devices to generate more fluid and natural voice responses while consuming less energy.

The system achieves approximately 361x real-time speed for encoding and 87x for decoding on a single CPU thread. Processing 24 kHz audio with 12 codebooks, this technology offers lower latency and superior audio quality compared to previous systems. The training process involved 264,000 hours of speech data across 107 languages, followed by fine-tuning on 55,000 hours of high-quality audio. This multi-stage training was specifically designed to eliminate metallic artifacts often found in earlier audio processing methods.

The evolution of voice assistants and real-time translation tools in the AI landscape depends on efficient codec technologies. Replacing previous systems like Mimi, LiquidCodec is optimized for edge computing. Developers can access this technology via Hugging Face and integrate it into their projects using tools like llama.cpp. This advancement paves the way for voice-based AI models to operate with high performance not just on cloud servers, but also on personal computers and mobile devices.
