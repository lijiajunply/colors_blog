// Tag Actions

'use server';

import { prisma } from '../../../lib/prisma';
import { redirect } from 'next/navigation';

export async function deleteTag(id: number) {
  await prisma.tag.delete({ where: { id } });
  redirect('/admin/tags');
}

export async function createTag(data: FormData) {
  const name = data.get('name') as string;

  await prisma.tag.create({
    data: { name },
  });

  redirect('/admin/tags');
}

export async function updateTag(id: number, data: FormData) {
  const name = data.get('name') as string;

  await prisma.tag.update({ where: { id }, data: { name } });
  redirect('/admin/tags');
}
