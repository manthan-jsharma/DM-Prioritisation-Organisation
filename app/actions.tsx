// import { getServerSession } from "next-auth/next";

// import { fetchEmails, type Email } from "@/lib/gmail";

// export async function getEmails(): Promise<Email[]> {
//   const session = await getServerSession();
//   if (!session?.accessToken) {
//     throw new Error("Not authenticated");
//   }

//   return fetchEmails(accessToken);
// }
"use server";
import { fetchEmails, fetchEmailsByCategory, type Email } from "@/lib/gmail";
// import { getServerSession} from "next-auth/next";

import { Session } from "next-auth";

interface CustomSession extends Session {
  accessToken: string;
}

export async function getServerSession(context: any) {
  const session = await import("next-auth/react").then(({ getSession }) =>
    getSession(context)
  );
  return session as unknown as CustomSession;
}
export async function getEmails(): Promise<Email[]> {
  const session = await getServerSession({ req: {} });

  if (!session?.accessToken) {
    throw new Error("Not authenticated");
  }

  return fetchEmails(session.accessToken);
}

export async function getEmailsByCategory(category: string): Promise<Email[]> {
  const session = await getServerSession({ req: {} });

  if (!session?.accessToken) {
    throw new Error("Not authenticated");
  }

  return fetchEmailsByCategory(session.accessToken, category);
}
