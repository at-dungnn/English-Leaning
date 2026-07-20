import Link from "next/link";
import { notFound } from "next/navigation";
import { getDeckWithCards } from "@/server/decks/queries";
import { deleteCard, deleteDeck } from "@/server/decks/actions";
import { AddCardForm } from "@/components/decks/add-card-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DeckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deck = await getDeckWithCards(id);
  if (!deck) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/decks"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Bộ thẻ
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{deck.title}</h1>
          {deck.description && (
            <p className="text-muted-foreground">{deck.description}</p>
          )}
        </div>
        <Button render={<Link href={`/study/${deck.id}`} />}>Học ngay</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thêm thẻ mới</CardTitle>
        </CardHeader>
        <CardContent>
          <AddCardForm deckId={deck.id} />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-muted-foreground">
          {deck.cards.length} thẻ
        </h2>
        {deck.cards.map((card) => (
          <div
            key={card.id}
            className="flex items-start justify-between gap-4 rounded-lg border p-4"
          >
            <div>
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
        ))}
      </div>

      <form action={deleteDeck.bind(null, deck.id)} className="pt-4">
        <Button type="submit" variant="ghost" size="sm" className="text-destructive">
          Xoá bộ thẻ này
        </Button>
      </form>
    </div>
  );
}
