// User Actions

'use server';

import { prisma } from '../../../lib/prisma';
import { redirect } from 'next/navigation';

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
  redirect('/admin/users');
}

export async function updateUserRole(id: string, identity: string) {
  await prisma.user.update({ where: { id }, data: { identity } });
  redirect('/admin/users');
}
