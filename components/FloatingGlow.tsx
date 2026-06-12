import { cn } from "@/lib/cn";

export function FloatingGlow({ className }: { className?: string }) {
  return <div className={cn("floating-glow", className)} aria-hidden="true" />;
}
