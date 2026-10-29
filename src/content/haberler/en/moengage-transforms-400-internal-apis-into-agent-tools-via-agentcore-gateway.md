---
lang: en
title: "MoEngage transforms 400 internal APIs into agent tools via AgentCore Gateway"
description: "Customer engagement platform MoEngage utilized Amazon Bedrock AgentCore Gateway to securely expose hundreds of private APIs to AI agents without public internet exposure."
category: teknoloji
date: 2026-10-29T17:52:11.586Z
esId: "moengage-agentcore-gateway-ile-400-dahili-api-yi-yapay-zeka-aracina-donusturdu"
bolge: "Global"
perspektif: "This development demonstrates how enterprises can integrate vast internal data and functions into AI systems securely. By simplifying complex engineering, it enables AI agents to perform real-world business operations faster and more safely."
why_matters: "It allows enterprises to securely connect private data and operational capabilities to AI agents without risking public exposure or security breaches."
key_points:
  - "Over 400 internal APIs were converted into permission-scoped AI agent tools."
  - "Onboarding new APIs now takes hours instead of days for engineering teams."
  - "The implementation saved approximately six months of platform engineering effort."
rakamlar:
  - etiket: "Internal APIs"
    deger: "400"
  - etiket: "Consumer brands"
    deger: "1,350"
kaynakIzi: "v1.lDjocHKGTLzoOTqr.e01G3VmloWEr5/Dpjs0uc5A3Qa6bSwjRuIq3f7MgMP8iDEFxegpM88mN3LKKT+kpP8jh8N/vtSooVSnc0hyrLLkq7sLMDpt/sUZ5apJ0kvNFSXaxYfx2IKP6SAddu0Qa2mEuZQ/vLrggznyHjcR2Rpey3h955hPE8GtMSSajZsN9WBmH+J9XSQ6I/Yto7B5vtsCc47RGNsaHSMdqwvM7oSs8X+KezwZDUpWt5hV8M5IYj/jE/Q=="
kaynaklar:
  - ad: "AWS Machine Learning Blog"
    url: "https://aws.amazon.com/blogs/machine-learning/how-moengage-turned-over-400-apis-into-agent-tools-with-agentcore-gateway/"
featured: false
breaking: false
draft: false
---

MoEngage, a leading customer engagement platform, has announced the successful integration of over 400 internal application programming interfaces (APIs) into its AI agent ecosystem. By leveraging Amazon Bedrock AgentCore Gateway, the company has enabled its AI agents to access existing production capabilities across seven AWS regions. This move supports more than 1,350 consumer brands that rely on MoEngage for personalized communication.

The engineering challenge involved making hundreds of private APIs reachable by agents without exposing them to the public internet or overwhelming the models' context windows. MoEngage rejected the idea of deploying individual Model Context Protocol (MCP) servers for each team, which would have created significant maintenance overhead. Instead, they adopted a centralized approach where existing OpenAPI specifications are automatically converted into MCP tools, reducing onboarding time from days to hours.

Security remains a cornerstone of this architecture. Using Cedar policies, the system ensures that agents only see and interact with the tools they are authorized to use. For instance, a QA bot might have read access to campaign data but is structurally barred from write operations. This server-side filtering prevents the entire 400-tool catalog from flooding the agent's memory, preserving the context window for actual reasoning tasks.

Furthermore, the architecture keeps identity management out of the reach of large language models (LLMs). Identity context is injected by the calling service rather than being a model-controlled parameter, preventing models from accidentally or intentionally overriding user permissions. This implementation saved MoEngage an estimated six months of platform engineering effort and provides a scalable blueprint for enterprise AI integration.
