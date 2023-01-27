---
author: Houmin
title: LaTeX support with KaTeX
date: 2023-01-05
math: true
---

Hugo Cosmos support [$\LaTeX$](https://www.latex-project.org/) using [$\KaTeX$](https://katex.org/) , you can include complex mathematical formulae into your web page, either inline or centred on its own line. Since $\KaTeX$ relies on server side rendering, it produces the same output regardless of your browser or your environment. Formulae can be shown either inline or in display mode.

<!--more-->

## Inline Mode

The following code sample produces a text line with three inline formulae:

```tex
When $a \ne 0$, there are two solutions to $ax^2 + bx + c= 0$ and they are $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$.
```

When $a \ne 0$, there are two solutions to $ax^2 + bx + c= 0$ and they are $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$.

## Display Mode

The following code sample produces an introductory text line followed by a formula numbered as `(1)` residing on its own line:

````markdown
The probability of getting $k$ heads when flipping $n$ coins is:
```math
\tag*{(1)} P(E) = {n \choose k} p^k (1-p)^{n-k}
```
````

The formula itself is written inside a [GLFM math block](https://docs.gitlab.com/ee/user/markdown.html#math). The above code fragment renders to:

The probability of getting $k$ heads when flipping $n$ coins is:

```math
\tag*{(1)}  P(E) = {n \choose k} p^k (1-p)^{n-k}
```

{{< notice warning >}}
`math` code blocks are only supported as of hugo version 0.93.

In case of hugo version 0.92 or lower, use this code snippet with `$$` delimiter to display the formula:

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
This [wiki page](https://en.wikibooks.org/wiki/LaTeX/Mathematics) provides in-depth information about typesetting mathematical formulae using the $\LaTeX$ typesetting system.
{{< /notice >}}

## Configuration

Hugo enable $\KaTeX$ automatically by default. If you want to use math formulae in your page, you need to manually activate $\KaTeX$ support. The easiest way to do so is to add a `math` attribute to the frontmatter of your page and set it to `true`:

```md
---
math: true
---
```

Additionally, you can disable $\KaTeX$ support inside `config.toml`, if needed:

```toml
[params.katex]
    # enable/disable KaTeX support, default true
    enable = false
```

Here is the default delimiter option for $\KaTeX$ in hugo cosmos:

```javascript
renderMathInElement(document.querySelector(`.post-content`), {
    delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
    ]
});
```
For a complete list of options and their detailed description, have a look at the documentation of ${\KaTeX}'s$ [Rendering API options](https://katex.org/docs/autorender.html#api)[^1] and of ${\KaTeX}'s$ [configuration options](https://katex.org/docs/options.html)[^2].

## Examples

```tex
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
```

```math
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
```

```tex
\begin{matrix}
   a & b \\
   c & d
\end{matrix}
```

```math
\begin{matrix}
   a & b \\
   c & d
\end{matrix}
```

```tex
\begin{array}{cc}
   a & b \\
   c & d
\end{array}
```

```math
\begin{array}{cc}
   a & b \\
   c & d
\end{array}
```

```tex
\begin{pmatrix}
   a & b \\
   c & d
\end{pmatrix}
```

```math
\begin{pmatrix}
   a & b \\
   c & d
\end{pmatrix}
```

```tex
\begin{bmatrix}
   a & b \\
   c & d
\end{bmatrix}
```

```math
\begin{bmatrix}
   a & b \\
   c & d
\end{bmatrix}
```

```tex
\begin{vmatrix}
   a & b \\
   c & d
\end{vmatrix}
```

```math
\begin{vmatrix}
   a & b \\
   c & d
\end{vmatrix}
```

```tex
\begin{Vmatrix}
   a & b \\
   c & d
\end{Vmatrix}
```

```math
\begin{Vmatrix}
   a & b \\
   c & d
\end{Vmatrix}
```

```tex
\begin{Bmatrix}
   a & b \\
   c & d
\end{Bmatrix}
```

```math
\begin{Bmatrix}
   a & b \\
   c & d
\end{Bmatrix}
```

```tex
\def\arraystretch{1.5}
   \begin{array}{c:c:c}
   a & b & c \\ \hline
   d & e & f \\
   \hdashline
   g & h & i
\end{array}
```

```math
\def\arraystretch{1.5}
   \begin{array}{c:c:c}
   a & b & c \\ \hline
   d & e & f \\
   \hdashline
   g & h & i
\end{array}
```

```tex
x = \begin{cases}
   a &\text{if } b \\
   c &\text{if } d
\end{cases}
```

```math
x = \begin{cases}
   a &\text{if } b \\
   c &\text{if } d
\end{cases}
```

```tex
\begin{rcases}
   a &\text{if } b \\
   c &\text{if } d
\end{rcases}=>...
```

```math
\begin{rcases}
   a &\text{if } b \\
   c &\text{if } d
\end{rcases}=>...
```

```tex
\begin{equation}
\begin{split}   a &=b+c\\
      &=e+f
\end{split}
\end{equation}
```

```math
\begin{equation}
\begin{split}   a &=b+c\\
      &=e+f
\end{split}
\end{equation}
```

```tex
\begin{align}
   a&=b+c \\
   d+e&=f
\end{align}
```

```math
\begin{align}
   a&=b+c \\
   d+e&=f
\end{align}
```

```tex
\begin{gather}
   a=b \\
   e=b+c
\end{gather}
```

```math
\begin{gather}
   a=b \\
   e=b+c
\end{gather}
```

```tex
\begin{alignat}{2}
   10&x+&3&y=2\\
   3&x+&13&y=4
\end{alignat}
```

```math
\begin{alignat}{2}
   10&x+&3&y=2\\
   3&x+&13&y=4
\end{alignat}
```


## Reference

- [Supported TeX Functions by KaTeX](https://katex.org/docs/supported.html)

[^1]: [Rendering API options](https://katex.org/docs/autorender.html#api)
[^2]: [configuration options](https://katex.org/docs/options.html)