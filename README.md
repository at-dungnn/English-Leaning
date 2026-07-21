# English Learning

🌐 **Live:** https://english-leaning.vercel.app

Web app học từ vựng tiếng Anh cho người Việt (flashcard, ôn tập giãn cách SRS, TOEIC/IELTS).
Xem `CLAUDE.md` để biết tech stack, quy ước và lộ trình phát triển.

## Yêu cầu
- Node.js 20+ (đã có)
- Một database PostgreSQL — khuyến nghị [Neon](https://neon.tech) (miễn phí)

## Chạy dev

```bash
# 1. Cài thư viện
npm install

# 2. Tạo file .env từ mẫu rồi điền biến môi trường
cp .env.example .env      # (Windows: copy .env.example .env)

# 3. Tạo bảng database (cần DATABASE_URL trong .env)
npx prisma migrate dev

# 4. Chạy app
npm run dev
```

Mở http://localhost:3000

## Biến môi trường (xem `.env.example`)
- `DATABASE_URL` — chuỗi kết nối Neon PostgreSQL
- `AUTH_SECRET`, `AUTH_URL` — Auth.js (sinh secret: `npx auth secret`)
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — đăng nhập Google
- `AUTH_FACEBOOK_ID` / `AUTH_FACEBOOK_SECRET` — đăng nhập Facebook
- `RESEND_API_KEY` — email (giai đoạn sau)
- `PAYOS_*` — thanh toán (giai đoạn sau)

## Lệnh hữu ích
- `npm run build` — build production
- `npx prisma studio` — xem/sửa dữ liệu database
- `npx prisma generate` — sinh lại Prisma client sau khi đổi schema

## Cấu trúc
```
src/
  app/            # App Router: (marketing) (auth) (app) admin api
  components/ui/  # shadcn/ui
  lib/            # db.ts (Prisma), auth, utils
  server/         # server actions theo tính năng
  generated/      # Prisma client (tự sinh, đã gitignore)
prisma/           # schema.prisma, migrations
```
