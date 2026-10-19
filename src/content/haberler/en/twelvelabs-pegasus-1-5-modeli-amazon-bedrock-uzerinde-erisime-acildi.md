---
lang: en
title: "TwelveLabs Pegasus 1.5 model is now available on Amazon Bedrock"
description: "TwelveLabs has released its video language model, Pegasus 1.5, on the Amazon Bedrock platform to enhance long-form video analysis and structured data extraction."
category: teknoloji
date: 2026-10-19T17:50:57.903Z
bolge: "Global"
perspektif: "This development streamlines video analytics by allowing users to extract structured metadata and timestamps from long-form videos within seconds, transforming how organizations process visual data."
why_matters: "It simplifies structured data extraction from video content, making AI-driven media analysis and search processes much more efficient."
key_points:
  - "Analyzes videos up to two hours long in a single request"
  - "Direct Amazon S3 integration without pre-indexing steps"
  - "Timestamped metadata and structured JSON output generation"
rakamlar:
  - etiket: "Processing capacity"
    deger: "2 hours"
kaynakIzi: "v1.090kgB0Dhf/m+nL4.5XqjJBg0hGbMcHKOgPXFANChpfAVV0xSkRL59PYiiF/5kWIamk0Cm97rvxshFyiNYXOB7PkSudU2u76vvSdeTx24q+WtCjgTGrnLmVI8e2wcaSRyHqPz5cZKBAM5rM1yU1WcQ0JlIOrj7lhjb2p92E4pMtA0gyX1dF8XiTiEHmr+Q8gmPP61tStus1hZPhlHBESWuO9rXRZflJ4ylFXODcdRoPCWMqwNAZc="
featured: false
breaking: false
draft: false
---

TwelveLabs has launched its video language model, Pegasus 1.5, on Amazon Bedrock. The new model stands out for its advanced ability to transform long-form videos into structured, timestamped metadata. Users can define specific workflow moments to retrieve matching segments in JSON format. Without requiring pre-indexing steps or ingestion pipelines, the system allows videos to be processed directly from Amazon S3 while keeping data secure within AWS boundaries.

Pegasus 1.5 introduces several key enhancements compared to earlier versions. The model is capable of analyzing videos up to two hours long in a single request. This extended capacity enables users to process lengthy recordings seamlessly. Additionally, the system supports multimodal prompting with reference images alongside text queries, allowing users to detect specific objects, people, or brand appearances with higher precision.

The model performs time-based metadata generation for use cases such as editorial segments, sports plays, speaker changes, and brand appearances. Users can send custom segment definitions so the model returns only the matching portions of the video. This structured approach allows downstream applications to parse the data directly without manual review bottlenecks.

Leveraging flexible API endpoints and integration options, developers can call the model directly from their applications. Teams operating within AWS can track costs by application using dedicated inference profiles. Ultimately, Pegasus 1.5 automates complex video understanding tasks, making unstructured visual data searchable, actionable, and efficiently manageable at scale.
