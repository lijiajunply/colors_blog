// Create Article Page

import { prisma } from '../../../../lib/prisma';
import { redirect } from 'next/navigation';

async function createArticle(data: FormData) {
  const title = data.get('title') as string;
  const content = data.get('content') as string;
  const category = data.get('category') as string;
  const excerpt = data.get('excerpt') as string;
  const coverImage = data.get('coverImage') as string;
  const readTime = parseInt(data.get('readTime') as string) || 5;

  await prisma.article.create({
    data: {
      title,
      content,
      category,
      excerpt,
      coverImage,
      readTime,
      author: { connect: { id: '1' } }, // 临时使用固定作者ID
    },
  });

  redirect('/admin/articles');
}

export default async function CreateArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">创建文章</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">创建一篇新文章</p>
      </div>

      <form action={createArticle} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              标题
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="文章标题"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              分类
            </label>
            <input
              type="text"
              id="category"
              name="category"
              defaultValue="uncategorized"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="文章分类"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            摘要
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="文章摘要"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            封面图片 URL
          </label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="封面图片 URL"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            阅读时间（分钟）
          </label>
          <input
            type="number"
            id="readTime"
            name="readTime"
            min="1"
            defaultValue="5"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            内容
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="文章内容"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => history.back()}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            取消
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            创建文章
          </button>
        </div>
      </form>
    </div>
  );
}
