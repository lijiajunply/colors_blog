// Dashboard Page

import { prisma } from "../../lib/prisma";

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

async function getDashboardStats() {
  const [articlesCount, commentsCount, usersCount, projectsCount, tagsCount] =
    await Promise.all([
      prisma.article.count(),
      prisma.comment.count(),
      prisma.user.count(),
      prisma.project.count(),
      prisma.tag.count(),
    ]);

  return {
    articlesCount,
    commentsCount,
    usersCount,
    projectsCount,
    tagsCount,
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const statCards: StatCardProps[] = [
    {
      title: "文章数量",
      value: stats.articlesCount,
      icon: "📝",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
    },
    {
      title: "评论数量",
      value: stats.commentsCount,
      icon: "💬",
      color:
        "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
    },
    {
      title: "用户数量",
      value: stats.usersCount,
      icon: "👥",
      color:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200",
    },
    {
      title: "项目数量",
      value: stats.projectsCount,
      icon: "🚀",
      color:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200",
    },
    {
      title: "标签数量",
      value: stats.tagsCount,
      icon: "🏷️",
      color: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          仪表盘
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          系统概览统计
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md transition-all hover:shadow-lg ${card.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{card.title}</p>
                <p className="mt-1 text-2xl font-bold">{card.value}</p>
              </div>
              <span className="text-3xl">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Articles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          最近文章
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  标题
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  作者
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  创建时间
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  浏览量
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Recent articles will be populated here */}
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  暂无文章数据
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
