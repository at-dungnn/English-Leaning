import type { Metadata } from "next";
import { getLeaderboard } from "@/server/gamification/queries";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Bảng xếp hạng" };

const MEDALS = ["🥇", "🥈", "🥉"];

export default async function LeaderboardPage() {
  const { top, meId } = await getLeaderboard(20);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bảng xếp hạng</h1>
        <p className="text-sm text-muted-foreground">
          Top người học theo điểm tích luỹ.
        </p>
      </div>

      {top.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
          Chưa có ai học. Hãy là người đầu tiên!
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          {top.map((u, i) => {
            const isMe = u.id === meId;
            const displayName =
              u.name ?? u.email?.split("@")[0] ?? "Người học";
            return (
              <div
                key={u.id}
                className={cn(
                  "flex items-center gap-3 border-t px-4 py-3 first:border-t-0 sm:gap-4",
                  isMe && "bg-primary/5",
                )}
              >
                <div className="w-7 text-center text-base font-bold text-muted-foreground">
                  {MEDALS[i] ?? i + 1}
                </div>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold uppercase text-primary">
                  {displayName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">
                    {displayName}
                    {isMe && (
                      <span className="ml-1.5 text-xs text-primary">(bạn)</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    🔥 {u.currentStreak} ngày
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold tracking-tight">{u.points}</div>
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
