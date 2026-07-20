import Link from "next/link";
import { BookOpen, Brain, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <span className="text-lg font-bold tracking-tight">
          English<span className="text-primary">Leaning</span>
        </span>
        <nav className="flex items-center gap-2">
          <Button render={<Link href="/login" />} variant="ghost">
            Đăng nhập
          </Button>
          <Button render={<Link href="/register" />}>Đăng ký</Button>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        {/* Decorative glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />
        <span className="mb-4 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
          Học từ vựng thông minh cho người Việt 🇻🇳
        </span>
        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Nhớ từ vựng tiếng Anh{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
            lâu gấp 3 lần
          </span>{" "}
          với Flashcard &amp; SRS
        </h1>
        <p className="mt-6 max-w-xl text-balance text-lg text-muted-foreground">
          Ôn tập giãn cách theo khoa học, luyện thi TOEIC &amp; IELTS, theo dõi
          tiến độ mỗi ngày. Bắt đầu miễn phí ngay hôm nay.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button render={<Link href="/register" />} size="lg">
            Bắt đầu học miễn phí
          </Button>
          <Button render={<Link href="/login" />} size="lg" variant="outline">
            Tôi đã có tài khoản
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid w-full max-w-4xl gap-6 sm:grid-cols-3">
          <Feature
            icon={<BookOpen className="size-6" />}
            title="Flashcard"
            desc="Thẻ từ vựng có phiên âm, nghĩa, ví dụ và hình ảnh."
          />
          <Feature
            icon={<Brain className="size-6" />}
            title="Ôn tập SRS"
            desc="Nhắc ôn đúng lúc sắp quên để nhớ lâu hơn."
          />
          <Feature
            icon={<Trophy className="size-6" />}
            title="Động lực"
            desc="Chuỗi ngày học, điểm số và bảng xếp hạng."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-6xl px-6 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} EnglishLeaning. Học tiếng Anh mỗi ngày.
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border p-6">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
