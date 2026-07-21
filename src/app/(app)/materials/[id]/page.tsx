import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getPublishedMaterial } from "@/server/materials/queries";
import { LEVEL_LABELS, type LevelValue, type MaterialTypeValue } from "@/lib/materials";
import { TYPE_META } from "@/components/materials/type-meta";
import { Badge } from "@/components/ui/badge";

export default async function MaterialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = await getPublishedMaterial(id);
  if (!m) notFound();

  const meta = TYPE_META[m.type as MaterialTypeValue];
  const Icon = meta.icon;

  return (
    <article className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-5 px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/materials"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Tài liệu
      </Link>

      <div className="flex items-center gap-3">
        <div
          className={`flex size-11 items-center justify-center rounded-xl ${meta.className}`}
        >
          <Icon className="size-5" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary">{meta.label}</Badge>
          <Badge variant="outline">{LEVEL_LABELS[m.level as LevelValue]}</Badge>
        </div>
      </div>

      <h1 className="text-3xl font-bold leading-tight tracking-tight">
        {m.title}
      </h1>
      {m.summary && (
        <p className="text-lg text-muted-foreground">{m.summary}</p>
      )}

      <div className="whitespace-pre-wrap text-[17px] leading-8 text-foreground/90">
        {m.body}
      </div>

      {m.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 border-t pt-5">
          {m.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
