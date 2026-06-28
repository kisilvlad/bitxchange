"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  CheckCircle2,
  Radio,
} from "lucide-react";
import { FloatingGlow } from "@/components/FloatingGlow";
import { HeroDashboard } from "@/components/HeroDashboard";
import { OpenLeadButton } from "@/components/OpenLeadButton";
import { trackEvent } from "@/lib/analytics";
import { trustBadges } from "@/lib/content";

export function Hero() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    trackEvent("view_hero");
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pb-3 pt-2">
      <FloatingGlow className="-right-24 top-20" />
      <div className="section-shell grid gap-8 pt-6 md:pt-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:pt-12">
        <motion.div
          className="min-w-0"
          initial={false}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.58, ease: "easeOut" }}
        >
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--secondary-soft)] px-3.5 py-2 text-xs font-black text-[color:var(--primary)] shadow-[0_16px_44px_var(--glow)] sm:px-4 sm:text-sm">
            <Radio className="size-4" />
            <span className="min-w-0 break-words">Супровід P2P-мерчанта на біржах</span>
          </div>
          <h1 className="max-w-4xl break-words text-[34px] font-black leading-[1.02] text-[color:var(--foreground)] [overflow-wrap:anywhere] min-[380px]:text-[38px] sm:text-6xl sm:leading-[0.98] lg:text-6xl 2xl:text-7xl">
            Відкривайте P2P-мерчанта{" "}
            <span className="gradient-text">швидко та без зайвої бюрократії</span>
          </h1>
          <p className="mt-5 max-w-2xl break-words text-[15px] leading-7 text-[color:var(--muted)] [overflow-wrap:anywhere] sm:mt-6 sm:text-lg sm:leading-8">
            Готуємо акаунт, документи й заявку на Bybit, OKX, WEEX, MEXC та
            CryptoBot. Показуємо слабкі місця до подачі та супроводжуємо процес
            за правилами платформи.
          </p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
          >
            <OpenLeadButton eventLabel="hero_consultation" className="w-full sm:w-auto">
              Отримати консультацію
            </OpenLeadButton>
            <a
              href="#process"
              className="secondary-button w-full sm:w-auto"
              onClick={() => trackEvent("click_cta", { label: "hero_process" })}
            >
              <span>Як це працює</span>
              <ArrowDown className="ml-2 size-4" aria-hidden="true" />
            </a>
          </motion.div>

          <div className="mt-6 grid max-w-full grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:flex sm:flex-wrap">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="inline-flex min-w-0 items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-xs font-black leading-5 text-[color:var(--foreground)] backdrop-blur-xl sm:rounded-full sm:text-sm"
              >
                <CheckCircle2 className="size-4 shrink-0 text-[color:var(--primary)]" />
                <span className="min-w-0 break-words">{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="hidden md:block">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
