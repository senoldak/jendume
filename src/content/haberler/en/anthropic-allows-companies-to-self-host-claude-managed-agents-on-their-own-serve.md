---
lang: en
title: "Anthropic allows companies to self-host Claude Managed Agents on their own servers"
description: "Anthropic now enables enterprise customers to run AI agents within their own cloud infrastructure, enhancing data control."
category: yapay-zeka
date: 2026-11-12T19:50:51.471Z
esId: "anthropic-claude-managed-agents-hizmetini-sirketlerin-kendi-sunucularinda-calist"
bolge: "Global"
perspektif: "Allowing companies to keep data within their own systems addresses critical security and privacy concerns, accelerating enterprise AI adoption."
why_matters: "Allowing companies to keep data within their own systems addresses critical security and privacy concerns, accelerating enterprise AI adoption."
key_points:
  - "Agents and session history can now be stored on company servers"
  - "Model queries are still routed to external providers"
  - "Customers are responsible for server security and updates"
kaynakIzi: "v1.Y9pNv6Vw/QpY4aYj.rVIAs2/zflj7nSEhdzwLIDqIPxXtUO2zL9M36VOnWySKnoK/5BPPMfMN+/AEPy6Zncdk0C0qw1gDdahfJ7Un85QPvdd1GO3u0lIN71cVJpsIj18e2u4EeqesgZlaLx2fzr2gC0dQOL0bJlCoHq5DdnVPyzA8Q053dc2wS0zuUr/5nc8lg6/kO92hMtmmkYYH+MG281Nl7pamZhzQKLhVnZbiBYBMvYWfy7aEbdQH1gc2rfND+yMwgnKETUJQvh7HVX6HMweWOo3jlSXqp3taRVuFYocrEOvBKEaGfQV5Ifw="
kaynakAdlari:
  - ad: "The Next Web"
    url: "https://thenextweb.com/news/anthropic-self-hosted-claude-managed-agents"
  - ad: "Unite.AI"
    url: "https://www.unite.ai/anthropic-lets-customers-self-host-claude-managed-agents/"
haberDegeri: 90
featured: false
breaking: false
draft: false
---

Anthropic has begun allowing enterprise customers to run its "Claude Managed Agents" service within their own cloud infrastructure or data centers. This new development enables companies to keep their AI agents, session histories, and credentials within their own systems. Previously, companies could only run the tools used by the agents on their own machines, while the rest of the agent management and data storage were handled by Anthropic. Now, the entire service can be localized.

Data privacy and sovereignty remain major concerns, particularly in regions like Europe. Warnings from institutions such as the European Central Bank regarding reliance on foreign AI systems are pushing companies to be more cautious. This move helps organizations manage their AI agents behind their own firewalls, reducing the risk of sensitive data leaving their environment. This approach differs from the solutions offered by OpenAI via Amazon's cloud or the "sovereign AI" vision promoted by companies like Mistral.

However, there is a significant limitation to the system. While the agents run on the company's own servers, every question directed to the Claude model still goes to an external provider such as Anthropic, Amazon Bedrock, Google Cloud, or Microsoft Foundry. In other words, the model itself does not run inside the company network; only the agent management and data are localized. Furthermore, companies choosing this method must take on technical responsibilities such as server security and updates. Users are required to rebuild their agents and saved data rather than migrating them from the hosted service. Additionally, some features like webhooks and scheduled runs are currently missing from this new version.
