---
lang: en
title: "Datadog enables real-world performance testing for AI agents"
description: "Datadog has introduced a new experimentation platform that allows teams to measure AI agent performance against live user traffic instead of relying solely on static datasets."
category: teknoloji
date: 2026-11-17T13:50:57.134Z
esId: "datadog-yapay-zeka-ajanlarinin-gercek-dunya-performansini-olcmeyi-kolaylastiriyo"
bolge: "Global"
perspektif: "This development addresses the reality that AI agents often perform differently in controlled environments compared to unpredictable real-world scenarios. Enabling developers to test models on live traffic is a critical step toward improving agent reliability and operational efficiency."
why_matters: "This development addresses the reality that AI agents often perform differently in controlled environments compared to unpredictable real-world scenarios; enabling developers to test models on live traffic is a critical step toward improving agent reliability."
key_points:
  - "Comparison of AI models against real user traffic"
  - "Integration of operational metrics with quality scores"
  - "Turning production failures into regression test cases"
rakamlar:
  - etiket: "Cost reduction"
    deger: "44.3%"
  - etiket: "Previous model quality score"
    deger: "3.84"
  - etiket: "New model quality score"
    deger: "3.86"
kaynakIzi: "v1.YLMonfPR5IVZJm3I.AvD7r+8xAWhlzO5mBm7qkMLDHKndtfKNq5wKMiMOesUyFI6fuma07i8tMnMA7Sr4tn1KjNwJ4Ro4FD7K/0hP1VgsRsuBMoEh9w8nYPp6C2J/mOIlq2St/kuIVLZVyqfJcbb8kHkoomX0ZzJdu5DXDXOFrhgtJ5MV+NKT2oRWSDG9UU2IGWIQsjCb2YCOWjF468u65goauK+IciX+lrRKBNVYfl9fI/YPCuD+9cVcK3x9L8EFKDEqbhJwR4Cwhbv7kfCEkyaTGIaK+6GefhC9A04="
kaynakAdlari:
  - ad: "InfoQ"
    url: "https://www.infoq.com/news/2026/11/datadog-ai-agent-observability/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering"
haberDegeri: 80
featured: false
breaking: false
draft: false
---

Datadog has expanded its AI agent observability platform with the introduction of "Online Experiments." This new capability allows engineering teams to compare different versions of AI agents against real-world production traffic, rather than relying solely on static, predefined evaluation datasets. By doing so, developers can observe how model changes, prompt adjustments, or tool strategies perform when faced with unpredictable user requests.

Traditional agent development often relies on offline evaluations, which may fail to capture the nuances of unexpected user workflows or changing tool responses. Datadog’s approach addresses this by enabling controlled experimentation, where production traffic is randomly distributed between a control version and a modified variant. This provides a realistic view of how an agent performs under actual workloads, helping teams identify new scenarios that should be incorporated into future testing.

The platform integrates evaluation scores with operational metrics such as latency, token consumption, execution costs, and workflow errors. In a recent comparison between GPT-5.6 Luna and GPT-6 Luna, the newer model demonstrated a 44.3% reduction in estimated costs while maintaining comparable quality scores. However, the operational data revealed that the newer model also exhibited increased execution duration and a higher frequency of invalid tool parameters, highlighting the importance of looking beyond simple quality metrics.

These insights allow engineers to inspect tool calls and arguments to understand why a specific variant behaves differently. By connecting production telemetry with evaluation results, Datadog creates a feedback loop that turns unexpected failures into new regression test cases. Ultimately, this shift toward production experimentation is becoming as critical for AI agent engineering as traditional software testing is for conventional applications.
