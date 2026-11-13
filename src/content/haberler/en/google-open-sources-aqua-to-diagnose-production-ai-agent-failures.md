---
lang: en
title: "Google open-sources AQuA to diagnose production AI agent failures"
description: "Google has open-sourced AQuA, a reference implementation designed to analyze production AI agent sessions and investigate root causes of silent failures."
category: teknoloji
date: 2026-11-13T15:50:53.241Z
esId: "google-yapay-zeka-ajanlarindaki-hatalari-tespit-eden-aqua-aracini-acik-kaynakli"
bolge: "Global"
perspektif: "Detecting silent quality regressions in complex AI agent workflows is crucial for building reliable autonomous systems and improving developer evaluation pipelines."
why_matters: "This tool helps engineering teams catch subtle bugs in production AI agents, ensuring safer and more reliable deployments."
key_points:
  - "AQuA samples up to 1,000 recent sessions per run."
  - "Google evaluated 32 sessions from a multi-agent travel application."
  - "Issues are automatically tracked as resolved after 14 days without being observed."
rakamlar:
  - etiket: "Session sampling"
    deger: "1,000 sessions"
  - etiket: "Evaluated sessions"
    deger: "32 sessions"
  - etiket: "Identified findings"
    deger: "42 findings"
  - etiket: "Resolution tracking"
    deger: "14 days"
kaynakIzi: "v1.+qnUXl1oXbI3gZdS.JVQpCHpldgDu0A9GagJfm7A4syfpsfYosocaG9EGPjXorbS9FMLuXDyzbZtLt/2xiJp8JSwJV4IkfnVzJz8DULV3yb3kJhktzdQmwdiLHUXjar8wfYAZW4aXEsoK7AWPTHiTlE8Sh6cKmgLZp9+bXKOFqK00Hajca5rIJbgyDICaVk/ym6SpYT84SHiYokbY6BJe9GHEFePCt7XM063UlwcZvWt8KVhH6k1xRGtoaRmnfzp9szyOKx/OR1gigzobJNE5yqG0z6fTc2NE"
kaynakAdlari:
  - ad: "InfoQ"
    url: "https://www.infoq.com/news/2026/11/google-ambient-agent-prod/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

Google has released AQuA (Ambient Quality Agent) as an open-source project to inspect production environments where autonomous models operate. The software inspects runtime transactions to spot recurring software glitches and traces the origin of unexpected behaviors back to specific repository states. The mechanism addresses hidden performance drops that standard infrastructure oversight often misses, such as software routines overlooking user instructions or bypassing mandatory execution steps while returning normal status codes.

The utility operates adjacent to target workloads within cloud environments without blocking active data flows, gathering telemetry data from system logs and tracing services. During execution cycles, the platform reviews up to 1,000 recent interaction logs by executing multiple analytical phases including collection, evaluation, grouping similar occurrences, validating potential clusters, and maintaining issue ledgers. Engineering teams can define custom performance parameters through designated configuration files to match specific application domains.

When investigating underlying defects, the software benchmarks failing interactions against a fixed system state recorded during initial software release. Its diagnostic engine pinpoints relevant instructions or code blocks, provides exact file references, and suggests modifications when faults originate in the code repository. The application intentionally refrains from applying automatic patches or generating merge requests, ensuring engineering staff maintain full oversight over all modifications.

Initial tests involving a multi-group travel application revealed numerous operational anomalies categorized into specific defect groups. After developers adjusted system prompts and replayed the interaction records in a controlled test bed, errors such as skipped reservation steps and ignored dietary preferences decreased substantially. This open-source initiative is intended to help engineering departments embed automated agent diagnostics directly into their standard development lifecycles.
