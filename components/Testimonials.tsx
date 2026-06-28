"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Send, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  function scrollToIndex(index: number) {
    const nextIndex = (index + testimonials.length) % testimonials.length;
    const scroller = scrollerRef.current;

    setActiveIndex(nextIndex);

    if (!scroller) {
      return;
    }

    const card = scroller.querySelector<HTMLElement>(
      `[data-testimonial-index="${nextIndex}"]`
    );

    card?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "start"
    });
  }

  return (
    <AnimatedSection id="testimonials" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Відгуки"
            title="Клієнти приходять за ясністю, не за обіцянками"
            description="Короткі анонімізовані відгуки після консультацій і супроводу. Ніки приховані, зміст залишений по суті."
          />

          <div className="flex items-center gap-2 lg:justify-end">
            <button
              type="button"
              className="secondary-button size-12 min-h-0 px-0"
              aria-label="Попередній відгук"
              onClick={() => scrollToIndex(activeIndex - 1)}
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              className="secondary-button size-12 min-h-0 px-0"
              aria-label="Наступний відгук"
              onClick={() => scrollToIndex(activeIndex + 1)}
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="hide-scrollbar mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
          onScroll={(event) => {
            const scroller = event.currentTarget;
            const cards = Array.from(
              scroller.querySelectorAll<HTMLElement>("[data-testimonial-index]")
            );
            const closest = cards.reduce(
              (best, card) => {
                const distance = Math.abs(card.offsetLeft - scroller.scrollLeft);
                return distance < best.distance
                  ? {
                      distance,
                      index: Number(card.dataset.testimonialIndex)
                    }
                  : best;
              },
              { distance: Number.POSITIVE_INFINITY, index: activeIndex }
            );

            if (Number.isFinite(closest.index)) {
              setActiveIndex(closest.index);
            }
          }}
        >
          {testimonials.map((item, index) => (
            <motion.article
              key={`${item.platform}-${item.handle}`}
              data-testimonial-index={index}
              className="glass-card min-h-[310px] min-w-[88%] snap-start rounded-[30px] p-5 sm:min-w-[430px] sm:p-6 lg:min-w-[450px]"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.04 }}
            >
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--secondary-soft)] text-[color:var(--primary)] shadow-[0_16px_44px_var(--glow)]">
                      <Send className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-black text-[color:var(--foreground)]">
                        {item.name}
                      </p>
                      <p className="mt-1 flex min-w-0 items-center gap-2 text-xs font-bold text-[color:var(--muted-foreground)]">
                        <span>Telegram</span>
                        <span className="testimonial-handle-blur">
                          {item.handle}
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-black uppercase text-[color:var(--primary)]">
                    {item.platform}
                  </span>
                </div>

                <p className="mt-8 text-xl font-black leading-8 text-[color:var(--foreground)]">
                  “{item.quote}”
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                  <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-black uppercase text-[color:var(--muted)]">
                    {item.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[color:var(--muted-foreground)]">
                    <ShieldCheck className="size-4 text-[color:var(--primary)]" />
                    нік приховано
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-2 flex justify-center gap-2">
          {testimonials.map((item, index) => (
            <button
              key={item.handle}
              type="button"
              className={cn(
                "h-2.5 rounded-full transition-all",
                activeIndex === index
                  ? "w-8 bg-[color:var(--primary)]"
                  : "w-2.5 bg-[color:var(--surface-strong)]"
              )}
              aria-label={`Відгук ${index + 1}`}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
