import type { Metadata } from "next";
import { requireAdmin } from "@/lib/session";
import { getAllUsers } from "@/server/admin/queries";
import { setUserRole } from "@/server/admin/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Admin — Người dùng" };

export default async function AdminUsersPage() {
  const me = await requireAdmin();
  const users = await getAllUsers();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">
        Người dùng ({users.length})
      </h1>
      <div className="flex flex-col divide-y rounded-lg border">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex flex-wrap items-center justify-between gap-3 p-4"
          >
            <div>
              <div className="font-medium">
                {u.name ?? "(chưa đặt tên)"}{" "}
                {u.id === me.id && (
                  <span className="text-xs text-muted-foreground">(bạn)</span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {u.email} · {u._count.decks} bộ thẻ
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={u.role === "ADMIN" ? "default" : "secondary"}>
                {u.role}
              </Badge>
              {u.id !== me.id && (
                <form
                  action={setUserRole.bind(
                    null,
                    u.id,
                    u.role === "ADMIN" ? "USER" : "ADMIN",
                  )}
                >
                  <Button type="submit" size="sm" variant="outline">
                    {u.role === "ADMIN" ? "Gỡ quyền admin" : "Cấp quyền admin"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
