---
lang: en
title: "Linus Torvalds begins using AI to develop Linux kernel code"
description: "Linux creator Linus Torvalds has released his first patch series written with AI assistance to address memory cache bottlenecks."
category: teknoloji
date: 2026-10-17T09:50:58.218Z
bolge: "Global"
perspektif: "The adoption of AI coding tools by one of the most influential figures in software development marks a major turning point for engineering standards and developer workflows."
why_matters: "Linus Torvalds using AI to write Linux kernel code signals a historic turning point, proving that AI assistants are now capable of contributing to the world's most critical software."
key_points:
  - "Eight-thread throughput increased to 33 million reads per second."
  - "Kernel cycles per read dropped from 2,950 to 725."
  - "The patches were developed using Anthropic's Claude Code."
kaynakIzi: "v1.246BNLFo46XFP1iy.QL+A/z+cgCswGSOG+k/IY2kAGDLly/79rBZJ3FWgyGjrqNVrRXeaEFFsX5FGTlSxwzuJpPWpyNKP0m+bVw1iOGm13A9kuh+EAsFmS9xQOdRwTHTxg2xYXuIcryZOuI8nRzKJjprWS7gJhcnoqtR/0Hv7F9MFeMOhJWlEy2YmcsE="
featured: false
breaking: true
draft: false
---

In a milestone development for the software community, Linux creator Linus Torvalds announced that he has used an AI coding assistant to write code for the Linux kernel for the first time. Torvalds published an eight-patch series developed under his direction using Anthropic's Claude Code tool, aimed at resolving a memory cache slowdown issue that occurs when using multiple cores and processors.

The issue stems from contention in Linux's page cache, where multiple threads repeatedly reading small amounts of data from the same cached file force processor cores to compete over a shared cache line, slowing down workloads significantly. The patches proposed by Torvalds and Claude Code change when the kernel can reuse memory removed from the page cache by deferring reuse until a read-copy-update grace period has elapsed, avoiding repeated updates to shared reference counters.

Preliminary benchmark results show substantial performance gains for the specific test workload. Eight-thread throughput rose from approximately 10 million reads per second to between 30 and 33 million, while kernel cycles per read dropped from roughly 2,950 to 725. Despite these gains, engineering trade-offs regarding memory reclamation and minor regressions mean the code remains experimental and has not yet been merged into the mainline Linux kernel.

Torvalds's embrace of AI coding reflects a long-term evolution in his stance, having transitioned from a skeptical observer to a strong advocate of AI as a development tool. As the foremost open-source maintainer begins incorporating AI into critical kernel development, the broader software industry faces a profound shift in how complex programs are built and maintained.
