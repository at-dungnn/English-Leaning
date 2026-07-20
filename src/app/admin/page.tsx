import type { Metadata } from "next";
import Link from "next/link";
import { getAdminStats } from "@/server/admin/queries";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Admin — Tổng quan" };

export default async function AdminHomePage() {
  const s = await getAdminStats();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Người dùng" value={s.users} />
        <Stat label="Quản trị viên" value={s.admins} />
        <Stat label="Tổng bộ thẻ" value={s.decks} />
        <Stat label="Bộ thẻ công khai" value={s.publicDecks} />
        <Stat label="Tổng số thẻ" value={s.cards} />
      </div>
      <div className="flex gap-3">
        <Button render={<Link href="/admin/users" />}>Quản lý người dùng</Button>
        <Button render={<Link href="/admin/decks" />} variant="outline">
          Quản lý nội dung
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border p-5">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
