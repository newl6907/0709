export type GaEventParams = Record<string, string | number | boolean>;

export function pushEvent(eventName: string, params: GaEventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const win = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  if (!win.dataLayer) {
    win.dataLayer = [];
  }

  win.dataLayer.push({ event: eventName, ...params });

  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, params);
  }
}
