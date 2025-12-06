// app/projects/page.tsx
'use client'; // 因为使用了交互和状态，需要客户端组件

import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';

// 定义项目接口
interface ProjectItem {
  title: string;
  content: string;
  url: string;
  icon: string; // Iconify 图标标识符
  tag: string;  // 主要技术栈标签
}

// 项目数据 - 个人项目列表
const projects: ProjectItem[] = [
  {
    title: "个人博客系统",
    content: "基于 Next.js 13 开发的现代化个人博客，支持深色/浅色主题切换，响应式设计，包含文章、项目、关于等模块。",
    url: "https://github.com",
    icon: "mdi:blog-outline", 
    tag: "Next.js 13 + TypeScript"
  },
  {
    title: "待办事项应用",
    content: "使用 React 和 Firebase 开发的实时待办事项应用，支持多设备同步和分类管理。",
    url: "https://github.com",
    icon: "mdi:clipboard-check-outline",
    tag: "React + Firebase"
  },
  {
    title: "天气应用",
    content: "基于 Vue 3 开发的天气应用，使用 OpenWeatherMap API 获取实时天气数据，支持全球城市查询。",
    url: "https://github.com",
    icon: "mdi:weather-partly-cloudy",
    tag: "Vue 3 + TypeScript"
  },
  {
    title: "在线代码编辑器",
    content: "轻量级在线代码编辑器，支持多种编程语言，实时语法高亮和代码格式化。",
    url: "https://github.com",
    icon: "mdi:code-json",
    tag: "React + Monaco Editor"
  },
  {
    title: "个人作品集网站",
    content: "展示个人项目和技能的作品集网站，采用现代化设计风格，支持平滑滚动和交互动画。",
    url: "https://github.com",
    icon: "mdi:portfolio-outline",
    tag: "HTML + CSS + JavaScript"
  },
  {
    title: "聊天机器人",
    content: "基于 Python 和 Flask 开发的聊天机器人，支持自然语言处理和对话管理。",
    url: "https://github.com",
    icon: "mdi:robot-outline",
    tag: "Python + Flask"
  }
];

export default function Projects() {
  const openUrl = (url: string) => {
    window.open(url, '_blank');
  };

  // 简单的进场动画挂载检查
  useEffect(() => {
    document.body.classList.add('loaded');
  }, []);

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
              key={index}
              className="apple-card group relative p-6 cursor-pointer overflow-hidden transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => openUrl(item.url)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openUrl(item.url);
                }
              }}
            >
              {/* 卡片背景装饰 (光晕) */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-gray-200 dark:bg-white/5 rounded-full blur-3xl transition-opacity opacity-0 group-hover:opacity-100 dark:group-hover:opacity-30" />

              {/* 头部：图标与标题 */}
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-2xl text-gray-900 dark:text-white transition-transform group-hover:scale-110 duration-300">
                  <Icon icon={item.icon} />
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
                  {item.content}
                </p>
              </div>

              {/* 底部标签 (模拟 App Store 类别) */}
              <div className="relative z-10 mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300">
                  {item.tag}
                </span>
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