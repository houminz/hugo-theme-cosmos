---
author: "Houmin"
title: "Notice"
date: "2023-01-03"
type: book
tags: ["notice", "short code", "hugo"]
---

## Format

```html
{{</* notice tip */>}}
This is a notice short code format example.
{{</* /notice */>}}
```

## Tip

{{< notice tip >}}
This is a very good tip.
{{< /notice >}}

## Info

{{< notice info >}}
This is a info notice.
{{< /notice >}}

## Warning
{{< notice warning >}}
This is a warning notice. Be warned!
{{< /notice >}}

## Important

{{< notice important >}}
This is a important notice.
{{< /notice >}}

## Examples

{{< notice tip >}}
This is a notice of the type `info`. The notice can span multiple lines, even multiple paragraphs.

For instance, this is another paragraph. Naturally **Markdown** can be used, for instance to embed links.

> This is a quote example in notice.

Even code can be used.
```go
package main
import "fmt"
func main() {
	fmt.Println("Hello World!")
}
```
{{< /notice >}}
