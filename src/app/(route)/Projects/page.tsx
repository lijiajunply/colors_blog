// app/(route)/Projects/page.tsx
// 项目列表页 - 服务器渲染

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { projectService } from '@/services/projectService';

export default async function Projects() {
  // 从数据库获取活跃项目
  const projects = await projectService.getActiveProjects();

  // 定义图标映射，根据项目标签动态显示图标
  const getProjectIcon = (tags: string[]) => {
    const iconMap: Record<string, string> = {
      'Next.js': 'mdi:react',
      'React': 'mdi:react',
      'Vue': 'mdi:vuejs',
      'JavaScript': 'mdi:language-javascript',
      'TypeScript': 'mdi:language-typescript',
      'Python': 'mdi:language-python',
      'Flask': 'mdi:flask',
      'Firebase': 'mdi:firebase',
      'HTML': 'mdi:language-html5',
      'CSS': 'mdi:language-css3',
      'Node.js': 'mdi:nodejs',
    };

    // 查找匹配的图标
    for (const tag of tags) {
      for (const [key, icon] of Object.entries(iconMap)) {
        if (tag.includes(key)) {
          return icon;
        }
      }
    }

    // 默认图标
    return 'mdi:code-braces';
  };

  // 打开外部链接
  const openUrl = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="page-container min-h-[calc(100vh-64px)] transition-colors duration-500 font-sans">
      {/* 顶部导航/标题区域 */}
      <header className="pt-20 pb-12 px-6 max-w-7xl mx-auto text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 animate-fade-in-down">
          {/* 个人博客 Logo */}
          <div className="relative w-24 h-24 rounded-[22px] overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-white/20">
            <span className="text-4xl font-bold text-white">B</span>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-semibold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              个人项目展示
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium tracking-wide">
              探索技术，创造价值
            </p>
          </div>
        </div>
      </header>

      {/* 内容区域：iCloud 风格 Bento Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((item, index) => (
            <div
              key={item.id}
              className="apple-card group relative p-6 cursor-pointer overflow-hidden transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => openUrl(item.githubUrl || item.url)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openUrl(item.githubUrl || item.url);
                }
              }}
            >
              {/* 卡片背景装饰 (光晕) */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-gray-200 dark:bg-white/5 rounded-full blur-3xl transition-opacity opacity-0 group-hover:opacity-100 dark:group-hover:opacity-30" />

              {/* 头部：图标与标题 */}
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-2xl text-gray-900 dark:text-white transition-transform group-hover:scale-110 duration-300">
                  <Icon icon={getProjectIcon(item.tags)} />
                </div>

                {/* 外部链接箭头的隐喻 */}
                <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-500/20 transition-all">
                  <Icon 
                    icon="lucide:arrow-up-right"
                    className="text-xl transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </div>

              {/* 内容 */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {item.description || '该项目暂无描述'}
                </p>
              </div>

              {/* 底部标签 (模拟 App Store 类别) */}
              <div className="relative z-10 mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                {item.tags.length > 0 ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300">
                    {item.tags[0]}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300">
                    未分类
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <style jsx global>{`
        /*
          Page Background
          这里定义页面的基础背景色
        */
        .page-container {
          background-color: #F5F5F7; /* Apple 浅灰背景 */
        }

        /*
          Apple Style Card
          核心设计：模仿 iOS Widget 或 Setting 卡片样式
        */
        .apple-card {
          outline: none;
          background-color: rgba(255, 255, 255, 0.7); /* 晶透白 */
          border-radius: 24px; /* iOS 风格的大圆角 */
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04),
                      0 4px 16px rgba(0, 0, 0, 0.02); /* 极简阴影 */
          border: 1px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(20px); /* 核心毛玻璃 */
          -webkit-backdrop-filter: blur(20px);

          /* 进场动画基础样式 */
          opacity: 0;
          transform: translateY(20px);
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .apple-card:hover {
          transform: scale(1.02); /* 弹性缩放 */
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08),
                      0 4px 8px rgba(0, 0, 0, 0.02);
          background-color: rgba(255, 255, 255, 0.9);
        }

        /*
          Dark Mode Overrides
          原生 CSS 适配暗色模式
        */
        .dark .page-container {
          background-color: #000000; /* 深邃黑 */
        }

        .dark .apple-card {
          background-color: rgba(28, 28, 30, 0.6); /* iOS 深灰色 #1C1C1E */
          border: 1px solid rgba(255, 255, 255, 0.08); /* 微弱的白色描边 */
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .dark .apple-card:hover {
          background-color: rgba(44, 44, 46, 0.8); /* 悬浮变亮 */
          border-color: rgba(255, 255, 255, 0.15);
        }

        /*
          Animations
          使用类似 iOS 的贝塞尔曲线
        */
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}