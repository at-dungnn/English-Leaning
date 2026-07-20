import Link from "next/link";
import { requireAdmin } from "@/lib/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin(); // defense-in-depth (proxy already gates /admin)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-8">
      <header className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b pb-4">
        <span className="font-bold">🛠️ Admin · EnglishLeaning</span>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/admin" className="hover:text-foreground">
            Tổng quan
          </Link>
          <Link href="/admin/users" className="hover:text-foreground">
            Người dùng
          </Link>
          <Link href="/admin/decks" className="hover:text-foreground">
            Bộ thẻ
          </Link>
          <Link href="/admin/materials" className="hover:text-foreground">
            Tài liệu
          </Link>
          <Link href="/dashboard" className="hover:text-foreground">
            ← Về app
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
