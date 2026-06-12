import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type GlassCardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article";
  elevated?: boolean;
};

export function GlassCard({
  as: Component = "div",
  elevated = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <Component
      className={cn("glass-card", elevated && "glass-card--elevated", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
