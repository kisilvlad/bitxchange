"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import {
  Activity,
  ArrowUpRight,
  FileCheck2,
  LifeBuoy,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { publicAssetPath } from "@/lib/asset-path";
import { exchangeCards } from "@/lib/content";

const checklist = [
  { label: "Профіль", status: "готовий", icon: ShieldCheck },
  { label: "Документи", status: "перевірка", icon: FileCheck2 },
  { label: "Заявка", status: "супровід", icon: Activity },
  { label: "Підтримка", status: "після старту", icon: LifeBuoy }
] as const;

const exchanges = exchangeCards.map((exchange) => ({
  name: exchange.name,
  logoSrc: exchange.logoSrc,
  accentFrom: exchange.accentFrom,
  accentTo: exchange.accentTo
}));

export function HeroDashboard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative"
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.16 }}
    >
      <div className="glass-panel hero-dashboard-card relative rounded-[34px] p-4 sm:p-6 lg:p-7">
        <div className="relative z-10">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1.5 text-xs font-black uppercase text-[color:var(--primary)]">
                <Sparkles className="size-3.5" />
                Merchant cockpit
              </p>
              <h2 className="mt-4 text-3xl font-black text-[color:var(--foreground)]">
                72% підготовки
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Профіль, документи та маршрут подачі зібрані в одному процесі.
              </p>
            </div>
            <div className="rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--secondary-soft)] px-3 py-2 text-right">
              <p className="text-xs font-black uppercase text-[color:var(--muted-foreground)]">
                статус
              </p>
              <p className="mt-1 text-sm font-black text-[color:var(--primary)]">
                live review
              </p>
            </div>
          </div>

          <div className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] p-1.5">
            <div className="h-3 overflow-hidden rounded-full bg-[color:var(--surface-strong)]">
              <motion.div
                className="animated-sheen h-full rounded-full bg-gradient-to-r from-[color:var(--gradient-from)] via-[color:var(--gradient-via)] to-[color:var(--gradient-to)]"
                initial={{ width: "18%" }}
                animate={{ width: "72%" }}
                transition={{ duration: reduceMotion ? 0 : 1.1, ease: "easeOut", delay: 0.35 }}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {checklist.map((row, index) => {
              const Icon = row.icon;

              return (
                <motion.div
                  key={row.label}
                  className="group flex items-center justify-between gap-4 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 transition hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)]"
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.36 + index * 0.08 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-[color:var(--secondary-soft)] text-[color:var(--primary)] shadow-[0_12px_34px_var(--glow)]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-black text-[color:var(--foreground)]">
                        {row.label}
                      </span>
                      <span className="block text-xs font-bold text-[color:var(--muted-foreground)]">
                        етап {index + 1}/4
                      </span>
                    </span>
                  </div>
                  <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-1 text-xs font-black text-[color:var(--muted)]">
                    {row.status}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {exchanges.map((exchange) => (
              <div
                key={exchange.name}
                className="dashboard-exchange-chip"
                style={
                  {
                    "--exchange-from": exchange.accentFrom,
                    "--exchange-to": exchange.accentTo
                  } as CSSProperties
                }
              >
                <div className="dashboard-exchange-chip__logo" aria-hidden="true">
                  <Image
                    src={publicAssetPath(exchange.logoSrc)}
                    alt=""
                    width={34}
                    height={34}
                    sizes="120px"
                    className="object-contain"
                    style={{ width: "auto", height: "auto" }}
                    unoptimized
                  />
                </div>
                <p className="relative z-10 break-words text-xs font-black text-[color:var(--foreground)] sm:text-sm">
                  {exchange.name}
                </p>
                <p className="relative z-10 mt-1 text-[10px] font-bold uppercase text-[color:var(--muted-foreground)]">
                  P2P
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3">
            <div>
              <p className="text-xs font-black uppercase text-[color:var(--muted-foreground)]">
                наступний крок
              </p>
              <p className="mt-1 text-sm font-black text-[color:var(--foreground)]">
                консультація та аудит акаунта
              </p>
            </div>
            <ArrowUpRight className="size-5 text-[color:var(--primary)]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
