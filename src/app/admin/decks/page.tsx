import type { Metadata } from "next";
import { getAllDecks } from "@/server/admin/queries";
import { adminDeleteDeck, toggleDeckPublic } from "@/server/admin/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Admin — Nội dung" };

export default async function AdminDecksPage() {
  const decks = await getAllDecks();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">
        Nội dung — Bộ thẻ ({decks.length})
      </h1>
      {decks.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          Chưa có bộ thẻ nào.
        </p>
      ) : (
        <div className="flex flex-col divide-y rounded-lg border">
          {decks.map((d) => (
            <div
              key={d.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div>
                <div className="font-medium">{d.title}</div>
                <div className="text-sm text-muted-foreground">
                  {d.owner.email} · {d._count.cards} thẻ
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={d.isPublic ? "default" : "secondary"}>
                  {d.isPublic ? "Công khai" : "Riêng tư"}
                </Badge>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
