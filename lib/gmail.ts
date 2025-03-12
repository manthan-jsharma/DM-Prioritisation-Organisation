export type Email = {
  id: string;
  threadId: string;
  from: string;
  to: string;
  subject: string;
  snippet: string;
  date: Date;
  isRead: boolean;
  isDirect: boolean;
  priority: number;
};
export async function fetchEmails(
  accessToken: string,
  maxResults = 20
): Promise<Email[]> {
  try {
    // Fetch list of messages
    const messagesResponse = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!messagesResponse.ok) {
      throw new Error(
        `Failed to fetch messages: ${messagesResponse.statusText}`
      );
    }

    const messagesData = await messagesResponse.json();
    const messageIds = messagesData.messages || [];

    // Fetch details for each message
    const emails: Email[] = await Promise.all(
      messageIds.map(async (message: { id: string; threadId: string }) => {
        const messageResponse = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!messageResponse.ok) {
          throw new Error(
            `Failed to fetch message ${message.id}: ${messageResponse.statusText}`
          );
        }

        const messageData = await messageResponse.json();

        // Parse headers
        const headers = messageData.payload.headers;
        const subject =
          headers.find((h: any) => h.name === "Subject")?.value ||
          "(No subject)";
        const from = headers.find((h: any) => h.name === "From")?.value || "";
        const to = headers.find((h: any) => h.name === "To")?.value || "";
        const date = new Date(
          Number.parseInt(
            headers.find((h: any) => h.name === "Date")?.value || Date.now()
          )
        );

        // Check if message is read
        const isRead = !messageData.labelIds.includes("UNREAD");

        // Determine if it's a direct message (simple heuristic: not from a mailing list or notification)
        const isDirect =
          !from.includes("noreply") &&
          !from.includes("no-reply") &&
          !from.includes("notifications") &&
          !subject.includes("Newsletter");

        // Calculate priority (simple algorithm)
        let priority = 0;

        // Direct messages get higher priority
        if (isDirect) priority += 5;

        // Unread messages get higher priority
        if (!isRead) priority += 3;

        // Recent messages get higher priority (within last 24 hours)
        const isRecent = Date.now() - date.getTime() < 24 * 60 * 60 * 1000;
        if (isRecent) priority += 2;

        return {
          id: message.id,
          threadId: message.threadId,
          subject,
          from,
          to,
          snippet: messageData.snippet,
          date,
          isRead,
          isDirect,
          priority,
        };
      })
    );

    // Sort by priority (highest first)
    return emails.sort((a, b) => b.priority - a.priority);
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
}
