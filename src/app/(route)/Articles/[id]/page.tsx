// app/(route)/Articles/[id]/page.tsx
// 文章详情页 - 服务器渲染

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articleService } from '@/services/articleService';

export default async function ArticleDetailPage({ params }: { params: { id: string } }) {
  // 将 string 类型的 id 转换为 number
  const articleId = parseInt(params.id);
  
  // 如果 id 不是有效的数字，返回404
  if (isNaN(articleId)) {
    notFound();
  }
  
  // 从数据库获取文章详情
  const article = await articleService.getArticleById(articleId, {
    tags: true,
    author: true,
  });
  
  // 如果文章不存在，返回404
  if (!article) {
    notFound();
  }
  
  // 更新文章浏览量
  await articleService.incrementArticleViews(articleId);
  
  // 格式化日期
  const formatDate = (date: Date) => {
    return new Date(date).toISOString().split('T')[0];
  };
  
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f5f5f7] dark:bg-black transition-colors duration-500">
      {/* 文章详情内容 */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* 返回按钮 */}
        <div className="mb-8">
          <Link
            href="/Articles"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Icon icon="mdi:arrow-left" className="w-4 h-4" />
            <span>返回文章列表</span>
          </Link>
        </div>
        
        {/* 文章头部 */}
        <header className="mb-10">
          {/* 文章分类 */}
          <div className="mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {article.category}
            </span>
          </div>
          
          {/* 文章标题 */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {article.title}
          </h1>
          
          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Icon icon="mdi:calendar-outline" className="w-4 h-4" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:clock-outline" className="w-4 h-4" />
              <span>{article.readTime} 分钟</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:eye-outline" className="w-4 h-4" />
              <span>{article.views + 1} 次阅读</span> {/* +1 是因为刚刚更新了浏览量 */}
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:account-outline" className="w-4 h-4" />
              <span>{article.author?.name || '未知作者'}</span>
            </div>
          </div>
        </header>
        
        {/* 文章内容 */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {/* 文章封面图 - 如果有封面图则显示 */}
          {article.coverImage && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          {/* 文章正文 - 使用 dangerouslySetInnerHTML 渲染 HTML 内容 */}
          <div 
            className="text-slate-700 dark:text-slate-200 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* 文章标签 */}
          <div className="mt-10 flex flex-wrap gap-2">
            {article.tags?.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}