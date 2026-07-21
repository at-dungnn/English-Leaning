import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getDeckWithCards } from "@/server/decks/queries";
import { deleteCard, deleteDeck } from "@/server/decks/actions";
import { AddCardDrawer } from "@/components/decks/add-card-drawer";
import { deckCover } from "@/lib/deck-cover";
import { Button } from "@/components/ui/button";

export default async function DeckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deck = await getDeckWithCards(id);
  if (!deck) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      {/* Cover banner */}
      <div className="relative h-40 overflow-hidden rounded-3xl sm:h-48">
        <Image
          src={deckCover(deck.id)}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <Link
          href="/decks"
          className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-sm text-white backdrop-blur hover:bg-black/60"
        >
          <ChevronLeft className="size-4" /> Bộ thẻ
        </Link>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h1 className="text-2xl font-bold">{deck.title}</h1>
          {deck.description && (
            <p className="text-sm text-white/85">{deck.description}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button render={<Link href={`/study/${deck.id}`} />} className="flex-1 sm:flex-none">
          Học ngay
        </Button>
        <AddCardDrawer deckId={deck.id} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-muted-foreground">
          {deck.cards.length} thẻ
        </h2>
        {deck.cards.length === 0 ? (
          <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            Chưa có thẻ nào. Bấm “Thêm thẻ” để thêm từ đầu tiên!
          </p>
        ) : (
          deck.cards.map((card) => (
            <div
              key={card.id}
              className="flex items-start justify-between gap-4 rounded-xl border bg-card p-4"
            >
              <div className="min-w-0">
                <div className="font-semibold">
                  {card.term}{" "}
                  {card.ipa && (
                    <span className="font-normal text-muted-foreground">
                      {card.ipa}
                    </span>
                  )}
                </div>
                <div className="text-sm">{card.meaning}</div>
                {card.example && (
                  <div className="text-sm italic text-muted-foreground">
                    {card.example}
                  </div>
                )}
              </div>
              <form action={deleteCard.bind(null, card.id)}>
                <Button type="submit" variant="ghost" size="sm">
                  Xoá
                </Button>
              </form>
            </div>
          ))
        )}
      </div>

      <form action={deleteDeck.bind(null, deck.id)} className="pt-2">
        <Button type="submit" variant="ghost" size="sm" className="text-destructive">
          Xoá bộ thẻ này
        </Button>
      </form>
    </div>
  );
}
