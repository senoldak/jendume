---
lang: en
title: "Windows 11 PCs will run AI models by linking together via USB4"
description: "Microsoft aims to run large AI models that exceed a single computer's capacity by distributing them across multiple Windows 11 devices connected via USB4 cables."
category: teknoloji
date: 2026-11-21T17:50:54.453Z
esId: "windows-11-bilgisayarlari-usb4-uzerinden-birleserek-yapay-zeka-modellerini-calis"
bolge: "Global"
perspektif: "This development could allow users to run more powerful AI models by pooling existing computer resources, potentially reducing the need for expensive high-end hardware."
why_matters: "It enables users to run more powerful AI models by pooling existing devices, potentially lowering hardware costs."
key_points:
  - "Distributed AI execution via RDMA over USB4"
  - "Currently being tested in the Windows Insider program"
  - "Latency reduced to one-fourth compared to Ethernet/UDP"
rakamlar:
  - etiket: "Round-trip time"
    deger: "28-50 microseconds"
  - etiket: "Latency improvement"
    deger: "Approximately 4x"
kaynakIzi: "v1.JsnIzVKRH50WeG3I.AlVr2y4MMwzOPVSlJfqv+mxS/EP10wqPLMXrh5O61mJ7tLgujTT4yYdyJWZuahsRxMS/N7+Hmi/jw5GYg8pVYXd0CepwIrcXJZ/UtDMQpMoGhMiRt/wiR0oL4yVvEypx5o4oKOhC1+VLlP5m14tRmxnViQ=="
kaynakAdlari:
  - ad: "Teknoblog"
    url: "https://www.teknoblog.com/windows-11-model-yukunu-usb4-ile-paylasacak/"
haberDegeri: 78
featured: false
breaking: false
draft: false
---

Microsoft is developing a new method to overcome the hardware limitations of running AI models. The company is enabling the execution of large AI models that exceed the memory or processing power of a single computer by distributing them across multiple Windows 11 PCs connected via USB4 cables. This technology leverages RDMA (Remote Direct Memory Access) support over USB4, allowing computers to communicate directly and rapidly with one another.

This development could allow users or organizations without high-end hardware to combine their existing devices to run larger and more complex AI models. The system works by splitting the model into parts and distributing these segments across the memory and graphics processing units of different machines. The computers then collaborate by exchanging intermediate results for every unit of text generated.

To test this system, Microsoft developed a sample application based on the open-source llama.cpp software. In initial measurements conducted by the company, the round-trip time for small messages ranged between 28 and 50 microseconds. This performance reduces latency to approximately one-fourth of that observed in Ethernet trials using UDP over the same connection.

Currently in the experimental phase, this feature is being tested within the "Future Platforms" build of the Windows Insider program. Microsoft has not yet provided a date for when this feature will be available for general use. However, this step holds the potential to lower the hardware costs required to run AI models and utilize existing computer resources more efficiently. Connection speed and latency play a critical role in the success of such distributed systems, as the speed at which data is transferred between machines directly impacts the overall performance of the model.
