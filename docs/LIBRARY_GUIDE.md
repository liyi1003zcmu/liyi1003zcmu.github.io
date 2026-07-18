# 文献资料清单使用说明

网站的“文献资料”页面位于 `/library/`，用于维护个人阅读论文、阅读笔记和整理资料的索引。电子文件继续保存在网盘，网站只记录目录和访问链接。

## 配置统一网盘入口

打开 `src/config/site.ts`，将 `cloudDriveUrl` 改为网盘共享目录地址：

```ts
cloudDriveUrl: 'https://你的网盘共享地址',
cloudDriveLabel: '打开个人资料网盘',
```

如果 `cloudDriveUrl` 留空，页面会显示“网盘地址待配置”，不会产生无效链接。

## 新增一条资料

在 `src/content/library/` 中复制现有示例文件并重命名，例如：

```text
src/content/library/2026-example-paper.md
```

文件头部格式如下：

```yaml
---
title: 论文或笔记标题
description: 一两句话说明内容和价值
materialType: 论文
authors: [作者一, 作者二]
publication: 期刊或会议名称
publicationYear: 2026
dateAdded: 2026-07-18
tags: [人工智能, 教学研究]
cloudUrl: https://该资料的网盘分享地址
noteUrl: /blog/对应笔记地址/
public: true
featured: false
order: 10
---
```

`materialType` 可填写：`论文`、`阅读笔记`、`个人整理`、`电子书`、`数据资料`、`其他`。

- `cloudUrl`：单项资料的网盘链接；没有单独分享链接时可以留空。
- `noteUrl`：网站内笔记或博客文章地址；没有时可以留空。
- `public`：设为 `false` 时不在网站显示。
- `featured`：设为 `true` 时优先排列。
- `order`：数字越小越靠前。

Markdown 正文可以记录摘要、阅读结论等内容，但当前列表页面主要显示文件头部的索引信息。

## 隐私提示

不要将网盘密码、私人访问令牌或版权受限文件直接提交到 GitHub。仅配置允许公开访问的分享链接，并根据资料版权决定是否对外公开。
