import { z } from "zod";
import { MATERIAL_TYPES, LEVELS } from "@/lib/materials";

export const materialSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tiêu đề").max(200),
  summary: z.string().max(500).optional(),
  body: z.string().min(1, "Vui lòng nhập nội dung"),
  type: z.enum(MATERIAL_TYPES),
  level: z.enum(LEVELS),
  tags: z.array(z.string().min(1)).max(20),
  isPublished: z.boolean().optional(),
});

export type MaterialInput = z.infer<typeof materialSchema>;

/** Parse the comma-separated tags field into a clean array. */
export function parseTags(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
