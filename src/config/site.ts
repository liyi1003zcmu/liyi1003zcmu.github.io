export const siteConfig = {
  name: '跛脚鸭的自说自话',
  shortName: '跛脚鸭的空间',
  author: '跛脚鸭教书匠',
  description: '小小教书匠一枚',
  email: '',
  githubUsername: 'liyi1003zcmu',
  repository: 'liyi1003zcmu.github.io',
  defaultSiteUrl: 'https://liyi1003zcmu.github.io',
  githubProfile: 'https://github.com/liyi1003zcmu',
  cloudDriveUrl: '',
  cloudDriveLabel: '打开个人资料网盘',
  language: 'zh-CN',
  timezone: 'Asia/Shanghai',
  dateFormat: 'YYYY-MM-DD',
  defaultImage: '/images/site/default-og.svg',
} as const;

export const navigation = [
  { href: '/', label: '首页' },
  { href: '/courses/', label: '课程' },
  { href: '/resources/', label: '资源' },
  { href: '/library/', label: '文献资料' },
  { href: '/blog/', label: '博客' },
  { href: '/projects/', label: '项目' },
  { href: '/about/', label: '关于' },
] as const;
