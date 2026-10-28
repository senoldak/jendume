---
lang: en
title: "Cisco open-sources Project Quarry to monitor autonomous AI agent behaviors"
description: "Cisco has released Project Quarry, an open-source engine designed to detect malicious AI agent activities and prevent data breaches in real-time."
category: teknoloji
date: 2026-10-28T13:51:34.689Z
esId: "cisco-yapay-zeka-ajanlarini-denetleyen-project-quarry-aracini-acik-kaynakli-yapt"
bolge: "Global"
perspektif: "As AI agents gain more autonomy, ensuring they don't go rogue or get exploited by hackers is vital. This tool provides a standardized way to audit and secure our digital assistants."
why_matters: "With the rise of autonomous AI agents, standardized auditing mechanisms are essential to prevent these systems from being weaponized in cyberattacks."
key_points:
  - "Project Quarry analyzes the full session context of AI agents instead of isolated actions."
  - "The tool uses a Snort and YARA-like rule structure for standardized security monitoring."
  - "It is designed to detect suspicious data transfers and unauthorized server access in real-time."
kaynakIzi: "v1.LuNSVvVEH46QOI8/.TryVRUjSODlVepsGMGO4toGLbP4XtXnOwCLwTs2CSoElK26Zy4hOgLqXY69p1FJOro4ebdlpnNyUMWu59m8Z45RR/Q3uOHAJWuBesAk+ycsk/FbX0ULDq0gpGfsZYhX6irDYJgp1dDqNE5ODQwfKus98tqAYwYr4ccxmNhguVGz2Zd0WIVw3CESuInc="
featured: false
breaking: false
draft: false
---

Cisco has launched Project Quarry, an open-source engine developed to monitor the behavior of AI agents and detect potential cyber threats. This new technology aims to provide security teams with a critical tool to prevent malicious or out-of-control AI agents, similar to incidents observed in attacks on platforms like Hugging Face. Cisco's security research leadership emphasizes that the system focuses on the entire session context of an agent rather than isolated transactions, allowing for a more holistic evaluation of cyber threats.

Traditional security tools often focus on individual interactions with AI models, such as checking for prompt injections or specific tool calls. However, Cisco argues that this approach is insufficient for autonomous agents. Drawing a parallel to credit card fraud detection, the company explains that a small test transaction might appear innocent on its own, but when followed by a large transfer, it signals fraud. Project Quarry records all steps taken by an agent as a sequence, enabling the immediate detection of suspicious correlations, such as reading a sensitive file and subsequently sending that data to an external server.

Project Quarry utilizes a rule-based structure similar to Snort and YARA, providing security teams with a standardized language to build their defense strategies. Available on GitHub with documentation and sample rules, the platform allows users to create triggers for specific scenarios. For instance, it can automatically block access to servers not on an allowlist or detect malware encoded in base64. This flexible architecture is specifically designed to secure complex operations conducted via the Model Context Protocol (MCP).

By adopting an open-source model, Cisco aims to foster industry-wide collaboration against emerging AI threats. Researchers highlight that while Project Quarry is not a replacement for human oversight or chain-of-thought monitoring, it provides a shared foundation for teams to audit and test their own agents. The goal is to build a collective defense line where different security teams can share the threats they encounter, ultimately strengthening the overall security posture of the AI ecosystem.
