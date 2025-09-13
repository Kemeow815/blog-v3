---
title: 来将 Telegram 当音乐播放器吧！
description: 来将 Telegram 当音乐播放器吧！（寻找音乐、即时歌词、无损音乐不失真压缩）
date: 2025-05-15 15:00:50
updated: 2025-05-15 19:00:50
categories: [技术分享]
tags: [Telegram, Music, 音乐播放器]
image: https://cdn.jsdelivr.net/gh/kmfx/tuchuang@main/img/202505151341967.jpg
recommended: 7
---

## 来将 Telegram 当音乐播放器吧！

### 步骤一：到 [@music_v1bot](https://t.me/music_v1bot) 下载歌曲，并找到歌词

　　*输入指令： /search （你想要的歌名）*

![](https://cdn.jsdelivr.net/gh/kmfx/tuchuang@main/img/202505151340118.jpg)

### 步骤二：[下载 MT 管理器（点我）](https://telegra.ph/Mtmanager-02-10-2)

***<u>开启：下载好的歌词文件</u>***

![](https://cdn.jsdelivr.net/gh/kmfx/tuchuang@main/img/202505151343982.jpg)

### 步骤三：最右上角、搜索\>勾选正则化，替换（全部替换）

> *输入：\[(\d{2}:\d{2})\.\d+\]*
>
> *替换：$1*

::alert{type="warning"}
#title
注意："**$1**"后面要加一个空格(英文)。
::

![](https://cdn.jsdelivr.net/gh/kmfx/tuchuang@main/img/202505151346330.jpg)

> 代码作者：Aric

　　并将选取好的歌词，粘贴到音乐文件就完成了。

### [（我是范例-点我查看）](https://t.me/TESTLIVEUP)


<div style="text-align:center; font-weight:bold; text-decoration:underline;">须知</div>

::alert{type="info"}
#default
  使用：“.FLAC“格式的音乐文件，有时候不能正常显示歌词时间轴，是正常的，所以你可能要转换特定的格式，如.mp3，或是.ogg 或.m4a 的歌曲。
::

　　→ 如果你对音乐品质有极致追求，也有电脑 🖥️，我个人极度推荐使用 dBpowerAMP 这类型工具，将无损音乐格式转换成 m4a （水果的算法：QAAC 编码的音乐），目前可以[算是当今世界上最好的压缩算法，在通讯界享有盛名](https://telegra.ph/QAAC-%E5%8E%8B%E7%BC%A9%E9%9F%B3%E4%B9%90%E6%8A%80%E6%9C%AF%E8%AF%A6%E8%A7%A3-08-22)，且压缩后可以到接近百分之百还原。（甚至连对音乐/声学研究的职业工作者都讚叹不已）笔者强烈推荐，只叹手机没有类似的软件。专门转成 QAAC 编码的。

### [🖥️ 电脑版 dBpowerAMP 下载/教学请点我](https://t.me/haoruanfenxianggroup/369211)

![](https://cdn.jsdelivr.net/gh/kmfx/tuchuang@main/img/202505151358822.jpg)​

---

### 拓展

　　以上是原文内容，如果你改了音乐格式失去了原本的封面，歌手等等东西，一般来说是不妨碍什么的，如果你一定要改的话，可以使用[音乐标签](https://t.me/kemiaosw_me/394)。具体使用很简单，我不多赘述，给个视频你就大致明白了：​` `​

::video-embed
---
type: bilibili
id: BV1Jh4y1g7PV
---
::

　　同时，如果你想更换音乐格式，有很多种方法，以下给一个[网站](https://convertio.co/zh/flac-m4a/)。

---

### 原文链接

　　[https://telegra.ph/Telegram-Real-Time-sync-lyrics-05-14](https://telegra.ph/Telegram-Real-Time-sync-lyrics-05-14)

　　‍
