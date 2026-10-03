---
title: 计算机图形学
slug: computer-graphics
shortTitle: 计算机图形学
description: 从图形系统、成像模型与 WebGL 编程出发，系统学习几何变换、观察、光照、纹理和光栅化。
semester: 2026 秋季
audience: 计算机相关专业三年级学生
featured: true
order: 2
status: 进行中
syllabus:
  - 课程概述
  - 图形系统和模型
  - 图形学编程
  - 交互和动画
  - 几何对象和变换
  - 观察
  - 光照和着色
  - 纹理映射
  - 使用帧缓存
  - 层级建模方法
  - 从几何到像素
objectives:
  [
    理解现代图形系统与成像模型,
    掌握几何变换和绘制流水线,
    使用 WebGL 与着色器实现交互式图形程序,
    分析视觉质量与运行效率的权衡,
  ]
prerequisites: [程序设计基础, 线性代数基础, 基础数据结构]
teachers: [lameduck]
updatedDate: 2026-10-03
---

## 课程简介

计算机图形学研究如何用计算机表示、生成和交互呈现视觉内容。本课程沿着“场景与模型 → 相机与投影 → 绘制流水线 → 屏幕像素”的主线，将数学模型、图形算法、WebGL 编程与视觉结果连接起来，并结合医学可视化等场景理解图形技术的实际用途。

## 适用对象

面向计算机相关专业三年级学生，也适合希望系统理解实时图形绘制基础的学习者。

## 课程目标

- 解释虚拟照相机、图形系统和可编程绘制流水线的工作方式；
- 掌握二维与三维几何变换、观察和投影；
- 理解光栅化、可见性、光照着色和纹理映射的核心算法；
- 使用 WebGL 和着色器完成交互式图形程序；
- 能够分析图像质量、实时性与实现复杂度之间的权衡。

## 先修要求

- 掌握一种程序设计语言及基本调试方法；
- 熟悉向量、矩阵等线性代数基础；
- 了解数组、栈、树等基础数据结构；
- 不要求预先掌握 Web 开发，课程中会结合 WebGL 需要补充 HTML 与 JavaScript 基础。

## 教学安排

课堂讲授、算法推导、WebGL 编程实验与综合课程设计并重。第 1–7 章及第 12 章为核心内容，第 8、9 章作为扩展内容，用于理解帧缓存高级特性和复杂场景组织方法。

## 章节目录

0. **课程概述**：课程基本情况介绍
   - [第〇讲：课程概述](/slides/computer-graphics/ch00/lecture-0.html)
1. **图形系统和模型**：成像模型、GPU 与可编程流水线
   - [第一讲：从虚拟世界到屏幕像素](/slides/computer-graphics/ch01/lecture-1-1.html)
   - [第二讲：图形成像系统概述](/slides/computer-graphics/ch01/lecture-1-2.html)
   - [第三讲：图形绘制系统概述](/slides/computer-graphics/ch01/lecture-1-3.html)
2. **图形学编程**：Sierpinski 镂垫、WebGL API、着色器程序与图元属性
   - [第一讲：从固定功能到可编程 GPU](/slides/computer-graphics/ch02/lecture-2-1.html)
   - [第二讲：数据如何进入 GPU，Shader 如何处理它](/slides/computer-graphics/ch02/lecture-2-2.html)
   - [第三讲：一个完整的 WebGL 程序如何运行](/slides/computer-graphics/ch02/lecture-2-3.html)
3. **交互和动画**：事件驱动输入、动画渲染循环与对象拾取
   - [第一讲：让图形动起来](/slides/computer-graphics/ch03/lecture-3-1.html)
   - [第二讲：让用户操纵图形](/slides/computer-graphics/ch03/lecture-3-2.html)
4. **几何对象和变换**：坐标系、仿射变换、齐次坐标、变换级联与四元数
5. **观察**：相机定位、观察矩阵、平行与透视投影、规范化视见体
6. **光照和着色**：Phong 光照模型、材质、光源、法向量与片元着色
7. **纹理映射**：纹理坐标、采样与滤波、环境映射与凹凸贴图
8. **使用帧缓存（介绍）**：Alpha 混合、FBO 离屏渲染、图像后处理与拾取
9. **层级建模方法（介绍）**：实例变换、树结构、递归遍历与场景图
10. **从几何到像素（教材第 12 章）**：裁剪、光栅化、Z-Buffer 与反走样

## 课件资源

第〇章课程概述以及第一至第三章课件均已发布，可从上方章节目录直接打开，也可在[教学资源页](/resources/)按“计算机图形学”筛选。第一章课件中的视频暂以封面图占位，外链就绪后补充。

## Demo 与配套代码

以下示例均可直接在浏览器中运行；“源码”链接指向示例使用的主 JavaScript 文件。公共依赖也可在线查看：[WebGL 工具](/slides/computer-graphics/code-demos/js/common/webgl-utils.js)、[着色器初始化](/slides/computer-graphics/code-demos/js/common/initShaders.js)和[向量矩阵工具](/slides/computer-graphics/code-demos/js/common/MVnew.js)。

### 第一章：基础图元与颜色

- 三角形：[运行 Demo](/slides/computer-graphics/code-demos/chap1/chap1-demo-1.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch01/triangle.js)
- 正方形：[运行 Demo](/slides/computer-graphics/code-demos/chap1/chap1-demo-2.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch01/square.js)
- 三角形与正方形：[运行 Demo](/slides/computer-graphics/code-demos/chap1/chap1-demo-3.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch01/trisquare.js)
- 彩色三角形：[运行 Demo](/slides/computer-graphics/code-demos/chap1/chap1-demo-4.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch01/trianglecolor.js)
- 非连续三角形与正方形：[运行 Demo](/slides/computer-graphics/code-demos/chap1/chap1-demo-5.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch01/trisquarenc.js)
- 非连续图元（WebGL 2 版本）：[运行 Demo](/slides/computer-graphics/code-demos/chap1/chap1-demo-6.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch01/trisquarencv2.js)

### 第二章：Sierpinski 镂垫与细分

- 随机点生成二维镂垫：[运行 Demo](/slides/computer-graphics/code-demos/chap2/chap2-demo-1.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch02/gasket-point.js)
- 三角形细分生成二维镂垫：[运行 Demo](/slides/computer-graphics/code-demos/chap2/chap2-demo-2.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch02/gasket-triangles.js)
- 彩色二维镂垫：[运行 Demo](/slides/computer-graphics/code-demos/chap2/chap2-demo-3.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch02/gasket-point-color.js)
- 三维镂垫：[运行 Demo](/slides/computer-graphics/code-demos/chap2/chap2-demo-4.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch02/gasket-3d.js)
- 三角形细分：[运行 Demo](/slides/computer-graphics/code-demos/chap2/chap2-demo-5.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch02/triangle-tessa.js)

### 第三章：动画与交互

- 自动旋转正方形：[运行 Demo](/slides/computer-graphics/code-demos/chap3/chap3-demo-1.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch03/rotatingSquare1.js)
- 用按钮、菜单和键盘控制旋转：[运行 Demo](/slides/computer-graphics/code-demos/chap3/chap3-demo-2.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch03/rotatingSquare2.js)
- 用滑块控制旋转速度：[运行 Demo](/slides/computer-graphics/code-demos/chap3/chap3-demo-3.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch03/rotatingSquare3.js)
- 单击绘制彩色点：[运行 Demo](/slides/computer-graphics/code-demos/chap3/chap3-demo-4.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch03/square.js)
- 拖动绘制彩色点：[运行 Demo](/slides/computer-graphics/code-demos/chap3/chap3-demo-5.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch03/squarem.js)
- 单击绘制三角带：[运行 Demo](/slides/computer-graphics/code-demos/chap3/chap3-demo-6.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch03/triangle.js)
- 两次点击绘制矩形：[运行 Demo](/slides/computer-graphics/code-demos/chap3/chap3-demo-7.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch03/cad1.js)
- 交互绘制多边形：[运行 Demo](/slides/computer-graphics/code-demos/chap3/chap3-demo-8.html) · [查看源码](/slides/computer-graphics/code-demos/js/ch03/cad2.js)

## 实验任务

实验将围绕 WebGL 基础、二维与三维变换、观察与投影、光照着色、纹理映射及基础光栅算法逐步展开。每次实验必须按照统一要求完成邮件与课程平台双渠道提交，并检查压缩包命名、目录结构和运行入口。

- [在线查看《2026 秋季计算机图形学实验提交规范》](/files/courses/computer-graphics/guides/experiment-submission.html)
- [下载 Markdown 源文件](/files/courses/computer-graphics/guides/experiment-submission.md)

## 课程设计

本学期课程设计主题为“纪念”，要求 3～4 人组队，综合运用场景建模、相机、光照、纹理、交互控制与图像输出，完成一个可运行、可演示并包含技术说明的三维应用。指南同时说明阶段任务、提交材料、AI 辅助开发及过程记录要求。

- [在线查看《2026 秋季计算机图形学课程设计指南》](/files/courses/computer-graphics/guides/course-design-guide.html)
- [下载 Markdown 源文件](/files/courses/computer-graphics/guides/course-design-guide.md)

## 参考资料

- Edward Angel、Dave Shreiner：《Interactive Computer Graphics: A Top-Down Approach with WebGL》；
- Donald Hearn、M. Pauline Baker、Warren Carithers：《Computer Graphics with OpenGL》；
- Khronos WebGL 官方文档及课程讲义。

## 更新记录

- 2026-10-03：发布第三章两份在线课件及课件内互动示例，新增按章节整理的第一至第三章 Demo 与配套代码。
- 2026-09-25：发布第二章三份在线课件及配套 WebGL 示例。
- 2026-09-19：发布实验提交规范和课程设计指南，完善课程主页相关说明。
- 2026-09-19：同步 2026 秋季课程结构，发布第〇章课程概述和第一章三份在线课件。
- 2026-03-05：建立课程条目。
