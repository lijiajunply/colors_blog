// app/(route)/Projects/page.tsx
// 项目列表页 - 服务器渲染

import { projectService } from "@/services/projectService";
import { ProjectCard } from "./ProjectCard";

interface Project {
  id: number;
  title: string;
  description: string | null;
  url: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  tags: string[];
}

export default async function Projects() {
  // 从数据库获取活跃项目
  const projects = await projectService.getActiveProjects();

  return (
    <div className="min-h-[calc(100vh-64px)] transition-colors duration-500 font-sans bg-[#F5F5F7] dark:bg-black">
      {/* 顶部导航/标题区域 */}
      <header className="pt-20 pb-12 px-6 max-w-7xl mx-auto text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 opacity-0 translate-y-[-20px] animate-fade-in-down">
          {/* 个人博客 Logo */}
          <div className="relative w-24 h-24 rounded-[22px] overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-white/20">
            <span className="text-4xl font-bold text-white">B</span>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
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
          {(projects as Project[]).map((item, index) => (
            <ProjectCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              url={item.url}
              githubUrl={item.githubUrl}
              imageUrl={item.imageUrl}
              tags={item.tags}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
