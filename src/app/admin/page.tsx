import type { Metadata } from "next";
import Link from "next/link";
import { Users, Library, FileText, Globe, Layers } from "lucide-react";
import { getAdminStats } from "@/server/admin/queries";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Admin — Tổng quan" };

export default async function AdminHomePage() {
  const s = await getAdminStats();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>
        <p className="text-sm text-muted-foreground">
          Toàn cảnh hệ thống English Learning.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Người dùng" value={s.users} icon={<Users />} />
        <Stat label="Quản trị viên" value={s.admins} icon={<Users />} />
        <Stat label="Tổng bộ thẻ" value={s.decks} icon={<Library />} />
        <Stat label="Bộ thẻ công khai" value={s.publicDecks} icon={<Globe />} />
        <Stat label="Tổng số thẻ" value={s.cards} icon={<Layers />} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button render={<Link href="/admin/users" />}>Quản lý người dùng</Button>
        <Button render={<Link href="/admin/decks" />} variant="outline">
          Quản lý bộ thẻ
        </Button>
        <Button render={<Link href="/admin/materials" />} variant="outline">
          Quản lý tài liệu
        </Button>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground [&_svg]:size-5">
        {icon}
      </div>
      <div>
        <div className="text-3xl font-bold leading-none tracking-tight">
          {value}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
