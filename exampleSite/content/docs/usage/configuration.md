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
    identifier = "Documentation"
    name = "Documentation"
    pre = "<i class='fa fa-heart'></i>"
    url = "/docs/"
    weight = -20

[markup]
  [markup.highlight]
    style = 'monokai'
    codeFences = true
    guessSyntax = false
    lineNoStart =1
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

  enableHomeProfile = false
  mainSections = ["posts"]
  bookSection = "docs"
  meting = true
  photoSwipe = false

  # (Optional, default false) Enables search function with fuse.js.
  search = true
  # (Optional, default true) Display a "Back to top" link in the site footer.
  back2top = true
  # (Optional, default true) Enable douban short code for douban music/book reference.
  douban = true
  # (Optional, default true) Enable Table of Contents in the right sidebar.
  toc = true
  # (Optional, default true) Enable copyright info display in the post footer.
  contentCopyright = true

  alwaysCollapse = false

  # (Optional, default true) Enable giscus as comment plugin.
  [params.comments.giscuss]
    enable = true
    repo = "librabyte/hugo-theme-cosmos"
    repoId = "R_kgDOIEDNvg"
    category = "Announcements"
    categoryId = "DIC_kwDOIEDNvs4CTiKG"
    theme = "light"

  [params.reward]
    enable = true
    [params.reward.items]
      wechat = "https://cosmos-1251905798.cos.ap-beijing.myqcloud.com/theme/wechatpay.png"
      alipay = "https://cosmos-1251905798.cos.ap-beijing.myqcloud.com/theme/alipay.jpg"

  [params.copyright]
    enable = true
    content = '<a rel="license noopener" href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">CC BY-NC-ND 4.0</a>'
    [params.copyright.gitInfo]
      gitRepo = "https://github.com/librabyte/hugo-theme-cosmos"
      showCommitMessage = true

  [params.markmap]
    enable = true

  [params.mermaid]
    enable = true

  [params.echarts]
    enable = true
    map = true

  [params.katex]
    # enable/disable KaTeX support
    enable = true

  [params.assets]
    favicon = "/static/favicon/favicon.ico"
    favicon16x16 = "/static/favicon/favicon-16x16.png"
    favicon32x32 = "/static/favicon/favicon-32x32.png"
    apple_touch_icon = "/static/favicon/apple_touch_icon.png"

[outputs]
  home = ["HTML", "RSS", "JSON"]
```

## Page configuration

```yaml
# Set page weight to re-arrange items in file-tree menu.
weight: 10

# Enable Table of Contents for page, this cooperates with `.Site.Params.toc`
toc: true

# Author of the post, default `.Site.Author.name`
author: librabyte

# Set to true to make a section foldable in side menu.
geekdocCollapseSection: true
```
