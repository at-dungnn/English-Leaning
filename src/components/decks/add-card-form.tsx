"use client";

import { useActionState } from "react";
import { addCard } from "@/server/decks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AddCardForm({ deckId }: { deckId: string }) {
  const [state, action, pending] = useActionState(
    addCard.bind(null, deckId),
    undefined,
  );

  return (
    <form action={action} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="term">Từ tiếng Anh *</Label>
          <Input id="term" name="term" required placeholder="ubiquitous" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ipa">Phiên âm</Label>
          <Input id="ipa" name="ipa" placeholder="/juːˈbɪkwɪtəs/" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="meaning">Nghĩa tiếng Việt *</Label>
        <Input
          id="meaning"
          name="meaning"
          required
          placeholder="phổ biến, có mặt ở khắp nơi"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="example">Câu ví dụ (tuỳ chọn)</Label>
        <Textarea
          id="example"
          name="example"
          rows={2}
          placeholder="Smartphones are now ubiquitous."
        />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Đang thêm..." : "Thêm thẻ"}
      </Button>
    </form>
  );
}
