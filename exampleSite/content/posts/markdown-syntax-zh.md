---
author: "Houmin"
title: "Markdown 指南"
date: "2019-11-24"
tags: ["markdown", "hugo"]
math: true
---

Markdown 是由 [John Gruber](https://en.wikipedia.org/wiki/John_Gruber) 和 [Aaron Swartz](https://en.wikipedia.org/wiki/Aaron_Swartz) 于 2004 年创建的一种文本标记语言，目的是让人们使用「直观的、便于阅读的纯文本格式」书写文档。

Markdown 设计之初没有明确的语法规范，随着 Markdown 被更多的人使用，这种不规范直接导致了多种 Markdown 语法的变体，Markdown 解析器也变得混乱，无法统一。 开源平台 GitHub 做为 Markdown 文档的直接支持者已经无法忍受这种情况，2017 年 GitHub 发布了 Markdown GFM（GitHub Flavored Markdown）[^1] 标准规范，并且修改了 GitHub 的 Markdown 解析器以规范用户行为。

本文主要讲解在使用 Hugo Cosmos 时会用到的绝大多数 Markdown 语法。

## 区块元素

### 标题

在行首使用 1-6 个 `#` 字符，对应于标题级别 1-6。例如:

```markdown
# 这是 H1

## 这是 H2

### 这是 H3

#### 这是 H4
```

当井号 `#`和标题文本之间没有空格时，各 Markdown 应用程序的处理方式是不一样的。为了兼容考虑，请在井号和标题文本之间添加一个空格。

### 段落和换行符

要创建段落，请使用空白行将一行或多行文本进行分隔。

I really like using Markdown.

**换行（Line Break）用法的最佳实践**

除非段落在列表中，否则不要用空格（spaces）或制表符（tabs）缩进段落。在一行的末尾添加两个或多个空格，然后按回车键（return），即可创建一个换行（line break）或新行 `<br>`。

几乎每个 Markdown 应用程序都支持两个或多个空格进行换行 (称为 “结尾空格（trailing whitespace）”) 的方式，但这是有争议的，因为很难在编辑器中直接看到空格，并且很多人在每个句子后面都会有意或无意地添加两个空格。由于这个原因，你可能需要使用除结尾空格以外的其它方式来进行换行。如果你所使用的 Markdown 应用程序 支持 HTML 的话，你可以使用 HTML 的 `<br>` 标签来实现换行。

为了兼容性，请在行尾添加“结尾空格”或 HTML 的 `<br>` 标签来实现换行。

还有两种其他方式我并不推荐使用。CommonMark 和其它几种轻量级标记语言支持在行尾添加反斜杠 (`\`) 的方式实现换行，但是并非所有 Markdown 应用程序都支持此种方式，因此从兼容性的角度来看，不推荐使用。并且至少有两种轻量级标记语言支持无须在行尾添加任何内容，只须键入回车键 `return` 即可实现换行。


### 引用

使用标记符 `>` 对内容进行引用。

```markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.


> This is another blockquote with one paragraph. There is three empty line to seperate two blockquote.
（这是另一个只有一个段落的引用。用三个空行来分隔两个引用。）
```

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.


> This is another blockquote with one paragraph. There is three empty line to seperate two blockquote.
（这是另一个只有一个段落的引用。用三个空行来分隔两个引用。）

块引用可以嵌套。在要嵌套的段落前添加一个 `>>` 符号。

```markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
```

> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

块引用可以包含其他 Markdown 格式的元素。并非所有元素都可以使用，你需要进行实验以查看哪些元素有效。

> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.
> ![Spock](https://octodex.github.com/images/spocktocat.png)


### 列表

使用 `*` 创建一个无序列表，标记符号 `*` 可以替换为 `+` 或 `-`。

#### 有序列表

要创建有序列表，请在每个列表项前添加数字并紧跟一个英文句点。数字不必按数学顺序排列，但是列表应当以数字 1 起始。

1. First item
2. Second item
3. Third item
4. Fourth item

#### 无序列表

要创建无序列表，请在每个列表项前面添加破折号 (-)、星号 (*) 或加号 (+) 。缩进一个或多个列表项可创建嵌套列表。

- First item
- Second item
- Third item
- Fourth item

### 任务列表

任务列表是将项目标记为 `[]` 或 `[x]`（未完成或已完成）的列表。

```markdown
- [ ] a task list item
  - [x] list syntax required
  - [ ] normal **formatting**, @mentions, #1234 refs
- [ ] incomplete
- [x] completed
```

- [ ] a task list item
  - [x] list syntax required
  - [ ] normal **formatting**, @mentions, #1234 refs
- [ ] incomplete
- [x] completed


### 代码块

在多行代码的前一行及后一行使用三个反引号（~ 键）将其标记为代码块。同时第一行反引号后面，输入所属语言实现代码高亮。

````markdown
Here's an example:

```js
function test() {
  console.log("notice the blank line before this function?");
}
```

syntax highlighting:
```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```
````


### 数学公式

当你需要在编辑器中插入数学公式时，可以使用两个美元符 `$$` 包裹 TeX 或 LaTeX 格式的数学公式来实现。

如：一个简单的数学公式，求圆的面积。

```markdown
$$
S=\pi r^2
$$
```

$$
S=\pi r^2
$$


### 表格

```markdown
|学号|姓名|分数|
|---|---|---|
|小明|男|75|
|小红|女|79|
|小陆|男|92|
```

|学号|姓名|分数|
|---|---|---|
|小明|男|75|
|小红|女|79|
|小陆|男|92|

通过在标题行中包含冒号（`：`），可以将该列中的文本定义为左对齐，右对齐或居中对齐：

``` markdown
| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |
```
最左侧的冒号表示左对齐的列（默认即为左对齐）；最右边的冒号表示右对齐的列；两侧的冒号表示中心对齐的列。

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |


### 脚注

```markdown
在这段文字后添加一个脚注[^footnote]。

[^footnote]: 这里是脚注的内容。
```

在这段文字后添加一个脚注[^footnote]。

[^footnote]: 这里是脚注的内容。

> footnote 可以是任意英文字符；
> 脚注的内容可以放在文章的任意位置（一般放最后）。


### 水平分隔线

可用三个以上的**减号、星号、底线**在一空行中建立一条分隔线，中间可以插入空格，但行内不能有其他东西。

```markdown
---
***
___
```

***

为了兼容性，请在分隔线的前后均添加空白行。

---

## 区段元素

### 链接

Markdown 支持两种链接样式：**行内链接**和**参考链接**。在这两种样式中，链接文本都由 [方括号] 分隔。

**行内链接**：

要创建行内链接，请在链接文本的右方括号后立即使用一组常规括号 `()`。在括号内，将您想要链接指向的 URL 以及链接的可选标题放在引号中。例如：

``` markdown
This is [an example](http://example.com/) inline link.

[This link](http://example.net/) has no title attribute.
```

This is [an example](http://example.com/) inline link.

[This link](http://example.net/) has no title attribute.


### 图片

图片的语法与链接相似，但需要一个额外的 ` !` 字符，放在链接开始之前。插入图像的语法如下：

``` markdown
![Spock](https://octodex.github.com/images/spocktocat.png)
```

![Spock](https://octodex.github.com/images/spocktocat.png)


### 强调

Markdown 把星号（\*）和下划线（\_）作为强调标示符。用一个 \* 或 \_ 包裹的文本将被一个 HTML `<em>` 标签包裹。例如：

```markdown
*斜体*
_斜体_
```
Markdown 应用程序在如何处理单词或短语中间的下划线上并不一致。为兼容考虑，在单词或短语中间部分加粗的话，请使用星号（asterisks \*）。

要在原本会用作强调定界符的位置产生文字星号，您可以将其反斜杠转义：

```markdown
\*this text is surrounded by literal asterisks\*
```

\*this text is surrounded by literal asterisks\*

### 粗体

用两个 `*` 将使其包裹的内容被 HTML `<strong>` 标签包裹。例如：

```markdown
**double asterisks**
```

**double asterisks**


### 加粗斜体

```markdown
***加粗斜体***
```

***加粗斜体***

### 代码

要表明行内代码，请用反引号引起来（`）。与预格式化的代码块不同，行内代码指示正常段落中的代码。例如：

``` markdown
Use the `printf()` function.
```

Use the `printf()` function.



### 删除线

```markdown
~~删除线~~
```

`~~Mistaken text.~~` becomes ~~Mistaken text.~~



### 下划线

下划线由原始 HTML 驱动。

`<u>Underline</u>` becomes <u>Underline</u>.


### 下标

```markdown
下标：H<sub>2</sub>O
```

下标：H<sub>2</sub>O

### 上标

```markdown
上标：O<sup>2</sup>
```

上标：O<sup>2</sup>


## HTML

您可以使用 HTML 样式化纯 Markdown 不支持的内容。例如，使用 `<span style="color:red">this text is red</span>` 来添加<span style="color:red">红色文本</span>。


### 嵌入内容

某些网站提供了基于 iframe 的嵌入代码，例如：

```Markdown
<iframe height='265'scrolling='no'
title='Fancy Animated SVG Menu'
src='http://codepen.io/jeangontijo/embed/OxVywj/?height=265&theme-id=0&default-tab=css,result&embed-version=2'
frameborder='no'allowtransparency='true'allowfullscreen='true'
style='width: 100%;'></iframe>
```

<iframe height='265'scrolling='no'
title='Fancy Animated SVG Menu'
src='http://codepen.io/jeangontijo/embed/OxVywj/?height=265&theme-id=0&default-tab=css,result&embed-version=2'
frameborder='no'allowtransparency='true'allowfullscreen='true'
style='width: 100%;'></iframe>


[^1]: https://github.github.com/gfm


## 参考资料：
- https://www.markdownguide.org