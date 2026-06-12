import type { IntegrationResult } from "@/lib/integration-result";
import { formatLeadNotificationText, type NotificationMeta } from "@/lib/lead-format";
import type { LeadRecord } from "@/lib/validations";

export async function sendTelegramNotification(
  lead: LeadRecord,
  meta: NotificationMeta
): Promise<IntegrationResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return {
      ok: false,
      skipped: true,
      error: "Telegram credentials are not configured"
    };
  }

  const message = formatLeadNotificationText(lead, meta).slice(0, 3900);

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        disable_web_page_preview: true
      })
    });

    if (!response.ok) {
      const responseText = await response.text().catch(() => "");

      return {
        ok: false,
        status: response.status,
        error:
          responseText.slice(0, 300) ||
          `Telegram returned ${response.status}`
      };
    }

    return { ok: true, status: response.status };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Telegram notification failed"
    };
  }
}
