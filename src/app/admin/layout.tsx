// Admin Layout

import React from 'react';
import { getCurrentUser, isAdmin } from '../../lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Check if user is authenticated and is admin
  const user = await getCurrentUser();
  const isAdminUser = await isAdmin();

  if (!user || !isAdminUser) {
    redirect('/login');
  }

  const navigation = [
    {
      name: '仪表盘',
      href: '/admin',
      icon: '📊',
    },
    {
      name: '文章管理',
      href: '/admin/articles',
      icon: '📝',
    },
    {
      name: '评论管理',
      href: '/admin/comments',
      icon: '💬',
    },
    {
      name: '用户管理',
      href: '/admin/users',
      icon: '👥',
    },
    {
      name: '项目管理',
      href: '/admin/projects',
      icon: '🚀',
    },
    {
      name: '标签管理',
      href: '/admin/tags',
      icon: '🏷️',
    },
    {
      name: '系统设置',
      href: '/admin/settings',
      icon: '⚙️',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg lg:translate-x-0 transform transition-transform">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
        </div>

        <nav className="px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 bg-white dark:bg-gray-800 shadow-sm lg:px-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Admin Dashboard</h2>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                欢迎，{user.name || '管理员'}
              </span>
              <Link
                href="/api/auth/signout"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
              >
                退出登录
              </Link>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}