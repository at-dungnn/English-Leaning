import { z } from "zod";

export const deckSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tiêu đề").max(100),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().optional(),
});

export const cardSchema = z.object({
  term: z.string().min(1, "Vui lòng nhập từ").max(200),
  ipa: z.string().max(200).optional(),
  meaning: z.string().min(1, "Vui lòng nhập nghĩa").max(500),
  example: z.string().max(1000).optional(),
});

export type DeckInput = z.infer<typeof deckSchema>;
export type CardInput = z.infer<typeof cardSchema>;
