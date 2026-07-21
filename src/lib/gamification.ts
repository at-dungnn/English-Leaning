import type { ReviewGrade } from "@/lib/srs";

// Points awarded per review (harder recall that still succeeds is worth less
// "cramming", so we reward genuine recall; "again" still gives a little for effort).
export const POINTS_BY_GRADE: Record<ReviewGrade, number> = {
  again: 1,
  hard: 2,
  good: 3,
  easy: 5,
};

/** Midnight UTC of a date (date-only). */
export function startOfDayUTC(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

/**
 * Compute the new streak after studying at `now`, given the last study day
 * and current streak.
 * - never studied → 1
 * - already studied today → unchanged
 * - studied yesterday → +1
 * - gap of 2+ days → reset to 1
 */
export function nextStreak(
  lastStudyDate: Date | null,
  currentStreak: number,
  now: Date,
): number {
  if (!lastStudyDate) return 1;
  const today = startOfDayUTC(now).getTime();
  const last = startOfDayUTC(lastStudyDate).getTime();
  const diffDays = Math.round((today - last) / 86_400_000);
  if (diffDays <= 0) return currentStreak || 1;
  if (diffDays === 1) return currentStreak + 1;
  return 1;
}
