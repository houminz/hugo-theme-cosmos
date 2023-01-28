---
title: Configuration
weight: -10
---

## Site configuration

```toml
languageCode = 'en-us'
MetaDataFormat = "yaml"
title = 'Hugo Cosmos'
enableGitInfo = true

[menu]
  [[menu.main]]
    title = "documentation"
    name = "book"
    url = "/docs/"
    weight = -50
  [[menu.main]]
    title = "github"
    name = "github"
    url = "https://github.com/librabyte/hugo-theme-cosmos"
    weight = -30


[markup]
  [markup.highlight]
    style = 'monokai'
    codeFences = true
    guessSyntax = false
    lineNoStart = 1
    lineNos = true
    lineNumbersInTable = true

  [markup.tableOfContents]
    endLevel = 6
    ordered = false
    startLevel = 2

  [markup.goldmark.renderer]
    unsafe = true

[module]
  [module.mounts]
    source = 'assets'
    target = 'assets'

[params]
  since = "2019"
  dateFormat = "January 2, 2006"
  mainSections = ["posts"]
  bookSection = "docs"
  photoSwipe = false
  enableHomeProfile = false

  # (Optional, default true) Enables search function with fuse.js.
  search = true
  # (Optional, default true) Display a "Back to top" link in the site footer.
  back2top = true
  # (Optional, default true) Enable douban short code for douban music/book reference.
  douban = true
  # (Optional, default true) Enable Table of Contents in the right sidebar.
  toc = true
  # (Optional, default true) Enables meting music support with meting.js.
  meting = true
  # (Optional, default true) always collapse in the file tree mode.
  alwaysCollapse = true

  # (Optional, default true) Enable giscus as comment plugin.
  [params.comments.giscuss]
    enable = true
    repo = "librabyte/hugo-theme-cosmos"
    repoId = "R_kgDOIEDNvg"
    category = "Announcements"
    categoryId = "DIC_kwDOIEDNvs4CTiKG"
    theme = "light"

  # (Optional, default false) Enable reward display in the post footer.
  [params.reward]
    enable = false
    [params.reward.items]
      wechat = "https://cosmos-1251905798.cos.ap-beijing.myqcloud.com/theme/wechatpay.png"
      alipay = "https://cosmos-1251905798.cos.ap-beijing.myqcloud.com/theme/alipay.jpg"

  # (Optional, default false) Enable copyright info display in the post footer.
  [params.copyright]
    enable = false
    content = '<a rel="license noopener" href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">CC BY-NC-ND 4.0</a>'
    [params.copyright.gitInfo]
      gitRepo = "https://github.com/librabyte/hugo-theme-cosmos"
      showCommitMessage = true

  [params.markmap]
    # enable/disable Markmap support
    enable = true

  [params.mermaid]
    # enable/disable Mermaid support
    enable = true

  [params.echarts]
    # enable/disable ECharts support
    enable = true
    map = true

  [params.katex]
    # enable/disable KaTeX support
    enable = true

[outputs]
  home = ["HTML", "RSS", "JSON"]
```

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
