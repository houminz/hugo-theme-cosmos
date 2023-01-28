---
title: WikiLink
author: Houmin
date: "2023-01-27"
weight: 10
---

Hugo Cosmos supports [WikiLinks](https://en.wikipedia.org/wiki/Help:Link) feature so that you can realize internal link in your knowledge base.

Specifically, any word surrounded by `[[` and `]]` is converted to a link. For example, [[markdown-syntax]] is an article illustrate how to write markdown document and we refer the article here.

You can see that the wikilink is translated to markdown links. At the same time, you can see backlinks in the [[markdown-syntax]] article.

{{< notice tip >}}
This feature is provided for better cooperation between Hugo Cosmos and Obsidian.

Currently, wikilinks and backlinks is implemented using simple regex matching. There are are some known issues.
1. wikilink in inline code or code block would also be replaced by regex, which may cause `ref` error
2. graph view has not been implemented
3. block reference has not been implemented
{{< /notice >}}


