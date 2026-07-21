import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import type { Role } from "@/generated/prisma/enums";

// Edge-safe base config (no DB / node-only modules here).
// The Credentials provider + Prisma adapter live in src/lib/auth.ts.
// Social providers are only enabled when their env keys are present.
export const authConfig = {
  // Trust the deployment host (Vercel) so redirects use the real domain, not localhost.
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  providers: [
    // allowDangerousEmailAccountLinking: link social login to an existing
    // account with the same email. Safe here because Google/Facebook verify emails.
    ...(process.env.AUTH_GOOGLE_ID
      ? [Google({ allowDangerousEmailAccountLinking: true })]
      : []),
    ...(process.env.AUTH_FACEBOOK_ID
      ? [Facebook({ allowDangerousEmailAccountLinking: true })]
      : []),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
