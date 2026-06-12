"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

type AnimatedSectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
  delay?: number;
}>;

export function AnimatedSection({
  id,
  className,
  delay = 0,
  children
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01, margin: "0px 0px 80px 0px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}
