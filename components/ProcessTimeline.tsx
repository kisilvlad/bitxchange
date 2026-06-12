"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type ProcessTimelineProps = {
  steps: readonly string[];
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <motion.div
        className="absolute left-6 top-8 hidden w-px origin-top bg-gradient-to-b from-[color:var(--primary)] via-[color:var(--border-strong)] to-transparent sm:block"
        initial={reduceMotion ? false : { scaleY: 0 }}
        whileInView={reduceMotion ? undefined : { scaleY: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ height: "calc(100% - 4rem)" }}
      />
      <div className="grid gap-4">
        {steps.map((step, index) => (
          <motion.article
            key={step}
            className="glass-card relative rounded-[28px] p-5 sm:ml-14"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.48, ease: "easeOut", delay: index * 0.08 }}
          >
            <span className="relative z-10 mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--gradient-from)] to-[color:var(--gradient-to)] text-base font-black text-[color:var(--primary-foreground)] shadow-[0_16px_44px_var(--glow)] sm:absolute sm:-left-20 sm:top-5">
              {index + 1}
            </span>
            <div className="relative z-10 flex items-start gap-3">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[color:var(--primary)]" />
              <p className="text-lg font-black leading-7 text-[color:var(--foreground)]">
                {step}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
