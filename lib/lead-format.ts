import { escapeHtml } from "@/lib/sanitize";
import type { LeadRecord } from "@/lib/validations";

export type NotificationMeta = {
  crmDelivered: boolean;
  crmError?: string;
};

const emptyValue = "Не вказано";

function leadRows(lead: LeadRecord, meta: NotificationMeta) {
  return [
    ["Ім'я", lead.name],
    ["Контакт", lead.contact],
    ["Email", lead.email ?? emptyValue],
    ["Біржа", lead.exchange],
    ["Досвід", lead.experience],
    ["Позиція з прайсу", lead.selectedPlan ?? emptyValue],
    ["Коментар", lead.message || emptyValue],
    ["UTM source", lead.utmSource ?? emptyValue],
    ["UTM medium", lead.utmMedium ?? emptyValue],
    ["UTM campaign", lead.utmCampaign ?? emptyValue],
    ["UTM content", lead.utmContent ?? emptyValue],
    ["UTM term", lead.utmTerm ?? emptyValue],
    ["Referrer", lead.referrer ?? emptyValue],
    ["Page URL", lead.pageUrl ?? emptyValue],
    ["Consent", lead.consent ? "true" : "false"],
    ["Created at", lead.createdAt],
    ["CRM", meta.crmDelivered ? "delivered" : `fallback: ${meta.crmError ?? "not delivered"}`]
  ] as const;
}

export function formatLeadNotificationText(
  lead: LeadRecord,
  meta: NotificationMeta
): string {
  const rows = leadRows(lead, meta)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return `Нова заявка на супровід P2P-мерчанта\n\n${rows}`;
}

export function formatLeadNotificationHtml(
  lead: LeadRecord,
  meta: NotificationMeta
): string {
  const rows = leadRows(lead, meta)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#475569;">${escapeHtml(
          label
        )}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#0f172a;font-weight:600;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <h1 style="font-size:22px;margin:0 0 16px;">Нова заявка на супровід P2P-мерчанта</h1>
      <table style="border-collapse:collapse;width:100%;max-width:720px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">${rows}</table>
    </div>
  `;
}
