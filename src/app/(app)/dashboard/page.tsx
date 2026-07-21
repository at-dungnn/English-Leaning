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
      {/* Welcome header */}
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Chào mừng trở lại</span>
          <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
          <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Flame className="size-4 text-primary" /> {game.currentStreak} ngày
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 text-primary" /> {game.points} điểm
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button render={<Link href="/decks" />}>Học ngay</Button>
          <form action={logout}>
            <Button type="submit" variant="outline">
              Đăng xuất
            </Button>
          </form>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Chuỗi ngày" value={game.currentStreak} icon={<Flame />} accent />
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
  accent,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-colors hover:border-primary/30">
      <div
        className={`flex size-11 items-center justify-center rounded-xl [&_svg]:size-5 ${
          accent ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        }`}
      >
        {icon}
      </div>
      <div>
        <div className="text-3xl font-bold leading-none tracking-tight">{value}</div>
        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
