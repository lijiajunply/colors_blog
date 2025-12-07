// Comment Actions

'use server';

import { prisma } from '../../../lib/prisma';
import { redirect } from 'next/navigation';

export async function deleteComment(id: number) {
  await prisma.comment.delete({ where: { id } });
  redirect('/admin/comments');
}
