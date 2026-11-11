---
lang: en
title: "Kubernetes provides a secure foundation for AI agents"
description: "Broadcom has announced new open-source initiatives to ensure AI agents run securely and portably across different cloud environments."
category: teknoloji
date: 2026-11-11T17:50:49.675Z
esId: "kubernetes-artik-yapay-zeka-ajanlari-icin-guvenli-bir-temel-sunuyor"
bolge: "Global"
perspektif: "As AI agents become more complex, the security and portability of their underlying infrastructure become critical; this move simplifies the adoption of enterprise AI applications."
why_matters: "Standardizing and securing the infrastructure for AI agents allows companies to adopt these technologies with greater confidence."
key_points:
  - "Secure and portable infrastructure for AI agents"
  - "Defense-in-depth via vDefend and vSphere Pods"
  - "Donation of VM API project to CNCF"
kaynakIzi: "v1.MalHdqyKxe0Ff9iK.cCC4+GHDTBkYm8oMSpheb4CEIgE5jobg5/8E5JK2YVUYAbbNiYxjrHCzr5RcG0sOCprP4fnRw47M8H6zZB1Es47co2j12SjRr4ws16Gdd3zCgmAaeXN1HMh9Pg/9KeO6Zee5ZwdhQdnWNNa0BgN3jn3to56FGoC2"
kaynakAdlari:
  - ad: "TechInside"
    url: "https://www.techinside.com/kubernetes-yapay-zeka-ajanlari-broadcom-kubecon"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

Kubernetes has long been known as the container management hub of the software world. However, with the rise of AI agents, this platform has evolved beyond a simple orchestrator into a foundational infrastructure layer upon which AI workloads are built. At the recent KubeCon event, Broadcom announced two significant open-source initiatives to support this transformation. The company's primary goal is to ensure that AI agents can operate both securely and portably across diverse cloud environments.

On the security front, Broadcom is adopting a "defense-in-depth" approach. This strategy begins with the vDefend firewall, which protects the network perimeter, and extends to tighter isolation within the system. To mitigate risks from potentially rogue agents, the company utilizes vSphere Pods, which are small-scale virtual machines (micro VMs). This isolation ensures that agents operate within a secure, contained environment.

Portability is the other key focus for Broadcom. The company is co-chairing a new working group dedicated to Kubernetes workload compatibility. The objective is to eliminate the burden on software developers to perform separate validations for every different cloud distribution. To support this vision, Broadcom donated its VM API project to the Cloud Native Computing Foundation (CNCF), which integrates virtual machines as first-class components within Kubernetes.

These developments are seen as critical steps toward ensuring that AI agents operate more stably and securely in enterprise environments. By providing a standardized structure wherever Kubernetes runs, the initiative aims to significantly reduce the compatibility challenges companies face when scaling their AI projects.
