import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    credits?: number;
    plan?: string;
    role?: string;
    brokerCode?: string | null;
  }

  interface Session {
    user: User;
  }
}
