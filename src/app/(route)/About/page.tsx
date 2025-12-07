// app/(route)/About/page.tsx
// 关于页面 - 服务器渲染

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f5f5f7] dark:bg-black transition-colors duration-500">
      {/* 页面头部 */}
      <header className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* 页面标题 */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            关于我
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            了解博主的背景、技能和兴趣爱好
          </p>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-5xl mx-auto px-6 pb-20">
        {/* 个人介绍卡片 */}
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-white/10 mb-12">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* 头像 */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-4xl font-bold text-white">B</span>
              </div>

              {/* 个人信息 */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  博主姓名
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                  全栈开发者 | 技术爱好者 | 终身学习者
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  热爱技术，专注于前端开发、后端开发和移动应用开发。喜欢分享知识，记录学习心得和实践经验。
                </p>

                {/* 社交媒体链接 */}
                <div className="flex justify-center md:justify-start gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="GitHub"
                  >
                    <Icon icon="mdi:github" className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Twitter"
                  >
                    <Icon icon="mdi:twitter" className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="LinkedIn"
                  >
                    <Icon icon="mdi:linkedin" className="w-5 h-5" />
                  </a>
                  <a
                    href="https://stackoverflow.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Stack Overflow"
                  >
                    <Icon icon="mdi:stackoverflow" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 技能部分 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* 技术技能 */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-white/10">
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Icon icon="mdi:code-tags" className="w-6 h-6 text-blue-500" />
                技术技能
              </h3>

              {/* 技能列表 */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "HTML5", level: "精通" },
                  { name: "CSS3", level: "精通" },
                  { name: "JavaScript", level: "精通" },
                  { name: "TypeScript", level: "熟练" },
                  { name: "React", level: "精通" },
                  { name: "Next.js", level: "熟练" },
                  { name: "Vue.js", level: "熟练" },
                  { name: "Node.js", level: "熟练" },
                  { name: "Python", level: "熟练" },
                  { name: "Git", level: "精通" },
                  { name: "MongoDB", level: "熟练" },
                  { name: "MySQL", level: "熟练" },
                ].map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between"
                  >
                    <span className="text-slate-600 dark:text-slate-300">
                      {skill.name}
                    </span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 兴趣爱好 */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-white/10">
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Icon icon="mdi:heart" className="w-6 h-6 text-pink-500" />
                兴趣爱好
              </h3>

              {/* 兴趣列表 */}
              <div className="space-y-3">
                {[
                  { name: "技术分享", icon: "mdi:share-variant" },
                  { name: "开源贡献", icon: "mdi:github" },
                  { name: "读书", icon: "mdi:book-open-variant" },
                  { name: "旅行", icon: "mdi:map" },
                  { name: "摄影", icon: "mdi:camera" },
                  { name: "音乐", icon: "mdi:music" },
                ].map((hobby) => (
                  <div key={hobby.name} className="flex items-center gap-3">
                    <Icon
                      icon={hobby.icon}
                      className="w-5 h-5 text-slate-500 dark:text-slate-400"
                    />
                    <span className="text-slate-600 dark:text-slate-300">
                      {hobby.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 教育经历 */}
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-white/10 mb-12">
          <div className="p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Icon icon="mdi:school" className="w-6 h-6 text-green-500" />
              教育经历
            </h3>

            {/* 教育列表 */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <Icon
                    icon="mdi:university"
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                    学士 - 计算机科学与技术
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-1">
                    某大学
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    2019 - 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 联系我 */}
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-white/10">
          <div className="p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Icon icon="mdi:email" className="w-6 h-6 text-red-500" />
              联系我
            </h3>

            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                如果你有任何问题、建议或合作意向，欢迎通过以下方式联系我
              </p>
              <a
                href="mailto:your-email@example.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                <Icon icon="mdi:email" className="w-5 h-5" />
                <span>发送邮件</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
