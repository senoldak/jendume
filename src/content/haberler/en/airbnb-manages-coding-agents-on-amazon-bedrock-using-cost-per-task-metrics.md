---
lang: en
title: "Airbnb manages coding agents on Amazon Bedrock using cost-per-task metrics"
description: "Airbnb implements a cost-per-task evaluation system on Amazon Bedrock to optimize AI coding agents used by its engineers."
category: teknoloji
date: 2026-11-19T07:50:52.701Z
esId: "airbnb-yazilim-ajanlarini-amazon-bedrock-uzerinde-maliyet-odakli-yonetiyor"
bolge: "Global"
perspektif: "As AI coding agents scale in production, balancing model costs and performance becomes critical. This approach helps companies efficiently manage their AI infrastructure budgets."
why_matters: "The adoption of AI coding agents requires robust cost and performance tracking to ensure sustainable enterprise integration."
key_points:
  - "Airbnb runs coding agents for thousands of engineers via Amazon Bedrock."
  - "The company uses cost-per-task metrics to evaluate model efficiency before rollout."
  - "Production performance is monitored using CloudWatch metrics."
kaynakIzi: "v1.A2A8XtXK/30aOBf7.I4HFKHtm4yBj0zCwHEcUIeTebzQ2eunBxikHobuwF+B+tJFOLQNjCrjYAZutQvjQd8joeuedapeo10HANETCMbEH9BW159qgy/AelOTye3miUucbOJ9X6Bj33bqKEeXV+OdE3Yzg6r+rjSE7H70JeK+RQA0YkW8+6hE5tQ6YSojuyqTPOiVte62k4PZBulpy6ALnWZp7mZH1Udt/SUMafdNqFJUM+v1N6TLI1OgWilgUE3tz"
kaynaklar:
  - ad: "AWS Machine Learning Blog"
    url: "https://aws.amazon.com/blogs/machine-learning/how-airbnb-uses-cost-per-task-to-operate-coding-agents-on-amazon-bedrock/"
haberDegeri: 75
featured: false
breaking: false
draft: false
---

As AI coding agents become integral to software development, managing model selection, latency, and costs is a growing priority for engineering teams. Airbnb announced that thousands of its engineers use AirChat, an internal tool powered by Amazon Bedrock, to run coding agents every week. With numerous new foundation models launching in a short span, the company faced the challenge of tracking how these models handle real engineering work.

Because public benchmark charts do not capture how models perform on specific internal tasks, Airbnb runs evaluation systems side by side. Before rolling out a model, the team measures its score and cost per task, which calculates the list-price cost of all tokens an agent consumes to complete a single task. This metric allows the company to establish effective model defaults and usage limits.

Once in production, the system monitors runtime signals such as latency, throttling, and token consumption using Amazon CloudWatch. When production usage diverges from pre-rollout evaluations, the team investigates the root cause and adjusts model configurations accordingly.

This operational framework demonstrates how enterprises can maintain cost efficiency while integrating advanced AI models into daily workflows. As AI tools reshape software engineering, structured evaluation methods are becoming essential for sustainable deployment.
