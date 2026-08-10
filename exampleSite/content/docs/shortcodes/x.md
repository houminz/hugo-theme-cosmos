---
author: "Houmin"
title: "X (Twitter)"
date: "2022-12-04"
lastmod: "2026-08-10"
type: book
tags: ["x", "twitter", "short code", "hugo"]
aliases: ["/docs/shortcodes/twitter/"]
---

嵌入一条 X（原 Twitter）帖子。参数与 Hugo 官方 [`x` shortcode](https://gohugo.io/shortcodes/x/) 一致。

```html
{{</* x user="SanDiegoZoo" id="1453110110599868418" */>}}
{{</* x SanDiegoZoo 1453110110599868418 */>}}
{{</* x 1453110110599868418 */>}}
```

`user` 可以省略——`x.com/i/status/<id>` 对任意帖子都能解析，但带上更利于阅读源码。

{{< x user="SanDiegoZoo" id="1453110110599868418" >}}

## 为什么主题里自带一份

Hugo 在 **v0.141.0** 才把内置 shortcode 从 `twitter` 改名为 `x`，本主题要兼容更早的 Hugo，所以自带一份同名实现。内容按官方参数写，将来升级 Hugo 不用改正文。

和内置版本的区别：

- **取不到就降级，不中断构建。** 帖子被删、限流、离线构建这些情况下，内置版本会让整个站点构建失败；这份实现会退回成一条普通永久链接并打一条 WARN。
- **`widgets.js` 每页只注入一次**，不是每条帖子一次。

## 图片与附件

默认渲染完整卡片，配图、视频、引用帖和链接预览都会出来。

这一点没得选：oEmbed 只返回帖子正文加一条 `pic.twitter.com/…` 链接，**附件本身只存在于 X 的 widget 里**，所以要图片就必须加载 `widgets.js`。

好在降级路径是天然的——输出的 `blockquote` 是真实markup，读者若屏蔽了 `platform.twitter.com`，看到的仍是帖子正文和一条链接，不是一块空白。

## 纯文本模式

不需要图片、或者一页要引很多条时，用 `simple="true"` 关掉 JS：

```html
{{</* x user="ClaudeDevs" id="2085794862608318627" simple="true" */>}}
```

想让整站默认走纯文本，在站点配置里设 `params.xSimple = true`，再按需用 `simple="false"` 单条开回来。

## 旧写法

`{{</* twitter */>}}` 和 `{{</* twitter_simple */>}}` 是 Hugo v0.141.0 之前的内置 shortcode，已被官方废弃，新内容一律用 `x`。
