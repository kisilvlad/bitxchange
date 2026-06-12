"use client";

import { Check, Sparkles } from "lucide-react";
import { OpenLeadButton } from "@/components/OpenLeadButton";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import type { PlanOption } from "@/lib/validations";

type PricingCardProps = {
  plan: {
    id: PlanOption;
    name: string;
    description: string;
    price: string;
    featured: boolean;
    features: readonly string[];
  };
};

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <article
      className={cn(
        "glass-card relative flex flex-col rounded-[28px] p-5 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--border-strong)] sm:min-h-[430px] sm:rounded-[32px] sm:p-6",
        plan.featured && "border-[color:var(--border-strong)] shadow-[var(--shadow-soft)]"
      )}
    >
      <div className="relative z-10">
        {plan.featured ? (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--secondary-soft)] px-3 py-1.5 text-sm font-black text-[color:var(--primary)]">
            <Sparkles className="size-4" />
            Популярний напрям
          </div>
        ) : null}
        <h3 className="text-3xl font-black text-[color:var(--foreground)]">{plan.name}</h3>
        <p className="mt-3 text-sm leading-6 text-[color:var(--muted)] sm:mt-4 sm:min-h-14">
          {plan.description}
        </p>
        <p className="mt-5 text-4xl font-black text-[color:var(--foreground)] sm:mt-7">
          {plan.price}
        </p>
        <ul className="mt-5 grid gap-2.5 sm:mt-7 sm:gap-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-[color:var(--muted)]">
              <Check className="mt-1 size-4 shrink-0 text-[color:var(--primary)]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <OpenLeadButton
        eventLabel={`pricing_${plan.id}`}
        plan={plan.id}
        className="relative z-10 mt-6 w-full sm:mt-auto"
        onClick={() =>
          trackEvent("tariff_click", {
            selectedPlan: plan.id
          })
        }
      >
        Обрати біржу
      </OpenLeadButton>
    </article>
  );
}
