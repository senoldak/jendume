---
lang: en
title: "Grok Build coding agent exposes sensitive user data"
description: "The Grok Build coding agent, developed by SpaceXSI, is exposing thousands of user projects and sensitive internal documents due to a critical design flaw."
category: teknoloji
date: 2026-11-10T21:50:53.919Z
esId: "grok-build-kodlama-araci-kullanici-verilerini-sizdiriyor"
bolge: "Global"
perspektif: "The security of AI-powered coding tools is facing a critical test regarding the protection of sensitive user data. This incident demonstrates how simple design flaws can pose significant risks to both corporate and individual privacy."
why_matters: "This development highlights how security vulnerabilities in AI tools can compromise both individual and corporate data."
key_points:
  - "Critical design flaw in Grok Build platform"
  - "Internal confidential data and sales maps exposed"
  - "Thousands of user projects accessible"
rakamlar:
  - etiket: "Apps analyzed"
    deger: "24"
  - etiket: "Sales accounts"
    deger: "594"
kaynakIzi: "v1.8zmtZhmxIE+ni4U6.J0Xf1v/FFltrfRgbvN4WcTGg6PRaFx5NVnJtOUxBrdO5Rp4ONQwHB6RSlLRo6fUtx65gAvPiGJdCqjwmEEDzAirQNykOcBAnaEnEumnvbs/u+7+b1UHagwf/3YGzRr0sLtBe2SHJXQ1VqdcixIT5mFH6OpWId21OkITwivwWr2LkdWLFZduOcSzWJyDEQkiEXGnjnMKdEOTOJ4OstK/TWI4oq79jRKnNzdXoZzkL/pkA"
kaynakAdlari:
  - ad: "Ars Technica"
    url: "https://arstechnica.com/security/2026/11/grok-build-coding-agent-leaks-oodles-of-confidential-info-some-belonging-to-spacexsi/"
haberDegeri: 88
featured: false
breaking: true
draft: false
---

The Grok Build coding agent, marketed as a "vibe-coding" tool by SpaceXSI, is facing a significant data leak. Security research has revealed a critical design flaw in how the platform handles links for sharing user-created applications. While the platform intends for these URLs to be randomized and accessible only to those with the specific link, the implementation allows for easy enumeration. This vulnerability enables unauthorized parties to access thousands of live projects, exposing sensitive data stored within them.

This incident serves as a stark warning regarding the security of AI-powered coding assistants. Users frequently upload sensitive information—ranging from business plans and medical records to personal identifiers—into these environments. When these tools fail to secure such data, it poses a direct threat to both individual privacy and corporate security. Security experts identified that the exposed data includes internal business plans, advertising proposals, medical exam results, and employee ID numbers.

Ironically, the platform's own developer, SpaceXSI, is among those affected. An analysis of 24 apps built by the company revealed confidential onboarding plans, a sales territory map detailing 594 accounts, and internal system addresses for sales tools. As AI-driven software development tools become increasingly popular, such security vulnerabilities heighten concerns about how developers and companies protect their data. This fundamental design error highlights that security measures cannot rely solely on URL randomization; robust, multi-layered protection is essential for any platform handling sensitive user information.
