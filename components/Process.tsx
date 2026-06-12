import { AnimatedSection } from "@/components/AnimatedSection";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { SectionHeading } from "@/components/SectionHeading";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <AnimatedSection id="process" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Як це працює"
              title="П'ять кроків від заявки до фінального рішення біржі"
              description="Фінальне рішення щодо надання статусу приймає біржа. Ми супроводжуємо процес і допомагаємо підготувати все відповідно до правил платформи."
            />
          </div>

          <ProcessTimeline steps={processSteps} />
        </div>
      </div>
    </AnimatedSection>
  );
}
