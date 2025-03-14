import type { Email } from "./gmail";

// Common spam indicators in email subjects and content
const SPAM_KEYWORDS = [
  "limited time offer",
  "act now",
  "free",
  "discount",
  "sale",
  "buy now",
  "cash",
  "prize",
  "winner",
  "congratulations",
  "urgent",
  "exclusive deal",
  "best price",
  "cheap",
  "clearance",
  "earn money",
  "guaranteed",
  "investment",
  "opportunity",
  "risk-free",
  "satisfaction",
  "special promotion",
  "special offer",
];

const LEGITIMATE_DOMAINS = [
  "google.com",
  "microsoft.com",
  "apple.com",
  "amazon.com",
  "facebook.com",
  "twitter.com",
  "linkedin.com",
  "github.com",
  "slack.com",
  "zoom.us",
];

// Spam detection using heuristics
export function detectSpamHeuristics(
  email: Omit<Email, "isSpam" | "spamScore" | "spamReasons" | "categories">
): {
  isSpam: boolean;
  spamScore: number;
  reasons: string[];
} {
  const reasons: string[] = [];
  let spamScore = 0;

  // Check sender domain
  const senderDomain = extractDomain(email.from);
  const isDomainLegitimate = LEGITIMATE_DOMAINS.some((domain) =>
    senderDomain.includes(domain)
  );

  if (!isDomainLegitimate && senderDomain) {
    spamScore += 2;
    reasons.push(`Unknown sender domain: ${senderDomain}`);
  }

  // Check for spam keywords in subject
  const subjectKeywords = SPAM_KEYWORDS.filter((keyword) =>
    email.subject.toLowerCase().includes(keyword.toLowerCase())
  );

  if (subjectKeywords.length > 0) {
    spamScore += subjectKeywords.length;
    reasons.push(
      `Subject contains spam keywords: ${subjectKeywords.join(", ")}`
    );
  }

  // Check for spam keywords in content
  const contentKeywords = SPAM_KEYWORDS.filter((keyword) =>
    email.snippet.toLowerCase().includes(keyword.toLowerCase())
  );

  if (contentKeywords.length > 0) {
    spamScore += contentKeywords.length;
    reasons.push(
      `Content contains spam keywords: ${contentKeywords.join(", ")}`
    );
  }

  // Check for excessive capitalization in subject
  const capsRatio = countUppercaseRatio(email.subject);
  if (capsRatio > 0.3) {
    // If more than 30% of letters are uppercase
    spamScore += 2;
    reasons.push("Excessive capitalization in subject");
  }

  // Check for excessive punctuation
  const exclamationCount = (email.subject.match(/!/g) || []).length;
  if (exclamationCount > 1) {
    spamScore += exclamationCount;
    reasons.push(`Excessive exclamation marks: ${exclamationCount}`);
  }

  // Determine if it's spam based on score threshold
  const isSpam = spamScore >= 3; // Threshold can be adjusted

  return {
    isSpam,
    spamScore,
    reasons,
  };
}

// Helper function to extract domain from email address
function extractDomain(emailAddress: string): string {
  const match = emailAddress.match(/<([^@]+@([^>]+))>/);
  if (match && match[2]) {
    return match[2];
  }

  // Try another pattern if the first one doesn't match
  const simpleDomainMatch = emailAddress.match(/@([^>]+)/);
  if (simpleDomainMatch && simpleDomainMatch[1]) {
    return simpleDomainMatch[1];
  }

  return "";
}

// Helper function to count uppercase ratio
function countUppercaseRatio(text: string): number {
  if (!text || text.length === 0) return 0;

  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length === 0) return 0;

  const uppercaseLetters = letters.replace(/[^A-Z]/g, "");
  return uppercaseLetters.length / letters.length;
}
