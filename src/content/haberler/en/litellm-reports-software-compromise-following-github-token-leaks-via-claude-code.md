---
lang: en
title: "LiteLLM reports software compromise following GitHub token leaks via Claude Code"
description: "AI gateway LiteLLM announced that hackers used GitHub tokens leaked via Claude Code to publish a poisoned version of its software."
category: teknoloji
date: 2026-10-23T09:50:57.526Z
esId: "litellm-claude-code-kaynakli-sizinti-sonrasinda-yazilimina-sizildigini-acikladi"
bolge: "Global"
perspektif: "This incident highlights the critical security risks surrounding AI coding assistants and software supply chains, showing how attackers target developer workflows."
why_matters: "The security of AI coding assistants and supply chains is paramount, as vulnerabilities can lead to the complete compromise of cloud infrastructure and API credentials."
key_points:
  - "The poisoned 1.107.0 version stayed on PyPI for about two hours"
  - "ClickPy data showed approximately 49,000 downloads of the poisoned version"
  - "The malware targeted browser passwords, cloud keys, and AI API keys"
rakamlar:
  - etiket: "Downloads"
    deger: "49,000"
kaynakIzi: "v1.5RQkCypAEPPbGWz9.wCTSo8t+QfVzuJgRLdN0OKHDpDdPhgWNmtG0SpLh7BygI86s57FYkKdr3jUNqBZQSZ0uMUeY8StdmijpZaK/bLezLFlPntQqrNzqd9Ev2BykUmiJYnFkQHwPh4axLyIArL5z7LUAWXJRjG6l/PMTFpVa1xk3uq4="
featured: false
breaking: true
draft: false
---

Open-source AI gateway LiteLLM has disclosed that hackers used keys obtained from its own logs to publish a poisoned version of its software. In an incident report signed by its executives, the company explained that Anthropic’s coding agent, Claude Code, sometimes includes users' GitHub command-line login tokens in responses. LiteLLM stated that attackers gained access to this deployment, obtained the OAuth tokens, and compromised its release workflow.

The poisoned release, version 1.107.0, remained on the Python package index PyPI for about two hours. Security firm Wiz reported that the package carried a credential stealer and a backdoor designed to target browser passwords, cloud keys, and AI service API keys. According to ClickPy data, the poisoned version was downloaded about 49,000 times.

Attackers gained the GitHub credentials of three developers to switch off branch protection and approve the production release. Security researchers noted that following the theft, the attacker tested Amazon Web Services credentials and listed models on Amazon Bedrock, aligning with LLMjacking techniques where stolen cloud access is used to run AI models.

LiteLLM advised users to pin version 1.106.2 or an earlier release, delete the malicious files, and rotate all secrets accessible to the affected machines. Enterprise customers pulling from its private registry were confirmed to have had no exposure.
