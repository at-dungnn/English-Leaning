import type { DayPoint } from "@/server/gamification/queries";

// Simple dependency-free bar chart of daily review counts (last 14 days).
export function ActivityChart({ series }: { series: DayPoint[] }) {
  const max = Math.max(1, ...series.map((d) => d.count));

  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="mb-4 text-sm font-medium text-muted-foreground">
        Hoạt động 14 ngày qua
      </div>
      <div className="flex h-32 items-end justify-between gap-1">
        {series.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t bg-primary/80 transition-all"
                style={{ height: `${(d.count / max) * 100}%` }}
                title={`${d.label}: ${d.count} lượt`}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
