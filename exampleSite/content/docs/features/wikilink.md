---
title: WikiLink
author: Houmin
date: "2023-01-27"
weight: 10
type: book
---

Hugo Cosmos supports [WikiLinks](https://en.wikipedia.org/wiki/Help:Link) feature so that you can realize internal link in your knowledge base.

## Configuration

To use wikilink in Hugo Cosmos, you should enable these options:

```toml
  # (Optional, default false) enable wikilink feature.
  [params.wikilink]
    enableWikilink = true
    enableBacklinks = true
    enableLinkPreview = false
```

## Usage

Specifically, any word surrounded by doubled square brackets is converted to a link. For example, [[posts/markdown-syntax | Markdown Syntax]] is an article illustrate how to write markdown document and we refer the article here.

```markdown
# wikilink format
[[posts/absolute-path | Absolute Path]]
```

You can see that the wikilink is translated to markdown links. At the same time, you can see backlinks in the [[posts/markdown-syntax]] article.

{{< notice tip >}}
This feature is provided for better cooperation between Hugo Cosmos and Obsidian.

Currently, wikilinks and backlinks is implemented using simple regex matching. There are are some known issues.
1. wikilink in inline code or code block would also be replaced by regex, which may cause `ref` error
2. graph view has not been implemented
3. block reference has not been implemented
{{< /notice >}}


### Cross directory reference

[[docs/features]]

{{< notice tip >}}
0. Your wikilink reference should not start with `/`.
1. When you refer another notes from a different directory, you should add the directory name in your wikilink reference.

For example, if doc A is under the directory `content/docs/doc-a.md`, doc A want to refer doc B `content/posts/doc-b.md`

You should write the wikilink below in the doc A:

```markdown
[[posts/doc-b]]
```
{{< /notice >}}


### Same directory reference

You can also check other features like [[code-blocks]]

{{< notice tip >}}
2. When you refer another note from the same directory, the directory name don't need to be added.

For example, if doc A is under the directory `content/docs/doc-a.md`, doc A want to refer doc C `content/docs/doc-c.md`

You can write the wikilink below in the doc A:

```markdown
[[docs/doc-b]]
```

or

```markdown
[[doc-b]]
```
{{< /notice >}}

### Pipe Symbol


Hugo Cosmos would use the page title as the wikilink display text by default. For example:

[[icon-sets]]

You can also use the pipe symbol `|` to override the default text. For example:

[[icon-sets | New Display Text for Icon Sets]]


### Block Reference

Hugo cosmos also supports `block reference`. For example:

```markdown
[[icon-sets#anchor]]
```

[[icon-sets#Custom icon sets]]


