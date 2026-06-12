import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import Script from "next/script";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap"
});

const faviconUrl = `${siteConfig.url}/favicon.svg`;
const manifestUrl = `${siteConfig.url}/site.webmanifest`;
const ogImageUrl = `${siteConfig.url}/og-image.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: faviconUrl,
    shortcut: faviconUrl,
    apple: faviconUrl
  },
  manifest: manifestUrl,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Відкриття P2P-мерчанта"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImageUrl]
  },
  keywords: [
    "P2P merchant",
    "P2P мерчант",
    "Bybit P2P",
    "OKX P2P",
    "WEEX P2P",
    "MEXC P2P",
    "CryptoBot P2P",
    "відкриття P2P мерчанта"
  ]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const stored = localStorage.getItem('bitxchange-theme');
                  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  const theme = stored === 'light' || stored === 'dark' ? stored : (prefersLight ? 'light' : 'dark');
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.style.colorScheme = theme;
                } catch {
                  document.documentElement.dataset.theme = 'dark';
                  document.documentElement.style.colorScheme = 'dark';
                }
              })();
            `
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AnalyticsScripts />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
