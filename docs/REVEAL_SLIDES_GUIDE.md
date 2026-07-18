# Reveal.js 分章课件使用说明

本文说明如何为一门课程按章节顺序添加 Reveal.js 在线课件，并组织大量配图、示例代码和可下载附件。以下以课程 `c-programming` 为例；替换课程时只需改变课程 slug、章节目录和资源 frontmatter。

## 1. 工作方式

每章课件由两部分组成：

1. `public/slides/<课程 slug>/<章节>/` 保存浏览器直接访问的 Reveal.js 页面、图片和代码；
2. `src/content/resources/` 中对应的 Markdown 文件负责课程关联、章节名称、显示顺序、摘要和标签。

Astro 构建时会把 `public/` 原样复制到 `dist/`。因此：

- `public/slides/c-programming/ch01/index.html` 的线上地址是 `/slides/c-programming/ch01/`；
- HTML 中使用 `/vendor/reveal/...`、`./images/...` 等静态路径，不使用本机磁盘路径；
- 不要手工写入 `dist/`，因为每次构建都会重新生成它。

## 2. 推荐目录结构

```text
public/
├── vendor/reveal/
│   ├── reveal.css
│   ├── reveal.esm.js
│   ├── theme/white.css
│   └── plugin/
│       ├── highlight/
│       │   ├── highlight.esm.js
│       │   └── monokai.css
│       └── notes/notes.esm.js
└── slides/
    └── c-programming/
        ├── ch01/
        │   ├── index.html
        │   ├── images/
        │   │   ├── compiler-flow.webp
        │   │   └── terminal-output.webp
        │   ├── code/
        │   │   ├── hello.c
        │   │   └── input-output.c
        │   └── files/ch01-handout.pdf
        ├── ch02/index.html
        └── shared/
            ├── images/
            └── code/

src/content/resources/
├── c-programming-ch01-slides.md
└── c-programming-ch02-slides.md
```

命名规范：

- 课程目录使用课程 frontmatter 中的英文 `slug`；
- 章节目录固定使用两位数字：`ch01`、`ch02`、`ch03`；
- 图片和代码文件使用小写英文、数字和连字符；
- 一章独有的素材放在该章目录，共用素材放在课程的 `shared/`；
- 避免空格、中文标点、`#`、`?` 等容易破坏 URL 的字符。

## 3. 首次准备 Reveal.js

主网站不依赖第三方 CDN。首次添加课件时，在仓库根目录安装 Reveal.js：

```bash
npm install reveal.js
```

然后从 `node_modules/reveal.js/` 复制以下文件到 `public/vendor/reveal/`：

```text
node_modules/reveal.js/dist/reveal.css
node_modules/reveal.js/dist/reveal.esm.js
node_modules/reveal.js/dist/theme/white.css
node_modules/reveal.js/plugin/highlight/highlight.esm.js
node_modules/reveal.js/plugin/highlight/monokai.css
node_modules/reveal.js/plugin/notes/notes.esm.js
```

Windows PowerShell 示例：

```powershell
New-Item -ItemType Directory -Force public/vendor/reveal/theme
New-Item -ItemType Directory -Force public/vendor/reveal/plugin/highlight
New-Item -ItemType Directory -Force public/vendor/reveal/plugin/notes

Copy-Item node_modules/reveal.js/dist/reveal.css public/vendor/reveal/
Copy-Item node_modules/reveal.js/dist/reveal.esm.js public/vendor/reveal/
Copy-Item node_modules/reveal.js/dist/theme/white.css public/vendor/reveal/theme/
Copy-Item node_modules/reveal.js/plugin/highlight/highlight.esm.js public/vendor/reveal/plugin/highlight/
Copy-Item node_modules/reveal.js/plugin/highlight/monokai.css public/vendor/reveal/plugin/highlight/
Copy-Item node_modules/reveal.js/plugin/notes/notes.esm.js public/vendor/reveal/plugin/notes/
```

这些 Reveal.js 运行文件需要提交到 Git；`node_modules/` 本身不能提交。Reveal.js 升级后重新复制上述文件，并确保核心文件与插件版本一致。

## 4. 创建一章课件

建立目录：

```text
public/slides/c-programming/ch01/
├── index.html
├── images/
├── code/
└── files/
```

将以下模板保存为 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>第 1 章：程序设计与开发环境</title>
    <link rel="stylesheet" href="/vendor/reveal/reveal.css" />
    <link rel="stylesheet" href="/vendor/reveal/theme/white.css" />
    <link rel="stylesheet" href="/vendor/reveal/plugin/highlight/monokai.css" />
    <style>
      :root {
        --r-main-font: 'Microsoft YaHei', system-ui, sans-serif;
        --r-heading-font: 'Microsoft YaHei', system-ui, sans-serif;
        --r-main-color: #1d2b33;
        --r-heading-color: #24495d;
        --r-link-color: #315f78;
      }
      .reveal {
        font-size: 30px;
      }
      .reveal h1 {
        font-size: 2.1em;
      }
      .reveal h2 {
        font-size: 1.55em;
      }
      .reveal pre {
        width: 100%;
      }
      .reveal pre code {
        max-height: 520px;
        line-height: 1.45;
      }
      .reveal img {
        max-height: 68vh;
        object-fit: contain;
      }
      .reveal .caption {
        margin-top: 0.4rem;
        color: #5c6e78;
        font-size: 0.55em;
      }
      .two-column {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.2rem;
        align-items: center;
      }
      @media (max-width: 700px) {
        .two-column {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <section>
          <h1>第 1 章：程序设计与开发环境</h1>
          <p>C 程序设计基础</p>
        </section>

        <section>
          <h2>本章学习目标</h2>
          <ul>
            <li>说明源代码、编译器与可执行文件的关系；</li>
            <li>完成第一个 C 程序的编辑、编译和运行；</li>
            <li>根据编译器信息定位基础语法问题。</li>
          </ul>
        </section>

        <section>
          <h2>从源代码到运行结果</h2>
          <figure>
            <img
              src="./images/compiler-flow.webp"
              alt="源代码经过编译和链接生成可执行文件的流程图"
            />
            <figcaption class="caption">图 1：C 程序的基本构建流程</figcaption>
          </figure>
        </section>

        <section>
          <h2>第一个程序</h2>
          <pre><code class="language-c" data-trim data-line-numbers="1-6|3|4">
#include &lt;stdio.h&gt;

int main(void) {
  puts("Hello, world!");
  return 0;
}
          </code></pre>
          <p><a href="./code/hello.c" download>下载完整示例 hello.c</a></p>
        </section>

        <section>
          <h2>课堂练习</h2>
          <div class="two-column">
            <p>修改输出内容，并预测重新编译后的结果。</p>
            <img src="./images/terminal-output.webp" alt="终端中编译并运行 C 程序的示例输出" />
          </div>
          <aside class="notes">提醒学生区分“保存源文件”和“重新编译”。</aside>
        </section>

        <section>
          <h2>本章小结</h2>
          <p><a href="/courses/c-programming/">返回课程页面</a></p>
        </section>
      </div>
    </div>

    <script type="module">
      import Reveal from '/vendor/reveal/reveal.esm.js';
      import RevealHighlight from '/vendor/reveal/plugin/highlight/highlight.esm.js';
      import RevealNotes from '/vendor/reveal/plugin/notes/notes.esm.js';

      const deck = new Reveal({
        hash: true,
        controls: true,
        progress: true,
        transition: 'slide',
        plugins: [RevealHighlight, RevealNotes],
      });
      deck.initialize();
    </script>
  </body>
</html>
```

说明：

- Reveal.js 核心文件使用 `/vendor/...` 根路径；
- 本章素材使用 `./images/...`、`./code/...` 相对路径；
- `hash: true` 让每张幻灯片拥有可复制 URL；
- `data-line-numbers` 可分步骤强调代码行；
- 演示时按 `S` 打开演讲者备注；
- 有信息意义的图片必须提供准确 `alt`，纯装饰图片使用 `alt=""`。

## 5. 管理大量配图

### 格式和体积

- 照片和复杂截图优先使用 WebP 或压缩 JPEG；
- 透明图、界面细节可使用 WebP 或 PNG；
- 单张课堂图片建议控制在约 300 KB，确需高清放大时再提高；
- 不要提交相机原图、未压缩截图或几十 MB 的扫描件；
- 大型视频不要放进 Git，改用学校平台或对象存储链接。

同章图片：

```html
<img src="./images/loop-flow.webp" alt="循环结构中条件判断与循环体的执行顺序" />
```

课程共享图片：

```html
<img src="../shared/images/course-map.webp" alt="课程各章节之间的知识关系图" />
```

每张教学图片建议带图注。外部图片还应写明来源、作者和许可，或增加统一的“图片来源”页。不要热链接第三方网站图片，以免失效或产生授权问题。

图片很多时建议：

1. 每章建立独立 `images/`；
2. 文件名前加页序，例如 `s05-memory-layout.webp`；
3. 删除未使用图片；
4. 为展示另存合适尺寸，不只依赖 CSS 缩放；
5. 检查手机与投影分辨率下的清晰度。

## 6. 管理大量示例代码

建议同时保留：

- 幻灯片中的 `<pre><code>` 讲解片段，长度控制在一屏内；
- `code/` 中完整、可编译、可下载的源文件。

```html
<pre><code class="language-c" data-trim data-line-numbers="2-4|6-8">
int sum(const int values[], int length) {
  int result = 0;
  for (int i = 0; i &lt; length; ++i) {
    result += values[i];
  }
  return result;
}
</code></pre>

<p><a href="./code/array-sum.c" download>下载完整示例</a></p>
```

注意：

- HTML 内的 `<`、`>` 写成 `&lt;`、`&gt;`；
- 指定 `language-c`、`language-java`、`language-python` 等类名；
- 展示片段与下载文件应来自同一份已验证代码；
- 示例程序在提交前实际编译或运行；
- 写明依赖、运行命令、输入和预期输出；
- 不得包含账号、Token、学生信息或本机绝对路径。

多文件示例可在 `code/` 下建立子项目并提供 `README.md`，但不要提交依赖目录和编译产物。

## 7. 登记到资源集合并控制顺序

创建 `src/content/resources/c-programming-ch01-slides.md`：

```yaml
---
title: 第 1 章：程序设计与开发环境
description: 介绍 C 程序的编辑、编译、链接和运行过程，并包含第一个程序示例。
course: C 程序设计基础
chapter: 第 1 章
order: 10
resourceType: 课件
date: 2026-09-01
updatedDate: 2026-09-01
fileUrl: /slides/c-programming/ch01/
fileSize: 在线课件
fileFormat: Reveal.js
version: '1.0'
public: true
featured: true
downloadable: false
tags: [C 语言, 开发环境, 入门]
---
本课件为第 1 章课堂演示材料，包含配图、代码讲解和课堂练习。
```

第 2 章使用：

```yaml
chapter: 第 2 章
order: 20
fileUrl: /slides/c-programming/ch02/
```

推荐按 `10、20、30` 排序。以后要在第 1、2 章之间增加补充课件时，可使用 `order: 15`。

| 字段           | 课件用法                        |
| -------------- | ------------------------------- |
| `course`       | 同一课程所有资源必须完全一致    |
| `chapter`      | 页面显示的中文章节名称          |
| `order`        | 同一课程内的排序数字            |
| `fileUrl`      | Reveal.js 章节目录，以 `/` 结尾 |
| `fileFormat`   | 写 `Reveal.js`                  |
| `downloadable` | 在线课件固定为 `false`          |
| `public`       | `false` 时不进入公开资源列表    |
| `featured`     | 是否作为首页资源候选            |

存在 `fileUrl` 且 `downloadable: false` 时，网站按钮显示“在线查看课件”；普通文件设置 `downloadable: true` 后显示“下载站内文件”。

## 8. 更新课程章节目录

打开课程文件，例如 `src/content/courses/c-programming.md`。确保 frontmatter 中的 `syllabus` 与课件顺序一致：

```yaml
syllabus:
  - 程序设计与开发环境
  - 数据类型与表达式
  - 分支结构
  - 循环结构
```

正文可直接加入课件链接：

```markdown
## 章节目录

1. [程序设计与开发环境](/slides/c-programming/ch01/)
2. [数据类型与表达式](/slides/c-programming/ch02/)
3. [分支结构](/slides/c-programming/ch03/)
4. [循环结构](/slides/c-programming/ch04/)
```

同时更新课程的 `updatedDate`。资源页会根据 `course`、`order` 和日期排序；课程正文链接让学生直接进入每章课件。

## 9. 本地预览和检查

开发预览：

```bash
npm run dev
```

访问：

```text
http://localhost:4321/slides/c-programming/ch01/
```

正式发布前运行：

```bash
npm run format:check
npm run lint
npm run check
npm run build
npm run preview
```

再检查资源页、课程页和课件页。每章至少验证：

- 首页或课程页面能进入课件；
- 方向键、空格键、触屏操作正常；
- 图片全部显示且替代文本准确；
- 代码没有溢出，必要时拆成多页；
- 下载文件真实存在且可打开；
- 浏览器控制台没有 404；
- 手机和投影下字号、对比度合理；
- `S` 键能打开备注；
- 带 `#/` 的幻灯片 URL 可以直接打开。

## 10. Git 提交与发布

不要提交 `node_modules/`、`.astro/` 或 Astro 生成的 `dist/`。首次课件通常应提交：

```text
package.json
package-lock.json
public/vendor/reveal/
public/slides/c-programming/ch01/
src/content/resources/c-programming-ch01-slides.md
src/content/courses/c-programming.md
```

```bash
git add -A
git status
git commit -m "feat: add chapter 1 Reveal slides for C programming"
git push origin master
```

GitHub Actions 成功后访问：

```text
https://liyi1003zcmu.github.io/slides/c-programming/ch01/
```

## 11. 大文件与版本维护

- 小型图片、讲义和示例代码可提交仓库；
- 大型视频、数据集、安装包和高清素材包应放到学校平台、GitHub Releases、对象存储或 VPS；
- 每学期可更新原章节并提高 `version`，也可使用 `2026-fall/ch01/` 保存历史版本；
- 学生依赖旧链接时，优先保留旧目录并增加新版本目录；
- Reveal.js 升级应单独提交，便于兼容问题回退；
- 定期检查是否误加入压缩包、编译产物和临时文件。

## 12. 常见故障

### 课件没有样式

检查 `/vendor/reveal/reveal.css` 是否真实存在于 `public/vendor/reveal/`。GitHub Pages 区分文件名大小写。

### 图片本地可见、线上不可见

通常是大小写错误或使用了 `C:\...` 本机路径。章节图片应写 `./images/name.webp`。

### 没有“在线查看课件”按钮

确认资源条目包含：

```yaml
fileUrl: /slides/c-programming/ch01/
downloadable: false
public: true
```

### 章节顺序错误

确认同一课程的 `course` 完全一致，`order` 是数字，并采用 `10、20、30` 的递增方式。

### 代码过长或投影时太小

不要继续缩小字号。将代码拆成“接口—核心逻辑—完整实现”多页，并提供完整文件下载。

### 仓库因图片快速变大

压缩图片并清理未使用素材。已经进入 Git 历史的大文件不会因普通删除立即缩小仓库；不要在没有备份时贸然重写历史。
