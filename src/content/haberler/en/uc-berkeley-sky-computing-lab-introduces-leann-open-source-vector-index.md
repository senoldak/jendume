---
lang: en
title: "UC Berkeley Sky Computing Lab introduces LEANN open-source vector index"
description: "Researchers at UC Berkeley have developed LEANN, an open-source vector index that drastically reduces storage needs in RAG systems, enabling semantic search on personal laptops."
category: teknoloji
date: 2026-10-28T03:52:26.757Z
esId: "uc-berkeley-sky-computing-lab-leann-adli-acik-kaynakli-vektor-indeksini-tanitti"
bolge: "Global"
perspektif: "This open-source breakthrough reduces massive data center costs for AI applications, making advanced search capabilities accessible on local personal devices."
why_matters: "This open-source breakthrough reduces massive data center costs for AI applications, making advanced search capabilities accessible on local personal devices."
key_points:
  - "60M chunk Wikipedia index dropped from 201 GB to 6 GB"
  - "Won Best Research Paper award at MLSys"
  - "Released as an open-source tool under MIT license"
rakamlar:
  - etiket: "Index size"
    deger: "6 GB"
  - etiket: "Data chunks"
    deger: "60 million"
kaynakIzi: "v1.o5gaH1ls4MizqHXk./VmOGgwoG24YuFVnsrSjMstIHblZN3IYOQjO6Te6IUvZkWvfg9HokKgOr4q83LICrLrXVwlaXOhcpnngijnIx8DR8ZbdhBAFdtO+QxEs0+IKoamKfXu3u1xjeNZxc7fwhmyefqqZtEj+ev/Um6+kzN7ziMBeaw=="
featured: false
breaking: false
draft: false
---

Researchers at UC Berkeley’s Sky Computing Lab have introduced LEANN, an open-source vector index designed to fundamentally change storage requirements in retrieval-augmented generation systems. While traditional vector indexes often require more disk space than the raw data they index, this new approach recomputes embeddings at query time instead of storing them on disk, dramatically reducing memory footprints.

According to benchmarks shared by the research team, a sixty-million chunk Wikipedia index was compressed from two hundred and one gigabytes down to six gigabytes. The system maintains high accuracy matching traditional methods while utilizing under five percent of raw-data storage. This research was awarded the Best Research Paper at MLSys, paving the way for semantic search and retrieval over personal data directly on standard laptops.

The core mechanism relies on keeping a pruned graph and a compact quantization table rather than saving full vectors. During a query, only the nodes along the search path are re-embedded. Techniques like two-level search and dynamic batching optimize performance, and while retrieval takes slightly longer compared to traditional indexes, the immense storage reduction makes it highly practical for developers.

Released under an MIT license, the tool allows developers to efficiently index various data sources ranging from documents to browser history on local machines. Compatible with popular AI frameworks and operating systems including Linux, macOS, and Windows, LEANN brings advanced semantic search capabilities closer to everyday developer workflows.
