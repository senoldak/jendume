---
lang: en
title: "Baidu launches Unlimited OCR 2 for parsing hundred-page documents"
description: "Baidu has launched Unlimited OCR 2, an open-source vision-language model designed to parse books and long reports of hundreds of pages in a single request."
category: teknoloji
date: 2026-10-27T07:50:56.978Z
esId: "baidu-yuzlerce-sayfalik-belgeleri-isleyen-unlimited-ocr-2-modelini-cikardi"
bolge: "Asia"
perspektif: "This open-source model transforms how massive documents are processed, enabling fast and structured extraction of text, tables, and formulas from hundreds of pages at once."
why_matters: "Efficiently parsing hundreds of pages in a single request greatly accelerates document analysis and automated data processing across industries."
key_points:
  - "3.34B parameter open-source OCR model"
  - "Scores 77.1 on MarathonDocBench"
  - "Released under the MIT license on GitHub"
rakamlar:
  - etiket: "Parameters"
    deger: "3.34B"
  - etiket: "Benchmark score"
    deger: "77.1"
kaynakIzi: "v1.bH4VNVz0sLd+Cb3f.Rdfu+eWPe3oxyNYw8NYjQxAzAdHCXAXtm7mZuLv4ThHZiPNEBDfa7JR4/xoMEelm/mn2+LALWD5P1ZeRlW2+pCc9IV6hAMte1yfjfzbpGKOkkN95yzaB11G3BSl2gQe3u/FlFStOnxpE3g/Tg3a0/yS99F8X5+ipCM32x9/0cMvvkXfC4AY9MP98k/o="
featured: false
breaking: false
draft: false
---

Baidu has introduced Unlimited OCR 2, a new open-source model built specifically for parsing extremely long documents. The system is capable of transforming hundreds of pages of books, filings, and reports into structured text, tables, formulas, and figures within a single request. Operating as a 3.34 billion parameter vision-language model, it turns ordered page images into structured data efficiently.

The core innovation behind the model is SR-SWA, a sparse attention scheme that keeps decoding costs and memory consumption nearly flat as document length grows. While full attention cost grows quadratically with sequence length, this sparse reference sliding window attention compresses text-visual attention into a fixed set of working references. The model weights are released under the MIT license and available on GitHub for developers and researchers.

Technically, the model features 3.34 billion parameters and supports a maximum position length of 131,072 tokens. It can run on a single CUDA GPU in BF16 format, with weights totaling about 6.7 gigabytes. Baidu tested the system using an NVIDIA A800-80GB hardware setup, and the model can be served using Transformers or SGLang.

According to benchmark charts provided by Baidu, Unlimited OCR 2 achieves strong performance on multi-page evaluations, scoring 77.1 on the MarathonDocBench test for hundreds of pages. It successfully extracts text, formulas, reading order, and tables while maintaining cross-page context, with heading hierarchy scoring 48.2 as its lowest sub-score.

This release marks a significant step forward in long-context document parsing for open-source AI models, offering powerful tools for automated data extraction and analysis.
