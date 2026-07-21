import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { startOfDayUTC } from "@/lib/gamification";

export interface DayPoint {
  label: string; // e.g. "20/7"
  count: number;
}

/** Current user's gamification stats + last 14 days of activity. */
export async function getMyGameStats() {
  const user = await requireUser();
  const since = startOfDayUTC(new Date(Date.now() - 13 * 86_400_000));

  const [u, activities] = await Promise.all([
    db.user.findUnique({
      where: { id: user.id },
      select: { points: true, currentStreak: true, longestStreak: true },
    }),
    db.dailyActivity.findMany({
      where: { userId: user.id, date: { gte: since } },
      orderBy: { date: "asc" },
    }),
  ]);

  const map = new Map(
    activities.map((a) => [startOfDayUTC(a.date).getTime(), a.reviewCount]),
  );
  const today = startOfDayUTC(new Date());
  const series: DayPoint[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86_400_000);
    series.push({
      label: `${d.getUTCDate()}/${d.getUTCMonth() + 1}`,
      count: map.get(d.getTime()) ?? 0,
    });
  }

  return {
    points: u?.points ?? 0,
    currentStreak: u?.currentStreak ?? 0,
    longestStreak: u?.longestStreak ?? 0,
    series,
  };
}

/** Top users by points, plus the current user's id for highlighting. */
export async function getLeaderboard(limit = 20) {
  const me = await requireUser();
  const top = await db.user.findMany({
    orderBy: [{ points: "desc" }, { currentStreak: "desc" }],
    take: limit,
    select: {
      id: true,
      name: true,
      email: true,
      points: true,
      currentStreak: true,
    },
  });
  return { top, meId: me.id };
}
