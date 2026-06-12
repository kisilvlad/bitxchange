"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type BenefitCardProps = {
  title: string;
  description: string;
  index: number;
  icon: LucideIcon;
};

export function BenefitCard({ title, description, index, icon: Icon }: BenefitCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="glass-card group min-h-64 rounded-[30px] p-5 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--border-strong)]"
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.48, ease: "easeOut", delay: index * 0.06 }}
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--primary)] shadow-[0_16px_42px_var(--glow)]">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <span className="font-mono text-sm font-black text-[color:var(--muted-foreground)]">
            0{index + 1}
          </span>
        </div>
        <div className="mt-auto pt-8">
          <h3 className="text-xl font-black leading-7 text-[color:var(--foreground)]">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
