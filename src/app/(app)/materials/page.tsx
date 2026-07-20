import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedMaterials } from "@/server/materials/queries";
import {
  LEVELS,
  LEVEL_LABELS,
  MATERIAL_TYPES,
  MATERIAL_TYPE_LABELS,
  type LevelValue,
  type MaterialTypeValue,
} from "@/lib/materials";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Tài liệu học" };

export default async function MaterialsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; level?: string }>;
}) {
  const sp = await searchParams;
  const type = MATERIAL_TYPES.includes(sp.type as MaterialTypeValue)
    ? (sp.type as MaterialTypeValue)
    : undefined;
  const level = LEVELS.includes(sp.level as LevelValue)
    ? (sp.level as LevelValue)
    : undefined;

  const materials = await getPublishedMaterials({ type, level });

  const buildHref = (next: { type?: string; level?: string }) => {
    const params = new URLSearchParams();
    const t = next.type ?? type;
    const l = next.level ?? level;
    if (t) params.set("type", t);
    if (l) params.set("level", l);
    const qs = params.toString();
    return qs ? `/materials?${qs}` : "/materials";
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tài liệu học</h1>
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2">
        <FilterRow label="Loại">
          <FilterChip href={buildHref({ type: "" })} active={!type}>
            Tất cả
          </FilterChip>
          {MATERIAL_TYPES.map((t) => (
            <FilterChip key={t} href={buildHref({ type: t })} active={type === t}>
              {MATERIAL_TYPE_LABELS[t]}
            </FilterChip>
          ))}
        </FilterRow>
        <FilterRow label="Trình độ">
          <FilterChip href={buildHref({ level: "" })} active={!level}>
            Tất cả
          </FilterChip>
          {LEVELS.map((l) => (
            <FilterChip
              key={l}
              href={buildHref({ level: l })}
              active={level === l}
            >
              {LEVEL_LABELS[l]}
            </FilterChip>
          ))}
        </FilterRow>
      </div>

      {materials.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          Chưa có tài liệu nào phù hợp.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {materials.map((m) => (
            <Link
              key={m.id}
              href={`/materials/${m.id}`}
              className="flex flex-col gap-2 rounded-xl border p-5 transition-colors hover:bg-muted/50"
            >
              <div className="flex gap-2">
                <Badge>{MATERIAL_TYPE_LABELS[m.type]}</Badge>
                <Badge variant="secondary">{LEVEL_LABELS[m.level]}</Badge>
              </div>
              <h2 className="font-semibold">{m.title}</h2>
              {m.summary && (
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {m.summary}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-16 text-sm text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "hover:bg-muted"
      }`}
    >
      {children}
    </Link>
  );
}
