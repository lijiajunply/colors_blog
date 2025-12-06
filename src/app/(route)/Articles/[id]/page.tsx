// app/(route)/Articles/[id]/page.tsx
// 文章详情页 - 服务器渲染

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 定义文章接口
interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  views: number;
  coverImage: string;
}

// 模拟文章数据 - 实际项目中可以从数据库或API获取
const articles: Article[] = [
  {
    id: '1',
    title: 'Next.js 13 新特性全面解析',
    content: `
      <h2>Next.js 13 简介</h2>
      <p>Next.js 13 是 Vercel 公司推出的 React 框架的重大更新，带来了许多激动人心的新特性和改进。本文将全面解析 Next.js 13 的核心新特性，包括 App Router、Server Components、Streaming 等。</p>
      
      <h2>App Router</h2>
      <p>Next.js 13 引入了全新的 App Router，采用了基于文件系统的路由机制，与传统的 Pages Router 相比，提供了更灵活的路由结构和更好的性能。</p>
      
      <h3>主要特点</h3>
      <ul>
        <li>嵌套路由和布局</li>
        <li>服务器组件支持</li>
        <li>并行路由和拦截器</li>
        <li>简化的 API 路由</li>
      </ul>
      
      <h2>Server Components</h2>
      <p>Server Components 是 Next.js 13 的核心特性之一，允许在服务器上渲染 React 组件，减少客户端 JavaScript 体积，提高页面加载性能。</p>
      
      <h3>优势</h3>
      <ul>
        <li>减少客户端 JavaScript 体积</li>
        <li>更好的 SEO 表现</li>
        <li>直接访问服务器资源</li>
        <li>改进的初始加载性能</li>
      </ul>
      
      <h2>Streaming</h2>
      <p>Next.js 13 支持 Streaming 渲染，可以将页面内容分块发送到客户端，提高用户感知的加载速度。</p>
      
      <h2>结论</h2>
      <p>Next.js 13 带来了许多重大改进，特别是 App Router 和 Server Components，为 React 应用开发带来了新的可能性。如果你正在寻找一个现代化的 React 框架，Next.js 13 绝对值得尝试。</p>
    `,
    date: '2023-12-15',
    category: '前端开发',
    tags: ['Next.js', 'React', 'TypeScript'],
    author: '博主',
    readTime: '12 分钟',
    views: 1250,
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80'
  },
  {
    id: '2',
    title: 'React 18 并发特性实战指南',
    content: `
      <h2>React 18 简介</h2>
      <p>React 18 是 React 框架的重要更新，引入了并发渲染机制，为 React 应用带来了更好的性能和用户体验。</p>
      
      <h2>并发特性</h2>
      <p>React 18 的并发特性允许 React 同时处理多个任务，根据优先级进行调度，提高应用的响应速度和用户体验。</p>
      
      <h3>主要特性</h3>
      <ul>
        <li>Suspense</li>
        <li>startTransition</li>
        <li>useDeferredValue</li>
        <li>Automatic Batching</li>
      </ul>
      
      <h2>实战案例</h2>
      <p>本文将通过实际案例，演示如何在 React 18 应用中使用这些并发特性，提升应用性能和用户体验。</p>
    `,
    date: '2023-12-10',
    category: '前端开发',
    tags: ['React', 'JavaScript', '性能优化'],
    author: '博主',
    readTime: '15 分钟',
    views: 980,
    coverImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  }
];

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  // 查找对应的文章
  const article = articles.find((a) => a.id === params.id);
  
  // 如果文章不存在，返回404
  if (!article) {
    notFound();
  }
  
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
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:clock-outline" className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:eye-outline" className="w-4 h-4" />
              <span>{article.views} 次阅读</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:account-outline" className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
          </div>
        </header>
        
        {/* 文章内容 */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {/* 文章封面图 */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* 文章正文 - 使用 dangerouslySetInnerHTML 渲染 HTML 内容 */}
          <div 
            className="text-slate-700 dark:text-slate-200 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* 文章标签 */}
          <div className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}