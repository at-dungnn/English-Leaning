import Link from "next/link";
import { Logo } from "@/components/logo";
import { DesktopNav, BottomNav } from "@/components/app-nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/dashboard">
            <Logo />
          </Link>
          <DesktopNav />
        </div>
      </header>
      <div className="flex flex-1 flex-col pb-20 sm:pb-0">{children}</div>
      <BottomNav />
    </div>
  );
}
