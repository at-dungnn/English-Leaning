import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import type { Role } from "@/generated/prisma/enums";

// Edge-safe base config (no DB / node-only modules here).
// The Credentials provider + Prisma adapter live in src/lib/auth.ts.
// Social providers are only enabled when their env keys are present.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    ...(process.env.AUTH_GOOGLE_ID ? [Google] : []),
    ...(process.env.AUTH_FACEBOOK_ID ? [Facebook] : []),
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
