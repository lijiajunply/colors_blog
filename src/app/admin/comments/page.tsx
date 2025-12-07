// Comments List Page

import { prisma } from '../../../lib/prisma';
import { deleteComment } from './actions';

interface Comment {
  id: number;
  content: string;
  article: {
    title: string;
  };
  author: {
    name: string | null;
  };
  createdAt: Date;
}

async function getComments(search?: string, page: number = 1, pageSize: number = 10) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const where = search ? {
    content: { contains: search, mode: 'insensitive' },
  } : {};

  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      where,
      skip,
      take,
      include: {
        article: { select: { title: true } },
        author: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.comment.count({ where }),
  ]);

  return {
    comments,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export default async function CommentsPage({ searchParams }: { searchParams?: { search?: string; page?: string } }) {
  const search = searchParams?.search || '';
  const page = parseInt(searchParams?.page || '1');
  const { comments, total, totalPages } = await getComments(search, page);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">评论管理</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">管理你的评论</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <form className="flex space-x-2">
          <input
            type="text"
            name="search"
            placeholder="搜索评论..."
            defaultValue={search}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            搜索
          </button>
        </form>
      </div>

      {/* Comments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">内容</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">文章</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">作者</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">创建时间</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {comments.map((comment: Comment) => (
              <tr key={comment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                  {comment.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                  {comment.article.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {comment.author.name || '未知作者'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <form action={() => deleteComment(comment.id)} method="post" className="inline">
                    <button
                      type="submit"
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                      onClick={(e) => {
                        if (!confirm('确定要删除这条评论吗？此操作不可恢复。')) {
                          e.preventDefault();
                        }
                      }}
                    >
                      删除
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          共 {total} 条评论，当前第 {page} / {totalPages} 页
        </p>
        <div className="flex space-x-2">
          <a
            href={`/admin/comments?${new URLSearchParams({ search, page: (Math.max(1, page - 1)).toString() })}`}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            上一页
          </a>
          <a
            href={`/admin/comments?${new URLSearchParams({ search, page: (Math.min(totalPages, page + 1)).toString() })}`}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            下一页
          </a>
        </div>
      </div>
    </div>
  );
}
