import { OpenLeadButton } from "@/components/OpenLeadButton";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ShieldCheck } from "lucide-react";

export function FinalCTA() {
  return (
    <AnimatedSection className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="glass-panel overflow-hidden rounded-[36px] p-6 sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--glow),transparent_42%,var(--secondary-soft))]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[color:var(--primary)]">
                Фінальний крок
              </p>
              <h2 className="text-3xl font-black leading-[1.02] text-[color:var(--foreground)] sm:text-5xl">
                Готові відкрити свій P2P-мерчант?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
                Залиште заявку — підкажемо оптимальну біржу та допоможемо пройти
                всі етапи запуску.
              </p>
              <p className="mt-5 flex max-w-2xl items-start gap-2 text-xs font-semibold leading-5 text-[color:var(--muted-foreground)]">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[color:var(--primary)]" />
                Фінальне рішення приймає біржа. Ми супроводжуємо процес у межах правил платформи.
              </p>
            </div>
            <OpenLeadButton eventLabel="final_cta" className="w-full sm:w-auto">
              Залишити заявку
            </OpenLeadButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
