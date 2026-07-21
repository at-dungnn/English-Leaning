import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Compass } from "lucide-react";
import { getUserDecks, getPublicDecks } from "@/server/decks/queries";
import { CreateDeckDrawer } from "@/components/decks/create-deck-drawer";
import { deckCover } from "@/lib/deck-cover";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Bộ thẻ" };

export default async function DecksPage() {
  const [decks, publicDecks] = await Promise.all([
    getUserDecks(),
    getPublicDecks(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-4 py-6 sm:px-6 sm:py-8">
      {/* My decks */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bộ thẻ của tôi</h1>
            <p className="text-sm text-muted-foreground">
              Tạo bộ thẻ và học theo cách của bạn.
            </p>
          </div>
          <CreateDeckDrawer />
        </div>

        {decks.length === 0 ? (
          <EmptyState
            icon={<Sparkles className="size-6" />}
            text="Chưa có bộ thẻ nào. Bấm “Tạo bộ thẻ” để bắt đầu, hoặc học bộ thẻ công khai bên dưới."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {decks.map((deck) => (
              <DeckCard
                key={deck.id}
                id={deck.id}
                title={deck.title}
                cards={deck._count.cards}
                isPublic={deck.isPublic}
                manage
              />
            ))}
          </div>
        )}
      </section>

      {/* Explore public decks */}
      {publicDecks.length > 0 && (
        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Compass className="size-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">Khám phá</h2>
            <span className="text-sm text-muted-foreground">
              · bộ thẻ công khai
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {publicDecks.map((deck) => (
              <DeckCard
                key={deck.id}
                id={deck.id}
                title={deck.title}
                cards={deck._count.cards}
                author={deck.owner.name}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function DeckCard({
  id,
  title,
  cards,
  isPublic,
  author,
  manage,
}: {
  id: string;
  title: string;
  cards: number;
  isPublic?: boolean;
  author?: string | null;
  manage?: boolean;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-28 w-full">
        <Image
          src={deckCover(id)}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isPublic && (
          <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
            Công khai
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-muted-foreground">
            {cards} thẻ{author ? ` · ${author}` : ""}
          </div>
        </div>
        <div className="mt-auto flex gap-2">
          <Button
            render={<Link href={`/study/${id}`} />}
            size="sm"
            className="flex-1"
          >
            Học
          </Button>
          {manage && (
            <Button
              render={<Link href={`/decks/${id}`} />}
              size="sm"
              variant="outline"
              className="flex-1"
            >
              Quản lý
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed p-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="max-w-sm text-muted-foreground">{text}</p>
    </div>
  );
}
