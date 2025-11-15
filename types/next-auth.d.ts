import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "guest" | "organizer";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "guest" | "organizer";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "guest" | "organizer";
  }
}
