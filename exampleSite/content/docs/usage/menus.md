---
title: Menus
---

The theme supports two different kinds of menus. File-tree menu is the default one and does not require further configuration to work. If you want full control about your menu the bundle menu is a powerful option to accomplish it.

## File-tree menu

As the name already suggests, the file tree menu builds a menu from the file system structure of the content folder. By default, areas and subareas are sorted alphabetically by the title of the pages. To manipulate the order the `weight` parameter in a page [front matter](https://gohugo.io/content-management/front-matter/) can be used. To structure your content folder you have to use [page bundles](https://gohugo.io/content-management/organization/#page-bundles), single files are **not** supported. Hugo will render build single files in the content folder just fine but it will not be added to the menu.

**Example:**

File system structure:

```plain
content/
├── level-1
│   ├── _index.md
│   ├── level-1-1.md
│   ├── level-1-2.md
│   └── level-1-3
│       ├── _index.md
│       └── level-1-3-1.md
└── level-2
    ├── _index.md
    ├── level-2-1.md
    └── level-2-2.md
```

![Example file-tree menu](/media/file-tree.png)

## Bundle menu

As an advantage you can add [icons](/features/icon-sets/) to your menu entries.

![Example bundle menu](/media/bundle-menu.png)

### More menu

{{< notice tip >}}
The more menu is special type of the bundle menu and can be combined with the default file-tree menu.
{{< /notice >}}

As this is a special type of the bundle menu it is basically working in the same way. To enable it just add a data file to `data/menu/more.yaml`. The more menu will also work with the file-tree menu.

**Example:**

```YAML
---
more:
  - name: Releases
    ref: "https://github.com/SimpCosm/hugo-theme-cosmos/releases"
    external: true
  - name: "View Source"
    ref: "https://github.com/SimpCosm/hugo-theme-cosmos"
    external: true
```

[![Example bundle menu](/media/more-menu.png)](/media/more-menu.png)

## Extra Header Menu

If you want to customize the header menu, this can be achieved by using a data file written in YAML and placed at `data/menu/extra.yaml`.

**Example:**

```Yaml
---
header:
  - name: GitHub
    ref: https://github.com/SimpCosm/hugo-theme-cosmos
    external: true
```