import { Audience } from "@/components/Audience";
import { Benefits } from "@/components/Benefits";
import { Exchanges } from "@/components/Exchanges";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { LeadModalProvider } from "@/components/LeadModalProvider";
import { LegalNotice } from "@/components/LegalNotice";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { SectionHeading } from "@/components/SectionHeading";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { UtmCapture } from "@/components/UtmCapture";
import { pricingPlans, siteConfig } from "@/lib/content";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Супровід відкриття P2P-мерчанта",
  description: siteConfig.description,
  serviceType: "Consulting",
  areaServed: "UA",
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url
  },
  offers: pricingPlans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    description: plan.description,
    price: plan.price.replace(/\D/g, ""),
    priceCurrency: "USD",
    availability: "https://schema.org/InStock"
  }))
};

export default function Home() {
  return (
    <LeadModalProvider>
      <UtmCapture />
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Exchanges />
        <Audience />
        <Process />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <section id="lead" className="py-16 sm:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="max-w-xl">
              <SectionHeading
                eyebrow="Заявка на консультацію"
                title="Розкажіть про ваш акаунт, а ми підкажемо наступний крок"
                description="Форма коротка: достатньо контакту, бажаної біржі та рівня досвіду. UTM-мітки з рекламного переходу автоматично передаються разом із заявкою."
              />
              <LegalNotice compact />
            </div>
            <LeadForm source="section" />
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </LeadModalProvider>
  );
}
