// app/(route)/Articles/page.tsx
// 服务器渲染页面，使用异步数据获取

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { articleService } from '@/services/articleService';

export default async function ArticlesPage() {
  // 从数据库获取文章列表，使用分页
  const { articles, total, page, pageSize, totalPages } = await articleService.getArticlesWithPagination(1, 6, {
    tags: true,
    author: true,
  });

  // 格式化日期
  const formatDate = (date: Date) => {
    return new Date(date).toISOString().split('T')[0];
  };

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
                  {article.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* 文章元信息 */}
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:clock-outline" className="w-4 h-4" />
                      <span>{article.readTime} 分钟</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:eye-outline" className="w-4 h-4" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:calendar-outline" className="w-4 h-4" />
                    <span>{formatDate(article.createdAt)}</span>
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
              disabled={page === 1}
            >
              <Icon icon="mdi:chevron-left" className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`px-4 py-2 border-t border-b border-gray-300 dark:border-white/20 text-sm font-medium transition-colors ${
                  page === pageNum
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                    : 'text-gray-700 bg-white dark:bg-[#1c1c1e] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10'
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              className="px-4 py-2 border border-gray-300 dark:border-white/20 text-sm font-medium rounded-r-lg text-gray-700 bg-white dark:bg-[#1c1c1e] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
              disabled={page === totalPages}
            >
              <Icon icon="mdi:chevron-right" className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}