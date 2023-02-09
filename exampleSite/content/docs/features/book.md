---
title: Book Layout
author: Houmin
type: book
weight: -10
---

The book feature is designed for knowledge sharing. It can be used to create multi-page content such as online courses, software documentation, knowledge bases, books, notebooks, and tutorials.

## Organization

The `book` feature can be used to create courses, tutorials, and documentation in the following file structure:

```shell
content/course
├── _index.md         # Overview
└── intro             # Chapter folder
    ├── _index.md     # Chapter metadata including chapter title
    ├── example1.md   # A page
    └── example2.md   # Another page
└── tutorial          # Another chapter
    ├── _index.md
    ├── intro.md
    └── ...
```

File and folder names should use hyphens instead of spaces, for example creating a course folder named `my-course`.

The `course` folder in the example above may be renamed. For example:
- we can rename it to `book` for writing a book
- `docs` for software/project documentation
- `notes` for creating a notebook
- `tutorials` for creating multi-page “how to” guides.

## Metadata

To create a course material:

```shell
hugo new --kind book course/tutorial/intro.md
```

Then edit the newly created file `content/course/tutorial/intro.md` with your full title and content.

You can create as many pages as your need. Each page should have a `title`, and a page `type` of `book`.

```markdown
---
title: Example Page 1
date: 2023-02-05
type: book
---
```

## Menus

You can order your book menus using `weight: 10` in the front matter of pages, where the number defines the order.

users recommend using weights that are increments of 10 so that it’s easy to reorder a page in the future without needing to change the weight of all the other pages



