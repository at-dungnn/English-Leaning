"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Library, FileText, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Người dùng", icon: Users },
  { href: "/admin/decks", label: "Bộ thẻ", icon: Library },
  { href: "/admin/materials", label: "Tài liệu", icon: FileText },
];

export function AdminNav() {
  const pathname = usePathname();
  const active = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="flex flex-wrap items-center gap-1">
      {ITEMS.map(({ href, label, icon: Icon, exact }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            active(href, exact)
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
      <Link
        href="/dashboard"
        className="ml-1 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Về app
      </Link>
    </nav>
  );
}
