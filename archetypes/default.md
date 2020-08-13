---
title: "{{ replace .Name "-" " " | title }}"
fulltitle: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
slug: "{{ lower .Name }}"
banner: "/images/rainier1.jpg"
author: {{ .Site.Params.author }}
summary: ""
---

