import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Minimal config for diagnostics - adapter temporarily removed
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "hitd-fallback-secret-please-set-env",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
};
