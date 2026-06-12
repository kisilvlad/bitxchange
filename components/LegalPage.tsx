import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

type LegalPageProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function LegalPage({ title, description, children }: LegalPageProps) {
  return (
    <main className="min-h-screen py-8 sm:py-12">
      <div className="section-shell">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-bold text-[color:var(--muted)] transition hover:border-[color:var(--border-strong)] hover:text-[color:var(--foreground)]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          На головну
        </Link>

        <article className="glass-panel mt-8 rounded-[28px] p-5 sm:p-8 lg:p-10">
          <div className="mb-8 flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--secondary-soft)] text-[color:var(--primary)]">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-black uppercase text-[color:var(--primary)]">
                Оновлено: 9 червня 2026
              </p>
              <h1 className="mt-2 text-3xl font-black leading-[1.08] text-[color:var(--foreground)] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted)]">
                {description}
              </p>
            </div>
          </div>

          <div className="relative z-10 grid gap-7 text-base leading-7 text-[color:var(--muted)]">
            {children}
          </div>
        </article>
      </div>
    </main>
  );
}

export function LegalSection({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-black text-[color:var(--foreground)]">{title}</h2>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}
