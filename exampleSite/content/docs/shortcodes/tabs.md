---
title: "Tabs"
author: "Houmin"
date: "2022-12-04"
tags: ["tabs", "short code", "hugo"]
---

Tabs let you organize content by context, for example installation instructions for each supported platform.

<!--more-->

````markdown
{{</* tabs */>}}
{{</* tab "toml" */>}}
```toml
+++
math = true
+++
```
{{</* /tab */>}}
{{</* tab "yaml" */>}}
```yaml
---
math: true
---
```
{{</* /tab */>}}
{{</* /tabs */>}}
````

## Example 1

{{< tabs "uniqueid" >}}
{{< tab "MacOS" >}}
# MacOS

This is tab **MacOS** content.

Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
Miseratus fonte Ditis conubia.
{{< /tab >}}

{{< tab "Linux" >}}

# Linux

This is tab **Linux** content.

Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
Miseratus fonte Ditis conubia.
{{< /tab >}}

{{< tab "Windows" >}}

# Windows

This is tab **Windows** content.

Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
Miseratus fonte Ditis conubia.
{{< /tab >}}
{{< /tabs >}}

## Example 2

{{< tabs >}}
{{< tab "toml" >}}
```md
+++
math = true
+++
```
{{< /tab >}}
{{< tab "yaml" >}}
```md
---
math: true
---
```
{{< /tab >}}
{{< /tabs >}}