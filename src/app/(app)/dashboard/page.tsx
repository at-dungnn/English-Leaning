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
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Xin chào, {name} 👋
        </h1>
        <form action={logout}>
          <Button type="submit" variant="outline">
            Đăng xuất
          </Button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Chuỗi ngày" value={`${game.currentStreak} 🔥`} icon={<Flame />} highlight />
        <Stat label="Điểm" value={game.points} icon={<Star />} />
        <Stat label="Cần ôn hôm nay" value={stats.dueCount} icon={<Clock />} />
        <Stat label="Bộ thẻ" value={stats.deckCount} icon={<Library />} />
        <Stat label="Tổng số thẻ" value={stats.cardCount} icon={<Layers />} />
        <Stat label="Streak dài nhất" value={game.longestStreak} icon={<Trophy />} />
      </div>

      <ActivityChart series={game.series} />

      <div className="flex flex-wrap gap-3">
        <Button render={<Link href="/decks" />}>Bộ thẻ của tôi</Button>
        <Button render={<Link href="/materials" />} variant="outline">
          Tài liệu học
        </Button>
        <Button render={<Link href="/leaderboard" />} variant="outline">
          🏆 Bảng xếp hạng
        </Button>
      </div>
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
