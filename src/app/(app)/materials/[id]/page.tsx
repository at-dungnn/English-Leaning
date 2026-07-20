import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedMaterial } from "@/server/materials/queries";
import {
  LEVEL_LABELS,
  MATERIAL_TYPE_LABELS,
  type LevelValue,
  type MaterialTypeValue,
} from "@/lib/materials";
import { Badge } from "@/components/ui/badge";

export default async function MaterialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = await getPublishedMaterial(id);
  if (!m) notFound();

  return (
    <article className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-6 py-10">
      <Link
        href="/materials"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Tài liệu
      </Link>
      <div className="flex flex-wrap gap-2">
        <Badge>{MATERIAL_TYPE_LABELS[m.type as MaterialTypeValue]}</Badge>
        <Badge variant="secondary">
          {LEVEL_LABELS[m.level as LevelValue]}
        </Badge>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">{m.title}</h1>
      {m.summary && (
        <p className="text-lg text-muted-foreground">{m.summary}</p>
      )}
      <div className="mt-2 whitespace-pre-wrap leading-relaxed">{m.body}</div>
      {m.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
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
