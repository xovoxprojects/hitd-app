import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { sendVerificationRequest, sendWelcomeEmail } from "./emailTemplates";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  events: {
    async createUser({ user }) {
      if (user.email) {
        await sendWelcomeEmail(user.email, user.name || null);
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;

        // Fetch user from db to get credits and plan
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { credits: true, plan: true, role: true, brokerCode: true }
          });

          if (dbUser) {
            session.user.credits = dbUser.credits ?? 0;
            session.user.plan = dbUser.plan ?? "none";
            session.user.role = dbUser.role ?? "user";
            session.user.brokerCode = dbUser.brokerCode ?? null;
          }
        } catch (dbError) {
          console.error("Auth session db error:", dbError);
          session.user.credits = 0;
          session.user.plan = "none";
          session.user.role = "user";
          session.user.brokerCode = null;
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
