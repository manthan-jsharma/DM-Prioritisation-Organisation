declare module "next-auth" {
  interface Session {
    accessToken?: string | undefined;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
