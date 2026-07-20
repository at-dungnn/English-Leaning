"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { materialSchema, parseTags } from "./schemas";

export type MaterialActionState = { error?: string } | undefined;

function readForm(formData: FormData) {
  return materialSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary") || undefined,
    body: formData.get("body"),
    type: formData.get("type"),
    level: formData.get("level"),
    tags: parseTags(formData.get("tags")),
    isPublished: formData.get("isPublished") === "on",
  });
}

export async function createMaterial(
  _prev: MaterialActionState,
  formData: FormData,
): Promise<MaterialActionState> {
  const admin = await requireAdmin();
  const parsed = readForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }
  await db.material.create({ data: { ...parsed.data, authorId: admin.id } });
  redirect("/admin/materials");
}

export async function updateMaterial(
  id: string,
  _prev: MaterialActionState,
  formData: FormData,
): Promise<MaterialActionState> {
  await requireAdmin();
  const parsed = readForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }
  await db.material.update({ where: { id }, data: parsed.data });
  redirect("/admin/materials");
}

export async function toggleMaterialPublish(id: string) {
  await requireAdmin();
  const m = await db.material.findUnique({ where: { id } });
  if (!m) return;
  await db.material.update({
    where: { id },
    data: { isPublished: !m.isPublished },
  });
  revalidatePath("/admin/materials");
}

export async function deleteMaterial(id: string) {
  await requireAdmin();
  await db.material.delete({ where: { id } });
  revalidatePath("/admin/materials");
}
