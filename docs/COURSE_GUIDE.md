# 课程维护指南

复制 `docs/templates/course.md` 到 `src/content/courses/<slug>.md`。文件名和 `slug` 保持一致，`order` 越小排序越靠前，`featured` 控制首页展示。

`status` 只能是“进行中、即将开课、已结束、长期开放”。`syllabus`、`objectives`、`prerequisites` 与 `teachers` 是 YAML 数组。没有封面时省略 `cover`，页面会显示 CSS 占位，不会请求失效图片。

正文按课程简介、适用对象、课程目标、先修要求、教学安排、章节目录、课件资源、实验任务、作业与项目、参考资料和更新记录组织。章节或进度更新后同步修改 `updatedDate`。配套资料在资源集合中通过 `course` 字段关联。
