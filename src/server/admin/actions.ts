"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import type { Role } from "@/generated/prisma/enums";

export async function setUserRole(userId: string, role: Role) {
  const admin = await requireAdmin();
  // Safety: an admin cannot change their own role (avoid locking themselves out).
  if (userId === admin.id) return;
  await db.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin/users");
}

export async function toggleDeckPublic(deckId: string) {
  await requireAdmin();
  const deck = await db.deck.findUnique({ where: { id: deckId } });
  if (!deck) return;
  await db.deck.update({
    where: { id: deckId },
    data: { isPublic: !deck.isPublic },
  });
  revalidatePath("/admin/decks");
}

export async function adminDeleteDeck(deckId: string) {
  await requireAdmin();
  await db.deck.delete({ where: { id: deckId } });
  revalidatePath("/admin/decks");
}
