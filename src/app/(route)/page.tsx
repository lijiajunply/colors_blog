"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import "./Home.css";

interface Card {
  iconName: string;
  title: string;
  content: string;
  color: string;
  bgColor?: string;
  url?: string;
}

export default function HomePage() {
  const router = useRouter();
  const [logoHovered, setLogoHovered] = useState(false);

  // 辅助函数：生成淡色背景
  const getBgColor = (hex: string) => {
    return hex + "1A"; // 10% opacity
  };

  // 博客卡片数据
  const cards: Card[] = [
    {
      iconName: "fluent:pen-20-filled",
      title: "最新文章",
      content: "分享技术见解、生活感悟和学习心得，记录成长的每一步。",
      color: "#0071E3", // 蓝色
      bgColor: getBgColor("#0071E3"),
      url: "/Articles",
    },
    {
      iconName: "fluent:code-20-filled",
      title: "技术分享",
      content: "前端开发、后端技术、移动应用开发等领域的实践经验和教程。",
      color: "#34C759", // 绿色
      bgColor: getBgColor("#34C759"),
    },
    {
      iconName: "fluent:project-20-filled",
      title: "项目展示",
      content: "个人项目、开源贡献和实践案例，展示技术能力和创造力。",
      color: "#FF9500", // 橙色
      bgColor: getBgColor("#FF9500"),
      url: "/Projects",
    },
    {
      iconName: "fluent:person-20-filled",
      title: "关于我",
      content: "了解博主的背景、技能和兴趣爱好，建立更多连接。",
      color: "#FF375F", // 粉色
      bgColor: getBgColor("#FF375F"),
      url: "/About",
    },
    {
      iconName: "fluent:lightbulb-20-filled",
      title: "学习笔记",
      content: "读书心得、课程笔记和学习资源分享，共同成长进步。",
      color: "#AF52DE", // 紫色
      bgColor: getBgColor("#AF52DE"),
    },
    {
      iconName: "fluent:heart-20-filled",
      title: "生活感悟",
      content: "记录生活中的美好瞬间、旅行见闻和人生思考。",
      color: "#5E5CE6", // 靛蓝色
      bgColor: getBgColor("#5E5CE6"),
    },
  ];

  const scrollToAbout = (): void => {
    const element = document.getElementById("about");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleCardClick = (url?: string) => {
    if (url) {
      router.push(url);
    }
  };

  return (
    <div className="page-wrapper transition-colors duration-500">
      {/* 背景装饰 (Mesh Gradient) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="background-blob blob-1"></div>
        <div className="background-blob blob-2"></div>
        <div className="background-blob blob-3"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 pt-20 pb-10">
        <div className="container w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Hero Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="gradient-text">Colors Blog</span>
              </h1>
              <p className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                记录生活，分享知识。
              </p>
            </div>

            <div className="flex flex-col gap-4 max-w-2xl mx-auto lg:mx-0">
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                <span className="opacity-75 font-normal">
                  探索技术与生活的多彩世界
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button onClick={scrollToAbout} className="apple-btn-primary">
                <span>了解更多</span>
                <Icon
                  icon="fluent:arrow-down-20-filled"
                  className="ml-2 text-lg"
                />
              </button>

              <button
                onClick={() => router.push("/Articles")}
                className="apple-btn-secondary"
              >
                <span>阅读文章</span>
                <Icon
                  icon="fluent:book-open-20-filled"
                  className="ml-2 text-lg"
                />
              </button>
            </div>
          </div>

          {/* Hero Visual (Blog Logo Card) */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div
              className="relative w-72 h-72 md:w-96 md:h-96 group"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              {/* Floating Background Layers */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-[3rem] transform transition-all duration-700 ease-out ${logoHovered ? "rotate-12 scale-105" : "rotate-6"}`}
                style={{ opacity: 0.15 }}
              ></div>
              <div
                className={`absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-[3rem] transform transition-all duration-700 ease-out ${logoHovered ? "-rotate-12 scale-105" : "-rotate-6"}`}
                style={{ opacity: 0.15 }}
              ></div>

              {/* Main Logo Card */}
              <div
                className={`relative w-full h-full bg-white/90 dark:bg-white/10 backdrop-blur-3xl rounded-[3rem] flex items-center justify-center shadow-2xl border border-gray-200/50 dark:border-white/10 transition-all duration-700 ${logoHovered ? "scale-105" : "scale-100"}`}
              >
                <div className="w-3/5 h-3/5 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center transition-transform duration-700 ${logoHovered ? 'scale-110' : 'scale-100'}">
                    <span className="text-white text-4xl font-bold">B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section (About) */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="ml-3 text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              欢迎来到我的
              <span className="text-blue-600 dark:text-blue-400">个人博客</span>
              。
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
              这里有技术分享、生活感悟和项目展示，期待与你一起成长。
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`apple-bento-card group ${index === 0 || index === 4 ? "md:col-span-2 lg:col-span-2" : "md:col-span-1 lg:col-span-1"}`}
                onClick={() => handleCardClick(card.url)}
              >
                <div className="relative z-10 h-full flex flex-col justify-between p-6">
                  {/* Decorative Icon in Bottom Right */}
                  <div className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-15 transition-opacity duration-300">
                    <Icon
                      icon={card.iconName}
                      className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl transition-all"
                      style={{ color: card.color }}
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 pr-4">
                      {card.title}
                    </h3>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed opacity-90">
                      {card.content}
                    </p>
                  </div>

                  <div
                    className="mt-8 flex items-center text-base font-semibold transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: card.color }}
                  >
                    {card.url && <span>了解更多</span>}
                    {card.url && (
                      <Icon
                        icon="fluent:arrow-right-20-filled"
                        className="ml-2"
                      />
                    )}
                  </div>
                </div>

                {/* Hover Gradient Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(800px circle at top right, ${card.color}15, transparent 40%)`,
                  }}
                ></div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => router.push("/About")}
              className="apple-text-link text-lg group"
            >
              深入了解我们的故事
              <Icon
                icon="fluent:chevron-right-20-regular"
                className="inline-block ml-1 group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium">
            Copyright © 2023 - {new Date().getFullYear()} Colors Blog. All
            rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a
              href="/About"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              关于我
            </a>
            <a
              href="/Projects"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              项目展示
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <Icon icon="simple-icons:github" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
