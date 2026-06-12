"use client";

import { useEffect, useState } from "react";
import { OpenLeadButton } from "@/components/OpenLeadButton";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.55);
    }

    handleScroll();
    const frame = window.requestAnimationFrame(handleScroll);
    const timers = [120, 420, 900, 1500].map((delay) =>
      window.setTimeout(handleScroll, delay)
    );
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleScroll);
    window.addEventListener("pageshow", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
      window.removeEventListener("pageshow", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="mobile-sticky-cta md:hidden">
      <OpenLeadButton eventLabel="sticky_mobile_cta" className="w-full" hideIcon>
        Залишити заявку
      </OpenLeadButton>
    </div>
  );
}
