'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { useTheme } from 'next-themes'
import { useAuth } from '@/hooks/useAuth'
import './MainLayout.css'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { isAuthenticated, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 点击外部关闭抽屉菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerVisible && !(e.target as HTMLElement).closest('.mobile-menu')) {
        setDrawerVisible(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [drawerVisible])

  const handleSelect = (key: string) => {
    router.push(key)
    setDrawerVisible(false)
  }

  const handleThemeSelect = (key: 'light' | 'dark' | 'system') => {
    setTheme(key)
  }

  const toCentre = () => {
    router.push('/Centre')
  }

  const handleLogout = () => {
    logout()
    setDrawerVisible(false)
    router.push('/')
  }

  // 检查当前是否是个人中心路由
  const isCentreRoute = pathname === '/Centre'

  // 主题选项
  const themeOptions = [
    { key: 'light' as const, label: '浅色', icon: 'solar:sun-2-bold' },
    { key: 'dark' as const, label: '深色', icon: 'solar:moon-stars-bold' },
    { key: 'system' as const, label: '跟随系统', icon: 'basil:desktop-outline' },
  ]

  // 关于我们选项
  const aboutUsOptions = [
    { label: '社团简介', key: '/About' },
    { label: '结构架构', key: '/Structure' },
    { label: '合作组织', key: '/OtherOrg' },
    { label: '竞赛资源', key: '/Article/Competitions' },
    { label: '发展历史', key: '/History' },
  ]

  // 社团动态选项
  const communityOptions = [
    { label: '近期活动', key: '/Event' },
    { label: '技术博客', key: '/Blog' },
    { label: 'iOS App', key: '/Tools' },
    { label: '开源项目', key: '/Projects' },
  ]

  return (
    <div className="app-container min-h-screen flex flex-col transition-colors duration-500 ease-out">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b text-lg ${
          isScrolled
            ? 'bg-white/75 dark:bg-[#161617]/75 border-gray-200/50 dark:border-white/10 backdrop-blur-2xl'
            : 'bg-white/0 dark:bg-black/0 border-transparent backdrop-blur-sm'
        }`}
      >
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2 group z-50">
            <img
              src="/assets/iOS_Club_LOGO.png"
              alt="iOS Club"
              className="w-7 h-7 opacity-90 group-hover:opacity-100 transition-opacity rounded-sm"
            />
            <span className="font-semibold text-xl tracking-tight text-gray-900 dark:text-[#f5f5f7]">
              iOS Club of XAUAT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* 关于我们 Dropdown */}
            <div className="relative group">
              <button className="nav-link">
                关于我们
                <Icon icon="material-symbols:keyboard-arrow-down-rounded" className="text-gray-400" width="16" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-[#1c1c1e] rounded-xl shadow-lg border border-gray-200 dark:border-white/20 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                <div className="py-2">
                  {aboutUsOptions.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleSelect(item.key)}
                      className="block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-150 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 社团动态 Dropdown */}
            <div className="relative group">
              <button className="nav-link">
                社团动态
                <Icon icon="material-symbols:keyboard-arrow-down-rounded" className="text-gray-400" width="16" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-[#1c1c1e] rounded-xl shadow-lg border border-gray-200 dark:border-white/20 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                <div className="py-2">
                  {communityOptions.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleSelect(item.key)}
                      className="block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-150 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-4 w-px bg-gray-300 dark:bg-white/20 mx-3"></div>

            {/* Theme Toggle Dropdown */}
            <div className="relative group">
              <button className="icon-btn" title="切换主题">
                <Icon
                  icon={resolvedTheme === 'dark' ? 'solar:moon-stars-bold' : 'solar:sun-2-bold'}
                  className="w-4 h-4"
                />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1c1c1e] rounded-xl shadow-lg border border-gray-200 dark:border-white/20 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                <div className="py-2">
                  {themeOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => handleThemeSelect(option.key)}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-150 flex items-center gap-2 ${
                        theme === option.key
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <Icon icon={option.icon} className="w-4 h-4" />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Auth Button */}
            {!isCentreRoute ? (
              <button className="auth-btn ml-3" onClick={() => router.push('/login')}>
                登录
              </button>
            ) : (
              <button className="auth-btn ml-3" onClick={toCentre}>
                个人中心
              </button>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2 -mr-2 text-gray-800 dark:text-white"
            onClick={() => setDrawerVisible(!drawerVisible)}
          >
            <Icon
              icon={drawerVisible ? 'material-symbols:close-rounded' : 'material-symbols:menu-rounded'}
              width="24"
            />
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {drawerVisible && (
        <div className="mobile-menu fixed inset-0 z-40 bg-[#fbfbfd] dark:bg-black pt-14 px-4 md:hidden flex flex-col">
          <div className="flex flex-col space-y-3 animate-fade-in">
            {/* Mobile Links Group - 关于 */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-2">关于</div>
              {aboutUsOptions.map((item) => (
                <Link
                  key={item.key}
                  href={item.key}
                  className="mobile-link"
                  onClick={() => setDrawerVisible(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Links Group - 探索 */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-2">探索</div>
              {communityOptions.map((item) => (
                <Link
                  key={item.key}
                  href={item.key}
                  className="mobile-link"
                  onClick={() => setDrawerVisible(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth & Theme */}
            <div className="pt-3 mt-auto border-t border-gray-200 dark:border-white/10">
              {!isCentreRoute ? (
                <button
                  className="w-full py-2 bg-[#0071e3] text-white font-medium rounded-lg mb-3 active:scale-95 transition-transform"
                  onClick={() => {
                    router.push('/login')
                    setDrawerVisible(false)
                  }}
                >
                  登录 / 注册
                </button>
              ) : (
                <button
                  className="w-full py-2 bg-[#0071e3] text-white font-medium rounded-lg mb-3 active:scale-95 transition-transform"
                  onClick={handleLogout}
                >
                  退出登录
                </button>
              )}

              {/* Theme Selection */}
              <div className="w-full space-y-1">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-2">主题</div>
                <div className="flex space-x-1">
                  {themeOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => handleThemeSelect(option.key)}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-1.5 text-xs ${
                        theme === option.key
                          ? 'bg-[#0071e3] text-white'
                          : 'bg-gray-100 dark:bg-[#1c1c1e] text-gray-900 dark:text-white opacity-70 hover:opacity-90'
                      }`}
                    >
                      <Icon icon={option.icon} className="w-3 h-3" />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full bg-[#fbfbfd] dark:bg-[#1c1c1e]/70">
        {children}
      </main>
    </div>
  )
}