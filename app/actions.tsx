import { getServerSession } from "next-auth/next";

import { fetchEmails, type Email } from "@/lib/gmail";

export async function getEmails(): Promise<Email[]> {
  const session = await getServerSession();
  if (!session?.accessToken) {
    throw new Error("Not authenticated");
  }

  return fetchEmails(accessToken);
}
