"use client";

import { useActionState } from "react";
import type { MaterialActionState } from "@/server/materials/actions";
import {
  LEVELS,
  LEVEL_LABELS,
  MATERIAL_TYPES,
  MATERIAL_TYPE_LABELS,
} from "@/lib/materials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormAction = (
  prev: MaterialActionState,
  formData: FormData,
) => Promise<MaterialActionState>;

interface MaterialInitial {
  title: string;
  summary: string | null;
  body: string;
  type: string;
  level: string;
  tags: string[];
  isPublished: boolean;
}

const selectClass =
  "h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs";

export function MaterialForm({
  action,
  initial,
  submitLabel,
}: {
  action: FormAction;
  initial?: MaterialInitial;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">Tiêu đề</Label>
        <Input id="title" name="title" required defaultValue={initial?.title} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="summary">Tóm tắt (tuỳ chọn)</Label>
        <Input
          id="summary"
          name="summary"
          defaultValue={initial?.summary ?? ""}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="type">Loại</Label>
          <select
            id="type"
            name="type"
            defaultValue={initial?.type ?? "READING"}
            className={selectClass}
          >
            {MATERIAL_TYPES.map((t) => (
              <option key={t} value={t}>
                {MATERIAL_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="level">Trình độ</Label>
          <select
            id="level"
            name="level"
            defaultValue={initial?.level ?? "BEGINNER"}
            className={selectClass}
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {LEVEL_LABELS[l]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="tags">Thẻ (cách nhau bởi dấu phẩy)</Label>
        <Input
          id="tags"
          name="tags"
          defaultValue={initial?.tags.join(", ")}
          placeholder="toeic, part 5, ngữ pháp"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="body">Nội dung</Label>
        <Textarea
          id="body"
          name="body"
          required
          rows={10}
          defaultValue={initial?.body}
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={initial?.isPublished}
          className="size-4"
        />
        Xuất bản (hiển thị cho người học)
      </label>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Đang lưu..." : submitLabel}
      </Button>
    </form>
  );
}
