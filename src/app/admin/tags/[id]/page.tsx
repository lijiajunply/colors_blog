// Edit Tag Page

import { prisma } from '../../../../lib/prisma';
import { redirect } from 'next/navigation';
import { updateTag } from '../actions';

async function getTag(id: number) {
  const tag = await prisma.tag.findUnique({
    where: { id },
  });

  if (!tag) {
    redirect('/admin/tags');
  }

  return tag;
}

export default async function EditTagPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const tag = await getTag(id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">编辑标签</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">编辑现有标签</p>
      </div>

      <form action={(data) => updateTag(id, data)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            标签名称
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={tag.name}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="标签名称"
          />
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
            更新标签
          </button>
        </div>
      </form>
    </div>
  );
}
