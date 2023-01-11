---
author: "Hugo Authors"
title: "Short Code"
date: "2019-03-10"
description: "A brief description of Hugo Shortcodes"
tags: ["shortcodes", "privacy"]
ShowToc: true
---

Hugo ships with several [Built-in Shortcodes](https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes) for rich content, along with a [Privacy Config](https://gohugo.io/about/hugo-and-gdpr/) and a set of Simple Shortcodes that enable static and no-JS versions of various social media embeds.
<!--more-->

---

## Video

### YouTube

```html
{{</* youtube ZJthWmvUzzc */>}}
```

{{< youtube ZJthWmvUzzc >}}

<br>

### Bilibili

```html
{{</* bilibili BV1MN4y177PB */>}}
```

{{< bilibili BV1MN4y177PB >}}


### Vimeo

```html
{{</* vimeo 48912912 */>}}
```

{{< vimeo 48912912 >}}

---

## Music

### NetEase

```html
{{</* music server="netease" id="5250122 */>}}
```

This is netease music example:

{{< music server="netease" id="5250122" >}}

```html
{{</* music server="netease" type="playlist" id="60198" */>}}
```

{{< music server="netease" type="playlist" id="60198" >}}

### QQ Music

```html
{{</* music auto="https://y.qq.com/n/ryqq/song/004ENQPZ0dHaqy.html" */>}}
```

{{< music auto="https://y.qq.com/n/ryqq/song/004ENQPZ0dHaqy.html" >}}


## Code

### Gist

```html
{{</* gist spf13 7896402 */>}}
```

{{< gist spf13 7896402 >}}

### Github Code

```html
{{</* ghcode url="https://github.com/gohugoio/hugo/blob/77fc74a5b20f50298ac4a1cd88e436932fc2226f/markup/highlight/highlight.go#L60-L65" */>}}
```

{{< ghcode url="https://github.com/gohugoio/hugo/blob/77fc74a5b20f50298ac4a1cd88e436932fc2226f/markup/highlight/highlight.go#L60-L65" >}}

## Social Media

### Twitter

```html
{{</* twitter 1085870671291310081 */>}}
```

{{< twitter_simple 1085870671291310081 >}}

<br>

---

### Douban

```html
{{</* douban type="movie" id="35554292" */>}}
{{</* douban type="book" id="1084336" */>}}
```

{{< douban type="movie" id="35554292" >}}

{{< douban type="book" id="1084336" >}}




## Columns

Columns help organize shorter pieces of content horizontally for readability.

```html
{{</* columns */>}} <!-- begin columns block -->
# Left Content
Lorem markdownum insigne...

<---> <!-- magic separator, between columns -->

# Mid Content
Lorem markdownum insigne...

<---> <!-- magic separator, between columns -->

# Right Content
Lorem markdownum insigne...
{{</* /columns */>}}
```

Below is a simple example.

{{< columns >}}
## Left Content

Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
Miseratus fonte Ditis conubia.

<--->

## Mid Content
Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter!

<--->

## Right Content
Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
Miseratus fonte Ditis conubia.
{{< /columns >}}

## Details

```html
{{</* details title="Title" open=true */>}} <!-- begin columns block -->
## Markdown content
Lorem markdownum insigne...
{{</* /details */>}}
```

{{< details "Details Summary Example: click here to expand" open >}}
## Markdown content
Lorem markdownum insigne...
{{< /details >}}

Below is code example, you can click summary to expand.

{{< details "Code Example">}}
```cpp
// 'Hello World!' program

#include <iostream>

int main(){
  std::cout << "Hello World!" << std::endl;
  return 0;
}
```
{{< /details >}}