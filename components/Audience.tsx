import { BriefcaseBusiness, ChartNoAxesCombined, UsersRound, Waypoints } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { audienceItems } from "@/lib/content";

const icons = [ChartNoAxesCombined, BriefcaseBusiness, UsersRound, Waypoints] as const;

export function Audience() {
  return (
    <AnimatedSection id="audience" className="py-16 sm:py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Для кого"
          title="Коли краще не подавати заявку навмання"
          description="Якщо хочете зрозуміти вимоги до старту до того, як біржа побачить вашу заявку."
        />

        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {audienceItems.map((item, index) => {
            const Icon = icons[index];

            return (
              <article
                key={item.title}
                className="glass-card group min-h-44 rounded-[28px] p-6 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--border-strong)]"
              >
                <div className="relative z-10 flex items-start gap-5">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--primary)] shadow-[0_16px_44px_var(--glow)] transition group-hover:scale-105">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-black uppercase text-[color:var(--primary)]">
                      0{index + 1}
                    </p>
                    <h3 className="mt-2 text-2xl font-black leading-8 text-[color:var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
