"use server";

import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { initialState, scheduleReview, type ReviewGrade } from "@/lib/srs";

export type ReviewResult = { ok: true } | { error: string };

/** Record a review for a card and advance its SM-2 schedule. */
export async function reviewCard(
  cardId: string,
  grade: ReviewGrade,
): Promise<ReviewResult> {
  const user = await requireUser();

  const card = await db.card.findUnique({
    where: { id: cardId },
    include: { deck: true },
  });
  if (!card) return { error: "Không tìm thấy thẻ" };
  if (card.deck.ownerId !== user.id && !card.deck.isPublic) {
    return { error: "Bạn không có quyền học thẻ này" };
  }

  const existing = await db.review.findUnique({
    where: { userId_cardId: { userId: user.id, cardId } },
  });

  const state = existing
    ? {
        ease: existing.ease,
        interval: existing.interval,
        repetitions: existing.repetitions,
      }
    : initialState();

  const next = scheduleReview(state, grade);
  const now = new Date();

  await db.review.upsert({
    where: { userId_cardId: { userId: user.id, cardId } },
    create: {
      userId: user.id,
      cardId,
      ease: next.ease,
      interval: next.interval,
      repetitions: next.repetitions,
      dueAt: next.dueAt,
      lastReviewedAt: now,
    },
    update: {
      ease: next.ease,
      interval: next.interval,
      repetitions: next.repetitions,
      dueAt: next.dueAt,
      lastReviewedAt: now,
    },
  });

  return { ok: true };
}
