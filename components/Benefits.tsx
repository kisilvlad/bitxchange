"use client";

import { FileCheck2, LifeBuoy, Route, SearchCheck, Send } from "lucide-react";
import { BenefitCard } from "@/components/BenefitCard";
import { SectionHeading } from "@/components/SectionHeading";
import { benefits } from "@/lib/content";

const icons = [SearchCheck, Route, FileCheck2, Send, LifeBuoy] as const;

export function Benefits() {
  return (
    <section id="service" className="pb-16 pt-6 sm:pb-20 sm:pt-8">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Що ви отримуєте"
          title="Зрозумілий супровід без зайвих обіцянок"
          description="Ми пояснюємо вимоги біржі, допомагаємо підготувати профіль і знижуємо ризик типових помилок під час подачі заявки."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {benefits.map((benefit, index) => {
            const Icon = icons[index];

            return (
              <BenefitCard
                key={benefit.title}
                title={benefit.title}
                description={benefit.description}
                icon={Icon}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
