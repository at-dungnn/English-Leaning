import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getMaterialForEdit } from "@/server/materials/queries";
import { updateMaterial } from "@/server/materials/actions";
import { MaterialForm } from "@/components/materials/material-form";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Admin — Sửa tài liệu" };

export default async function EditMaterialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = await getMaterialForEdit(id);
  if (!m) notFound();

  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/admin/materials"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Tài liệu
      </Link>
      <h1 className="text-2xl font-bold tracking-tight">Sửa tài liệu</h1>
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <MaterialForm
            action={updateMaterial.bind(null, id)}
            initial={{
              title: m.title,
              summary: m.summary,
              body: m.body,
              type: m.type,
              level: m.level,
              tags: m.tags,
              isPublished: m.isPublished,
            }}
            submitLabel="Lưu thay đổi"
          />
        </CardContent>
      </Card>
    </div>
  );
}
