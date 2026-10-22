---
lang: en
title: "Meta pauses Muse chat sharing feature following privacy and security exposure"
description: "Meta has temporarily disabled the conversation-sharing feature of its recently launched Muse agentic AI platform after researchers uncovered a major privacy vulnerability."
category: yapay-zeka
date: 2026-10-20T21:50:54.756Z
bolge: "Global"
perspektif: "This incident highlights the growing privacy and security challenges as agentic AI tools become more integrated into personal and business workflows."
why_matters: "As AI agents handle increasingly sensitive personal and business data, ensuring robust privacy safeguards against simple discovery flaws is vital for maintaining user trust."
key_points:
  - "Researchers accessed 6,800 shared Muse chat conversations."
  - "Passive DNS searches exposed URLs because they used conversation titles as subdomains."
  - "Meta paused the sharing feature to review and modify link discovery."
rakamlar:
  - etiket: "Shared chats"
    deger: "6,800"
kaynakIzi: "v1.QY9pC4c5Fd3nv3u2.AFaeum9H61ZiEOiChQSs7UIxsONtUfIuFpb9sz/VRwzhqWaHwnWAvbQZ0Yi7sxHNO1s5trlIRdR/V523aFExpL17PAxci5EvJeAgMvV5qY11q1VziwDXpdrrmH2/9N0tAOcknahM5UzM4uBh6e2y60QLx7EG/wr7MPjifSAmFriQ6exQ8ELrnp1RVI0roSqY3HtJMlmUa3BcpMwM"
featured: false
breaking: false
draft: false
---

Meta has paused the conversation-sharing functionality of its Muse agentic AI platform, which debuted recently, following the discovery of a significant privacy flaw by security researchers at firm Claroc. The investigation revealed that user-shared Muse chat links could be discovered and accessed through passive DNS searches because the URLs used conversation titles in their subdomains and were recorded publicly in domain name resolution systems, functioning essentially like a telephone book for the internet.

The researchers successfully enumerated 6,800 links for shared Muse chats, exposing private information from both personal and business applications. The compromised data included meeting times with a frontier AI lab, small-business loan applications, bank fraud alerts containing partial account details, internal company documents such as vacation calendars, and various operational files. This vulnerability demonstrated how easily sensitive operational details could be exposed through seemingly minor implementation oversights in agentic AI platforms, creating significant risks for both individual users and enterprises.

Following reports detailing these findings, Meta stated that it had paused the functionality while reviewing the report and considering changes to how these links can be discovered. Claroc later noted that a sampling of the previously accessed links could no longer be opened following Meta's software update and intervention. The event underscores the critical need for robust data protection measures as companies deploy advanced artificial intelligence agents to the public, ensuring that fundamental privacy controls are thoroughly tested before deployment.
