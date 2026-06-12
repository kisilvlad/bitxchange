"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { exchangeOptions, experienceOptions, planOptions } from "@/lib/content";
import { getStoredAttribution } from "@/lib/utm";
import {
  leadSubmissionSchema,
  type ExchangeOption,
  type ExperienceOption,
  type PlanOption
} from "@/lib/validations";

type LeadFormProps = {
  source: "modal" | "section";
  preselectedPlan?: PlanOption;
};

type FormState = {
  name: string;
  contact: string;
  email: string;
  exchange: ExchangeOption | "";
  experience: ExperienceOption;
  selectedPlan: PlanOption | "";
  message: string;
  consent: boolean;
  website: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: "",
  contact: "",
  email: "",
  exchange: "",
  experience: "Новачок",
  selectedPlan: "",
  message: "",
  consent: false,
  website: ""
};

const errorMessages: Partial<Record<keyof FormState, string>> = {
  name: "Укажіть ім'я.",
  contact: "Укажіть Telegram або телефон.",
  email: "Перевірте email або залиште поле порожнім.",
  exchange: "Оберіть бажану біржу.",
  selectedPlan: "Оберіть позицію з прайсу.",
  message: "Коментар занадто довгий.",
  consent: "Потрібно підтвердити згоду."
};

const leadEndpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "/api/lead";

export function LeadForm({ source, preselectedPlan }: LeadFormProps) {
  const [form, setForm] = useState<FormState>({
    ...initialFormState,
    selectedPlan: preselectedPlan ?? ""
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [serverMessage, setServerMessage] = useState("");

  const submitLabel = useMemo(
    () => (source === "modal" ? "Надіслати заявку" : "Отримати консультацію"),
    [source]
  );

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setServerMessage("");

    const payload = {
      ...form,
      ...getStoredAttribution()
    };

    const parsed = leadSubmissionSchema.safeParse(payload);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const nextErrors = Object.fromEntries(
        Object.keys(fieldErrors).map((field) => [
          field,
          errorMessages[field as keyof FormState] ?? "Перевірте поле."
        ])
      ) as FieldErrors;

      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    trackEvent("submit_lead", {
      source,
      selectedPlan: form.selectedPlan || undefined,
      exchange: form.exchange || undefined
    });

    try {
      const response = await fetch(leadEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        errors?: Partial<Record<keyof FormState, string[]>>;
      };

      if (!response.ok || !result.success) {
        if (result.errors) {
          setErrors(
            Object.fromEntries(
              Object.keys(result.errors).map((field) => [
                field,
                errorMessages[field as keyof FormState] ?? "Перевірте поле."
              ])
            ) as FieldErrors
          );
        }

        setStatus("error");
        setServerMessage(
          result.message ??
            "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам у Telegram."
        );
        return;
      }

      setStatus("success");
      setServerMessage(
        result.message ??
          "Дякуємо! Ми отримали заявку та зв'яжемося з вами найближчим часом."
      );
      trackEvent("lead_success", {
        source,
        selectedPlan: form.selectedPlan || undefined,
        exchange: form.exchange || undefined
      });
    } catch {
      setStatus("error");
      setServerMessage(
        "Заявку отримано. Якщо ми не зв'яжемося найближчим часом, напишіть нам у Telegram."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="glass-panel rounded-[30px] p-6 sm:p-8">
        <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl bg-[color:var(--secondary-soft)] text-[color:var(--primary)] shadow-[0_16px_44px_var(--glow)]">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </div>
        <h3 className="relative z-10 mt-5 text-2xl font-black text-[color:var(--foreground)]">
          Дякуємо, заявку отримано
        </h3>
        <p className="relative z-10 mt-3 text-base leading-7 text-[color:var(--muted)]">
          {serverMessage}
        </p>
        <button
          type="button"
          className="secondary-button mt-6"
          onClick={() => {
            setStatus("idle");
            setServerMessage("");
            setForm({
              ...initialFormState,
              selectedPlan: preselectedPlan ?? ""
            });
          }}
        >
          Надіслати ще одну заявку
        </button>
      </div>
    );
  }

  return (
    <form className="glass-panel rounded-[30px] p-5 sm:p-6" onSubmit={handleSubmit}>
      <div className="relative z-10 mb-5 flex items-start gap-3 rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--secondary-soft)] p-4">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[color:var(--primary)]" />
        <p className="text-sm leading-6 text-[color:var(--muted)]">
          Дані передаються лише для консультації та супроводу заявки відповідно
          до правил платформи.
        </p>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${source}-website`}>Website</label>
        <input
          id={`${source}-website`}
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <div className="relative z-10 grid gap-4 sm:grid-cols-2">
        <Field label="Ім'я" error={errors.name} required>
          <input
            className="field-control"
            value={form.name}
            autoComplete="name"
            placeholder="Ваше ім'я"
            onChange={(event) => updateField("name", event.target.value)}
          />
        </Field>

        <Field label="Telegram або телефон" error={errors.contact} required>
          <input
            className="field-control"
            value={form.contact}
            autoComplete="tel"
            placeholder="@username або +380..."
            onChange={(event) => updateField("contact", event.target.value)}
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            className="field-control"
            type="email"
            value={form.email}
            autoComplete="email"
            placeholder="name@example.com"
            onChange={(event) => updateField("email", event.target.value)}
          />
        </Field>

        <Field label="Бажана біржа" error={errors.exchange} required>
          <select
            className="field-control"
            value={form.exchange}
            onChange={(event) =>
              updateField("exchange", event.target.value as ExchangeOption | "")
            }
          >
            <option value="">Оберіть біржу</option>
            {exchangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Досвід у P2P" error={errors.experience} required>
          <select
            className="field-control"
            value={form.experience}
            onChange={(event) =>
              updateField("experience", event.target.value as ExperienceOption)
            }
          >
            {experienceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Позиція з прайсу" error={errors.selectedPlan}>
          <select
            className="field-control"
            value={form.selectedPlan}
            onChange={(event) =>
              updateField("selectedPlan", event.target.value as PlanOption | "")
            }
          >
            <option value="">Не обрано</option>
            {planOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Коментар" error={errors.message} className="relative z-10 mt-4">
        <textarea
          className="field-control min-h-28 resize-y"
          value={form.message}
          placeholder="Коротко опишіть вашу ситуацію або питання"
          onChange={(event) => updateField("message", event.target.value)}
        />
      </Field>

      <label className="relative z-10 mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[color:var(--muted)]">
        <input
          type="checkbox"
          className="mt-1 size-5 rounded border-[color:var(--border)] bg-[color:var(--surface)] accent-[color:var(--primary)]"
          checked={form.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
        />
        <span>
          Я погоджуюся з{" "}
          <Link className="text-[color:var(--primary)] underline-offset-4 hover:underline" href="/privacy">
            політикою конфіденційності
          </Link>{" "}
          та розумію, що сервіс не гарантує схвалення заявки біржею.
          {errors.consent ? (
            <span className="mt-1 block text-[color:var(--danger)]">{errors.consent}</span>
          ) : null}
        </span>
      </label>

      {status === "error" ? (
        <p className="relative z-10 mt-4 rounded-xl border border-[color:var(--danger)]/30 bg-[color:var(--danger)]/10 px-4 py-3 text-sm text-[color:var(--danger)]">
          {serverMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="premium-button relative z-10 mt-6 w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="mr-2 size-4" aria-hidden="true" />
        )}
        {submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  required = false,
  className,
  children
}: {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-black text-[color:var(--foreground)]">
        {label}
        {required ? <span className="text-[color:var(--primary)]"> *</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-sm text-[color:var(--danger)]">{error}</span> : null}
    </label>
  );
}
