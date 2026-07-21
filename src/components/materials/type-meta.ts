import {
  BookOpen,
  FileText,
  Languages,
  Headphones,
  Award,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import type { MaterialTypeValue } from "@/lib/materials";

// Icon + color per material type — for richer learner-facing cards.
export const TYPE_META: Record<
  MaterialTypeValue,
  { label: string; icon: LucideIcon; className: string }
> = {
  READING: { label: "Bài đọc", icon: BookOpen, className: "bg-blue-500/10 text-blue-600" },
  GRAMMAR: { label: "Ngữ pháp", icon: FileText, className: "bg-violet-500/10 text-violet-600" },
  VOCABULARY: { label: "Từ vựng", icon: Languages, className: "bg-emerald-500/10 text-emerald-600" },
  LISTENING: { label: "Luyện nghe", icon: Headphones, className: "bg-orange-500/10 text-orange-600" },
  TOEIC: { label: "TOEIC", icon: Award, className: "bg-indigo-500/10 text-indigo-600" },
  IELTS: { label: "IELTS", icon: GraduationCap, className: "bg-rose-500/10 text-rose-600" },
};
