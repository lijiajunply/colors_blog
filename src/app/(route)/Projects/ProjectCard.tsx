'use client';

import { Icon } from '@iconify/react';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string | null;
  url: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  tags: string[];
  index: number;
}

export function ProjectCard({ 
  id, 
  title, 
  description, 
  url, 
  githubUrl, 
  imageUrl, 
  tags, 
  index 
}: ProjectCardProps) {
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
  const openUrl = (url: string | null | undefined) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div
      key={id}
      className="relative p-6 cursor-pointer overflow-hidden transition-all duration-300 bg-white/70 dark:bg-[rgba(28,28,30,0.6)] rounded-2xl border border-white/40 dark:border-white/8 shadow-sm dark:shadow-lg backdrop-blur-md hover:scale-102 hover:shadow-md dark:hover:shadow-xl hover:bg-white/90 dark:hover:bg-[rgba(44,44,46,0.8)] hover:border-white/60 dark:hover:border-white/15 opacity-0 translate-y-5 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => openUrl(githubUrl || url)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          openUrl(githubUrl || url);
        }
      }}
    >
      {/* 卡片背景装饰 (光晕) */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-gray-200 dark:bg-white/5 rounded-full blur-3xl transition-opacity opacity-0 group-hover:opacity-100 dark:group-hover:opacity-30" />

      {/* 头部：图标与标题 */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-2xl text-gray-900 dark:text-white transition-transform hover:scale-110 duration-300">
          <Icon icon={getProjectIcon(tags)} />
        </div>

        {/* 外部链接箭头的隐喻 */}
        <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/20 transition-all">
          <Icon 
            icon="lucide:arrow-up-right"
            className="text-xl transform hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
          />
        </div>
      </div>

      {/* 内容 */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
          {description || '该项目暂无描述'}
        </p>
      </div>

      {/* 底部标签 (模拟 App Store 类别) */}
      <div className="relative z-10 mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
        {tags.length > 0 ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300">
            {tags[0]}
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300">
            未分类
          </span>
        )}
      </div>
    </div>
  );
}