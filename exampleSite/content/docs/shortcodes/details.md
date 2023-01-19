---
title: "Details"
author: "Houmin"
date: "2022-12-04"
tags: ["details", "short code", "hugo"]
---

```html
{{</* details title="Title" open=true */>}} <!-- begin columns block -->
## Markdown content
Lorem markdownum insigne...
{{</* /details */>}}
```

{{< details "Details Summary Example: click here to expand" open >}}
## Markdown content
Lorem markdownum insigne...
{{< /details >}}

Below is code example, you can click summary to expand.

{{< details "Code Example">}}
```cpp
// 'Hello World!' program

#include <iostream>

int main(){
  std::cout << "Hello World!" << std::endl;
  return 0;
}
```
{{< /details >}}