"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import type { CSSProperties } from "react";

type ExchangeCardProps = {
  name: string;
  description: string;
  logoSrc: string;
  accentFrom: string;
  accentTo: string;
  index: number;
};

export function ExchangeCard({
  name,
  description,
  logoSrc,
  accentFrom,
  accentTo,
  index
}: ExchangeCardProps) {
  const reduceMotion = useReducedMotion();
  const style = {
    "--exchange-from": accentFrom,
    "--exchange-to": accentTo
  } as CSSProperties;

  return (
    <motion.article
      className="exchange-card group min-h-80 rounded-[30px] p-5 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--border-strong)]"
      style={style}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.48, ease: "easeOut", delay: index * 0.07 }}
    >
      <div className="exchange-card__wash" aria-hidden="true" />
      <div className="exchange-card__ghost-logo" aria-hidden="true">
        <Image
          src={logoSrc}
          alt=""
          fill
          sizes="360px"
          className="object-contain p-4"
          unoptimized
        />
      </div>
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="exchange-card__logo-tile">
            <Image
              src={logoSrc}
              alt=""
              width={54}
              height={54}
              className="exchange-card__logo"
              style={{ width: "auto", height: "auto" }}
              unoptimized
              aria-hidden="true"
            />
          </span>
          <span className="inline-flex size-9 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--primary)] backdrop-blur-xl">
            <BadgeCheck className="size-4" />
          </span>
        </div>
        <div className="mt-8">
          <p className="font-mono text-xs font-black uppercase text-[color:var(--muted-foreground)]">
            exchange 0{index + 1}
          </p>
          <h3 className="mt-2 text-4xl font-black text-[color:var(--foreground)]">
            {name}
          </h3>
          <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
            {name} — {description}
          </p>
        </div>
        <div className="mt-auto pt-8">
          <span className="inline-flex rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-black uppercase text-[color:var(--muted)]">
            P2P ecosystem
          </span>
        </div>
      </div>
    </motion.article>
  );
}
