---
lang: en
title: "Solar panel cleaning robots improve navigation with artificial intelligence"
description: "Researchers have developed a new dataset to enhance the AI models that guide panel cleaning robots through heavy dirt and glare."
category: teknoloji
date: 2026-10-17T09:50:58.218Z
bolge: "Global"
perspektif: "Automating cleaning processes in solar power plants increases renewable energy efficiency and lowers maintenance costs."
why_matters: "AI-powered autonomous cleaning robots enhance the efficiency of solar panels, supporting the broader adoption of renewable energy."
key_points:
  - "A new dataset comprising 6,200 images was created for training."
  - "Image resolutions were optimized to 160 by 120 pixels for low-power processors."
  - "Testing included 200 real-world images from physically soiled panels."
kaynakIzi: "v1.FP2eB2opGY0Rm8EL.DXMbEUFkJYUo92yGqlu6qlCM5h8HLiZMUG3QsYuN/Bc3o91575wnuOMze5axJELBViXsR9JVOHa1tmOw0nNnkAO046bctNTa+UxjvVM/VrANcpyb7FJDRZpv+q5FEPNQAKyvga1jFvqG5b4vabMYgxcTaAfL/nV4ikhso2bBRITybDa5M6BHXLwo84v68HzEWg=="
featured: false
breaking: false
draft: false
---

Solar panel cleaning robots determine their movement directions by analyzing images captured from their onboard cameras. However, heavy surface dirt and light reflections make it difficult to detect panel lines, reducing cleaning performance. To address this challenge, researchers conducted a study focused on improving the navigation capabilities of cleaning robots. The team utilized an HF868-2 camera to record footage at 60 frames per second with a resolution of 320 by 240 pixels.

The images were downscaled to 160 by 120 pixels to ensure they could be analyzed using the limited processing power available on the robots. To build the dataset, 800 clean panel images were labeled, and five different contamination levels were artificially simulated. Accounting for effects such as bird droppings, water stains, and glare, a comprehensive dataset consisting of 6,200 images was compiled. Out of these, 4,800 images were allocated for training and validation purposes.

During the testing phase, 1,200 images covering six simulated conditions were used, alongside 200 real images obtained from physically soiled panels in a laboratory setting. This allowed researchers to evaluate how well the AI models perform outside of simulations.

The next objective for the researchers is to move beyond the dataset and enable cleaning robots to operate more autonomously and reliably. The team is currently working on combining camera data with wheel encoders and inertial measurement units to improve location tracking.
