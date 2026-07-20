// Shared constants & Vietnamese labels for learning materials.

export const MATERIAL_TYPES = [
  "READING",
  "GRAMMAR",
  "VOCABULARY",
  "LISTENING",
  "TOEIC",
  "IELTS",
] as const;

export const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export type MaterialTypeValue = (typeof MATERIAL_TYPES)[number];
export type LevelValue = (typeof LEVELS)[number];

export const MATERIAL_TYPE_LABELS: Record<MaterialTypeValue, string> = {
  READING: "Bài đọc",
  GRAMMAR: "Ngữ pháp",
  VOCABULARY: "Từ vựng",
  LISTENING: "Luyện nghe",
  TOEIC: "TOEIC",
  IELTS: "IELTS",
};

export const LEVEL_LABELS: Record<LevelValue, string> = {
  BEGINNER: "Cơ bản",
  INTERMEDIATE: "Trung cấp",
  ADVANCED: "Nâng cao",
};
