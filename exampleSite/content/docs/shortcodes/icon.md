---
title: "Icon"
author: "Houmin"
date: "2022-12-04"
type: book
tags: ["icon", "short code", "hugo"]
---

Simple shortcode to include icons from SVG sprites outside of menus.

<!-- prettier-ignore-start -->
```tpl
{{</* icon "github" */>}}
```
<!-- prettier-ignore-end -->

## Usage

|           Result            |               Usage               |          Result           |               Usage               |
|:---------------------------:|:---------------------------------:|:-------------------------:|:---------------------------------:|
|    {{< icon "weibo" >}}     |    `{{</* icon "weibo" */>}}`     | {{< icon "github-alt" >}} |  `{{</* icon "github-alt" */>}}`  |
|    {{< icon "weixin" >}}    |    `{{</* icon "weixin" */>}}`    |   {{< icon "github" >}}   |    `{{</* icon "github */>}}`     |
|    {{< icon "alipay" >}}    |    `{{</* icon "alipay" */>}}`    |  {{< icon "twitter" >}}   |   `{{</* icon "twitter" */>}}`    |
|   {{< icon "facebook" >}}   |   `{{</* icon "facebook" */>}}`   |  {{< icon "linkedin" >}}  |   `{{</* icon "linkedin" */>}}`   |