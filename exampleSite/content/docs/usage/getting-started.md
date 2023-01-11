---
title: Getting Started
weight: -20
---

This page tells you how to get started with the Cosmos theme, including installation and basic configuration.

<!--more-->

## Install requirements

You need a recent version of Hugo for local builds and previews of sites that use Cosmos.

## Using the theme

To prepare your new site environment just a few steps are required:

1. Create a new empty Hugo site.

   ```Shell
   hugo new site demosite
   ```

2. Switch to the root of the new site.

   ```Shell
   cd demosite
   ```

3. Install the Cosmos theme from a [release bundle](#option-1-download-pre-build-release-bundle) (recommended) or from [Git branch](#option-2-clone-the-github-repository).

4. Create the minimal required Hugo configuration `config.toml`. For all configuration options take a look at the [configuration](/docs/usage/configuration/) page.

   ```Toml
   baseURL = "http://localhost"
   title = "Cosmos"
   theme = "cosmos"

   pluralizeListTitles = false

   # Required if you want to render robots.txt template
   enableRobotsTXT = true

   # Needed for mermaid shortcodes
   [markup]
     [markup.goldmark.renderer]
       # Needed for mermaid shortcode
       unsafe = true
     [markup.tableOfContents]
       startLevel = 1
       endLevel = 9

   [taxonomies]
      tag = "tags"
   ```

5. Test your site.

   ```Shell
   hugo server -D
   ```

### Option 1: Download pre-build release bundle

Download and extract the latest release bundle into the theme directory.

```Shell
mkdir -p themes/cosmos/
curl -L https://github.com/SimpCosm/hugo-theme-cosmos/releases/latest/download/hugo-theme-cosmos.tar.gz | tar -xz -C themes/cosmos/ --strip-components=1
```

### Option 2: Clone the GitHub repository

{{< notice info >}}
Keep in mind this method is not recommended and needs some extra steps to get it working.
If you want to use the Theme as submodule keep in mind that your build process need to
run the described steps as well.
{{< /notice >}}

Clone the Cosmos git repository.

```Shell
git clone https://github.com/SimpCosm/hugo-theme-cosmos.git themes/cosmos
```

## Deployments

There are several ways to deploy your site with this theme on Netlify. Regardless of which solution you choose, the main goal is to ensure that the prebuilt theme release tarball is used or to run the [required commands](#option-2-clone-the-github-repository) to prepare the theme assets before running the Hugo build command.
