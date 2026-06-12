import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { navItems } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] py-10">
      <div className="section-shell grid gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[color:var(--primary)]">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-black text-[color:var(--foreground)]">P2P Merchant Support</p>
              <p className="text-sm text-[color:var(--muted)]">
                Незалежний консультаційний сервіс
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">
            Фінальне рішення щодо надання статусу P2P-мерчанта приймає відповідна
            біржа. Ми не допомагаємо обходити перевірки, правила платформ, KYC/AML
            або вимоги законодавства.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:text-right">
          <nav className="grid gap-2 text-sm" aria-label="Секції сайту">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
                {item.label}
              </a>
            ))}
          </nav>
          <nav className="grid gap-2 text-sm" aria-label="Юридичні сторінки">
            <Link href="/privacy" className="text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
              Політика конфіденційності
            </Link>
            <Link href="/terms" className="text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
              Умови використання
            </Link>
            <Link href="/disclaimer" className="text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
              Disclaimer
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
