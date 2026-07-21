import Link from "next/link";
import { BookOpen, Brain, Trophy, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <Button render={<Link href="/login" />} variant="ghost" size="sm">
              Đăng nhập
            </Button>
            <Button render={<Link href="/register" />} size="sm">
              Đăng ký
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-8">
          {/* Copy */}
          <div className="flex flex-col items-start gap-5 text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="size-4" /> Học từ vựng thông minh cho người Việt
            </span>
            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Nhớ từ vựng tiếng Anh{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                lâu gấp 3 lần
              </span>
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Flashcard + ôn tập giãn cách (SRS) theo khoa học, luyện TOEIC &amp;
              IELTS, theo dõi streak và tiến độ mỗi ngày.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button render={<Link href="/register" />} size="lg" className="w-full sm:w-auto">
                Bắt đầu học miễn phí
              </Button>
              <Button
                render={<Link href="/login" />}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Tôi đã có tài khoản
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {["Miễn phí để bắt đầu", "Không cần thẻ tín dụng", "Học mọi lúc"].map(
                (t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-emerald-600" /> {t}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Visual: flashcard preview */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div className="rounded-3xl border bg-card p-6 shadow-xl sm:p-8">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Flashcard
              </div>
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <div className="text-3xl font-bold sm:text-4xl">ubiquitous</div>
                <div className="text-muted-foreground">/juːˈbɪkwɪtəs/</div>
                <div className="mt-4 w-full border-t pt-4 text-lg font-semibold text-primary">
                  phổ biến, có mặt khắp nơi
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs font-medium">
                <span className="rounded-lg bg-red-600 py-2 text-center text-white">Quên</span>
                <span className="rounded-lg bg-orange-500 py-2 text-center text-white">Khó</span>
                <span className="rounded-lg bg-emerald-600 py-2 text-center text-white">Được</span>
                <span className="rounded-lg bg-blue-600 py-2 text-center text-white">Dễ</span>
              </div>
            </div>
            {/* floating pills */}
            <div className="absolute -right-3 -top-4 rotate-3 rounded-full border bg-background px-3 py-1.5 text-sm font-semibold shadow-lg">
              🔥 7 ngày streak
            </div>
            <div className="absolute -bottom-4 -left-3 -rotate-3 rounded-full border bg-background px-3 py-1.5 text-sm font-semibold shadow-lg">
              ⭐ +1.240 điểm
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Vì sao học ở đây nhớ lâu hơn?
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Feature
            icon={<BookOpen className="size-6" />}
            color="bg-indigo-500/10 text-indigo-600"
            title="Flashcard trực quan"
            desc="Thẻ có phiên âm, nghĩa, ví dụ và hình ảnh — nhớ nhanh, nhớ sâu."
          />
          <Feature
            icon={<Brain className="size-6" />}
            color="bg-emerald-500/10 text-emerald-600"
            title="Ôn tập giãn cách (SRS)"
            desc="Thuật toán SM-2 nhắc ôn đúng lúc sắp quên để tối ưu trí nhớ."
          />
          <Feature
            icon={<Trophy className="size-6" />}
            color="bg-orange-500/10 text-orange-600"
            title="Tạo động lực"
            desc="Chuỗi ngày học, điểm số và bảng xếp hạng giữ bạn học đều mỗi ngày."
          />
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-emerald-600 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Sẵn sàng chinh phục từ vựng?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">
            Tạo tài khoản trong 30 giây và học bộ thẻ đầu tiên ngay hôm nay.
          </p>
          <Button
            render={<Link href="/register" />}
            size="lg"
            className="mt-6 bg-white text-indigo-700 hover:bg-white/90"
          >
            Bắt đầu miễn phí
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:px-6 sm:text-left">
          <Logo className="text-base" />
          <span>© {new Date().getFullYear()} English Learning. Học tiếng Anh mỗi ngày.</span>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  icon,
  color,
  title,
  desc,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-6">
      <div className={`flex size-12 items-center justify-center rounded-xl ${color}`}>
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
