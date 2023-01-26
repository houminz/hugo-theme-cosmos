---
title: Icon Sets
author: "Houmin"
date: "2023-01-23"
tags: ["icon", "fontawesome", "svg", "hugo"]
---

## Built-in icon sets

The Hugo Cosmos bundles just a small set of built-in icons to avoid loading too much resources that don't need.

{{< icons >}}


## Custom icon sets

The only supported source for custom icons are SVG sprites. Some icon frameworks provides ready to use sprites e.g. FontAwesome[^1]. If the framework don't provide sprites, you can create your own from raw SVG icons. There are a lot of tools available to create sprites, please choose one that fits your need. One solution could be [svgsprit.es](https://svgsprit.es/).

Regardless of which tool (or existing sprite) you choose, there are a few requirements that must be met:

1. The sprite must be a valid **SVG** file.
2. You have to ensure to **hide the sprite**. Apply the predefined class `svg-sprite` or `hidden` to the root element of your sprite or add a small piece of inline CSS e.g. `style="display: none;"`.
3. Save the sprite to the folder `assets/sprites` right beside your `content` folder.

The result of a valid minimal SVG sprite file could look like this:

```XML
<svg width="0" height="0" class="hidden">
    <symbol fill="#000000" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="douban">
        <path d="M.643.92v2.412h22.714V.92H.643zm1.974 4.926v9.42h18.764v-9.42H2.617zm2.72 2.408H18.69v4.605H5.338V8.254zm1.657 7.412-2.512.938c1.037 1.461 1.87 2.825 2.512 4.091H0v2.385h24v-2.385h-6.678c.818-1.176 1.589-2.543 2.303-4.091l-2.73-.938a29.952 29.952 0 0 1-2.479 5.03h-4.75c-.786-1.962-1.677-3.641-2.672-5.03z"></path>
    </symbol>
</svg>
```

**Example:**

Choose your sprite to use and copy it to your projects root directory into `assets/sprites`, right beside your `content` folder:

```Bash
my_projcet/
├── assets
│   └── sprites
│       └── douban.svg
├── config.yaml
├── content
│   ├── _index.md
│   ├── ...
```

That's it! The theme will auto-load all available SVG sprites provided in the assets folder. An example would be `douban` {{< icon "douban" >}}. There is also a [shortcode](/docs/shortcodes/icon/) available.

## FontAwesome icon sets

To be supported.

[^1]: https://fontawesome.com