// Article Actions

'use server';

import { prisma } from '../../../lib/prisma';
import { redirect } from 'next/navigation';

export async function deleteArticle(id: number) {
  await prisma.article.delete({ where: { id } });
  redirect('/admin/articles');
}
