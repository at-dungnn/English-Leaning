import type { Metadata } from "next";
import Link from "next/link";
import { getUserDecks } from "@/server/decks/queries";
import { CreateDeckForm } from "@/components/decks/create-deck-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = { title: "Bộ thẻ của tôi" };

export default async function DecksPage() {
  const decks = await getUserDecks();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Bộ thẻ của tôi</h1>
        <Button render={<Link href="/dashboard" />} variant="ghost">
          ← Dashboard
        </Button>
      </div>

      <CreateDeckForm />

      {decks.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          Chưa có bộ thẻ nào. Hãy tạo bộ thẻ đầu tiên ở trên nhé!
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {decks.map((deck) => (
            <Card key={deck.id}>
              <CardHeader>
                <CardTitle className="text-base">{deck.title}</CardTitle>
                <CardDescription>
                  {deck._count.cards} thẻ{deck.isPublic ? " · Công khai" : ""}
                </CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button render={<Link href={`/study/${deck.id}`} />} size="sm">
                  Học
                </Button>
                <Button
                  render={<Link href={`/decks/${deck.id}`} />}
                  size="sm"
                  variant="outline"
                >
                  Quản lý
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
