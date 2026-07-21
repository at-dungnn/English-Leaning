import type { Metadata } from "next";
import { getAllDecks } from "@/server/admin/queries";
import { adminDeleteDeck, toggleDeckPublic } from "@/server/admin/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Admin — Bộ thẻ" };

export default async function AdminDecksPage() {
  const decks = await getAllDecks();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bộ thẻ</h1>
        <p className="text-sm text-muted-foreground">{decks.length} bộ thẻ</p>
      </div>

      {decks.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
          Chưa có bộ thẻ nào.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Bộ thẻ</th>
                  <th className="px-4 py-3 font-medium">Chủ sở hữu</th>
                  <th className="px-4 py-3 font-medium">Số thẻ</th>
                  <th className="px-4 py-3 font-medium">Trạng thái</th>
                  <th className="px-4 py-3 text-right font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {decks.map((d) => (
                  <tr key={d.id} className="border-t transition-colors hover:bg-muted/40">
                    <td className="px-4 py-3 font-medium">{d.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {d.owner.email}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {d._count.cards}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={d.isPublic ? "default" : "secondary"}>
                        {d.isPublic ? "Công khai" : "Riêng tư"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <form action={toggleDeckPublic.bind(null, d.id)}>
                          <Button type="submit" size="sm" variant="outline">
                            {d.isPublic ? "Ẩn đi" : "Công khai"}
                          </Button>
                        </form>
                        <form action={adminDeleteDeck.bind(null, d.id)}>
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
