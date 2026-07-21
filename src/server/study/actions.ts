"use server";

import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { initialState, scheduleReview, type ReviewGrade } from "@/lib/srs";
import { POINTS_BY_GRADE, nextStreak, startOfDayUTC } from "@/lib/gamification";

export type ReviewResult = { ok: true } | { error: string };

/** Record a review, advance its SM-2 schedule, and update gamification stats. */
export async function reviewCard(
  cardId: string,
  grade: ReviewGrade,
): Promise<ReviewResult> {
  const sessionUser = await requireUser();
  const userId = sessionUser.id;

  const card = await db.card.findUnique({
    where: { id: cardId },
    include: { deck: true },
  });
  if (!card) return { error: "Không tìm thấy thẻ" };
  if (card.deck.ownerId !== userId && !card.deck.isPublic) {
    return { error: "Bạn không có quyền học thẻ này" };
  }

  const [existing, dbUser] = await Promise.all([
    db.review.findUnique({ where: { userId_cardId: { userId, cardId } } }),
    db.user.findUnique({
      where: { id: userId },
      select: { currentStreak: true, longestStreak: true, lastStudyDate: true },
    }),
  ]);

  const state = existing
    ? {
        ease: existing.ease,
        interval: existing.interval,
        repetitions: existing.repetitions,
      }
    : initialState();

  const next = scheduleReview(state, grade);
  const now = new Date();
  const today = startOfDayUTC(now);

  const streak = nextStreak(
    dbUser?.lastStudyDate ?? null,
    dbUser?.currentStreak ?? 0,
    now,
  );
  const longestStreak = Math.max(dbUser?.longestStreak ?? 0, streak);

  await db.$transaction([
    db.review.upsert({
      where: { userId_cardId: { userId, cardId } },
      create: {
        userId,
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
    }),
    db.user.update({
      where: { id: userId },
      data: {
        points: { increment: POINTS_BY_GRADE[grade] },
        currentStreak: streak,
        longestStreak,
        lastStudyDate: today,
      },
    }),
    db.dailyActivity.upsert({
      where: { userId_date: { userId, date: today } },
      create: { userId, date: today, reviewCount: 1 },
      update: { reviewCount: { increment: 1 } },
    }),
  ]);

  return { ok: true };
}
