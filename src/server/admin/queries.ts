import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export async function getAdminStats() {
  await requireAdmin();
  const [users, admins, decks, publicDecks, cards] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { role: "ADMIN" } }),
    db.deck.count(),
    db.deck.count({ where: { isPublic: true } }),
    db.card.count(),
  ]);
  return { users, admins, decks, publicDecks, cards };
}

export async function getAllUsers() {
  await requireAdmin();
  return db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      _count: { select: { decks: true } },
    },
  });
}

export async function getAllDecks() {
  await requireAdmin();
  return db.deck.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      owner: { select: { email: true } },
      _count: { select: { cards: true } },
    },
  });
}
