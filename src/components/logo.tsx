import { cn } from "@/lib/utils";

/** Brand mark: a gradient rounded square with stacked flashcards. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("size-8", className)}
      role="img"
      aria-label="English Learning"
    >
      <defs>
        <linearGradient id="el-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="40" height="40" rx="11" fill="url(#el-logo)" />
      {/* back card */}
      <rect
        x="9"
        y="12"
        width="19"
        height="14"
        rx="3"
        fill="#ffffff"
        opacity="0.55"
        transform="rotate(-8 18 19)"
      />
      {/* front card */}
      <rect x="12" y="15" width="19" height="14" rx="3" fill="#ffffff" />
      <rect x="15" y="19" width="9" height="2" rx="1" fill="#4f46e5" />
      <rect x="15" y="23" width="13" height="2" rx="1" fill="#c7d2fe" />
    </svg>
  );
}

/** Full logo: mark + wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-heading text-lg font-bold tracking-tight",
        className,
      )}
    >
      <LogoMark />
      <span>
        English <span className="text-primary">Learning</span>
      </span>
    </span>
  );
}
