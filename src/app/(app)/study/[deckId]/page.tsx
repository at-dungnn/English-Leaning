import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStudyQueue } from "@/server/study/queries";
import { StudySession } from "@/components/study/study-session";

export const metadata: Metadata = { title: "Học flashcard" };

export default async function StudyPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;
  const data = await getStudyQueue(deckId);
  if (!data) notFound();

  return (
    <StudySession
      deckId={deckId}
      deckTitle={data.deck.title}
      cards={data.cards}
    />
  );
}
