import type { Metadata } from "next";
import Link from "next/link";
import { getAllMaterials } from "@/server/materials/queries";
import {
  createMaterial,
  deleteMaterial,
  toggleMaterialPublish,
} from "@/server/materials/actions";
import { MaterialForm } from "@/components/materials/material-form";
import {
  LEVEL_LABELS,
  MATERIAL_TYPE_LABELS,
  type LevelValue,
  type MaterialTypeValue,
} from "@/lib/materials";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Admin — Tài liệu" };

export default async function AdminMaterialsPage() {
  const materials = await getAllMaterials();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">
        Tài liệu ({materials.length})
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tạo tài liệu mới</CardTitle>
        </CardHeader>
        <CardContent>
          <MaterialForm action={createMaterial} submitLabel="Tạo tài liệu" />
        </CardContent>
      </Card>

      {materials.length > 0 && (
        <div className="flex flex-col divide-y rounded-lg border">
          {materials.map((m) => (
            <div
              key={m.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div>
                <div className="font-medium">{m.title}</div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge variant="secondary">
                    {MATERIAL_TYPE_LABELS[m.type as MaterialTypeValue]}
                  </Badge>
                  <Badge variant="secondary">
                    {LEVEL_LABELS[m.level as LevelValue]}
                  </Badge>
                  <Badge variant={m.isPublished ? "default" : "outline"}>
                    {m.isPublished ? "Đã xuất bản" : "Nháp"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  render={<Link href={`/admin/materials/${m.id}`} />}
                  size="sm"
                  variant="outline"
                >
                  Sửa
                </Button>
                <form action={toggleMaterialPublish.bind(null, m.id)}>
                  <Button type="submit" size="sm" variant="outline">
                    {m.isPublished ? "Ẩn" : "Xuất bản"}
                  </Button>
                </form>
                <form action={deleteMaterial.bind(null, m.id)}>
                  <Button
                    type="submit"
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                  >
                    Xoá
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
