export default function DashboardLoading() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <div className="h-32 animate-pulse rounded-2xl border bg-muted/40" />
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[84px] animate-pulse rounded-2xl border bg-muted/40"
          />
        ))}
      </div>
      <div className="h-48 animate-pulse rounded-2xl border bg-muted/40" />
    </div>
  );
}
