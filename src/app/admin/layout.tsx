import { requireAdmin } from "@/lib/session";
import { LogoMark } from "@/components/logo";
import { AdminNav } from "@/components/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin(); // defense-in-depth (proxy already gates /admin)

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-heading font-bold">
            <LogoMark className="size-7" />
            Admin
          </div>
          <AdminNav />
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </div>
    </div>
  );
}
