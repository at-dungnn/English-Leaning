import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { getUserDecks } from "@/server/decks/queries";
import { CreateDeckDrawer } from "@/components/decks/create-deck-drawer";
import { deckCover } from "@/lib/deck-cover";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Bộ thẻ của tôi" };

export default async function DecksPage() {
  const decks = await getUserDecks();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bộ thẻ của tôi</h1>
          <p className="text-sm text-muted-foreground">
            Tạo bộ thẻ và học từ vựng theo cách của bạn.
          </p>
        </div>
        <CreateDeckDrawer />
      </div>

      {decks.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed p-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="size-6" />
          </div>
          <p className="text-muted-foreground">
            Chưa có bộ thẻ nào. Bấm “Tạo bộ thẻ” ở trên để bắt đầu nhé!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="relative h-28 w-full">
                <Image
                  src={deckCover(deck.id)}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                />
                {deck.isPublic && (
                  <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
                    Công khai
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                  <div className="font-semibold">{deck.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {deck._count.cards} thẻ
                  </div>
                </div>
                <div className="mt-auto flex gap-2">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
