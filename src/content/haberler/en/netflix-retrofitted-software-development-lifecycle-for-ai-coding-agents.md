---
lang: en
title: "Netflix retrofitted software development lifecycle for AI coding agents"
description: "Netflix engineers updated their software development lifecycle to allow AI coding agents like Claude Code to ship code safely alongside humans."
category: teknoloji
date: 2026-11-23T19:50:53.758Z
esId: "netflix-yazilim-gelistirme-sureclerini-yapay-zeka-kodlama-ajanlarina-uyarladi"
bolge: "USA"
perspektif: "This development shows how documentation and context engineering help safely integrate AI coding agents into enterprise software development."
why_matters: "It demonstrates how rigorous context engineering and documentation enable AI coding agents to contribute effectively to large-scale production environments."
key_points:
  - "Zero Level 1 incidents on a core service"
  - "32 percent increase in pull requests year over year"
  - "Developer Net Promoter Score rose from -3 to +25"
rakamlar:
  - etiket: "Pull requests increase"
    deger: "32%"
  - etiket: "Developer NPS"
    deger: "-3 to +25"
kaynakIzi: "v1.o2iIJUByjTBddXGv.054T0frLJ+uO/srcrLPy+CZUwLOJuw2TyQFOE2DBbej7CCEuI02yErNCZ6lSidNc3ScqzX/dY2CkrizgflN2Dp1RsiHxzHdOld+BXI4D1tuCKwf85j126eI7KzQNeQLw+PAnmZHL3D9Nj84hIjlpkNDQUv1kotd8INUBID2CmQ68koz1NrSZIUMpScEsr1cih5WNj9m3KPps0Bciz1ufrKvphd5PgNJChp64AiiCKA+mKwDFBJjmpUHJoO5tl4YhEe9xQ65l9Jy1AXcXOdSYWQ=="
kaynakAdlari:
  - ad: "InfoQ"
    url: "https://www.infoq.com/news/2026/11/netflix-sdlc-ai-coding-agents/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering"
haberDegeri: 85
featured: false
breaking: false
draft: false
---

At a conference in San Francisco, Netflix senior software engineer Mark Khuzam detailed how the company's Commerce team retrofitted its software development lifecycle to accommodate AI coding agents. Khuzam explained that the effort was primarily focused on documentation, consistency, and code review rather than the agents themselves. Initial attempts showed that agents struggled with tasks because documentation was scattered and inconsistent, causing context windows to run out.

To solve this, the team adopted context engineering, writing 45 architecture decision records tailored for both humans and agents. They introduced an AGENTS.md file to help agents find instructions quickly. Furthermore, they integrated a review agent into the CI pipeline to check pull requests against documentation and flag anti-patterns before human engineers finalize the code.

These changes resulted in a 32 percent year-over-year increase in pull requests while maintaining zero Level 1 incidents on a core service throughout the year. The developer Net Promoter Score rose from minus three to plus twenty-five across three quarters. To maintain consistent context across different tools and agents, the team implemented domain-specific GraphRAG models.

Khuzam concluded with three core rules: decide what agents should do, make instructions easy to find, and remember that human judgment remains essential.
