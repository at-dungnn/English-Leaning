import type { Metadata } from "next";
import Link from "next/link";
import { getLeaderboard } from "@/server/gamification/queries";

export const metadata: Metadata = { title: "Bảng xếp hạng" };

const MEDALS = ["🥇", "🥈", "🥉"];

export default async function LeaderboardPage() {
  const { top, meId } = await getLeaderboard(20);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">🏆 Bảng xếp hạng</h1>
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Dashboard
        </Link>
      </div>

      {top.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          Chưa có ai học. Hãy là người đầu tiên!
        </p>
      ) : (
        <div className="flex flex-col divide-y rounded-2xl border">
          {top.map((u, i) => {
            const isMe = u.id === meId;
            return (
              <div
                key={u.id}
                className={`flex items-center gap-4 p-4 ${
                  isMe ? "bg-primary/5" : ""
                }`}
              >
                <div className="w-8 text-center text-lg font-bold">
                  {MEDALS[i] ?? i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">
                    {u.name ?? u.email?.split("@")[0] ?? "Người học"}
                    {isMe && (
                      <span className="ml-2 text-xs text-primary">(bạn)</span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {u.currentStreak} 🔥 chuỗi ngày
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{u.points}</div>
                  <div className="text-xs text-muted-foreground">điểm</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
