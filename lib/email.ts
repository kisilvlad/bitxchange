import nodemailer from "nodemailer";
import type { IntegrationResult } from "@/lib/integration-result";
import {
  formatLeadNotificationHtml,
  formatLeadNotificationText,
  type NotificationMeta
} from "@/lib/lead-format";
import type { LeadRecord } from "@/lib/validations";

function getRecipients(): string[] {
  return (process.env.EMAIL_TO ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function sendEmailNotification(
  lead: LeadRecord,
  meta: NotificationMeta
): Promise<IntegrationResult> {
  const from = process.env.EMAIL_FROM;
  const recipients = getRecipients();

  if (!from || recipients.length === 0) {
    return {
      ok: false,
      skipped: true,
      error: "EMAIL_FROM or EMAIL_TO is not configured"
    };
  }

  if (process.env.RESEND_API_KEY) {
    return sendViaResend(from, recipients, lead, meta);
  }

  if (process.env.SMTP_HOST) {
    return sendViaSmtp(from, recipients, lead, meta);
  }

  return {
    ok: false,
    skipped: true,
    error: "SMTP_HOST or RESEND_API_KEY is not configured"
  };
}

async function sendViaResend(
  from: string,
  recipients: string[],
  lead: LeadRecord,
  meta: NotificationMeta
): Promise<IntegrationResult> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: recipients,
        subject: "Нова заявка на P2P-мерчанта",
        html: formatLeadNotificationHtml(lead, meta),
        text: formatLeadNotificationText(lead, meta)
      })
    });

    if (!response.ok) {
      const responseText = await response.text().catch(() => "");

      return {
        ok: false,
        status: response.status,
        error:
          responseText.slice(0, 300) ||
          `Resend returned ${response.status}`
      };
    }

    return { ok: true, status: response.status };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Resend notification failed"
    };
  }
}

async function sendViaSmtp(
  from: string,
  recipients: string[],
  lead: LeadRecord,
  meta: NotificationMeta
): Promise<IntegrationResult> {
  const port = Number(process.env.SMTP_PORT ?? 587);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
          }
        : undefined
    });

    await transporter.sendMail({
      from,
      to: recipients.join(", "),
      subject: "Нова заявка на P2P-мерчанта",
      html: formatLeadNotificationHtml(lead, meta),
      text: formatLeadNotificationText(lead, meta)
    });

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "SMTP notification failed"
    };
  }
}
