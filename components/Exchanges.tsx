import { AnimatedSection } from "@/components/AnimatedSection";
import { ExchangeCard } from "@/components/ExchangeCard";
import { SectionHeading } from "@/components/SectionHeading";
import { exchangeCards } from "@/lib/content";

export function Exchanges() {
  return (
    <AnimatedSection id="exchanges" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionHeading eyebrow="Біржі" title="Біржі, з якими працюємо" />
          <p className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 text-base leading-7 text-[color:var(--muted)] backdrop-blur-xl">
            Ми не є офіційними представниками зазначених бірж. Усі заявки
            розглядаються самими платформами відповідно до їхніх правил.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {exchangeCards.map((exchange, index) => (
            <ExchangeCard
              key={exchange.name}
              name={exchange.name}
              description={exchange.description}
              logoSrc={exchange.logoSrc}
              accentFrom={exchange.accentFrom}
              accentTo={exchange.accentTo}
              index={index}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
