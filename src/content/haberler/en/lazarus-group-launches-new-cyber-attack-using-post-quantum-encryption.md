---
lang: en
title: "Lazarus group launches new cyber attack using post quantum encryption"
description: "The Lazarus cyber espionage group has launched a new wave of attacks featuring AI generated fake sites and post quantum encryption mechanisms."
category: teknoloji
date: 2026-10-23T11:51:02.167Z
esId: "lazarus-grubu-kuantum-sonrasi-sifreleme-kullanan-yeni-siber-saldiri-baslatti"
bolge: "Global"
perspektif: "The weaponization of artificial intelligence and advanced encryption methods by threat actors highlights the increasing complexity of future cybersecurity threats."
why_matters: "The weaponization of artificial intelligence and advanced encryption methods by threat actors highlights the increasing complexity of future cybersecurity threats."
key_points:
  - "An AI generated portrait was used on a fake GitHub Pages site launched in September 2025."
  - "Two new tools named TouchHub and ClientHub were deployed in the attacks."
  - "The updated LPEClient tool utilizes the ML-KEM-1024 post-quantum encryption mechanism."
rakamlar:
  - etiket: "Launch date"
    deger: "September 2025"
  - etiket: "Encryption mechanism"
    deger: "ML-KEM-1024"
kaynakIzi: "v1.psF16p7BbtC6gfIx.8jheamcOMDDCJkGUojEymuim4nrQXiuWYsFaLsWX+h5LDHbBicSTNhMe2uQaBr67fyrQV7Jpx27YQH8sm5i/wixWBnwWpGtdE/SDna2siJ1pqVQ8wUdgZry3r0eWs6hHmxQ5O33LLyESpqbubuWb26e0f6hyVAVwMS/snZ32"
featured: false
breaking: false
draft: false
---

Researchers have revealed that the Lazarus group launched a new cyber attack wave linked to the Operation SyncHole campaign. The detailed research shows that threat actors have improved their tools and techniques over time to make the operation much more persistent and advanced. Within the scope of the campaign, a GitHub Pages website opened in September 2025 hosting a fake resume site was discovered. The artificial intelligence generated portrait photo on the page proved that attackers utilized advanced technology while customizing sites for targets.

The attack is initiated via targeted phishing emails sent to targets containing links leading to portfolio and resume sites customized for specific individuals. Research findings indicate that visiting the malicious site has a high probability of triggering an infection chain through CrossWeb EX, a security plugin and web authentication software widely used in South Korea. Accordingly, it is evaluated that the attack activity was carried out by exploiting a potential vulnerability in the CrossWeb EX software, providing attackers with their initial entry point. Security notifications confirming vulnerabilities in this financial security software had also been published previously.

Attackers blended current versions of their existing malware with two previously undocumented new tools named TouchHub and ClientHub. These components, whose ultimate goal is cyber espionage, load additional malware onto targeted computers, execute commands, and maintain communication with attackers. One of the new tools also features a variant that utilizes the Dropbox platform to communicate with its operators. Additionally, an updated version of the LPEClient tool, which the Lazarus group has used for a long time to gather information about compromised computers and deploy additional malware, was also detected in the campaign.

The updated LPEClient tool collects detailed information about security software installed on systems, Windows security protections, and other system features. It then compresses and encrypts this data to send it back to the attackers. This new version also utilizes ML-KEM-1024, a post-quantum cryptographic mechanism designed to protect communications against potential attacks that future quantum computers might perform. The tool leverages this mechanism to establish an encrypted connection with the attackers' server before downloading additional malware and executing it directly in memory. To avoid detection, it attempts to bypass security monitoring mechanisms by modifying memory protection settings and disabling monitoring hooks used by security tools.
