import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";

export interface StudyCard {
  id: string;
  term: string;
  ipa: string | null;
  meaning: string;
  example: string | null;
  imageUrl: string | null;
}

/** Cards to study now: new cards (no review yet) + cards whose review is due. */
export async function getStudyQueue(deckId: string, limit = 30) {
  const user = await requireUser();
  const deck = await db.deck.findUnique({ where: { id: deckId } });
  if (!deck || (deck.ownerId !== user.id && !deck.isPublic)) return null;

  const cards = await db.card.findMany({
    where: {
      deckId,
      OR: [
        { reviews: { none: { userId: user.id } } },
        { reviews: { some: { userId: user.id, dueAt: { lte: new Date() } } } },
      ],
    },
    orderBy: { createdAt: "asc" },
    take: limit,
    select: {
      id: true,
      term: true,
      ipa: true,
      meaning: true,
      example: true,
      imageUrl: true,
    },
  });

  return { deck, cards };
}
