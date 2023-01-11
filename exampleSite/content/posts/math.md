---
author: Houmin
title: LaTeX support with KaTeX
date: 2023-01-05
description: A brief guide to setup KaTeX
math: true
---
[\\(\LaTeX\\)](https://www.latex-project.org/) is a high-quality typesetting system for the production of technical and scientific documentation. Due to its excellent math typesetting capabilities, \\(\TeX\\) became the de facto standard for the communication and publication of scientific documents, especially if these documents contain a lot of mathematical formulae. Designed and mostly written by Donald Knuth, the initial version was released in 1978. Dating back that far, \\(\LaTeX\\) has `pdf` as its primary output target and is not particularly well suited for producing HTML output for the Web. Fortunately, with [\\(\KaTeX\\)](https://katex.org/) there exists a fast and easy-to-use JavaScript library for \\(\TeX\\) math rendering on the web, which was integrated into the Cosmos theme.

Hugo Cosmos support [\\(\LaTeX\\)](https://www.latex-project.org/) using [\\(\KaTeX\\)](https://katex.org/) , you can include complex mathematical formulae into your web page, either inline or centred on its own line. Since \\(\KaTeX\\) relies on server side rendering, it produces the same output regardless of your browser or your environment. Formulae can be shown either inline or in display mode:

<!--more-->

## Inline formulae

The following code sample produces a text line with three inline formulae:

```tex
When \\(a \ne 0\\), there are two solutions to \\(ax^2 + bx + c= 0\\) and they are \\(x = {-b \pm \sqrt{b^2-4ac} \over 2a}\\).
```

When \\(a \ne 0\\), there are two solutions to \\(ax^2 + bx + c= 0\\) and they are \\(x = {-b \pm \sqrt{b^2-4ac} \over 2a}\\).

## Formulae in display mode

The following code sample produces an introductory text line followed by a formula numbered as `(1)` residing on its own line:

````markdown
The probability of getting \\(k\\) heads when flipping \\(n\\) coins is:
```math
\tag*{(1)} P(E) = {n \choose k} p^k (1-p)^{n-k}
```
````

The formula itself is written inside a [GLFM math block](https://docs.gitlab.com/ee/user/markdown.html#math). The above code fragment renders to:

The probability of getting \\(k\\) heads when flipping \\(n\\) coins is:

```math
\tag*{(1)}  P(E) = {n \choose k} p^k (1-p)^{n-k}
```

{{< notice warning >}}
`math` code blocks are only supported as of hugo version 0.93.

In case of hugo version 0.92 or lower, use this code snippet to display the formula:

```tex
$$
\tag*{(1)} P(E) = {n \choose k} p^k (1-p)^{n-k}
$$
```

$$
\tag*{(1)} P(E) = {n \choose k} p^k (1-p)^{n-k}
$$

{{< /notice >}}

{{< notice tip >}}
This [wiki page](https://en.wikibooks.org/wiki/LaTeX/Mathematics) provides in-depth information about typesetting mathematical formulae using the \\(\LaTeX\\) typesetting system.
{{< /notice >}}

## Activating and configuring \\(\KaTeX\\) support

### Auto activation

As soon as you use a `math` code block on your page, support of \\(\KaTeX\\) is automatically enabled.

### Manual activation (no `math` code block present or hugo 0.92 or lower)

If you want to use inline formulae and don't have a `math` code block present in your page which triggers auto activation, you need to manually activate \\(\KaTeX\\) support. The easiest way to do so is to add a `math` attribute to the frontmatter of your page and set it to `true`:

```md
---
math: true
---
```

If you use formulae in most of your pages, you can also enable sitewide \\(\KaTeX\\) support inside the Docsy theme. To do so update `config.toml`:

```toml
[params.katex]
  enable = true
```

Additionally, you can customize various \\(\KaTeX\\) options inside `config.toml`, if needed:

```toml
[params.katex]
# enable/disable KaTeX support
enable = true
# Element(s) scanned by auto render extension. Default: document.body
html_dom_element = "document.body"

[params.katex.options]
# If true (the default), KaTeX will throw a ParseError when it encounters an
# unsupported command or invalid LaTeX. If false, KaTeX will render unsupported
# commands as text, and render invalid LaTeX as its source code with hover text
# giving the error, in the color given by errorColor.
throwOnError = false
errorColor = "#CD5C5C"

# This is a list of delimiters to look for math, processed in the same order as
# the list. Each delimiter has three properties:
#   left:    A string which starts the math expression (i.e. the left delimiter).
#   right:   A string which ends the math expression (i.e. the right delimiter).
#   display: Whether math in the expression should be rendered in display mode.
[[params.katex.options.delimiters]]
  left = "$$"
  right = "$$"
  display = true
[[params.katex.options.delimiters]]
  left = "$"
  right = "$"
  display = false
[[params.katex.options.delimiters]]
  left = "\\("
  right = "\\)"
  display = false
[[params.katex.options.delimiters]]
  left = "\\["
  right = "\\]"
  display = true
```

For a complete list of options and their detailed description, have a look at the documentation of \\({\KaTeX}'s\\) [Rendering API options](https://katex.org/docs/autorender.html#api) and of \\({\KaTeX}'s\\) [configuration options](https://katex.org/docs/options.html).

$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$

$$
\varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } }
$$


{{< columns >}}
```tex
\begin{matrix}
   a & b \\
   c & d
\end{matrix}
```
<--->
```math
\begin{matrix}
   a & b \\
   c & d
\end{matrix}
```
{{< /columns >}}


{{< columns >}}
```math
\begin{array}{cc}
   a & b \\
   c & d
\end{array}
```
<--->
```tex
\begin{array}{cc}
   a & b \\
   c & d
\end{array}
```
{{< /columns >}}

{{< columns >}}
```tex
\begin{pmatrix}
   a & b \\
   c & d
\end{pmatrix}
```
<--->
```math
\begin{pmatrix}
   a & b \\
   c & d
\end{pmatrix}
```
{{< /columns >}}


{{< columns >}}
```math
\begin{bmatrix}
   a & b \\
   c & d
\end{bmatrix}
```
<--->
```tex
\begin{bmatrix}
   a & b \\
   c & d
\end{bmatrix}
```
{{< /columns >}}

{{< columns >}}
```tex
\begin{vmatrix}
   a & b \\
   c & d
\end{vmatrix}
```
<--->
```math
\begin{vmatrix}
   a & b \\
   c & d
\end{vmatrix}
```
{{< /columns >}}


{{< columns >}}
```math
\begin{Vmatrix}
   a & b \\
   c & d
\end{Vmatrix}
```
<--->
```tex
\begin{Vmatrix}
   a & b \\
   c & d
\end{Vmatrix}
```
{{< /columns >}}

{{< columns >}}
```tex
\begin{Bmatrix}
   a & b \\
   c & d
\end{Bmatrix}
```
<--->
```math
\begin{Bmatrix}
   a & b \\
   c & d
\end{Bmatrix}
```
{{< /columns >}}


{{< columns >}}
```math
\def\arraystretch{1.5}
   \begin{array}{c:c:c}
   a & b & c \\ \hline
   d & e & f \\
   \hdashline
   g & h & i
\end{array}
```
<--->
```tex
\def\arraystretch{1.5}
   \begin{array}{c:c:c}
   a & b & c \\ \hline
   d & e & f \\
   \hdashline
   g & h & i
\end{array}
```
{{< /columns >}}


{{< columns >}}
```tex
x = \begin{cases}
   a &\text{if } b \\
   c &\text{if } d
\end{cases}
```
<--->
```math
x = \begin{cases}
   a &\text{if } b \\
   c &\text{if } d
\end{cases}
```
{{< /columns >}}


{{< columns >}}
```math
\begin{rcases}
   a &\text{if } b \\
   c &\text{if } d
\end{rcases}=>...
```
<--->
```tex
\begin{rcases}
   a &\text{if } b \\
   c &\text{if } d
\end{rcases}=>...
```
{{< /columns >}}

{{< columns >}}
```tex
\begin{equation}
\begin{split}   a &=b+c\\
      &=e+f
\end{split}
\end{equation}
```
<--->
```math
\begin{equation}
\begin{split}   a &=b+c\\
      &=e+f
\end{split}
\end{equation}
```
{{< /columns >}}


{{< columns >}}
```math
\begin{align}
   a&=b+c \\
   d+e&=f
\end{align}
```
<--->
```tex
\begin{align}
   a&=b+c \\
   d+e&=f
\end{align}
```
{{< /columns >}}


{{< columns >}}
```tex
\begin{gather}
   a=b \\
   e=b+c
\end{gather}
```
<--->
```math
\begin{gather}
   a=b \\
   e=b+c
\end{gather}
```
{{< /columns >}}


{{< columns >}}
```math
\begin{alignat}{2}
   10&x+&3&y=2\\
   3&x+&13&y=4
\end{alignat}
```
<--->
```tex
\begin{alignat}{2}
   10&x+&3&y=2\\
   3&x+&13&y=4
\end{alignat}
```
{{< /columns >}}


## Reference

- [Supported TeX Functions by KaTeX](https://katex.org/docs/supported.html)