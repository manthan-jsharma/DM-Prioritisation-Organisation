// import { getServerSession } from "next-auth/next";

// import { fetchEmails, type Email } from "@/lib/gmail";

// export async function getEmails(): Promise<Email[]> {
//   const session = await getServerSession();
//   if (!session?.accessToken) {
//     throw new Error("Not authenticated");
//   }

//   return fetchEmails(accessToken);
// }
import { fetchEmails, fetchEmailsByCategory, type Email } from "@/lib/gmail";
import { getServerSession } from "next-auth/next";

export async function getEmails(): Promise<Email[]> {
  const session = await getServerSession();

  if (!session?.accessToken) {
    throw new Error("Not authenticated");
  }

  return fetchEmails(session.accessToken);
}

export async function getEmailsByCategory(category: string): Promise<Email[]> {
  const session = await getServerSession();

  if (!session?.accessToken) {
    throw new Error("Not authenticated");
  }

  return fetchEmailsByCategory(session.accessToken, category);
}
