# 接入 Cloudflare Pages

本项目保持纯静态输出，不包含 Cloudflare Functions 或服务器适配器。

## 配置步骤

1. 在 Cloudflare 控制台进入 **Workers & Pages**，创建 Pages 项目并连接 GitHub。
2. 选择本网站仓库，Production branch 设为 `main`。
3. Framework preset 选择 **Astro**。
4. Build command：`npm run build`。
5. Build output directory：`dist`。
6. Root directory：仓库根目录。
7. Node.js：24，与 `.nvmrc` 一致。
8. 添加 `SITE_URL`，值为正式 `https://项目名.pages.dev` 或真实自定义域名。
9. 保存后检查生产部署；分支和 Pull Request 可产生预览部署。

## 检查表

- [ ] `main` 是生产分支
- [ ] 构建命令与输出目录正确
- [ ] Node 版本为 24
- [ ] `SITE_URL` 是正式域名且包含 `https://`
- [ ] 首页、RSS、sitemap、canonical 与分享图均使用预期域名
- [ ] 预览部署不被误当作 canonical 正式站点

绑定自定义域名时在 Cloudflare 控制台操作并同步更新 `SITE_URL`。不要让同一自定义域名同时指向 GitHub Pages 和 Cloudflare Pages；切换正式平台前先规划 DNS、canonical 与回滚时间窗。
