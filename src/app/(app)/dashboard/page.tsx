import type { Metadata } from "next";
import Link from "next/link";
import { Layers, Library, Flame, Star, Clock, Trophy } from "lucide-react";
import { auth } from "@/lib/auth";
import { logout } from "@/server/auth/actions";
import { getLearningStats } from "@/server/decks/queries";
import { getMyGameStats } from "@/server/gamification/queries";
import { ActivityChart } from "@/components/gamification/activity-chart";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Trang học tập" };

export default async function DashboardPage() {
  const session = await auth();
  const name = session?.user?.name ?? session?.user?.email ?? "bạn";
  const [stats, game] = await Promise.all([
    getLearningStats(),
    getMyGameStats(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-emerald-600 p-6 text-white shadow-lg sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 right-16 size-32 rounded-full bg-white/10"
        />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-white/80">Chào mừng trở lại 👋</div>
            <h1 className="text-2xl font-bold sm:text-3xl">{name}</h1>
            <p className="mt-1 text-white/90">
              🔥 {game.currentStreak} ngày streak · ⭐ {game.points} điểm
            </p>
          </div>
          <form action={logout}>
            <Button type="submit" variant="secondary" size="sm">
              Đăng xuất
            </Button>
          </form>
        </div>
        <div className="relative mt-5 flex flex-wrap gap-2">
          <Button
            render={<Link href="/decks" />}
            className="bg-white text-indigo-700 hover:bg-white/90"
          >
            Học ngay
          </Button>
          <Button render={<Link href="/materials" />} variant="secondary">
            Tài liệu học
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Chuỗi ngày" value={`${game.currentStreak} 🔥`} icon={<Flame />} highlight />
        <Stat label="Điểm" value={game.points} icon={<Star />} />
        <Stat label="Cần ôn hôm nay" value={stats.dueCount} icon={<Clock />} />
        <Stat label="Bộ thẻ" value={stats.deckCount} icon={<Library />} />
        <Stat label="Tổng số thẻ" value={stats.cardCount} icon={<Layers />} />
        <Stat label="Streak dài nhất" value={game.longestStreak} icon={<Trophy />} />
      </div>

      <ActivityChart series={game.series} />
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-5 ${
        highlight ? "border-primary/30 bg-primary/5" : "bg-card"
      }`}
    >
      <div
        className={`flex size-11 items-center justify-center rounded-xl [&_svg]:size-5 ${
          highlight
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 text-primary"
        }`}
      >
        {icon}
      </div>
      <div>
        <div className="text-3xl font-bold leading-none">{value}</div>
        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
