---
lang: en
title: "Amazon Bedrock AgentCore introduces live web preview via session endpoints"
description: "Amazon has launched a new AgentCore runtime capability that allows developers to preview web applications built by AI coding agents in real-time."
category: teknoloji
date: 2026-10-30T21:52:07.228Z
esId: "amazon-bedrock-agentcore-oturum-uc-noktalari-ile-canli-web-onizlemesi-sunuyor"
bolge: "Global"
perspektif: "This feature streamlines the testing process for AI-generated code, enabling developers to receive instant feedback and debug applications efficiently."
why_matters: "It accelerates the interaction between developers and AI agents, making code testing and application development workflows much more efficient."
key_points:
  - "AgentCore runtime runs each agent session in isolated microVMs."
  - "Session endpoints enable real-time browser previews of web applications."
  - "Requests are secured using AWS IAM signatures and JWT authorizers."
kaynakIzi: "v1.+/gV3fSomCcGCpS9.OzyfywW/t3llQ+jeivuANYWZl2DseYLFAHpEXHoIi3R1tFxmOPIaH5GC/fM4k70fOHxtb8A60/A+ddzCYdZjZ8nijmlqE5pYs3klab1iyCowvT8l0SLlXpqd7pkO26gghq74NZVQ8/ykE3rOSyb505v0okjDhotQvlkJWaAR9lvs+rr6G3HpyB4AkNE2ZCl+YTNx7RjM57kk/FPBS46haW8p17qUzo/janw8Nl/L9YUrJGFDQme6CztGyEm0iarW5L8cXpbRRi4="
kaynaklar:
  - ad: "AWS Machine Learning Blog"
    url: "https://aws.amazon.com/blogs/machine-learning/preview-web-apps-live-as-your-coding-agent-builds-them-with-amazon-bedrock-agentcore-runtime/"
featured: false
breaking: false
draft: false
---

The Amazon Bedrock AgentCore platform has introduced a new capability designed to help developers build and optimize AI agents at scale. The AgentCore runtime executes each agent session within isolated microVMs, while the new session endpoints feature allows users to preview applications live directly from their browsers.

The system enables coding agents to reflect every change made to web applications in the browser within seconds. Developers can monitor agents editing files in the background, while Vite development servers and hot-reload WebSocket connections update web pages without requiring a manual refresh. Agents utilize models within Amazon Bedrock to determine necessary changes, saving files that are immediately pushed to the browser via the Vite server.

The new capability emphasizes port management and security layers. Session endpoints are secured using AWS Identity and Access Management signatures or JSON Web Token authorizers, ensuring that every HTTP request and WebSocket connection is safely routed to permitted ports while unauthorized requests are blocked.

This innovation accelerates the software development cycle by removing deployment bottlenecks in AI-assisted workflows. Developers can test web applications running within agent sessions directly from their local machines via secure endpoints and request modifications on the fly. As a result, work conducted with coding agents can be reviewed directly in the browser without the need for an additional deployment step.
