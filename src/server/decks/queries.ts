import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";

/** All decks owned by the current user, with card counts. */
export async function getUserDecks() {
  const user = await requireUser();
  return db.deck.findMany({
    where: { ownerId: user.id },
    include: { _count: { select: { cards: true } } },
    orderBy: { updatedAt: "desc" },
  });
}

/** Public decks from other users — for the "Explore" section. */
export async function getPublicDecks(limit = 12) {
  const user = await requireUser();
  return db.deck.findMany({
    where: { isPublic: true, ownerId: { not: user.id } },
    include: {
      _count: { select: { cards: true } },
      owner: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/** A single deck with its cards — only if the user owns it or it's public. */
export async function getDeckWithCards(deckId: string) {
  const user = await requireUser();
  const deck = await db.deck.findUnique({
    where: { id: deckId },
    include: { cards: { orderBy: { createdAt: "desc" } } },
  });
  if (!deck) return null;
  if (deck.ownerId !== user.id && !deck.isPublic) return null;
  return deck;
}

/** Number of cards due (or new) for the current user in a deck. */
export async function getDueCount(deckId: string) {
  const user = await requireUser();
  return db.card.count({
    where: {
      deckId,
      OR: [
        { reviews: { none: { userId: user.id } } },
        { reviews: { some: { userId: user.id, dueAt: { lte: new Date() } } } },
      ],
    },
  });
}

/** Aggregate learning stats for the dashboard. */
export async function getLearningStats() {
  const user = await requireUser();
  const [deckCount, cardCount, dueCount] = await Promise.all([
    db.deck.count({ where: { ownerId: user.id } }),
    db.card.count({ where: { deck: { ownerId: user.id } } }),
    db.card.count({
      where: {
        deck: { ownerId: user.id },
        OR: [
          { reviews: { none: { userId: user.id } } },
          { reviews: { some: { userId: user.id, dueAt: { lte: new Date() } } } },
        ],
      },
    }),
  ]);
  return { deckCount, cardCount, dueCount };
}
