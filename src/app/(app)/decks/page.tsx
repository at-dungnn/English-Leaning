import type { Metadata } from "next";
import Link from "next/link";
import { Library, Sparkles } from "lucide-react";
import { getUserDecks } from "@/server/decks/queries";
import { CreateDeckForm } from "@/components/decks/create-deck-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Bộ thẻ của tôi" };

export default async function DecksPage() {
  const decks = await getUserDecks();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bộ thẻ của tôi</h1>
        <p className="text-sm text-muted-foreground">
          Tạo bộ thẻ và học từ vựng theo cách của bạn.
        </p>
      </div>

      <CreateDeckForm />

      {decks.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed p-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="size-6" />
          </div>
          <p className="text-muted-foreground">
            Chưa có bộ thẻ nào. Hãy tạo bộ thẻ đầu tiên ở trên nhé!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="flex flex-col gap-4 rounded-2xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Library className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{deck.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {deck._count.cards} thẻ
                    {deck.isPublic ? " · Công khai" : ""}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  render={<Link href={`/study/${deck.id}`} />}
                  size="sm"
                  className="flex-1"
                >
                  Học
                </Button>
                <Button
                  render={<Link href={`/decks/${deck.id}`} />}
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  Quản lý
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
