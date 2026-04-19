import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET || "hitd-default-secret-production-safe",
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      })
    ] : []),
    ...(process.env.EMAIL_SERVER ? [
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      })
    ] : []),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;

        // Fetch user from db to get credits and plan
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { credits: true, plan: true }
        });

        if (dbUser) {
          session.user.credits = dbUser.credits;
          session.user.plan = dbUser.plan;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: "/login",
  }
};
