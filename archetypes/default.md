---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
slug: "{{ lower .Name }}"
author: {{ .Site.Params.author }}
---

