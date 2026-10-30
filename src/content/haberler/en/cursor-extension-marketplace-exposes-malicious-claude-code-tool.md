---
lang: en
title: "Cursor extension marketplace exposes malicious Claude Code tool"
description: "A tampered version of the Claude Code extension was briefly available on Cursor, attempting to harvest data and establish remote access."
category: teknoloji
date: 2026-10-30T19:51:35.637Z
esId: "cursor-eklenti-magazasinda-sahte-claude-code-yazilimi-veri-sizdirmaya-calisti"
bolge: "Global"
perspektif: "As AI coding assistants become deeply integrated into software development, securing their extension ecosystems is critical to preventing high-impact breaches."
why_matters: "The incident demonstrates how trusted AI developer tools can be exploited as a vehicle for malware, expanding the security threat landscape for sensitive enterprise codebases."
key_points:
  - "Compromised extension available for 11 hours"
  - "Affected up to 5,000 users"
  - "Marketplace temporarily taken offline to neutralize threat"
rakamlar:
  - etiket: "Duration"
    deger: "11 hours"
  - etiket: "Users affected"
    deger: "5,000"
kaynakIzi: "v1.rl22TnEVzO97CyTr.an0kBcQLgKs8jGYrfEQ3TpysLM+AJIoHrAHY8drK8YHIY7kko3rA/SBTZVbTnkzvWtD5aqbOyeVl4aSd0UzrNKzD7VJ3TD0gVgc2YWB4ACzYgr4O3wM+yrImPwljWdm5t7CFnCCpV6SH64eOCmQTPJiYyKmMauzQ/achWBb+DpMFoQBG4pAx4xUnYaiKbZJFhtjI5OzXLHo0Nih48YJ0dktEtCQp+/ycckKSEYeL5SsqIOHT2HRx98B+jw4JyF/xKqTYySdC9xbFbABqzYHYz/YXQ/vz9+xscHni345Ce3jMCK9T+IfnMjoFdZHPAqQWK/JSIqcloGq3L4HjokgyAUIsPtmQx4DcLcSR6bp7X2MHJuwdcUP5NHSdoAs4yB4hreOnanLXQJtiSS2vspOkPuK7L18ajY6l3DgAtHwWiV1sM3+8FZvOUUPu9l18fi3W2VdmjFu8roKCrfVUH+IpNKpQlacsSoVXk8tSejQvEAhvDCUpj1xtIHxoya+R03tezVm1cVs0/4PFYqYtmklh/QSfGwcRLELkgZ46+d41K/o3ImBgXXjw5WoYkB0YSuU="
featured: false
breaking: false
draft: false
---

A compromised version of the Claude Code extension was discovered on the Cursor VS Code extension marketplace, remaining accessible to users for approximately eleven hours. The unauthorized software, which was developed without Anthropic's involvement, attempted to gather basic computer information such as usernames, operating systems, and public IP addresses from developers who installed it.

In addition to data harvesting, the malicious script attempted to establish a persistent backdoor using Secure Shell to enable remote access for attackers. Security analysts noted that the remote connection mechanism likely failed on most machines due to privilege requirements. Promptly after detecting the breach, Cursor removed the tampered extension, temporarily shut down its marketplace, and worked alongside hosting providers to neutralize the malicious server infrastructure.

Cybersecurity experts emphasize that while the affected user base was relatively small, the targets were software developers possessing access to sensitive source code and proprietary systems. The incident highlights the growing attack surface introduced by third-party extensions within AI developer workflows, prompting renewed calls for rigorous verification standards across software marketplaces. Ensuring robust security checks for all extensions remains a vital step in protecting sensitive software environments from sophisticated cyber threats. Experts note that as developers increasingly adopt AI coding assistants, the integration of third-party tools creates expanded pathways into sensitive systems, requiring heightened vigilance from both platform operators and enterprise security teams.
