# 内容维护总览

内容位于 `src/content/courses`、`resources`、`blog` 和 `projects`。每个文件由 YAML frontmatter 与 Markdown/MDX 正文组成，字段由 `src/content.config.ts` 校验；字段不匹配时 `npm run check` 和构建会失败，避免发布半成品。

## 通用规范

- 文件名与 slug 使用小写英文、数字和连字符，如 `ai-literacy.md`。
- 图片放在 `public/images/<类型>/`，正文使用以 `/images/` 开头的根路径，并提供准确 `alt`。
- 小文件放在 `public/files/`；大型文件使用外部地址。
- 日期写作 `YYYY-MM-DD`，默认时区为 `Asia/Shanghai`。
- 复制 `docs/templates/` 中的模板开始新内容，删除所有演示说明并据实填写。
- 发布前运行 `npm run format:check`、`npm run lint`、`npm run check` 和 `npm run build`。

博客草稿设置 `draft: true`。草稿会被所有生产列表、详情路由、分类、标签、归档和 RSS 排除。
