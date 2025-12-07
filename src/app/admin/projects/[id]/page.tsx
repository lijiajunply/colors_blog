// Edit Project Page

import { prisma } from '../../../../lib/prisma';
import { redirect } from 'next/navigation';

async function getProject(id: number) {
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    redirect('/admin/projects');
  }

  return project;
}

async function updateProject(id: number, data: FormData) {
  const title = data.get('title') as string;
  const description = data.get('description') as string;
  const url = data.get('url') as string || null;
  const githubUrl = data.get('githubUrl') as string || null;
  const imageUrl = data.get('imageUrl') as string || null;
  const isActive = data.get('isActive') === 'on';
  const tags = (data.get('tags') as string || '')
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag !== '');

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      url,
      githubUrl,
      imageUrl,
      isActive,
      tags,
    },
  });

  redirect('/admin/projects');
}

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const project = await getProject(id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">编辑项目</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">编辑现有项目</p>
      </div>

      <form action={(data) => updateProject(id, data)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            标题
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={project.title}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="项目标题"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            描述
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={project.description}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="项目描述"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              项目 URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              defaultValue={project.url}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              GitHub URL
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              defaultValue={project.githubUrl}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            图片 URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            defaultValue={project.imageUrl}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            标签（用逗号分隔）
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            defaultValue={project.tags.join(', ')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={project.isActive}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            活跃状态
          </label>
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
            更新项目
          </button>
        </div>
      </form>
    </div>
  );
}
