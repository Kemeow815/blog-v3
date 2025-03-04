---
title: Markdown-标题语法 | 技术分享
description: 记录 Markdown 语法的标题语法,方便学习和查找。
date: 2025-02-12 18:15:25
updated: 2025-02-12 18:27:25
image: https://cdn.jsdelivr.net/gh/kmfx/tuchuang@main/img/biaotiyufa.png
categories: [技术分享]
tags: [教程, markdown]
recommend: 2
---

原文位置: https://markdown.com.cn/basic-syntax/headings.html

# Markdown 标题语法
要创建标题，请在单词或短语前面添加井号 (#) 。`#` 的数量代表了标题的级别。例如，添加三个 `#` 表示创建一个三级标题 (`<h3>`) (例如：`### My Header`)。

| Markdown语法      | HTML                       | 预览效果                |
| ----------------- | -------------------------- | ----------------------- |
| `# Heading level 1` | &lt;h1&gt;Heading level 1&lt;/h1&gt; |<h1>Heading level 1</h1>|
| `## Heading level 2` | &lt;h2&gt;Heading level 1&lt;/h2&gt; | <h2>Heading level 2</h2> |
| `### Heading level 3` | &lt;h3&gt;Heading level 1&lt;/h3&gt;` | <h3>Heading level 3</h3> |
| `#### Heading level 4` | &lt;h4&gt;Heading level 1&lt;/h4&gt; | <h4>Heading level 4</h4> |
| `##### Heading level 5` | &lt;h5&gt;Heading level 1&lt;/h5&gt; | <h5>Heading level 5</h5> |
| `###### Heading level 6` | &lt;h6&gt;Heading level 1&lt;/h6&gt; | <h6>Heading level 6</h6> |

## 可选语法
还可以在文本下方添加任意数量的 == 号来标识一级标题，或者 -- 号来标识二级标题。

| Markdown语法                            | HTML                       | <div style="width:100px;">预览效果</div> |
| --------------------------------------- | -------------------------- | ---------------------------------------- |
| `Heading level 1`<br> `===============` | &lt;h1&gt;Heading level 1&lt;/h1&gt; | <h1>Heading level 1</h1>                 |
| `Heading level 2`<br>`---------------`   | &lt;h2&gt;Heading level 2&lt;/h2&gt; | <h2>Heading level 2</h2>                 |

## 最佳实践
不同的 **Markdown** 应用程序处理 `#` 和标题之间的空格方式并不一致。为了兼容考虑，请用一个空格在 `#` 和标题之间进行分隔。

| ✅  Do this           | ❌  Don't do this    |
| -------------------- | ------------------- |
| `# Here's a Heading` | `#Here's a Heading` |
