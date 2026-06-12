"use client";

import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { useLeadModal } from "@/components/LeadModalProvider";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import type { PlanOption } from "@/lib/validations";

type OpenLeadButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    plan?: PlanOption;
    eventLabel: string;
    variant?: "primary" | "secondary";
    hideIcon?: boolean;
  }
>;

export function OpenLeadButton({
  children,
  plan,
  eventLabel,
  variant = "primary",
  hideIcon = false,
  className,
  onClick,
  ...props
}: OpenLeadButtonProps) {
  const { openForm } = useLeadModal();

  return (
    <button
      type="button"
      className={cn(
        variant === "primary" ? "premium-button" : "secondary-button",
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        trackEvent("click_cta", { label: eventLabel, selectedPlan: plan });
        openForm(plan);
      }}
      {...props}
    >
      <span>{children}</span>
      {hideIcon ? null : <ArrowRight className="ml-2 size-4" aria-hidden="true" />}
    </button>
  );
}
