import type { LeadRecord, LeadSubmission } from "@/lib/validations";

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
const HTML_BRACKETS = /[<>]/g;

export function sanitizeText(value: string | undefined, maxLength: number): string | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value
    .normalize("NFKC")
    .replace(CONTROL_CHARS, " ")
    .replace(HTML_BRACKETS, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

  return normalized || undefined;
}

export function sanitizeLeadSubmission(input: LeadSubmission): Omit<LeadRecord, "createdAt"> {
  return {
    name: sanitizeText(input.name, 80) ?? "",
    contact: sanitizeText(input.contact, 80) ?? "",
    email: sanitizeText(input.email, 120)?.toLowerCase(),
    exchange: input.exchange,
    experience: input.experience,
    selectedPlan: input.selectedPlan,
    message: sanitizeText(input.message, 1000) ?? "",
    consent: input.consent,
    utmSource: sanitizeText(input.utmSource, 120),
    utmMedium: sanitizeText(input.utmMedium, 120),
    utmCampaign: sanitizeText(input.utmCampaign, 160),
    utmContent: sanitizeText(input.utmContent, 160),
    utmTerm: sanitizeText(input.utmTerm, 160),
    referrer: sanitizeText(input.referrer, 500),
    pageUrl: sanitizeText(input.pageUrl, 500)
  };
}

export function escapeHtml(value: string | number | boolean | undefined): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
