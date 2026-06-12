import { NextResponse, type NextRequest } from "next/server";
import { sendLeadToCrm } from "@/lib/crm-webhook";
import { sendEmailNotification } from "@/lib/email";
import type { IntegrationResult } from "@/lib/integration-result";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeLeadSubmission } from "@/lib/sanitize";
import { sendTelegramNotification } from "@/lib/telegram";
import { leadSubmissionSchema } from "@/lib/validations";

export const runtime = "nodejs";

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function notificationWasDelivered(results: PromiseSettledResult<IntegrationResult>[]) {
  return results.some((result) => result.status === "fulfilled" && result.value.ok);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`lead:${ip}`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "Забагато спроб. Спробуйте ще раз трохи пізніше."
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfter)
        }
      }
    );
  }

  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Некоректний формат заявки."
      },
      { status: 400 }
    );
  }

  if (isRecord(rawBody) && typeof rawBody.website === "string" && rawBody.website.trim()) {
    return NextResponse.json({
      success: true,
      message: "Дякуємо! Ми отримали заявку та зв'яжемося з вами найближчим часом."
    });
  }

  const parsed = leadSubmissionSchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Перевірте обов'язкові поля форми.",
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const lead = {
    ...sanitizeLeadSubmission(parsed.data),
    createdAt: new Date().toISOString()
  };

  const crmResult = await sendLeadToCrm(lead);
  const notificationMeta = {
    crmDelivered: crmResult.ok,
    crmError: crmResult.ok ? undefined : crmResult.error
  };

  const notificationResults = await Promise.allSettled([
    sendTelegramNotification(lead, notificationMeta),
    sendEmailNotification(lead, notificationMeta)
  ]);

  if (!crmResult.ok && !notificationWasDelivered(notificationResults)) {
    console.error("Lead fallback notification failed", {
      crm: crmResult,
      notifications: notificationResults.map((result) =>
        result.status === "fulfilled" ? result.value : { ok: false, error: result.reason }
      )
    });
  }

  return NextResponse.json({
    success: true,
    message:
      "Дякуємо! Ми отримали заявку та зв'яжемося з вами найближчим часом."
  });
}
