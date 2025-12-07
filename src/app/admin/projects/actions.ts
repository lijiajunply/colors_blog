// Project Actions

"use server";

import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";

export async function deleteProject(id: number) {
  await prisma.project.delete({ where: { id } });
  redirect("/admin/projects");
}
