// Tags List Page

import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import { deleteTag } from "./actions";

interface Tag {
  id: number;
  name: string;
  articles: { id: number }[];
}

async function getTags(
  search?: string,
  page: number = 1,
  pageSize: number = 10,
) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const where = search
    ? {
        name: { contains: search, mode: "insensitive" as const },
      }
    : {};

  const [tags, total] = await Promise.all([
    prisma.tag.findMany({
      where,
      skip,
      take,
      include: { articles: { select: { id: true } } },
    }),
    prisma.tag.count({ where }),
  ]);

  return {
    tags,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export default async function TagsPage({
  searchParams,
}: {
  searchParams?: { search?: string; page?: string };
}) {
  const search = searchParams?.search || "";
  const page = parseInt(searchParams?.page || "1");
  const { tags, total, totalPages } = await getTags(search, page);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            标签管理
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            管理你的标签
          </p>
        </div>
        <Link
          href="/admin/tags/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          新建标签
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <form className="flex space-x-2">
          <input
            type="text"
            name="search"
            placeholder="搜索标签..."
            defaultValue={search}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            搜索
          </button>
        </form>
      </div>

      {/* Tags Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                名称
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                文章数量
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                创建时间
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {tags.map((tag: Tag) => (
              <tr key={tag.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {tag.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {tag.articles.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  - 
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/tags/${tag.id}`}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                  >
                    编辑
                  </Link>
                  <form
                    action={() => deleteTag(tag.id)}
                    method="post"
                    className="inline"
                  >
                    <button
                      type="submit"
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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
          共 {total} 个标签，当前第 {page} / {totalPages} 页
        </p>
        <div className="flex space-x-2">
          <Link
            href={{
              pathname: "/admin/tags",
              query: { ...searchParams, page: Math.max(1, page - 1) },
            }}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            上一页
          </Link>
          <Link
            href={{
              pathname: "/admin/tags",
              query: { ...searchParams, page: Math.min(totalPages, page + 1) },
            }}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            下一页
          </Link>
        </div>
      </div>
    </div>
  );
}
