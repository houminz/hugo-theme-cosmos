---
author: "Houmin"
title: "Viz"
date: "2026-07-31"
type: book
tags: ["viz", "iframe", "short code", "hugo"]
---

Viz shortcode embeds a standalone interactive HTML page (an animation, a simulator, a D3/SVG explorable) into a post via an `iframe`, and takes care of the two things that make hand-written iframes annoying: the height has to be guessed, and the embedded page has no idea whether the host site is in light or dark mode.

<!-- prettier-ignore-start -->
```tpl
{{</* viz src="/viz/moe-flow.html" */>}}
```
<!-- prettier-ignore-end -->

Attributes:

| Name       | Description                                                                              | Default              |
| ---------- | ---------------------------------------------------------------------------------------- | -------------------- |
| src        | path from the site root, or a full URL. Required.                                        | undefined            |
| height     | initial height, and the fallback when auto-height is unavailable. A bare number means px. | `640`                |
| title      | accessible title of the iframe                                                            | file name of `src`   |
| caption    | figure caption, rendered as Markdown. Hidden when empty.                                  | undefined            |
| link       | set to `false` to hide the "open standalone" link                                        | shown                |
| autoheight | set to `false` to ignore the height reported by the page and always use `height`          | enabled              |
| theme      | set to `false` to stop forwarding the host's light/dark theme to the page                 | enabled              |

## Examples

<!-- prettier-ignore -->
```tpl
{{</* viz src="/viz/moe-flow.html" height="1240"
        title="MoE 计算流程可视化" caption="MoE 层的四段计算流程" */>}}
```

A page that should keep a fixed height and not follow the host theme:

<!-- prettier-ignore -->
```tpl
{{</* viz src="/viz/timeline.html" height="480" autoheight="false" theme="false" link="false" */>}}
```

## Authoring the embedded page

Put the page anywhere under your site's `static/`, e.g. `static/viz/my-thing.html`, so it is served as-is at `/viz/my-thing.html`. Then add one line to it:

```html
<script src="/viz/embed.js"></script>
```

`embed.js` ships with this theme. It is a no-op when the page is opened on its own, and when the page is embedded it does two things:

1. Reports the page's real height to the host, which resizes the iframe to match. A `ResizeObserver` covers ordinary layout changes; if your page mutates its own content and you want an immediate re-measure, call `window.vizReportHeight()`.
2. Receives the host's theme and writes it to `<html data-theme="light|dark">`, so your CSS only has to react to that attribute.

A minimal skeleton:

```html
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>My visualization</title>
<style>
  :root { --bg: #fff; --fg: #1f2328; }
  /* 独立打开时跟随系统，嵌入时由宿主页指定 data-theme */
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) { --bg: #0f1115; --fg: #e6e7ea; }
  }
  :root[data-theme="dark"] { --bg: #0f1115; --fg: #e6e7ea; }
  body { margin: 0; padding: 20px; background: var(--bg); color: var(--fg); }
</style>
</head>
<body>
  <div id="app">...</div>
  <script src="/viz/embed.js"></script>
  <script>
    // your visualization
  </script>
</body>
</html>
```

{{< notice warning >}}
**Do not put a plain Markdown link to the page in your post**\
A link like `[open](/viz/my-thing.html)` is treated as an internal link by Obsidian, which will happily create an empty `content/viz/my-thing.html.md` next to it. Hugo then renders that as a page at `/viz/my-thing.html/` and collides with the static file, failing the build with `not a directory`. The shortcode already provides the standalone link in its caption, so there is no need for one in the prose.
{{< /notice >}}

## Notes

- The controller script and its styles are emitted once per page, so several `viz` embeds on the same page cost nothing extra and are wired up independently.
- The iframe is `loading="lazy"` and carries `allowfullscreen`, so a fullscreen button inside the embedded page works.
- Auto-height and theme sync both rely on `postMessage`. A page that does not load `embed.js` still embeds fine; it just keeps the height you passed in.
