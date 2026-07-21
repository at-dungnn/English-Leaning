export default function DecksLoading() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex items-center justify-between">
        <div className="h-8 w-44 animate-pulse rounded-lg bg-muted/50" />
        <div className="h-9 w-28 animate-pulse rounded-lg bg-muted/50" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border bg-card shadow-sm"
          >
            <div className="h-28 animate-pulse bg-muted/50" />
            <div className="flex flex-col gap-3 p-5">
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted/50" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-muted/50" />
              <div className="mt-1 h-8 w-full animate-pulse rounded-lg bg-muted/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
