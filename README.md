# 自说自话的跛脚鸭的自说自话的空间

面向大学教师的个人教学门户，集中维护课程、教学资源、博客和项目记录。项目使用 Astro 生成纯静态文件，可部署到 GitHub Pages，也兼容 Cloudflare Pages。当前内容均为明确标注的演示样例，不代表作者真实课程、成果或联系方式。

## 技术栈

- Astro 7 静态输出、TypeScript strict
- Markdown / MDX 与 Content Collections
- 原生 CSS 设计系统，无 React/Vue/Svelte
- Pagefind 本地静态搜索（含中文扩展索引）
- RSS、sitemap、canonical、Open Graph、JSON-LD
- npm 与 Node.js 24 LTS

## 项目结构

```text
src/
├── components/       可复用界面组件
├── config/site.ts    集中的站点信息
├── content/          courses/resources/blog/projects
├── content.config.ts 内容 schema
├── layouts/          基础、文章、课程、项目布局
├── pages/            静态路由与动态内容路由
└── styles/           设计变量和分层样式
public/
├── favicon/
├── files/            小型教学文件
└── images/           site/courses/blog/projects
docs/                 内容、设计、部署与排错指南
```

空的图片子目录通过 `.gitkeep` 保留；大型二进制文件不应进入仓库。

## 环境与安装

需要 Node.js 24 和 npm。版本由 `.nvmrc` 固定。

```bash
nvm use
npm install
npm run dev
```

常用脚本：

- `npm run dev`：本地开发；
- `npm run build`：生成 `dist` 并建立 Pagefind 索引；
- `npm run preview`：预览正式构建，搜索在此模式可用；
- `npm run check`：Astro、TypeScript 与内容 schema 检查；
- `npm run lint`：Astro ESLint 检查；
- `npm run format` / `npm run format:check`：格式化或验证格式。

## 内容维护

站点信息在 `src/config/site.ts` 集中修改，正式域名可由 `SITE_URL` 覆盖。颜色、字体、间距、卡片和页面宽度在 `src/styles/tokens.css` 修改。

- 新增课程：复制 `docs/templates/course.md`，参阅 `docs/COURSE_GUIDE.md`。
- 新增资源：复制 `docs/templates/resource.md`，参阅 `docs/RESOURCE_GUIDE.md`。
- 新增 Reveal.js 分章课件：参阅 `docs/REVEAL_SLIDES_GUIDE.md`。
- 新增博客：复制 `docs/templates/blog.mdx`，参阅 `docs/BLOG_GUIDE.md`。
- 项目内容：复制 `docs/templates/project.md`。
- 总体命名、slug、图片与草稿规范见 `docs/CONTENT_GUIDE.md`。

## 搜索

`npm run build` 先生成 Astro 静态页面，再由 Pagefind 扫描 `dist`。开发模式尚无索引时，搜索页显示说明而不会报错；所有内容仍可从栏目浏览。搜索完全在访客设备上执行，不记录关键词。

## 文件管理

小型 PDF、图片和示例代码可放入 `public/files`。大型 PPT、视频、数据集和安装包不建议放入 Git 仓库，可迁移到 VPS、GitHub Releases、学校平台或对象存储。资源地址始终通过内容字段配置，不写死在组件中。

## GitHub Pages 部署

工作流位于 `.github/workflows/deploy-pages.yml`。创建或使用 `liyi1003zcmu.github.io` 仓库，推送到 `main`，再到 **Settings → Pages** 将 Source 设置为 **GitHub Actions**。完整步骤见 `docs/DEPLOY_GITHUB_PAGES.md`。

## Cloudflare Pages

连接同一仓库，选择 Astro，构建命令 `npm run build`，输出目录 `dist`，Node 22，并将 `SITE_URL` 设为正式域名。配置检查表见 `docs/DEPLOY_CLOUDFLARE_PAGES.md`。

## 自定义域名

设置 `SITE_URL=https://真实域名`。GitHub Pages 同时将 `public/CNAME.example` 复制为 `public/CNAME` 并替换内容；Cloudflare Pages 在控制台绑定。RSS、sitemap、canonical 和 Open Graph 会随 `SITE_URL` 自动更新。

## 隐私与后续扩展

第一版无登录、支付、表单、统计和第三方评论。以后可评估隐私友好的无 Cookie 统计、在线实验或教学平台入口，但应在启用前更新隐私说明，并保持核心内容在无 JavaScript 时可访问。

常见构建、搜索、路径与域名问题见 `docs/TROUBLESHOOTING.md`。
