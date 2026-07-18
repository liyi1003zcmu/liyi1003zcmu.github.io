import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const optionalPath = z.string().optional().default('');

const courses = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    semester: z.string().default('长期开放'),
    audience: z.string(),
    cover: optionalPath,
    featured: z.boolean().default(false),
    order: z.number().int().default(99),
    status: z.enum(['进行中', '即将开课', '已结束', '长期开放']).default('长期开放'),
    syllabus: z.array(z.string()).default([]),
    objectives: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([]),
    teachers: z.array(z.string()).default([]),
    updatedDate: z.coerce.date(),
  }),
});

const resourceTypes = [
  '课件',
  '实验指导',
  '示例代码',
  '作业说明',
  '项目资料',
  '阅读材料',
  '数据集',
  '软件工具',
  '视频链接',
  '其他',
] as const;
const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    course: z.string(),
    chapter: z.string().default('通用'),
    order: z.number().int().min(1).default(999),
    resourceType: z.enum(resourceTypes),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    fileUrl: optionalPath,
    externalUrl: optionalPath,
    fileSize: z.string().default(''),
    fileFormat: z.string().default(''),
    version: z.string().default('1.0'),
    public: z.boolean().default(true),
    featured: z.boolean().default(false),
    downloadable: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    cover: optionalPath,
    author: z.string().default('lameduck'),
    canonical: optionalPath,
    readingTime: z.number().positive().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    projectType: z.enum(['教材建设', '教学改革', '科研项目', '软件项目', '课程建设', '学生作品']),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    status: z.string(),
    featured: z.boolean().default(false),
    cover: optionalPath,
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    technologies: z.array(z.string()).default([]),
    role: z.string(),
    outcomes: z.array(z.string()).default([]),
    order: z.number().int().default(99),
  }),
});

const libraryTypes = ['论文', '阅读笔记', '个人整理', '电子书', '数据资料', '其他'] as const;
const library = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/library' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    materialType: z.enum(libraryTypes),
    authors: z.array(z.string()).default([]),
    publication: z.string().default(''),
    publicationYear: z.number().int().optional(),
    dateAdded: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cloudUrl: optionalPath,
    noteUrl: optionalPath,
    public: z.boolean().default(true),
    featured: z.boolean().default(false),
    order: z.number().int().default(99),
  }),
});

export const collections = { courses, resources, blog, projects, library };
