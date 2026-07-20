import { db } from "@/lib/db";
import { requireUser, requireAdmin } from "@/lib/session";
import type { MaterialTypeValue, LevelValue } from "@/lib/materials";

/** Published materials for learners, optionally filtered by type/level. */
export async function getPublishedMaterials(filter?: {
  type?: MaterialTypeValue;
  level?: LevelValue;
}) {
  await requireUser();
  return db.material.findMany({
    where: {
      isPublished: true,
      ...(filter?.type ? { type: filter.type } : {}),
      ...(filter?.level ? { level: filter.level } : {}),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      summary: true,
      type: true,
      level: true,
      tags: true,
      createdAt: true,
    },
  });
}

/** A single published material (learner view). */
export async function getPublishedMaterial(id: string) {
  await requireUser();
  const material = await db.material.findUnique({ where: { id } });
  if (!material || !material.isPublished) return null;
  return material;
}

/** Admin: all materials regardless of publish state. */
export async function getAllMaterials() {
  await requireAdmin();
  return db.material.findMany({ orderBy: { createdAt: "desc" } });
}

/** Admin: a single material for editing. */
export async function getMaterialForEdit(id: string) {
  await requireAdmin();
  return db.material.findUnique({ where: { id } });
}
