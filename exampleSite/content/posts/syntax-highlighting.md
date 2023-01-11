---
author: "Houmin Wei"
title: "Syntax Highlighting"
date: 2011-08-30T16:01:23+08:00
draft: false
tags: ["Hugo", "Syntax Highlighting"]
categories: ["Hugo"]
---

Hugo support syntax highlighting natively[^1] using [Chroma](https://github.com/alecthomas/chroma)[^2] as its code highlighter.

[^1]: [Syntax Highlighting | Hugo](https://gohugo.io/content-management/syntax-highlighting/)
[^2]: https://github.com/alecthomas/chroma

<!--more-->

## Implementation

### Implementation by Chroma

Hugo implements `struct Highlighter` by importing chroma library.

{{< ghcode url="https://github.com/gohugoio/hugo/blob/77fc74a5b20f50298ac4a1cd88e436932fc2226f/markup/highlight/highlight.go#L60-L65" >}}

The `Highlight` methods is actually implemented in [`highlight`](https://github.com/gohugoio/hugo/blob/77fc74a5b20f50298ac4a1cd88e436932fc2226f/markup/highlight/highlight.go#L167). We can summarize it to the following code:

```go
// Explicitly specify the language by its Chroma syntax ID
lexer := lexers.Get("go")
if lexer == nil {
    lexer = lexers.Fallback
}

// Once a language is identified you will need to pick a formatter and a style (theme).
style := styles.Get("solarized-dark")
if style == nil {
	style = styles.Fallback
}

formatter := formatters.Get("html")
if formatter == nil {
formatter = formatters.Fallback
}

// obtain an iterator over the tokens
contents, err := ioutil.ReadAll(r)
iterator, err := lexer.Tokenise(nil, string(contents))

// fomat the tokens from the iterator
err := formatter.Format(w, style, iterator)

```

### Configuration in Hugo
Highlighting is carried out via the built-in highlight shortcode. It takes exactly one required parameter for the programming language to be highlighted and requires a closing shortcode. Note that highlight is not used for client-side JavaScript highlighting.


Options:

- `linenos`: configure line numbers. Valid values are true, false, table, or inline. false will turn off line numbers if it’s configured to be on in site config. New in v0.60.0 table will give copy-and-paste friendly code blocks.
- `hl_lines`: lists a set of line numbers or line number ranges to be highlighted.
- `linenostart=199`: starts the line number count from 199.
- `anchorlinenos`: Configure anchors on line numbers. Valid values are true or false;
- `lineanchors`: Configure a prefix for the anchors on line numbers. Will be suffixed with -, so linking to the line number 1 with the option lineanchors=prefix adds the anchor prefix-1 to the page.
- `hl_inline` Highlight inside a <code> (inline HTML element) tag. Valid values are true or false. The code tag will get a class with name code-inline. New in v0.101.0

## Supported languages

### Go

```go
func (dc *DeploymentController) deleteDeployment(obj interface{}) {
	d, ok := obj.(*apps.Deployment)
	if !ok {
		tombstone, ok := obj.(cache.DeletedFinalStateUnknown)
		if !ok {
			utilruntime.HandleError(fmt.Errorf("couldn't get object from tombstone %#v", obj)
			return
		}
		d, ok = tombstone.Obj.(*apps.Deployment)
		if !ok {
			utilruntime.HandleError(fmt.Errorf("tombstone contained object that is not a Deployment %#v", obj))
			return
		}
	}
	klog.V(4).InfoS("Deleting deployment", "deployment", klog.KObj(d))
	dc.enqueueDeployment(d)
}
```

### Java

```java
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
```

### Python

```python
class Parrot:

    # class attribute
    species = "bird"

    # instance attribute
    def __init__(self, name, age):
        self.name = name
        self.age = age

# instantiate the Parrot class
blu = Parrot("Blu", 10)
woo = Parrot("Woo", 15)

# access the class attributes
print("Blu is a {}".format(blu.__class__.species))
print("Woo is also a {}".format(woo.__class__.species))

# access the instance attributes
print("{} is {} years old".format( blu.name, blu.age))
print("{} is {} years old".format( woo.name, woo.age))
```

### Shell

```bash
## this is a comment
$ echo this is a command
this is a command
```

### C

```c
#include <stdio.h>

/* Hello */
int main(void){
  printf("Hello, World!");
  return 0;
}
```

### Cpp

```cpp
// 'Hello World!' program

#include <iostream>

int main(){
  std::cout << "Hello World!" << std::endl;
  return 0;
}
```

### Scala

```scala
object HelloWorld with Application {
  Console.println("Hello, World!");
}
```

### Diff

```diff
highlight:
  enable: true
  line_number: true
-  auto_detect: false
+  auto_detect: true
```
### JS

```js
function helloWorld () {
  alert("Hello, World!")
}
```

### Kotlin

```kotlin
package hello

fun main(args: Array<String>) {
  println("Hello World!")
}
```

### C-Sharp

```cs
using System;
class HelloWorld{
  public static void Main(){
    System.Console.WriteLine("Hello, World!");
  }
}
```

### Html

```html
<html>
<body>
  Hello, World!
</body>
</html>
```

### PHP

```php
<?php
  echo 'Hello, World!';
?>
```

### no named code block

```
## edit the file
$vi foo.md
+++
date = "2014-09-28"
title = "creating a new theme"
+++

bah and humbug
:wq
```


## highlight shortcode

example:

```shortcode
{{</* highlight go "linenos=table,hl_lines=8 15-17,linenostart=199" */>}}
// ... code
{{</* /highlight */>}}
```

result:

{{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=199" >}}
// GetTitleFunc returns a func that can be used to transform a string to
// title case.
//
// The supported styles are
//
// - "Go" (strings.Title)
// - "AP" (see https://www.apstylebook.com/)
// - "Chicago" (see http://www.chicagomanualofstyle.org/home.html)
//
// If an unknown or empty style is provided, AP style is what you get.
func GetTitleFunc(style string) func(s string) string {
    switch strings.ToLower(style) {
    case "go":
        return strings.Title
    case "chicago":
        tc := transform.NewTitleConverter(transform.ChicagoStyle)
        return tc.Title
    default:
        tc := transform.NewTitleConverter(transform.APStyle)
        return tc.Title
    }
}
{{< /highlight >}}
