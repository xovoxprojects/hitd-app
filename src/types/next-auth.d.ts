import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    credits?: number;
    plan?: string;
  }

  interface Session {
    user: User;
  }
}
