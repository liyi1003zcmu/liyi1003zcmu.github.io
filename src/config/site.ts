export const siteConfig = {
  name: '自说自话的跛脚鸭的自说自话的空间',
  shortName: '跛脚鸭的教学空间',
  author: 'lameduck',
  description: '自说自话的跛脚鸭说的话',
  email: '',
  githubUsername: 'liyi1003zcmu',
  repository: 'liyi1003zcmu.github.io',
  defaultSiteUrl: 'https://liyi1003zcmu.github.io',
  githubProfile: 'https://github.com/liyi1003zcmu',
  language: 'zh-CN',
  timezone: 'Asia/Shanghai',
  dateFormat: 'YYYY-MM-DD',
  defaultImage: '/images/site/default-og.svg',
} as const;

export const navigation = [
  { href: '/', label: '首页' },
  { href: '/courses/', label: '课程' },
  { href: '/resources/', label: '资源' },
  { href: '/blog/', label: '博客' },
  { href: '/projects/', label: '项目' },
  { href: '/about/', label: '关于' },
] as const;
