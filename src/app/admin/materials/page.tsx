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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tài liệu</h1>
        <p className="text-sm text-muted-foreground">{materials.length} tài liệu</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Tạo tài liệu mới</CardTitle>
        </CardHeader>
        <CardContent>
          <MaterialForm action={createMaterial} submitLabel="Tạo tài liệu" />
        </CardContent>
      </Card>

      {materials.length > 0 && (
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Tiêu đề</th>
                  <th className="px-4 py-3 font-medium">Loại</th>
                  <th className="px-4 py-3 font-medium">Trình độ</th>
                  <th className="px-4 py-3 font-medium">Trạng thái</th>
                  <th className="px-4 py-3 text-right font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m) => (
                  <tr key={m.id} className="border-t transition-colors hover:bg-muted/40">
                    <td className="px-4 py-3 font-medium">{m.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {MATERIAL_TYPE_LABELS[m.type as MaterialTypeValue]}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {LEVEL_LABELS[m.level as LevelValue]}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={m.isPublished ? "default" : "secondary"}>
                        {m.isPublished ? "Đã xuất bản" : "Nháp"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
