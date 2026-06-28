"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { PricingCard } from "@/components/PricingCard";
import { SectionHeading } from "@/components/SectionHeading";
import { pricingPlans } from "@/lib/content";

export function Pricing() {
  return (
    <AnimatedSection id="pricing" className="py-16 sm:py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Прайс"
          title="Ціни по біржах"
          description="Оберіть платформу. Ми перевіримо готовність акаунта й підкажемо, що потрібно зробити перед подачею."
        />

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
