"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { reviewCard } from "@/server/study/actions";
import type { ReviewGrade } from "@/lib/srs";
import type { StudyCard } from "@/server/study/queries";
import { Button } from "@/components/ui/button";

const GRADES: { grade: ReviewGrade; label: string; className: string }[] = [
  { grade: "again", label: "Quên", className: "bg-red-600 text-white hover:bg-red-600/90" },
  { grade: "hard", label: "Khó", className: "bg-orange-500 text-white hover:bg-orange-500/90" },
  { grade: "good", label: "Được", className: "bg-emerald-600 text-white hover:bg-emerald-600/90" },
  { grade: "easy", label: "Dễ", className: "bg-blue-600 text-white hover:bg-blue-600/90" },
];

export function StudySession({
  deckId,
  deckTitle,
  cards,
}: {
  deckId: string;
  deckTitle: string;
  cards: StudyCard[];
}) {
  const [queue, setQueue] = useState<StudyCard[]>(cards);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [pending, startTransition] = useTransition();

  if (queue.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <div className="text-6xl">🎉</div>
        <h1 className="text-2xl font-bold">Hoàn thành!</h1>
        <p className="text-muted-foreground">
          {cards.length === 0
            ? "Không có thẻ nào cần học lúc này. Quay lại sau nhé!"
            : `Bạn đã ôn ${reviewed} lượt. Làm tốt lắm! 💪`}
        </p>
        <div className="flex gap-2">
          <Button render={<Link href={`/decks/${deckId}`} />} variant="outline">
            Về bộ thẻ
          </Button>
          <Button render={<Link href="/dashboard" />}>Dashboard</Button>
        </div>
      </div>
    );
  }

  const current = queue[0];
  const total = cards.length;
  const progress = Math.min(100, Math.round((reviewed / Math.max(total, 1)) * 100));

  function handleGrade(grade: ReviewGrade) {
    startTransition(async () => {
      await reviewCard(current.id, grade);
      setReviewed((n) => n + 1);
      setRevealed(false);
      setQueue((q) => {
        const [first, ...rest] = q;
        return grade === "again" ? [...rest, first] : rest;
      });
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-5 px-6 py-8">
      {/* Header + progress */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <Link
            href={`/decks/${deckId}`}
            className="text-muted-foreground hover:text-foreground"
          >
            ← {deckTitle}
          </Link>
          <span className="text-muted-foreground">Còn lại: {queue.length}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard with 3D flip */}
      <div className="[perspective:1200px]">
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          className="relative block h-72 w-full text-left [transform-style:preserve-3d] transition-transform duration-500"
          style={{ transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)" }}
          aria-label="Lật thẻ"
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border bg-card p-8 text-center shadow-sm [backface-visibility:hidden]">
            <div className="text-4xl font-bold">{current.term}</div>
            {current.ipa && (
              <div className="text-lg text-muted-foreground">{current.ipa}</div>
            )}
            <div className="absolute bottom-5 text-xs text-muted-foreground">
              Nhấn để xem nghĩa
            </div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border border-primary/30 bg-primary/5 p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="text-sm font-medium text-muted-foreground">
              {current.term}
            </div>
            <div className="text-2xl font-semibold text-primary">
              {current.meaning}
            </div>
            {current.example && (
              <div className="text-sm italic text-muted-foreground">
                “{current.example}”
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Controls */}
      {!revealed ? (
        <Button size="lg" onClick={() => setRevealed(true)}>
          Hiện đáp án
        </Button>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <Button
              key={g.grade}
              disabled={pending}
              onClick={() => handleGrade(g.grade)}
              className={g.className}
            >
              {g.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
