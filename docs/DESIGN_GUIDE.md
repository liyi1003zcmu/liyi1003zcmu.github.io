# 设计系统指南

全站视觉变量集中在 `src/styles/tokens.css`：

- `--color-*` 控制主色、背景、文本、边框和状态色；
- `--font-*` 控制中文正文、标题和代码字体；
- `--text-*`、`--leading-*` 控制字号与行高；
- `--space-*` 控制间距；
- `--radius-*` 与 `--shadow-subtle` 控制卡片外观；
- `--content-max` 和 `--article-max` 控制页面与文章宽度。

组件规则位于 `components.css`，版面规则位于 `layout.css`。修改变量优先于逐组件改色。第一版固定浅色主题；若以后增加深色模式，请在媒体查询或 `data-theme` 下覆盖同一组语义变量，并验证对比度与代码高亮。
