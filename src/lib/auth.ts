import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;

        // Fetch user from db to get credits and plan
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { credits: true, plan: true }
          });

          if (dbUser) {
            session.user.credits = dbUser.credits ?? 0;
            session.user.plan = dbUser.plan ?? "none";
          }
        } catch (dbError) {
          console.error("Auth session db error (schema mismatch?):", dbError);
          // Fallbacks to prevent auth break
          session.user.credits = 0;
          session.user.plan = "none";
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
