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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Người dùng</h1>
        <p className="text-sm text-muted-foreground">{users.length} tài khoản</p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Người dùng</th>
                <th className="px-4 py-3 font-medium">Vai trò</th>
                <th className="px-4 py-3 font-medium">Bộ thẻ</th>
                <th className="px-4 py-3 text-right font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t transition-colors hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {u.name ?? "(chưa đặt tên)"}
                      {u.id === me.id && (
                        <span className="ml-1 text-xs text-muted-foreground">
                          (bạn)
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={u.role === "ADMIN" ? "default" : "secondary"}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {u._count.decks}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {u.id !== me.id && (
                      <form
                        action={setUserRole.bind(
                          null,
                          u.id,
                          u.role === "ADMIN" ? "USER" : "ADMIN",
                        )}
                        className="inline"
                      >
                        <Button type="submit" size="sm" variant="outline">
                          {u.role === "ADMIN" ? "Gỡ admin" : "Cấp admin"}
                        </Button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
