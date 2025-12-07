// Edit Article Page

import { prisma } from '../../../../lib/prisma';
import { redirect } from 'next/navigation';

async function getArticle(id: number) {
  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) {
    redirect('/admin/articles');
  }

  return article;
}

async function updateArticle(id: number, data: FormData) {
  const title = data.get('title') as string;
  const content = data.get('content') as string;
  const category = data.get('category') as string;
  const excerpt = data.get('excerpt') as string;
  const coverImage = data.get('coverImage') as string;
  const readTime = parseInt(data.get('readTime') as string) || 5;

  await prisma.article.update({
    where: { id },
    data: {
      title,
      content,
      category,
      excerpt,
      coverImage,
      readTime,
    },
  });

  redirect('/admin/articles');
}

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const article = await getArticle(id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">编辑文章</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">编辑现有文章</p>
      </div>

      <form action={(data) => updateArticle(id, data)} className="space-y-4">
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
              defaultValue={article.title}
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
              defaultValue={article.category}
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
            defaultValue={article.excerpt}
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
            defaultValue={article.coverImage}
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
            defaultValue={article.readTime}
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
            defaultValue={article.content}
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
            更新文章
          </button>
        </div>
      </form>
    </div>
  );
}
