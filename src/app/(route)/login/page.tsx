'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { signIn } from 'next-auth/react';
import './Login.css';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('邮箱或密码错误');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('登录失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: string) => {
    setIsLoading(true);
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className="login-page transition-colors duration-500">
      {/* Background Decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="background-blob blob-1"></div>
        <div className="background-blob blob-2"></div>
        <div className="background-blob blob-3"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="login-card w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">登录 Colors Blog</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              欢迎回来，继续探索多彩世界
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Icon icon="fluent:error-circle-20-filled" className="text-red-500 mr-2" />
                <span className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-8">
            <button
              onClick={() => handleOAuthSignIn('google')}
              className="oauth-btn flex items-center justify-center gap-3"
              disabled={isLoading}
            >
              <Icon icon="simple-icons:google" className="w-5 h-5" />
              <span>使用 Google 登录</span>
            </button>

            <button
              onClick={() => handleOAuthSignIn('github')}
              className="oauth-btn flex items-center justify-center gap-3"
              disabled={isLoading}
            >
              <Icon icon="simple-icons:github" className="w-5 h-5" />
              <span>使用 GitHub 登录</span>
            </button>

            <button
              onClick={() => handleOAuthSignIn('custom-oidc')}
              className="oauth-btn flex items-center justify-center gap-3"
              disabled={isLoading}
            >
              <Icon icon="simple-icons:openid" className="w-5 h-5" />
              <span>使用自定义 OIDC 登录</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
            <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">或使用邮箱登录</span>
            <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleCredentialsSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                邮箱地址
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="fluent:mail-20-filled" className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="login-input pl-10"
                  placeholder="jsmith@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="fluent:password-20-filled" className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-input pl-10"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  记住我
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                disabled={isLoading}
              >
                忘记密码？
              </button>
            </div>

            <button
              type="submit"
              className="apple-btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>登录中...</span>
                </div>
              ) : (
                <span>登录</span>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              还没有账号？{' '}
              <button
                onClick={() => router.push('/register')}
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                disabled={isLoading}
              >
                立即注册
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )  
}
