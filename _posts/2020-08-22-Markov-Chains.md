---
layout: post
title: Introduction to Markov Chains
image: 
excerpt_separator: <!--more-->
---
Markov chains are fairly simple to understand and the concept is easy to understand. They're used in many different applicaitons such as in finance, statistical modeling, and queueing theory. A famous examnples is in its implemenation in Google's page ranking algorithm, PageRank.

Here is a scenario, outside there are only two different temperatures, hot and cold. You want to be able to predict the temperature outside. What we may know is that if one day is cold, it relates to what tomorrow's temperature will be. This is esestially what a Markov Chain attempts to capture. The probablility of staying in the same state and transitioning to the next.

Let's add more information. We observe that there's a 60% chance of it staying cold and a 50% chance of it staying hot. We can then get the tranisiton probablilites by subtracting one.

![Markov Chain Example](/assets/images/blog-images/Markov-Chain-Example.png)
<img src="/assets/images/blog-images/Markov-Chain-Example.png" width="50">

<!--more-->
