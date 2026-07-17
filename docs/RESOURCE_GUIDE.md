# 教学资源维护指南

复制 `docs/templates/resource.md` 到 `src/content/resources/`。`course` 使用课程短名称，`chapter` 使用稳定章节名；页面会据此生成筛选项。

- 小型 PDF、图片和示例代码可放入 `public/files`，`fileUrl` 写根路径，例如 `/files/courses/guide.pdf`。
- 只有确实允许下载时才设置 `downloadable: true`。
- 外部资源填写完整 `externalUrl`，页面会明确标记为外部链接。
- URL 为空时页面不会显示虚假下载按钮。
- 大型 PPT、视频、数据集和安装包不建议提交 Git。可迁移到 VPS、GitHub Releases、学校平台或对象存储，只需更新内容字段，无需改组件。

大型资源应同时记录格式、大小、版本与更新日期，并确认访问权限和长期可用性。
