# English Learning — Project Rules & Guide

> An AI-assisted English vocabulary learning web app for Vietnamese learners (TOEIC / IELTS / conversation).
> Inspired by heywordvocab.com. Built with Next.js + TypeScript + Prisma.

**Important Next.js note (imported from AGENTS.md):**
@AGENTS.md

---

## 1. Tech Stack (do NOT swap without discussion)

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 16** (App Router, React 19) + **TypeScript** (strict) |
| UI | **Tailwind CSS** + **shadcn/ui** (Radix). Use the `ui-ux-pro-max` skill for design decisions. |
| Database | **PostgreSQL** (Neon serverless in prod, local Postgres or Neon branch in dev) |
| ORM | **Prisma** |
| Auth | **Auth.js (NextAuth v5)** — Credentials (email+password) + Google + Facebook |
| Validation | **Zod** (every API input & form) |
| Payments | **PayOS** (Phase 6 — course selling) |
| Storage | **Vercel Blob** or **Cloudinary** (flashcard images, materials) |
| Email | **Resend** (verification, password reset) |
| Hosting | **Vercel** |
| SRS algorithm | **SM-2** (start simple); FSRS optional later |

## 2. Folder structure

```
src/
  app/                 # Next.js App Router
    (marketing)/       # public landing, pricing
    (auth)/            # login, register, forgot-password
    (app)/             # authenticated learner area (dashboard, decks, review)
    admin/             # admin panel (role-gated)
    api/               # route handlers (webhooks, non-Server-Action endpoints)
  components/
    ui/                # shadcn/ui primitives
    <feature>/         # feature-specific components
  lib/                 # db.ts (Prisma client), auth.ts, utils, srs.ts, payos.ts
  server/              # server actions grouped by feature
  types/
prisma/
  schema.prisma
  migrations/
```

## 3. Coding conventions

- **Server Components by default.** Add `"use client"` only when you need state, effects, or browser APIs.
- **Data mutations → Server Actions** in `src/server/<feature>/*.ts`. Reserve `app/api/*` for webhooks and third-party callbacks.
- **Validate every input with Zod** at the server boundary. Never trust client data.
- **Prisma client is a singleton** from `src/lib/db.ts` (avoid connection exhaustion in dev).
- TypeScript **strict**; no `any` unless justified with a comment.
- Tailwind for styling; no inline style objects except for dynamic values.
- Keep components small; colocate feature components under `components/<feature>/`.
- File names: `kebab-case` for files, `PascalCase` for React components.
- Next.js 16 has breaking changes vs older versions — check `node_modules/next/dist/docs/` when unsure about an API.

## 4. Database rules

- Change schema **only** via the `db-change` skill workflow: edit `schema.prisma` → `prisma migrate dev` → regenerate client → verify.
- Never edit generated migrations by hand.
- Every model has `id`, `createdAt`, `updatedAt`.
- Use relations, not loose foreign-key ints, where possible.
- Money stored as integer **VND** (no decimals); never floats for currency.

## 5. Auth & roles

- Roles: `USER` (learner) and `ADMIN`. Store on the `User` model.
- Admin area (`/admin`) is gated in middleware AND re-checked in every admin Server Action (defense in depth).
- Passwords hashed with **bcrypt**/argon2. Never log or return password hashes.
- Social login (Google/Facebook) links to the same `User` by verified email.

## 6. Security (non-negotiable)

- All secrets in `.env` (git-ignored). Never commit keys. Provide `.env.example`.
- Verify PayOS webhook signatures server-side before granting course access.
- Rate-limit auth endpoints.
- Authorization checked on the server for every protected action — never rely on hidden UI alone.

## 7. Git workflow

- Feature branches off `main`; small, focused commits.
- Commit messages: imperative mood, present tense.
- Do not commit until the user asks. Never commit secrets or `.env`.

## 8. Building features (use the custom agents & skills)

- **`db-architect`** agent → any schema design/change (wraps the `db-change` skill).
- **`ui-builder`** agent → React components/pages (wraps `ui-component` + `ui-ux-pro-max`).
- **`code-reviewer`** agent → independent review after each feature.
- **`feature-slice`** skill → full vertical slice (model → action → UI → verify).
- Follow **`test-driven-development`** and **`verification-before-completion`** for non-trivial logic (SRS scheduler, payment flow).

## 9. Roadmap (phase order)

0. **Setup** — scaffold Next.js+TS+Tailwind+shadcn, Prisma+Neon, deploy skeleton to Vercel. ← IN PROGRESS
1. **Auth** — email/password + Google + Facebook, email verification, profile.
2. **Core learning** — Deck → Card model, study UI, **SM-2 SRS**, progress tracking.
3. **Admin panel** — CRUD decks/cards/materials, user management, role gating.
4. **Learning materials** — reading/grammar/TOEIC-IELTS library with categories.
5. **Gamification** — streaks, points, leaderboard, progress charts.
6. **Course selling** — Course/Lesson/Order models, **PayOS** checkout + webhook, enrollment.
7. **AI features** — AI flashcard generation (Claude API), AI pronunciation grading.
8. **Polish & launch** — SEO, analytics, performance, accessibility, error monitoring.

## 10. Core data model (target — build incrementally per phase)

- **User** (role, profile, auth accounts) — Phase 1
- **Deck** (owner/admin, title, public/private) & **Card** (term, ipa, meaning, example, image) — Phase 2
- **Review** (userId, cardId, ease, interval, dueAt, repetitions) — SM-2 state — Phase 2
- **Material** (type, title, body, level, tags) — Phase 4
- **Streak / Points / LeaderboardEntry** — Phase 5
- **Course / Lesson / Order / Enrollment** — Phase 6

---

_Keep this file updated as the project evolves. It is the source of truth for how we build English Learning._
