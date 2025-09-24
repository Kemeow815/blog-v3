---
title: Markdown 强调语法
description: Markdown 强调语法，如何使用星号和下划线进行文本强调
date: 2025-07-17 21:40:50
updated: 2025-07-17 21:45:50
categories: [技术分享]
tags: [Markodwn, 语法, 强调]
image: https://img.314926.xyz/images/2025/09/24/qiangdiao.webp
---

> 原文链接: https://markdown.com.cn/basic-syntax/emphasis.html

## Markdown 强调语法
通过将文本设置为粗体或斜体来强调其重要性。

### 粗体（Bold）
要加粗文本，请在单词或短语的前后各添加两个星号（asterisks）或下划线（underscores）。如需加粗一个单词或短语的中间部分用以表示强调的话，请在要加粗部分的两侧各添加两个星号（asterisks）。

| Markdown语法 | HTML | 预览效果 |
| :---: | :---: | :---: |
| `I just love **bold text**.` |	`I just love <strong>bold text</strong>.` |	I just love **bold text**. |
| `I just love __bold text__.` |	`I just love <strong>bold text</strong>.` |	I just love **bold text**. |
| `Love**is**bold` |	`Love<strong>is</strong>bold` |	Love **is** bold |

### 粗体（Bold）用法最佳实践
Markdown 应用程序在如何处理单词或短语中间的下划线上并不一致。为兼容考虑，在单词或短语中间部分加粗的话，请使用星号（asterisks）。

| ✅  Do this	 | ❌  Don't do this |
| :---: | :---: |
| `Love**is**bold` |	`Love__is__bold` |

### 斜体（Italic）
要用斜体显示文本，请在单词或短语前后添加一个星号（asterisk）或下划线（underscore）。要斜体突出单词的中间部分，请在字母前后各添加一个星号，中间不要带空格。

|Markdown语法 |	HTML |	预览效果 |
| :---: | :---: | :---: |
|`This text is ***really important***.`|`This text is <strong><em>really important</em></strong>.`|	This text is ***really important***.|
|`This text is ___really important___.`|	`This text is <strong><em>really important</em></strong>.` |	This text is ___really important___.|
|`This text is __*really important*__.` |	`This text is <strong><em>really important</em></strong>.` |	This text is __*really important*__. |
|`This text is **_really important_**.` |	`This text is <strong><em>really important</em></strong>.` |	This text is **_really important_**. |
|`This is really***very***important text.`|	`This is really<strong><em>very</em></strong>important text.`|	This is really ***very*** important text.|

### 粗体（Bold）和斜体（Italic）用法的最佳实践
Markdown 应用程序在处理单词或短语中间添加的下划线上并不一致。为了实现兼容性，请使用星号将单词或短语的中间部分加粗并以斜体显示，以示重要。

|✅  Do this|	❌  Don't do this|
| :---: | :---: |
|`This is really***very***important text.`|	`This is really___very___important text.`|