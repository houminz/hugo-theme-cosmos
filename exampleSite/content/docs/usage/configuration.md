---
title: Configuration
type: book
date: "2023-01-12"
weight: -10
---

## Site configuration

{{< include file="/config.toml" language="toml" options="linenos=table,hl_lines=62-63,linenostart=100" >}}

## Page configuration

Hugo allows you to add front matter in yaml, toml, or json to your content files. You can reference Front Matter[^1] for predefined variables that Hugo is aware of.

Hugo Cosmos also has its specific variables for better management of your content. Here is the variables that mostly used.

```yaml
# Title of the page
title: "Hugo Cosmos Configuration"

# Author of the page
author: "librabyte"

# The date associated with the page
date: "2023-01-26"
# Set page weight to re-arrange items in file-tree menu.
weight: 10

# Enable Table of Contents for page, this cooperates with `.Site.Params.toc`
toc: true

# Tags for the page, it is a list
tags: ["hugo", "math"]

# Categories for the page, it is a list
categories: ["Cosmos", "Hugo"]

# Set to true to enable meting music in the page, default false
meting: true

# Set to true to enable mermaid diagrams in the page, default false
mermaid: true

# Set to true to enable markmap mindmaps in the page, default false
markmap: true

# Set to true to enable ECharts diagrams in the page, default false
echarts: true

# Set to true to enable ECharts Maps in the page, default false
echartsMap: true

# Set to true to enable math formulae in the page, default false
math: true

# Set to false to open automatically, default true, always collapse in the file tree mode 
alwaysCollapse: true
```

[^1]: [Front Matter](https://gohugo.io/content-management/front-matter)
