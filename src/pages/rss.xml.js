import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { entrySlug, publishedPosts } from '@/lib/content';
import { siteConfig } from '@/config/site';

export async function GET(context) {
  const posts = publishedPosts(await getCollection('blog'));
  return rss({
    title: `${siteConfig.shortName} · 博客`,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${entrySlug(post.id)}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>zh-CN</language>',
  });
}
