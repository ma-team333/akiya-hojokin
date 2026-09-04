export type AnalyticsParams = Record<string, string | number | boolean>;

type Gtag = (command: "event", eventName: string, params?: AnalyticsParams) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackGenerateLead(ctaId: string) {
  trackEvent("generate_lead", { entity: "akiya", cta_id: ctaId });
}
