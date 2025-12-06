// app/(route)/Articles/page.tsx
// 服务器渲染页面，不需要 'use client' 指令

import { Icon } from '@iconify/react';
import Link from 'next/link';

// 定义文章接口
interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  views: number;
}

// 模拟文章数据 - 实际项目中可以从数据库或API获取
const articles: Article[] = [
  {
    id: '1',
    title: 'Next.js 13 新特性全面解析',
    excerpt: '深入探讨 Next.js 13 的 App Router、Server Components、Streaming 等核心新特性，以及如何在项目中应用它们。',
    date: '2023-12-15',
    category: '前端开发',
    tags: ['Next.js', 'React', 'TypeScript'],
    author: '博主',
    readTime: '12 分钟',
    views: 1250
  },
  {
    id: '2',
    title: 'React 18 并发特性实战指南',
    excerpt: '学习如何使用 React 18 的并发特性，包括 Suspense、startTransition、useDeferredValue 等，提升应用性能和用户体验。',
    date: '2023-12-10',
    category: '前端开发',
    tags: ['React', 'JavaScript', '性能优化'],
    author: '博主',
    readTime: '15 分钟',
    views: 980
  },
  {
    id: '3',
    title: 'TypeScript 高级类型使用技巧',
    excerpt: '掌握 TypeScript 的高级类型特性，包括条件类型、映射类型、模板字面量类型等，编写更安全、更灵活的代码。',
    date: '2023-12-05',
    category: '前端开发',
    tags: ['TypeScript', 'JavaScript', '类型系统'],
    author: '博主',
    readTime: '10 分钟',
    views: 850
  },
  {
    id: '4',
    title: 'CSS Grid 布局完全指南',
    excerpt: '从基础到高级，全面学习 CSS Grid 布局，掌握网格布局的各种属性和技巧，打造复杂的响应式设计。',
    date: '2023-11-30',
    category: '前端开发',
    tags: ['CSS', '响应式设计', '布局'],
    author: '博主',
    readTime: '8 分钟',
    views: 720
  },
  {
    id: '5',
    title: 'Node.js 性能优化最佳实践',
    excerpt: '学习 Node.js 性能优化的各种技巧，包括代码优化、数据库优化、缓存策略等，提升应用的响应速度和吞吐量。',
    date: '2023-11-25',
    category: '后端开发',
    tags: ['Node.js', '性能优化', '后端'],
    author: '博主',
    readTime: '14 分钟',
    views: 680
  },
  {
    id: '6',
    title: 'Git 高级命令和工作流',
    excerpt: '深入学习 Git 的高级命令和工作流，包括分支管理、合并策略、变基、标签管理等，提升团队协作效率。',
    date: '2023-11-20',
    category: '开发工具',
    tags: ['Git', '版本控制', '工作流'],
    author: '博主',
    readTime: '9 分钟',
    views: 590
  }
];

export default function ArticlesPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f5f5f7] dark:bg-black transition-colors duration-500">
      {/* 页面头部 */}
      <header className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* 页面标题 */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            技术文章
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            分享技术见解、学习心得和实践经验，与你一起成长
          </p>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 dark:border-white/10"
            >
              {/* 文章卡片内容 */}
              <div className="p-6">
                {/* 文章分类标签 */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {article.category}
                  </span>
                </div>

                {/* 文章标题 */}
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
                  <Link
                    href={`/Articles/${article.id}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h2>

                {/* 文章摘要 */}
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* 文章标签 */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 文章元信息 */}
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:clock-outline" className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:eye-outline" className="w-4 h-4" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:calendar-outline" className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 分页控件 */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
            <button
              className="px-4 py-2 border border-gray-300 dark:border-white/20 text-sm font-medium rounded-l-lg text-gray-500 bg-white dark:bg-[#1c1c1e] hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
              disabled
            >
              <Icon icon="mdi:chevron-left" className="w-4 h-4" />
            </button>
            <button
              className="px-4 py-2 border-t border-b border-gray-300 dark:border-white/20 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              1
            </button>
            <button
              className="px-4 py-2 border-t border-b border-gray-300 dark:border-white/20 text-sm font-medium text-gray-700 bg-white dark:bg-[#1c1c1e] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
            >
              2
            </button>
            <button
              className="px-4 py-2 border-t border-b border-gray-300 dark:border-white/20 text-sm font-medium text-gray-700 bg-white dark:bg-[#1c1c1e] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
            >
              3
            </button>
            <button
              className="px-4 py-2 border border-gray-300 dark:border-white/20 text-sm font-medium rounded-r-lg text-gray-700 bg-white dark:bg-[#1c1c1e] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
            >
              <Icon icon="mdi:chevron-right" className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}