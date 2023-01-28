---
title: "Getting Started"
author: "Houmin"
date: "2023-01-26"
tags: ["hugo", "netlify", "cosmos"]
weight: -100
---

This page tells you how to get started with Hugo Cosmos, including installation and basic configuration.

<!--more-->

## Install requirements

Hugo Cosmos requires an extended hugo version to process `SCSS` to `CSS`[^1]. You can [install hugo](https://gohugo.io/installation) on your local machine for local builds and previews of sites that use Hugo Cosmos.

## Using the theme

To prepare your new site environment just a few steps are required:

1. Create a new empty Hugo site.

   ```bash
   hugo new site demosite
   ```

2. Switch to the root of the new site and make the initial commit.

   ```bash
   cd demosite
   git init
   git add archetypes/ content/ config.toml
   git commit -m "Initial commit"
   ```

3. Install the Cosmos theme from a [release bundle](#option-1-download-pre-build-release-bundle) (recommended) or from [Git branch](#option-2-clone-the-github-repository).

   ```bash
   git submodule add https://github.com/librabyte/hugo-theme-cosmos.git themes/cosmos
   git submodule init themes/cosmos
   ```
4. Create the minimal required Hugo configuration `config.toml`. For all configuration options take a look at the [configuration](/docs/usage/configuration/) page.

   ```toml
   title = "Hugo Cosmos"
   theme = "cosmos"

   # Required if you want to render robots.txt template
   enableRobotsTXT = true

   [markup]
     [markup.goldmark.renderer]
       unsafe = true
     [markup.tableOfContents]
       startLevel = 1
       endLevel = 9
   ```
   
5. Write your first posts under your demo site.
   ```bash
   hugo new posts/hello-world.md
   ```
6. Test your site.

   ```bash
   hugo server -D
   ```
7. Update hugo theme to the latest version.
   ```bash
   git submodule udpate
   ```

## Markdown your thoughts

You can write your thoughts using any text editors as you like. All you need to do is to spend few minutes to learn [[markdown-syntax]] which is simple enough. 

Hugo Cosmos recommends some stands out of them:
- [Typora](https://typora.io): An excellent markdown editor/render with seamless live preview.
- [Visual Studio Code](https://code.visualstudio.com): A lightweight but powerful source code editor, open source, fantastic plugins and even more.
- [Obsidian](https://obsidian.md/): A powerful and extensible knowledge base that works on top of your local folder of plain text files.
- Other great tools you might recommend to us!

## Deployments

Because Hugo renders static websites, you can host your new Hugo website virtually anywhere. Hugo community provides lots of popular hosting and automated deployment solutions[^3].

### Netlify

There are several ways to deploy your site with this theme on Netlify[^4]. Regardless of which solution you choose, the main goal is to ensure that the prebuilt theme release tarball is used or to run the [required commands](#option-2-clone-the-github-repository) to prepare the theme assets before running the Hugo build command.

Here[^5] is an example to deploy your hugo sites to Netlify via [Github Actions](https://github.com/features/actions).

{{< ghcode url="https://github.com/librabyte/hugo-theme-cosmos/blob/87426e58df532b1577d7967f53258c89aa2d6b85/.github/workflows/deploy.yaml#L36-L63" >}}

## Known Limitations

You can report bugs or issues that beyond you expectations [here](https://github.com/librabyte/hugo-theme-cosmos/issues).

[^1]: [Hugo FAQ: About Hugo version](https://gohugo.io/troubleshooting/faq/#i-get--this-feature-is-not-available-in-your-current-hugo-version)
[^3]: [Hosting & Deployment](https://gohugo.io/hosting-and-deployment)
[^4]: [Hugo: hosting on netlify](https://gohugo.io/hosting-and-deployment/hosting-on-netlify)
[^5]: [Github Actions for Hugo Cosmos](https://github.com/librabyte/hugo-theme-cosmos/blob/master/.github/workflows/deploy.yaml)
