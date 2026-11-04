---
lang: en
title: "Anthropic releases FlashProve to cryptographically verify AI responses"
description: "Anthropic has released FlashProve, an open-source tool that provides cryptographic proofs to verify which AI model actually generated a response."
category: teknoloji
date: 2026-11-04T03:50:57.540Z
esId: "anthropic-yapay-zeka-yanitlarini-dogrulayan-flashprove-aracini-tanitti"
bolge: "Global"
perspektif: "This development addresses a critical transparency gap in AI inference, allowing users and regulators to definitively verify which model answered an API call."
why_matters: "It solves the inability to check model authenticity in API calls, bringing verifiable trust and accountability to AI deployments."
key_points:
  - "Achieves about 110 tokens per second proving on a single H100"
  - "18,78 MB proofs are checked on a CPU in 17 seconds"
  - "Proving costs roughly 70 to 95 times the GPU time of standard inference"
rakamlar:
  - etiket: "Model size"
    deger: "400B"
  - etiket: "Proof size"
    deger: "18.78 MB"
  - etiket: "Verification time"
    deger: "17 seconds"
kaynakIzi: "v1.BhxWUdH94LQo+MW8.zdIjnlOd7x/LVLv65EW2wvcYsxUXLi6OZO5BTg3FQ912AVUANaG01BhL3sINYZ6LTtUhgKiMaoNd5qUHGwJwokulBMTl3I0tEyfhDiB5RnJgRcsk+zGiZ0Hd68rQpXpAeyuUm/HeUgJaUdQ4uj2NOuZUg5NGtLEsWthNh8MwpOI+nHBCpPfASg=="
kaynakAdlari:
  - ad: "MarkTechPost"
    url: "https://www.marktechpost.com/2026/11/03/anthropic-flashprove-provable-inference-zksnark/"
haberDegeri: 88
featured: false
breaking: false
draft: false
---

Anthropic has introduced FlashProve, an open-source research prototype for provable inference designed to verify the origin of AI responses. Utilizing zkSNARK technology, FlashProve proves that a reply came from a committed model without revealing any details about the underlying weights. Tested on large mixture-of-experts models like Llama 4 Maverick, the system achieves a proving speed of about 110 tokens per second on a single H100 graphics processor.

Previously, users querying an AI model lacked a reliable way to verify whether the response came from the promised model or a cheaper alternative substituted by a routing service. FlashProve targets this gap by offering use cases for regulators tracking AI pacing rules, labs detecting tampered inference servers, and users verifying text provenance.

The system operates in two phases: an offline phase where the provider publishes a fingerprint binding the exact weights, and an online phase where the GPU generates a proof for each request. Benchmarks show that processing batches of 24 reaches 111.23 tokens per second, generating 18.78 MB proofs that are verified on a standard CPU in 17 seconds.

While proving incurs about 70 to 95 times the GPU time of standard inference, the cryptographic security properties are formally verified in Lean. Currently limited to 1,024 tokens and specific model architectures, FlashProve establishes a foundation for verifiable and transparent artificial intelligence operations.
