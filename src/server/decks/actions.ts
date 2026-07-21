"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { cardSchema, deckSchema } from "./schemas";

export type DeckActionState = { error?: string; ok?: boolean } | undefined;

export async function createDeck(
  _prev: DeckActionState,
  formData: FormData,
): Promise<DeckActionState> {
  const user = await requireUser();
  const parsed = deckSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    isPublic: formData.get("isPublic") === "on",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }
  const deck = await db.deck.create({
    data: { ...parsed.data, ownerId: user.id },
  });
  redirect(`/decks/${deck.id}`);
}

export async function addCard(
  deckId: string,
  _prev: DeckActionState,
  formData: FormData,
): Promise<DeckActionState> {
  const user = await requireUser();
  const deck = await db.deck.findUnique({ where: { id: deckId } });
  if (!deck || deck.ownerId !== user.id) {
    return { error: "Bạn không có quyền chỉnh sửa bộ thẻ này" };
  }
  const parsed = cardSchema.safeParse({
    term: formData.get("term"),
    ipa: formData.get("ipa") || undefined,
    meaning: formData.get("meaning"),
    example: formData.get("example") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }
  await db.card.create({ data: { ...parsed.data, deckId } });
  revalidatePath(`/decks/${deckId}`);
  return { ok: true };
}

export async function deleteCard(cardId: string) {
  const user = await requireUser();
  const card = await db.card.findUnique({
    where: { id: cardId },
    include: { deck: true },
  });
  if (!card || card.deck.ownerId !== user.id) return;
  await db.card.delete({ where: { id: cardId } });
  revalidatePath(`/decks/${card.deckId}`);
}

export async function deleteDeck(deckId: string) {
  const user = await requireUser();
  const deck = await db.deck.findUnique({ where: { id: deckId } });
  if (!deck || deck.ownerId !== user.id) return;
  await db.deck.delete({ where: { id: deckId } });
  redirect("/decks");
}
