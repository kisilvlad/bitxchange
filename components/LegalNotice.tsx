import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/cn";

export function LegalNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "glass-card mt-6 rounded-[26px]",
        compact ? "p-4" : "p-5"
      )}
    >
      <div className="relative z-10 flex gap-3">
        <ShieldAlert className="mt-1 size-5 shrink-0 text-[color:var(--primary)]" />
        <p className="text-sm leading-6 text-[color:var(--muted)]">
          Сервіс є незалежним консультаційним сервісом. Ми не є офіційними
          представниками Bybit, OKX, WEEX, MEXC або CryptoBot, не надаємо
          фінансових, інвестиційних або юридичних порад і не гарантуємо
          схвалення заявки.
        </p>
      </div>
    </div>
  );
}
