---
title: Search
author: Houmin
date: 2023-01-24
type: book
---

## Build Index

Hugo already builds indexes of all pages, we can cherry-pick which aspects should be searchable. The result is a newly created JSON index at `/index.json`.

We can generate the `index.json` by adding `layouts/_default/index.json` as followed:

```javascript
{{- $.Scratch.Add "index" slice -}}
{{- range .Site.RegularPages -}}
{{- $.Scratch.Add "index" (dict "title" .Title "tags" .Params.tags "categories" .Params.categories "contents" .Plain "permalink" .Permalink "date" .Date "section" .Section) -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
```

Add this snippet to your config file to [instruct Hugo to create the index file in JSON format](https://gohugo.io/templates/output-formats#output-formats-for-pages). (RSS and HTML are default outputs, what's important is to add JSON.

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

The index.json looks like this, its data structure is defined by `layouts/_default/index.json`:
![](https://cosmos-1251905798.cos.ap-beijing.myqcloud.com/blog/2023-01-25_hugo-search-index.png)

## Load Fuse.JS

According to [Fuse.JS](https://fusejs.io) documents
- [Options](https://fusejs.io/api/options.html): 
- [Fuse.createIndex](https://fusejs.io/api/indexing.html): Pre-generate the index from the list, and pass it directly into the Fuse instance.
```javascript
function loadSearch() {
    fetchJSONFile('/index.json', function(data){
        var options = { // fuse.js options; check fuse.js website for details
            shouldSort: true,
            location: 0,
            distance: 100,
            threshold: 0.4,
            minMatchCharLength: 2,
            keys: [
                'permalink',
                'title',
                'tags',
                'contents'
            ]
        };
        // Create the Fuse index
        fuseIndex = Fuse.createIndex(options.keys, data)
        fuse = new Fuse(data, options, fuseIndex); // build the index from the json file
    });
}
```

The `data` here is fetched from `index.json`, would be an array here:


## Trigger Search

```javascript
function executeSearch(term) {
    let results = fuse.search(term); // the actual query being run using fuse.js
    let searchitems = ''; // our results bucket

    if (results.length === 0) { // no results based on what was typed into the input box
        resultsAvailable = false;
        searchitems = '';
    } else { // build our html
        permalinks = [];
        numLimit = 5;
        for (let item in results) { // only show first 5 results
            if (item > numLimit) {
                break;
            }
            if (permalinks.includes(results[item].item.permalink)) {
                continue;
            }
            //   console.log('item: %d, title: %s', item, results[item].item.title)
            searchitems = searchitems + '<li><a href="' + results[item].item.permalink + '" tabindex="0">' + '<span class="title">' + results[item].item.title + '</span></a></li>';
            permalinks.push(results[item].item.permalink);
        }
        resultsAvailable = true;
    }

    document.getElementById("searchResults").innerHTML = searchitems;
    if (results.length > 0) {
        first = list.firstChild.firstElementChild; // first result container — used for checking against keyboard up/down location
        last = list.lastChild.firstElementChild; // last result container — used for checking against keyboard up/down location
    }
}
```

## Execute Search

![](https://cosmos-1251905798.cos.ap-beijing.myqcloud.com/blog/2023-01-25_hugo-execute-search.png)

## Reference

- [Search for your Hugo Website](https://gohugo.io/tools/search)
- [GitHub Gist for Fuse.js integration](https://gist.github.com/eddiewebb/735feb48f50f0ddd65ae5606a1cb41ae)
- [hugofastsearch](https://gist.github.com/cmod/5410eae147e4318164258742dd053993)