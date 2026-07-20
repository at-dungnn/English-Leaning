// SM-2 spaced-repetition scheduling.
// Reference: https://super-memory.com/english/ol/sm2.htm
// We expose a 4-button grade (Again / Hard / Good / Easy) mapped to SM-2 quality q.

export type ReviewGrade = "again" | "hard" | "good" | "easy";

export interface SrsState {
  ease: number; // ease factor, >= 1.3
  interval: number; // days until next review (0 = still learning)
  repetitions: number; // consecutive successful recalls
}

export interface SrsResult extends SrsState {
  dueAt: Date;
}

// Map the 4 buttons to SM-2 quality scores (0..5).
const GRADE_QUALITY: Record<ReviewGrade, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

const MIN_EASE = 1.3;
export const INITIAL_STATE: SrsState = { ease: 2.5, interval: 0, repetitions: 0 };

/** Fresh SM-2 state for a card the user has never reviewed. */
export function initialState(): SrsState {
  return { ...INITIAL_STATE };
}

/**
 * Given the current SRS state and the user's grade, compute the next state
 * and the next due date. Pure function — `now` is injectable for testing.
 */
export function scheduleReview(
  state: SrsState,
  grade: ReviewGrade,
  now: Date = new Date(),
): SrsResult {
  const q = GRADE_QUALITY[grade];
  let ease = state.ease;
  let interval = state.interval;
  let repetitions = state.repetitions;

  if (q < 3) {
    // Failed recall — relearn from the start, show again shortly.
    repetitions = 0;
    interval = 0;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease);
    }
  }

  // Update ease factor with the SM-2 formula, floored at 1.3.
  ease = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ease < MIN_EASE) ease = MIN_EASE;

  const dueAt = new Date(now.getTime());
  if (interval === 0) {
    // Still learning: resurface in ~1 minute (kept within the session).
    dueAt.setMinutes(dueAt.getMinutes() + 1);
  } else {
    dueAt.setDate(dueAt.getDate() + interval);
  }

  return { ease: round2(ease), interval, repetitions, dueAt };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
