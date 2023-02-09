---
title: "Details"
author: "Houmin"
date: "2022-12-04"
tags: ["details", "short code", "hugo"]
type: book
---

Details shortcode is a helper for details html5 element[^1].

> The `<details>` tag specifies additional details that the user can open and close on demand.
>
> The `<details>` tag is often used to create an interactive widget that the user can open and close. By default, the widget is closed. When open, it expands, and displays the content within.
>
> Any sort of content can be put inside the `<details>` tag.
>
> Tip: The `<summary>` tag is used in conjunction with `<details>` to specify a visible heading for the details.


## Details of text

```html
{{</* details "Details Summary Example: click here to expand" open */>}}
### Markdown content
Lorem markdownum insigne...
{{</* /details */>}}
```

{{< details "Details Summary Example: click here to expand" open >}}
### Markdown content
Lorem markdownum insigne...
{{< /details >}}

## Details of code

Below is code example, you can click summary to expand.

````markdown
{{</* details title="Code Example" */>}}
```cpp
// 'Hello World!' program

#include <iostream>

int main(){
  std::cout << "Hello World!" << std::endl;
  return 0;
}
```
{{</* /details */>}}
````

{{< details "Code Example" >}}
```cpp
// 'Hello World!' program

#include <iostream>

int main(){
  std::cout << "Hello World!" << std::endl;
  return 0;
}
```
{{< /details >}}

## Details of hugo short code

### Douban

{{< details "Hugo Short Code: Douban" >}}
{{< douban type="movie" id="35674355" >}}
{{< /details >}}

### Bilibili

{{< details "Hugo Short Code: Bilibili" >}}
{{< bilibili BV1MN4y177PB >}}
{{< /details >}}

### Notice

{{< details "Hugo Short Code: Notice" >}}
{{< notice tip >}}
This is a very good tip.
{{< /notice >}}
{{< /details >}}

### Gist

{{< details "Hugo Short Code: Gist" >}}
{{< gist spf13 7896402 >}}
{{< /details >}}

### Github Code

{{< details "Hugo Short Code: Github Code" >}}
{{< ghcode url="https://github.com/gohugoio/hugo/blob/77fc74a5b20f50298ac4a1cd88e436932fc2226f/markup/highlight/highlight.go#L60-L65" >}}
{{< /details >}}


[^1]: https://www.w3schools.com/tags/tag_details.asp
