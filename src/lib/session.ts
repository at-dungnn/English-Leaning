import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/** Returns the current session user, or redirects to /login if not authenticated. */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session.user;
}

/** Returns the current user only if ADMIN; otherwise redirects. Defense-in-depth alongside proxy. */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return session.user;
}
