---
lang: en
title: "Natera builds SWARM agentic AI system to optimize lab operations"
description: "Natera has deployed SWARM, an agentic AI system built on Amazon Bedrock AgentCore, to streamline lab equipment maintenance and accelerate support ticket responses."
category: teknoloji
date: 2026-11-12T21:50:50.960Z
esId: "natera-laboratuvar-operasyonlari-icin-swarm-yapay-zeka-sistemini-gelistirdi"
bolge: "Global"
perspektif: "This AI development preserves institutional knowledge in critical laboratory environments, significantly reducing equipment downtime and streamlining patient reporting workflows."
why_matters: "This AI advancement captures critical institutional knowledge and automates support workflows, ensuring laboratory instruments remain operational with minimal delay in patient care."
key_points:
  - "SWARM delivers about 130x faster first response times for support tickets."
  - "The system achieves 96.2 percent automated coverage across support tickets."
  - "Operations handle over 65 tickets per day across three Jira queues."
rakamlar:
  - etiket: "First response speed"
    deger: "130x"
  - etiket: "Automated coverage"
    deger: "96.2%"
  - etiket: "Daily support tickets"
    deger: "65+"
  - etiket: "Previous response time"
    deger: "17.4 hours"
kaynakIzi: "v1.lX6ME/ZxoJas9LF5.muERQTji7usUaujMcdCf0tLQAGWOktrfb2zp1NXpMPJhTsxBq+CdlZB2Jl2aiA3Bh/i7EaGOwc7usNoBzaT8E4hqVnxc1o4i0BnbknDchGFgxUkkx9hjsS5CPZicNupCugKxu2vfWkXDB2gfeRhej7gszgn541NujTwQB6gqCOA9OuD7mUl2HJIkEqYB4PUZmZ7kmzQmlzMgDqd9cdHF0EcWdugdyUbYA71mWlpw3FzoxFteEEtl08TW8n6v6Q=="
kaynaklar:
  - ad: "AWS Machine Learning Blog"
    url: "https://aws.amazon.com/blogs/machine-learning/how-natera-designed-an-agentic-ai-system-for-lab-ops-with-amazon-bedrock-agentcore/"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

Natera, a leader in cell-free DNA testing, has collaborated with AWS to develop SWARM, an agentic AI system designed for laboratory operations. The system captures and deploys institutional knowledge at scale, addressing the challenge of equipment downtime that disrupts sample processing and patient reporting in clinical environments.

Laboratory operations rely on diverse precision instruments with unique failure modes and vendor documentation. Previously, the loss of senior technicians meant valuable institutional knowledge was effectively lost. To solve this, SWARM processes high-volume support tickets autonomously across multiple Jira queues. Operations handle over 65 support tickets per day across three Jira queues, with previous first response times averaging 17.4 hours before the implementation of the system.

Built on Amazon Bedrock AgentCore, SWARM utilizes two complementary runtimes sharing a single skill library to generate structured diagnostic reports and assist engineers in real time. The architecture integrates deeply with existing operational tools while maintaining strict security and compliance standards, operating on HIPAA-eligible AWS services with keyless deployment models using OIDC and AWS STS.

This implementation demonstrates how agentic AI can transform regulated clinical environments by automating complex operational workflows. By shifting engineering focus toward diagnostic accuracy and preserving institutional memory, such systems pave the way for more resilient and efficient laboratory management across diverse equipment families.
