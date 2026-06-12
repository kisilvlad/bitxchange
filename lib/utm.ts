export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  pageUrl?: string;
};

const STORAGE_KEY = "p2pMerchantAttribution";

const utmMap: Record<string, keyof Attribution> = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_content: "utmContent",
  utm_term: "utmTerm"
};

function clean(value: string | null): string | undefined {
  if (!value) {
    return undefined;
  }

  return value.replace(/[<>]/g, "").trim().slice(0, 500) || undefined;
}

export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

export function captureUtmFromLocation() {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const existing = getStoredAttribution();
  const next: Attribution = {
    ...existing,
    referrer: clean(document.referrer) ?? existing.referrer,
    pageUrl: clean(window.location.href) ?? existing.pageUrl
  };

  let hasNewUtm = false;

  for (const [queryKey, payloadKey] of Object.entries(utmMap)) {
    const value = clean(params.get(queryKey));
    if (value) {
      next[payloadKey] = value;
      hasNewUtm = true;
    }
  }

  if (hasNewUtm || !existing.pageUrl) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
}
