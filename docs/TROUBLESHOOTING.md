# 常见故障

## PowerShell 无法运行 npm

若执行策略拦截 `npm.ps1`，可使用 `npm.cmd install`、`npm.cmd run build`；或在允许的终端运行标准 `npm` 命令。

## 内容校验失败

运行 `npm run check`，根据报错文件核对 `src/content.config.ts`。常见原因是日期格式不正确、枚举值拼写不一致或 YAML 缩进错误。

## 开发模式搜索不可用

Pagefind 在正式静态页面生成后建索引，所以 `npm run dev` 会显示说明。运行 `npm run build` 后用 `npm run preview` 查看完整搜索。

## 部署后路径错误

用户站点仓库不设置 `base`。确认仓库名为 `liyi1003zcmu.github.io`，内部链接以 `/` 开头，Pages Source 为 GitHub Actions。

## canonical 域名不正确

检查构建环境的 `SITE_URL`。修改域名后重新构建，核对页面源码、`rss.xml` 与 `sitemap-0.xml`。
