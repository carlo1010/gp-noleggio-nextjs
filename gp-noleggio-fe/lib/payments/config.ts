import type { PaymentProvider } from "@/lib/payments/types";

export type PaymentProviderConfig = {
  enabled: boolean;
  label: string;
  description: string;
};

export const PAYMENT_PROVIDERS_CONFIG: Record<PaymentProvider, PaymentProviderConfig> = {
  stripe: {
    enabled: process.env.NEXT_PUBLIC_STRIPE_ENABLED !== "false",
    label: "Stripe",
    description: "Credit card payment via Stripe",
  },
  nexi_hpp: {
    enabled: process.env.NEXT_PUBLIC_NEXI_ENABLED !== "false",
    label: "Nexi Checkout",
    description: "Secure hosted payment page",
  },
} as const;

export function getEnabledProviders(): PaymentProvider[] {
  return (Object.entries(PAYMENT_PROVIDERS_CONFIG) as Array<[PaymentProvider, PaymentProviderConfig]>)
    .filter(([_, config]) => config.enabled)
    .map(([key]) => key);
}

export function isProviderEnabled(provider: PaymentProvider): boolean {
  return PAYMENT_PROVIDERS_CONFIG[provider]?.enabled ?? false;
}

export function getDefaultProvider(): PaymentProvider | null {
  const enabled = getEnabledProviders();
  return enabled.length > 0 ? enabled[0] : null;
}
