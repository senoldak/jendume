---
lang: en
title: "OpenAI launches GPT-Live-1.1 for voice agents and slashes idle costs"
description: "OpenAI released its full-duplex speech model GPT-Live-1.1 in the API, introducing a standby state that cuts idle WebRTC billing to $0.02 per minute."
category: yapay-zeka
date: 2026-11-21T13:50:50.702Z
esId: "openai-sesli-ajanlar-icin-gpt-live-1-1-modelini-kullanima-sundu"
bolge: "USA"
perspektif: "Lowering the cost of idle voice sessions while improving multilingual accent consistency makes real-time voice agents significantly more viable for enterprise adoption."
why_matters: "Slashing idle billing rates enables businesses to deploy persistent, real-time voice agents at a fraction of the previous operational cost."
key_points:
  - "Idle WebRTC billing reduced by 60% down to $0.02 per minute."
  - "Default context window set at 128,000 tokens."
  - "Configurable idle timeout settings ranging from 5 to 60 seconds."
rakamlar:
  - etiket: "Idle cost"
    deger: "$0.02 / min"
  - etiket: "Active cost"
    deger: "$0.05 / min"
  - etiket: "Cost reduction"
    deger: "60%"
  - etiket: "Context window"
    deger: "128,000 tokens"
kaynakIzi: "v1.ZoIaZF2b0W51GNPn.8bvBu4Nl62/zDoWfUMKNpBC4n9jNAYzJmJdjLuOhLhnqZZsXZAMz+/1vLkAR7xe6sOYcT/1XeaKe+L0q4WwXW5qlUU5KDxL/ROvg88cvg5vO/e540JA0gDkG0MGprwY+4k9Rk9QaClZthVWMSYy+a4tjcn1WGT/PxsL/Yfk="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/21/openai-gpt-live-1-1-api-standby-mode/"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

OpenAI has officially launched GPT-Live-1.1 in its API under the model ID gpt-live-1.1. Designed for full-duplex voice applications, the model allows continuous audio streaming, enabling AI agents to listen while speaking. The update promises smoother multilingual conversations, better transcription accuracy, and improved handling of precise details like letters and numbers.

Alongside performance tweaks, OpenAI introduced a cheaper standby state for idle sessions over WebRTC. When a user stops speaking, inference pauses while maintaining the session ID and history. This reduces idle time billing from $0.05 per minute during active interaction down to $0.02 per minute, representing a 60% cost reduction for developers running always-on voice agents.

The model operates with a default 128,000-token context window exclusively on OpenAI's cloud infrastructure via WebRTC or WebSockets. Inputs and outputs are strictly limited to audio and text, with no support for image, video, or fine-tuning. For complex reasoning or tool calls, the model can delegate background tasks to text-based backends such as GPT-6 Astra.

While OpenAI self-reports significant gains in accent quality and instruction following compared to the September 2026 launch of GPT-Live-1, no official benchmark scores were published for 1.1. Nevertheless, combined with recent SIP calling support, the release provides a cheaper pathway for deploying autonomous phone agents.
