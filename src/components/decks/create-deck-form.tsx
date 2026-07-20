"use client";

import { useActionState } from "react";
import { createDeck } from "@/server/decks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CreateDeckForm() {
  const [state, action, pending] = useActionState(createDeck, undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tạo bộ thẻ mới</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="VD: TOEIC 600 từ vựng cơ bản"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Mô tả (tuỳ chọn)</Label>
            <Textarea id="description" name="description" rows={2} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isPublic" className="size-4" />
            Công khai cho người khác học
          </label>
          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          <Button type="submit" disabled={pending} className="self-start">
            {pending ? "Đang tạo..." : "Tạo bộ thẻ"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
