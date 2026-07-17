# 部署到 GitHub Pages

项目已提供 `.github/workflows/deploy-pages.yml`，在 `main` push 或手动触发时执行 `npm ci`、内容和类型检查、构建、Pagefind 索引及原子部署。

## 首次设置

1. 在 GitHub 创建或使用 `liyi1003zcmu.github.io` 仓库。
2. 将本项目提交并推送到 `main`。
3. 打开仓库 **Settings → Pages**。
4. 将 **Source** 设置为 **GitHub Actions**。
5. 打开 **Actions** 查看构建与部署状态。
6. 成功后访问 <https://liyi1003zcmu.github.io>。

若工作流失败，先打开失败步骤查看日志。构建失败时不会上传或部署新的 `dist`，不会出现新旧混合内容。

## 自定义域名

将 `public/CNAME.example` 复制为 `public/CNAME`，替换为真实域名，并把仓库或工作流环境中的 `SITE_URL` 设置为完整 HTTPS 地址。不要保留示例域名。
