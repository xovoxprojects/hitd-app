import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      })
    ] : []),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;

        // Fetch user from db to get credits and plan
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { credits: true, plan: true }
        });

        if (dbUser) {
          session.user.credits = dbUser.credits ?? 0;
          session.user.plan = dbUser.plan ?? "none";
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  }
};
