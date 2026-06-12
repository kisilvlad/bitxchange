type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type TikTokPixel = {
  track?: (eventName: string, params?: AnalyticsParams) => void;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: TikTokPixel;
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", eventName, params);
  window.fbq?.("trackCustom", eventName, params);
  window.ttq?.track?.(eventName, params);
}
