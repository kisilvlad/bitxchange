import type { IntegrationResult } from "@/lib/integration-result";
import type { LeadRecord } from "@/lib/validations";

const CRM_TIMEOUT_MS = 8000;

export function buildCrmPayload(lead: LeadRecord) {
  return {
    name: lead.name,
    contact: lead.contact,
    email: lead.email,
    exchange: lead.exchange,
    experience: lead.experience,
    selectedPlan: lead.selectedPlan,
    message: lead.message,
    utmSource: lead.utmSource,
    utmMedium: lead.utmMedium,
    utmCampaign: lead.utmCampaign,
    utmContent: lead.utmContent,
    utmTerm: lead.utmTerm,
    referrer: lead.referrer,
    pageUrl: lead.pageUrl,
    createdAt: lead.createdAt,
    consent: lead.consent
  };
}

export async function sendLeadToCrm(lead: LeadRecord): Promise<IntegrationResult> {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      ok: false,
      skipped: true,
      error: "CRM_WEBHOOK_URL is not configured"
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CRM_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CRM_API_KEY
          ? { Authorization: `Bearer ${process.env.CRM_API_KEY}` }
          : {})
      },
      body: JSON.stringify(buildCrmPayload(lead)),
      signal: controller.signal
    });

    if (!response.ok) {
      const responseText = await response.text().catch(() => "");

      return {
        ok: false,
        status: response.status,
        error:
          responseText.slice(0, 300) ||
          `CRM webhook returned ${response.status}`
      };
    }

    return { ok: true, status: response.status };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "CRM webhook failed"
    };
  } finally {
    clearTimeout(timeout);
  }
}
