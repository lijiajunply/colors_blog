// Settings Actions

"use server";

import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";

export async function updateSetting(id: number, data?: FormData) {
  if (!data) {
    redirect("/admin/settings");
  }

  const value = data.get("value") as string;

  await prisma.systemSetting.update({ where: { id }, data: { value } });
  redirect("/admin/settings");
}
