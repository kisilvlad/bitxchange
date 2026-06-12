"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { trackEvent } from "@/lib/analytics";
import type { PlanOption } from "@/lib/validations";

type LeadModalContextValue = {
  openForm: (plan?: PlanOption) => void;
  closeForm: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const value = useContext(LeadModalContext);

  if (!value) {
    throw new Error("useLeadModal must be used inside LeadModalProvider");
  }

  return value;
}

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanOption | undefined>();

  const value = useMemo<LeadModalContextValue>(
    () => ({
      openForm: (plan) => {
        setSelectedPlan(plan);
        setIsOpen(true);
        trackEvent("open_form", { selectedPlan: plan });
      },
      closeForm: () => setIsOpen(false)
    }),
    []
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/62 px-4 py-5 backdrop-blur-xl sm:py-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <button
            className="absolute inset-0 cursor-default"
            type="button"
            aria-label="Закрити форму"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-2xl">
            <button
              type="button"
              className="absolute -right-2 -top-2 z-10 inline-flex size-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] text-[color:var(--foreground)] shadow-xl backdrop-blur-2xl transition hover:border-[color:var(--border-strong)]"
              aria-label="Закрити"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <div className="glass-panel mb-4 rounded-[28px] px-5 py-4">
              <p className="relative z-10 text-sm font-black uppercase text-[color:var(--primary)]">
                Заявка на консультацію
              </p>
              <h2
                id="lead-modal-title"
                className="relative z-10 mt-1 text-2xl font-black text-[color:var(--foreground)]"
              >
                Залиште контакти для старту
              </h2>
            </div>
            <LeadForm
              key={selectedPlan ?? "no-plan"}
              source="modal"
              preselectedPlan={selectedPlan}
            />
          </div>
        </div>
      ) : null}
    </LeadModalContext.Provider>
  );
}
