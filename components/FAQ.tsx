"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { faqItems } from "@/lib/content";
import { cn } from "@/lib/cn";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection id="faq" className="py-16 sm:py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Коротко про важливе перед заявкою"
        />

        <div className="grid gap-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article key={item.question} className="glass-card rounded-[26px]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="relative z-10 text-base font-black leading-6 text-[color:var(--foreground)]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "relative z-10 size-5 shrink-0 text-[color:var(--primary)] transition",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="relative z-10 overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-7 text-[color:var(--muted)]">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
