interface DataLayerEvent {
  event: string;
  ecommerce?: Record<string, unknown>;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}

export function pushDataLayer(event: DataLayerEvent): void {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  }
} 