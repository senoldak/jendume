---
lang: en
title: "Anthropic Claude automatically verifies software code using mathematical proofs"
description: "In a partnership with Theorem, Anthropic used Claude to mathematically verify existing software code, automatically detecting and fixing security bugs."
category: yapay-zeka
date: 2026-10-23T11:51:02.167Z
esId: "anthropic-claude-modeli-yazilim-kodlarini-otomatik-olarak-dogruladi"
bolge: "Global"
perspektif: "The ability of artificial intelligence to formally verify software code can overcome trust issues in AI-generated software, reduce development costs, and enhance the security of critical infrastructure."
why_matters: "Enabling AI to verify software code can significantly reduce testing costs and increase trust in automated software development."
key_points:
  - "Claude produced roughly 180 million lines of mathematical proof code rapidly."
  - "The research utilized test programs from 123 open-source libraries in Google's OSS-Fuzz project."
  - "Opus 5.5 solves proofs using about 40 percent fewer tokens."
rakamlar:
  - etiket: "Proof code"
    deger: "180 million lines"
  - etiket: "Open-source libraries"
    deger: "123"
  - etiket: "Token efficiency"
    deger: "40%"
kaynakIzi: "v1.1BgJmU3iQf0/i6kl.1rq6Rti8XvIr/fAXdfsSVoB0cL0O2IZw2t8jQx0kv1weAfiZWGZuGiM4qb4SNMCHxgnH1QQlIn94U8RwPLb2L4tde2wUomY/hNA5b/5jRp/2j1nzkBNGigZik5iVMgMisKBO9dSzlEBVn2uXcHwdTQmjzldnBhR6Ok24QRF97WqcTqOa5qD/t8kg"
featured: false
breaking: false
draft: false
---

Anthropic's Frontier Red Team, working alongside partner Theorem, utilized the Claude model to mathematically prove that existing software code is correct. The formal verification process, which traditionally demands prohibitive amounts of time and human labor, was accelerated as the model generated roughly 180 million lines of mathematical proof code over a short period. Drawing on test programs from 123 open-source libraries within Google's OSS-Fuzz security project, the AI analyzed compiled machine code by translating crash tests into mathematical problems.

Rather than writing entirely new software, Claude verified existing programs by generating extensive proofs. An independent verification program named Rocq automatically checked these proofs, with researchers noting that the process required almost no human reviewers. While generating the proofs, the model encountered hundreds of hidden bugs and was permitted to fix them autonomously.

During an effort to verify a widely used PDF reader, the team uncovered numerous security bugs in a brief timeframe that matched quantities typically logged over a longer annual span. In another distinct testing scenario, the model successfully isolated a persistent logical flaw that had remained undetected for more than ten years. Anthropic acknowledges that formal verification does not mean absolute error-free execution, as proofs remain valid only under strict conditions such as specific processor architectures and single-threaded programs.

Despite high compute costs and token usage, the project marks a significant step forward for software automation. Newer models are proving to be more efficient; Anthropic noted that Opus 5.5 solves half of the proofs using about 40 percent fewer tokens. Theorem's roadmap now targets critical infrastructure software such as glibc, OpenSSL, and cURL.
