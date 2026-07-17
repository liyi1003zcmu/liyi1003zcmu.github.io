import type { CollectionEntry } from 'astro:content';

export const byNewest = <T extends { data: { publishDate: Date } }>(a: T, b: T) =>
  b.data.publishDate.valueOf() - a.data.publishDate.valueOf();

export const publishedPosts = (posts: CollectionEntry<'blog'>[]) =>
  posts.filter((post) => !post.data.draft).sort(byNewest);

export const entrySlug = (id: string) => id.replace(/\.(md|mdx)$/i, '');

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replaceAll('/', '-');

export const estimateReadingTime = (body = '') =>
  Math.max(1, Math.ceil(body.replace(/\s+/g, '').length / 500));
